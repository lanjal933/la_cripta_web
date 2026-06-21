// Adventure Editor UI - Visual Node Graph Editor
const ADVENTURES_STORAGE_KEY = 'dd_adventures';
const ADMIN_PASSWORD = 'la_cripta_2024';

let adventureId = null;
let adventureData = null;
let nodes = [];
let selectedNode = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let isDraggingChoice = false;
let draggedChoice = null;
let dragLine = null;
let isDraggingConnection = false;
let draggedConnection = null;

// DOM Elements
const graphCanvas = document.getElementById('graphCanvas');
const nodesContainer = document.getElementById('nodesContainer');
const connectionsSvg = document.getElementById('connectionsSvg');
const nodeModal = document.getElementById('nodeModal');
const nodeForm = document.getElementById('nodeForm');
const nodesList = document.getElementById('nodesList');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    adventureId = new URLSearchParams(window.location.search).get('id');
    
    if (!adventureId) {
        alert('No se especificó un juego');
        window.location.href = 'aventuras.html';
        return;
    }
    
    loadAdventure();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('saveBtn').addEventListener('click', saveAdventure);
    document.getElementById('testBtn').addEventListener('click', testAdventure);
    document.getElementById('addNodeBtn').addEventListener('click', () => openNodeModal());
    document.getElementById('addNodeBtn2').addEventListener('click', () => openNodeModal());
    document.getElementById('autoLayoutBtn').addEventListener('click', autoLayoutNodes);
    document.getElementById('updateInfoBtn').addEventListener('click', updateAdventureInfo);
    document.getElementById('editPartyBtn').addEventListener('click', editParty);
    
    // Node modal
    document.getElementById('closeNodeModal').addEventListener('click', closeNodeModal);
    document.getElementById('cancelNodeBtn').addEventListener('click', closeNodeModal);
    nodeForm.addEventListener('submit', handleNodeSubmit);
    
    // Tabs
    document.getElementById('graphTab').addEventListener('click', () => switchTab('graph'));
    document.getElementById('nodesTab').addEventListener('click', () => switchTab('nodes'));
    document.getElementById('minigamesTab').addEventListener('click', () => switchTab('minigames'));
    document.getElementById('previewTab').addEventListener('click', () => switchTab('preview'));
    
    // Minigames
    document.getElementById('addMinigameBtn').addEventListener('click', () => openMinigameEditor());
    document.getElementById('saveMinigameBtn').addEventListener('click', () => saveMinigame());
    document.getElementById('cancelMinigameBtn').addEventListener('click', () => closeMinigameEditor());
    document.getElementById('deleteMinigameBtn').addEventListener('click', () => deleteMinigame());
    
    // Close modal on outside click
    nodeModal.addEventListener('click', (e) => {
        if (e.target === nodeModal) closeNodeModal();
    });

    // Graph canvas drag
    graphCanvas.addEventListener('mousedown', handleCanvasMouseDown);
    document.addEventListener('mousemove', handleCanvasMouseMove);
    document.addEventListener('mouseup', handleCanvasMouseUp);
}

