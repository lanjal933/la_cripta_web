// ============================================================================
// CÁMARA DE COMBATE: LA CATEDRAL DE LAS CENIZAS
// Juego de combate táctico narrativo contra jefe
// ============================================================================

// ============================================================================
// ESTADO DEL JUEGO
// ============================================================================

const gameState = {
    // Personaje Jugador: Clérigo Enano del Dominio de la Vida nivel 7
    player: {
        hp: 61,
        maxHp: 61,
        baseAc: 18,
        ac: 18,
        movement: 25, // pies
        position: { x: 5, y: 8 },
        spellSlots: {
            level1: 4,
            level2: 3,
            level3: 3
        },
        channelDivinity: 2,
        status: [],
        hasAction: true,
        hasAdditionalAction: true,
        hasReaction: true,
        movementRemaining: 7.5,
        isDodging: false,
        concentration: null,
        blessedTargets: [],
        spiritualWeaponActive: false,
        spiritualWeaponDamage: 0,
        spiritGuardiansActive: false,
        beaconOfHopeActive: false,
        defensivePrayerActive: false,
        lastHealed: 0,
        damageTakenThisTurn: 0
    },
    
    // Jefe: El Obispo de Ceniza
    boss: {
        name: "El Obispo de Ceniza",
        hp: 145,
        maxHp: 145,
        baseAc: 17,
        ac: 17,
        movement: 30, // pies
        position: { x: 5, y: 2 },
        phase: 1,
        phase2Threshold: 58, // 40% de 145
        abilities: {
            maceOfEmbers: { cooldown: 0, maxCooldown: 0 },
            purifyingFlame: { cooldown: 0, maxCooldown: 1 },
            ashExplosion: { cooldown: 0, maxCooldown: 2 },
            chainOfPenance: { cooldown: 0, maxCooldown: 3 },
            judgmentOfHeretic: { cooldown: 0, maxCooldown: 4 },
            // Fase 2
            emberStorm: { cooldown: 0, maxCooldown: 2 },
            sacredColumns: { cooldown: 0, maxCooldown: 3 },
            ashBreath: { cooldown: 0, maxCooldown: 2 },
            martyrWrath: { cooldown: 0, maxCooldown: 4 }
        },
        status: [],
        lastAttack: null
    },
    
    // Estado del juego
    selectedTarget: 'boss',
    turn: 1,
    isPlayerTurn: true,
    movementEnabled: false,
    combatStats: {
        turnsUsed: 0,
        damageDealt: 0,
        damageTaken: 0,
        spellsCast: 0,
        channelDivinityUsed: 0
    },
    gameStarted: false,
    gameOver: false
};

// ============================================================================
// BANCOS NARRATIVOS
// ============================================================================

