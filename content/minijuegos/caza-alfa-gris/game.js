// ==================== ESTADO DEL JUEGO ====================
const gameState = {
    player: {
        hp: 42,
        maxHp: 42,
        baseAc: 18,
        ac: 18,
        movement: 30,
        position: { x: 5, y: 8 },
        resources: {
            spellSlots: 3,
            layOnHands: 20,
            divineSense: 1
        },
        status: [],
        hasAction: true,
        hasAdditionalAction: true,
        movementRemaining: 30,
        isDodging: false,
        divinePunishmentActive: false,
        concentration: null, // Track active concentration spell
        blessedTargets: [], // Track targets affected by Bless
        shieldOfFaithActive: false
    },
    wolves: [
        {
            id: 'wolf1',
            name: 'Lobo 1',
            hp: 11,
            maxHp: 11,
            ac: 13,
            movement: 12,
            position: { x: 2, y: 3 },
            status: [],
            isAlpha: false,
            isDead: false
        },
        {
            id: 'wolf2',
            name: 'Lobo 2',
            hp: 11,
            maxHp: 11,
            ac: 13,
            movement: 12,
            position: { x: 8, y: 3 },
            status: [],
            isAlpha: false,
            isDead: false
        },
        {
            id: 'wolf3',
            name: 'Lobo 3',
            hp: 11,
            maxHp: 11,
            ac: 13,
            movement: 12,
            position: { x: 5, y: 2 },
            status: [],
            isAlpha: false,
            isDead: false
        },
        {
            id: 'alpha',
            name: 'Lobo Alfa',
            hp: 35,
            maxHp: 35,
            ac: 14,
            movement: 12,
            position: { x: 5, y: 5 },
            status: [],
            isAlpha: true,
            isDead: false,
            hasHowled: false
        }
    ],
    selectedWolf: null,
    turn: 1,
    isPlayerTurn: true,
    movementEnabled: false,
    combatStats: {
        turnsUsed: 0,
        damageDealt: 0,
        damageTaken: 0,
        wolvesDefeated: 0
    }
};

// ==================== BANCOS DE NARRATIVA ====================
const narrativeBanks = {
    gameStart: [
        "La noche envuelve el bosque como un manto oscuro. Los ojos de los lobos brillan en la oscuridad.",
        "El crujido de ramas bajo tus pies alerta a la manada. Están rodeándote.",
        "Tu espada brilla con luz divina en la penumbra del bosque.",
        "El aullido del Alfa resuena entre los árboles. La caza ha comenzado.",
        "Sientes la presencia divina en tu escudo. Estás preparado para la batalla.",
        "Los lobos emergen de las sombras, sus colas erizadas de agresión.",
        "El Alfa Gris te observa con inteligencia predatoria. Este no será un combate fácil.",
        "Tu fe te da fuerza. Los lobos no prevén la resistencia que encontrarán.",
        "La niebla se espesa mientras los lobos cierran el círculo.",
        "Tu entrenamiento como Paladín te prepara para este momento de verdad."
    ],
    playerTurn: [
        "Es tu turno. El destino del combate está en tus manos.",
        "Los lobos observan tus movimientos con cautela.",
        "El Alfa gruñe, ordenando a su manada mantener posición.",
        "Tomas una decisión crucial en este momento de la batalla.",
        "Tu divinidad te guía hacia la acción correcta.",
        "Los lobos preparan sus próximos movimientos.",
        "El bosque parece contener la respiración.",
        "Tu escudo pesa en tu brazo, listo para defender.",
        "La luz divina en tu espada pulsa con energía.",
        "Cada acción cuenta en este combate desesperado."
    ],
    enemyTurn: [
        "La manada actúa en coordinación bajo el mando del Alfa.",
        "Los lobos se mueven con la ferocidad de depredadores hambrientos.",
        "El Alfa lidera el ataque con un aullido gutural.",
        "Los ojos de los lobos brillan con luz salvaje.",
        "La manada se abalanza con precisión letal.",
        "Los colmillos de los lobos buscan tu carne.",
        "El Alfa dirige a sus subordinados con inteligencia.",
        "Los lobos se comunican con gruñidos y gestos.",
        "La presión de la manada es abrumadora.",
        "Los lobos atacan desde múltiples ángulos."
    ],
    bite: [
        "Los colmillos del lobo buscan tu garganta.",
        "El lobo muerde con fuerza salvaje.",
        "Sientes el dolor de los colmillos penetrando tu armadura.",
        "El lobo se lanza hacia ti con fauces abiertas.",
        "Un mordisco certero sacude tu cuerpo.",
        "El lobo intenta desgarrar tu carne.",
        "Sientes el aliento caliente del lobo en tu cara.",
        "Los colmillos del lobo dejan marcas en tu armadura.",
        "El lobo muerde con la ferocidad de un depredador.",
        "Un ataque brutal de los colmillos del lobo."
    ],
    criticalHit: [
        "¡GOLPE CRÍTICO! Tu espada atraviesa las defensas del lobo.",
        "¡CRÍTICO! El lobo aúlla de dolor.",
        "¡IMPACTO PERFECTO! El daño es devastador.",
        "¡GOLPE MORTAL! El lobo cae gravemente herido.",
        "¡CRÍTICO! Tu divinidad se manifiesta en el golpe.",
        "¡IMPACTO ÉPICO! El lobo no puede creer el daño recibido.",
        "¡GOLPE DESTROZADOR! El lobo es sacudido violentamente.",
        "¡CRÍTICO! Tu espada brilla con luz divina al impactar.",
        "¡GOLPE APLASTANTE! El lobo casi es derrotado.",
        "¡IMPACTO LEGENDARIO! El daño es extraordinario."
    ],
    healing: [
        "La luz divina fluye a través de tu cuerpo, sanando tus heridas.",
        "Sientes el calor de la curación divina recorriendo tus venas.",
        "Tu fe restaura tu vitalidad.",
        "La energía divina repara tu cuerpo dañado.",
        "Una luz suave envuelve tus heridas, cerrándolas.",
        "El poder de tu dios fluye hacia ti.",
        "Sientes cómo tus heridas se cierran milagrosamente.",
        "La divinidad responde a tu llamado con curación.",
        "Tu cuerpo se fortalece con energía sagrada.",
        "El dolor se disipa bajo el efecto de la curación."
    ],
    divinePunishment: [
        "¡CASTIGO DIVINO! Tu espada brilla con luz sagrada.",
        "El poder divino se manifiesta en tu ataque.",
        "Una explosión de luz divina golpea al lobo.",
        "Tu fe se convierte en daño purificador.",
        "El lobo aúlla ante el poder divino.",
        "La luz sagrada quema al lobo con energía celestial.",
        "Tu espada canaliza el castigo de los dioses.",
        "El lobo retrocede ante el poder divino.",
        "Una aura divina envuelve tu arma al impactar.",
        "El castigo divino es implacable."
    ],
    alphaHowl: [
        "¡AULLIDO DEL ALFA! El sonido paraliza el aire.",
        "El aullido del Alfa resuena en todo el bosque.",
        "La manada se energiza con el aullido de su líder.",
        "El aullido del Alfa infunde miedo y poder.",
        "Un sonido gutural que hace temblar los árboles.",
        "El Alfa reclama su dominio con un aullido poderoso.",
        "La manada responde al aullido con renovada ferocidad.",
        "El aullido del Alfa es un llamado a la sangre.",
        "Sientes el poder del Alfa en cada nota de su aullido.",
        "El aullido del Alfa cambia el curso del combate."
    ],
    victory: [
        "¡Has derrotado a la manada! El bosque vuelve al silencio.",
        "El Alfa cae, y los lobos restantes huyen en terror.",
        "Tu espada ha prevalecido. La caza ha terminado.",
        "Los lobos yacen derrotados a tus pies.",
        "Has demostrado tu valía como Paladín.",
        "El Alfa Gris reconoce tu superioridad antes de caer.",
        "La manada ha sido eliminada. Eres el superviviente.",
        "Tu fe y tu habilidad te han llevado a la victoria.",
        "El bosque celebra tu triunfo sobre la manada.",
        "Has escrito tu leyenda en este bosque nocturno."
    ],
    defeat: [
        "La manada te supera. Tu visión se oscurece.",
        "Los colmillos del Alfa son lo último que ves.",
        "Tu armadura no puede contener el ataque de la manada.",
        "Has caído ante la ferocidad de los lobos.",
        "El Alfa se alza sobre tu cuerpo caído.",
        "Tu viaje termina aquí, en las fauces de la manada.",
        "La oscuridad te envuelve mientras los lobos celebran.",
        "Tu fe no fue suficiente. La manada prevalece.",
        "El bosque reclama tu cuerpo como presa.",
        "Has sido derrotado por el Alfa Gris y su manada."
    ]
};

