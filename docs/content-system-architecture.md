# Sistema de Gestión de Contenido Basado en Carpetas
## Arquitectura de Descubrimiento Automático

## 📁 Estructura de Carpetas Propuesta

```
web_cripta/
├── content/
│   ├── aventuras/
│   │   ├── sombras-disonantes/
│   │   │   ├── index.html
│   │   │   ├── metadata.json
│   │   │   ├── assets/
│   │   │   └── ...
│   │   ├── otra-aventura/
│   │   │   └── ...
│   │   └── index.json (índice generado automáticamente)
│   ├── ciudades/
│   │   ├── nombre-ciudad/
│   │   │   ├── index.html
│   │   │   ├── metadata.json
│   │   │   └── assets/
│   │   └── index.json
│   ├── minijuegos/
│   │   ├── contrahechizo/
│   │   │   ├── index.html
│   │   │   ├── metadata.json
│   │   │   └── ...
│   │   └── index.json
│   ├── facciones/
│   │   └── index.json
│   ├── razas/
│   │   └── index.json
│   └── guias/
│       └── index.json
└── js/
    └── content-discovery.js (sistema de descubrimiento)
```

## 📋 Formato metadata.json

```json
{
  "id": "sombras-disonantes",
  "title": "SOMBRAS DISONANTES",
  "description": "Cámara de Combate Individual...",
  "category": "aventuras",
  "type": "combat_chamber",
  "tags": ["combate", "solo", "jefe"],
  "coverImage": "assets/cover.jpg",
  "author": "Autor",
  "version": "1.0",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "published": true,
  "featured": false
}
```

## 🔍 Sistema de Descubrimiento

### content-discovery.js

```javascript
class ContentDiscovery {
  constructor() {
    this.contentBasePath = './content/';
    this.categories = ['aventuras', 'ciudades', 'minijuegos', 'facciones', 'razas', 'guias'];
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
  }

  async discoverContent(category) {
    const cacheKey = `content_${category}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const indexPath = `${this.contentBasePath}${category}/index.json`;
    
    try {
      const response = await fetch(indexPath);
      if (!response.ok) throw new Error('Index not found');
      
      const index = await response.json();
      this.cache.set(cacheKey, { data: index, timestamp: Date.now() });
      return index;
    } catch (error) {
      console.error(`Error discovering content for ${category}:`, error);
      return { items: [] };
    }
  }

  async getAllContent() {
    const allContent = {};
    
    for (const category of this.categories) {
      allContent[category] = await this.discoverContent(category);
    }
    
    return allContent;
  }

  async getContentItem(category, itemId) {
    const content = await this.discoverContent(category);
    return content.items.find(item => item.id === itemId);
  }

  invalidateCache(category) {
    if (category) {
      this.cache.delete(`content_${category}`);
    } else {
      this.cache.clear();
    }
  }
}
```

## 🤖 Generador de Índices

### index-generator.js (Node.js script)

```javascript
const fs = require('fs');
const path = require('path');

class IndexGenerator {
  constructor(contentPath) {
    this.contentPath = contentPath;
  }

  generateIndex(category) {
    const categoryPath = path.join(this.contentPath, category);
    const indexPath = path.join(categoryPath, 'index.json');
    
    if (!fs.existsSync(categoryPath)) {
      console.log(`Creating directory: ${categoryPath}`);
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    const items = [];
    const directories = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => dirent.name !== 'assets')
      .map(dirent => dirent.name);

    for (const dir of directories) {
      const metadataPath = path.join(categoryPath, dir, 'metadata.json');
      
      if (fs.existsSync(metadataPath)) {
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          items.push({
            ...metadata,
            path: `${category}/${dir}/index.html`
          });
        } catch (error) {
          console.error(`Error reading metadata for ${dir}:`, error);
        }
      }
    }

    const index = {
      category,
      itemCount: items.length,
      lastUpdated: new Date().toISOString(),
      items
    };

    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log(`Generated index for ${category}: ${items.length} items`);
    
    return index;
  }

  generateAllIndexes() {
    const categories = ['aventuras', 'ciudades', 'minijuegos', 'facciones', 'razas', 'guias'];
    
    for (const category of categories) {
      this.generateIndex(category);
    }
  }
}

// CLI usage
if (require.main === module) {
  const contentPath = process.argv[2] || './content';
  const generator = new IndexGenerator(contentPath);
  generator.generateAllIndexes();
}
```

## 🎯 Panel Admin Refactorizado

### Funcionalidades del Nuevo Panel

1. **Explorador de Carpetas**: Navegación visual de la estructura de carpetas
2. **Editor de metadata.json**: Interfaz para editar metadatos
3. **Generador de Índices**: Botón para regenerar índices manualmente
4. **Validación**: Verificar que los archivos necesarios existan
5. **Preview**: Vista previa del contenido
6. **Creación de Plantillas**: Crear nueva carpeta con estructura base

## 🔄 Migración de Contenido Existente

### Pasos de Migración

1. Crear estructura de carpetas en `content/`
2. Mover contenido existente a nuevas ubicaciones
3. Crear archivos `metadata.json` para cada item
4. Generar índices automáticamente
5. Actualizar referencias en el código
6. Mantener localStorage como fallback temporal

## 📝 Compatibilidad

### Fase de Transición

1. **Dual Mode**: El sistema soporta ambos métodos durante la transición
2. **Prioridad**: Sistema de carpetas tiene prioridad sobre localStorage
3. **Fallback**: Si no hay índice, usar localStorage
4. **Migración Automática**: Script para migrar contenido de localStorage a carpetas

## 🚀 Implementación

### Orden de Implementación

1. ✅ Crear estructura de carpetas base
2. ✅ Implementar sistema de descubrimiento (content-discovery.js)
3. ✅ Crear generador de índices (index-generator.js)
4. ✅ Migrar contenido existente
5. ✅ Actualizar UI para usar nuevo sistema
6. ✅ Refactorizar panel admin
7. ✅ Eliminar dependencia de localStorage
8. ✅ Documentación completa

## 🎨 Beneficios

- **Simplicidad**: Añadir contenido = crear carpeta
- **Escalabilidad**: Sin límite de tamaño de localStorage
- **Version Control**: Git-friendly
- **Colaboración**: Múltiples autores pueden trabajar simultáneamente
- **Backup**: Fácil backup del contenido
- **Organización**: Estructura clara y predecible