const narrativeBanks = {
    gameStart: [
        "La ceniza flota en el aire como niebla gris mientras entras a la nave principal de la catedral.",
        "Las vidrieras rotas dejan pasar luz dorada mezclada con sombras danzantes.",
        "El calor es palpable, pero no quema la piel—quema el alma.",
        "El Obispo de Ceniza emerge del altar, su forma fluctuando entre carne y llama.",
        "Las llamas eternas rugen en respuesta a tu presencia sagrada.",
        "El suelo cruje bajo tus pies, cubierto de ceniza acumulada durante siglos.",
        "Las estatuas de santos caídos observan en silencio desde sus pedestales rotos.",
        "El aire huele a azufre y a algo más antiguo, más profundo.",
        "Tu fe es tu escudo contra el fuego que consume este lugar.",
        "El Obispo sonríe, un gesto que no alcanza sus ojos de brasa.",
        "Las llamas se agitan como si fueran conscientes de tu llegada.",
        "La catedral susurra con ecos de oraciones olvidadas.",
        "El Obispo alza su maza de brasa, listo para defender su templo profanado.",
        "Sientes el peso de siglos de corrupción en cada paso.",
        "La luz sagrada de tu símbolo divino brilla débilmente contra la oscuridad.",
        "El Obispo habla en lenguas de fuego y ceniza.",
        "Las braseros encendidos a lo largo de la nave parecen observarte.",
        "Tu corazón late al ritmo de las llamas que rodean el altar.",
        "El Obispo es una aberración de fe y fuego.",
        "La catedral espera ser purificada o consumida."
    ],
    
    bossEntrance: [
        "El Obispo de Ceniza se levanta del altar, su cuerpo ardiendo con llama sagrada corrompida.",
        "Una voz resuena desde las llamas: 'Hereje, tu fe no puede salvar este lugar'.",
        "El Obispo extiende sus manos, y las cenizas se arremolinan a su alrededor.",
        "'He servido a la llama eterna por siglos. ¿Quién eres tú para desafiarla?'",
        "El Obispo emerge de las sombras, su maza goteando lava.",
        "Las llamas responden a su presencia, creciendo en intensidad.",
        "'Esta catedral es mía. Tu fe es irrelevante ante el poder eterno'.",
        "El Obispo sonríe con dientes de carbón brillante.",
        "Su voz es el crujido de madera quemada y el rugido del fuego.",
        "El Obispo alza su maza, y las llamas forman una corona alrededor de su cabeza.",
        "'La llama consume todo. Incluso a los que se creen justos'.",
        "El Obispo camina hacia ti, dejando huellas de ceniza ardiente.",
        "Sus ojos son pozos de fuego sin fondo.",
        "El Obispo ríe, un sonido como leña crepitando.",
        "'Tu dios no puede oírte aquí. Solo la llama eterna escucha'.",
        "El Obispo se transforma momentáneamente en puro fuego antes de solidificarse.",
        "Las cenizas se levantan, formando una aura alrededor del Obispo.",
        "'Vienes a purificar? Yo soy la purificación'.",
        "El Obispo extiende sus brazos, abrazando las llamas.",
        "Su presencia es como estar cerca de un volcán activo."
    ],
    
    playerAttack: [
        "Tu maza consagrada golpea con fuerza sagrada.",
        "El impacto resuena a través de la nave principal.",
        "Tu ataque es guiado por la luz divina.",
        "La maza brilla momentáneamente al contacto.",
        "Golpeas con la fuerza de tu fe.",
        "El Obispo retrocede ante tu ataque.",
        "Tu maza deja una marca de luz en el cuerpo del Obispo.",
        "El sonido del impacto es como un trueno en la catedral.",
        "Tu ataque es preciso, como dictado por los cielos.",
        "El Obispo gruñe de dolor ante tu golpe.",
        "La fuerza de tu ataque hace temblar el suelo.",
        "Tu maza consagrada resplandece con luz sagrada.",
        "El impacto envía ondas de luz a través de la ceniza.",
        "Golpeas con la convicción de un verdadero creyente.",
        "El Obispo se estremece ante tu ataque sagrado.",
        "Tu ataque es un recordatorio de la verdadera fe.",
        "La maza pesa, pero tu brazo es firme.",
        "El Obispo no esperaba tal fuerza.",
        "Tu golpe es como un rayo de luz en la oscuridad.",
        "El impacto hace que las cenizas se levanten en remolino."
    ],
    
    playerHeal: [
        "La luz divina fluye a través de ti, curando tus heridas.",
        "Tu fe restaura tu cuerpo, cerrando heridas.",
        "La energía sagrada te envuelve en un abrazo cálido.",
        "Sientes la presencia de tu divinidad curándote.",
        "Tu cuerpo brilla momentáneamente con luz sanadora.",
        "El dolor se desvanece bajo el poder de la fe.",
        "La curación es como agua fresca en herida ardiente.",
        "Tu símbolo divino brilla con luz restauradora.",
        "La energía fluye de ti a ti, cerrando heridas.",
        "Sientes una oleada de vitalidad sagrada.",
        "Tu fe es tu medicina, y es poderosa.",
        "La luz divina te protege y te cura.",
        "Tu cuerpo responde al poder sagrado.",
        "La curación es un milagro de fe.",
        "Sientes la bendición de tu divinidad.",
        "Tu hermana menor se manifiesta brevemente en la luz.",
        "El poder de la vida fluye a través de ti.",
        "Tu cuerpo se reconstruye bajo la luz sagrada.",
        "La fe cura lo que el fuego daña.",
        "Sientes la gracia divina restaurándote."
    ],
    
    playerSpell: [
        "Tus palabras de poder resuenan en la catedral.",
        "El hechizo se manifiesta con luz sagrada.",
        "Tu fe da forma a la magia divina.",
        "El aire se ilumina con tu hechizo.",
        "Las palabras de tu hechizo son como oraciones.",
        "La magia divina fluye de tus manos.",
        "Tu hechizo es un acto de fe pura.",
        "El poder de tu divinidad se manifiesta.",
        "Las llamas retroceden ante tu magia sagrada.",
        "Tu hechizo brilla con luz dorada.",
        "Las cenizas se apartan ante tu poder.",
        "Tu voz es el canal de lo divino.",
        "El hechizo se forma con la pureza de tu intención.",
        "La magia divina es tu arma y tu escudo.",
        "Tu hechizo es un milagro en movimiento.",
        "El Obispo se sorprende ante tu poder.",
        "Las palabras de poder resuenan eternamente.",
        "Tu fe hace posible lo imposible.",
        "El hechizo es una extensión de tu alma.",
        "La luz divina obedece tu llamado."
    ],
    
    channelDivinity: [
        "Canalizas tu divinidad, y el poder fluye a través de ti.",
        "Tu conexión con lo divino se manifiesta plenamente.",
        "El poder sagrado irradia de tu ser.",
        "Sientes la presencia de tu divinidad más fuerte que nunca.",
        "Tu luz divina brilla con intensidad sobrenatural.",
        "El Obispo retrocede ante tu poder canalizado.",
        "Tu fe se convierte en poder tangible.",
        "La divinidad responde a tu llamado.",
        "Tu cuerpo se convierte en un faro de luz sagrada.",
        "El poder divino fluye como un río a través de ti.",
        "Canalizas la esencia de tu fe.",
        "Tu divinidad se manifiesta en este mundo.",
        "El Obispo no puede resistir tu poder canalizado.",
        "Tu luz divina purifica todo a tu alrededor.",
        "Sientes la gracia de tu divinidad.",
        "El poder sagrado es abrumador.",
        "Tu fe es ilimitada en este momento.",
        "La divinidad te ha otorgado su favor.",
        "Tu conexión con lo sagrado es absoluta.",
        "El poder divino es tuyo para comandar."
    ],
    
    bossAttack: [
        "El Obispo ataca con su maza de brasa.",
        "La maza del Obispo está envuelta en llamas.",
        "El golpe del Obispo es como el impacto de un meteorito.",
        "El Obispo te golpea con fuerza sobrenatural.",
        "La maza del Obispo deja huellas de fuego.",
        "El Obispo ataca con la furia del fuego sagrado.",
        "Su golpe es pesado y ardiente.",
        "El Obispo ríe mientras ataca.",
        "La maza brilla con luz carmesí al golpear.",
        "El impacto es como ser golpeado por sol.",
        "El Obispo ataca con la convicción de un fanático.",
        "Su maza pesa como el juicio divino.",
        "El golpe del Obispo quema y golpea.",
        "El Obispo ataca con la fuerza de siglos de fe.",
        "Su maza es un instrumento de purificación distorsionada.",
        "El Obispo te golpea con furia sagrada.",
        "La maza del Obispo es pesada con el peso de su pecado.",
        "Su ataque es como el fuego que consume.",
        "El Obispo ataca con la certeza de su causa.",
        "El golpe del Obispo es como el juicio final."
    ],
    
    bossPhase2: [
        "El Obispo grita mientras su cuerpo se transforma en Avatar de Ceniza.",
        "Las llamas alrededor del Obispo crecen hasta el techo de la catedral.",
        "El Obispo se convierte en una forma de fuego puro y ceniza.",
        "Su voz ahora es el rugido de un volcán.",
        "El Obispo emerge de las llamas, más poderoso que nunca.",
        "La catedral tiembla bajo su nueva forma.",
        "El Avatar de Ceniza alza sus manos, y el fuego obedece.",
        "El Obispo ya no es humano—es una manifestación de llama eterna.",
        "Su transformación es aterradora y magnífica.",
        "El Avatar de Ceniza ruge con voz de fuego.",
        "Las cenizas forman una tormenta alrededor del Obispo.",
        "El Obispo ahora es uno con la llama eterna.",
        "Su poder se ha multiplicado.",
        "El Avatar de Ceniza es una visión de juicio final.",
        "El Obispo ha trascendido su forma mortal.",
        "Las llamas lo protegen y lo empoderan.",
        "El Avatar de Ceniza es la culminación de su fe distorsionada.",
        "Su transformación es irreversible.",
        "El Obispo ahora es puro fuego sagrado.",
        "El Avatar de Ceniza es el juicio personificado."
    ],
    
    critical: [
        "¡GOLPE CRÍTICO! Tu ataque es devastadoramente efectivo.",
        "¡CRÍTICO! La luz divina guía tu mano con precisión perfecta.",
        "¡GOLPE CRÍTICO! El Obispo no puede resistir tu ataque.",
        "¡CRÍTICO! Tu fe se manifiesta en su máxima potencia.",
        "¡GOLPE CRÍTICO! El impacto resuena a través de la catedral.",
        "¡CRÍTICO! Tu ataque es un milagro de precisión.",
        "¡GOLPE CRÍTICO! El Obispo es golpeado con fuerza divina.",
        "¡CRÍTICO! Tu maza brilla con luz cegadora.",
        "¡GOLPE CRÍTICO! El impacto es como el juicio de los dioses.",
        "¡CRÍTICO! El Obispo se estremece ante tu poder.",
        "¡GOLPE CRÍTICO! Tu ataque es perfecto.",
        "¡CRÍTICO! La luz divina se manifiesta plenamente.",
        "¡GOLPE CRÍTICO! El Obispo retrocede violentamente.",
        "¡CRÍTICO! Tu fe es absoluta en este momento.",
        "¡GOLPE CRÍTICO! El impacto hace temblar el altar.",
        "¡CRÍTICO! Tu ataque es un acto de purificación.",
        "¡GOLPE CRÍTICO! El Obispo grita de dolor.",
        "¡GOLPE CRÍTICO! Tu maza pesa con el peso de la justicia.",
        "¡GOLPE CRÍTICO! El impacto es devastador.",
        "¡GOLPE CRÍTICO! Tu ataque es legendario."
    ],
    
    victory: [
        "El Obispo de Ceniza colapsa, su forma disolviéndose en ceniza.",
        "Las llamas eternas se apagan finalmente.",
        "La catedral exhala un suspiro de alivio.",
        "Has purificado este lugar sagrado.",
        "El Obispo desaparece en una nube de ceniza.",
        "La luz dorada penetra las vidrieras rotas.",
        "La catedral está en paz por primera vez en siglos.",
        "Tu fe ha prevalecido sobre la corrupción.",
        "El fuego sagrado se apaga, dejando solo ceniza fría.",
        "Has cumplido tu misión sagrada.",
        "La catedral puede comenzar a sanar.",
        "El Obispo de Ceniza ha sido derrotado.",
        "Las llamas eternas ya no amenazan este lugar.",
        "Tu victoria es un testimonio de tu fe.",
        "La catedral está libre de su corrupción.",
        "Has restaurado la santidad de este lugar.",
        "El Obispo ha encontrado su paz final.",
        "Las cenizas se asientan, silenciosas.",
        "Tu luz divina ha purificado todo.",
        "La catedral es sagrada una vez más."
    ],
    
    defeat: [
        "Las llamas eternas te consumen.",
        "Tu fe no fue suficiente.",
        "El Obispo de Ceniza ríe mientras la oscuridad te envuelve.",
        "La catedral permanece corrupta.",
        "Tu viaje termina aquí.",
        "Las llamas reclaman otro alma.",
        "El Obispo ha ganado.",
        "Tu luz se apaga.",
        "La ceniza te cubre.",
        "El fuego sagrado es tu final.",
        "Tu fe se desvanece.",
        "El Obispo continúa su vigilancia eterna.",
        "La catedral sigue maldita.",
        "Has fallado en tu misión.",
        "Las llamas son eternas.",
        "Tu sacrificio fue en vano.",
        "El Obispo permanece.",
        "La oscuridad te consume.",
        "Tu luz no pudo prevalecer.",
        "El fuego te reclama."
    ],
    
    statusBurned: [
        "Las llamas del Obispo te han quemado.",
        "Sientes el ardor del fuego sagrado corrompido.",
        "El fuego consume tu cuerpo.",
        "Las quemaduras duelen intensamente.",
        "El fuego del Obispo es implacable.",
        "Sientes la piel arder bajo el ataque.",
        "Las llamas te marcan con su calor.",
        "El fuego sagrado quema tu carne.",
        "El ardor es insoportable.",
        "Las quemaduras son profundas.",
        "El fuego del Obispo es cruel.",
        "Sientes el calor penetrante.",
        "Las llamas dejan cicatrices.",
        "El fuego consume tu vitalidad.",
        "El ardor es constante.",
        "Las quemaduras supuran.",
        "El fuego del Obispo es vengativo.",
        "Sientes el calor abrasador.",
        "Las llamas no perdonan.",
        "El fuego es tu castigo."
    ],
    
    statusBlessed: [
        "Te sientes bendecido por la luz divina.",
        "La gracia divina te envuelve.",
        "Tu fe se fortalece.",
        "La luz sagrada te protege.",
        "Te sientes guiado por lo divino.",
        "La bendición te da fuerza.",
        "Tu conexión con lo sagrado es más fuerte.",
        "La luz divina te ilumina.",
        "Te sientes favorecido por los cielos.",
        "La bendición es tangible.",
        "Tu fe es inquebrantable.",
        "La luz sagrada te guía.",
        "Te sientes protegido.",
        "La bendición te da esperanza.",
        "Tu espíritu se eleva.",
        "La gracia divina te sostiene.",
        "Te sientes inspirado.",
        "La luz divina te fortalece.",
        "Tu fe es tu escudo.",
        "La bendición es real."
    ],
    
    bossDialogue: [
        "Tu fe es débil, hereje.",
        "La llama eterna consume todo.",
        "Este lugar es mío.",
        "Tu dios no puede salvarte.",
        "La purificación es dolorosa.",
        "He servido por siglos. ¿Quién eres tú?",
        "La ceniza es el destino de todos.",
        "Tu luz se apagará.",
        "El fuego es eterno.",
        "Tu fe es irrelevante.",
        "La llama me ha elegido.",
        "Tu resistencia es inútil.",
        "La catedral es mi templo.",
        "Tu dios está silencioso.",
        "El fuego juzga a todos.",
        "Tu alma será ceniza.",
        "La llama es mi maestro.",
        "Tu fe es una mentira.",
        "El fuego es verdad.",
        "La purificación es inevitable."
    ]
};

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollDamage(diceString) {
    const match = diceString.match(/(\d+)d(\d+)([+-]\d+)?/);
    if (!match) return 0;
    
    const numDice = parseInt(match[1]);
    const sides = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;
    
    let total = 0;
    for (let i = 0; i < numDice; i++) {
        total += rollDice(sides);
    }
    return total + modifier;
}