// ==================== FUNCIONES DE UTILIDAD ====================
function getRandomNarrative(category) {
    const bank = narrativeBanks[category];
    if (!bank || bank.length === 0) return "";
    const usedIndices = gameState.usedNarratives?.[category] || [];
    const availableIndices = bank.map((_, i) => i).filter(i => !usedIndices.includes(i));
    
    if (availableIndices.length === 0) {
        gameState.usedNarratives[category] = [];
        return bank[Math.floor(Math.random() * bank.length)];
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    if (!gameState.usedNarratives) gameState.usedNarratives = {};
    if (!gameState.usedNarratives[category]) gameState.usedNarratives[category] = [];
    gameState.usedNarratives[category].push(randomIndex);
    
    return bank[randomIndex];
}

function rollDice(sides, count = 1) {
    let total = 0;
    const rolls = [];
    for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        total += roll;
    }
    return { total, rolls };
}

function calculateDistance(pos1, pos2) {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx + dy) * 5; // Cada celda es 5 pies
}

function calculateGridDistance(pos1, pos2) {
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return dx + dy;
}

function addLogEntry(message, type = "normal") {
    const log = document.getElementById("combat-log");
    const entry = document.createElement("div");
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

function updateUI() {
    // Actualizar PV del jugador
    const playerHpPercent = (gameState.player.hp / gameState.player.maxHp) * 100;
    const playerHpFill = document.getElementById("player-hp-fill");
    playerHpFill.style.width = `${playerHpPercent}%`;
    playerHpFill.className = "hp-fill";
    if (playerHpPercent <= 25) playerHpFill.classList.add("low");
    else if (playerHpPercent <= 50) playerHpFill.classList.add("medium");
    document.getElementById("player-hp").textContent = gameState.player.hp;

    // Actualizar recursos
    document.getElementById("spell-slots").textContent = `Espacios de Hechizo (${gameState.player.resources.spellSlots})`;
    document.getElementById("spell-slots").className = `resource-badge ${gameState.player.resources.spellSlots === 0 ? "used" : ""}`;
    document.getElementById("lay-on-hands").textContent = `Imposición de Manos (${gameState.player.resources.layOnHands})`;
    document.getElementById("lay-on-hands").className = `resource-badge ${gameState.player.resources.layOnHands === 0 ? "used" : ""}`;
    document.getElementById("divine-sense").textContent = `Sentido Divino (${gameState.player.resources.divineSense})`;
    document.getElementById("divine-sense").className = `resource-badge ${gameState.player.resources.divineSense === 0 ? "used" : ""}`;

    // Actualizar estados del jugador
    const statusContainer = document.getElementById("status-effects");
    if (gameState.player.status.length === 0) {
        statusContainer.innerHTML = '<span style="color: #9ca3af; font-style: italic;">Ningún estado activo</span>';
    } else {
        statusContainer.innerHTML = gameState.player.status.map(s => 
            `<span class="status-effect">${translateStatus(s)}</span>`
        ).join("");
    }
    
    // Mostrar concentración activa
    if (gameState.player.concentration) {
        const concentrationText = document.getElementById("concentration-status");
        if (concentrationText) {
            const spellNames = {
                'bless': 'Bendecir',
                'shieldOfFaith': 'Escudo de la Fe'
            };
            concentrationText.textContent = `Concentrando: ${spellNames[gameState.player.concentration] || gameState.player.concentration}`;
            concentrationText.style.display = 'block';
        }
    } else {
        const concentrationText = document.getElementById("concentration-status");
        if (concentrationText) {
            concentrationText.style.display = 'none';
        }
    }

    // Actualizar posiciones en el mapa
    updateTokenPositions();

    // Actualizar panel de enemigo seleccionado
    updateEnemyPanel();

    // Actualizar botones de acción
    updateActionButtons();
}

function translateStatus(status) {
    const translations = {
        "dodging": "Esquivando",
        "prone": "Caído",
        "frightened": "Asustado",
        "buffed": "Potenciado",
        "concentrating": "Concentrando",
        "disengaged": "Retirado",
        "protected": "Protegido"
    };
    return translations[status] || status;
}

function updateTokenPositions() {
    const mapContainer = document.getElementById("map-container");
    const containerWidth = mapContainer.offsetWidth;
    const containerHeight = mapContainer.offsetHeight;
    
    const gridWidth = containerWidth - 40;
    const gridHeight = containerHeight - 40;
    const cellWidth = gridWidth / 10;
    const cellHeight = gridHeight / 10;
    
    // Actualizar token del jugador
    const playerToken = document.getElementById("player-token");
    const playerX = 40 + (gameState.player.position.x * cellWidth) + (cellWidth / 2) - 20;
    const playerY = 40 + (gameState.player.position.y * cellHeight) + (cellHeight / 2) - 20;
    playerToken.style.left = `${playerX}px`;
    playerToken.style.top = `${playerY}px`;
    
    // Actualizar tokens de los lobos
    gameState.wolves.forEach((wolf, index) => {
        const tokenId = wolf.isAlpha ? 'alpha-token' : `wolf${index + 1}-token`;
        const token = document.getElementById(tokenId);
        if (token) {
            const wolfX = 40 + (wolf.position.x * cellWidth) + (cellWidth / 2) - 20;
            const wolfY = 40 + (wolf.position.y * cellHeight) + (cellHeight / 2) - 20;
            token.style.left = `${wolfX}px`;
            token.style.top = `${wolfY}px`;
            
            if (wolf.isDead) {
                token.classList.add("dead");
            } else {
                token.classList.remove("dead");
            }
        }
    });
}

function updateEnemyPanel() {
    const enemyInfo = document.getElementById("enemy-info");
    const noEnemySelected = document.getElementById("no-enemy-selected");
    
    if (!gameState.selectedWolf || gameState.selectedWolf.isDead) {
        enemyInfo.style.display = "none";
        noEnemySelected.style.display = "block";
        document.getElementById("enemy-name").textContent = "Selecciona un Lobo";
        return;
    }
    
    enemyInfo.style.display = "block";
    noEnemySelected.style.display = "none";
    
    const wolf = gameState.selectedWolf;
    document.getElementById("enemy-name").textContent = wolf.name;
    document.getElementById("enemy-ac").textContent = wolf.ac;
    document.getElementById("enemy-movement").textContent = `${wolf.movement} m`;
    
    const enemyHpPercent = (wolf.hp / wolf.maxHp) * 100;
    document.getElementById("enemy-hp-fill").style.width = `${enemyHpPercent}%`;
    document.getElementById("enemy-hp").textContent = wolf.hp;
    document.getElementById("enemy-max-hp").textContent = wolf.maxHp;
    
    // Actualizar habilidades según el tipo de lobo
    const abilitiesDiv = document.getElementById("enemy-abilities");
    if (wolf.isAlpha) {
        abilitiesDiv.innerHTML = `
            <div class="enemy-ability">
                <div class="enemy-ability-name">Mordisco Brutal</div>
                <div>Ataque cuerpo a cuerpo, daño aumentado</div>
            </div>
            <div class="enemy-ability">
                <div class="enemy-ability-name">Aullido del Alfa</div>
                <div>Potencia a la manada</div>
            </div>
            <div class="enemy-ability">
                <div class="enemy-ability-name">Carga Salvaje</div>
                <div>Movimiento + ataque</div>
            </div>
            <div class="enemy-ability">
                <div class="enemy-ability-name">Furia Desesperada</div>
                <div>Disponible con baja vida</div>
            </div>
        `;
    } else {
        abilitiesDiv.innerHTML = `
            <div class="enemy-ability">
                <div class="enemy-ability-name">Mordisco</div>
                <div>Ataque cuerpo a cuerpo</div>
            </div>
            <div class="enemy-ability">
                <div class="enemy-ability-name">Acoso</div>
                <div>Movimiento agresivo</div>
            </div>
            <div class="enemy-ability">
                <div class="enemy-ability-name">Rodear</div>
                <div>Intento de aproximación</div>
            </div>
            <div class="enemy-ability">
                <div class="enemy-ability-name">Retirada Instintiva</div>
                <div>Probabilidad de huir</div>
            </div>
        `;
    }
    
    // Actualizar estados del enemigo
    const enemyStatusDiv = document.getElementById("enemy-status");
    if (wolf.status.length === 0) {
        enemyStatusDiv.innerHTML = '<span style="color: #9ca3af; font-style: italic;">Ningún estado activo</span>';
    } else {
        enemyStatusDiv.innerHTML = wolf.status.map(s => 
            `<span class="status-effect">${translateStatus(s)}</span>`
        ).join("");
    }
}

function updateActionButtons() {
    const buttons = document.querySelectorAll(".action-btn-small");
    buttons.forEach(btn => {
        btn.disabled = !gameState.isPlayerTurn;
    });
    
    // Botones específicos que requieren recursos
    document.getElementById("divine-sense")?.classList.toggle("used", gameState.player.resources.divineSense === 0);
    
    document.getElementById("move-btn").disabled = !gameState.isPlayerTurn || gameState.player.movementRemaining <= 0;
    document.getElementById("end-turn-btn").disabled = !gameState.isPlayerTurn;
}

function selectWolf(wolfId) {
    const wolf = gameState.wolves.find(w => w.id === wolfId);
    if (wolf && !wolf.isDead) {
        gameState.selectedWolf = wolf;
        updateEnemyPanel();
    }
}

// ==================== FUNCIONES DE COMBATE ====================
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "grid";
    
    gameState.usedNarratives = {};
    addLogEntry(getRandomNarrative("gameStart"), "narrative");
    
    // Generar cuadrilla
    generateGrid();
    
    // Determinar iniciativa
    const playerInitiative = rollDice(20).total + 3; // +3 por atributos
    const wolfInitiative = rollDice(20).total + 2;
    
    if (playerInitiative >= wolfInitiative) {
        gameState.isPlayerTurn = true;
        addLogEntry("¡Ganas la iniciativa! Es tu turno.", "narrative");
    } else {
        gameState.isPlayerTurn = false;
        addLogEntry("La manada gana la iniciativa. Espera su turno.", "narrative");
        setTimeout(wolfPackTurn, 1500);
    }
    
    // Configurar eventos de click en tokens
    setupTokenClicks();
    
    updateUI();
}

