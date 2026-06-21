// ==================== ESTADO DEL JUEGO ====================
const gameState = {
    player: {
        hp: 44,
        maxHp: 44,
        ac: 18,
        movement: 30,
        position: { x: 1, y: 8 },
        resources: {
            secondWind: 1,
            suddenAction: 1,
            superiorityDice: 4
        },
        status: [],
        hasAction: true,
        hasAdditionalAction: true,
        movementRemaining: 30
    },
    enemy: {
        hp: 90,
        maxHp: 90,
        ac: 15,
        movement: 30,
        position: { x: 8, y: 1 },
        status: [],
        shieldActive: false
    },
    turn: 1,
    isPlayerTurn: true,
    movementEnabled: false,
    combatStats: {
        turnsUsed: 0,
        damageDealt: 0,
        damageTaken: 0,
        abilitiesUsed: 0
    }
};

// ==================== BANCOS DE NARRATIVA ====================
const narrativeBanks = {
    gameStart: [
        "La cámara psiónica resuena con energía antigua mientras te adentras en ella.",
        "El aire vibra con poder psiónico. El Maestro Mental te espera.",
        "Tus sentidos se agudizan. El combate está por comenzar.",
        "Las sombras danzan en las paredes de la cámara abandonada.",
        "El Maestro Mental se materializa ante ti, sus ojos brillando con poder psiónico.",
        "Preparas tu espada. Este será un combate memorable.",
        "La cámara parece susurrar secretos olvidados.",
        "Tu entrenamiento como Maestro de Batalla te prepara para este momento.",
        "El suelo de la cámara está cubierto de runas psiónicas.",
        "El Maestro Mental sonríe, seguro de su victoria.",
        "Sientes el peso de tu escudo. Estás listo.",
        "La energía psiónica está densa, casi tangible.",
        "El Maestro Mental invoca tentáculos de energía pura.",
        "Tu corazón late con fuerza. Es hora de luchar.",
        "La cámara ha sido testigo de muchos combates. Hoy será testigo del tuyo.",
        "El Maestro Mental proyecta su voluntad hacia ti.",
        "Te concentras. La victoria depende de tu estrategia.",
        "Las paredes de la cámara parecen respirar.",
        "El Maestro Mental ríe, un sonido que resuena en tu mente.",
        "Este es tu desafío. Tu momento de gloria."
    ],
    turnStart: [
        "Un nuevo turno comienza.",
        "El combate continúa con renewed intensity.",
        "La tensión en la cámara aumenta.",
        "Ambos combatientes se preparan para la siguiente acción.",
        "El flujo de la batalla cambia.",
        "Tu mente está alerta, buscando oportunidades.",
        "El Maestro Mental recalcula su estrategia.",
        "La energía psiónica fluye alrededor de ti.",
        "Es momento de tomar decisiones importantes.",
        "El combate evoluciona con cada acción.",
        "Tu experiencia te guía en este momento.",
        "El Maestro Mental no subestima tu habilidad.",
        "Las runas en el suelo brillan más intensamente.",
        "Cada acción cuenta en este combate.",
        "La cámara parece responder al combate.",
        "Tu determinación no vacila.",
        "El Maestro Mental intensifica su ofensiva.",
        "El equilibrio del combate es frágil.",
        "Tu instinto de guerrero se activa.",
        "El destino de este combate está por decidirse."
    ],
    attackSuccess: [
        "¡Tu ataque conecta con precisión!",
        "El enemigo grita de dolor.",
        "Tu espada encuentra su objetivo.",
        "Un golpe certero sacude al enemigo.",
        "El Maestro Mental retrocede ante tu ataque.",
        "¡Impacto directo!",
        "Tu entrenamiento se refleja en este golpe.",
        "El enemigo no puede evitar tu ataque.",
        "Tu arma resuena con el impacto.",
        "Un golpe devastador alcanza al enemigo.",
        "El Maestro Mental sangra energía psiónica.",
        "Tu precisión es impecable.",
        "El enemigo siente el peso de tu ataque.",
        "¡Golpe crítico!",
        "Tu ataque deja una marca visible.",
        "El Maestro Mental se estremece.",
        "Tu fuerza se impone.",
        "El enemigo no puede responder a tiempo.",
        "Un golpe maestro.",
        "El combate se inclina a tu favor."
    ],
    attackFail: [
        "El enemigo esquiva tu ataque.",
        "Tu golpe falla por poco.",
        "El Maestro Mental se desplaza rápidamente.",
        "Tu ataque es bloqueado.",
        "El enemigo anticipa tu movimiento.",
        "Tu arma pasa rozando al enemigo.",
        "El Maestro Mental se defiende hábilmente.",
        "Tu ataque no encuentra su objetivo.",
        "El enemigo usa su velocidad para esquivar.",
        "Tu golpe es desviado.",
        "El Maestro Mental ríe ante tu intento.",
        "Tu ataque pierde fuerza.",
        "El enemigo se mueve demasiado rápido.",
        "Tu precisión falla en este momento.",
        "El Maestro Mental anticipa tu acción.",
        "Tu ataque es ineficaz.",
        "El enemigo se protege.",
        "Tu golpe no conecta.",
        "El Maestro Mental se mantiene ileso.",
        "Tu ataque es evitado."
    ],
    criticalHit: [
        "¡GOLPE CRÍTICO! El daño es devastador.",
        "¡CRÍTICO! El enemigo es sacudido violentamente.",
        "¡IMPACTO PERFECTO! El daño es masivo.",
        "¡CRÍTICO! Tu ataque atraviesa las defensas.",
        "¡GOLPE MORTAL! El enemigo sufre terriblemente.",
        "¡CRÍTICO! El daño es extraordinario.",
        "¡IMPACTO ÉPICO! El enemigo no puede creerlo.",
        "¡CRÍTICO! Tu ataque es legendario.",
        "¡GOLPE DESTROZADOR! El daño es inmenso.",
        "¡CRÍTICO! El enemigo es gravemente herido.",
        "¡IMPACTO CATASTRÓFICO! El daño es brutal.",
        "¡CRÍTICO! El enemigo cae de rodillas.",
        "¡GOLPE APLASTANTE! El daño es abrumador.",
        "¡CRÍTICO! El enemigo grita de agonía.",
        "¡IMPACTO LEGENDARIO! El daño es histórico.",
        "¡CRÍTICO! El enemigo es devastado.",
        "¡GOLPE TITÁNICO! El daño es colosal.",
        "¡CRÍTICO! El enemigo casi es derrotado.",
        "¡IMPACTO DIVINO! El daño es celestial.",
        "¡CRÍTICO! El enemigo siente tu verdadero poder."
    ],
    skillUse: [
        "Activas tu habilidad con maestría.",
        "Tu entrenamiento brilla en este momento.",
        "La habilidad se activa perfectamente.",
        "Tu experiencia como Guerrero se manifiesta.",
        "La habilidad fluye naturalmente.",
        "Tu técnica es impecable.",
        "La habilidad se ejecuta con precisión.",
        "Tu dominio de la habilidad es evidente.",
        "La habilidad resuena con poder.",
        "Tu ejecución es perfecta.",
        "La habilidad se despliega con gracia.",
        "Tu control es absoluto.",
        "La habilidad funciona como planeado.",
        "Tu timing es perfecto.",
        "La habilidad se activa con fuerza.",
        "Tu habilidad impresiona al enemigo.",
        "La habilidad demuestra tu valía.",
        "Tu ejecución es profesional.",
        "La habilidad se manifiesta plenamente.",
        "Tu habilidad es temible."
    ],
    damageReceived: [
        "El ataque del enemigo te alcanza.",
        "Sientes el dolor del impacto.",
        "El enemigo te inflige daño.",
        "Tu armadura resiste, pero no completamente.",
        "El daño penetra tus defensas.",
        "El enemigo conecta su ataque.",
        "Sientes el golpe en tu cuerpo.",
        "El daño es significativo.",
        "El enemigo encuentra una abertura.",
        "Tu escudo no puede bloquear todo.",
        "El ataque te hace retroceder.",
        "El daño te debilita.",
        "El enemigo aprovecha tu vulnerabilidad.",
        "Sientes el impacto del ataque.",
        "El daño es doloroso pero manejable.",
        "El enemigo te hiere.",
        "Tu resistencia es puesta a prueba.",
        "El daño te afecta.",
        "El enemigo logra herirte.",
        "El golpe es preciso."
    ],
    mindControl: [
        "Sientes tu mente siendo invadida.",
        "Pensamientos ajenos fluyen en tu consciencia.",
        "Tu voluntad es puesta a prueba.",
        "El Maestro Mental intenta controlarte.",
        "Sientes una presión en tu mente.",
        "Tu mente resiste el control.",
        "El control mental es poderoso.",
        "Tus pensamientos se nublan momentáneamente.",
        "El Maestro Mental ejerce su influencia.",
        "Tu mente lucha por mantener el control.",
        "El control psiónico es abrumador.",
        "Sientes tu voluntad debilitarse.",
        "El Maestro Mental invade tu mente.",
        "Tu mente se siente ajena.",
        "El control mental es intenso.",
        "Tu consciencia es afectada.",
        "El Maestro Mental manipula tu mente.",
        "Sientes la influencia psiónica.",
        "Tu mente es atacada.",
        "El control mental es una amenaza real."
    ],
    victory: [
        "¡Has derrotado al Maestro Mental!",
        "La cámara cae en silencio. Has ganado.",
        "El Maestro Mental se desvanece.",
        "Tu victoria es absoluta.",
        "Has demostrado tu valía como Guerrero.",
        "El Maestro Mental cae derrotado.",
        "¡Victoria! Tu habilidad es innegable.",
        "El combate termina a tu favor.",
        "Has superado el desafío psiónico.",
        "El Maestro Mental reconoce tu poder.",
        "Tu entrenamiento ha dado sus frutos.",
        "La cámara celebra tu victoria.",
        "Has conquistado la cámara psiónica.",
        "El Maestro Mental es vencido.",
        "Tu nombre será recordado.",
        "La victoria es tuya.",
        "Has demostrado ser superior.",
        "El Maestro Mental se rinde.",
        "Tu gloria es eterna.",
        "Has escrito tu leyenda."
    ],
    defeat: [
        "Tu mente es dominada completamente.",
        "El Maestro Mental ha ganado.",
        "Tu consciencia se desvanece.",
        "Has sido derrotado.",
        "El Maestro Mental te controla.",
        "Tu voluntad se rompe.",
        "El combate termina en derrota.",
        "El Maestro Mental triunfa.",
        "Tu mente es esclavizada.",
        "Has fallado en tu misión.",
        "El Maestro Mental te supera.",
        "Tu resistencia se agota.",
        "El control mental es total.",
        "Has caído ante el enemigo.",
        "Tu mente pertenece al Maestro.",
        "La derrota es inevitable.",
        "El Maestro Mental te vence.",
        "Tu consciencia se pierde.",
        "Has sido dominado.",
        "El Maestro Mental gana."
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
    // Usar distancia Manhattan para el sistema de cuadrilla (cada celda es 5 pies)
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx + dy) * 5; // Cada celda es 5 pies
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

    // Actualizar PV del enemigo
    const enemyHpPercent = (gameState.enemy.hp / gameState.enemy.maxHp) * 100;
    document.getElementById("enemy-hp-fill").style.width = `${enemyHpPercent}%`;
    document.getElementById("enemy-hp").textContent = gameState.enemy.hp;

    // Actualizar recursos
    document.getElementById("second-wind").className = `resource-badge ${gameState.player.resources.secondWind === 0 ? "used" : ""}`;
    document.getElementById("sudden-action").className = `resource-badge ${gameState.player.resources.suddenAction === 0 ? "used" : ""}`;
    document.getElementById("superiority-dice").textContent = `Dados de Superioridad (${gameState.player.resources.superiorityDice})`;
    document.getElementById("superiority-dice").className = `resource-badge ${gameState.player.resources.superiorityDice === 0 ? "used" : ""}`;

    // Actualizar estados
    const statusContainer = document.getElementById("status-effects");
    if (gameState.player.status.length === 0) {
        statusContainer.innerHTML = '<span style="color: #9ca3af; font-style: italic;">Ningún estado activo</span>';
    } else {
        statusContainer.innerHTML = gameState.player.status.map(s => 
            `<span class="status-effect">${translateStatus(s)}</span>`
        ).join("");
    }

    // Actualizar posiciones en el mapa
    updateTokenPositions();

    // Actualizar botones de acción
    updateActionButtons();
}