function calculateDistance(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy) * 5; // 5 pies por celda
}

function calculateGridDistance(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

function getRandomNarrative(category) {
    const bank = narrativeBanks[category];
    if (!bank || bank.length === 0) return "";
    return bank[Math.floor(Math.random() * bank.length)];
}

function addLogEntry(text, type = "normal") {
    const combatLog = document.getElementById("combat-log");
    const entry = document.createElement("div");
    entry.className = `log-entry ${type}`;
    entry.textContent = text;
    combatLog.appendChild(entry);
    combatLog.scrollTop = combatLog.scrollHeight;
}

function translateStatus(status) {
    const translations = {
        "burned": "Quemado",
        "blessed": "Bendecido",
        "inspired": "Inspirado",
        "weakened": "Debilitado",
        "stunned": "Aturdido",
        "frightened": "Asustado",
        "consecrated": "Consagrado",
        "concentrating": "Concentrando",
        "dodging": "Esquivando",
        "disengaged": "Retirada"
    };
    return translations[status] || status;
}

// ============================================================================
// FUNCIONES DE UI
// ============================================================================

function updateUI() {
    updatePlayerPanel();
    updateBossPanel();
    updateTokenPositions();
    updateActionButtons();
    updateSpellSlots();
    updatePhaseDisplay();
}

function updatePlayerPanel() {
    document.getElementById("player-hp").textContent = gameState.player.hp;
    const hpPercent = (gameState.player.hp / gameState.player.maxHp) * 100;
    const hpFill = document.getElementById("player-hp-fill");
    hpFill.style.width = `${hpPercent}%`;
    
    hpFill.className = "hp-fill";
    if (hpPercent <= 25) {
        hpFill.classList.add("low");
    } else if (hpPercent <= 50) {
        hpFill.classList.add("medium");
    }
    
    // Actualizar estados
    const statusContainer = document.getElementById("status-effects");
    if (gameState.player.status.length === 0) {
        statusContainer.innerHTML = '<span style="color: #9ca3af; font-style: italic;">Ningún estado activo</span>';
    } else {
        statusContainer.innerHTML = gameState.player.status
            .map(s => `<span class="status-effect">${translateStatus(s)}</span>`)
            .join("");
    }
    
    // Actualizar Canalizar Divinidad
    const channelDivinity = document.getElementById("channel-divinity");
    channelDivinity.textContent = `Usos: ${gameState.player.channelDivinity}/2`;
    if (gameState.player.channelDivinity === 0) {
        channelDivinity.classList.add("used");
    } else {
        channelDivinity.classList.remove("used");
    }
}

function updateBossPanel() {
    document.getElementById("enemy-hp").textContent = gameState.boss.hp;
    document.getElementById("enemy-max-hp").textContent = gameState.boss.maxHp;
    const hpPercent = (gameState.boss.hp / gameState.boss.maxHp) * 100;
    document.getElementById("enemy-hp-fill").style.width = `${hpPercent}%`;
    
    // Actualizar estados del jefe
    const statusContainer = document.getElementById("enemy-status");
    if (gameState.boss.status.length === 0) {
        statusContainer.innerHTML = '<span style="color: #9ca3af; font-style: italic;">Ningún estado activo</span>';
    } else {
        statusContainer.innerHTML = gameState.boss.status
            .map(s => `<span class="status-effect">${translateStatus(s)}</span>`)
            .join("");
    }
}

function updateTokenPositions() {
    const playerToken = document.getElementById("player-token");
    const bossToken = document.getElementById("boss-token");
    
    // Calculate position to center tokens in grid cells
    // Grid has 11 columns: 1 coordinate column (40px) + 10 grid columns (1fr each)
    // Grid has 11 rows: 1 coordinate row (40px) + 10 grid rows (1fr each)
    // We need to account for the coordinate row/column offset
    
    // The grid cells are positioned from 2 to 11 in the grid (1 is coordinate)
    // But game coordinates are 1-10, so we need to map game coord 1 -> grid 2, etc.
    
    const gridContainer = document.querySelector('.map-container');
    const containerWidth = gridContainer.offsetWidth;
    const containerHeight = gridContainer.offsetHeight;
    
    // Coordinate column/row is 40px
    const coordSize = 40;
    
    // Calculate cell size (remaining space divided by 10)
    const cellWidth = (containerWidth - coordSize) / 10;
    const cellHeight = (containerHeight - coordSize) / 10;
    
    // Calculate position (accounting for coordinate column/row)
    const playerLeft = coordSize + (gameState.player.position.x - 1) * cellWidth + cellWidth / 2;
    const playerTop = coordSize + (gameState.player.position.y - 1) * cellHeight + cellHeight / 2;
    
    const bossLeft = coordSize + (gameState.boss.position.x - 1) * cellWidth + cellWidth / 2;
    const bossTop = coordSize + (gameState.boss.position.y - 1) * cellHeight + cellHeight / 2;
    
    // Convert to percentages
    playerToken.style.left = `${(playerLeft / containerWidth) * 100}%`;
    playerToken.style.top = `${(playerTop / containerHeight) * 100}%`;
    
    bossToken.style.left = `${(bossLeft / containerWidth) * 100}%`;
    bossToken.style.top = `${(bossTop / containerHeight) * 100}%`;
}

function updateActionButtons() {
    const buttons = document.querySelectorAll(".action-btn");
    buttons.forEach(btn => {
        if (gameState.isPlayerTurn) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    });
    
    // Deshabilitar botones específicos según recursos
    if (!gameState.player.hasAction) {
        document.getElementById("mace-attack").disabled = true;
        document.getElementById("symbol-throw").disabled = true;
        document.getElementById("dodge-action").disabled = true;
        document.getElementById("dash-action").disabled = true;
        document.getElementById("disengage-action").disabled = true;
        document.getElementById("cure-wounds").disabled = true;
        document.getElementById("bless").disabled = true;
        document.getElementById("lesser-restoration").disabled = true;
        document.getElementById("spirit-guardians").disabled = true;
        document.getElementById("beacon-of-hope").disabled = true;
    }
    
    if (!gameState.player.hasAdditionalAction) {
        document.getElementById("healing-word").disabled = true;
        document.getElementById("spiritual-weapon").disabled = true;
        document.getElementById("defensive-prayer").disabled = true;
    }
    
    if (!gameState.player.hasReaction) {
        document.getElementById("opportunity-attack").disabled = true;
        document.getElementById("divine-intervention").disabled = true;
    }
    
    if (gameState.player.channelDivinity === 0) {
        document.getElementById("preserve-life").disabled = true;
        document.getElementById("sacred-flame").disabled = true;
    }
    
    // Verificar espacios de conjuro
    if (gameState.player.spellSlots.level1 === 0) {
        document.getElementById("cure-wounds").disabled = true;
        document.getElementById("healing-word").disabled = true;
        document.getElementById("bless").disabled = true;
    }
    
    if (gameState.player.spellSlots.level2 === 0) {
        document.getElementById("spiritual-weapon").disabled = true;
        document.getElementById("lesser-restoration").disabled = true;
    }
    
    if (gameState.player.spellSlots.level3 === 0) {
        document.getElementById("spirit-guardians").disabled = true;
        document.getElementById("beacon-of-hope").disabled = true;
    }
}

function updateSpellSlots() {
    document.getElementById("spell-slots-1").textContent = `Nivel 1: ${gameState.player.spellSlots.level1}/4`;
    document.getElementById("spell-slots-2").textContent = `Nivel 2: ${gameState.player.spellSlots.level2}/3`;
    document.getElementById("spell-slots-3").textContent = `Nivel 3: ${gameState.player.spellSlots.level3}/3`;
    
    if (gameState.player.spellSlots.level1 === 0) {
        document.getElementById("spell-slots-1").classList.add("used");
    }
    if (gameState.player.spellSlots.level2 === 0) {
        document.getElementById("spell-slots-2").classList.add("used");
    }
    if (gameState.player.spellSlots.level3 === 0) {
        document.getElementById("spell-slots-3").classList.add("used");
    }
}

function updatePhaseDisplay() {
    const phaseDisplay = document.getElementById("boss-phase");
    phaseDisplay.textContent = `Fase ${gameState.boss.phase}`;
    
    const phase2Abilities = document.querySelectorAll(".phase2");
    phase2Abilities.forEach(ability => {
        ability.style.display = gameState.boss.phase === 2 ? "block" : "none";
    });
}

// ============================================================================
// FUNCIONES DE MOVIMIENTO
// ============================================================================

function enableMovement() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    gameState.movementEnabled = true;
    gameState.player.movementRemaining = gameState.player.movement;
    
    addLogEntry("Selecciona una celda para moverte.", "normal");
    generateGrid();
}