function generateGrid() {
    const gridOverlay = document.getElementById("grid-overlay");
    gridOverlay.innerHTML = "";
    
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    
    // Crear celda vacía en esquina
    const emptyCorner = document.createElement("div");
    emptyCorner.className = "grid-cell coordinate";
    gridOverlay.appendChild(emptyCorner);
    
    // Crear letras de columna
    for (let i = 0; i < 10; i++) {
        const letterCell = document.createElement("div");
        letterCell.className = "grid-cell coordinate";
        letterCell.textContent = letters[i];
        gridOverlay.appendChild(letterCell);
    }
    
    // Crear filas con números
    for (let y = 0; y < 10; y++) {
        const numberCell = document.createElement("div");
        numberCell.className = "grid-cell coordinate";
        numberCell.textContent = y + 1;
        gridOverlay.appendChild(numberCell);
        
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.onclick = () => handleCellClick(x, y);
            gridOverlay.appendChild(cell);
        }
    }
}

function setupTokenClicks() {
    document.getElementById("wolf1-token").onclick = () => selectWolf('wolf1');
    document.getElementById("wolf2-token").onclick = () => selectWolf('wolf2');
    document.getElementById("wolf3-token").onclick = () => selectWolf('wolf3');
    document.getElementById("alpha-token").onclick = () => selectWolf('alpha');
}