function translateStatus(status) {
    const translations = {
        "stunned": "Aturdido",
        "frightened": "Asustado",
        "charmed": "Encantado",
        "knockedDown": "Derribado",
        "mindOverpowered": "Mente Dominada"
    };
    return translations[status] || status;
}

function updateTokenPositions() {
    const playerToken = document.getElementById("player-token");
    const enemyToken = document.getElementById("enemy-token");
    
    // Calcular posición en píxeles basado en la cuadrilla
    const mapContainer = document.getElementById("map-container");
    const containerWidth = mapContainer.offsetWidth;
    const containerHeight = mapContainer.offsetHeight;
    
    // La cuadrilla tiene 10x10 celdas, con margen para etiquetas (40px)
    const gridWidth = containerWidth - 40;
    const gridHeight = containerHeight - 40;
    const cellWidth = gridWidth / 10;
    const cellHeight = gridHeight / 10;
    
    // Posicionar tokens en el centro de las celdas
    const playerX = 40 + (gameState.player.position.x * cellWidth) + (cellWidth / 2) - 20; // 20 es mitad del token (40px)
    const playerY = 40 + (gameState.player.position.y * cellHeight) + (cellHeight / 2) - 20;
    
    const enemyX = 40 + (gameState.enemy.position.x * cellWidth) + (cellWidth / 2) - 20;
    const enemyY = 40 + (gameState.enemy.position.y * cellHeight) + (cellHeight / 2) - 20;
    
    playerToken.style.left = `${playerX}px`;
    playerToken.style.top = `${playerY}px`;
    
    enemyToken.style.left = `${enemyX}px`;
    enemyToken.style.top = `${enemyY}px`;
}