function generateGrid() {
    const gridOverlay = document.getElementById("grid-overlay");
    gridOverlay.innerHTML = "";
    
    const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    
    // Fila de coordenadas Y
    for (let i = 0; i <= 10; i++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell coordinate";
        cell.textContent = i === 0 ? "" : i;
        gridOverlay.appendChild(cell);
    }
    
    // Grid principal
    for (let y = 1; y <= 10; y++) {
        // Coordenada X
        const coordCell = document.createElement("div");
        coordCell.className = "grid-cell coordinate";
        coordCell.textContent = letters[y];
        gridOverlay.appendChild(coordCell);
        
        for (let x = 1; x <= 10; x++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.dataset.x = x;
            cell.dataset.y = y;
            
            if (gameState.movementEnabled) {
                const distance = calculateGridDistance(gameState.player.position, { x, y });
                if (distance <= Math.floor(gameState.player.movementRemaining / 5)) {
                    cell.classList.add("highlighted");
                    cell.onclick = () => moveTo(x, y);
                }
            }
            
            gridOverlay.appendChild(cell);
        }
    }
}

function moveTo(x, y) {
    if (!gameState.movementEnabled) return;
    
    const distance = calculateGridDistance(gameState.player.position, { x, y });
    const movementCost = distance * 5; // 5 pies por celda
    
    // Verificar que el movimiento no exceda el máximo
    if (movementCost > gameState.player.movementRemaining) {
        addLogEntry("No tienes suficiente movimiento.", "normal");
        return;
    }
    
    // Verificar que el movimiento no sea negativo
    if (gameState.player.movementRemaining - movementCost < 0) {
        addLogEntry("Movimiento inválido.", "normal");
        return;
    }
    
    gameState.player.movementRemaining -= movementCost;
    gameState.player.position = { x, y };
    
    // Verificar ataques de oportunidad
    const wasAdjacent = calculateDistance(gameState.player.position, gameState.boss.position) <= 5;
    // (Simplificado: asumiendo que el movimiento ya cambió la posición)
    
    gameState.movementEnabled = false;
    updateTokenPositions();
    generateGrid();
    
    const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    addLogEntry(`Te mueves a (${letters[x]}, ${y}). Movimiento restante: ${gameState.player.movementRemaining.toFixed(0)} pies.`, "normal");
}

