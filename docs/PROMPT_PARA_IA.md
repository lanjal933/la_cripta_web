# Prompt para IA - Sistema de Contenido Basado en Carpetas

Eres un experto en desarrollo web y arquitectura de sistemas de gestión de contenido. Trabajarás con un proyecto llamado "La Cripta" que tiene un sistema de administración basado en carpetas con descubrimiento automático de contenido.

## Arquitectura del Sistema

### Estructura de Carpetas

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
├── facciones/
├── razas/
└── guias/
```

### Archivos Clave

**1. Sistema de Descubrimiento Automático**
- `js/core/content-discovery.js`: Descubre automáticamente contenido basándose en carpetas
- Carga índices generados o genera fallback
- Cache de índices con expiración
- Funciones: `discoverCategory()`, `loadItemMetadata()`, `loadItemContent()`

**2. Generador de Índices**
- `scripts/index-generator.js` (Node.js): Genera automáticamente archivos index.json
- Escanea carpetas y metadata.json
- Crea metadata default si no existe
- Comandos: `node scripts/index-generator.js`, `node scripts/index-generator.js --init`

**3. Panel Admin**
- `pages/admin-new.html`: Panel admin refactorizado
- Usa content-discovery.js para cargar contenido
- Editor de metadata y contenido con preview
- Acceso: Ctrl+Alt+P

**4. Sistema de Autenticación**
- `js/admin/admin-access-new.js`: Sistema simplificado de autenticación
- Password: `BenjaMarcePau9`
- localStorage key: `admin_auth_v2`
- Funciones: `openAdminPanel()`, `adminLogout()`, `isAdminAuthenticated()`

**5. Servidor de Desarrollo**
- `server-dev.js`: Servidor HTTP simple para evitar CORS
- Puerto: 8080
- Comando: `npm run dev`
- Sirve pages/index.html por defecto en la raíz

### Estructura de metadata.json

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

## Cómo Trabajar con Este Sistema

### Añadir Nuevo Contenido

1. **Crear carpeta en la categoría correspondiente:**
   ```
   content/ciudades/nueva-ciudad/
   ```

2. **Copiar template de metadata.json:**
   ```
   cp content/ciudades/.template/metadata.json content/ciudades/nueva-ciudad/metadata.json
   ```

3. **Editar metadata.json con los datos del item**

4. **Crear index.html con el contenido**

5. **Generar índices:**
   ```bash
   npm run generate-index
   # o
   node scripts/index-generator.js
   ```

6. **El contenido aparece automáticamente en la web**

### Editar Contenido Existente

1. **Abrir panel admin:** Ctrl+Alt+P
2. **Seleccionar categoría** del sidebar
3. **Seleccionar item** para editar
4. **Editar metadata y/o contenido** en el editor
5. **Guardar** (nota: actualmente simula guardado, requiere backend real)

### Migrar Contenido Existente

1. **Ejecutar script de migración:**
   ```bash
   npm run migrate
   # o
   node scripts/migrate-content.js
   ```

2. **Generar índices:**
   ```bash
   npm run generate-index
   ```

### Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en: http://localhost:8080

### Comandos Disponibles

```bash
npm run dev              # Iniciar servidor de desarrollo
npm run generate-index   # Generar todos los índices
npm run migrate          # Migrar contenido existente
npm run init             # Inicializar estructura de carpetas
```

## Reglas Importantes

1. **Siempre usar el servidor local:** No abras archivos HTML directamente (file://) para evitar errores de CORS
2. **Usar rutas relativas:** En archivos HTML dentro de pages/, usa rutas relativas (../css/styles.css)
3. **Generar índices después de cambios:** Siempre ejecuta `npm run generate-index` después de añadir/eliminar contenido
4. **Mantener estructura de carpetas:** No cambies la estructura de carpetas del sistema
5. **Usar templates:** Copia los templates de metadata.json para asegurar consistencia

## Problemas Comunes y Soluciones

**Error 404 al usar Ctrl+Alt+P:**
- Asegúrate de estar usando el servidor local (npm run dev)
- Verifica que admin-access-new.js esté cargado correctamente
- Limpia el cache del navegador (Ctrl+Shift+R)

**Errores de CORS:**
- Siempre usa el servidor local, no abras archivos directamente
- El servidor está configurado para evitar CORS

**Contenido no aparece:**
- Ejecuta `npm run generate-index`
- Verifica que metadata.json sea válido JSON
- Verifica que el campo `published` sea true

## Documentación

Para más detalles, consulta:
- `NEW-ARCHITECTURE.md`: Documentación completa de la arquitectura
- `content-system-architecture.md`: Arquitectura original (obsoleta)
- `DEPLOYMENT.md`: Guía de despliegue

## Notas de Desarrollo

- El sistema actual simula el guardado desde el admin (requiere backend real)
- Los índices se pueden generar manualmente o automáticamente en el servidor
- El sistema de autenticación usa localStorage con hash simple
- El sistema es compatible con el contenido existente en localStorage
- El panel admin es principalmente una herramienta de edición, no de registro