function handleCellClick(x, y) {
    if (gameState.movementEnabled && gameState.isPlayerTurn) {
        moveTo(x, y);
    }
}

function swordAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (!gameState.selectedWolf) {
        addLogEntry("Selecciona un lobo para atacar.", "normal");
        return;
    }
    
    const wolf = gameState.selectedWolf;
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance > 5) {
        addLogEntry("El lobo está demasiado lejos para el ataque cuerpo a cuerpo.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    
    const attackRoll = rollDice(20);
    let attackTotal = attackRoll.total + 6; // +6 por FUE y proficiencia
    
    // Bless bonus if player is blessed
    if (gameState.player.blessedTargets.includes('player')) {
        const blessBonus = rollDice(4).total;
        attackTotal += blessBonus;
        addLogEntry(`Bendecir: +${blessBonus} al ataque.`, "normal");
    }
    
    addLogEntry(`Ataque con espada: d20(${attackRoll.rolls[0]}) + 6 = ${attackTotal} vs CA ${wolf.ac}`, "normal");
    
    if (attackTotal >= wolf.ac) {
        let damageRoll = rollDice(8);
        let damage = damageRoll.total + 4; // 1d8 + 4 por FUE
        const isCritical = attackRoll.rolls[0] === 20;
        
        // Castigo Divino si está activo
        if (gameState.player.divinePunishmentActive && gameState.player.resources.spellSlots > 0) {
            gameState.player.resources.spellSlots--;
            gameState.player.divinePunishmentActive = false;
            const divineDamage = rollDice(8).total;
            damage += divineDamage;
            addLogEntry(`${getRandomNarrative("divinePunishment")} +${divineDamage} de daño divino.`, "critical");
        }
        
        if (isCritical) {
            damage *= 2;
            wolf.hp -= damage;
            gameState.combatStats.damageDealt += damage;
            addLogEntry(`${getRandomNarrative("criticalHit")} ¡${damage} de daño!`, "critical");
        } else {
            wolf.hp -= damage;
            gameState.combatStats.damageDealt += damage;
            addLogEntry(`¡Impacto! ${damage} de daño.`, "normal");
        }
        
        if (wolf.hp <= 0) {
            wolf.hp = 0;
            wolf.isDead = true;
            gameState.combatStats.wolvesDefeated++;
            addLogEntry(`${wolf.name} ha sido derrotado.`, "critical");
            if (gameState.selectedWolf === wolf) {
                gameState.selectedWolf = null;
            }
        }
        
        checkVictory();
    } else {
        addLogEntry("El ataque falla.", "normal");
    }
    
    updateUI();
}

function throwJavelin() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (!gameState.selectedWolf) {
        addLogEntry("Selecciona un lobo para atacar.", "normal");
        return;
    }
    
    const wolf = gameState.selectedWolf;
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance > 30) {
        addLogEntry("El lobo está fuera del alcance de la jabalina.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    
    const attackRoll = rollDice(20);
    let attackTotal = attackRoll.total + 5; // +5 por FUE y proficiencia
    
    // Bless bonus if player is blessed
    if (gameState.player.blessedTargets.includes('player')) {
        const blessBonus = rollDice(4).total;
        attackTotal += blessBonus;
        addLogEntry(`Bendecir: +${blessBonus} al ataque.`, "normal");
    }
    
    addLogEntry(`Lanzamiento de jabalina: d20(${attackRoll.rolls[0]}) + 5 = ${attackTotal} vs CA ${wolf.ac}`, "normal");
    
    if (attackTotal >= wolf.ac) {
        const damageRoll = rollDice(6);
        const damage = damageRoll.total + 3; // 1d6 + 3 por FUE
        const isCritical = attackRoll.rolls[0] === 20;
        
        if (isCritical) {
            wolf.hp -= damage * 2;
            gameState.combatStats.damageDealt += damage * 2;
            addLogEntry(`${getRandomNarrative("criticalHit")} ¡${damage * 2} de daño!`, "critical");
        } else {
            wolf.hp -= damage;
            gameState.combatStats.damageDealt += damage;
            addLogEntry(`¡Impacto! ${damage} de daño.`, "normal");
        }
        
        if (wolf.hp <= 0) {
            wolf.hp = 0;
            wolf.isDead = true;
            gameState.combatStats.wolvesDefeated++;
            addLogEntry(`${wolf.name} ha sido derrotado.`, "critical");
            if (gameState.selectedWolf === wolf) {
                gameState.selectedWolf = null;
            }
        }
        
        checkVictory();
    } else {
        addLogEntry("El lanzamiento falla.", "normal");
    }
    
    updateUI();
}

function dodgeAction() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    gameState.player.hasAction = false;
    gameState.player.isDodging = true;
    gameState.player.status.push("dodging");
    
    addLogEntry("Esquivas activamente. Los enemigos tienen desventaja contra ti.", "normal");
    updateUI();
}

function retreatAction() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    gameState.player.hasAction = false;
    gameState.player.status.push("disengaged"); // Evita ataques de oportunidad
    
    // Moverse lejos del enemigo más cercano
    const nearestWolf = findNearestWolf();
    if (nearestWolf) {
        const dx = gameState.player.position.x - nearestWolf.position.x;
        const dy = gameState.player.position.y - nearestWolf.position.y;
        
        let newX = gameState.player.position.x;
        let newY = gameState.player.position.y;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            newX += dx > 0 ? 2 : -2;
        } else {
            newY += dy > 0 ? 2 : -2;
        }
        
        newX = Math.max(0, Math.min(9, newX));
        newY = Math.max(0, Math.min(9, newY));
        
        gameState.player.position = { x: newX, y: newY };
        gameState.player.movementRemaining -= 10;
        
        addLogEntry("Te retiras estratégicamente. Los ataques de oportunidad están evitados.", "normal");
    }
    
    updateUI();
}

function dashAction() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    gameState.player.hasAction = false;
    gameState.player.movementRemaining += gameState.player.movement; // Duplica movimiento
    
    addLogEntry("Aumentas tu velocidad. Movimiento duplicado.", "normal");
    updateUI();
}