// ============================================================================
// ACCIONES DEL JUGADOR
// ============================================================================

function maceAttack() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    const attackRoll = rollDice(20) + 6; // +6 por nivel y stats
    const damage = rollDamage("1d8+4");
    
    gameState.player.hasAction = false;
    
    if (attackRoll >= 20) {
        // Crítico
        const critDamage = damage * 2;
        gameState.boss.hp -= critDamage;
        gameState.combatStats.damageDealt += critDamage;
        addLogEntry(`${getRandomNarrative("critical")} ¡${critDamage} de daño!`, "critical");
    } else if (attackRoll >= gameState.boss.ac) {
        gameState.boss.hp -= damage;
        gameState.combatStats.damageDealt += damage;
        addLogEntry(`${getRandomNarrative("playerAttack")} ${damage} de daño.`, "damage");
    } else {
        addLogEntry("Tu ataque falla.", "normal");
    }
    
    checkBossPhaseTransition();
    updateUI();
}

function symbolThrow() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    const distance = calculateDistance(gameState.player.position, gameState.boss.position);
    if (distance > 60) { // 60 pies de alcance
        addLogEntry("El objetivo está fuera de alcance.", "normal");
        return;
    }
    
    const attackRoll = rollDice(20) + 5;
    const damage = rollDamage("1d6+3");
    
    gameState.player.hasAction = false;
    
    if (attackRoll >= gameState.boss.ac) {
        gameState.boss.hp -= damage;
        gameState.combatStats.damageDealt += damage;
        addLogEntry(`Lanzas tu símbolo consagrado. ${damage} de daño.`, "damage");
    } else {
        addLogEntry("Tu símbolo falla el objetivo.", "normal");
    }
    
    checkBossPhaseTransition();
    updateUI();
}

function dodgeAction() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    gameState.player.hasAction = false;
    gameState.player.isDodging = true;
    gameState.player.status.push("dodging");
    
    addLogEntry("Esquivas, otorgando desventaja a los ataques contra ti.", "normal");
    updateUI();
}

function dashAction() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    gameState.player.hasAction = false;
    gameState.player.movementRemaining *= 2;
    
    addLogEntry("Carreras: tu movimiento se ha duplicado.", "normal");
    enableMovement();
    updateUI();
}

function disengageAction() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    
    gameState.player.hasAction = false;
    gameState.player.status.push("disengaged");
    
    addLogEntry("Retirada: puedes moverte sin provocar ataques de oportunidad.", "normal");
    updateUI();
}

// ============================================================================
// HECHIZOS DEL JUGADOR
// ============================================================================

function cureWounds() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.spellSlots.level1 === 0) {
        addLogEntry("No tienes espacios de conjuro de nivel 1.", "normal");
        return;
    }
    
    gameState.player.spellSlots.level1--;
    gameState.player.hasAction = false;
    gameState.combatStats.spellsCast++;
    
    const healing = rollDamage("1d8+4");
    if (gameState.player.beaconOfHopeActive) {
        const beaconBonus = Math.floor(healing * 0.5);
        healing += beaconBonus;
    }
    
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healing);
    gameState.player.lastHealed = gameState.turn;
    
    addLogEntry(`${getRandomNarrative("playerHeal")} ${healing} PV restaurados.`, "heal");
    updateUI();
}

function healingWord() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction) return;
    if (gameState.player.spellSlots.level1 === 0) {
        addLogEntry("No tienes espacios de conjuro de nivel 1.", "normal");
        return;
    }
    
    gameState.player.spellSlots.level1--;
    gameState.player.hasAdditionalAction = false;
    gameState.combatStats.spellsCast++;
    
    const healing = rollDamage("1d4+4");
    if (gameState.player.beaconOfHopeActive) {
        const beaconBonus = Math.floor(healing * 0.5);
        healing += beaconBonus;
    }
    
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healing);
    gameState.player.lastHealed = gameState.turn;
    
    addLogEntry(`Palabra Sanadora: ${healing} PV restaurados.`, "heal");
    updateUI();
}

function blessSpell() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.spellSlots.level1 === 0) {
        addLogEntry("No tienes espacios de conjuro de nivel 1.", "normal");
        return;
    }
    
    // Romper concentración anterior
    if (gameState.player.concentration) {
        addLogEntry("Rompes tu concentración anterior.", "normal");
        gameState.player.status = gameState.player.status.filter(s => s !== "concentrating");
    }
    
    gameState.player.spellSlots.level1--;
    gameState.player.hasAction = false;
    gameState.player.concentration = "bless";
    gameState.player.status.push("concentrating");
    gameState.player.blessedTargets = ["player"];
    gameState.player.status.push("blessed");
    gameState.combatStats.spellsCast++;
    
    addLogEntry(`${getRandomNarrative("playerSpell")} Estás bendecido.`, "heal");
    updateUI();
}

