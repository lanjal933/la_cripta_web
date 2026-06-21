#!/usr/bin/env node

/**
 * Index Generator
 * Script de Node.js para generar automáticamente archivos index.json
 * para cada categoría basándose en las carpetas y metadata.json existentes
 */

const fs = require('fs');
const path = require('path');

const CONTENT_BASE_PATH = path.join(__dirname, '..', 'content');
const CATEGORIES = ['aventuras', 'ciudades', 'minijuegos', 'facciones', 'razas', 'guias'];

/**
 * Genera index.json para una categoría específica
 */
function generateCategoryIndex(category) {
    const categoryPath = path.join(CONTENT_BASE_PATH, category);
    
    if (!fs.existsSync(categoryPath)) {
        console.log(`⚠️  Carpeta ${category} no existe, creándola...`);
        fs.mkdirSync(categoryPath, { recursive: true });
        return null;
    }

    const items = [];
    const folders = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .filter(dirent => !dirent.name.startsWith('.') && dirent.name !== '.template')
        .map(dirent => dirent.name);

    for (const folderName of folders) {
        const itemPath = path.join(categoryPath, folderName);
        const metadataPath = path.join(itemPath, 'metadata.json');

        let metadata;
        if (fs.existsSync(metadataPath)) {
            try {
                const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
                metadata = JSON.parse(metadataContent);
            } catch (error) {
                console.warn(`⚠️  Error leyendo metadata.json en ${folderName}:`, error.message);
                metadata = generateDefaultMetadata(category, folderName);
            }
        } else {
            console.log(`📝 No existe metadata.json en ${folderName}, generando default...`);
            metadata = generateDefaultMetadata(category, folderName);
            // Guardar metadata default
            fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        }

        // Agregar path relativo
        metadata.path = `./content/${category}/${folderName}/`;
        items.push(metadata);
    }

    // Ordenar por order field
    items.sort((a, b) => (a.order || 0) - (b.order || 0));

    const index = {
        category,
        version: '1.0',
        generated: new Date().toISOString(),
        total: items.length,
        items
    };

    const indexPath = path.join(categoryPath, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    
    console.log(`✅ Generado index.json para ${category} con ${items.length} items`);
    return index;
}

/**
 * Genera metadata default
 */
function generateDefaultMetadata(category, folderName) {
    const title = folderName
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());

    return {
        id: folderName,
        title,
        description: '',
        category,
        order: 0,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        published: true,
        tags: [],
        thumbnail: '',
        author: 'Admin',
        content: {
            type: 'html',
            file: 'index.html'
        },
        metadata: {}
    };
}

/**
 * Genera índices para todas las categorías
 */
function generateAllIndices() {
    console.log('🚀 Generando índices para todas las categorías...\n');
    
    const results = {};
    
    for (const category of CATEGORIES) {
        const index = generateCategoryIndex(category);
        if (index) {
            results[category] = index;
        }
    }

    // Generar índice maestro
    const masterIndex = {
        version: '1.0',
        generated: new Date().toISOString(),
        categories: CATEGORIES,
        indices: results
    };

    const masterIndexPath = path.join(CONTENT_BASE_PATH, 'index.json');
    fs.writeFileSync(masterIndexPath, JSON.stringify(masterIndex, null, 2));
    
    console.log('\n✅ Índice maestro generado en content/index.json');
    console.log(`📊 Total items: ${Object.values(results).reduce((sum, idx) => sum + idx.total, 0)}`);
}

/**
 * Crea estructura de carpetas inicial si no existe
 */
function createInitialStructure() {
    console.log('📁 Creando estructura de carpetas inicial...\n');
    
    for (const category of CATEGORIES) {
        const categoryPath = path.join(CONTENT_BASE_PATH, category);
        const templatePath = path.join(categoryPath, '.template');
        
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath, { recursive: true });
            console.log(`📁 Creada carpeta: ${category}/`);
        }

        if (!fs.existsSync(templatePath)) {
            fs.mkdirSync(templatePath, { recursive: true });
            console.log(`📁 Creada carpeta: ${category}/.template/`);
        }

        // Crear template metadata.json si no existe
        const templateMetadataPath = path.join(templatePath, 'metadata.json');
        if (!fs.existsSync(templateMetadataPath)) {
            const templateMetadata = generateDefaultMetadata(category, 'nombre-ejemplo');
            fs.writeFileSync(templateMetadataPath, JSON.stringify(templateMetadata, null, 2));
            console.log(`📝 Creado template: ${category}/.template/metadata.json`);
        }
    }
}

// CLI
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.includes('--init')) {
        createInitialStructure();
    } else if (args.includes('--category')) {
        const categoryIndex = args.indexOf('--category');
        const category = args[categoryIndex + 1];
        if (category && CATEGORIES.includes(category)) {
            generateCategoryIndex(category);
        } else {
            console.error('❌ Categoría inválida. Opciones:', CATEGORIES.join(', '));
            process.exit(1);
        }
    } else {
        generateAllIndices();
    }
}

module.exports = {
    generateCategoryIndex,
    generateAllIndices,
    createInitialStructure
};