// LocalStorage Functions
function getAdventures() {
    const data = localStorage.getItem(ADVENTURES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveAdventures(adventures) {
    localStorage.setItem(ADVENTURES_STORAGE_KEY, JSON.stringify(adventures));
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
    
    nodes = adventureData.nodes || [];
    
    // Load adventure info
    document.getElementById('editTitle').value = adventureData.title;
    document.getElementById('editCategory').value = adventureData.category;
    document.getElementById('editDescription').value = adventureData.description;
    document.getElementById('editLevel').value = adventureData.level;
    document.getElementById('editPlayers').value = adventureData.players || 1;
    
    updateStatusDisplay();
    renderGraph();
    renderNodesList();
}

function updateStatusDisplay() {
    const statusEl = document.getElementById('adventureStatus');
    const statusMap = {
        'draft': '<span class="text-yellow-400">Borrador</span>',
        'published': '<span class="text-green-400">Publicado</span>'
    };
    statusEl.innerHTML = `Estado: ${statusMap[adventureData.status] || adventureData.status}`;
}

// Render Graph
function renderGraph() {
    nodesContainer.innerHTML = '';
    connectionsSvg.innerHTML = '';
    
    // Add arrow marker
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
        </marker>
    `;
    connectionsSvg.appendChild(defs);
    
    // Render connections first
    nodes.forEach(node => {
        if (node.choices) {
            node.choices.forEach(choice => {
                const targetNode = nodes.find(n => n.id === choice.target);
                if (targetNode) {
                    drawConnection(node, targetNode);
                }
            });
        }
    });
    
    // Render nodes
    nodes.forEach(node => {
        const nodeEl = createNodeElement(node);
        nodesContainer.appendChild(nodeEl);
    });
}

function createNodeElement(node) {
    const el = document.createElement('div');
    el.className = 'node bg-gray-800 border border-neon-violet/30 rounded-lg p-4 shadow-lg transition-all duration-200 relative';
    el.style.left = (node.x || 100) + 'px';
    el.style.top = (node.y || 100) + 'px';
    el.dataset.nodeId = node.id;
    el.style.minWidth = '220px';
    el.style.position = 'absolute';
    
    const isStart = adventureData.startNodeId === node.id;
    
    // Connection points (3 top, 3 sides, 3 bottom)
    const connectionPoints = `
        <!-- Top points -->
        <div class="connection-point top-left" data-position="top-left" style="position: absolute; top: -6px; left: 25%; width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point top-center" data-position="top-center" style="position: absolute; top: -6px; left: 50%; transform: translateX(-50%); width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point top-right" data-position="top-right" style="position: absolute; top: -6px; right: 25%; width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        
        <!-- Side points -->
        <div class="connection-point left-top" data-position="left-top" style="position: absolute; left: -6px; top: 25%; width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point left-center" data-position="left-center" style="position: absolute; left: -6px; top: 50%; transform: translateY(-50%); width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point left-bottom" data-position="left-bottom" style="position: absolute; left: -6px; bottom: 25%; width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point right-top" data-position="right-top" style="position: absolute; right: -6px; top: 25%; width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point right-center" data-position="right-center" style="position: absolute; right: -6px; top: 50%; transform: translateY(-50%); width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point right-bottom" data-position="right-bottom" style="position: absolute; right: -6px; bottom: 25%; width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        
        <!-- Bottom points -->
        <div class="connection-point bottom-left" data-position="bottom-left" style="position: absolute; bottom: -6px; left: 25%; width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point bottom-center" data-position="bottom-center" style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
        <div class="connection-point bottom-right" data-position="bottom-right" style="position: absolute; bottom: -6px; right: 25%; width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%; cursor: crosshair; z-index: 10;"></div>
    `;
    
    // Build choices HTML
    let choicesHtml = '';
    if (node.choices && node.choices.length > 0) {
        choicesHtml = `
            <div class="choices-section mt-3 pt-3 border-t border-gray-700">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs text-gray-400">Opciones (${node.choices.length})</span>
                    <button class="toggle-choices-btn text-xs text-neon-violet hover:text-violet-400">▼</button>
                </div>
                <div class="choices-list space-y-2">
                    ${node.choices.map((choice, index) => `
                        <div class="choice-item flex items-center gap-2 bg-gray-700/50 p-2 rounded group">
                            <div class="choice-connector w-3 h-3 bg-neon-violet rounded-full cursor-move hover:bg-violet-400 transition-colors" data-choice-index="${index}" data-node-id="${node.id}"></div>
                            <span class="choice-text text-xs text-gray-300 flex-1 truncate">${choice.text}</span>
                            <span class="choice-target text-xs text-gray-500">${choice.target ? '→ ' + choice.target : ''}</span>
                            <button class="edit-choice-btn text-xs text-blue-400 hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" data-choice-index="${index}">✏️</button>
                            <button class="delete-choice-btn text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity" data-choice-index="${index}">🗑️</button>
                        </div>
                    `).join('')}
                    <button class="add-choice-btn w-full bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 rounded transition-colors mt-2">+ Agregar Opción</button>
                </div>
            </div>
        `;
    } else {
        choicesHtml = `
            <div class="choices-section mt-3 pt-3 border-t border-gray-700">
                <button class="add-choice-btn w-full bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 rounded transition-colors">+ Agregar Opción</button>
            </div>
        `;
    }
    
    el.innerHTML = `
        ${connectionPoints}
        <div class="flex items-center gap-2 mb-2">
            ${isStart ? '<span class="bg-green-600 text-white text-xs px-2 py-1 rounded">INICIO</span>' : ''}
            <h3 class="font-title text-lg text-neon-violet">${node.title}</h3>
        </div>
        <p class="text-gray-400 text-sm mb-2 line-clamp-2">${node.narrative.substring(0, 50)}...</p>
        <div class="flex gap-2 mt-3">
            <button class="edit-node-btn bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">Editar</button>
            <button class="delete-node-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors">Eliminar</button>
        </div>
        ${choicesHtml}
    `;
    
    // Event listeners
    el.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.classList.contains('choice-connector') || e.target.classList.contains('connection-point')) return;
        isDragging = true;
        selectedNode = node;
        const rect = el.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
    });
    
    el.querySelector('.edit-node-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openNodeModal(node);
    });
    
    el.querySelector('.delete-node-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteNode(node.id);
    });
    
    // Toggle choices visibility
    const toggleBtn = el.querySelector('.toggle-choices-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const choicesList = el.querySelector('.choices-list');
            choicesList.classList.toggle('hidden');
            toggleBtn.textContent = choicesList.classList.contains('hidden') ? '▼' : '▲';
        });
    }
    
    // Add choice button
    el.querySelectorAll('.add-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addChoiceToNode(node.id);
        });
    });
    
    // Edit choice buttons
    el.querySelectorAll('.edit-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const choiceIndex = parseInt(btn.dataset.choiceIndex);
            editChoice(node.id, choiceIndex);
        });
    });
    
    // Delete choice buttons
    el.querySelectorAll('.delete-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const choiceIndex = parseInt(btn.dataset.choiceIndex);
            deleteChoice(node.id, choiceIndex);
        });
    });
    
    // Choice connector drag
    el.querySelectorAll('.choice-connector').forEach(connector => {
        connector.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startChoiceDrag(e, node.id, parseInt(connector.dataset.choiceIndex));
        });
    });
    
    // Connection points drag (for creating new connections)
    el.querySelectorAll('.connection-point').forEach(point => {
        point.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            startConnectionDrag(e, node.id, point.dataset.position);
        });
    });
    
    // Make node a drop target
    el.addEventListener('dragover', (e) => {
        e.preventDefault();
        el.classList.add('border-neon-violet', 'shadow-violet-glow');
        el.style.transform = 'scale(1.05)';
    });
    
    el.addEventListener('dragleave', (e) => {
        el.classList.remove('border-neon-violet', 'shadow-violet-glow');
        el.style.transform = 'scale(1)';
    });
    
    el.addEventListener('drop', (e) => {
        e.preventDefault();
        el.classList.remove('border-neon-violet', 'shadow-violet-glow');
        el.style.transform = 'scale(1)';
        
        if (isDraggingChoice && draggedChoice) {
            const targetNodeId = node.id;
            if (targetNodeId !== draggedChoice.nodeId) {
                connectChoiceToNode(draggedChoice.nodeId, draggedChoice.choiceIndex, targetNodeId);
            }
        }
    });
    
    el.addEventListener('click', () => {
        selectedNode = node;
        showNodePreview(node);
    });
    
    return el;
}

function drawConnection(fromNode, toNode) {
    const fromX = (fromNode.x || 100) + 100;
    const fromY = (fromNode.y || 100) + 50;
    const toX = (toNode.x || 100) + 100;
    const toY = (toNode.y || 100) + 50;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const midX = (fromX + toX) / 2;
    const d = `M ${fromX} ${fromY} Q ${midX} ${fromY} ${toX} ${toY}`;
    
    path.setAttribute('d', d);
    path.setAttribute('class', 'connection');
    path.setAttribute('stroke-width', '2');
    connectionsSvg.appendChild(path);
}

// Canvas drag handlers
function handleCanvasMouseDown(e) {
    if (e.target.closest('.node')) return;
}

function handleCanvasMouseMove(e) {
    if (isDraggingChoice && draggedChoice) {
        // Update drag line
        const rect = graphCanvas.getBoundingClientRect();
        const startX = draggedChoice.startX;
        const startY = draggedChoice.startY;
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;
        
        if (dragLine) {
            dragLine.setAttribute('x2', endX);
            dragLine.setAttribute('y2', endY);
        }
        return;
    }
    
    if (isDraggingConnection && draggedConnection) {
        // Update drag line for connection point
        const rect = graphCanvas.getBoundingClientRect();
        const startX = draggedConnection.startX;
        const startY = draggedConnection.startY;
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;
        
        if (dragLine) {
            dragLine.setAttribute('x2', endX);
            dragLine.setAttribute('y2', endY);
        }
        return;
    }
    
    if (!isDragging || !selectedNode) return;
    
    const rect = graphCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    
    selectedNode.x = Math.max(0, x);
    selectedNode.y = Math.max(0, y);
    
    const nodeEl = nodesContainer.querySelector(`[data-node-id="${selectedNode.id}"]`);
    if (nodeEl) {
        nodeEl.style.left = selectedNode.x + 'px';
        nodeEl.style.top = selectedNode.y + 'px';
    }
    
    renderGraph();
}

function handleCanvasMouseUp(e) {
    if (isDraggingChoice && draggedChoice) {
        // Check if dropped on a node
        const targetNode = e.target.closest('.node');
        if (targetNode) {
            const targetNodeId = targetNode.dataset.nodeId;
            // Don't connect to self
            if (targetNodeId !== draggedChoice.nodeId) {
                connectChoiceToNode(draggedChoice.nodeId, draggedChoice.choiceIndex, targetNodeId);
            }
        } else {
            // If not dropped on a node, show message
            console.log('Dropped outside node');
        }
        
        // Clean up
        if (dragLine) {
            dragLine.remove();
            dragLine = null;
        }
        isDraggingChoice = false;
        draggedChoice = null;
        return;
    }
    
    if (isDraggingConnection && draggedConnection) {
        // Check if dropped on a node
        const targetNode = e.target.closest('.node');
        if (targetNode) {
            const targetNodeId = targetNode.dataset.nodeId;
            // Don't connect to self
            if (targetNodeId !== draggedConnection.nodeId) {
                createConnectionFromPoint(draggedConnection.nodeId, draggedConnection.position, targetNodeId);
            }
        }
        
        // Clean up
        if (dragLine) {
            dragLine.remove();
            dragLine = null;
        }
        isDraggingConnection = false;
        draggedConnection = null;
        return;
    }
    
    isDragging = false;
}

// Start choice drag
function startChoiceDrag(e, nodeId, choiceIndex) {
    e.preventDefault();
    e.stopPropagation();
    
    isDraggingChoice = true;
    draggedChoice = { nodeId, choiceIndex };
    
    const connector = e.target;
    const rect = connector.getBoundingClientRect();
    const canvasRect = graphCanvas.getBoundingClientRect();
    
    const startX = rect.left + rect.width / 2 - canvasRect.left;
    const startY = rect.top + rect.height / 2 - canvasRect.top;
    
    draggedChoice.startX = startX;
    draggedChoice.startY = startY;
    
    // Create drag line
    dragLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    dragLine.setAttribute('x1', startX);
    dragLine.setAttribute('y1', startY);
    dragLine.setAttribute('x2', startX);
    dragLine.setAttribute('y2', startY);
    dragLine.setAttribute('stroke', '#8b5cf6');
    dragLine.setAttribute('stroke-width', '3');
    dragLine.setAttribute('stroke-dasharray', '5,5');
    dragLine.style.pointerEvents = 'none';
    connectionsSvg.appendChild(dragLine);
}

// Start connection point drag
function startConnectionDrag(e, nodeId, position) {
    e.preventDefault();
    e.stopPropagation();
    
    isDraggingConnection = true;
    draggedConnection = { nodeId, position };
    
    const point = e.target;
    const rect = point.getBoundingClientRect();
    const canvasRect = graphCanvas.getBoundingClientRect();
    
    const startX = rect.left + rect.width / 2 - canvasRect.left;
    const startY = rect.top + rect.height / 2 - canvasRect.top;
    
    draggedConnection.startX = startX;
    draggedConnection.startY = startY;
    
    // Create drag line
    dragLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    dragLine.setAttribute('x1', startX);
    dragLine.setAttribute('y1', startY);
    dragLine.setAttribute('x2', startX);
    dragLine.setAttribute('y2', startY);
    dragLine.setAttribute('stroke', '#8b5cf6');
    dragLine.setAttribute('stroke-width', '3');
    dragLine.setAttribute('stroke-dasharray', '5,5');
    dragLine.style.pointerEvents = 'none';
    connectionsSvg.appendChild(dragLine);
}

// Create connection from point
function createConnectionFromPoint(nodeId, position, targetNodeId) {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Create a new choice from this connection
    const positionNames = {
        'top-left': 'Arriba izquierda',
        'top-center': 'Arriba centro',
        'top-right': 'Arriba derecha',
        'left-top': 'Izquierda arriba',
        'left-center': 'Izquierda centro',
        'left-bottom': 'Izquierda abajo',
        'right-top': 'Derecha arriba',
        'right-center': 'Derecha centro',
        'right-bottom': 'Derecha abajo',
        'bottom-left': 'Abajo izquierda',
        'bottom-center': 'Abajo centro',
        'bottom-right': 'Abajo derecha'
    };
    
    if (!node.choices) node.choices = [];
    
    const newChoice = {
        text: `Opción desde ${positionNames[position]}`,
        target: targetNodeId
    };
    
    node.choices.push(newChoice);
    
    adventureData.nodes = nodes;
    saveAdventureData();
    renderGraph();
    
    console.log(`Created connection from ${nodeId} (${position}) to ${targetNodeId}`);
}

// Connect choice to node
function connectChoiceToNode(nodeId, choiceIndex, targetNodeId) {
    const node = nodes.find(n => n.id === nodeId);
    const targetNode = nodes.find(n => n.id === targetNodeId);
    
    if (!node || !node.choices[choiceIndex]) {
        console.error('Source node or choice not found');
        return;
    }
    
    if (!targetNode) {
        console.error('Target node not found:', targetNodeId);
        alert('El nodo destino no existe');
        return;
    }
    
    // Update choice target
    node.choices[choiceIndex].target = targetNodeId;
    
    // Save and re-render
    adventureData.nodes = nodes;
    saveAdventureData();
    renderGraph();
    
    console.log(`Connected choice ${choiceIndex} from ${nodeId} to ${targetNodeId}`);
}

// Add choice to node
function addChoiceToNode(nodeId) {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    if (!node.choices) node.choices = [];
    
    const newChoice = {
        text: 'Nueva opción',
        target: ''
    };
    
    node.choices.push(newChoice);
    
    adventureData.nodes = nodes;
    saveAdventureData();
    renderGraph();
}

// Edit choice
function editChoice(nodeId, choiceIndex) {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !node.choices[choiceIndex]) return;
    
    const choice = node.choices[choiceIndex];
    const newText = prompt('Editar texto de la opción:', choice.text);
    if (newText !== null) {
        choice.text = newText;
        
        adventureData.nodes = nodes;
        saveAdventureData();
        renderGraph();
    }
}

// Delete choice
function deleteChoice(nodeId, choiceIndex) {
    if (!checkAdminPassword()) return;
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !node.choices) return;
    
    node.choices.splice(choiceIndex, 1);
    
    adventureData.nodes = nodes;
    saveAdventureData();
    renderGraph();
}

// Render Nodes List
function renderNodesList() {
    nodesList.innerHTML = '';
    
    if (nodes.length === 0) {
        nodesList.innerHTML = '<p class="text-gray-400 text-center py-8">No hay nodos aún. Agrega el primer nodo para comenzar.</p>';
        return;
    }
    
    nodes.forEach(node => {
        const card = createNodeCard(node);
        nodesList.appendChild(card);
    });
}

function createNodeCard(node) {
    const card = document.createElement('div');
    card.className = 'bg-gray-800/50 border border-gray-700 rounded-lg p-4';
    
    const isStart = adventureData.startNodeId === node.id;
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <div>
                <h3 class="font-title text-lg text-neon-violet">${node.title} ${isStart ? '<span class="bg-green-600 text-white text-xs px-2 py-1 rounded ml-2">INICIO</span>' : ''}</h3>
                <p class="text-gray-500 text-sm">ID: ${node.id}</p>
            </div>
            <div class="flex gap-2">
                <button class="edit-node-btn bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">Editar</button>
                <button class="delete-node-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors">Eliminar</button>
            </div>
        </div>
        <p class="text-gray-400 text-sm mb-3 line-clamp-2">${node.narrative.substring(0, 100)}...</p>
        <div class="flex flex-wrap gap-2 mb-3">
            <span class="text-gray-500 text-xs">${node.choices ? node.choices.length : 0} opciones</span>
            ${node.dice && node.dice.length > 0 ? '<span class="text-gray-500 text-xs">🎲 Tiene dados</span>' : ''}
            ${node.conditions && node.conditions.length > 0 ? '<span class="text-gray-500 text-xs">🔀 Tiene condiciones</span>' : ''}
        </div>
    `;
    
    card.querySelector('.edit-node-btn').addEventListener('click', () => openNodeModal(node));
    card.querySelector('.delete-node-btn').addEventListener('click', () => deleteNode(node.id));
    
    return card;
}

// Node Modal
function openNodeModal(node = null) {
    nodeForm.reset();
    
    if (node) {
        document.getElementById('nodeId').value = node.id;
        document.getElementById('nodeId').readOnly = true;
        document.getElementById('nodeTitle').value = node.title;
        document.getElementById('nodeNarrative').value = node.narrative;
        document.getElementById('isStartNode').checked = adventureData.startNodeId === node.id;
    } else {
        document.getElementById('nodeId').value = '';
        document.getElementById('nodeId').readOnly = false;
        document.getElementById('isStartNode').checked = nodes.length === 0;
    }
    
    nodeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeNodeModal() {
    nodeModal.classList.add('hidden');
    document.body.style.overflow = '';
}

function handleNodeSubmit(e) {
    e.preventDefault();
    
    const nodeId = document.getElementById('nodeId').value;
    const title = document.getElementById('nodeTitle').value;
    const narrative = document.getElementById('nodeNarrative').value;
    const isStart = document.getElementById('isStartNode').checked;
    
    // Parse DSL - CRITICAL: This converts Markdown to JSON structure
    const parsedNode = adventureEngine.parseDSL(narrative);
    parsedNode.id = nodeId;
    parsedNode.title = title;
    parsedNode.x = parsedNode.x || 100 + Math.random() * 200;
    parsedNode.y = parsedNode.y || 100 + Math.random() * 200;
    
    // CRITICAL: Convert to storage format (JSON only, no Markdown links)
    const storageNode = adventureEngine.nodeToStorageFormat(parsedNode);
    
    // Check if node already exists
    const existingIndex = nodes.findIndex(n => n.id === nodeId);
    
    if (existingIndex > -1) {
        // Update existing node
        nodes[existingIndex] = storageNode;
    } else {
        // Add new node
        nodes.push(storageNode);
    }
    
    // Set as start node if checked
    if (isStart) {
        adventureData.startNodeId = nodeId;
    }
    
    adventureData.nodes = nodes;
    adventureData.updatedAt = new Date().toISOString();
    
    saveAdventureData();
    closeNodeModal();
    renderGraph();
    renderNodesList();
}

function deleteNode(nodeId) {
    if (!checkAdminPassword()) return;
    if (!confirm('¿Estás seguro de eliminar este nodo?')) return;
    
    nodes = nodes.filter(n => n.id !== nodeId);
    
    // Remove this node as start node if it was
    if (adventureData.startNodeId === nodeId) {
        adventureData.startNodeId = nodes.length > 0 ? nodes[0].id : null;
    }
    
    adventureData.nodes = nodes;
    adventureData.updatedAt = new Date().toISOString();
    
    saveAdventureData();
    renderGraph();
    renderNodesList();
}

// Auto Layout
function autoLayoutNodes() {
    const levels = {};
    const visited = new Set();
    
    // Build level hierarchy
    function assignLevel(nodeId, level) {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);
        
        if (!levels[level]) levels[level] = [];
        levels[level].push(nodeId);
        
        const node = nodes.find(n => n.id === nodeId);
        if (node && node.choices) {
            node.choices.forEach(choice => {
                assignLevel(choice.targetNodeId, level + 1);
            });
        }
    }
    
    if (adventureData.startNodeId) {
        assignLevel(adventureData.startNodeId, 0);
    }
    
    // Position nodes
    Object.keys(levels).forEach(level => {
        const nodesInLevel = levels[level];
        const y = parseInt(level) * 200 + 100;
        
        nodesInLevel.forEach((nodeId, index) => {
            const node = nodes.find(n => n.id === nodeId);
            if (node) {
                node.x = (index + 1) * 250;
                node.y = y;
            }
        });
    });
    
    renderGraph();
}

// Switch Tab
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-neon-violet', 'text-white');
        btn.classList.add('bg-gray-800', 'text-gray-300');
    });
    
    document.getElementById(`${tab}Tab`).classList.remove('bg-gray-800', 'text-gray-300');
    document.getElementById(`${tab}Tab`).classList.add('bg-neon-violet', 'text-white');
    
    document.getElementById('graphSection').classList.add('hidden');
    document.getElementById('nodesSection').classList.add('hidden');
    document.getElementById('minigamesSection').classList.add('hidden');
    document.getElementById('previewSection').classList.add('hidden');
    
    document.getElementById(`${tab}Section`).classList.remove('hidden');
    
    // Load minigames when switching to minigames tab
    if (tab === 'minigames') {
        loadMinigames();
    }
}

