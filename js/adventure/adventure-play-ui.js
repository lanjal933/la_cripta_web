// Adventure Play UI - Sistema de Juego
const ADVENTURES_STORAGE_KEY = 'dd_adventures';

// DOM Elements
const loadingState = document.getElementById('loadingState');
const characterAssignmentModal = document.getElementById('characterAssignmentModal');
const adventureContent = document.getElementById('adventureContent');
const partyAssignmentList = document.getElementById('partyAssignmentList');
const startAdventureBtn = document.getElementById('startAdventureBtn');
const partyList = document.getElementById('partyList');
const activeCharacterInfo = document.getElementById('activeCharacterInfo');
const chapterTitle = document.getElementById('chapterTitle');
const chapterNarrative = document.getElementById('chapterNarrative');
const choicesContainer = document.getElementById('choicesContainer');
const diceResults = document.getElementById('diceResults');
const diceResultContent = document.getElementById('diceResultContent');
const checkResults = document.getElementById('checkResults');
const checkResultContent = document.getElementById('checkResultContent');
const restartBtn = document.getElementById('restartBtn');
const saveBtn = document.getElementById('saveBtn');

// Game State
let currentAdventure = null;
let currentNode = null;
let party = [];
let activeCharacter = null;
let gameState = {};
let currentParsed = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Adventure play page loaded');
    loadAdventure();
    setupEventListeners();
});

function isSoloAdventure() {
    const type = (currentAdventure && currentAdventure.type ? currentAdventure.type : '').toLowerCase();
    return type === 'solo' || type === 'solitario';
}

function setupEventListeners() {
    if (startAdventureBtn) {
        startAdventureBtn.addEventListener('click', startAdventure);
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', restartAdventure);
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveGame);
    }
    
    // Dice buttons
    document.querySelectorAll('.dice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dice = btn.dataset.dice;
            rollDice(dice);
        });
    });
}

function loadAdventure() {
    console.log('Loading adventure from localStorage...');
    const adventureData = localStorage.getItem('current_adventure');
    
    if (!adventureData) {
        console.error('No adventure data found');
        loadingState.innerHTML = '<p class="text-red-400">Error: No se encontró la aventura</p>';
        return;
    }
    
    try {
        currentAdventure = JSON.parse(adventureData);
        console.log('Adventure loaded:', currentAdventure.title);
        
        // Check if adventure has party and is not solo
        if (currentAdventure.party && currentAdventure.party.length > 0 && !isSoloAdventure()) {
            showCharacterAssignment();
        } else {
            startAdventureDirectly();
        }
    } catch (error) {
        console.error('Error parsing adventure data:', error);
        loadingState.innerHTML = '<p class="text-red-400">Error al cargar la aventura</p>';
    }
}

function showCharacterAssignment() {
    console.log('Showing character assignment modal');
    loadingState.classList.add('hidden');
    characterAssignmentModal.classList.remove('hidden');

    const modalTitle = characterAssignmentModal.querySelector('h2');
    const modalText = characterAssignmentModal.querySelector('p');
    if (modalTitle) modalTitle.textContent = isSoloAdventure() ? 'Elegí tu Personaje' : 'Asignación de Personajes';
    if (modalText) modalText.textContent = isSoloAdventure() ? 'Elegí un personaje y empezá la aventura en solitario' : 'Deben repartirse un personaje con sus stats por participante';
    
    partyAssignmentList.innerHTML = '';
    
    currentAdventure.party.forEach((character, index) => {
        const characterCard = document.createElement('div');
        characterCard.className = 'bg-gray-800/50 border border-gray-700 rounded-lg p-4';
        characterCard.innerHTML = `
            <div class="flex items-center gap-3 mb-3">
                <span class="text-2xl">🎭</span>
                <div>
                    <h4 class="font-title text-lg text-violet-primary">${character.name}</h4>
                    <p class="text-gray-400 text-sm">${character.class}</p>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-2 text-xs mb-3">
                <div class="bg-gray-700/50 p-2 rounded text-center">
                    <span class="text-gray-400">HP</span>
                    <span class="text-white font-bold">${character.maxHp}</span>
                </div>
                <div class="bg-gray-700/50 p-2 rounded text-center">
                    <span class="text-gray-400">FUE</span>
                    <span class="text-white font-bold">${character.stats.strength}</span>
                </div>
                <div class="bg-gray-700/50 p-2 rounded text-center">
                    <span class="text-gray-400">DES</span>
                    <span class="text-white font-bold">${character.stats.dexterity}</span>
                </div>
            </div>
            <button class="assign-btn w-full bg-violet-primary hover:bg-violet-soft text-white text-sm py-2 rounded transition-colors" data-index="${index}">
                Asignar
            </button>
        `;
        
        characterCard.querySelector('.assign-btn').addEventListener('click', () => {
            assignCharacter(index);
        });
        
        partyAssignmentList.appendChild(characterCard);
    });
}