function divineAid() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.resources.spellSlots === 0) {
        addLogEntry("No tienes espacios de hechizo restantes.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    gameState.player.resources.spellSlots--;
    gameState.player.divinePunishmentActive = true;
    
    addLogEntry("Canalizas poder divino. Tu próximo ataque tendrá daño adicional.", "normal");
    updateUI();
}

function blessSpell() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.resources.spellSlots === 0) {
        addLogEntry("No tienes espacios de hechizo restantes.", "normal");
        return;
    }
    
    // If already concentrating on another spell, break it
    if (gameState.player.concentration && gameState.player.concentration !== 'bless') {
        addLogEntry("Rompes tu concentración anterior.", "normal");
    }
    
    gameState.player.hasAction = false;
    gameState.player.resources.spellSlots--;
    gameState.player.concentration = 'bless';
    
    // Bless affects up to 3 targets - for simplicity, bless the player and up to 2 nearest wolves (allies)
    // In this solo game, we'll bless the player
    gameState.player.blessedTargets = ['player'];
    
    // Also bless up to 2 nearest wolves as if they were allies (simplified)
    const livingWolves = gameState.wolves.filter(w => !w.isDead);
    if (livingWolves.length > 0) {
        gameState.player.blessedTargets.push(livingWolves[0].id);
    }
    if (livingWolves.length > 1) {
        gameState.player.blessedTargets.push(livingWolves[1].id);
    }
    
    gameState.player.status.push("concentrating");
    
    addLogEntry("Lanzas Bendecir. Tú y hasta 2 objetivos cercanos ganan +1d4 a ataques y salvaciones. Requiere concentración.", "normal");
    updateUI();
}

function shieldOfFaith() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction) return;
    if (gameState.player.resources.spellSlots === 0) {
        addLogEntry("No tienes espacios de hechizo restantes.", "normal");
        return;
    }
    
    // If already concentrating on another spell, break it
    if (gameState.player.concentration && gameState.player.concentration !== 'shieldOfFaith') {
        addLogEntry("Rompes tu concentración anterior.", "normal");
    }
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.resources.spellSlots--;
    gameState.player.concentration = 'shieldOfFaith';
    gameState.player.shieldOfFaithActive = true;
    gameState.player.ac = gameState.player.baseAc + 2;
    
    gameState.player.status.push("concentrating");
    
    addLogEntry("Lanzas Escudo de la Fe. Tu CA aumenta en +2. Requiere concentración.", "normal");
    updateUI();
}

function cureWounds() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.resources.spellSlots === 0) {
        addLogEntry("No tienes espacios de hechizo restantes.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    gameState.player.resources.spellSlots--;
    
    const healingRoll = rollDice(8);
    const healing = healingRoll.total + 3; // 1d8 + 3 por modificador de CAR
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healing);
    
    addLogEntry(`${getRandomNarrative("healing")} d8(${healingRoll.rolls[0]}) + 3 = ${healing} PV recuperados.`, "heal");
    updateUI();
}

function layOnHands() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.resources.layOnHands === 0) {
        addLogEntry("No tienes puntos de Imposición de Manos restantes.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    
    // Ask how many points to use - for simplicity, use up to 10 points or remaining
    const pointsToUse = Math.min(10, gameState.player.resources.layOnHands);
    gameState.player.resources.layOnHands -= pointsToUse;
    
    const healing = pointsToUse;
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healing);
    
    addLogEntry(`${getRandomNarrative("healing")} ${pointsToUse} puntos de Imposición de Manos usados. ${healing} PV recuperados.`, "heal");
    updateUI();
}

function divineSense() {
    if (!gameState.isPlayerTurn) return;
    if (gameState.player.resources.divineSense === 0) {
        addLogEntry("No tienes usos de Sentido Divino restantes.", "normal");
        return;
    }
    
    gameState.player.resources.divineSense--;
    
    // Detect supernatural presences within 60 feet
    const nearbyWolves = gameState.wolves.filter(w => !w.isDead && calculateDistance(gameState.player.position, w.position) <= 60);
    
    if (nearbyWolves.length > 0) {
        addLogEntry(`Sentido Divino activado. Detectas ${nearbyWolves.length} presencias sobrenaturales cercanas.`, "narrative");
    } else {
        addLogEntry("Sentido Divino activado. No detectas presencias sobrenaturales cercanas.", "narrative");
    }
    
    updateUI();
}

function shieldPush() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction) return;
    if (!gameState.selectedWolf) {
        addLogEntry("Selecciona un lobo para empujar.", "normal");
        return;
    }
    
    const wolf = gameState.selectedWolf;
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance > 5) {
        addLogEntry("El lobo está demasiado lejos.", "normal");
        return;
    }
    
    gameState.player.hasAdditionalAction = false;
    
    const contestRoll = rollDice(20);
    const contestTotal = contestRoll.total + 5; // FUE
    const wolfRoll = rollDice(20);
    const wolfTotal = wolfRoll.total + 2;
    
    addLogEntry(`Empujón con escudo: Tu d20(${contestRoll.rolls[0]}) + 5 = ${contestTotal} vs Lobo d20(${wolfRoll.rolls[0]}) + 2 = ${wolfTotal}`, "normal");
    
    if (contestTotal > wolfTotal) {
        const dx = wolf.position.x - gameState.player.position.x;
        const dy = wolf.position.y - gameState.player.position.y;
        
        let newX = wolf.position.x;
        let newY = wolf.position.y;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            newX += dx > 0 ? 1 : -1;
        } else {
            newY += dy > 0 ? 1 : -1;
        }
        
        newX = Math.max(0, Math.min(9, newX));
        newY = Math.max(0, Math.min(9, newY));
        
        wolf.position = { x: newX, y: newY };
        addLogEntry("¡Empujas al lobo con éxito!", "normal");
    } else {
        addLogEntry("El lobo resiste el empujón.", "normal");
    }
    
    updateUI();
}

function opportunityAttack() {
    if (!gameState.isPlayerTurn) return;
    if (!gameState.selectedWolf) {
        addLogEntry("Selecciona un lobo para atacar.", "normal");
        return;
    }
    
    const wolf = gameState.selectedWolf;
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance > 5) {
        addLogEntry("El lobo está demasiado lejos.", "normal");
        return;
    }
    
    const attackRoll = rollDice(20);
    const attackTotal = attackRoll.total + 6;
    
    addLogEntry(`Ataque de oportunidad: d20(${attackRoll.rolls[0]}) + 6 = ${attackTotal} vs CA ${wolf.ac}`, "normal");
    
    if (attackTotal >= wolf.ac) {
        const damageRoll = rollDice(8);
        const damage = damageRoll.total + 4;
        wolf.hp -= damage;
        gameState.combatStats.damageDealt += damage;
        addLogEntry(`¡Impacto! ${damage} de daño.`, "normal");
        
        if (wolf.hp <= 0) {
            wolf.hp = 0;
            wolf.isDead = true;
            gameState.combatStats.wolvesDefeated++;
            addLogEntry(`${wolf.name} ha sido derrotado.`, "critical");
            if (gameState.selectedWolf === wolf) {
                gameState.selectedWolf = null;
            }
        }
        
        checkVictory();
    } else {
        addLogEntry("El ataque falla.", "normal");
    }
    
    updateUI();
}

