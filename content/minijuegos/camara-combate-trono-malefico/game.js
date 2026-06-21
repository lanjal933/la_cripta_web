// ==================== ESTADO DEL JUEGO ====================
const gameState = {
    player: {
        hp: 62,
        maxHp: 62,
        ac: 17,
        movement: 30,
        position: { x: 5, y: 8 },
        resources: {
            bloodCurses: 3,
            bloodAmplifications: 2
        },
        status: [],
        hasAction: true,
        hasAdditionalAction: true,
        movementRemaining: 30,
        isDodging: false,
        bloodCursedTarget: null,
        amplificationActive: false,
        hunterPrepared: false,
        selectedTarget: "thir" // "thir" or summon ID
    },
    thir: {
        hp: 120,
        maxHp: 120,
        ac: 16,
        movement: 30,
        position: { x: 5, y: 2 },
        status: [],
        crimsonRainCooldown: 0,
        hasSummonedThisTurn: false
    },
    summons: [],
    maxSummons: 2,
    turn: 1,
    isPlayerTurn: true,
    movementEnabled: false,
    combatStats: {
        turnsUsed: 0,
        damageDealt: 0,
        damageTaken: 0,
        summonsDefeated: 0
    }
};

// ==================== BANCOS DE NARRATIVA ====================
const narrativeBanks = {
    gameStart: [
        "Las sombras del Salón del Trono Carmesí se alargan mientras te adentras en la fortaleza abandonada.",
        "El eco de tus pasos resuena en las paredes de piedra oscura. Thir te espera.",
        "Velas arden con llamas carmesí, iluminando el trono donde la vampira descansa.",
        "El aire está cargado con el olor a sangre antigua y rosas negras marchitas.",
        "Tu espada bastarda pesa en tu mano. La caza de sangre está por comenzar.",
        "Los vitrales rotos dejan pasar luz lunar pálida sobre el suelo de piedra.",
        "Sientes la presencia de Thir antes de verla. Su poder es antiguo.",
        "El trono de mármol negro parece absorber la luz misma.",
        "Charcos de sangre seca manchan el suelo alrededor del trono.",
        "Thir se levanta de su trono, sus ojos brillando con luz carmesí.",
        "Las columnas góticas parecen susurrar secretos olvidados.",
        "Tu entrenamiento como Cazador de Sangre te prepara para este momento.",
        "La vampira sonríe, revelando colmillos afilados como cuchillos.",
        "El salón del trono ha visto muchas víctimas. Hoy podría ver una más.",
        "Tomas una decisión crucial: luchar o perecer.",
        "La magia oscura palpita en el aire, densa y opresiva.",
        "Thir la Vampira te observa con interés depredador.",
        "Tu corazón late con fuerza, pero tu mano permanece firme.",
        "El combate está por comenzar. No hay vuelta atrás.",
        "El destino de este salón depende de tu habilidad."
    ],
    thirEntrance: [
        "Thir la Vampira emerge de las sombras como una pesadilla hecha realidad.",
        "La noble maldita se levanta, su vestido de terciopelo carmesí fluyendo como sangre.",
        "Thir te mira con desdén, como si fueras una presa insignificante.",
        "La vampira ríe, un sonido que hace temblar las paredes del salón.",
        "Thir extiende sus manos, y las sombras parecen responder a su llamado.",
        "La presencia de Thir es abrumadora, siglos de poder concentrados.",
        "La vampira se mueve con gracia sobrenatural, casi flotando.",
        "Thir susurra palabras en un idioma antiguo y olvidado.",
        "Los ojos de Thir brillan con hambre eterna y poder maligno.",
        "La vampira se prepara para el combate, confiada en su superioridad.",
        "Thir sonríe, revelando una elegancia mortal.",
        "La noble maldita parece invulnerable, inmortal.",
        "Thir invoca su poder, y el aire se enfría dramáticamente.",
        "La vampira se yergue, imponente y terrible.",
        "Thir parece conocer cada uno de tus movimientos antes de que los hagas.",
        "La presencia de Thir es como un peso físico sobre tu alma.",
        "La vampira se prepara, sus garras listas para desgarrar.",
        "Thir ruge, un sonido que mezcla elegancia y salvajismo.",
        "La noble maldita está lista para defender su trono.",
        "Thir te desafía, segura de que caerás ante su poder."
    ],
    summon: [
        "Thir invoca a las criaturas de la noche para protegerla.",
        "Las sombras se condensan, tomando forma de bestias hambrientas.",
        "Un murciélago vampírico emerge de la oscuridad, chillando.",
        "Un siervo nocturno se materializa, sus ojos vacíos de humanidad.",
        "Una sombra hambrienta se desprende de las paredes, buscando sangre.",
        "Thir llama a sus sirvientes, y ellos responden obedientemente.",
        "Las criaturas de la noche acuden al llamado de su ama.",
        "El aire se llena con el aleteo de alas vampíricas.",
        "Un nuevo aliado se une a la defensa del trono.",
        "Thir sonríe mientras sus invocaciones rodean al intruso.",
        "Las sombras cobran vida, sirviendo a la voluntad de Thir.",
        "La vampira no lucha sola. Sus criaturas están aquí.",
        "Un chillido agudo resuena mientras la invocación aparece.",
        "La oscuridad se agita, y una bestia emerge.",
        "Thir refuerza su defensa con una nueva criatura.",
        "Las invocaciones se mueven con feroz lealtad a su ama.",
        "Un siervo de la noche se materializa, listo para el combate.",
        "Las criaturas de Thir buscan tu sangre con sed insaciable.",
        "La vampira expande sus fuerzas con una invocación más.",
        "El salón del trono se llena con presencias sobrenaturales."
    ],
    playerAttack: [
        "Tu espada bastarda corta el aire con precisión letal.",
        "El acero de tu arma brilla con luz sagrada mientras atacas.",
        "Giras con fuerza, tu espada buscando la carne de la vampira.",
        "Tu entrenamiento como Cazador de Sangre se manifiesta en cada golpe.",
        "El peso de tu espada es familiar, una extensión de tu brazo.",
        "Atacas con la ferocidad de un depredador cazando a su presa.",
        "Tu movimiento es fluido, calculado y devastador.",
        "La espada canta mientras corta hacia Thir.",
        "Tu ataque es rápido, aprovechando cualquier apertura.",
        "La fuerza de tu golpe hace temblar el aire.",
        "Tu espada busca el corazón de la vampira.",
        "Atacas con determinación, sin dudar ni un momento.",
        "El acero encuentra su objetivo con satisfactoria resistencia.",
        "Tu golpe es calculado, buscando debilitar a Thir.",
        "La espada de Tortoga es formidable, y tú la empuñas con maestría.",
        "Tu ataque es un recordatorio de por qué eres un Cazador de Sangre.",
        "El filo de tu arma busca la vulnerabilidad de la vampira.",
        "Giras y atacas, tu movimiento una danza de muerte.",
        "Tu espada corta con la fuerza de tu voluntad.",
        "El ataque conecta, y sientes el impacto a través del acero."
    ],
    thirAttack: [
        "Thir ataca con garras afiladas como cuchillos de obsidiana.",
        "La vampira se lanza hacia ti con velocidad sobrenatural.",
        "Las garras de Thir buscan tu carne con hambre antigua.",
        "Thir muerde, sus colmillos buscando tu garganta.",
        "La vampira ataca con elegancia mortal, cada movimiento calculado.",
        "Thir despliega su furia, sus garras cortando el aire.",
        "El ataque de Thir es rápido, casi imposible de seguir.",
        "La vampira combina fuerza y gracia en su asalto.",
        "Thir ruge mientras ataca, su poder desatado.",
        "Las garras de la vampira dejan marcas en tu armadura.",
        "Thir ataca con la ferocidad de un depredador milenario.",
        "La vampira se mueve como una sombra, atacando desde múltiples ángulos.",
        "El golpe de Thir es pesado, cargado con poder sobrenatural.",
        "Thir utiliza su velocidad para sorprenderte.",
        "La vampira ataca con precisión quirúrgica.",
        "Las garras de Thir buscan puntos vulnerables.",
        "Thir combina ataques físicos con magia oscura.",
        "La vampira es implacable en su ofensiva.",
        "Thir ataca con la confianza de quien ha vencido antes.",
        "El asalto de Thir es brutal y elegante."
    ],
    bite: [
        "Thir hunde sus colmillos en tu carne, drenando tu vitalidad.",
        "Sientes el dolor agudo de los colmillos vampíricos penetrando tu piel.",
        "La mordida de Thir es fría, como la muerte misma.",
        "Los colmillos de la vampira buscan tu sangre con sed insaciable.",
        "Thir muerde, y sientes tu fuerza siendo drenada.",
        "El impacto de la mordida hace que tu visión se nuble.",
        "Thir se alimenta de tu sangre, recuperando su propia vitalidad.",
        "Los colmillos de la vampira dejan marcas que no sanarán fácilmente.",
        "Sientes el frío de la mordida extendiéndose por tu cuerpo.",
        "Thir muerde con fuerza, su hambre evidente.",
        "La vampira se alimenta, y tú te debilitas.",
        "Los colmillos de Thir son armas mortales.",
        "La mordida es dolorosa, pero peor es la pérdida de fuerza.",
        "Thir sonríe mientras se alimenta de tu sangre.",
        "Sientes tu vida fluyendo hacia la vampira.",
        "Los colmillos de Thir buscan tu arteria principal.",
        "La mordida deja una herida que supura sangre oscura.",
        "Thir se fortalece mientras tú te debilitas.",
        "El dolor de la mordida es agudo y persistente.",
        "Thir muerde, y el mundo se oscurece momentáneamente."
    ],
    charm: [
        "Thir te mira a los ojos, y sientes tu voluntad debilitándose.",
        "El encanto vampírico se filtra en tu mente, nublando tus pensamientos.",
        "Los ojos de Thir brillan con hipnótico poder carmesí.",
        "Sientes una atracción irresistible hacia la vampira.",
        "Thir ejerce su influencia, y tu mente se nubla.",
        "El encanto de Thir es sutil pero abrumador.",
        "Tus pensamientos se vuelven confusos bajo el hechizo.",
        "Thir te susurra, y sus palabras parecen razonables.",
        "La influencia de Thir se extiende como una sombra.",
        "Sientes tu voluntad cediendo ante el poder de Thir.",
        "El encanto vampírico es antiguo y poderoso.",
        "Thir manipula tu mente con facilidad.",
        "Tus decisiones se vuelven dudosas bajo el encanto.",
        "Thir te mira, y sientes la necesidad de complacerla.",
        "El hechizo de Thir es como una neblina mental.",
        "La vampira ejerce control sobre tus acciones.",
        "Sientes tu resistencia desvaneciéndose.",
        "Thir utiliza su carisma como arma.",
        "El encanto te hace dudar de tu propósito.",
        "La influencia de Thir es difícil de resistir."
    ],
    teleport: [
        "Thir se desvanece en una nube de sombras, reapareciendo elsewhere.",
        "La vampira utiliza su Paso Sombrío para reubicarse.",
        "Thir se teletransporta, dejando una estela de oscuridad.",
        "La vampira desaparece y reaparece en un instante.",
        "Thir se mueve a través de las sombras, eludiendo tu alcance.",
        "El Paso Sombrío de Thir es rápido y confuso.",
        "La vampira se materializa detrás de ti, sorprendiéndote.",
        "Thir utiliza su poder para cambiar de posición estratégicamente.",
        "La teletransportación de Thir deja una estela de humo carmesí.",
        "Thir desaparece, y reaparece fuera de tu alcance.",
        "La vampira se mueve como una sombra, imposible de seguir.",
        "Thir utiliza su magia para reubicarse instantáneamente.",
        "El Paso Sombrío es una habilidad formidable de Thir.",
        "Thir se desplaza a través del espacio con facilidad sobrenatural.",
        "La vampira reaparece en una posición ventajosa.",
        "Thir utiliza su teletransportación para confundirte.",
        "La sombra de Thir se mueve más rápido que su cuerpo.",
        "Thir desaparece y reaparece, como un fantasma.",
        "El Paso Sombrío es elegante y mortal.",
        "Thir se reublica, y tú pierdes tu ventaja."
    ],
    bleeding: [
        "La herida sangra profusamente, manchando el suelo de carmesí.",
        "Sientes tu sangre fluyendo, debilitándote con cada gota.",
        "El sangrado es persistente, una pérdida constante de vitalidad.",
        "La herida supura sangre, una señal de daño grave.",
        "Sientes el frío de la pérdida de sangre extendiéndose.",
        "El sangrado te debilita, reduciendo tu capacidad de combate.",
        "Tu sangre mancha tu armadura, un recordatorio del daño.",
        "La herida no cierra, continuando su sangrado.",
        "Sientes tu fuerza disminuir con el flujo constante.",
        "El sangrado es una amenaza constante que debe ser atendida.",
        "La pérdida de sangre te hace sentir mareado.",
        "La herida supura, un flujo incesante de vitalidad.",
        "Sientes el peso de la pérdida de sangre.",
        "El sangrado reduce tu resistencia al combate.",
        "Tu sangre forma un charco a tus pies.",
        "La herida continúa sangrando, ignorando tu voluntad.",
        "Sientes el frío de la anemia extendiéndose.",
        "El sangrado es una herida que no sana fácilmente.",
        "Tu vitalidad se drena con cada momento.",
        "La pérdida de sangre es una carga constante."
    ],
    critical: [
        "¡GOLPE CRÍTICO! Tu espada atraviesa las defensas de Thir.",
        "¡CRÍTICO! El impacto es devastador, haciendo que Thir retroceda.",
        "¡IMPACTO PERFECTO! Tu ataque encuentra un punto vulnerable.",
        "¡GOLPE MORTAL! Thir grita de dolor ante el daño masivo.",
        "¡CRÍTICO! La fuerza de tu golpe es extraordinaria.",
        "¡IMPACTO ÉPICO! Thir no puede creer el daño recibido.",
        "¡GOLPE DESTROZADOR! La vampira es sacudida violentamente.",
        "¡CRÍTICO! Tu espada brilla con poder al impactar.",
        "¡GOLPE APLASTANTE! Thir casi cae ante el daño.",
        "¡IMPACTO LEGENDARIO! El daño es histórico.",
        "¡CRÍTICO! Thir sangra profusamente ante tu ataque.",
        "¡GOLPE TITÁNICO! El impacto resuena por todo el salón.",
        "¡CRÍTICO! Tu ataque es imparable.",
        "¡IMPACTO CATASTRÓFICO! El daño es brutal.",
        "¡GOLPE DIVINO! Tu arma parece bendecida.",
        "¡CRÍTICO! Thir es gravemente herida.",
        "¡IMPACTO SUPREMO! El daño es abrumador.",
        "¡GOLPE ABSOLUTO! Thir siente tu verdadero poder.",
        "¡CRÍTICO! La vampira es devastada.",
        "¡IMPACTO FINAL! El daño es definitivo."
    ],
    victory: [
        "¡Has derrotado a Thir la Vampira! El Salón del Trono Carmesí vuelve al silencio.",
        "Thir cae, su cuerpo desvaneciéndose en cenizas carmesí.",
        "Tu espada ha prevalecido. La caza ha terminado.",
        "La vampira yace derrotada a tus pies.",
        "Has demostrado tu valía como Cazador de Sangre.",
        "Thir reconoce tu superioridad antes de desvanecerse.",
        "El salón del trono está libre de su maldición.",
        "Tu fe y tu habilidad te han llevado a la victoria.",
        "Las sombras del salón se disipan con la muerte de Thir.",
        "Has escrito tu leyenda en este salón gótico.",
        "Thir la Vampira ha sido purgada de este mundo.",
        "Tu victoria es absoluta, completa y definitiva.",
        "El trono carmesí ahora está vacío, libre de mal.",
        "Has sobrevivido al encuentro con la noble maldita.",
        "Tu nombre será recordado en las crónicas de los cazadores.",
        "Thir cae, y su reinado de terror termina.",
        "La fortaleza abandona su maldición con tu victoria.",
        "Has vencido a un enemigo que ha perdurado siglos.",
        "El salón del trono celebra tu triunfo silencioso.",
        "Tu victoria sobre Thir es la leyenda de hoy."
    ],
    defeat: [
        "Thir reclama tu sangre como suya. Tu viaje termina aquí...",
        "La oscuridad te envuelve mientras Thir celebra su victoria.",
        "Tu sangre alimenta a la vampira por eternidad.",
        "Has caído ante Thir la Vampira.",
        "Thir se alza sobre tu cuerpo caído, sonriendo.",
        "Tu viaje termina en las fauces de la vampira.",
        "La noble maldita te ha derrotado.",
        "Tu sangre ahora pertenece a Thir.",
        "El salón del trono reclama otra víctima.",
        "Thir ríe mientras tu consciencia se desvanece.",
        "Has sido derrotado por la vampira milenaria.",
        "Tu resistencia se agota ante el poder de Thir.",
        "Thir te ha dominado completamente.",
        "Tu sangre fluye hacia la vampira eterna.",
        "Has caído, y Thir prevalece.",
        "La oscuridad reclama tu cuerpo.",
        "Thir ha ganado, y tú has perdido.",
        "Tu final ha llegado en el salón del trono.",
        "Thir la Vampira es la vencedora.",
        "Tu sangre es ahora suya para siempre."
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
    document.getElementById("blood-curses").textContent = `Maldiciones de Sangre (${gameState.player.resources.bloodCurses})`;
    document.getElementById("blood-curses").className = `resource-badge ${gameState.player.resources.bloodCurses === 0 ? "used" : ""}`;
    document.getElementById("blood-amplifications").textContent = `Amplificaciones (${gameState.player.resources.bloodAmplifications})`;
    document.getElementById("blood-amplifications").className = `resource-badge ${gameState.player.resources.bloodAmplifications === 0 ? "used" : ""}`;

    // Actualizar estados del jugador
    const statusContainer = document.getElementById("status-effects");
    if (gameState.player.status.length === 0) {
        statusContainer.innerHTML = '<span style="color: #9ca3af; font-style: italic;">Ningún estado activo</span>';
    } else {
        statusContainer.innerHTML = gameState.player.status.map(s => 
            `<span class="status-effect">${translateStatus(s)}</span>`
        ).join("");
    }

    // Actualizar PV de Thir
    const thirHpPercent = (gameState.thir.hp / gameState.thir.maxHp) * 100;
    document.getElementById("enemy-hp-fill").style.width = `${thirHpPercent}%`;
    document.getElementById("enemy-hp").textContent = gameState.thir.hp;
    document.getElementById("enemy-max-hp").textContent = gameState.thir.maxHp;

    // Actualizar estados de Thir
    const thirStatusDiv = document.getElementById("enemy-status");
    if (gameState.thir.status.length === 0) {
        thirStatusDiv.innerHTML = '<span style="color: #9ca3af; font-style: italic;">Ningún estado activo</span>';
    } else {
        thirStatusDiv.innerHTML = gameState.thir.status.map(s => 
            `<span class="status-effect">${translateStatus(s)}</span>`
        ).join("");
    }

    // Actualizar lista de invocaciones
    const summonsList = document.getElementById("summons-list");
    if (gameState.summons.length === 0) {
        summonsList.innerHTML = '<span style="color: #9ca3af; font-style: italic;">Ninguna invocación activa</span>';
    } else {
        summonsList.innerHTML = gameState.summons.map(s => 
            `<div class="summon-item" onclick="selectTarget('${s.id}')" style="cursor: pointer;">${s.name} - PV: ${s.hp}/${s.maxHp}</div>`
        ).join("");
    }

    // Actualizar objetivo seleccionado
    const selectedTargetDiv = document.getElementById("selected-target");
    if (gameState.player.selectedTarget === "thir") {
        selectedTargetDiv.innerHTML = '<span style="color: #a83232;">Thir la Vampira</span>';
    } else {
        const summon = gameState.summons.find(s => s.id === gameState.player.selectedTarget);
        if (summon && !summon.isDead) {
            selectedTargetDiv.innerHTML = `<span style="color: #b84040;">${summon.name}</span>`;
        } else {
            selectedTargetDiv.innerHTML = '<span style="color: #a83232;">Thir la Vampira</span>';
            gameState.player.selectedTarget = "thir";
        }
    }

    // Actualizar posiciones en el mapa
    updateTokenPositions();

    // Actualizar botones de acción
    updateActionButtons();
}

function translateStatus(status) {
    const translations = {
        "dodging": "Esquivando",
        "charmed": "Encantado",
        "frightened": "Asustado",
        "bleeding": "Sangrando",
        "weakened": "Debilitado",
        "cursed": "Maldito",
        "hidden": "Oculto",
        "poisoned": "Envenenado",
        "disengaged": "Retirado"
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
    
    // Actualizar token de Thir
    const thirToken = document.getElementById("thir-token");
    const thirX = 40 + (gameState.thir.position.x * cellWidth) + (cellWidth / 2) - 20;
    const thirY = 40 + (gameState.thir.position.y * cellHeight) + (cellHeight / 2) - 20;
    thirToken.style.left = `${thirX}px`;
    thirToken.style.top = `${thirY}px`;
    
    // Actualizar tokens de invocaciones
    const summon1Token = document.getElementById("summon1-token");
    const summon2Token = document.getElementById("summon2-token");
    
    if (gameState.summons.length >= 1 && !gameState.summons[0].isDead) {
        summon1Token.style.display = "flex";
        const summon1X = 40 + (gameState.summons[0].position.x * cellWidth) + (cellWidth / 2) - 20;
        const summon1Y = 40 + (gameState.summons[0].position.y * cellHeight) + (cellHeight / 2) - 20;
        summon1Token.style.left = `${summon1X}px`;
        summon1Token.style.top = `${summon1Y}px`;
        summon1Token.textContent = gameState.summons[0].name.charAt(0);
    } else {
        summon1Token.style.display = "none";
    }
    
    if (gameState.summons.length >= 2 && !gameState.summons[1].isDead) {
        summon2Token.style.display = "flex";
        const summon2X = 40 + (gameState.summons[1].position.x * cellWidth) + (cellWidth / 2) - 20;
        const summon2Y = 40 + (gameState.summons[1].position.y * cellHeight) + (cellHeight / 2) - 20;
        summon2Token.style.left = `${summon2X}px`;
        summon2Token.style.top = `${summon2Y}px`;
        summon2Token.textContent = gameState.summons[1].name.charAt(0);
    } else {
        summon2Token.style.display = "none";
    }
}

function updateActionButtons() {
    const buttons = document.querySelectorAll(".action-btn");
    buttons.forEach(btn => {
        btn.disabled = !gameState.isPlayerTurn;
    });

    // Botones específicos que requieren recursos
    document.getElementById("blood-curse").disabled = !gameState.isPlayerTurn || gameState.player.resources.bloodCurses === 0;
    document.getElementById("amplification").disabled = !gameState.isPlayerTurn || !gameState.player.hasAdditionalAction || gameState.player.resources.bloodAmplifications === 0;
    document.getElementById("change-target").disabled = !gameState.isPlayerTurn || !gameState.player.hasAdditionalAction;
    document.getElementById("hunter-prep").disabled = !gameState.isPlayerTurn || !gameState.player.hasAdditionalAction;

    document.getElementById("move-btn").disabled = !gameState.isPlayerTurn || gameState.player.movementRemaining <= 0;
    document.getElementById("end-turn-btn").disabled = !gameState.isPlayerTurn;
}

// ==================== FUNCIONES DE COMBATE ====================
function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "grid";
    
    gameState.usedNarratives = {};
    addLogEntry(getRandomNarrative("gameStart"), "narrative");
    addLogEntry(getRandomNarrative("thirEntrance"), "narrative");
    
    // Generar cuadrilla
    generateGrid();
    
    // Determinar iniciativa
    const playerInitiative = rollDice(20).total + 3; // +3 por atributos
    const thirInitiative = rollDice(20).total + 4; // +4 por Thir
    
    if (playerInitiative >= thirInitiative) {
        gameState.isPlayerTurn = true;
        addLogEntry("¡Ganas la iniciativa! Es tu turno.", "narrative");
    } else {
        gameState.isPlayerTurn = false;
        addLogEntry("Thir gana la iniciativa. Espera su turno.", "narrative");
        setTimeout(thirTurn, 1500);
    }
    
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

function handleCellClick(x, y) {
    if (gameState.movementEnabled && gameState.isPlayerTurn) {
        moveTo(x, y);
    }
}

function selectTarget(targetId) {
    if (!gameState.isPlayerTurn) return;
    
    if (targetId === "thir") {
        gameState.player.selectedTarget = "thir";
        addLogEntry("Objetivo seleccionado: Thir la Vampira.", "normal");
    } else {
        const summon = gameState.summons.find(s => s.id === targetId);
        if (summon && !summon.isDead) {
            gameState.player.selectedTarget = targetId;
            addLogEntry(`Objetivo seleccionado: ${summon.name}.`, "normal");
        } else {
            addLogEntry("Invocación no disponible como objetivo.", "normal");
            return;
        }
    }
    
    updateUI();
}

function swordAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    // Determinar objetivo
    let target;
    if (gameState.player.selectedTarget === "thir") {
        target = gameState.thir;
    } else {
        target = gameState.summons.find(s => s.id === gameState.player.selectedTarget);
    }
    
    if (!target) {
        addLogEntry("No hay objetivo válido seleccionado.", "normal");
        return;
    }
    
    const distance = calculateDistance(gameState.player.position, target.position);
    
    if (distance > 5) {
        addLogEntry(`${target.name || "Thir"} está demasiado lejos para el ataque cuerpo a cuerpo.`, "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    
    const attackRoll = rollDice(20);
    let attackTotal = attackRoll.total + 7; // +7 por FUE y proficiencia
    
    // Bonificación por amplificación
    if (gameState.player.amplificationActive) {
        attackTotal += 4;
        addLogEntry("Amplificación Carmesí: +4 al ataque.", "normal");
        gameState.player.amplificationActive = false;
    }
    
    // Bonificación por preparación de cazador
    if (gameState.player.hunterPrepared) {
        attackTotal += 3;
        addLogEntry("Preparación de Cazador: +3 al ataque.", "normal");
        gameState.player.hunterPrepared = false;
    }
    
    addLogEntry(`Ataque con Espada Bastarda contra ${target.name || "Thir"}: d20(${attackRoll.rolls[0]}) + 7 = ${attackTotal} vs CA ${target.ac}`, "normal");
    
    if (attackTotal >= target.ac) {
        let damageRoll = rollDice(10);
        let damage = damageRoll.total + 5; // 1d10 + 5 por FUE
        const isCritical = attackRoll.rolls[0] === 20;
        
        if (isCritical) {
            damage *= 2;
            target.hp -= damage;
            gameState.combatStats.damageDealt += damage;
            addLogEntry(`${getRandomNarrative("critical")} ¡${damage} de daño!`, "critical");
        } else {
            target.hp -= damage;
            gameState.combatStats.damageDealt += damage;
            addLogEntry(`${getRandomNarrative("playerAttack")} d10(${damageRoll.rolls[0]}) + 5 = ${damage} de daño.`, "normal");
        }
        
        // Verificar si la invocación murió
        if (target.id && target.id.startsWith("summon") && target.hp <= 0) {
            target.isDead = true;
            gameState.combatStats.summonsDefeated++;
            addLogEntry(`${target.name} ha sido derrotado.`, "narrative");
            gameState.player.selectedTarget = "thir"; // Reset to Thir
        }
        
        checkVictory();
    } else {
        addLogEntry("El ataque falla.", "normal");
    }
    
    updateUI();
}

function crossbowShot() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    // Determinar objetivo
    let target;
    if (gameState.player.selectedTarget === "thir") {
        target = gameState.thir;
    } else {
        target = gameState.summons.find(s => s.id === gameState.player.selectedTarget);
    }
    
    if (!target) {
        addLogEntry("No hay objetivo válido seleccionado.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    
    const attackRoll = rollDice(20);
    let attackTotal = attackRoll.total + 6; // +6 por DES y proficiencia
    
    // Bonificación por amplificación
    if (gameState.player.amplificationActive) {
        attackTotal += 4;
        addLogEntry("Amplificación Carmesí: +4 al ataque.", "normal");
        gameState.player.amplificationActive = false;
    }
    
    // Bonificación por preparación de cazador
    if (gameState.player.hunterPrepared) {
        attackTotal += 3;
        addLogEntry("Preparación de Cazador: +3 al ataque.", "normal");
        gameState.player.hunterPrepared = false;
    }
    
    addLogEntry(`Disparo de Ballesta contra ${target.name || "Thir"}: d20(${attackRoll.rolls[0]}) + 6 = ${attackTotal} vs CA ${target.ac}`, "normal");
    
    if (attackTotal >= target.ac) {
        const damageRoll = rollDice(6);
        const damage = damageRoll.total + 3; // 1d6 + 3 por DES
        const isCritical = attackRoll.rolls[0] === 20;
        
        if (isCritical) {
            target.hp -= damage * 2;
            gameState.combatStats.damageDealt += damage * 2;
            addLogEntry(`${getRandomNarrative("critical")} ¡${damage * 2} de daño!`, "critical");
        } else {
            target.hp -= damage;
            gameState.combatStats.damageDealt += damage;
            addLogEntry(`${getRandomNarrative("playerAttack")} d6(${damageRoll.rolls[0]}) + 3 = ${damage} de daño.`, "normal");
        }
        
        // Verificar si la invocación murió
        if (target.id && target.id.startsWith("summon") && target.hp <= 0) {
            target.isDead = true;
            gameState.combatStats.summonsDefeated++;
            addLogEntry(`${target.name} ha sido derrotado.`, "narrative");
            gameState.player.selectedTarget = "thir"; // Reset to Thir
        }
        
        checkVictory();
    } else {
        addLogEntry("El disparo falla.", "normal");
    }
    
    updateUI();
}

function bloodCurse() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.resources.bloodCurses === 0) {
        addLogEntry("No tienes Maldiciones de Sangre restantes.", "normal");
        return;
    }
    
    gameState.player.hasAction = false;
    gameState.player.resources.bloodCurses--;
    gameState.player.bloodCursedTarget = "thir";
    
    const damageRoll = rollDice(8);
    const damage = damageRoll.total + 4; // 1d8 + 4
    
    gameState.thir.hp -= damage;
    gameState.combatStats.damageDealt += damage;
    
    // Aplicar estado sangrado
    if (!gameState.thir.status.includes("bleeding")) {
        gameState.thir.status.push("bleeding");
    }
    
    addLogEntry(`Maldición de Sangre: d8(${damageRoll.rolls[0]}) + 4 = ${damage} de daño. Thir comienza a sangrar.`, "normal");
    
    checkVictory();
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
    gameState.player.status.push("disengaged");
    
    // Moverse lejos de Thir
    const dx = gameState.player.position.x - gameState.thir.position.x;
    const dy = gameState.player.position.y - gameState.thir.position.y;
    
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
    
    updateUI();
}

function dashAction() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    gameState.player.hasAction = false;
    gameState.player.movementRemaining += gameState.player.movement;
    
    addLogEntry("Aumentas tu velocidad. Movimiento duplicado.", "normal");
    updateUI();
}

function bloodAmplification() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction) return;
    if (gameState.player.resources.bloodAmplifications === 0) {
        addLogEntry("No tienes Amplificaciones restantes.", "normal");
        return;
    }
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.resources.bloodAmplifications--;
    gameState.player.amplificationActive = true;
    
    addLogEntry("Activas Amplificación Carmesí. +4 a tu próximo ataque.", "normal");
    updateUI();
}