function updateActionButtons() {
    const buttons = document.querySelectorAll(".action-btn");
    buttons.forEach(btn => {
        btn.disabled = !gameState.isPlayerTurn;
    });

    // Botones específicos
    document.getElementById("second-wind-btn").disabled = !gameState.isPlayerTurn || gameState.player.resources.secondWind === 0;
    document.getElementById("sudden-action-btn").disabled = !gameState.isPlayerTurn || gameState.player.resources.suddenAction === 0;
    document.getElementById("precision-attack").disabled = !gameState.isPlayerTurn || gameState.player.resources.superiorityDice === 0;
    document.getElementById("sweeping-attack").disabled = !gameState.isPlayerTurn || gameState.player.resources.superiorityDice === 0;
    document.getElementById("threatening-attack").disabled = !gameState.isPlayerTurn || gameState.player.resources.superiorityDice === 0;

    document.getElementById("move-btn").disabled = !gameState.isPlayerTurn || gameState.player.movementRemaining <= 0;
    document.getElementById("end-turn-btn").disabled = !gameState.isPlayerTurn;
}

// ==================== FUNCIONES DE COMBATE ====================
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "grid";
    
    gameState.usedNarratives = {};
    addLogEntry(getRandomNarrative("gameStart"), "narrative");
    
    // Determinar iniciativa
    const playerInitiative = rollDice(20).total + 3; // +3 por atributos
    const enemyInitiative = rollDice(20).total + 2;
    
    if (playerInitiative >= enemyInitiative) {
        gameState.isPlayerTurn = true;
        addLogEntry("¡Ganas la iniciativa! Es tu turno.", "narrative");
    } else {
        gameState.isPlayerTurn = false;
        addLogEntry("El enemigo gana la iniciativa. Espera su turno.", "narrative");
        setTimeout(enemyTurn, 1500);
    }
    
    updateUI();
}

function swordAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    const attackRoll = rollDice(20);
    const attackTotal = attackRoll.total + 6; // +6 por FUE y proficiencia
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    
    if (distance > 5) {
        addLogEntry("El enemigo está demasiado lejos para el ataque cuerpo a cuerpo.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    gameState.combatStats.abilitiesUsed++;
    
    addLogEntry(`Ataque con espada: d20(${attackRoll.rolls[0]}) + 6 = ${attackTotal}`, "normal");
    
    if (attackTotal >= gameState.enemy.ac) {
        const damageRoll = rollDice(8);
        const damage = damageRoll.total + 4; // 1d8 + 4 por FUE
        const isCritical = attackRoll.rolls[0] === 20;
        
        if (isCritical) {
            const critDamageRoll = rollDice(8);
            const critDamage = (critDamageRoll.total + 4) * 2;
            gameState.enemy.hp -= critDamage;
            gameState.combatStats.damageDealt += critDamage;
            addLogEntry(`${getRandomNarrative("criticalHit")} ¡Golpe crítico! d8(${critDamageRoll.rolls[0]}) + 4 = ${critDamageRoll.total} × 2 = ${critDamage} de daño.`, "critical");
        } else {
            gameState.enemy.hp -= damage;
            gameState.combatStats.damageDealt += damage;
            addLogEntry(`${getRandomNarrative("attackSuccess")} d8(${damageRoll.rolls[0]}) + 4 = ${damage} de daño.`, "normal");
        }
        
        checkVictory();
    } else {
        addLogEntry(getRandomNarrative("attackFail"), "normal");
    }
    
    updateUI();
}

function crossbowShot() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    const attackRoll = rollDice(20);
    const attackTotal = attackRoll.total + 4; // +4 por DES y proficiencia
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    
    gameState.player.hasAction = false;
    gameState.combatStats.abilitiesUsed++;
    
    addLogEntry(`Disparo de ballesta: d20(${attackRoll.rolls[0]}) + 4 = ${attackTotal}`, "normal");
    
    if (attackTotal >= gameState.enemy.ac) {
        const damageRoll = rollDice(8);
        const damage = damageRoll.total + 2; // 1d8 + 2 por DES
        const isCritical = attackRoll.rolls[0] === 20;
        
        if (isCritical) {
            const critDamageRoll = rollDice(8);
            const critDamage = (critDamageRoll.total + 2) * 2;
            gameState.enemy.hp -= critDamage;
            gameState.combatStats.damageDealt += critDamage;
            addLogEntry(`${getRandomNarrative("criticalHit")} ¡Golpe crítico! d8(${critDamageRoll.rolls[0]}) + 2 = ${critDamageRoll.total} × 2 = ${critDamage} de daño.`, "critical");
        } else {
            gameState.enemy.hp -= damage;
            gameState.combatStats.damageDealt += damage;
            addLogEntry(`${getRandomNarrative("attackSuccess")} d8(${damageRoll.rolls[0]}) + 2 = ${damage} de daño.`, "normal");
        }
        
        checkVictory();
    } else {
        addLogEntry(getRandomNarrative("attackFail"), "normal");
    }
    
    updateUI();
}

function pushAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    if (distance > 5) {
        addLogEntry("El enemigo está demasiado lejos.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    gameState.combatStats.abilitiesUsed++;
    
    const contestRoll = rollDice(20);
    const contestTotal = contestRoll.total + 6; // FUE
    const enemyRoll = rollDice(20);
    const enemyTotal = enemyRoll.total + 4;
    
    addLogEntry(`Empujón: Tu d20(${contestRoll.rolls[0]}) + 6 = ${contestTotal} vs Enemigo d20(${enemyRoll.rolls[0]}) + 4 = ${enemyTotal}`, "normal");
    
    if (contestTotal > enemyTotal) {
        // Empujar al enemigo
        const dx = gameState.enemy.position.x - gameState.player.position.x;
        const dy = gameState.enemy.position.y - gameState.player.position.y;
        
        if (Math.abs(dx) > Math.abs(dy)) {
            gameState.enemy.position.x += dx > 0 ? 1 : -1;
        } else {
            gameState.enemy.position.y += dy > 0 ? 1 : -1;
        }
        
        // Mantener dentro de los límites
        gameState.enemy.position.x = Math.max(0, Math.min(9, gameState.enemy.position.x));
        gameState.enemy.position.y = Math.max(0, Math.min(9, gameState.enemy.position.y));
        
        addLogEntry("¡Empujas al enemigo con éxito!", "normal");
    } else {
        addLogEntry("El enemigo resiste el empujón.", "normal");
    }
    
    updateUI();
}

function knockdownAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    if (distance > 5) {
        addLogEntry("El enemigo está demasiado lejos.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    gameState.combatStats.abilitiesUsed++;
    
    const contestRoll = rollDice(20);
    const contestTotal = contestRoll.total + 6; // FUE
    const enemyRoll = rollDice(20);
    const enemyTotal = enemyRoll.total + 4;
    
    addLogEntry(`Derribar: Tu d20(${contestRoll.rolls[0]}) + 6 = ${contestTotal} vs Enemigo d20(${enemyRoll.rolls[0]}) + 4 = ${enemyTotal}`, "normal");
    
    if (contestTotal > enemyTotal) {
        if (!gameState.enemy.status.includes("knockedDown")) {
            gameState.enemy.status.push("knockedDown");
            addLogEntry("¡Derribas al enemigo!", "normal");
        } else {
            addLogEntry("El enemigo ya está derribado.", "normal");
        }
    } else {
        addLogEntry("El enemigo resiste ser derribado.", "normal");
    }
    
    updateUI();
}

function precisionAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction || gameState.player.resources.superiorityDice === 0) return;
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.resources.superiorityDice--;
    gameState.combatStats.abilitiesUsed++;
    
    addLogEntry(`${getRandomNarrative("skillUse")} +1d8 al próximo ataque.`, "normal");
    
    // Aplicar bonus al próximo ataque (simplificado)
    gameState.player.nextAttackBonus = 8;
    
    updateUI();
}

function sweepingAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction || gameState.player.resources.superiorityDice === 0) return;
    
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    if (distance > 5) {
        addLogEntry("El enemigo está demasiado lejos.", "normal");
        return;
    }
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.resources.superiorityDice--;
    gameState.combatStats.abilitiesUsed++;
    
    const damageRoll = rollDice(8);
    const damage = damageRoll.total;
    gameState.enemy.hp -= damage;
    gameState.combatStats.damageDealt += damage;
    
    addLogEntry(`${getRandomNarrative("skillUse")} d8(${damageRoll.rolls[0]}) = ${damage} de daño en área.`, "normal");
    
    checkVictory();
    updateUI();
}

function threateningAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction || gameState.player.resources.superiorityDice === 0) return;
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.resources.superiorityDice--;
    gameState.combatStats.abilitiesUsed++;
    
    addLogEntry(`${getRandomNarrative("skillUse")} Gasta un dado de superioridad. El enemigo tiene desventaja en su próximo ataque.`, "normal");
    
    gameState.enemy.nextAttackDisadvantage = true;
    
    updateUI();
}

function secondWind() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction || gameState.player.resources.secondWind === 0) return;
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.resources.secondWind--;
    gameState.combatStats.abilitiesUsed++;
    
    const healingRoll = rollDice(10);
    const healing = healingRoll.total + 5;
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healing);
    
    addLogEntry(`${getRandomNarrative("skillUse")} d10(${healingRoll.rolls[0]}) + 5 = ${healing} PV recuperados.`, "heal");
    
    updateUI();
}

function suddenAction() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction || gameState.player.resources.suddenAction === 0) return;
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.resources.suddenAction--;
    gameState.combatStats.abilitiesUsed++;
    
    gameState.player.hasAction = true;
    addLogEntry(`${getRandomNarrative("skillUse")} Ganas una acción adicional.`, "normal");
    
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
    const gridOverlay = document.getElementById("grid-overlay");
    const cells = gridOverlay.querySelectorAll('.grid-cell:not(.coordinate)');
    
    const maxCells = Math.floor(gameState.player.movementRemaining / 5); // Cada celda es 5 pies
    
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const distance = calculateGridDistance(gameState.player.position, { x, y });
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
    // Verificar que no se coloque sobre el enemigo
    if (x === gameState.enemy.position.x && y === gameState.enemy.position.y) {
        addLogEntry("No puedes colocarte en la misma casilla que el enemigo.", "normal");
        return;
    }
    
    const distance = calculateGridDistance(gameState.player.position, { x, y });
    if (distance > gameState.player.movementRemaining) return;
    
    gameState.player.position = { x, y };
    gameState.player.movementRemaining -= distance;
    gameState.movementEnabled = false;
    
    clearHighlights();
    document.getElementById("grid-overlay").style.pointerEvents = "none";
    
    const coordinate = positionToCoordinate(x, y);
    addLogEntry(`Te mueves a ${coordinate}. Distancia: ${distance} pies. Movimiento restante: ${gameState.player.movementRemaining} pies.`, "normal");
    
    updateUI();
}

function endTurn() {
    if (!gameState.isPlayerTurn) return;
    
    gameState.isPlayerTurn = false;
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.movementRemaining = gameState.player.movement;
    gameState.movementEnabled = false;
    
    clearHighlights();
    document.getElementById("grid-overlay").style.pointerEvents = "none";
    
    addLogEntry("Finalizas tu turno.", "normal");
    
    gameState.turn++;
    gameState.combatStats.turnsUsed++;
    
    setTimeout(enemyTurn, 1500);
    updateUI();
}