function protectionAction() {
    if (!gameState.isPlayerTurn) return;
    addLogEntry("Protección activa. Reduces el daño recibido.", "normal");
    // Simplificado: reduce el próximo daño
    gameState.player.status.push("protected");
    updateUI();
}

function enableMovement() {
    if (!gameState.isPlayerTurn || gameState.player.movementRemaining <= 0) return;
    
    gameState.movementEnabled = !gameState.movementEnabled;
    
    const gridOverlay = document.getElementById("grid-overlay");
    if (gameState.movementEnabled) {
        gridOverlay.style.pointerEvents = "auto";
        highlightMovementRange();
        addLogEntry("Selecciona una casilla para moverte.", "normal");
    } else {
        gridOverlay.style.pointerEvents = "none";
        clearHighlights();
    }
}

function highlightMovementRange() {
    clearHighlights();
    const cells = document.querySelectorAll(".grid-cell:not(.coordinate)");
    
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const distance = calculateGridDistance(gameState.player.position, { x, y }) * 5;
            if (distance <= gameState.player.movementRemaining) {
                const index = y * 10 + x;
                if (cells[index]) {
                    cells[index].classList.add("highlighted");
                }
            }
        }
    }
}

function clearHighlights() {
    const cells = document.querySelectorAll(".grid-cell:not(.coordinate)");
    cells.forEach(cell => {
        cell.classList.remove("highlighted", "range");
    });
}

function moveTo(x, y) {
    // Verificar que no se coloque sobre un lobo
    const occupiedWolf = gameState.wolves.find(w => !w.isDead && w.position.x === x && w.position.y === y);
    if (occupiedWolf) {
        addLogEntry("No puedes colocarte en la misma casilla que un lobo.", "normal");
        return;
    }
    
    const distance = calculateGridDistance(gameState.player.position, { x, y }) * 5;
    if (distance > gameState.player.movementRemaining) return;
    
    // Check if moving away from a wolf that was adjacent (for opportunity attack)
    const wasAdjacent = gameState.wolves.filter(w => !w.isDead && calculateDistance(gameState.player.position, w.position) <= 5);
    
    gameState.player.position = { x, y };
    gameState.player.movementRemaining -= distance;
    gameState.movementEnabled = false;
    
    clearHighlights();
    document.getElementById("grid-overlay").style.pointerEvents = "none";
    
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    addLogEntry(`Te mueves a ${letters[x]}${y + 1}. Distancia: ${distance} pies. Movimiento restante: ${gameState.player.movementRemaining} pies.`, "normal");
    
    updateUI();
}

function endTurn() {
    if (!gameState.isPlayerTurn) return;
    
    gameState.isPlayerTurn = false;
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.movementRemaining = gameState.player.movement;
    gameState.player.isDodging = false;
    
    // Remove temporary statuses but keep concentration
    gameState.player.status = gameState.player.status.filter(s => s === "concentrating");
    
    gameState.movementEnabled = false;
    
    clearHighlights();
    document.getElementById("grid-overlay").style.pointerEvents = "none";
    
    addLogEntry("Finalizas tu turno.", "normal");
    
    gameState.turn++;
    gameState.combatStats.turnsUsed++;
    
    setTimeout(wolfPackTurn, 1500);
    updateUI();
}

// ==================== IA DE LA MANADA DE LOBOS ====================
function wolfPackTurn() {
    addLogEntry(getRandomNarrative("enemyTurn"), "narrative");
    
    // Los lobos actúan en orden: Lobo 1, Lobo 2, Lobo 3, Alfa
    const livingWolves = gameState.wolves.filter(w => !w.isDead);
    
    let actionIndex = 0;
    
    function executeNextWolfAction() {
        if (actionIndex >= livingWolves.length) {
            endWolfTurn();
            return;
        }
        
        const wolf = livingWolves[actionIndex];
        executeWolfAction(wolf, () => {
            actionIndex++;
            setTimeout(executeNextWolfAction, 1000);
        });
    }
    
    executeNextWolfAction();
}

function executeWolfAction(wolf, callback) {
    if (wolf.isDead) {
        callback();
        return;
    }
    
    const distance = calculateDistance(gameState.player.position, wolf.position);
    const hpPercent = wolf.hp / wolf.maxHp;
    
    let action;
    
    if (wolf.isAlpha) {
        action = decideAlphaAction(distance, hpPercent);
    } else {
        action = decideWolfAction(wolf, distance, hpPercent);
    }
    
    executeWolfMove(wolf, action, callback);
}

function decideWolfAction(wolf, distance, hpPercent) {
    const actions = [];
    
    // Prioridades según el lobo
    if (wolf.id === 'wolf1') {
        // Lobo 1: Atacar si está cerca, Acercarse, Rodear
        if (distance <= 5) {
            actions.push({ name: "bite", weight: 0.7 });
            actions.push({ name: "harass", weight: 0.3 });
        } else {
            actions.push({ name: "approach", weight: 0.6 });
            actions.push({ name: "surround", weight: 0.4 });
        }
    } else if (wolf.id === 'wolf2') {
        // Lobo 2: Acercarse, Atacar, Acosar
        if (distance <= 5) {
            actions.push({ name: "bite", weight: 0.5 });
            actions.push({ name: "harass", weight: 0.5 });
        } else {
            actions.push({ name: "approach", weight: 0.7 });
            actions.push({ name: "surround", weight: 0.3 });
        }
    } else {
        // Lobo 3: Rodear, Atacar, Acercarse
        if (distance <= 5) {
            actions.push({ name: "bite", weight: 0.6 });
            actions.push({ name: "harass", weight: 0.4 });
        } else {
            actions.push({ name: "surround", weight: 0.6 });
            actions.push({ name: "approach", weight: 0.4 });
        }
    }
    
    // Retirada instintiva con baja probabilidad
    if (hpPercent < 0.5 && Math.random() < 0.2) {
        actions.push({ name: "retreat", weight: 0.3 });
    }
    
    // Seleccionar acción basada en pesos
    const totalWeight = actions.reduce((sum, a) => sum + a.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const action of actions) {
        random -= action.weight;
        if (random <= 0) {
            return action.name;
        }
    }
    
    return actions[0]?.name || "approach";
}

