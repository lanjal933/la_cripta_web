// Demo Adventure Editor Module - LocalStorage based
const DEMO_STORAGE_KEY = 'demo_adventures';
const ADMIN_PASSWORD = 'la_cripta_2024'; // Contraseña para editar juegos

let adventureId = null;
let adventureData = null;
let chapters = [];
let isAuthenticated = false;

// DOM Elements
const chapterModal = document.getElementById('chapterModal');
const choiceModal = document.getElementById('choiceModal');
const chapterForm = document.getElementById('chapterForm');
const choiceForm = document.getElementById('choiceForm');
const chaptersList = document.getElementById('chaptersList');
const flowVisualization = document.getElementById('flowVisualization');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    adventureId = new URLSearchParams(window.location.search).get('id');
    
    if (!adventureId) {
        alert('No se especificó un juego');
        window.location.href = 'aventuras.html';
        return;
    }
    
    // Check authentication
    checkAuthentication();
});

function checkAuthentication() {
    const storedAuth = localStorage.getItem('editor_auth');
    if (storedAuth === ADMIN_PASSWORD) {
        isAuthenticated = true;
        loadAdventure();
        setupEventListeners();
    } else {
        promptPassword();
    }
}

function promptPassword() {
    const password = prompt('Ingresa la contraseña de administrador para editar juegos:');
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('editor_auth', password);
        isAuthenticated = true;
        loadAdventure();
        setupEventListeners();
    } else {
        alert('Contraseña incorrecta');
        window.location.href = 'aventuras.html';
    }
}

function setupEventListeners() {
    document.getElementById('saveBtn').addEventListener('click', saveAdventure);
    document.getElementById('testBtn').addEventListener('click', testAdventure);
    document.getElementById('addChapterBtn').addEventListener('click', () => openChapterModal());
    document.getElementById('updateInfoBtn').addEventListener('click', updateAdventureInfo);
    
    // Chapter modal
    document.getElementById('closeChapterModal').addEventListener('click', closeChapterModal);
    document.getElementById('cancelChapterBtn').addEventListener('click', closeChapterModal);
    chapterForm.addEventListener('submit', handleChapterSubmit);
    
    // Choice modal
    document.getElementById('closeChoiceModal').addEventListener('click', closeChoiceModal);
    document.getElementById('cancelChoiceBtn').addEventListener('click', closeChoiceModal);
    choiceForm.addEventListener('submit', handleChoiceSubmit);
    
    // Close modals on outside click
    chapterModal.addEventListener('click', (e) => {
        if (e.target === chapterModal) closeChapterModal();
    });
    choiceModal.addEventListener('click', (e) => {
        if (e.target === choiceModal) closeChoiceModal();
    });
}