function changeTarget() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction) return;
    
    gameState.player.hasAdditionalAction = false;
    
    if (gameState.summons.length > 0) {
        gameState.player.bloodCursedTarget = gameState.summons[0].id;
        addLogEntry("Cambias el objetivo de tu Maldición de Sangre a una invocación.", "normal");
    } else {
        addLogEntry("No hay invocaciones activas para cambiar el objetivo.", "normal");
    }
    
    updateUI();
}

function hunterPreparation() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction) return;
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.hunterPrepared = true;
    
    addLogEntry("Te preparas como un cazador. +3 a tu próximo ataque.", "normal");
    updateUI();
}

function opportunityAttack() {
    if (!gameState.isPlayerTurn) return;
    
    const attackRoll = rollDice(20);
    const attackTotal = attackRoll.total + 7;
    
    addLogEntry(`Ataque de Oportunidad: d20(${attackRoll.rolls[0]}) + 7 = ${attackTotal} vs CA ${gameState.thir.ac}`, "normal");
    
    if (attackTotal >= gameState.thir.ac) {
        const damageRoll = rollDice(10);
        const damage = damageRoll.total + 5;
        gameState.thir.hp -= damage;
        gameState.combatStats.damageDealt += damage;
        addLogEntry(`${getRandomNarrative("playerAttack")} d10(${damageRoll.rolls[0]}) + 5 = ${damage} de daño.`, "normal");
        
        checkVictory();
    } else {
        addLogEntry("El ataque de oportunidad falla.", "normal");
    }
    
    updateUI();
}