function spiritualWeapon() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction) return;
    if (gameState.player.spellSlots.level2 === 0) {
        addLogEntry("No tienes espacios de conjuro de nivel 2.", "normal");
        return;
    }
    
    gameState.player.spellSlots.level2--;
    gameState.player.hasAdditionalAction = false;
    gameState.player.spiritualWeaponActive = true;
    gameState.combatStats.spellsCast++;
    
    const damage = rollDamage("1d8+3");
    gameState.boss.hp -= damage;
    gameState.combatStats.damageDealt += damage;
    
    addLogEntry(`Arma Espiritual invocada. ${damage} de daño.`, "damage");
    checkBossPhaseTransition();
    updateUI();
}

function lesserRestoration() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.spellSlots.level2 === 0) {
        addLogEntry("No tienes espacios de conjuro de nivel 2.", "normal");
        return;
    }
    
    gameState.player.spellSlots.level2--;
    gameState.player.hasAction = false;
    gameState.combatStats.spellsCast++;
    
    // Eliminar estados negativos
    const negativeStatuses = ["burned", "weakened", "stunned", "frightened"];
    const removedStatuses = gameState.player.status.filter(s => negativeStatuses.includes(s));
    gameState.player.status = gameState.player.status.filter(s => !negativeStatuses.includes(s));
    
    if (removedStatuses.length > 0) {
        addLogEntry(`Restablecimiento Menor elimina: ${removedStatuses.map(s => translateStatus(s)).join(", ")}.`, "heal");
    } else {
        addLogEntry("Restablecimiento Menor: no hay estados negativos que eliminar.", "normal");
    }
    
    updateUI();
}

function spiritGuardians() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.spellSlots.level3 === 0) {
        addLogEntry("No tienes espacios de conjuro de nivel 3.", "normal");
        return;
    }
    
    // Romper concentración anterior
    if (gameState.player.concentration) {
        addLogEntry("Rompes tu concentración anterior.", "normal");
        gameState.player.status = gameState.player.status.filter(s => s !== "concentrating");
    }
    
    gameState.player.spellSlots.level3--;
    gameState.player.hasAction = false;
    gameState.player.concentration = "spiritGuardians";
    gameState.player.status.push("concentrating");
    gameState.player.spiritGuardiansActive = true;
    gameState.combatStats.spellsCast++;
    
    addLogEntry(`${getRandomNarrative("playerSpell")} Espíritus Guardianes activos.`, "heal");
    updateUI();
}

function beaconOfHope() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.spellSlots.level3 === 0) {
        addLogEntry("No tienes espacios de conjuro de nivel 3.", "normal");
        return;
    }
    
    // Romper concentración anterior
    if (gameState.player.concentration) {
        addLogEntry("Rompes tu concentración anterior.", "normal");
        gameState.player.status = gameState.player.status.filter(s => s !== "concentrating");
    }
    
    gameState.player.spellSlots.level3--;
    gameState.player.hasAction = false;
    gameState.player.concentration = "beaconOfHope";
    gameState.player.status.push("concentrating");
    gameState.player.beaconOfHopeActive = true;
    gameState.combatStats.spellsCast++;
    
    addLogEntry(`${getRandomNarrative("playerSpell")} Faro de Esperanza activo.`, "heal");
    updateUI();
}

// ============================================================================
// ACCIONES ADICIONALES
// ============================================================================

function defensivePrayer() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAdditionalAction) return;
    
    gameState.player.hasAdditionalAction = false;
    gameState.player.defensivePrayerActive = true;
    gameState.player.ac = gameState.player.baseAc + 2;
    
    addLogEntry("Oración Defensiva: tu CA aumenta en 2.", "normal");
    updateUI();
}

// ============================================================================
// CANALIZAR DIVINIDAD
// ============================================================================

function preserveLife() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.channelDivinity === 0) {
        addLogEntry("No tienes usos de Canalizar Divinidad.", "normal");
        return;
    }
    
    gameState.player.channelDivinity--;
    gameState.player.hasAction = false;
    gameState.combatStats.channelDivinityUsed++;
    
    const healing = 30; // Curación masiva fija
    if (gameState.player.beaconOfHopeActive) {
        healing += 15;
    }
    
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + healing);
    gameState.player.lastHealed = gameState.turn;
    
    addLogEntry(`${getRandomNarrative("channelDivinity")} Preservar la Vida: ${healing} PV restaurados.`, "heal");
    updateUI();
}

function sacredFlame() {
    if (!gameState.isPlayerTurn || !gameState.player.hasAction) return;
    if (gameState.player.channelDivinity === 0) {
        addLogEntry("No tienes usos de Canalizar Divinidad.", "normal");
        return;
    }
    
    gameState.player.channelDivinity--;
    gameState.player.hasAction = false;
    gameState.combatStats.channelDivinityUsed++;
    
    const damage = rollDamage("4d6"); // Daño radiante en área
    gameState.boss.hp -= damage;
    gameState.combatStats.damageDealt += damage;
    
    addLogEntry(`${getRandomNarrative("channelDivinity")} Destello Sagrado: ${damage} de daño radiante.`, "damage");
    checkBossPhaseTransition();
    updateUI();
}

// ============================================================================
// REACCIONES
// ============================================================================

function opportunityAttack() {
    if (!gameState.player.hasReaction) return;
    
    const attackRoll = rollDice(20) + 6;
    const damage = rollDamage("1d8+4");
    
    gameState.player.hasReaction = false;
    
    if (attackRoll >= gameState.boss.ac) {
        gameState.boss.hp -= damage;
        gameState.combatStats.damageDealt += damage;
        addLogEntry(`Ataque de oportunidad: ${damage} de daño.`, "damage");
    } else {
        addLogEntry("Ataque de oportunidad falla.", "normal");
    }
    
    checkBossPhaseTransition();
    updateUI();
}

function divineIntervention() {
    if (!gameState.player.hasReaction) return;
    
    gameState.player.hasReaction = false;
    gameState.player.status.push("blessed");
    
    addLogEntry("Intervención Divina Menor: reduces el daño recibido este turno.", "heal");
    updateUI();
}

// ============================================================================
// IA DEL JEFE
// ============================================================================

function bossTurn() {
    if (gameState.gameOver) return;
    
    addLogEntry("--- Turno del Obispo de Ceniza ---", "narrative");
    
    // Reducir cooldowns
    Object.keys(gameState.boss.abilities).forEach(key => {
        if (gameState.boss.abilities[key].cooldown > 0) {
            gameState.boss.abilities[key].cooldown--;
        }
    });
    
    // Daño de Espíritus Guardianes
    if (gameState.player.spiritGuardiansActive) {
        const guardianDamage = rollDamage("2d8");
        gameState.boss.hp -= guardianDamage;
        gameState.combatStats.damageDealt += guardianDamage;
        addLogEntry(`Espíritus Guardianes infligen ${guardianDamage} de daño al Obispo.`, "damage");
        checkBossPhaseTransition();
    }
    
    // Daño de Arma Espiritual
    if (gameState.player.spiritualWeaponActive) {
        const weaponDamage = rollDamage("1d8+3");
        gameState.boss.hp -= weaponDamage;
        gameState.combatStats.damageDealt += weaponDamage;
        addLogEntry(`Arma Espiritual inflige ${weaponDamage} de daño.`, "damage");
        checkBossPhaseTransition();
    }
    
    // Decidir acción
    decideBossAction();
}