function decideAlphaAction(distance, hpPercent) {
    const actions = [];
    
    // Aullido del Alfa al inicio si no ha aullado
    if (!gameState.wolves[3].hasHowled) {
        actions.push({ name: "howl", weight: 0.9 });
    }
    
    // Furia Desesperada con baja vida
    if (hpPercent < 0.3) {
        actions.push({ name: "fury", weight: 0.8 });
    }
    
    // Prioridad 2: Mordisco Brutal si está cerca
    if (distance <= 5) {
        actions.push({ name: "brutalBite", weight: 0.7 });
    }
    
    // Prioridad 3: Carga Salvaje a distancia media
    if (distance > 5 && distance <= 20) {
        actions.push({ name: "wildCharge", weight: 0.6 });
    }
    
    // Acción por defecto: acercarse
    if (distance > 5) {
        actions.push({ name: "approach", weight: 0.5 });
    }
    
    // Si no hay acciones específicas, usar mordisco brutal
    if (actions.length === 0) {
        actions.push({ name: "brutalBite", weight: 1.0 });
    }
    
    // Seleccionar acción basada en pesos
    const totalWeight = actions.reduce((sum, a) => sum + a.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const action of actions) {
        random -= action.weight;
        if (random <= 0) {
            return action.name;
        }
    }
    
    return actions[0]?.name || "brutalBite";
}

function executeWolfMove(wolf, action, callback) {
    switch (action) {
        case "bite":
            wolfBite(wolf, callback);
            break;
        case "brutalBite":
            alphaBrutalBite(wolf, callback);
            break;
        case "harass":
            wolfHarass(wolf, callback);
            break;
        case "approach":
            wolfApproach(wolf, callback);
            break;
        case "surround":
            wolfSurround(wolf, callback);
            break;
        case "retreat":
            wolfRetreat(wolf, callback);
            break;
        case "howl":
            alphaHowl(wolf, callback);
            break;
        case "wildCharge":
            alphaWildCharge(wolf, callback);
            break;
        case "fury":
            alphaFury(wolf, callback);
            break;
        default:
            wolfApproach(wolf, callback);
    }
}

function wolfBite(wolf, callback) {
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance > 5) {
        wolfApproach(wolf, callback);
        return;
    }
    
    const attackRoll = rollDice(20);
    let attackTotal = attackRoll.total + 4; // +4 por bonus
    
    if (gameState.player.isDodging) {
        const disadvantageRoll = rollDice(20);
        attackTotal = Math.min(attackTotal, disadvantageRoll.total + 4);
        addLogEntry(`${wolf.name} ataca con desventaja (esquivando): d20(${attackRoll.rolls[0]}, ${disadvantageRoll.rolls[0]}) + 4 = ${attackTotal}`, "normal");
    } else {
        addLogEntry(`${wolf.name} muerde: d20(${attackRoll.rolls[0]}) + 4 = ${attackTotal} vs CA ${gameState.player.ac}`, "normal");
    }
    
    if (attackTotal >= gameState.player.ac) {
        const damageRoll = rollDice(4);
        const damage = damageRoll.total + 2; // 1d4 + 2
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        addLogEntry(`${getRandomNarrative("bite")} ${damage} de daño.`, "damage");
        
        checkDefeat();
    } else {
        addLogEntry(`${wolf.name} falla el mordisco.`, "normal");
    }
    
    updateUI();
    callback();
}

function alphaBrutalBite(wolf, callback) {
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance > 5) {
        wolfApproach(wolf, callback);
        return;
    }
    
    const attackRoll = rollDice(20);
    let attackTotal = attackRoll.total + 5; // +5 por bonus
    
    if (gameState.player.isDodging) {
        const disadvantageRoll = rollDice(20);
        attackTotal = Math.min(attackTotal, disadvantageRoll.total + 5);
        addLogEntry(`${wolf.name} ataca con desventaja (esquivando): d20(${attackRoll.rolls[0]}, ${disadvantageRoll.rolls[0]}) + 5 = ${attackTotal}`, "normal");
    } else {
        addLogEntry(`${wolf.name} usa Mordisco Brutal: d20(${attackRoll.rolls[0]}) + 5 = ${attackTotal} vs CA ${gameState.player.ac}`, "normal");
    }
    
    if (attackTotal >= gameState.player.ac) {
        const damageRoll = rollDice(6);
        const damage = damageRoll.total + 3; // 1d6 + 3
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        addLogEntry(`${wolf.name} inflige ${damage} de daño con su mordisco brutal.`, "damage");
        
        checkDefeat();
    } else {
        addLogEntry(`${wolf.name} falla el mordisco brutal.`, "normal");
    }
    
    updateUI();
    callback();
}

function wolfHarass(wolf, callback) {
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance > 5) {
        wolfApproach(wolf, callback);
        return;
    }
    
    addLogEntry(`${wolf.name} te acosa agresivamente.`, "narrative");
    
    // Pequeño daño por acoso
    if (Math.random() < 0.3) {
        const damage = rollDice(4).total;
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        addLogEntry(`${wolf.name} te raspa con sus colmillos. ${damage} de daño.`, "damage");
        checkDefeat();
    }
    
    updateUI();
    callback();
}

function wolfApproach(wolf, callback) {
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance <= 5) {
        wolfBite(wolf, callback);
        return;
    }
    
    // Moverse hacia el jugador
    const dx = gameState.player.position.x - wolf.position.x;
    const dy = gameState.player.position.y - wolf.position.y;
    
    let newX = wolf.position.x;
    let newY = wolf.position.y;
    
    const moveDistance = Math.min(wolf.movement / 5, distance / 5); // Convertir a celdas
    
    if (Math.abs(dx) > Math.abs(dy)) {
        newX += dx > 0 ? moveDistance : -moveDistance;
    } else {
        newY += dy > 0 ? moveDistance : -moveDistance;
    }
    
    newX = Math.max(0, Math.min(9, newX));
    newY = Math.max(0, Math.min(9, newY));
    
    wolf.position = { x: Math.round(newX), y: Math.round(newY) };
    addLogEntry(`${wolf.name} se acerca a ti.`, "normal");
    
    updateUI();
    callback();
}

function wolfSurround(wolf, callback) {
    // Intentar rodear al jugador moviéndose a un flanco
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance <= 5) {
        wolfBite(wolf, callback);
        return;
    }
    
    // Moverse lateralmente para rodear
    const dx = gameState.player.position.x - wolf.position.x;
    const dy = gameState.player.position.y - wolf.position.y;
    
    let newX = wolf.position.x;
    let newY = wolf.position.y;
    
    // Movimiento lateral
    if (Math.abs(dx) > Math.abs(dy)) {
        newY += dy > 0 ? 1 : -1;
    } else {
        newX += dx > 0 ? 1 : -1;
    }
    
    newX = Math.max(0, Math.min(9, newX));
    newY = Math.max(0, Math.min(9, newY));
    
    wolf.position = { x: newX, y: newY };
    addLogEntry(`${wolf.name} intenta rodearte.`, "normal");
    
    updateUI();
    callback();
}