function assignCharacter(index) {
    console.log('Character assigned:', index);
    activeCharacter = currentAdventure.party[index];
    
    // Update UI to show assigned character
    document.querySelectorAll('.assign-btn').forEach(btn => {
        btn.classList.remove('bg-green-600');
        btn.classList.add('bg-violet-primary');
        btn.textContent = 'Asignar';
    });
    
    const assignedBtn = document.querySelector(`.assign-btn[data-index="${index}"]`);
    assignedBtn.classList.remove('bg-violet-primary');
    assignedBtn.classList.add('bg-green-600');
    assignedBtn.textContent = '✓ Asignado';
}

function startAdventure() {
    if (!activeCharacter) {
        alert('Por favor asigna un personaje primero');
        return;
    }
    
    console.log('Starting adventure with character:', activeCharacter.name);
    characterAssignmentModal.classList.add('hidden');
    adventureContent.classList.remove('hidden');
    restartBtn.classList.remove('hidden');
    
    // Load adventure in engine
    adventureEngine.loadAdventure(currentAdventure);
    party = isSoloAdventure() ? [activeCharacter] : currentAdventure.party;
    
    // Go to start node
    goToNode(currentAdventure.startNodeId);
}

function startAdventureDirectly() {
    console.log('Starting adventure directly (no party)');
    loadingState.classList.add('hidden');
    adventureContent.classList.remove('hidden');
    restartBtn.classList.remove('hidden');
    
    // Load adventure in engine
    adventureEngine.loadAdventure(currentAdventure);
    
    // Go to start node
    goToNode(currentAdventure.startNodeId);
}

function goToNode(nodeId) {
    console.log('Going to node:', nodeId);
    const node = adventureEngine.goToNode(nodeId);
    
    if (!node) {
        console.error('Node not found:', nodeId);
        return;
    }
    
    currentNode = node;
    renderCurrentNode();
    updatePartyPanel();
    updateCharacterPanel();
}

function renderCurrentNode() {
    console.log('Rendering current node:', currentNode.title);
    
    // If this adventure is a minigame, show a dedicated header and present rules nicely
    const isMinigame = currentAdventure && (currentAdventure.type || '').toLowerCase() === 'minigame';
    const minigameHeader = document.getElementById('minigameHeader');
    const minigameCover = document.getElementById('minigameCover');
    const minigameTitle = document.getElementById('minigameTitle');
    const minigameDesc = document.getElementById('minigameDesc');

    if (isMinigame && minigameHeader && minigameCover) {
        minigameHeader.classList.remove('hidden');
        // Set cover (fallback if missing)
        const cover = currentAdventure.coverImage || '../images/placeholder_cover.jpg';
        minigameCover.src = cover;
        minigameTitle.textContent = currentAdventure.title || currentNode.title;
        minigameDesc.textContent = currentAdventure.description || '';
    } else if (minigameHeader) {
        minigameHeader.classList.add('hidden');
    }

    // Update title
    chapterTitle.textContent = currentNode.title;

    // For minigames render raw markdown to avoid DSL stripping
    if (isMinigame) {
        currentParsed = { narrative: currentNode.narrative };
        const rendered = adventureEngine.renderMarkdown(currentNode.narrative);
        chapterNarrative.innerHTML = rendered;
    } else {
        // Parse and render narrative for regular adventures
        currentParsed = adventureEngine.parseDSL(currentNode.narrative);
        const rendered = adventureEngine.renderMarkdown(currentParsed.narrative);
        chapterNarrative.innerHTML = rendered;
    }
    // If minigame, apply special class to make rules scrollable
    if (isMinigame) {
        chapterNarrative.classList.add('minigame');
    } else {
        chapterNarrative.classList.remove('minigame');
    }

    if (diceResults) diceResults.classList.add('hidden');
    if (diceResultContent) diceResultContent.innerHTML = '';
    if (checkResults) checkResults.classList.add('hidden');
    if (checkResultContent) checkResultContent.innerHTML = '';
    
    // Render choices
    renderChoices(currentNode.choices || []);
    
    // Handle events (checks, combat, etc.)
    const events = (currentNode.events && currentNode.events.length) ? currentNode.events : (currentParsed.events || []);
    handleNodeEvents(events);
    
    // Handle dice rolls
    const dice = (currentNode.dice && currentNode.dice.length) ? currentNode.dice : (currentParsed.dice || []);
    handleNodeDice(dice);
    
    // Handle variables
    const variables = (currentNode.variables && currentNode.variables.length) ? currentNode.variables : (currentParsed.variables || []);
    handleNodeVariables(variables);
    
    // Handle items
    const items = (currentNode.items && currentNode.items.length) ? currentNode.items : (currentParsed.items || []);
    handleNodeItems(items);
}