function decideBossAction() {
    const boss = gameState.boss;
    const player = gameState.player;
    const distance = calculateDistance(boss.position, player.position);
    
    const actions = [];
    
    // Prioridades según la fase
    if (boss.phase === 1) {
        // Fase 1: Acciones básicas
        if (boss.abilities.maceOfEmbers.cooldown === 0 && distance <= 5) {
            actions.push({ action: "maceOfEmbers", weight: 30 });
        }
        if (boss.abilities.purifyingFlame.cooldown === 0) {
            actions.push({ action: "purifyingFlame", weight: 25 });
        }
        if (boss.abilities.ashExplosion.cooldown === 0 && distance <= 10) {
            actions.push({ action: "ashExplosion", weight: 20 });
        }
        if (boss.abilities.chainOfPenance.cooldown === 0) {
            actions.push({ action: "chainOfPenance", weight: 15 });
        }
        if (boss.abilities.judgmentOfHeretic.cooldown === 0) {
            actions.push({ action: "judgmentOfHeretic", weight: 10 });
        }
        
        // Moverse si está lejos
        if (distance > 5) {
            actions.push({ action: "move", weight: 20 });
        }
    } else {
        // Fase 2: Acciones más agresivas
        if (boss.abilities.emberStorm.cooldown === 0) {
            actions.push({ action: "emberStorm", weight: 25 });
        }
        if (boss.abilities.sacredColumns.cooldown === 0) {
            actions.push({ action: "sacredColumns", weight: 20 });
        }
        if (boss.abilities.ashBreath.cooldown === 0 && distance <= 10) {
            actions.push({ action: "ashBreath", weight: 25 });
        }
        if (boss.abilities.martyrWrath.cooldown === 0) {
            actions.push({ action: "martyrWrath", weight: 15 });
        }
        if (boss.abilities.maceOfEmbers.cooldown === 0 && distance <= 5) {
            actions.push({ action: "maceOfEmbers", weight: 15 });
        }
        
        // Moverse agresivamente
        if (distance > 5) {
            actions.push({ action: "move", weight: 25 });
        }
    }
    
    // Castigar al jugador si se curó recientemente
    if (player.lastHealed === gameState.turn - 1) {
        actions.forEach(a => a.weight *= 1.5);
    }
    
    // Seleccionar acción aleatoria basada en pesos
    const totalWeight = actions.reduce((sum, a) => sum + a.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedAction = actions[0];
    
    for (const action of actions) {
        random -= action.weight;
        if (random <= 0) {
            selectedAction = action;
            break;
        }
    }
    
    executeBossAction(selectedAction.action);
}

function executeBossAction(action) {
    const boss = gameState.boss;
    const player = gameState.player;
    const distance = calculateDistance(boss.position, player.position);
    
    switch (action) {
        case "maceOfEmbers":
            boss.abilities.maceOfEmbers.cooldown = boss.abilities.maceOfEmbers.maxCooldown;
            const maceAttack = rollDice(20) + 7;
            let maceDamage = rollDamage("1d10+5");
            
            if (player.isDodging) {
                const dodgeRoll = rollDice(20);
                if (dodgeRoll >= 10) {
                    addLogEntry("Esquivas el ataque del Obispo.", "normal");
                    break;
                }
            }
            
            if (maceAttack >= 20) {
                maceDamage *= 2;
                addLogEntry(`${getRandomNarrative("critical")} ¡${maceDamage} de daño!`, "critical");
            } else if (maceAttack >= player.ac) {
                if (player.status.includes("blessed")) {
                    maceDamage = Math.floor(maceDamage * 0.8);
                }
                player.hp -= maceDamage;
                player.status.push("burned");
                gameState.combatStats.damageTaken += maceDamage;
                addLogEntry(`${getRandomNarrative("bossAttack")} ${maceDamage} de daño. Quemado.`, "damage");
            } else {
                addLogEntry("El Obispo falla su ataque.", "normal");
            }
            break;
            
        case "purifyingFlame":
            boss.abilities.purifyingFlame.cooldown = boss.abilities.purifyingFlame.maxCooldown;
            const flameDamage = rollDamage("3d8");
            player.hp -= flameDamage;
            player.status.push("burned");
            gameState.combatStats.damageTaken += flameDamage;
            addLogEntry(`Llama Purificadora: ${flameDamage} de daño de fuego. Quemado.`, "damage");
            break;
            
        case "ashExplosion":
            boss.abilities.ashExplosion.cooldown = boss.abilities.ashExplosion.maxCooldown;
            const explosionDamage = rollDamage("4d6");
            player.hp -= explosionDamage;
            player.status.push("weakened");
            gameState.combatStats.damageTaken += explosionDamage;
            addLogEntry(`Explosión de Ceniza: ${explosionDamage} de daño. Debilitado.`, "damage");
            break;
            
        case "chainOfPenance":
            boss.abilities.chainOfPenance.cooldown = boss.abilities.chainOfPenance.maxCooldown;
            player.status.push("frightened");
            player.status.push("weakened");
            addLogEntry("Cadena de Penitencia: Asustado y Debilitado.", "normal");
            break;
            
        case "judgmentOfHeretic":
            boss.abilities.judgmentOfHeretic.cooldown = boss.abilities.judgmentOfHeretic.maxCooldown;
            const judgmentDamage = rollDamage("6d8");
            if (player.isDodging) {
                const dodgeRoll = rollDice(20);
                if (dodgeRoll >= 10) {
                    judgmentDamage = Math.floor(judgmentDamage * 0.5);
                }
            }
            player.hp -= judgmentDamage;
            gameState.combatStats.damageTaken += judgmentDamage;
            addLogEntry(`${getRandomNarrative("bossDialogue")} Juicio del Hereje: ${judgmentDamage} de daño.`, "damage");
            break;
            
        case "emberStorm":
            boss.abilities.emberStorm.cooldown = boss.abilities.emberStorm.maxCooldown;
            const stormDamage = rollDamage("5d8");
            player.hp -= stormDamage;
            player.status.push("burned");
            gameState.combatStats.damageTaken += stormDamage;
            addLogEntry(`Tormenta de Brasas: ${stormDamage} de daño. Quemado.`, "damage");
            break;
            
        case "sacredColumns":
            boss.abilities.sacredColumns.cooldown = boss.abilities.sacredColumns.maxCooldown;
            const columnsDamage = rollDamage("4d10");
            player.hp -= columnsDamage;
            gameState.combatStats.damageTaken += columnsDamage;
            addLogEntry(`Columnas Sagradas: ${columnsDamage} de daño radiante.`, "damage");
            break;
            
        case "ashBreath":
            boss.abilities.ashBreath.cooldown = boss.abilities.ashBreath.maxCooldown;
            const breathDamage = rollDamage("6d6");
            player.hp -= breathDamage;
            player.status.push("weakened");
            player.status.push("stunned");
            gameState.combatStats.damageTaken += breathDamage;
            addLogEntry(`Aliento de Ceniza: ${breathDamage} de daño. Debilitado y Aturdido.`, "damage");
            break;
            
        case "martyrWrath":
            boss.abilities.martyrWrath.cooldown = boss.abilities.martyrWrath.maxCooldown;
            const wrathDamage = rollDamage("8d8");
            player.hp -= wrathDamage;
            gameState.combatStats.damageTaken += wrathDamage;
            addLogEntry(`Cólera del Mártir: ${wrathDamage} de daño devastador.`, "damage");
            break;
            
        case "move":
            // Moverse hacia el jugador
            if (distance > 5) {
                const moveDistance = Math.min(boss.movement, distance - 5);
                const directionX = (player.position.x - boss.position.x) / distance;
                const directionY = (player.position.y - boss.position.y) / distance;
                boss.position.x += Math.round(directionX * (moveDistance / 5));
                boss.position.y += Math.round(directionY * (moveDistance / 5));
                addLogEntry("El Obispo se acerca.", "normal");
            }
            break;
    }
    
    // Diálogo aleatorio del jefe
    if (Math.random() < 0.3) {
        addLogEntry(getRandomNarrative("bossDialogue"), "narrative");
    }
    
    updateUI();
    checkDefeat();
}

// ============================================================================
// TRANSICIÓN DE FASE
// ============================================================================

function checkBossPhaseTransition() {
    if (gameState.boss.phase === 1 && gameState.boss.hp <= gameState.boss.phase2Threshold) {
        gameState.boss.phase = 2;
        addLogEntry(getRandomNarrative("bossPhase2"), "narrative");
        updatePhaseDisplay();
    }
}

// ============================================================================
// CONTROL DEL JUEGO
// ============================================================================

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "grid";
    
    gameState.gameStarted = true;
    gameState.isPlayerTurn = true;
    
    addLogEntry(getRandomNarrative("gameStart"), "narrative");
    addLogEntry(getRandomNarrative("bossEntrance"), "narrative");
    
    generateGrid();
    updateUI();
}

