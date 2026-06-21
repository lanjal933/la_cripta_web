// Adventure UI - Sistema de Interfaz de Juegos
const ADVENTURES_STORAGE_KEY = 'dd_adventures';

const searchInput = document.getElementById('adventureSearch');
const soloAdventuresGrid = document.getElementById('soloAdventuresGrid');
const groupAdventuresGrid = document.getElementById('groupAdventuresGrid');
const soloEmptyState = document.getElementById('soloEmptyState');
const groupEmptyState = document.getElementById('groupEmptyState');

let allAdventures = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing adventure system...');
    loadAdventures();
    setupSearch();
    
    // Create adventure button
    const createBtn = document.getElementById('createAdventureBtn');
    if (createBtn) {
        createBtn.addEventListener('click', createNewAdventure);
    }
});

function setupSearch() {
    if (!searchInput) return;
    searchInput.addEventListener('input', () => renderAdventures());
}

// LocalStorage Functions
function getAdventures() {
    const data = localStorage.getItem(ADVENTURES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveAdventures(adventures) {
    localStorage.setItem(ADVENTURES_STORAGE_KEY, JSON.stringify(adventures));
}

// Load Adventures
function loadAdventures() {
    console.log('Loading adventures...');
    allAdventures = getAdventures();
    console.log('Found adventures:', allAdventures.length);
    renderAdventures();
    console.log('Adventures loaded successfully');
}

function getAdventureSection(adventure) {
    const type = (adventure.type || '').toLowerCase();
    if (type === 'solo' || type === 'solitario') return 'solo';
    if (type === 'group' || type === 'grupo') return 'group';
    if (Array.isArray(adventure.party) && adventure.party.length > 1) return 'group';
    return 'solo';
}

function matchesSearch(adventure, term) {
    if (!term) return true;
    const haystack = [
        adventure.title,
        adventure.description,
        adventure.category,
        String(adventure.level || ''),
        Array.isArray(adventure.tags) ? adventure.tags.join(' ') : ''
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
    return haystack.includes(term);
}

function renderAdventures() {
    const term = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();

    if (soloAdventuresGrid) soloAdventuresGrid.innerHTML = '';
    if (groupAdventuresGrid) groupAdventuresGrid.innerHTML = '';

    let soloCount = 0;
    let groupCount = 0;

    const filtered = allAdventures.filter(a => matchesSearch(a, term));

    filtered.forEach(adventure => {
        const section = getAdventureSection(adventure);
        const card = createAdventureCard(adventure, section);
        if (section === 'group') {
            groupCount++;
            if (groupAdventuresGrid) groupAdventuresGrid.appendChild(card);
        } else {
            soloCount++;
            if (soloAdventuresGrid) soloAdventuresGrid.appendChild(card);
        }
    });

    if (soloEmptyState) soloEmptyState.classList.toggle('hidden', soloCount > 0);
    if (groupEmptyState) groupEmptyState.classList.toggle('hidden', groupCount > 0);
}

// Create Adventure Card
function createAdventureCard(adventure, section) {
    const card = document.createElement('div');
    card.className = 'bg-bg-card/85 border border-violet-primary/20 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer backdrop-blur-sm hover:bg-bg-hover/85 hover:border-violet-primary/35 hover:-translate-y-0.5';
    
    const nodeCount = adventure.nodes ? adventure.nodes.length : 0;
    const badge = section === 'group' ? 'Grupo' : 'Solitario';
    const cover = adventure.coverImage
        ? `<img src="${adventure.coverImage}" alt="${adventure.title}" class="w-full h-48 object-cover" onerror="this.style.display='none'">`
        : `<div class="w-full h-48 bg-gradient-to-br from-violet-primary/15 to-arcane-blue/10 flex items-center justify-center"><span class="text-6xl">⚔️</span></div>`;
    
    card.innerHTML = `
        <div class="relative">
            ${cover}
            <div class="absolute top-3 left-3">
                <span class="bg-bg-panel/80 border border-violet-primary/20 text-silver-soft text-xs px-2 py-1 rounded">${badge}</span>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-title text-xl text-violet-primary mb-2">${adventure.title || adventure.name || adventure.nombre || adventure.id || 'Sin nombre'}</h3>
            <p class="text-silver-soft/80 text-sm mb-3 line-clamp-2">${adventure.description || adventure.descripcion || adventure.type || adventure.tipo || ''}</p>
            <div class="flex flex-wrap gap-2 mb-3">
                <span class="bg-bg-panel/70 border border-violet-primary/10 text-silver-soft text-xs px-2 py-1 rounded">${adventure.category}</span>
                <span class="bg-bg-panel/70 border border-violet-primary/10 text-silver-soft text-xs px-2 py-1 rounded">Nivel ${adventure.level}</span>
                <span class="bg-bg-panel/70 border border-violet-primary/10 text-silver-soft text-xs px-2 py-1 rounded">${nodeCount} escenas</span>
            </div>
            <div class="flex items-center justify-between text-sm text-silver-soft/70">
                <span>📖 ${nodeCount}</span>
                <span>${formatDate(adventure.createdAt)}</span>
            </div>
            <div class="mt-3 pt-3 border-t border-violet-primary/10 flex gap-2">
                <button class="play-btn flex-1 bg-violet-primary hover:bg-violet-soft text-white text-xs py-2 rounded transition-colors" data-id="${adventure.id}">
                    🎮 Jugar
                </button>
                <button class="edit-btn bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded transition-colors" data-id="${adventure.id}">
                    ✏️
                </button>
                <button class="delete-btn bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 rounded transition-colors" data-id="${adventure.id}">
                    🗑️
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const playBtn = card.querySelector('.play-btn');
    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');
    
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playAdventure(adventure.id);
    });
    
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        editAdventure(adventure.id);
    });
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteAdventure(adventure.id);
    });
    
    return card;
}

// Play Adventure
function playAdventure(adventureId) {
    const adventures = getAdventures();
    const adventure = adventures.find(a => a.id === adventureId);
    
    if (adventure) {
        localStorage.setItem('current_adventure', JSON.stringify(adventure));
        window.location.href = 'aventura-play.html';
    }
}

// Edit Adventure
function editAdventure(adventureId) {
    window.location.href = `aventura-editor.html?id=${adventureId}`;
}

// Create New Adventure
function createNewAdventure() {
    const newId = 'adv_' + Date.now().toString(36);
    const newAdventure = {
        id: newId,
        title: 'Nueva Aventura',
        description: 'Descripción de la aventura...',
        category: 'Fantasy',
        level: 1,
        players: 1,
        type: 'solo',
        status: 'draft',
        nodes: [],
        startNodeId: null,
        party: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    const adventures = getAdventures();
    adventures.push(newAdventure);
    saveAdventures(adventures);
    
    // Redirect to editor
    window.location.href = `aventura-editor.html?id=${newId}`;
}

// Delete Adventure
function deleteAdventure(adventureId) {
    if (!confirm('¿Estás seguro de eliminar esta aventura?')) return;
    
    const adventures = getAdventures();
    const filtered = adventures.filter(a => a.id !== adventureId);
    saveAdventures(filtered);
    loadAdventures();
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