function wolfRetreat(wolf, callback) {
    // Retirarse del jugador
    const dx = wolf.position.x - gameState.player.position.x;
    const dy = wolf.position.y - gameState.player.position.y;
    
    let newX = wolf.position.x;
    let newY = wolf.position.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        newX += dx > 0 ? 2 : -2;
    } else {
        newY += dy > 0 ? 2 : -2;
    }
    
    newX = Math.max(0, Math.min(9, newX));
    newY = Math.max(0, Math.min(9, newY));
    
    wolf.position = { x: newX, y: newY };
    addLogEntry(`${wolf.name} se retira instintivamente.`, "normal");
    
    updateUI();
    callback();
}

function alphaHowl(wolf, callback) {
    wolf.hasHowled = true;
    addLogEntry(getRandomNarrative("alphaHowl"), "critical");
    
    // Potenciar a los lobos vivos
    gameState.wolves.forEach(w => {
        if (!w.isDead && !w.isAlpha) {
            w.status.push("buffed");
        }
    });
    
    addLogEntry("Los lobos de la manada se sienten potenciados.", "normal");
    
    updateUI();
    callback();
}

function alphaWildCharge(wolf, callback) {
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    // Cargar hacia el jugador
    const dx = gameState.player.position.x - wolf.position.x;
    const dy = gameState.player.position.y - wolf.position.y;
    
    let newX = wolf.position.x + (dx > 0 ? 2 : -2);
    let newY = wolf.position.y + (dy > 0 ? 2 : -2);
    
    newX = Math.max(0, Math.min(9, newX));
    newY = Math.max(0, Math.min(9, newY));
    
    wolf.position = { x: newX, y: newY };
    addLogEntry(`${wolf.name} carga salvajemente hacia ti.`, "normal");
    
    updateUI();
    
    // Atacar después de cargar
    setTimeout(() => {
        alphaBrutalBite(wolf, callback);
    }, 500);
}

function alphaFury(wolf, callback) {
    addLogEntry(`${wolf.name} entra en Furia Desesperada.`, "critical");
    
    // Ataque adicional con bonus
    const distance = calculateDistance(gameState.player.position, wolf.position);
    
    if (distance <= 5) {
        const attackRoll = rollDice(20);
        let attackTotal = attackRoll.total + 7; // +7 por furia
        
        if (gameState.player.isDodging) {
            const disadvantageRoll = rollDice(20);
            attackTotal = Math.min(attackTotal, disadvantageRoll.total + 7);
        }
        
        addLogEntry(`${wolf.name} ataca con furia: d20(${attackRoll.rolls[0]}) + 7 = ${attackTotal} vs CA ${gameState.player.ac}`, "normal");
        
        if (attackTotal >= gameState.player.ac) {
            const damageRoll = rollDice(8);
            const damage = damageRoll.total + 5; // 1d8 + 5
            gameState.player.hp -= damage;
            gameState.combatStats.damageTaken += damage;
            addLogEntry(`${wolf.name} inflige ${damage} de daño con su furia.`, "damage");
            
            checkDefeat();
        } else {
            addLogEntry(`${wolf.name} falla el ataque de furia.`, "normal");
        }
    }
    
    updateUI();
    callback();
}

function endWolfTurn() {
    gameState.isPlayerTurn = true;
    addLogEntry(getRandomNarrative("playerTurn"), "narrative");
    updateUI();
}

function findNearestWolf() {
    let nearest = null;
    let minDistance = Infinity;
    
    gameState.wolves.forEach(wolf => {
        if (!wolf.isDead) {
            const distance = calculateDistance(gameState.player.position, wolf.position);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = wolf;
            }
        }
    });
    
    return nearest;
}

function checkVictory() {
    const allWolvesDead = gameState.wolves.every(w => w.isDead);
    
    if (allWolvesDead) {
        setTimeout(() => {
            document.getElementById("victory-modal").classList.add("active");
            document.getElementById("victory-wolves").textContent = gameState.combatStats.wolvesDefeated;
            document.getElementById("victory-damage-dealt").textContent = gameState.combatStats.damageDealt;
            document.getElementById("victory-damage-taken").textContent = gameState.combatStats.damageTaken;
            document.getElementById("victory-turns").textContent = gameState.combatStats.turnsUsed;
            addLogEntry(getRandomNarrative("victory"), "narrative");
        }, 1000);
    }
}

function checkDefeat() {
    if (gameState.player.hp <= 0) {
        gameState.player.hp = 0;
        setTimeout(() => {
            document.getElementById("defeat-modal").classList.add("active");
            document.getElementById("defeat-wolves").textContent = gameState.combatStats.wolvesDefeated;
            document.getElementById("defeat-damage-dealt").textContent = gameState.combatStats.damageDealt;
            document.getElementById("defeat-damage-taken").textContent = gameState.combatStats.damageTaken;
            document.getElementById("defeat-turns").textContent = gameState.combatStats.turnsUsed;
            addLogEntry(getRandomNarrative("defeat"), "narrative");
        }, 1000);
    }
}

function restartGame() {
    // Resetear estado del juego
    gameState.player.hp = 42;
    gameState.player.position = { x: 5, y: 8 };
    gameState.player.resources = {
        spellSlots: 3,
        layOnHands: 20,
        divineSense: 1
    };
    gameState.player.status = [];
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.movementRemaining = 30;
    gameState.player.isDodging = false;
    gameState.player.divinePunishmentActive = false;
    gameState.player.concentration = null;
    gameState.player.blessedTargets = [];
    gameState.player.shieldOfFaithActive = false;
    gameState.player.ac = gameState.player.baseAc;
    
    gameState.wolves[0].hp = 11;
    gameState.wolves[0].position = { x: 2, y: 3 };
    gameState.wolves[0].status = [];
    gameState.wolves[0].isDead = false;
    
    gameState.wolves[1].hp = 11;
    gameState.wolves[1].position = { x: 8, y: 3 };
    gameState.wolves[1].status = [];
    gameState.wolves[1].isDead = false;
    
    gameState.wolves[2].hp = 11;
    gameState.wolves[2].position = { x: 5, y: 2 };
    gameState.wolves[2].status = [];
    gameState.wolves[2].isDead = false;
    
    gameState.wolves[3].hp = 35;
    gameState.wolves[3].position = { x: 5, y: 5 };
    gameState.wolves[3].status = [];
    gameState.wolves[3].isDead = false;
    gameState.wolves[3].hasHowled = false;
    
    gameState.selectedWolf = null;
    gameState.turn = 1;
    gameState.isPlayerTurn = true;
    gameState.movementEnabled = false;
    gameState.combatStats = {
        turnsUsed: 0,
        damageDealt: 0,
        damageTaken: 0,
        wolvesDefeated: 0
    };
    
    // Cerrar modales
    document.getElementById("victory-modal").classList.remove("active");
    document.getElementById("defeat-modal").classList.remove("active");
    
    // Limpiar log
    document.getElementById("combat-log").innerHTML = '<div class="log-entry narrative">El combate comienza...</div>';
    
    // Reiniciar juego
    startGame();
}