function instinctiveCounter() {
    if (!gameState.isPlayerTurn) return;
    
    const attackRoll = rollDice(20);
    const attackTotal = attackRoll.total + 7;
    
    addLogEntry(`Contraataque Instintivo: d20(${attackRoll.rolls[0]}) + 7 = ${attackTotal} vs CA ${gameState.thir.ac}`, "normal");
    
    if (attackTotal >= gameState.thir.ac) {
        const damageRoll = rollDice(10);
        const damage = damageRoll.total + 5;
        gameState.thir.hp -= damage;
        gameState.combatStats.damageDealt += damage;
        addLogEntry(`${getRandomNarrative("playerAttack")} d10(${damageRoll.rolls[0]}) + 5 = ${damage} de daño.`, "normal");
        
        checkVictory();
    } else {
        addLogEntry("El contraataque falla.", "normal");
    }
    
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
    
    // Convertir pies a celdas (5 pies por celda)
    const maxCells = Math.floor(gameState.player.movementRemaining / 5);
    
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const distance = calculateGridDistance(gameState.player.position, { x, y });
            if (distance <= maxCells) {
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
    if (x === gameState.thir.position.x && y === gameState.thir.position.y) {
        addLogEntry("No puedes colocarte en la misma casilla que Thir.", "normal");
        return;
    }
    
    // Verificar colisión con invocaciones
    for (const summon of gameState.summons) {
        if (x === summon.position.x && y === summon.position.y) {
            addLogEntry("No puedes colocarte en la misma casilla que una invocación.", "normal");
            return;
        }
    }
    
    const distance = calculateGridDistance(gameState.player.position, { x, y });
    const maxCells = Math.floor(gameState.player.movementRemaining / 5);
    
    if (distance > maxCells) {
        addLogEntry(`Distancia excede el movimiento disponible. Máximo: ${maxCells} celdas (${maxCells * 5} pies).`, "normal");
        return;
    }
    
    gameState.player.position = { x, y };
    gameState.player.movementRemaining -= distance * 5; // Convertir celdas a pies
    gameState.movementEnabled = false;
    
    clearHighlights();
    document.getElementById("grid-overlay").style.pointerEvents = "none";
    
    const coordinate = positionToCoordinate(x, y);
    addLogEntry(`Te mueves a ${coordinate}. Distancia: ${distance} celdas (${distance * 5} pies). Movimiento restante: ${gameState.player.movementRemaining} pies.`, "normal");
    
    updateUI();
}

function positionToCoordinate(x, y) {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    return `${letters[x]}${y + 1}`;
}

function endTurn() {
    if (!gameState.isPlayerTurn) return;
    
    gameState.isPlayerTurn = false;
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.movementRemaining = gameState.player.movement;
    gameState.movementEnabled = false;
    
    // Procesar estados del jugador
    if (gameState.player.status.includes("dodging")) {
        gameState.player.status = gameState.player.status.filter(s => s !== "dodging");
        gameState.player.isDodging = false;
    }
    
    if (gameState.player.status.includes("disengaged")) {
        gameState.player.status = gameState.player.status.filter(s => s !== "disengaged");
    }
    
    // Procesar sangrado del jugador
    if (gameState.player.status.includes("bleeding")) {
        const bleedDamage = rollDice(4).total;
        gameState.player.hp -= bleedDamage;
        gameState.combatStats.damageTaken += bleedDamage;
        addLogEntry(`Sangrado: ${bleedDamage} de daño.`, "damage");
        
        if (gameState.player.hp <= 0) {
            checkDefeat();
            return;
        }
    }
    
    clearHighlights();
    document.getElementById("grid-overlay").style.pointerEvents = "none";
    
    addLogEntry("Finalizas tu turno.", "normal");
    
    gameState.turn++;
    gameState.combatStats.turnsUsed++;
    
    setTimeout(thirTurn, 1500);
    updateUI();
}

// ==================== IA DE THIR ====================
function thirTurn() {
    addLogEntry(getRandomNarrative("thirEntrance"), "narrative");
    
    // Procesar estados de Thir
    if (gameState.thir.status.includes("bleeding")) {
        const bleedDamage = rollDice(4).total;
        gameState.thir.hp -= bleedDamage;
        addLogEntry(`Thir sangra: ${bleedDamage} de daño.`, "damage");
        
        if (gameState.thir.hp <= 0) {
            checkVictory();
            return;
        }
    }
    
    // Reducir cooldown de Lluvia Carmesí
    if (gameState.thir.crimsonRainCooldown > 0) {
        gameState.thir.crimsonRainCooldown--;
    }
    
    gameState.thir.hasSummonedThisTurn = false;
    
    // Decidir acción de Thir
    const thirAction = decideThirAction();
    executeThirAction(thirAction);
    
    // Actuar invocaciones
    setTimeout(() => {
        gameState.summons.forEach((summon, index) => {
            setTimeout(() => {
                if (!summon.isDead) {
                    const summonAction = decideSummonAction(summon);
                    executeSummonAction(summon, summonAction);
                }
            }, index * 800);
        });
        
        // Finalizar turno de Thir
        setTimeout(endThirTurn, gameState.summons.length * 800 + 500);
    }, 1000);
}

function decideThirAction() {
    const distance = calculateDistance(gameState.player.position, gameState.thir.position);
    const hpPercent = gameState.thir.hp / gameState.thir.maxHp;
    const summonCount = gameState.summons.filter(s => !s.isDead).length;
    
    const actions = [];
    
    // Prioridad 1: Invocar si está sola
    if (summonCount < gameState.maxSummons && !gameState.thir.hasSummonedThisTurn) {
        actions.push({ name: "summon", weight: 0.8 });
    }
    
    // Prioridad 2: Encanto Vampírico si el jugador está sano
    if (distance <= 10 && hpPercent > 0.5 && !gameState.player.status.includes("charmed")) {
        actions.push({ name: "charm", weight: 0.7 });
    }
    
    // Prioridad 3: Mordida Vampírica si tiene poca vida
    if (distance <= 5 && hpPercent < 0.3) {
        actions.push({ name: "bite", weight: 0.9 });
    }
    
    // Prioridad 4: Paso Sombrío si está rodeada
    if (distance <= 5 && summonCount >= 1) {
        actions.push({ name: "teleport", weight: 0.6 });
    }
    
    // Prioridad 5: Lluvia Carmesí cuando esté disponible
    if (gameState.thir.crimsonRainCooldown === 0) {
        actions.push({ name: "crimsonRain", weight: 0.8 });
    }
    
    // Prioridad 6: Garras Sangrientas como acción principal
    if (distance <= 5) {
        actions.push({ name: "claws", weight: 0.7 });
    }
    
    // Prioridad 7: Acercarse si está lejos
    if (distance > 5) {
        actions.push({ name: "move", weight: 0.5 });
    }
    
    // Si no hay acciones específicas, usar garras
    if (actions.length === 0) {
        actions.push({ name: "claws", weight: 1.0 });
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

function executeThirAction(action) {
    switch (action) {
        case "summon":
            thirSummon();
            break;
        case "charm":
            thirCharm();
            break;
        case "bite":
            thirBite();
            break;
        case "teleport":
            thirTeleport();
            break;
        case "crimsonRain":
            thirCrimsonRain();
            break;
        case "claws":
            thirClaws();
            break;
        case "move":
            thirMove();
            break;
    }
}

function thirSummon() {
    if (gameState.summons.filter(s => !s.isDead).length >= gameState.maxSummons) {
        addLogEntry("Thir ya tiene el máximo de invocaciones activas.", "normal");
        return;
    }
    
    const summonTypes = [
        { name: "Murciélago Vampírico", hp: 15, maxHp: 15, ac: 12, damage: "1d6+2" },
        { name: "Siervo Nocturno", hp: 25, maxHp: 25, ac: 14, damage: "1d8+3" },
        { name: "Sombra Hambrienta", hp: 20, maxHp: 20, ac: 13, damage: "1d6+1" }
    ];
    
    const summonType = summonTypes[Math.floor(Math.random() * summonTypes.length)];
    
    // Posicionar cerca de Thir
    const positions = [
        { x: gameState.thir.position.x - 1, y: gameState.thir.position.y },
        { x: gameState.thir.position.x + 1, y: gameState.thir.position.y },
        { x: gameState.thir.position.x, y: gameState.thir.position.y - 1 },
        { x: gameState.thir.position.x, y: gameState.thir.position.y + 1 }
    ];
    
    let validPosition = positions.find(pos => 
        pos.x >= 0 && pos.x <= 9 && pos.y >= 0 && pos.y <= 9 &&
        !(pos.x === gameState.player.position.x && pos.y === gameState.player.position.y) &&
        !gameState.summons.some(s => s.position.x === pos.x && s.position.y === pos.y)
    );
    
    if (!validPosition) {
        validPosition = { x: gameState.thir.position.x, y: gameState.thir.position.y };
    }
    
    const newSummon = {
        id: `summon${gameState.summons.length + 1}`,
        name: summonType.name,
        hp: summonType.hp,
        maxHp: summonType.maxHp,
        ac: summonType.ac,
        damage: summonType.damage,
        position: validPosition,
        isDead: false
    };
    
    gameState.summons.push(newSummon);
    gameState.thir.hasSummonedThisTurn = true;
    
    addLogEntry(`${getRandomNarrative("summon")} ${summonType.name} aparece (${summonType.hp} PV, CA ${summonType.ac}).`, "normal");
    
    updateUI();
}

function thirCharm() {
    const saveRoll = rollDice(20);
    const saveTotal = saveRoll.total + 3; // +3 por SAB
    
    addLogEntry(`Encanto Vampírico: Tirada de salvación SAB d20(${saveRoll.rolls[0]}) + 3 = ${saveTotal} vs CD 14`, "normal");
    
    if (saveTotal < 14) {
        gameState.player.status.push("charmed");
        addLogEntry(`${getRandomNarrative("charm")} ¡Estás encantado!`, "damage");
    } else {
        addLogEntry("Resistes el encanto vampírico.", "normal");
    }
}

function thirBite() {
    const attackRoll = rollDice(20);
    const attackTotal = attackRoll.total + 8; // +8 por Thir
    
    // Desventaja si el jugador está esquivando
    let finalAttackTotal = attackTotal;
    if (gameState.player.isDodging) {
        const disadvantageRoll = rollDice(20);
        finalAttackTotal = Math.min(attackTotal, disadvantageRoll.total + 8);
        addLogEntry(`Desventaja por esquivar: d20(${disadvantageRoll.rolls[0]}) + 8 = ${disadvantageRoll.total + 8}`, "normal");
    }
    
    addLogEntry(`Mordida Vampírica: d20(${attackRoll.rolls[0]}) + 8 = ${finalAttackTotal} vs CA ${gameState.player.ac}`, "normal");
    
    if (finalAttackTotal >= gameState.player.ac) {
        const damageRoll = rollDice(8);
        const damage = damageRoll.total + 4;
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        
        // Thir recupera HP
        const healAmount = Math.min(damage, gameState.thir.maxHp - gameState.thir.hp);
        gameState.thir.hp += healAmount;
        
        addLogEntry(`${getRandomNarrative("bite")} d8(${damageRoll.rolls[0]}) + 4 = ${damage} de daño. Thir recupera ${healAmount} PV.`, "damage");
        
        if (!gameState.player.status.includes("bleeding")) {
            gameState.player.status.push("bleeding");
        }
        
        checkDefeat();
    } else {
        addLogEntry("La mordida falla.", "normal");
    }
}

function thirTeleport() {
    // Teletransportarse a una posición aleatoria lejos del jugador
    const possiblePositions = [];
    
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const distance = calculateDistance({ x, y }, gameState.player.position);
            if (distance >= 15 && distance <= 30) {
                possiblePositions.push({ x, y });
            }
        }
    }
    
    if (possiblePositions.length > 0) {
        const newPos = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
        gameState.thir.position = newPos;
        addLogEntry(`${getRandomNarrative("teleport")} Thir se teletransporta a ${positionToCoordinate(newPos.x, newPos.y)}.`, "normal");
    } else {
        addLogEntry("Thir intenta teletransportarse pero no encuentra una posición adecuada.", "normal");
    }
}

function thirCrimsonRain() {
    gameState.thir.crimsonRainCooldown = 3; // 3 turnos de cooldown
    
    const damageRoll = rollDice(10);
    const damage = damageRoll.total * 3; // 3d10
    gameState.player.hp -= damage;
    gameState.combatStats.damageTaken += damage;
    
    addLogEntry(`¡Lluvia Carmesí! 3d10 = ${damage} de daño devastador.`, "critical");
    
    if (!gameState.player.status.includes("bleeding")) {
        gameState.player.status.push("bleeding");
    }
    
    checkDefeat();
}

function thirClaws() {
    const attackRoll = rollDice(20);
    const attackTotal = attackRoll.total + 7; // +7 por Thir
    
    // Desventaja si el jugador está esquivando
    let finalAttackTotal = attackTotal;
    if (gameState.player.isDodging) {
        const disadvantageRoll = rollDice(20);
        finalAttackTotal = Math.min(attackTotal, disadvantageRoll.total + 7);
        addLogEntry(`Desventaja por esquivar: d20(${disadvantageRoll.rolls[0]}) + 7 = ${disadvantageRoll.total + 7}`, "normal");
    }
    
    addLogEntry(`Garras Sangrientas: d20(${attackRoll.rolls[0]}) + 7 = ${finalAttackTotal} vs CA ${gameState.player.ac}`, "normal");
    
    if (finalAttackTotal >= gameState.player.ac) {
        const damageRoll = rollDice(6);
        const damage = damageRoll.total + 3;
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        
        addLogEntry(`${getRandomNarrative("thirAttack")} d6(${damageRoll.rolls[0]}) + 3 = ${damage} de daño.`, "damage");
        
        checkDefeat();
    } else {
        addLogEntry("Las garras fallan.", "normal");
    }
}

function thirMove() {
    const distance = calculateDistance(gameState.thir.position, gameState.player.position);
    
    if (distance > 5) {
        // Acercarse al jugador
        const dx = gameState.player.position.x - gameState.thir.position.x;
        const dy = gameState.player.position.y - gameState.thir.position.y;
        
        let newX = gameState.thir.position.x;
        let newY = gameState.thir.position.y;
        
        const moveDistance = Math.min(6, Math.floor(distance / 5));
        
        if (Math.abs(dx) > Math.abs(dy)) {
            newX += dx > 0 ? moveDistance : -moveDistance;
        } else {
            newY += dy > 0 ? moveDistance : -moveDistance;
        }
        
        newX = Math.max(0, Math.min(9, newX));
        newY = Math.max(0, Math.min(9, newY));
        
        // Verificar que Thir no se posicione sobre el jugador
        if (newX === gameState.player.position.x && newY === gameState.player.position.y) {
            // Intentar posición alternativa
            if (Math.abs(dx) > Math.abs(dy)) {
                newX = gameState.thir.position.x + (dx > 0 ? moveDistance - 1 : -moveDistance + 1);
            } else {
                newY = gameState.thir.position.y + (dy > 0 ? moveDistance - 1 : -moveDistance + 1);
            }
            newX = Math.max(0, Math.min(9, newX));
            newY = Math.max(0, Math.min(9, newY));
        }
        
        gameState.thir.position = { x: newX, y: newY };
        
        addLogEntry(`Thir se mueve hacia ${positionToCoordinate(newX, newY)}.`, "normal");
    }
}

function decideSummonAction(summon) {
    const distance = calculateDistance(summon.position, gameState.player.position);
    
    if (distance <= 5) {
        return "attack";
    } else {
        return "move";
    }
}

function executeSummonAction(summon, action) {
    switch (action) {
        case "attack":
            summonAttack(summon);
            break;
        case "move":
            summonMove(summon);
            break;
    }
}

function summonAttack(summon) {
    const attackRoll = rollDice(20);
    const attackTotal = attackRoll.total + 4; // +4 por invocación
    
    // Desventaja si el jugador está esquivando
    let finalAttackTotal = attackTotal;
    if (gameState.player.isDodging) {
        const disadvantageRoll = rollDice(20);
        finalAttackTotal = Math.min(attackTotal, disadvantageRoll.total + 4);
    }
    
    addLogEntry(`${summon.name} ataca: d20(${attackRoll.rolls[0]}) + 4 = ${finalAttackTotal} vs CA ${gameState.player.ac}`, "normal");
    
    if (finalAttackTotal >= gameState.player.ac) {
        const damageRoll = rollDice(6);
        const damage = damageRoll.total + 2;
        gameState.player.hp -= damage;
        gameState.combatStats.damageTaken += damage;
        
        addLogEntry(`${summon.name} causa d6(${damageRoll.rolls[0]}) + 2 = ${damage} de daño.`, "damage");
        
        checkDefeat();
    } else {
        addLogEntry(`${summon.name} falla su ataque.`, "normal");
    }
}

function summonMove(summon) {
    const distance = calculateDistance(summon.position, gameState.player.position);
    
    if (distance > 5) {
        const dx = gameState.player.position.x - summon.position.x;
        const dy = gameState.player.position.y - summon.position.y;
        
        let newX = summon.position.x;
        let newY = summon.position.y;
        
        const moveDistance = Math.min(6, Math.floor(distance / 5));
        
        if (Math.abs(dx) > Math.abs(dy)) {
            newX += dx > 0 ? moveDistance : -moveDistance;
        } else {
            newY += dy > 0 ? moveDistance : -moveDistance;
        }
        
        newX = Math.max(0, Math.min(9, newX));
        newY = Math.max(0, Math.min(9, newY));
        
        summon.position = { x: newX, y: newY };
        
        addLogEntry(`${summon.name} se mueve hacia ${positionToCoordinate(newX, newY)}.`, "normal");
    }
}

function endThirTurn() {
    // Procesar estados de Thir
    if (gameState.thir.status.includes("charmed")) {
        gameState.thir.status = gameState.thir.status.filter(s => s !== "charmed");
    }
    
    addLogEntry("Thir finaliza su turno.", "normal");
    
    gameState.isPlayerTurn = true;
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.movementRemaining = gameState.player.movement;
    
    updateUI();
}

// ==================== CONDICIONES DE VICTORIA Y DERROTA ====================
function checkVictory() {
    if (gameState.thir.hp <= 0) {
        gameState.thir.hp = 0;
        
        document.getElementById("victory-turns").textContent = gameState.combatStats.turnsUsed;
        document.getElementById("victory-damage-dealt").textContent = gameState.combatStats.damageDealt;
        document.getElementById("victory-damage-taken").textContent = gameState.combatStats.damageTaken;
        document.getElementById("victory-summons").textContent = gameState.combatStats.summonsDefeated;
        
        addLogEntry(getRandomNarrative("victory"), "narrative");
        
        setTimeout(() => {
            document.getElementById("victory-modal").classList.add("active");
        }, 1000);
    }
}

function checkDefeat() {
    if (gameState.player.hp <= 0) {
        gameState.player.hp = 0;
        
        document.getElementById("defeat-turns").textContent = gameState.combatStats.turnsUsed;
        document.getElementById("defeat-damage-dealt").textContent = gameState.combatStats.damageDealt;
        document.getElementById("defeat-damage-taken").textContent = gameState.combatStats.damageTaken;
        document.getElementById("defeat-summons").textContent = gameState.combatStats.summonsDefeated;
        
        addLogEntry(getRandomNarrative("defeat"), "narrative");
        
        setTimeout(() => {
            document.getElementById("defeat-modal").classList.add("active");
        }, 1000);
    }
}

function restartGame() {
    // Reiniciar estado del juego
    gameState.player.hp = 62;
    gameState.player.maxHp = 62;
    gameState.player.ac = 17;
    gameState.player.movement = 30;
    gameState.player.position = { x: 5, y: 8 };
    gameState.player.resources.bloodCurses = 3;
    gameState.player.resources.bloodAmplifications = 2;
    gameState.player.status = [];
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.movementRemaining = 30;
    gameState.player.isDodging = false;
    gameState.player.bloodCursedTarget = null;
    gameState.player.amplificationActive = false;
    gameState.player.hunterPrepared = false;
    gameState.player.selectedTarget = "thir";
    
    gameState.thir.hp = 120;
    gameState.thir.maxHp = 120;
    gameState.thir.ac = 16;
    gameState.thir.movement = 35;
    gameState.thir.position = { x: 5, y: 2 };
    gameState.thir.status = [];
    gameState.thir.crimsonRainCooldown = 0;
    gameState.thir.hasSummonedThisTurn = false;
    
    gameState.summons = [];
    gameState.turn = 1;
    gameState.isPlayerTurn = true;
    gameState.movementEnabled = false;
    gameState.combatStats.turnsUsed = 0;
    gameState.combatStats.damageDealt = 0;
    gameState.combatStats.damageTaken = 0;
    gameState.combatStats.summonsDefeated = 0;
    
    // Ocultar modales
    document.getElementById("victory-modal").classList.remove("active");
    document.getElementById("defeat-modal").classList.remove("active");
    
    // Mostrar pantalla de inicio
    document.getElementById("game-container").style.display = "none";
    document.getElementById("start-screen").style.display = "flex";
    
    // Limpiar registro de combate
    document.getElementById("combat-log").innerHTML = '<div class="log-entry narrative">El combate comienza...</div>';
}