function endTurn() {
    if (!gameState.isPlayerTurn) return;
    
    gameState.isPlayerTurn = false;
    gameState.combatStats.turnsUsed++;
    
    // Resetear estados de turno
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.hasReaction = true;
    gameState.player.movementRemaining = gameState.player.movement;
    gameState.player.isDodging = false;
    gameState.player.status = gameState.player.status.filter(s => 
        !["dodging", "disengaged"].includes(s)
    );
    
    // Resetear defensa temporal
    if (!gameState.player.defensivePrayerActive) {
        gameState.player.ac = gameState.player.baseAc;
    }
    gameState.player.defensivePrayerActive = false;
    
    // Daño por estado Quemado
    if (gameState.player.status.includes("burned")) {
        const burnDamage = rollDamage("1d4");
        gameState.player.hp -= burnDamage;
        gameState.combatStats.damageTaken += burnDamage;
        addLogEntry(`Quemado: ${burnDamage} de daño.`, "damage");
    }
    
    checkDefeat();
    
    if (!gameState.gameOver) {
        setTimeout(() => {
            bossTurn();
            if (!gameState.gameOver) {
                gameState.turn++;
                gameState.isPlayerTurn = true;
                gameState.player.damageTakenThisTurn = 0;
                // Resetear movimiento al inicio del turno
                gameState.player.movementRemaining = gameState.player.movement;
                addLogEntry(`--- Turno ${gameState.turn} ---`, "narrative");
                updateUI();
            }
        }, 1000);
    }
}

function checkVictory() {
    if (gameState.boss.hp <= 0) {
        gameState.gameOver = true;
        gameState.boss.hp = 0;
        
        document.getElementById("victory-turns").textContent = gameState.combatStats.turnsUsed;
        document.getElementById("victory-damage-dealt").textContent = gameState.combatStats.damageDealt;
        document.getElementById("victory-damage-taken").textContent = gameState.combatStats.damageTaken;
        document.getElementById("victory-spells").textContent = gameState.combatStats.spellsCast;
        
        addLogEntry(getRandomNarrative("victory"), "narrative");
        
        document.getElementById("victory-modal").classList.add("active");
    }
}

function checkDefeat() {
    if (gameState.player.hp <= 0) {
        gameState.gameOver = true;
        gameState.player.hp = 0;
        
        document.getElementById("defeat-turns").textContent = gameState.combatStats.turnsUsed;
        document.getElementById("defeat-damage-dealt").textContent = gameState.combatStats.damageDealt;
        document.getElementById("defeat-damage-taken").textContent = gameState.combatStats.damageTaken;
        document.getElementById("defeat-spells").textContent = gameState.combatStats.spellsCast;
        
        addLogEntry(getRandomNarrative("defeat"), "narrative");
        
        document.getElementById("defeat-modal").classList.add("active");
    }
    
    checkVictory();
}

function restartGame() {
    // Resetear estado del juego
    gameState.player.hp = 61;
    gameState.player.spellSlots = { level1: 4, level2: 3, level3: 3 };
    gameState.player.channelDivinity = 2;
    gameState.player.status = [];
    gameState.player.hasAction = true;
    gameState.player.hasAdditionalAction = true;
    gameState.player.hasReaction = true;
    gameState.player.movementRemaining = 7.5;
    gameState.player.isDodging = false;
    gameState.player.concentration = null;
    gameState.player.blessedTargets = [];
    gameState.player.spiritualWeaponActive = false;
    gameState.player.spiritGuardiansActive = false;
    gameState.player.beaconOfHopeActive = false;
    gameState.player.defensivePrayerActive = false;
    gameState.player.lastHealed = 0;
    gameState.player.damageTakenThisTurn = 0;
    gameState.player.ac = 18;
    
    gameState.boss.hp = 145;
    gameState.boss.phase = 1;
    gameState.boss.status = [];
    gameState.boss.position = { x: 5, y: 2 };
    
    Object.keys(gameState.boss.abilities).forEach(key => {
        gameState.boss.abilities[key].cooldown = 0;
    });
    
    gameState.turn = 1;
    gameState.isPlayerTurn = true;
    gameState.combatStats = {
        turnsUsed: 0,
        damageDealt: 0,
        damageTaken: 0,
        spellsCast: 0,
        channelDivinityUsed: 0
    };
    gameState.gameStarted = false;
    gameState.gameOver = false;
    
    // Resetear UI
    document.getElementById("victory-modal").classList.remove("active");
    document.getElementById("defeat-modal").classList.remove("active");
    document.getElementById("combat-log").innerHTML = '<div class="log-entry narrative">El combate comienza...</div>';
    
    // Mostrar pantalla de inicio
    document.getElementById("game-container").style.display = "none";
    document.getElementById("start-screen").style.display = "flex";
    
    updateUI();
}

function selectTarget(target) {
    gameState.selectedTarget = target;
    const targetName = target === 'boss' ? "El Obispo de Ceniza" : target;
    document.getElementById("selected-target").innerHTML = `<span style="color: #c9a227;">${targetName}</span>`;
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
    generateGrid();
    updateUI();
});
