# Nueva Arquitectura del Sistema de Contenido

## Resumen

El sistema de administración ha sido refactorizado completamente para pasar de un sistema basado en registros manuales (localStorage) a un sistema basado en estructura de carpetas con descubrimiento automático.

## ⚠️ IMPORTANTE: Servidor Local Requerido

Debido a políticas de CORS de los navegadores, **es necesario usar un servidor local** para que el nuevo sistema funcione correctamente. No se pueden abrir los archivos HTML directamente (file://).

### Iniciar Servidor de Desarrollo

```bash
# Opción 1: Usar npm (recomendado)
npm run dev

# Opción 2: Usar Node.js directamente
node server-dev.js
```

El servidor estará disponible en: **http://localhost:8080**

### Páginas Disponibles

- http://localhost:8080/ - Inicio
- http://localhost:8080/pages/admin-new.html - Panel Admin (Ctrl+Alt+P)
- http://localhost:8080/pages/ciudades-new.html - Ciudades (ejemplo)

## Objetivos Cumplidos

✅ Cada categoría tiene su propia carpeta raíz
✅ Detección automática de nuevas carpetas
✅ No requiere registro manual desde el panel admin
✅ Descubrimiento automático de contenido
✅ Generación automática de índices
✅ Navegación automática
✅ Soporte para subcarpetas
✅ Compatibilidad con contenido existente
✅ Mínima configuración manual
✅ Panel admin como herramienta de edición, no de registro

## Estructura de Carpetas

```
content/
├── aventuras/
│   ├── .template/
│   │   └── metadata.json
│   ├── nombre-aventura/
│   │   ├── metadata.json
│   │   └── index.html
│   └── index.json
├── ciudades/
│   ├── .template/
│   │   └── metadata.json
│   ├── nombre-ciudad/
│   │   ├── metadata.json
│   │   └── index.html
│   └── index.json
├── minijuegos/
│   ├── .template/
│   │   └── metadata.json
│   ├── nombre-minijuego/
│   │   ├── metadata.json
│   │   └── index.html
│   └── index.json
├── facciones/
│   ├── .template/
│   │   └── metadata.json
│   ├── nombre-faccion/
│   │   ├── metadata.json
│   │   └── index.html
│   └── index.json
├── razas/
│   ├── .template/
│   │   └── metadata.json
│   ├── nombre-raza/
│   │   ├── metadata.json
│   │   └── index.html
│   └── index.json
├── guias/
│   ├── .template/
│   │   └── metadata.json
│   ├── nombre-guia/
│   │   ├── metadata.json
│   │   └── index.html
│   └── index.json
└── index.json (índice maestro)
```

## Estructura de metadata.json

```json
{
  "id": "identificador-unico",
  "title": "Título del Item",
  "description": "Descripción breve",
  "category": "categoria",
  "order": 0,
  "created": "2025-01-01T00:00:00Z",
  "updated": "2025-01-01T00:00:00Z",
  "published": true,
  "tags": ["tag1", "tag2"],
  "thumbnail": "url-imagen",
  "author": "Admin",
  "content": {
    "type": "html",
    "file": "index.html"
  },
  "metadata": {
    "campo-custom": "valor"
  }
}
```

## Archivos Creados

### Core del Sistema

1. **js/core/content-discovery.js**
   - Sistema de descubrimiento automático de contenido
   - Carga índices generados
   - Fallback para descubrimiento directo
   - Cache de índices
   - Búsqueda y filtrado

2. **scripts/index-generator.js** (Node.js)
   - Genera automáticamente archivos index.json
   - Escanea carpetas y metadata.json
   - Crea metadata default si no existe
   - Genera índice maestro

3. **scripts/migrate-content.js** (Node.js)
   - Migra contenido existente de localStorage
   - Convierte Markdown a HTML
   - Crea estructura de carpetas
   - Genera metadata.json

### Panel Admin

4. **pages/admin-new.html**
   - Panel admin refactorizado
   - Usa content-discovery.js
   - Editor de metadata y contenido
   - Preview en tiempo real
   - No requiere registro manual
   - **ÚNICO panel admin disponible**

5. **js/admin/admin-access-new.js**
   - Sistema de autenticación simplificado
   - Ctrl+Alt+P para abrir admin
   - Mismo password: `BenjaMarcePau9`
   - **ÚNICO sistema de acceso disponible**

**Archivos eliminados (sistema viejo):**
- ❌ pages/admin.html
- ❌ pages/admin-guia.html
- ❌ js/admin/admin-access.js
- ❌ js/admin/admin-guia.js
- ❌ js/admin/admin-data-loader.js
- ❌ js/admin/page-admin-system.js

### Páginas Públicas (Ejemplo)

6. **pages/ciudades-new.html**
   - Ejemplo de página pública usando nuevo sistema
   - Carga contenido automáticamente
   - Modal para ver detalles
   - Usa content-discovery.js

### Templates

7. **content/[categoria]/.template/metadata.json**
   - Template para cada categoría
   - Campos específicos por categoría
   - Facilita creación de nuevo contenido

## Flujo de Trabajo

### Añadir Nuevo Contenido

1. Crear carpeta en la categoría correspondiente:
   ```
   content/ciudades/nueva-ciudad/
   ```

2. Copiar template de metadata.json:
   ```
   cp content/ciudades/.template/metadata.json content/ciudades/nueva-ciudad/metadata.json
   ```

3. Editar metadata.json con los datos del item

4. Crear index.html con el contenido

5. Ejecutar generador de índices:
   ```bash
   node scripts/index-generator.js
   ```

6. El contenido aparece automáticamente en la web

### Editar Contenido Existente

1. Abrir panel admin: Ctrl+Alt+P
2. Seleccionar categoría
3. Seleccionar item
4. Editar metadata y/o contenido
5. Guardar (requiere backend para guardar archivos)

### Migrar Contenido Existente

1. Ejecutar script de migración:
   ```bash
   node scripts/migrate-content.js
   ```

2. Ejecutar generador de índices:
   ```bash
   node scripts/index-generator.js
   ```

## Comandos Disponibles

### Iniciar Servidor de Desarrollo

```bash
# Usar npm (recomendado)
npm run dev

# Usar Node.js directamente
node server-dev.js
```

### Generar Índices

```bash
# Generar todos los índices
npm run generate-index

# O directamente
node scripts/index-generator.js

# Generar índice de una categoría específica
node scripts/index-generator.js --category ciudades

# Inicializar estructura de carpetas
npm run init
```

### Migrar Contenido

```bash
npm run migrate
```

## Ventajas del Nuevo Sistema

1. **Sin Registro Manual**: Añadir contenido es crear una carpeta
2. **Descubrimiento Automático**: Nuevas carpetas se detectan automáticamente
3. **Escalabilidad**: Fácil añadir nuevas categorías
4. **Version Control**: Contenido en archivos, controlable con Git
5. **Colaboración**: Múltiples editores pueden trabajar simultáneamente
6. **Backup**: Fácil backup de contenido
7. **Organización**: Estructura clara y predecible
8. **Flexibilidad**: Metadata customizable por categoría

## Compatibilidad con Sistema Antiguo

- El sistema antiguo basado en localStorage sigue funcionando
- Los archivos nuevos usan la nueva arquitectura
- Se puede migrar gradualmente
- No hay interrupción del servicio

## Próximos Pasos

1. **Backend para Guardado**: Implementar API para guardar archivos desde el admin
2. **Migración Completa**: Migrar todo el contenido existente
3. **Actualizar Páginas**: Reemplazar todas las páginas públicas con nuevas versiones
4. **Eliminar Código Viejo**: Limpiar localStorage y archivos obsoletos
5. **Testing**: Probar exhaustivamente el nuevo sistema

## Notas Importantes

- El sistema actual de admin-new.html simula el guardado (requiere backend real)
- Para guardar archivos desde el admin, se necesita un servidor con permisos de escritura
- Los índices se pueden generar manualmente o automáticamente en el servidor
- El sistema de autenticación sigue siendo el mismo password
- Ctrl+Alt+P abre admin-new.html en lugar de admin.html
- **Es obligatorio usar el servidor local (npm run dev) para evitar errores de CORS**

## Solución de Problemas

### Errores de CORS

Si ves errores como:
```
Access to fetch at 'file:///...' has been blocked by CORS policy
```

**Solución:** No abras los archivos HTML directamente. Usa el servidor local:
```bash
npm run dev
```
Luego abre http://localhost:8080 en tu navegador.

### Archivos No Encontrados

Si el servidor no encuentra archivos:
- Verifica que estás en el directorio correcto (raíz del proyecto)
- Asegúrate de que el servidor esté corriendo en el puerto 8080
- Revisa la consola del servidor para ver qué archivos solicita

### Índices No Se Generan

Si los índices no se generan correctamente:
- Ejecuta `npm run init` para crear la estructura inicial
- Verifica que las carpetas de categoría existan en `content/`
- Revisa los archivos metadata.json para errores de sintaxis JSON

## Ejemplo de Uso

```javascript
// Cargar todas las ciudades
const index = await contentDiscovery.discoverCategory('ciudades');
console.log(index.items);

// Cargar metadata de una ciudad específica
const metadata = await contentDiscovery.loadItemMetadata('ciudades', 'mordicuis');

// Cargar contenido HTML
const content = await contentDiscovery.loadItemContent('ciudades', 'mordicuis');

// Buscar contenido
const results = await contentDiscovery.search('mordicuis');

// Obtener items recientes
const recent = await contentDiscovery.getRecent(10);
```

## Resumen de Cambios

| Aspecto | Sistema Antiguo | Sistema Nuevo |
|---------|----------------|---------------|
| Almacenamiento | localStorage | Archivos en carpetas |
| Registro | Manual desde admin | Automático por carpeta |
| Descubrimiento | No | Automático |
| Índices | No | index.json generado |
| Escalabilidad | Limitada | Ilimitada |
| Version Control | No | Sí (Git) |
| Colaboración | Difícil | Fácil |
| Backup | Difícil | Fácil |