// Show Node Preview
function showNodePreview(node) {
    const previewContent = document.getElementById('previewContent');
    const parsed = adventureEngine.parseDSL(node.narrative);
    
    previewContent.innerHTML = `
        <h2 class="font-title text-3xl text-neon-violet mb-4">${node.title}</h2>
        <div class="markdown-content text-gray-300 text-lg leading-relaxed mb-6">
            ${adventureEngine.renderMarkdown(parsed.narrative)}
        </div>
        ${parsed.choices.length > 0 ? `
            <div class="space-y-3">
                ${parsed.choices.map(choice => `
                    <button class="w-full bg-gray-800 hover:bg-gray-700 border border-neon-violet/30 text-white text-left p-4 rounded-lg transition-all duration-300">
                        ${choice.text}
                    </button>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    switchTab('preview');
}

// Update Adventure Info
function updateAdventureInfo() {
    adventureData.title = document.getElementById('editTitle').value;
    adventureData.category = document.getElementById('editCategory').value;
    adventureData.description = document.getElementById('editDescription').value;
    adventureData.level = parseInt(document.getElementById('editLevel').value);
    adventureData.players = parseInt(document.getElementById('editPlayers').value);
    adventureData.updatedAt = new Date().toISOString();
    
    saveAdventureData();
    alert('Información actualizada');
}

// Save Adventure
function saveAdventure() {
    // CRITICAL: Convert all nodes to storage format before saving
    adventureData.nodes = nodes.map(node => adventureEngine.nodeToStorageFormat(node));
    adventureData.updatedAt = new Date().toISOString();
    
    saveAdventureData();
    alert('Aventura guardada exitosamente');
}

function saveAdventureData() {
    const adventures = getAdventures();
    const index = adventures.findIndex(a => a.id === adventureId);
    
    if (index > -1) {
        adventures[index] = adventureData;
    }
    
    saveAdventures(adventures);
}

// Test Adventure
function testAdventure() {
    if (!adventureData.startNodeId) {
        alert('La aventura no tiene un nodo inicial. Configura uno en el editor.');
        return;
    }
    
    window.location.href = `aventura-play.html?id=${adventureId}&test=true`;
}

// Edit Party
function editParty() {
    if (!checkAdminPassword()) return;
    
    // Open party editing modal
    const party = adventureData.party || [];
    let partyHtml = '<div class="space-y-4">';
    
    party.forEach((char, index) => {
        partyHtml += `
            <div class="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div class="flex justify-between items-start mb-3">
                    <h4 class="font-title text-lg text-neon-violet">Personaje ${index + 1}</h4>
                    <button type="button" class="remove-char-btn text-red-400 hover:text-red-300 text-sm" data-index="${index}">Eliminar</button>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Nombre</label>
                        <input type="text" class="edit-char-name w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none" value="${char.name}" data-index="${index}">
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Clase</label>
                        <select class="edit-char-class w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none" data-index="${index}">
                            <option value="Warrior" ${char.class === 'Warrior' ? 'selected' : ''}>Guerrero</option>
                            <option value="Mage" ${char.class === 'Mage' ? 'selected' : ''}>Mago</option>
                            <option value="Rogue" ${char.class === 'Rogue' ? 'selected' : ''}>Pícaro</option>
                            <option value="Cleric" ${char.class === 'Cleric' ? 'selected' : ''}>Clérigo</option>
                            <option value="Ranger" ${char.class === 'Ranger' ? 'selected' : ''}>Ranger</option>
                            <option value="Adventurer" ${char.class === 'Adventurer' ? 'selected' : ''}>Aventurero</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">HP Máximo</label>
                        <input type="number" class="edit-char-hp w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none" value="${char.maxHp}" min="1" data-index="${index}">
                    </div>
                    <div class="col-span-2">
                        <label class="block text-xs text-gray-400 mb-1">Stats (FUE/DES/CON/INT/SAB/CAR)</label>
                        <div class="grid grid-cols-6 gap-2">
                            <input type="number" class="edit-char-stat-str w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none text-center" value="${char.stats.strength}" min="1" max="20" data-index="${index}">
                            <input type="number" class="edit-char-stat-dex w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none text-center" value="${char.stats.dexterity}" min="1" max="20" data-index="${index}">
                            <input type="number" class="edit-char-stat-con w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none text-center" value="${char.stats.constitution}" min="1" max="20" data-index="${index}">
                            <input type="number" class="edit-char-stat-int w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none text-center" value="${char.stats.intelligence}" min="1" max="20" data-index="${index}">
                            <input type="number" class="edit-char-stat-wis w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none text-center" value="${char.stats.wisdom}" min="1" max="20" data-index="${index}">
                            <input type="number" class="edit-char-stat-cha w-full bg-gray-700 border border-gray-600 text-white text-sm p-2 rounded focus:border-neon-violet focus:outline-none text-center" value="${char.stats.charisma}" min="1" max="20" data-index="${index}">
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    partyHtml += `
        <button type="button" id="addNewCharBtn" class="bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-4 rounded transition-colors">
            + Agregar Personaje
        </button>
    </div>
    <div class="flex gap-4 mt-4">
        <button type="button" id="savePartyBtn" class="flex-1 bg-neon-violet hover:bg-violet-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
            Guardar Party
        </button>
        <button type="button" id="cancelPartyBtn" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
            Cancelar
        </button>
    </div>`;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-dark-umbra border border-neon-violet/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-violet-glow p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="font-title text-2xl text-neon-violet">Editar Party</h2>
                <button id="closePartyModal" class="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            ${partyHtml}
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Event listeners
    modal.querySelector('#closePartyModal').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });
    
    modal.querySelector('#cancelPartyBtn').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });
    
    modal.querySelector('#addNewCharBtn').addEventListener('click', () => {
        if (!checkAdminPassword()) return;
        const newChar = {
            id: `char_${Date.now()}`,
            name: `Personaje ${party.length + 1}`,
            class: 'Adventurer',
            maxHp: 20,
            currentHp: 20,
            stats: {
                strength: 10,
                dexterity: 10,
                constitution: 10,
                intelligence: 10,
                wisdom: 10,
                charisma: 10
            },
            inventory: []
        };
        party.push(newChar);
        modal.remove();
        editParty(); // Re-open modal with new character
    });
    
    modal.querySelectorAll('.remove-char-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!checkAdminPassword()) return;
            const index = parseInt(btn.dataset.index);
            party.splice(index, 1);
            modal.remove();
            editParty(); // Re-open modal
        });
    });
    
    modal.querySelector('#savePartyBtn').addEventListener('click', () => {
        // Collect updated party data
        const updatedParty = [];
        modal.querySelectorAll('.bg-gray-800\\/50.border').forEach(charEl => {
            const index = parseInt(charEl.querySelector('.remove-char-btn').dataset.index);
            if (party[index]) {
                updatedParty.push({
                    ...party[index],
                    name: charEl.querySelector('.edit-char-name').value,
                    class: charEl.querySelector('.edit-char-class').value,
                    maxHp: parseInt(charEl.querySelector('.edit-char-hp').value),
                    currentHp: parseInt(charEl.querySelector('.edit-char-hp').value),
                    stats: {
                        strength: parseInt(charEl.querySelector('.edit-char-stat-str').value),
                        dexterity: parseInt(charEl.querySelector('.edit-char-stat-dex').value),
                        constitution: parseInt(charEl.querySelector('.edit-char-stat-con').value),
                        intelligence: parseInt(charEl.querySelector('.edit-char-stat-int').value),
                        wisdom: parseInt(charEl.querySelector('.edit-char-stat-wis').value),
                        charisma: parseInt(charEl.querySelector('.edit-char-stat-cha').value)
                    }
                });
            }
        });
        
        adventureData.party = updatedParty;
        adventureData.updatedAt = new Date().toISOString();
        saveAdventureData();
        
        modal.remove();
        document.body.style.overflow = '';
        renderPartyList();
        alert('Party actualizada exitosamente');
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
}

// ==================== MINIGAMES MANAGEMENT ====================

let currentMinigameId = null;
const MINIGAMES_STORAGE_KEY = 'adventure_minigames';

function getMinigames() {
    const data = localStorage.getItem(MINIGAMES_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

function saveMinigamesData(minigames) {
    localStorage.setItem(MINIGAMES_STORAGE_KEY, JSON.stringify(minigames));
}

function loadMinigames() {
    const minigames = getMinigames();
    const adventureMinigames = minigames[adventureId] || [];
    const minigameList = document.getElementById('minigameList');
    
    if (adventureMinigames.length === 0) {
        minigameList.innerHTML = '<p class="text-silver-soft">No hay minijuegos creados. Haz clic en "Nuevo Minijuego" para crear uno.</p>';
        return;
    }
    
    minigameList.innerHTML = '';
    adventureMinigames.forEach(minigame => {
        const card = document.createElement('div');
        card.className = 'bg-bg-panel border border-violet-primary/20 rounded-lg p-4 cursor-pointer hover:border-violet-primary transition-colors';
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-title text-lg text-violet-primary">${minigame.name}</h3>
                    <p class="text-gray-500 text-sm">ID: ${minigame.id}</p>
                    <p class="text-gray-400 text-sm mt-1">${minigame.description || 'Sin descripción'}</p>
                </div>
                <div class="flex gap-2">
                    <button class="edit-minigame-btn bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">Editar</button>
                    <button class="delete-minigame-btn bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition-colors">Eliminar</button>
                </div>
            </div>
        `;
        
        card.querySelector('.edit-minigame-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            editMinigame(minigame.id);
        });
        
        card.querySelector('.delete-minigame-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteMinigameById(minigame.id);
        });
        
        card.addEventListener('click', () => {
            editMinigame(minigame.id);
        });
        
        minigameList.appendChild(card);
    });
}

function openMinigameEditor(minigame = null) {
    currentMinigameId = minigame ? minigame.id : null;
    
    document.getElementById('minigameList').classList.add('hidden');
    document.getElementById('minigameEditor').classList.remove('hidden');
    
    if (minigame) {
        document.getElementById('minigameId').value = minigame.id;
        document.getElementById('minigameId').readOnly = true;
        document.getElementById('minigameName').value = minigame.name;
        document.getElementById('minigameDescription').value = minigame.description || '';
        document.getElementById('minigameHTML').value = minigame.html || '';
        document.getElementById('minigameCSS').value = minigame.css || '';
        document.getElementById('minigameJS').value = minigame.js || '';
        document.getElementById('deleteMinigameBtn').classList.remove('hidden');
    } else {
        document.getElementById('minigameId').value = '';
        document.getElementById('minigameId').readOnly = false;
        document.getElementById('minigameName').value = '';
        document.getElementById('minigameDescription').value = '';
        document.getElementById('minigameHTML').value = '';
        document.getElementById('minigameCSS').value = '';
        document.getElementById('minigameJS').value = '';
        document.getElementById('deleteMinigameBtn').classList.add('hidden');
    }
    
    updateMinigamePreview();
}

function closeMinigameEditor() {
    document.getElementById('minigameList').classList.remove('hidden');
    document.getElementById('minigameEditor').classList.add('hidden');
    currentMinigameId = null;
    loadMinigames();
}

function saveMinigame() {
    const id = document.getElementById('minigameId').value;
    const name = document.getElementById('minigameName').value;
    const description = document.getElementById('minigameDescription').value;
    const html = document.getElementById('minigameHTML').value;
    const css = document.getElementById('minigameCSS').value;
    const js = document.getElementById('minigameJS').value;
    
    if (!id || !name) {
        alert('El ID y el nombre son obligatorios');
        return;
    }
    
    const minigames = getMinigames();
    if (!minigames[adventureId]) {
        minigames[adventureId] = [];
    }
    
    const minigameData = {
        id,
        name,
        description,
        html,
        css,
        js,
        updatedAt: new Date().toISOString()
    };
    
    if (currentMinigameId) {
        // Update existing minigame
        const index = minigames[adventureId].findIndex(m => m.id === currentMinigameId);
        if (index > -1) {
            minigames[adventureId][index] = minigameData;
        }
    } else {
        // Check if ID already exists
        if (minigames[adventureId].find(m => m.id === id)) {
            alert('Ya existe un minijuego con ese ID');
            return;
        }
        // Add new minigame
        minigames[adventureId].push(minigameData);
    }
    
    saveMinigamesData(minigames);
    alert('Minijuego guardado exitosamente');
    closeMinigameEditor();
}

function editMinigame(id) {
    const minigames = getMinigames();
    const adventureMinigames = minigames[adventureId] || [];
    const minigame = adventureMinigames.find(m => m.id === id);
    
    if (minigame) {
        openMinigameEditor(minigame);
    }
}

function deleteMinigame() {
    if (!currentMinigameId) {
        alert('No hay minijuego seleccionado');
        return;
    }
    
    if (!confirm('¿Estás seguro de eliminar este minijuego?')) {
        return;
    }
    
    deleteMinigameById(currentMinigameId);
    closeMinigameEditor();
}

function deleteMinigameById(id) {
    if (!confirm('¿Estás seguro de eliminar este minijuego?')) {
        return;
    }
    
    const minigames = getMinigames();
    if (minigames[adventureId]) {
        minigames[adventureId] = minigames[adventureId].filter(m => m.id !== id);
        saveMinigamesData(minigames);
        loadMinigames();
    }
}

function updateMinigamePreview() {
    const html = document.getElementById('minigameHTML').value;
    const css = document.getElementById('minigameCSS').value;
    const js = document.getElementById('minigameJS').value;
    const preview = document.getElementById('minigamePreview');
    
    if (!html && !css && !js) {
        preview.innerHTML = '<p class="text-silver-soft">El preview aparecerá aquí después de guardar</p>';
        return;
    }
    
    // Create a sandboxed preview
    const previewContent = `
        <style>
            ${css}
        </style>
        ${html}
        <script>
            try {
                ${js}
            } catch (e) {
                console.error('Minigame JS error:', e);
            }
        <\/script>
    `;
    
    preview.innerHTML = previewContent;
}

// Add live preview listeners
document.addEventListener('DOMContentLoaded', function() {
    const minigameHTML = document.getElementById('minigameHTML');
    const minigameCSS = document.getElementById('minigameCSS');
    const minigameJS = document.getElementById('minigameJS');
    
    if (minigameHTML) {
        minigameHTML.addEventListener('input', updateMinigamePreview);
    }
    if (minigameCSS) {
        minigameCSS.addEventListener('input', updateMinigamePreview);
    }
    if (minigameJS) {
        minigameJS.addEventListener('input', updateMinigamePreview);
    }
});