// ==================== IA DEL ENEMIGO ====================
function enemyTurn() {
    addLogEntry(getRandomNarrative("turnStart"), "narrative");
    
    // Procesar estados del enemigo
    if (gameState.enemy.status.includes("knockedDown")) {
        // El enemigo se levanta
        gameState.enemy.status = gameState.enemy.status.filter(s => s !== "knockedDown");
        addLogEntry("El enemigo se levanta.", "normal");
    }
    
    // Decidir acción basada en contexto
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    const hpPercent = gameState.enemy.hp / gameState.enemy.maxHp;
    
    let action = decideEnemyAction(distance, hpPercent);
    executeEnemyAction(action);
    
    // Verificar si el enemigo tiene acción adicional
    if (Math.random() < 0.3) {
        setTimeout(() => {
            const action2 = decideEnemyAction(distance, hpPercent);
            executeEnemyAction(action2);
            endEnemyTurn();
        }, 1000);
    } else {
        endEnemyTurn();
    }
}

function decideEnemyAction(distance, hpPercent) {
    const actions = [];
    
    // Prioridad 1: Escudo Mental si está bajo de vida
    if (hpPercent < 0.3 && !gameState.enemy.shieldActive) {
        actions.push({ name: "shield", weight: 0.8 });
    }
    
    // Prioridad 2: Dominación Mental si está cerca
    if (distance <= 5) {
        actions.push({ name: "dominate", weight: 0.7 });
        actions.push({ name: "tentacles", weight: 0.6 });
    }
    
    // Prioridad 3: Explosión Mental a distancia media
    if (distance > 5 && distance <= 25) {
        actions.push({ name: "mindBlast", weight: 0.7 });
    }
    
    // Prioridad 4: Rayo Psiónico a distancia
    if (distance > 5) {
        actions.push({ name: "beam", weight: 0.5 });
    }
    
    // Acción por defecto: acercarse si está lejos
    if (distance > 5) {
        actions.push({ name: "move", weight: 0.4 });
    }
    
    // Si no hay acciones específicas, usar tentáculos
    if (actions.length === 0) {
        actions.push({ name: "tentacles", weight: 1.0 });
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
    
    return actions[0].name;
}

function executeEnemyAction(action) {
    switch (action) {
        case "tentacles":
            enemyTentacles();
            break;
        case "mindBlast":
            enemyMindBlast();
            break;
        case "beam":
            enemyBeam();
            break;
        case "dominate":
            enemyDominate();
            break;
        case "shield":
            enemyShield();
            break;
        case "move":
            enemyMove();
            break;
    }
}

function enemyTentacles() {
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    if (distance > 5) {
        enemyMove();
        return;
    }
    
    const attackRoll = rollDice(20);
    let attackTotal = attackRoll.total + 5;
    if (gameState.enemy.nextAttackDisadvantage) {
        const secondRoll = rollDice(20);
        const secondTotal = secondRoll.total + 5;
        attackTotal = Math.min(attackTotal, secondTotal);
        gameState.enemy.nextAttackDisadvantage = false;
        addLogEntry(`Enemigo tiene desventaja: d20(${attackRoll.rolls[0]}) + 5 = ${attackRoll.total + 5} vs d20(${secondRoll.rolls[0]}) + 5 = ${secondTotal}. Resultado: ${attackTotal}`, "normal");
    } else {
        addLogEntry(`Ataque de tentáculos: d20(${attackRoll.rolls[0]}) + 5 = ${attackTotal}`, "normal");
    }
    
    if (attackTotal >= gameState.player.ac) {
        const damageRoll = rollDice(8);
        const damage = damageRoll.total + 3;
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        addLogEntry(`El enemigo te ataca con tentáculos. ${getRandomNarrative("damageReceived")} d8(${damageRoll.rolls[0]}) + 3 = ${damage} de daño.`, "damage");
    } else {
        addLogEntry("El enemigo falla su ataque de tentáculos.", "normal");
    }
    
    checkDefeat();
    updateUI();
}

function enemyMindBlast() {
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    if (distance > 5) {
        enemyMove();
        return;
    }
    
    const saveDC = 15;
    const saveRoll = rollDice(20);
    const saveTotal = saveRoll.total + 2; // SAB
    
    addLogEntry(`Explosión Mental: Tu salvación SAB d20(${saveRoll.rolls[0]}) + 2 = ${saveTotal} vs CD ${saveDC}`, "normal");
    
    if (saveTotal < saveDC) {
        const damageRoll1 = rollDice(8);
        const damageRoll2 = rollDice(8);
        const damage = damageRoll1.total + damageRoll2.total + 3;
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        
        if (!gameState.player.status.includes("stunned")) {
            gameState.player.status.push("stunned");
        }
        
        addLogEntry(`¡Explosión Mental! ${getRandomNarrative("damageReceived")} d8(${damageRoll1.rolls[0]}) + d8(${damageRoll2.rolls[0]}) + 3 = ${damage} de daño y quedas aturdido.`, "damage");
    } else {
        addLogEntry("Resistes la explosión mental.", "normal");
    }
    
    checkDefeat();
    updateUI();
}

function enemyBeam() {
    const attackRoll = rollDice(20);
    let attackTotal = attackRoll.total + 5;
    if (gameState.enemy.nextAttackDisadvantage) {
        const secondRoll = rollDice(20);
        const secondTotal = secondRoll.total + 5;
        attackTotal = Math.min(attackTotal, secondTotal);
        gameState.enemy.nextAttackDisadvantage = false;
        addLogEntry(`Enemigo tiene desventaja: d20(${attackRoll.rolls[0]}) + 5 = ${attackRoll.total + 5} vs d20(${secondRoll.rolls[0]}) + 5 = ${secondTotal}. Resultado: ${attackTotal}`, "normal");
    } else {
        addLogEntry(`Rayo Psiónico: d20(${attackRoll.rolls[0]}) + 5 = ${attackTotal}`, "normal");
    }
    
    if (attackTotal >= gameState.player.ac) {
        const damageRoll = rollDice(10);
        const damage = damageRoll.total + 3;
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        addLogEntry(`Rayo Psiónico. ${getRandomNarrative("damageReceived")} d10(${damageRoll.rolls[0]}) + 3 = ${damage} de daño.`, "damage");
    } else {
        addLogEntry("El rayo psiónico falla.", "normal");
    }
    
    checkDefeat();
    updateUI();
}

function enemyDominate() {
    const distance = calculateDistance(gameState.player.position, gameState.enemy.position);
    if (distance > 5) {
        enemyMove();
        return;
    }
    
    const saveDC = 15;
    const saveRoll = rollDice(20);
    const saveTotal = saveRoll.total + 0; // CAR
    
    addLogEntry(getRandomNarrative("mindControl"), "normal");
    addLogEntry(`Dominación Mental: Tu salvación CAR d20(${saveRoll.rolls[0]}) + 0 = ${saveTotal} vs CD ${saveDC}`, "normal");
    
    if (saveTotal < saveDC) {
        if (!gameState.player.status.includes("charmed")) {
            gameState.player.status.push("charmed");
        }
        addLogEntry("¡Quedas encantado por el control mental!", "damage");
    } else {
        addLogEntry("Resistes la dominación mental.", "normal");
    }
    
    updateUI();
}

function enemyShield() {
    gameState.enemy.shieldActive = true;
    gameState.enemy.ac += 5;
    addLogEntry("El enemigo activa su Escudo Mental. CA aumentada.", "normal");
    updateUI();
}

function enemyMove() {
    const dx = gameState.player.position.x - gameState.enemy.position.x;
    const dy = gameState.player.position.y - gameState.enemy.position.y;
    
    let newX = gameState.enemy.position.x;
    let newY = gameState.enemy.position.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        newX += dx > 0 ? 1 : -1;
    } else {
        newY += dy > 0 ? 1 : -1;
    }
    
    // Mantener dentro de los límites
    newX = Math.max(0, Math.min(9, newX));
    newY = Math.max(0, Math.min(9, newY));
    
    gameState.enemy.position = { x: newX, y: newY };
    addLogEntry("El enemigo se mueve.", "normal");
    
    updateUI();
}