function renderChoices(choices) {
    console.log('Rendering choices:', choices.length);
    choicesContainer.innerHTML = '';
    
    if (choices.length === 0) {
        // End of adventure
        choicesContainer.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-400 text-lg">Fin de la aventura</p>
                <button onclick="restartAdventure()" class="mt-4 bg-violet-primary hover:bg-violet-soft text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                    🔄 Reiniciar Aventura
                </button>
            </div>
        `;
        return;
    }
    
    choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-btn w-full bg-gray-800 hover:bg-gray-700 border border-violet-primary/20 text-white text-left p-4 rounded-lg transition-all duration-300';
        choiceBtn.innerHTML = `
            <span class="text-violet-primary font-bold mr-2">${index + 1}.</span>
            <span>${choice.text}</span>
        `;
        choiceBtn.addEventListener('click', () => makeChoice(index));
        choicesContainer.appendChild(choiceBtn);
    });
}

function makeChoice(index) {
    console.log('Making choice:', index);
    const choice = currentNode.choices[index];
    
    if (choice && choice.target) {
        goToNode(choice.target);
    }
}

function handleNodeEvents(events) {
    console.log('Handling events:', events.length);
    
    events.forEach(event => {
        if (event.type === 'check') {
            performCheck(event);
        } else if (event.type === 'combat') {
            initiateCombat(event);
        }
    });
}

function performCheck(checkEvent) {
    console.log('Performing check:', checkEvent.stat, 'DC:', checkEvent.dc);
    const result = adventureEngine.performCheck(checkEvent.stat, checkEvent.dc, activeCharacter);
    
    checkResults.classList.remove('hidden');
    const conditionalText = result.success
        ? (currentParsed && currentParsed.conditional ? currentParsed.conditional.success.join('\n\n') : '')
        : (currentParsed && currentParsed.conditional ? currentParsed.conditional.failure.join('\n\n') : '');
    checkResultContent.innerHTML = `
        <p class="text-gray-300 mb-2">
            <span class="text-violet-primary font-bold">${checkEvent.stat.toUpperCase()}</span> 
            contra DC ${checkEvent.dc}
        </p>
        <p class="text-lg mb-2">
            Tirada: <span class="font-bold">${result.roll}</span> + 
            Modificador: <span class="font-bold">${result.stat}</span> = 
            <span class="font-bold ${result.success ? 'text-green-400' : 'text-red-400'}">${result.total}</span>
        </p>
        <p class="${result.success ? 'text-green-400' : 'text-red-400'} font-bold">
            ${result.success ? '✓ ÉXITO' : '✗ FALLO'}
        </p>
        ${conditionalText ? `<div class="mt-3 pt-3 border-t border-violet-primary/10 markdown-content text-silver-soft">${adventureEngine.renderMarkdown(conditionalText)}</div>` : ''}
    `;
    
    // Navigate to success or fail node if specified
    const nodeExists = (id) => {
        if (!id || !currentAdventure || !Array.isArray(currentAdventure.nodes)) return false;
        return currentAdventure.nodes.some(n => n.id === id);
    };
    if (result.success && nodeExists(checkEvent.successNode)) {
        setTimeout(() => goToNode(checkEvent.successNode), 2000);
    } else if (!result.success && nodeExists(checkEvent.failNode)) {
        setTimeout(() => goToNode(checkEvent.failNode), 2000);
    }
}

function initiateCombat(combatEvent) {
    console.log('Initiating combat with enemies:', combatEvent.enemies);
    
    // Simple combat system for now
    const combatHtml = `
        <div class="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4">
            <h4 class="font-title text-lg text-red-400 mb-2">⚔️ ¡COMBATE!</h4>
            <p class="text-gray-300">Enemigos: ${combatEvent.enemies.join(', ')}</p>
            <p class="text-gray-400 text-sm mt-2">Sistema de combate simplificado - El grupo gana automáticamente por ahora</p>
        </div>
    `;
    
    chapterNarrative.innerHTML += combatHtml;
    
    // For now, auto-win combat
    setTimeout(() => {
        chapterNarrative.innerHTML += `
            <p class="text-green-400 mt-4">¡Victoria! El grupo ha derrotado a los enemigos.</p>
        `;
    }, 1000);
}

function handleNodeDice(dice) {
    console.log('Handling dice rolls:', dice.length);
    
    if (dice.length === 0) return;
    
    diceResults.classList.remove('hidden');
    let diceHtml = '';
    
    dice.forEach(d => {
        const result = adventureEngine.rollDice(d.count, d.sides, d.modifier);
        diceHtml += `
            <p class="text-gray-300 mb-2">
                <span class="text-violet-primary font-bold">${d.count}d${d.sides}${d.modifier >= 0 ? '+' : ''}${d.modifier}</span>: 
                <span class="font-bold">${result.total}</span>
                (tiradas: ${result.rolls.join(', ')})
            </p>
        `;
    });
    
    diceResultContent.innerHTML = diceHtml;
}

function handleNodeVariables(variables) {
    console.log('Handling variables:', variables.length);
    
    variables.forEach(v => {
        adventureEngine.setVariable(v.name, v.value);
    });
}

function handleNodeItems(items) {
    console.log('Handling items:', items.length);
    
    items.forEach(item => {
        if (item.action === 'add' && activeCharacter) {
            if (!activeCharacter.inventory) {
                activeCharacter.inventory = [];
            }
            activeCharacter.inventory.push(item.name);
            console.log('Added item:', item.name);
        }
    });
}

function updatePartyPanel() {
    console.log('Updating party panel');
    partyList.innerHTML = '';
    
    if (!party || party.length === 0) return;
    
    party.forEach((character, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = `bg-gray-800/50 border ${character === activeCharacter ? 'border-violet-primary/60' : 'border-gray-700'} rounded-lg p-3 cursor-pointer transition-all duration-300`;
        memberCard.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="text-xl">🎭</span>
                <div>
                    <h4 class="font-title text-sm ${character === activeCharacter ? 'text-violet-primary' : 'text-gray-300'}">${character.name}</h4>
                    <p class="text-gray-400 text-xs">${character.class}</p>
                </div>
            </div>
            <div class="mt-2 text-xs">
                <span class="text-gray-400">HP:</span>
                <span class="text-white">${character.currentHp}/${character.maxHp}</span>
            </div>
        `;
        
        memberCard.addEventListener('click', () => {
            activeCharacter = character;
            updatePartyPanel();
            updateCharacterPanel();
        });
        
        partyList.appendChild(memberCard);
    });
}