// LocalStorage Functions
function getAdventures() {
    const data = localStorage.getItem(DEMO_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveAdventures(adventures) {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(adventures));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Load Adventure
function loadAdventure() {
    const adventures = getAdventures();
    adventureData = adventures.find(a => a.id === adventureId);
    
    if (!adventureData) {
        alert('Juego no encontrado');
        window.location.href = 'aventuras.html';
        return;
    }
    
    chapters = adventureData.chapters || [];
    
    // Load adventure info
    document.getElementById('editTitle').value = adventureData.title;
    document.getElementById('editCategory').value = adventureData.category;
    document.getElementById('editDescription').value = adventureData.description;
    document.getElementById('editLevel').value = adventureData.recommendedLevel;
    document.getElementById('editPlayers').value = adventureData.recommendedPlayers;
    
    updateStatusDisplay();
    renderChapters();
    renderFlowVisualization();
}

function updateStatusDisplay() {
    const statusEl = document.getElementById('adventureStatus');
    const statusMap = {
        'draft': '<span class="text-yellow-400">Borrador</span>',
        'published': '<span class="text-green-400">Publicado</span>'
    };
    statusEl.innerHTML = `Estado: ${statusMap[adventureData.status] || adventureData.status}`;
}

function renderChapters() {
    chaptersList.innerHTML = '';
    
    if (chapters.length === 0) {
        chaptersList.innerHTML = '<p class="text-gray-400 text-center py-8">No hay capítulos aún. Agrega el primer capítulo para comenzar.</p>';
        return;
    }
    
    const sortedChapters = [...chapters].sort((a, b) => a.order - b.order);
    
    sortedChapters.forEach(chapter => {
        const chapterCard = createChapterCard(chapter);
        chaptersList.appendChild(chapterCard);
    });
}

function createChapterCard(chapter) {
    const card = document.createElement('div');
    card.className = 'bg-gray-800/50 border border-gray-700 rounded-lg p-4';
    
    const endingBadge = chapter.isEnding 
        ? `<span class="bg-purple-600 text-white text-xs px-2 py-1 rounded ml-2">${chapter.endingType || 'Final'}</span>` 
        : '';
    
    // Generate choices HTML
    const choicesHtml = chapter.choices && chapter.choices.length > 0 
        ? chapter.choices.map(choice => `
            <div class="flex items-center justify-between bg-gray-900/50 p-2 rounded mb-2">
                <span class="text-gray-300 text-sm flex-1">${choice.text}</span>
                <div class="flex gap-2">
                    <button class="edit-choice-btn text-blue-400 hover:text-blue-300 text-xs" data-chapter-id="${chapter.id}" data-choice-id="${choice.id}">
                        ✏️
                    </button>
                    <button class="delete-choice-btn text-red-400 hover:text-red-300 text-xs" data-chapter-id="${chapter.id}" data-choice-id="${choice.id}">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('')
        : '<p class="text-gray-500 text-xs italic">Sin opciones</p>';
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <div>
                <h3 class="font-title text-lg text-neon-violet">${chapter.title} ${endingBadge}</h3>
                <p class="text-gray-500 text-sm">Orden: ${chapter.order}</p>
            </div>
            <div class="flex gap-2">
                <button class="edit-chapter-btn bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors" data-id="${chapter.id}">
                    Editar
                </button>
                <button class="add-choice-btn bg-neon-violet hover:bg-violet-600 text-white text-xs px-3 py-1 rounded transition-colors" data-id="${chapter.id}">
                    + Opción
                </button>
                <button class="delete-chapter-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors" data-id="${chapter.id}">
                    Eliminar
                </button>
            </div>
        </div>
        <p class="text-gray-400 text-sm mb-3 line-clamp-2">${chapter.narrativeText}</p>
        <div class="flex flex-wrap gap-2 mb-3">
            ${chapter.images.length > 0 ? `<span class="text-gray-500 text-xs">📷 ${chapter.images.length} imágenes</span>` : ''}
            ${chapter.rewards.length > 0 ? `<span class="text-gray-500 text-xs">🎁 ${chapter.rewards.length} recompensas</span>` : ''}
        </div>
        <div class="border-t border-gray-700 pt-3">
            <p class="text-gray-500 text-xs mb-2">Opciones:</p>
            ${choicesHtml}
        </div>
    `;
    
    // Event listeners
    card.querySelector('.edit-chapter-btn').addEventListener('click', () => openChapterModal(chapter));
    card.querySelector('.delete-chapter-btn').addEventListener('click', () => deleteChapter(chapter.id));
    card.querySelector('.add-choice-btn').addEventListener('click', () => openChoiceModal(chapter.id));
    
    // Choice event listeners
    card.querySelectorAll('.edit-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chapterId = e.target.dataset.chapterId;
            const choiceId = e.target.dataset.choiceId;
            editChoice(chapterId, choiceId);
        });
    });
    
    card.querySelectorAll('.delete-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chapterId = e.target.dataset.chapterId;
            const choiceId = e.target.dataset.choiceId;
            deleteChoice(chapterId, choiceId);
        });
    });
    
    return card;
}

function getChoiceCount(chapterId) {
    let count = 0;
    chapters.forEach(chapter => {
        if (chapter.choices) {
            count += chapter.choices.filter(c => c.chapterId === chapterId).length;
        }
    });
    return count;
}