function endEnemyTurn() {
    gameState.isPlayerTurn = true;
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.movementRemaining = gameState.player.movement;
    
    // Procesar estados del jugador
    if (gameState.player.status.includes("stunned")) {
        gameState.player.status = gameState.player.status.filter(s => s !== "stunned");
        addLogEntry("Te recuperas del aturdimiento.", "normal");
    }
    
    addLogEntry("Es tu turno.", "narrative");
    updateUI();
}

// ==================== VERIFICACIÓN DE VICTORIA/DERROTA ====================
function checkVictory() {
    if (gameState.enemy.hp <= 0) {
        gameState.enemy.hp = 0;
        showVictory();
    }
}

function checkDefeat() {
    if (gameState.player.hp <= 0) {
        gameState.player.hp = 0;
        showDefeat();
    }
}

function showVictory() {
    addLogEntry(getRandomNarrative("victory"), "narrative");
    
    document.getElementById("victory-turns").textContent = gameState.combatStats.turnsUsed;
    document.getElementById("victory-damage-dealt").textContent = gameState.combatStats.damageDealt;
    document.getElementById("victory-damage-taken").textContent = gameState.combatStats.damageTaken;
    document.getElementById("victory-abilities").textContent = gameState.combatStats.abilitiesUsed;
    
    document.getElementById("victory-modal").classList.add("active");
}

function showDefeat() {
    addLogEntry(getRandomNarrative("defeat"), "narrative");
    
    document.getElementById("defeat-narrative").textContent = getRandomNarrative("defeat");
    document.getElementById("defeat-turns").textContent = gameState.combatStats.turnsUsed;
    document.getElementById("defeat-damage-dealt").textContent = gameState.combatStats.damageDealt;
    document.getElementById("defeat-damage-taken").textContent = gameState.combatStats.damageTaken;
    document.getElementById("defeat-abilities").textContent = gameState.combatStats.abilitiesUsed;
    
    document.getElementById("defeat-modal").classList.add("active");
}

