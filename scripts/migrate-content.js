#!/usr/bin/env node

/**
 * Migration Script
 * Migrar contenido existente de localStorage a estructura de carpetas
 */

const fs = require('fs');
const path = require('path');

const CONTENT_BASE_PATH = path.join(__dirname, '..', 'content');

// Contenido actual de admin-data-loader.js
const existingContent = {
    lore: [
        {
            id: 'lore1',
            name: 'La Llegada',
            content: `# 🌊 La Llegada

> *Relato de Vyrreal, líder de la expedición humana*

---

## 🚢 La Expedición

#8b5cf6La expedición humana llegó al continente de Expencior hace milenios, buscando refugio de su tierra natal devastada.#
#8b5cf6Liderados por Vyrreal, un visionario con esperanza en su corazón.#

### Los Viajeros
- **👤 Humanos** - Refugiados buscando un nuevo hogar
- **🔮 Antiguos** - Raza misteriosa que los protegió
- **🐢 Tortogas** - Aliados leales y sabios

---

## 🛡️ La Protección de los Antiguos

#a855f7La raza sin identificar, a la cual se le nombró "Los Antiguos", junto a los Tortogas, decidieron proteger y ocultar a la expedición de Vyrreal.#
#a855f7Pero esta protección no duraría mucho tiempo.#

### La Conspiración

#991b1bSe cree que por una conspiración de los Elfos, los Orcos se enteraron de la embarcación humana.#
#991b1bPor el bien del continente, avisaron inmediatamente a los Orcos.#

#7f1d1dSe cree que no terminó bien.#
#7f1d1dLa tensión crecía como una olla a presión a punto de explotar.#

---

## ⚖️ Los Bandos Formados

### 🤝 Protectoras
- **🔮 Los Antiguos** - Raza misteriosa hoy extinta
- **🐢 Tortogas** - Aliados leales de los Antiguos
- **👤 Expedición Humana** - Los recién llegados buscando refugio

### ⚔️ Opositores
- **👹 Orcos** - Guardianes del continente
- **🧝 Elfos** - Conspiradores que revelaron el secreto

### 👁️ Neutrales
- **🐉 Draconicos** - Observadores silenciosos
- **🌟 Otras razas** - Esperando ver qué pasaría

#f43f5eEl destino del continente pendía de un hilo.#
#f43f5eLa guerra era inevitable.`
        },
        {
            id: 'lore2',
            name: 'La Amenaza Sombría',
            content: `# 🌑 La Amenaza Sombría

> *Texto de libros caros*

---

## 💬 Las Negociaciones

Los Orcos más desarrollados mental hablaron con los **Tortogas** y con los **Antiguos**.

#6b21a8Aunque los Tortogas aceptaron el trato de los Orcos, que consistía en eliminar la expedición humana, los Antiguos eligieron protegerlos.#

---

## 📜 El Trato de los Orcos

#dc2626El trato era simple y brutal: eliminar la expedición humana para proteger el continente.#
#dc2626Los Tortogas, pragmáticos, aceptaron el trato.#
#dc2626Los Antiguos, idealistas, se negaron rotundamente.#

---

## ⚔️ La Guerra Comienza

#ef4444Así, se alzó una batalla que cambiaría el destino del continente.#
#ef4444Antiguos contra Orcos y Elfos, mientras los demás permanecían neutrales.#

### Los Combatientes

**🛡️ Fuerzas de Protección:**
- **🔮 Los Antiguos** - Con poderes misteriosos y desconocidos
- **🐢 Tortogas** - Guerreros resistentes y leales
- **👤 Expedición Humana** - Refugiados bajo protección

**⚔️ Fuerzas de Eliminación:**
- **👹 Orcos** - Estrategas superiores y numerosos
- **🧝 Elfos** - Arqueros precisos y magos poderosos

**👁️ Observadores:**
- **🐉 Draconicos** - Neutrales pero vigilantes
- **🌟 Otras razas** - Esperando el resultado del conflicto

---

## 💀 La Guerra Feroz

#be185dHubo una guerra… feroz y devastadora.#
#be185dSe cree que duró entre 6 a 7 años de conflicto continuo.#

### Las Bajas

#991b1bVarios cayeron en ambos bandos.#
#991b1bPero la expedición humana, aún prevalecía en pie.#

**Costos de la Guerra:**
- **🔮 Antiguos:** Muchos caídos defendiendo a los humanos
- **🐢 Tortogas:** Pérdidas significativas pero honor intacto
- **👹 Orcos:** Bajas moderadas pero moral alta
- **🧝 Elfos:** Bajas leves pero estrategia fallida
- **👤 Humanos:** Supervivientes gracias a la protección

---

## 🏴 La Batalla de Costa Inicio

#4c0519Pero todo sucumbiría en la batalla de Costa Inicio.#
#4c0519Allí se encontraba el grupo humano y los Orcos hicieron una batalla feroz.#
#4c0519No se sabe quién ganó la batalla realmente.`
        }
    ],
    cities: [
        {
            id: 'mordicuis',
            name: 'Mordicuis',
            content: `# 🏰 Mordicuis

La capital del continente, centro de poder y cultura.

## Ubicación
Situada en el corazón del continente, rodeada de montañas.

## Gobierno
Monarquía constitucional con consejo de sabios.

## Población
Aproximadamente 500,000 habitantes de diversas razas.`
        },
        {
            id: 'fuerte-norte',
            name: 'Fuerte Norte',
            content: `# ❄️ Fuerte Norte

Bastión del norte, conocido por su resistencia al frío.

## Ubicación
En las montañas del norte, cerca del paso de hielo.

## Gobierno
Consejo militar.

## Población
Aproximadamente 100,000 habitantes, principalmente humanos y enanos.`
        }
    ],
    factions: [
        {
            id: 'orden-luz',
            name: 'Orden de la Luz',
            content: `# ✨ Orden de la Luz

Orden paladín dedicada a proteger a los inocentes.

## Ideología
Protección de los débiles y justicia para todos.

## Sede
Mordicuis, distrito noble.

## Miembros
Aproximadamente 2,000 paladines y clérigos.`
        },
        {
            id: 'circulo-arcano',
            name: 'Círculo Arcano',
            content: `# 🔮 Círculo Arcano

Gremio de magos y hechiceros del continente.

## Ideología
Búsqueda del conocimiento arcano y preservación de la magia.

## Sede
Torre Arcana, Fuerte Norte.

## Miembros
Aproximadamente 500 magos de diversos niveles.`
        }
    ]
};