function renderFlowVisualization() {
    if (chapters.length === 0) {
        flowVisualization.innerHTML = '<p class="text-gray-400">Agrega capítulos para ver el flujo de la aventura</p>';
        return;
    }
    
    const sortedChapters = [...chapters].sort((a, b) => a.order - b.order);
    
    let html = '<div class="flex flex-col items-center gap-4">';
    
    sortedChapters.forEach((chapter, index) => {
        const isEnding = chapter.isEnding ? '🏁' : '📖';
        const hasChoices = getChoiceCount(chapter.id) > 0;
        
        html += `
            <div class="flex items-center gap-4">
                <div class="bg-gray-800 border border-neon-violet/30 rounded-lg p-4 min-w-[200px]">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-2xl">${isEnding}</span>
                        <span class="font-title text-neon-violet">${chapter.title}</span>
                    </div>
                    <p class="text-gray-500 text-xs">Orden: ${chapter.order}</p>
                    ${hasChoices ? '<p class="text-gray-500 text-xs mt-1">🔀 Tiene opciones</p>' : ''}
                </div>
                ${index < sortedChapters.length - 1 ? '<div class="text-neon-violet text-2xl">↓</div>' : ''}
            </div>
        `;
    });
    
    html += '</div>';
    flowVisualization.innerHTML = html;
}

