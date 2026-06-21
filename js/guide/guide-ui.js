// Guide UI Functionality
// Handles all front-end interactions for the Guide system

// Guide Index Page Functions

function loadGuides() {
    const guides = getPublishedGuides();
    const guidesGrid = document.getElementById('guidesGrid');
    
    if (!guidesGrid) return;
    
    if (guides.length === 0) {
        guidesGrid.innerHTML = `
            <div class="no-guides" style="grid-column: 1 / -1;">
                <div class="no-guides-icon">📚</div>
                <h3>No hay guías disponibles</h3>
                <p>Las guías aparecerán aquí cuando sean publicadas</p>
            </div>
        `;
        return;
    }
    
    guidesGrid.innerHTML = guides.map(guide => `
        <div class="guide-card" onclick="viewGuide('${guide.id}')">
            <div class="guide-card-icon">📖</div>
            <h3 class="guide-card-title">${guide.title}</h3>
            <p class="guide-card-description">${guide.description || 'Sin descripción'}</p>
            <button class="guide-card-button">Ver Guía</button>
        </div>
    `).join('');
}

function filterGuides() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const guides = getPublishedGuides();
    const guidesGrid = document.getElementById('guidesGrid');
    
    if (!guidesGrid) return;
    
    const filteredGuides = guides.filter(guide => 
        guide.title.toLowerCase().includes(searchTerm) ||
        (guide.description && guide.description.toLowerCase().includes(searchTerm))
    );
    
    if (filteredGuides.length === 0) {
        guidesGrid.innerHTML = `
            <div class="no-guides" style="grid-column: 1 / -1;">
                <div class="no-guides-icon">🔍</div>
                <h3>No se encontraron guías</h3>
                <p>Intenta con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }
    
    guidesGrid.innerHTML = filteredGuides.map(guide => `
        <div class="guide-card" onclick="viewGuide('${guide.id}')">
            <div class="guide-card-icon">📖</div>
            <h3 class="guide-card-title">${guide.title}</h3>
            <p class="guide-card-description">${guide.description || 'Sin descripción'}</p>
            <button class="guide-card-button">Ver Guía</button>
        </div>
    `).join('');
}

function viewGuide(guideId) {
    window.location.href = `guide-view.html?id=${guideId}`;
}

// Guide View Page Functions

function loadGuideView() {
    const urlParams = new URLSearchParams(window.location.search);
    const guideId = urlParams.get('id');
    const guideContent = document.getElementById('guideContent');
    
    if (!guideContent) return;
    
    if (!guideId) {
        guideContent.innerHTML = `
            <div class="no-guide">
                <div class="no-guide-icon">❌</div>
                <h3>Guía no encontrada</h3>
                <p>No se especificó ninguna guía para ver</p>
            </div>
        `;
        return;
    }
    
    const guide = getGuideById(guideId);
    
    if (!guide) {
        guideContent.innerHTML = `
            <div class="no-guide">
                <div class="no-guide-icon">❌</div>
                <h3>Guía no encontrada</h3>
                <p>La guía que buscas no existe o no está disponible</p>
            </div>
        `;
        return;
    }
    
    if (!guide.published) {
        guideContent.innerHTML = `
            <div class="no-guide">
                <div class="no-guide-icon">🔒</div>
                <h3>Guía no publicada</h3>
                <p>Esta guía aún no está disponible para el público</p>
            </div>
        `;
        return;
    }
    
    // Sort embeds by order
    const sortedEmbeds = guide.embeds.sort((a, b) => a.order - b.order);
    
    guideContent.innerHTML = `
        <h1 class="guide-title">${guide.title}</h1>
        <p class="guide-description">${guide.description || ''}</p>
        
        <div class="embed-container">
            ${sortedEmbeds.map(embed => createEmbedHTML(embed)).join('')}
        </div>
    `;
}

function createEmbedHTML(embed) {
    const accentColor = embed.accentColor || '#7C5CFF';
    
    return `
        <div class="embed" style="border-left-color: ${accentColor};">
            ${embed.title ? `
                <div class="embed-header" style="background: linear-gradient(135deg, ${accentColor}20 0%, transparent 100%);">
                    <h3 class="embed-title" style="color: ${accentColor};">${embed.title}</h3>
                    ${embed.subtitle ? `<p class="embed-subtitle">${embed.subtitle}</p>` : ''}
                </div>
            ` : ''}
            <div class="embed-content">
                ${formatContent(embed.content)}
            </div>
        </div>
    `;
}

function formatContent(content) {
    if (!content) return '';
    
    // Return HTML content directly (no markdown conversion)
    return content;
}

function goBack() {
    window.location.href = 'guide.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('guide.html') && !currentPath.includes('guide-view.html')) {
        // Guide index page
        loadGuides();
    } else if (currentPath.includes('guide-view.html')) {
        // Guide view page
        loadGuideView();
    }
});