function restartGame() {
    // Resetear estado del juego
    gameState.player.hp = 44;
    gameState.player.position = { x: 1, y: 8 };
    gameState.player.resources = {
        secondWind: 1,
        suddenAction: 1,
        superiorityDice: 4
    };
    gameState.player.status = [];
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.movementRemaining = 30;
    gameState.player.nextAttackBonus = 0;
    
    gameState.enemy.hp = 90;
    gameState.enemy.position = { x: 8, y: 1 };
    gameState.enemy.status = [];
    gameState.enemy.shieldActive = false;
    gameState.enemy.ac = 15;
    gameState.enemy.nextAttackDisadvantage = false;
    
    gameState.turn = 1;
    gameState.isPlayerTurn = true;
    gameState.movementEnabled = false;
    gameState.combatStats = {
        turnsUsed: 0,
        damageDealt: 0,
        damageTaken: 0,
        abilitiesUsed: 0
    };
    gameState.usedNarratives = {};
    
    // Ocultar modales
    document.getElementById("victory-modal").classList.remove("active");
    document.getElementById("defeat-modal").classList.remove("active");
    
    // Limpiar registro de combate
    document.getElementById("combat-log").innerHTML = '<div class="log-entry narrative">El combate comienza...</div>';
    
    // Reiniciar juego
    startGame();
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener("DOMContentLoaded", () => {
    generateGrid();
    updateUI();
});

// ==================== GENERACIÓN DE CUADRILLA ====================
function generateGrid() {
    const gridOverlay = document.getElementById("grid-overlay");
    if (!gridOverlay) return;
    
    gridOverlay.innerHTML = "";
    
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    
    // Celda vacía en la esquina superior izquierda
    const emptyCorner = document.createElement("div");
    emptyCorner.className = "grid-cell coordinate";
    gridOverlay.appendChild(emptyCorner);
    
    // Números 1-10 en la fila superior
    for (let i = 1; i <= 10; i++) {
        const numberCell = document.createElement("div");
        numberCell.className = "grid-cell coordinate";
        numberCell.textContent = i;
        gridOverlay.appendChild(numberCell);
    }
    
    // Filas con letras y celdas del tablero
    for (let y = 0; y < 10; y++) {
        // Letra en la columna izquierda
        const letterCell = document.createElement("div");
        letterCell.className = "grid-cell coordinate";
        letterCell.textContent = letters[y];
        gridOverlay.appendChild(letterCell);
        
        // Celdas del tablero
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.dataset.coordinate = `${letters[y]}${x + 1}`;
            cell.onclick = (e) => {
                e.stopPropagation();
                moveToCoordinateFromCell(x, y);
            };
            gridOverlay.appendChild(cell);
        }
    }
    
    // Actualizar posiciones de tokens después de generar la cuadrilla
    updateTokenPositions();
}

// ==================== FUNCIONES DE COORDENADAS ====================
function coordinateToPosition(coordinate) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const letter = coordinate.charAt(0).toUpperCase();
    const number = parseInt(coordinate.substring(1));
    
    const y = letters.indexOf(letter);
    const x = number - 1;
    
    if (y === -1 || x < 0 || x > 9) {
        return null;
    }
    
    return { x, y };
}

function positionToCoordinate(x, y) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    return `${letters[y]}${x + 1}`;
}

function calculateGridDistance(pos1, pos2) {
    // Distancia Manhattan (cada celda es 5 pies)
    const dx = Math.abs(pos1.x - pos2.x);
    const dy = Math.abs(pos1.y - pos2.y);
    return (dx + dy) * 5; // Cada celda es 5 pies
}

function moveToCoordinate() {
    const input = document.getElementById("coordinate-input");
    const coordinate = input.value.toUpperCase().trim();
    
    if (!coordinate) {
        addLogEntry("Por favor ingresa una coordenada (ej: A5).", "normal");
        return;
    }
    
    const targetPosition = coordinateToPosition(coordinate);
    if (!targetPosition) {
        addLogEntry("Coordenada inválida. Usa formato A-J seguido de 1-10 (ej: A5).", "normal");
        return;
    }
    
    const distance = calculateGridDistance(gameState.player.position, targetPosition);
    
    if (distance > gameState.player.movementRemaining) {
        addLogEntry(`No tienes suficiente movimiento. Necesitas ${distance} pies pero solo tienes ${gameState.player.movementRemaining} pies restantes.`, "normal");
        return;
    }
    
    gameState.player.position = targetPosition;
    gameState.player.movementRemaining -= distance;
    
    addLogEntry(`Te mueves a ${coordinate}. Distancia: ${distance} pies. Movimiento restante: ${gameState.player.movementRemaining} pies.`, "normal");
    
    input.value = "";
    updateUI();
}

function moveToCoordinateFromCell(x, y) {
    if (!gameState.isPlayerTurn || gameState.player.movementRemaining <= 0) {
        addLogEntry("No es tu turno o no tienes movimiento restante.", "normal");
        return;
    }
    
    // Verificar que no se coloque sobre el enemigo
    if (x === gameState.enemy.position.x && y === gameState.enemy.position.y) {
        addLogEntry("No puedes colocarte en la misma casilla que el enemigo.", "normal");
        return;
    }
    
    const targetPosition = { x, y };
    const distance = calculateGridDistance(gameState.player.position, targetPosition);
    
    if (distance > gameState.player.movementRemaining) {
        addLogEntry(`No tienes suficiente movimiento. Necesitas ${distance} pies pero solo tienes ${gameState.player.movementRemaining} pies restantes.`, "normal");
        return;
    }
    
    gameState.player.position = targetPosition;
    gameState.player.movementRemaining -= distance;
    
    const coordinate = positionToCoordinate(x, y);
    addLogEntry(`Te mueves a ${coordinate}. Distancia: ${distance} pies. Movimiento restante: ${gameState.player.movementRemaining} pies.`, "normal");
    
    updateUI();
}
