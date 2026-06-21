// Guide Data Management System
// Handles all guide and embed data storage and operations

const GUIDE_STORAGE_KEY = 'guide_data_version';
const GUIDE_DATA_VERSION = '1.0';

// Default guide data structure
const defaultGuides = [
    {
        id: 'guide_welcome',
        title: 'Bienvenido a La Cripta',
        description: 'Guía introductoria para nuevos jugadores',
        order: 1,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        embeds: [
            {
                id: 'embed_welcome_1',
                type: 'text',
                title: '🌟 Introducción',
                subtitle: 'Tu viaje comienza aquí',
                content: '<p>Bienvenido a <strong>La Cripta</strong>, un mundo de fantasía oscura donde cada decisión cuenta. Esta guía te ayudará a dar tus primeros pasos en este vasto universo.</p><p>Explora las ciudades, únete a las facciones, y descubre los secretos que esperan en las sombras.</p>',
                accentColor: '#7C5CFF',
                order: 1
            },
            {
                id: 'embed_welcome_2',
                type: 'text',
                title: '📜 Historia del Mundo',
                subtitle: 'El pasado define el futuro',
                content: '<p>Hace mil años, las grandes guerras destruyeron las civilizaciones antiguas. Ahora, las facciones emergentes luchan por el control de los territorios olvidados.</p><ul><li>Las ciudades antiguas yacen en ruinas</li><li>Nuevos poderes emergen de las cenizas</li><li>El destino del mundo está en tus manos</li></ul>',
                accentColor: '#5C8DFF',
                order: 2
            }
        ]
    }
];

// Initialize guide data
function initializeGuideData() {
    const currentVersion = localStorage.getItem(GUIDE_STORAGE_KEY);
    
    if (currentVersion !== GUIDE_DATA_VERSION) {
        console.log('Inicializando datos de Guía versión', GUIDE_DATA_VERSION);
        
        // Load guides
        if (!localStorage.getItem('guide_guides')) {
            localStorage.setItem('guide_guides', JSON.stringify(defaultGuides));
        }
        
        localStorage.setItem(GUIDE_STORAGE_KEY, GUIDE_DATA_VERSION);
        console.log('Datos de Guía inicializados');
    }
}

// Guide CRUD Operations

function getGuides() {
    const guides = localStorage.getItem('guide_guides');
    return guides ? JSON.parse(guides) : [];
}

function saveGuides(guides) {
    localStorage.setItem('guide_guides', JSON.stringify(guides));
}

function getGuideById(guideId) {
    const guides = getGuides();
    return guides.find(g => g.id === guideId);
}

function getPublishedGuides() {
    const guides = getGuides();
    return guides.filter(g => g.published).sort((a, b) => a.order - b.order);
}

function addGuide(guide) {
    const guides = getGuides();
    const newGuide = {
        id: 'guide_' + Date.now(),
        title: guide.title,
        description: guide.description || '',
        order: guides.length + 1,
        published: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        embeds: []
    };
    guides.push(newGuide);
    saveGuides(guides);
    return newGuide;
}

function updateGuide(guideId, updates) {
    const guides = getGuides();
    const index = guides.findIndex(g => g.id === guideId);
    
    if (index !== -1) {
        guides[index] = {
            ...guides[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        saveGuides(guides);
        return guides[index];
    }
    return null;
}

function deleteGuide(guideId) {
    const guides = getGuides();
    const filtered = guides.filter(g => g.id !== guideId);
    saveGuides(filtered);
}

function reorderGuides(guideIds) {
    const guides = getGuides();
    const reordered = [];
    
    guideIds.forEach((id, index) => {
        const guide = guides.find(g => g.id === id);
        if (guide) {
            guide.order = index + 1;
            reordered.push(guide);
        }
    });
    
    saveGuides(reordered);
}

// Embed CRUD Operations

function addEmbed(guideId, embed) {
    const guides = getGuides();
    const guideIndex = guides.findIndex(g => g.id === guideId);
    
    if (guideIndex !== -1) {
        const newEmbed = {
            id: 'embed_' + Date.now(),
            type: embed.type || 'text',
            title: embed.title,
            subtitle: embed.subtitle || '',
            content: embed.content || '',
            accentColor: embed.accentColor || '#7C5CFF',
            order: guides[guideIndex].embeds.length + 1
        };
        
        guides[guideIndex].embeds.push(newEmbed);
        guides[guideIndex].updatedAt = new Date().toISOString();
        saveGuides(guides);
        return newEmbed;
    }
    return null;
}

function updateEmbed(guideId, embedId, updates) {
    const guides = getGuides();
    const guideIndex = guides.findIndex(g => g.id === guideId);
    
    if (guideIndex !== -1) {
        const embedIndex = guides[guideIndex].embeds.findIndex(e => e.id === embedId);
        
        if (embedIndex !== -1) {
            guides[guideIndex].embeds[embedIndex] = {
                ...guides[guideIndex].embeds[embedIndex],
                ...updates
            };
            guides[guideIndex].updatedAt = new Date().toISOString();
            saveGuides(guides);
            return guides[guideIndex].embeds[embedIndex];
        }
    }
    return null;
}

function deleteEmbed(guideId, embedId) {
    const guides = getGuides();
    const guideIndex = guides.findIndex(g => g.id === guideId);
    
    if (guideIndex !== -1) {
        guides[guideIndex].embeds = guides[guideIndex].embeds.filter(e => e.id !== embedId);
        guides[guideIndex].updatedAt = new Date().toISOString();
        saveGuides(guides);
    }
}

function reorderEmbeds(guideId, embedIds) {
    const guides = getGuides();
    const guideIndex = guides.findIndex(g => g.id === guideId);
    
    if (guideIndex !== -1) {
        const reordered = [];
        
        embedIds.forEach((id, index) => {
            const embed = guides[guideIndex].embeds.find(e => e.id === id);
            if (embed) {
                embed.order = index + 1;
                reordered.push(embed);
            }
        });
        
        guides[guideIndex].embeds = reordered;
        guides[guideIndex].updatedAt = new Date().toISOString();
        saveGuides(guides);
    }
}

// Initialize on load
initializeGuideData();

// Make functions available globally
window.GuideData = {
    getGuides,
    saveGuides,
    getGuideById,
    getPublishedGuides,
    addGuide,
    updateGuide,
    deleteGuide,
    reorderGuides,
    addEmbed,
    updateEmbed,
    deleteEmbed,
    reorderEmbeds,
    initializeGuideData
};