function openChapterModal(chapter = null) {
    chapterForm.reset();
    document.getElementById('chapterId').value = chapter ? chapter.id : '';
    document.getElementById('chapterTitle').value = chapter ? chapter.title : '';
    document.getElementById('chapterOrder').value = chapter ? chapter.order : chapters.length;
    document.getElementById('chapterNarrative').value = chapter ? chapter.narrativeText : '';
    document.getElementById('chapterImages').value = chapter ? chapter.images.join('\n') : '';
    document.getElementById('chapterRewards').value = chapter ? chapter.rewards.join('\n') : '';
    document.getElementById('chapterConditions').value = chapter ? chapter.conditions.join('\n') : '';
    document.getElementById('isEnding').checked = chapter ? chapter.isEnding : false;
    document.getElementById('endingType').value = chapter ? chapter.endingType || '' : '';
    
    chapterModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeChapterModal() {
    chapterModal.classList.add('hidden');
    document.body.style.overflow = '';
    chapterForm.reset();
}

function handleChapterSubmit(e) {
    e.preventDefault();
    
    const chapterId = document.getElementById('chapterId').value;
    const chapterData = {
        id: chapterId || generateId(),
        title: document.getElementById('chapterTitle').value,
        narrativeText: document.getElementById('chapterNarrative').value,
        order: parseInt(document.getElementById('chapterOrder').value),
        images: document.getElementById('chapterImages').value.split('\n').map(i => i.trim()).filter(i => i),
        rewards: document.getElementById('chapterRewards').value.split('\n').map(r => r.trim()).filter(r => r),
        conditions: document.getElementById('chapterConditions').value.split('\n').map(c => c.trim()).filter(c => c),
        isEnding: document.getElementById('isEnding').checked,
        endingType: document.getElementById('endingType').value || null,
        choices: []
    };
    
    if (chapterId) {
        // Update existing chapter
        const index = chapters.findIndex(c => c.id === chapterId);
        if (index !== -1) {
            chapterData.choices = chapters[index].choices;
            chapters[index] = chapterData;
        }
    } else {
        // Add new chapter
        chapters.push(chapterData);
    }
    
    saveAdventureData();
    closeChapterModal();
    renderChapters();
    renderFlowVisualization();
}

function deleteChapter(chapterId) {
    if (!confirm('¿Estás seguro de eliminar este capítulo?')) return;
    
    chapters = chapters.filter(c => c.id !== chapterId);
    
    // Also remove choices that reference this chapter
    chapters.forEach(chapter => {
        if (chapter.choices) {
            chapter.choices = chapter.choices.filter(c => c.targetChapterId !== chapterId);
        }
    });
    
    saveAdventureData();
    renderChapters();
    renderFlowVisualization();
}

function openChoiceModal(chapterId, choice = null) {
    choiceForm.reset();
    document.getElementById('choiceId').value = choice ? choice.id : '';
    document.getElementById('choiceChapterId').value = chapterId;
    document.getElementById('choiceText').value = choice ? choice.text : '';
    document.getElementById('choiceOrder').value = choice ? choice.order : getChoiceCount(chapterId);
    document.getElementById('choiceConditions').value = choice ? choice.conditions.join('\n') : '';
    document.getElementById('choiceOutcomes').value = choice ? choice.outcomes.join('\n') : '';
    
    // Populate target chapter dropdown
    const targetSelect = document.getElementById('choiceTargetChapter');
    targetSelect.innerHTML = '<option value="">Seleccionar capítulo destino</option>';
    
    const sortedChapters = [...chapters].sort((a, b) => a.order - b.order);
    sortedChapters.forEach(chapter => {
        if (chapter.id !== chapterId) {
            const option = document.createElement('option');
            option.value = chapter.id;
            option.textContent = `${chapter.order}. ${chapter.title}`;
            targetSelect.appendChild(option);
        }
    });
    
    // Set target chapter if editing
    if (choice && choice.targetChapterId) {
        targetSelect.value = choice.targetChapterId;
    }
    
    choiceModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeChoiceModal() {
    choiceModal.classList.add('hidden');
    document.body.style.overflow = '';
    choiceForm.reset();
}

function handleChoiceSubmit(e) {
    e.preventDefault();
    
    const choiceId = document.getElementById('choiceId').value;
    const choiceData = {
        id: choiceId || generateId(),
        text: document.getElementById('choiceText').value,
        targetChapterId: document.getElementById('choiceTargetChapter').value || null,
        conditions: document.getElementById('choiceConditions').value.split('\n').map(c => c.trim()).filter(c => c),
        outcomes: document.getElementById('choiceOutcomes').value.split('\n').map(o => o.trim()).filter(o => o),
        order: parseInt(document.getElementById('choiceOrder').value),
        chapterId: document.getElementById('choiceChapterId').value
    };
    
    const chapterId = document.getElementById('choiceChapterId').value;
    const chapter = chapters.find(c => c.id === chapterId);
    
    if (chapter) {
        if (!chapter.choices) chapter.choices = [];
        
        if (choiceId) {
            // Update existing choice
            const index = chapter.choices.findIndex(c => c.id === choiceId);
            if (index !== -1) {
                chapter.choices[index] = choiceData;
            }
        } else {
            // Add new choice
            chapter.choices.push(choiceData);
        }
    }
    
    saveAdventureData();
    closeChoiceModal();
    renderChapters();
}

function editChoice(chapterId, choiceId) {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter || !chapter.choices) return;
    
    const choice = chapter.choices.find(c => c.id === choiceId);
    if (!choice) return;
    
    openChoiceModal(chapterId, choice);
}

function deleteChoice(chapterId, choiceId) {
    if (!confirm('¿Estás seguro de eliminar esta opción?')) return;
    
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter || !chapter.choices) return;
    
    chapter.choices = chapter.choices.filter(c => c.id !== choiceId);
    
    saveAdventureData();
    renderChapters();
}

function updateAdventureInfo() {
    adventureData.title = document.getElementById('editTitle').value;
    adventureData.category = document.getElementById('editCategory').value;
    adventureData.description = document.getElementById('editDescription').value;
    adventureData.recommendedLevel = parseInt(document.getElementById('editLevel').value);
    adventureData.recommendedPlayers = parseInt(document.getElementById('editPlayers').value);
    adventureData.updatedAt = new Date().toISOString();
    
    saveAdventureData();
    alert('Información actualizada');
}

function saveAdventure() {
    adventureData.updatedAt = new Date().toISOString();
    saveAdventureData();
    alert('Aventura guardada exitosamente');
}

function saveAdventureData() {
    adventureData.chapters = chapters;
    adventureData.updatedAt = new Date().toISOString();
    
    const adventures = getAdventures();
    const index = adventures.findIndex(a => a.id === adventureId);
    
    if (index !== -1) {
        adventures[index] = adventureData;
        saveAdventures(adventures);
    }
}

function testAdventure() {
    if (chapters.length === 0) {
        alert('Agrega al menos un capítulo antes de probar la aventura');
        return;
    }
    
    window.open(`aventura-view.html?id=${adventureId}`, '_blank');
}