function updateCharacterPanel() {
    console.log('Updating character panel');
    
    if (!activeCharacter) {
        document.getElementById('activeCharacterName').textContent = '-';
        document.getElementById('activeCharacterClass').textContent = '-';
        document.getElementById('statHp').textContent = '-/-';
        document.getElementById('statStr').textContent = '-';
        document.getElementById('statDex').textContent = '-';
        document.getElementById('statInt').textContent = '-';
        document.getElementById('statWis').textContent = '-';
        document.getElementById('statCha').textContent = '-';
        return;
    }
    
    document.getElementById('activeCharacterName').textContent = activeCharacter.name;
    document.getElementById('activeCharacterClass').textContent = activeCharacter.class;
    document.getElementById('statHp').textContent = `${activeCharacter.currentHp}/${activeCharacter.maxHp}`;
    document.getElementById('statStr').textContent = activeCharacter.stats.strength;
    document.getElementById('statDex').textContent = activeCharacter.stats.dexterity;
    document.getElementById('statInt').textContent = activeCharacter.stats.intelligence;
    document.getElementById('statWis').textContent = activeCharacter.stats.wisdom;
    document.getElementById('statCha').textContent = activeCharacter.stats.charisma;
    
    // Update inventory
    const inventoryList = document.getElementById('inventoryList');
    if (activeCharacter.inventory && activeCharacter.inventory.length > 0) {
        document.getElementById('inventoryPanel').classList.remove('hidden');
        inventoryList.innerHTML = activeCharacter.inventory.map(item => 
            `<span class="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">${item}</span>`
        ).join('');
    } else {
        document.getElementById('inventoryPanel').classList.add('hidden');
    }
}

function rollDice(diceType) {
    console.log('Rolling dice:', diceType);
    
    const sides = parseInt(diceType.replace('d', ''));
    const result = Math.floor(Math.random() * sides) + 1;
    
    const rollHistory = document.getElementById('rollHistory');
    const rollEntry = document.createElement('div');
    rollEntry.className = 'text-gray-300 mb-1';
    rollEntry.innerHTML = `<span class="text-violet-primary font-bold">${diceType}</span>: ${result}`;
    rollHistory.insertBefore(rollEntry, rollHistory.firstChild);
}

function restartAdventure() {
    if (!confirm('¿Estás seguro de reiniciar la aventura?')) return;
    
    console.log('Restarting adventure');
    gameState = {};
    
    // Reset character HP
    if (party) {
        party.forEach(character => {
            character.currentHp = character.maxHp;
        });
    }
    
    // Go to start node
    goToNode(currentAdventure.startNodeId);
}

function saveGame() {
    console.log('Saving game');
    
    const saveData = {
        adventureId: currentAdventure.id,
        currentNodeId: currentNode.id,
        party: party,
        activeCharacterId: activeCharacter ? activeCharacter.id : null,
        gameState: gameState,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('adventure_save', JSON.stringify(saveData));
    alert('Juego guardado correctamente');
}