/**
 * Convierte Markdown con códigos de color a HTML
 */
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Lists
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    
    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');
    
    // Color codes (#hexcolorText#)
    html = html.replace(/#[0-9a-fA-F]{6}([^#]+)#/g, '<span style="color: #$1">$2</span>');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

/**
 * Crea un item en la estructura de carpetas
 */
function createItem(category, item) {
    const categoryPath = path.join(CONTENT_BASE_PATH, category);
    const itemPath = path.join(categoryPath, item.id);
    
    // Crear carpeta
    if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath, { recursive: true });
        console.log(`📁 Creada carpeta: ${category}/${item.id}/`);
    }
    
    // Crear metadata.json
    const metadata = {
        id: item.id,
        title: item.name,
        description: item.content.substring(0, 150) + '...',
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
    
    const metadataPath = path.join(itemPath, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`📝 Creado metadata.json: ${category}/${item.id}/metadata.json`);
    
    // Crear index.html con contenido convertido
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${item.name} - La Cripta</title>
    <link rel="stylesheet" href="../../../css/styles.css">
</head>
<body class="font-body text-white-warm min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="markdown-content">
            ${convertMarkdownToHTML(item.content)}
        </div>
    </div>
</body>
</html>`;
    
    const htmlPath = path.join(itemPath, 'index.html');
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`📄 Creado index.html: ${category}/${item.id}/index.html`);
}

/**
 * Migra todo el contenido
 */
function migrateAll() {
    console.log('🚀 Iniciando migración de contenido...\n');
    
    // Migrar Lore
    if (existingContent.lore) {
        console.log('📜 Migrando Lore...');
        for (const item of existingContent.lore) {
            createItem('guias', item); // Lore se va a guías por ahora
        }
    }
    
    // Migrar Ciudades
    if (existingContent.cities) {
        console.log('\n🏰 Migrando Ciudades...');
        for (const item of existingContent.cities) {
            createItem('ciudades', item);
        }
    }
    
    // Migrar Facciones
    if (existingContent.factions) {
        console.log('\️ Migrando Facciones...');
        for (const item of existingContent.factions) {
            createItem('facciones', item);
        }
    }
    
    console.log('\n✅ Migración completada');
    console.log('📝 Ahora ejecuta: node scripts/index-generator.js');
}

// Ejecutar migración
if (require.main === module) {
    migrateAll();
}

module.exports = {
    migrateAll,
    convertMarkdownToHTML
};
