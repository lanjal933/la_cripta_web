/**
 * SOMBRAS DISONANTES - Combat Engine
 * 
 * Motor de combate completo para cámaras de combate individuales.
 * Maneja turnos, daño, estados, recursos y lógica de combate.
 */

class CombatEngine {
    constructor(config) {
        this.config = config;
        this.state = {
            combatStarted: false,
            combatEnded: false,
            round: 1,
            turn: 'player', // 'player' or 'enemy'
            player: null,
            enemy: null,
            echoes: [],
            combatLog: [],
            diceHistory: []
        };
        
        this.initializeCombat();
    }
    
    /**
     * Inicializa el combate con los datos configurados
     */
    initializeCombat() {
        const playerClass = PLAYER_CLASSES.guerrero_arcano_nivel_7;
        const enemyData = ENEMIES.fragmento_sombra;
        
        this.state.player = {
            ...playerClass,
            currentHP: playerClass.hitPoints,
            maxHP: playerClass.hitPoints,
            currentResources: {
                secondWind: playerClass.resources.secondWind.uses,
                actionSurge: playerClass.resources.actionSurge.uses,
                spellSlots: { ...playerClass.resources.spellSlots }
            },
            conditions: [],
            position: 'close'
        };
        
        this.state.enemy = {
            ...enemyData,
            currentHP: enemyData.hitPoints,
            maxHP: enemyData.hitPoints,
            currentPhase: 'phase1',
            conditions: [],
            cooldowns: {},
            position: 'close'
        };
        
        this.state.combatStarted = true;
        this.logCombat('system', 'El combate comienza. Ronda 1.');
    }
    
    /**
     * Sistema de dados
     */
    rollDice(diceType, modifier = 0, advantage = false, disadvantage = false) {
        const diceMap = {
            'd4': 4,
            'd6': 6,
            'd8': 8,
            'd10': 10,
            'd12': 12,
            'd20': 20,
            'd100': 100
        };
        
        const sides = diceMap[diceType] || 20;
        let roll1 = Math.floor(Math.random() * sides) + 1;
        let roll2 = Math.floor(Math.random() * sides) + 1;
        
        let finalRoll = roll1;
        let rollDetails = { diceType, roll1, roll2, modifier, advantage, disadvantage };
        
        if (advantage && !disadvantage) {
            finalRoll = Math.max(roll1, roll2);
            rollDetails.used = 'advantage';
        } else if (disadvantage && !advantage) {
            finalRoll = Math.min(roll1, roll2);
            rollDetails.used = 'disadvantage';
        } else {
            rollDetails.used = 'normal';
        }
        
        const total = finalRoll + modifier;
        rollDetails.total = total;
        
        // Check for critical
        if (diceType === 'd20') {
            if (finalRoll === 20) {
                rollDetails.critical = true;
            } else if (finalRoll === 1) {
                rollDetails.fumble = true;
            }
        }
        
        this.state.diceHistory.push(rollDetails);
        return rollDetails;
    }
    
    /**
     * Calcular daño
     */
    calculateDamage(damageString, multiplier = 1) {
        const diceRegex = /(\d+)d(\d+)/g;
        let totalDamage = 0;
        let damageBreakdown = [];
        
        let match;
        while ((match = diceRegex.exec(damageString)) !== null) {
            const count = parseInt(match[1]);
            const sides = parseInt(match[2]);
            
            for (let i = 0; i < count; i++) {
                const roll = Math.floor(Math.random() * sides) + 1;
                totalDamage += roll;
                damageBreakdown.push(roll);
            }
        }
        
        // Add static modifier if present
        const modifierMatch = damageString.match(/([+-]\d+)$/);
        if (modifierMatch) {
            const modifier = parseInt(modifierMatch[1]);
            totalDamage += modifier;
        }
        
        totalDamage = Math.floor(totalDamage * multiplier);
        
        return {
            total: totalDamage,
            breakdown: damageBreakdown,
            multiplier: multiplier
        };
    }
    
    /**
     * Aplicar daño a un objetivo
     */
    applyDamage(target, damage, damageType, source) {
        const isPlayer = target === 'player';
        const targetEntity = isPlayer ? this.state.player : this.state.enemy;
        
        // Check resistances/immunities
        let finalDamage = damage;
        if (isPlayer) {
            // Player doesn't have special resistances in this implementation
        } else {
            if (this.state.enemy.immunities && this.state.enemy.immunities.includes(damageType)) {
                finalDamage = 0;
                this.logCombat('system', `¡El enemigo es inmune a ${damageType}!`);
            } else if (this.state.enemy.resistances && this.state.enemy.resistances.includes(damageType)) {
                finalDamage = Math.floor(damage / 2);
                this.logCombat('system', `El enemigo resiste ${damageType}. Daño reducido a la mitad.`);
            } else if (this.state.enemy.vulnerabilities && this.state.enemy.vulnerabilities.includes(damageType)) {
                finalDamage = damage * 2;
                this.logCombat('system', `¡El enemigo es vulnerable a ${damageType}! Daño duplicado.`);
            }
        }
        
        // Apply damage
        targetEntity.currentHP = Math.max(0, targetEntity.currentHP - finalDamage);
        
        // Log the damage
        const logType = isPlayer ? 'damage' : 'enemy';
        this.logCombat(logType, `${source} inflige ${finalDamage} de daño ${damageType} a ${isPlayer ? 'el jugador' : 'el Fragmento de Sombra'}.`);
        
        // Check for death
        if (targetEntity.currentHP <= 0) {
            this.handleDeath(target);
        }
        
        return finalDamage;
    }
    
    /**
     * Aplicar curación
     */
    applyHeal(target, healAmount, source) {
        const isPlayer = target === 'player';
        const targetEntity = isPlayer ? this.state.player : this.state.enemy;
        
        const oldHP = targetEntity.currentHP;
        targetEntity.currentHP = Math.min(targetEntity.maxHP, targetEntity.currentHP + healAmount);
        const actualHeal = targetEntity.currentHP - oldHP;
        
        this.logCombat('heal', `${source} cura ${actualHeal} HP a ${isPlayer ? 'el jugador' : 'el enemigo'}.`);
        
        return actualHeal;
    }
    
    /**
     * Manejar la muerte de un combatiente
     */
    handleDeath(target) {
        if (target === 'player') {
            this.state.combatEnded = true;
            this.logCombat('system', 'El jugador ha caído. Las sombras consumen la cámara ritual...');
            setTimeout(() => {
                this.triggerDefeat();
            }, 2000);
        } else {
            this.state.combatEnded = true;
            this.logCombat('system', '¡El Fragmento de Sombra ha sido derrotado!');
            setTimeout(() => {
                this.triggerVictory();
            }, 2000);
        }
    }
    
    /**
     * Añadir condición a un objetivo
     */
    addCondition(target, conditionId) {
        const isPlayer = target === 'player';
        const targetEntity = isPlayer ? this.state.player : this.state.enemy;
        const condition = CONDITIONS[conditionId];
        
        if (!condition) return;
        
        // Check if already has condition and not stackable
        if (!condition.stackable) {
            const existing = targetEntity.conditions.find(c => c.id === conditionId);
            if (existing) {
                existing.duration = condition.duration; // Reset duration
                this.logCombat('system', `${condition.name} renovado en ${isPlayer ? 'el jugador' : 'el enemigo'}.`);
                return;
            }
        }
        
        targetEntity.conditions.push({
            id: condition.id,
            name: condition.name,
            effect: condition.effect,
            duration: condition.duration,
            stackable: condition.stackable
        });
        
        this.logCombat('system', `${condition.name} aplicado a ${isPlayer ? 'el jugador' : 'el enemigo'}.`);
    }
    
    /**
     * Remover condición
     */
    removeCondition(target, conditionId) {
        const isPlayer = target === 'player';
        const targetEntity = isPlayer ? this.state.player : this.state.enemy;
        
        const index = targetEntity.conditions.findIndex(c => c.id === conditionId);
        if (index !== -1) {
            const condition = targetEntity.conditions[index];
            targetEntity.conditions.splice(index, 1);
            this.logCombat('system', `${condition.name} removido de ${isPlayer ? 'el jugador' : 'el enemigo'}.`);
        }
    }
    
    /**
     * Procesar condiciones al inicio de turno
     */
    processConditions(target) {
        const isPlayer = target === 'player';
        const targetEntity = isPlayer ? this.state.player : this.state.enemy;
        
        // Process each condition
        for (let i = targetEntity.conditions.length - 1; i >= 0; i--) {
            const condition = targetEntity.conditions[i];
            
            // Apply condition effects
            if (condition.id === 'burning') {
                const damage = this.calculateDamage('1d6').total;
                this.applyDamage(target, damage, 'fuego', condition.name);
            }
            
            // Decrease duration
            condition.duration--;
            
            // Remove if expired
            if (condition.duration <= 0) {
                targetEntity.conditions.splice(i, 1);
                this.logCombat('system', `${condition.name} ha expirado en ${isPlayer ? 'el jugador' : 'el enemigo'}.`);
            }
        }
    }
    
    /**
     * Acciones del jugador
     */
    playerAction(actionId) {
        if (this.state.turn !== 'player' || this.state.combatEnded) {
            return { success: false, message: 'No es tu turno' };
        }
        
        const action = this.state.player.actions[actionId];
        if (!action) {
            return { success: false, message: 'Acción no encontrada' };
        }
        
        let result = { success: true, message: '' };
        
        switch (actionId) {
            case 'melee_attack':
                result = this.handleMeleeAttack();
                break;
            case 'ranged_attack':
                result = this.handleRangedAttack();
                break;
            case 'dodge':
                result = this.handleDodge();
                break;
            case 'retreat':
                result = this.handleRetreat();
                break;
            case 'prepare_action':
                result = this.handlePrepareAction();
                break;
            default:
                result = { success: false, message: 'Acción no implementada' };
        }
        
        return result;
    }
    
    /**
     * Manejar ataque melee
     */
    handleMeleeAttack() {
        const toHit = this.rollDice('d20', 6); // +6 from stats
        const enemyAC = this.state.enemy.armorClass;
        
        this.logCombat('player', `Ataque cuerpo a cuerpo. Tirada: ${toHit.total} vs CA ${enemyAC}`);
        
        if (toHit.total >= enemyAC || toHit.critical) {
            const damage = this.calculateDamage('1d8 + 3', toHit.critical ? 2 : 1);
            const actualDamage = this.applyDamage('enemy', damage.total, 'cortante', 'Ataque melee');
            
            if (toHit.critical) {
                this.logCombat('critical', '¡GOLPE CRÍTICO! Daño duplicado.');
            }
            
            return { success: true, damage: actualDamage, critical: toHit.critical };
        } else {
            this.logCombat('player', 'El ataque falla.');
            return { success: true, hit: false };
        }
    }
    
    /**
     * Manejar ataque a distancia
     */
    handleRangedAttack() {
        const toHit = this.rollDice('d20', 5); // +5 from stats
        const enemyAC = this.state.enemy.armorClass;
        
        this.logCombat('player', `Ataque a distancia. Tirada: ${toHit.total} vs CA ${enemyAC}`);
        
        if (toHit.total >= enemyAC || toHit.critical) {
            const damage = this.calculateDamage('1d8 + 3', toHit.critical ? 2 : 1);
            const actualDamage = this.applyDamage('enemy', damage.total, 'perforante', 'Ataque a distancia');
            
            if (toHit.critical) {
                this.logCombat('critical', '¡GOLPE CRÍTICO! Daño duplicado.');
            }
            
            return { success: true, damage: actualDamage, critical: toHit.critical };
        } else {
            this.logCombat('player', 'El ataque falla.');
            return { success: true, hit: false };
        }
    }
    
    /**
     * Manejar esquivar
     */
    handleDodge() {
        this.addCondition('player', 'dodging');
        this.logCombat('player', 'El jugador esquiva, ganando CA +2 y ventaja en salvaciones.');
        return { success: true };
    }
    
    /**
     * Manejar retirada
     */
    handleRetreat() {
        this.state.player.position = 'far';
        this.logCombat('player', 'El jugador se retira, aumentando la distancia.');
        return { success: true };
    }
    
    /**
     * Manejar preparar acción
     */
    handlePrepareAction() {
        this.logCombat('player', 'El jugador prepara una acción reactiva.');
        return { success: true };
    }
    
    /**
     * Usar recurso (Segundo Aliento)
     */
    useSecondWind() {
        if (this.state.player.currentResources.secondWind <= 0) {
            return { success: false, message: 'No usos restantes de Segundo Aliento' };
        }
        
        const heal = this.calculateDamage('1d10 + 7').total;
        this.applyHeal('player', heal, 'Segundo Aliento');
        
        this.state.player.currentResources.secondWind--;
        this.logCombat('player', 'Segundo Aliento utilizado.');
        
        return { success: true, heal: heal };
    }
    
    /**
     * Usar Acción Adicional
     */
    useActionSurge() {
        if (this.state.player.currentResources.actionSurge <= 0) {
            return { success: false, message: 'No usos restantes de Acción Adicional' };
        }
        
        this.state.player.currentResources.actionSurge--;
        this.logCombat('player', 'Acción Adicional activada. Puedes realizar otra acción este turno.');
        
        return { success: true };
    }
    
    /**
     * Lanzar conjuro
     */
    castSpell(spellId) {
        if (this.state.turn !== 'player' || this.state.combatEnded) {
            return { success: false, message: 'No es tu turno' };
        }
        
        const spell = this.state.player.spells[spellId];
        if (!spell) {
            return { success: false, message: 'Conjuro no encontrado' };
        }
        
        // Check spell slot availability
        if (spell.slotLevel > 0) {
            const slotKey = `level${spell.slotLevel}`;
            if (this.state.player.currentResources.spellSlots[slotKey] <= 0) {
                return { success: false, message: `No hay espacios de conjuro nivel ${spell.slotLevel}` };
            }
            this.state.player.currentResources.spellSlots[slotKey]--;
        }
        
        let result = { success: true, message: '' };
        
        switch (spellId) {
            case 'magic_missile':
                result = this.handleMagicMissile();
                break;
            case 'shield':
                result = this.handleShield();
                break;
            case 'absorb_elements':
                result = this.handleAbsorbElements();
                break;
            case 'frost_ray':
                result = this.handleFrostRay();
                break;
            case 'fire_bolt':
                result = this.handleFireBolt();
                break;
            case 'shocking_grasp':
                result = this.handleShockingGrasp();
                break;
            default:
                result = { success: false, message: 'Conjuro no implementado' };
        }
        
        return result;
    }
    
    /**
     * Proyectil Mágico
     */
    handleMagicMissile() {
        const damage = this.calculateDamage('3d4').total;
        const actualDamage = this.applyDamage('enemy', damage, 'fuerza', 'Proyectil Mágico');
        this.logCombat('player', 'Proyectil Mágico lanzado. 3 proyectiles que siempre aciertan.');
        return { success: true, damage: actualDamage };
    }
    
    /**
     * Escudo
     */
    handleShield() {
        this.addCondition('player', 'shielded');
        this.logCombat('player', 'Escudo activado. CA +5 hasta el inicio del próximo turno.');
        return { success: true };
    }
    
    /**
     * Absorber Elementos
     */
    handleAbsorbElements() {
        this.addCondition('player', 'shielded');
        this.logCombat('player', 'Absorber Elementos activado. Resistencia elemental activa.');
        return { success: true };
    }
    
    /**
     * Rayo de Escarcha
     */
    handleFrostRay() {
        const saveDC = 15;
        const enemySave = this.rollDice('d20', this.state.enemy.stats.dexterity);
        
        this.logCombat('player', `Rayo de Escarcha. Salvación de Destreza DC ${saveDC}: ${enemySave.total}`);
        
        if (enemySave.total < saveDC) {
            const damage = this.calculateDamage('4d8').total;
            const actualDamage = this.applyDamage('enemy', damage, 'frío', 'Rayo de Escarcha');
            this.addCondition('enemy', 'slowed');
            return { success: true, damage: actualDamage, slowed: true };
        } else {
            const damage = this.calculateDamage('2d8').total;
            const actualDamage = this.applyDamage('enemy', damage, 'frío', 'Rayo de Escarcha');
            return { success: true, damage: actualDamage, slowed: false };
        }
    }
    
    /**
     * Descarga de Fuego
     */
    handleFireBolt() {
        const toHit = this.rollDice('d20', 5);
        const enemyAC = this.state.enemy.armorClass;
        
        this.logCombat('player', `Descarga de Fuego. Tirada: ${toHit.total} vs CA ${enemyAC}`);
        
        if (toHit.total >= enemyAC || toHit.critical) {
            const damage = this.calculateDamage('2d10', toHit.critical ? 2 : 1);
            const actualDamage = this.applyDamage('enemy', damage.total, 'fuego', 'Descarga de Fuego');
            
            if (toHit.critical) {
                this.logCombat('critical', '¡GOLPE CRÍTICO! Daño duplicado.');
            }
            
            return { success: true, damage: actualDamage, critical: toHit.critical };
        } else {
            this.logCombat('player', 'El conjuro falla.');
            return { success: true, hit: false };
        }
    }
    
    /**
     * Toque Electrizante
     */
    handleShockingGrasp() {
        const toHit = this.rollDice('d20', 6, this.state.player.position === 'close'); // Advantage if close
        const enemyAC = this.state.enemy.armorClass;
        
        this.logCombat('player', `Toque Electrizante. Tirada: ${toHit.total} vs CA ${enemyAC}`);
        
        if (toHit.total >= enemyAC || toHit.critical) {
            const damage = this.calculateDamage('3d6', toHit.critical ? 2 : 1);
            const actualDamage = this.applyDamage('enemy', damage.total, 'eléctrico', 'Toque Electrizante');
            
            if (toHit.critical) {
                this.logCombat('critical', '¡GOLPE CRÍTICO! Daño duplicado.');
            }
            
            return { success: true, damage: actualDamage, critical: toHit.critical };
        } else {
            this.logCombat('player', 'El conjuro falla.');
            return { success: true, hit: false };
        }
    }
    
    /**
     * Finalizar turno del jugador
     */
    endPlayerTurn() {
        if (this.state.turn !== 'player') return;
        
        // Process conditions
        this.processConditions('player');
        
        // Remove shield condition
        this.removeCondition('player', 'shielded');
        
        // Switch to enemy turn
        this.state.turn = 'enemy';
        this.logCombat('system', 'Turno del enemigo.');
        
        // Trigger enemy AI
        setTimeout(() => {
            this.enemyTurn();
        }, 1000);
    }
    
    /**
     * Turno del enemigo (delegado a AI)
     */
    enemyTurn() {
        if (this.state.combatEnded) return;
        
        // Process conditions
        this.processConditions('enemy');
        
        // Update enemy phase based on HP
        this.updateEnemyPhase();
        
        // Delegate to AI
        const ai = new EnemyAI(this);
        ai.executeTurn();
    }
    
    /**
     * Actualizar fase del enemigo
     */
    updateEnemyPhase() {
        const hpPercent = this.state.enemy.currentHP / this.state.enemy.maxHP;
        const phases = this.state.enemy.phases;
        
        let newPhase = this.state.enemy.currentPhase;
        
        if (hpPercent <= 0.24) {
            newPhase = 'phase3';
        } else if (hpPercent <= 0.59) {
            newPhase = 'phase2';
        } else {
            newPhase = 'phase1';
        }
        
        if (newPhase !== this.state.enemy.currentPhase) {
            this.state.enemy.currentPhase = newPhase;
            const phaseName = phases[newPhase].name;
            this.logCombat('system', `¡El Fragmento de Sombra entra en ${phaseName}!`);
            
            // Apply phase modifiers
            if (newPhase === 'phase3' && phases[newPhase].modifiers) {
                this.logCombat('system', 'El enemigo se vuelve más agresivo pero menos defensivo.');
            }
        }
    }
    
    /**
     * Finalizar turno del enemigo
     */
    endEnemyTurn() {
        if (this.state.combatEnded) return;
        
        // Decrement enemy cooldowns
        for (const [abilityId, cooldown] of Object.entries(this.state.enemy.cooldowns)) {
            if (cooldown > 0) {
                this.state.enemy.cooldowns[abilityId] = cooldown - 1;
            }
        }
        
        // Switch to player turn
        this.state.turn = 'player';
        this.state.round++;
        
        this.logCombat('system', `Fin del turno del enemigo. Ronda ${this.state.round}.`);
        this.logCombat('system', 'Turno del jugador.');
    }
    
    /**
     * Invocar eco sombrío
     */
    summonEcho() {
        if (this.state.echoes.length >= 2) {
            this.logCombat('system', 'Máximo de ecos alcanzados.');
            return;
        }
        
        const echo = {
            ...ENEMIES.eco_sombrio,
            id: `echo_${Date.now()}`,
            currentHP: ENEMIES.eco_sombrio.hitPoints,
            maxHP: ENEMIES.eco_sombrio.hitPoints,
            duration: ENEMIES.eco_sombrio.duration
        };
        
        this.state.echoes.push(echo);
        this.logCombat('enemy', '¡Un Eco Sombrío ha sido invocado!');
    }
    
    /**
     * Acción de eco sombrío
     */
    echoAction(echoId) {
        const echo = this.state.echoes.find(e => e.id === echoId);
        if (!echo) return;
        
        const toHit = this.rollDice('d20', 5);
        const playerAC = this.state.player.armorClass;
        
        this.logCombat('enemy', `Eco Sombrío ataca. Tirada: ${toHit.total} vs CA ${playerAC}`);
        
        if (toHit.total >= playerAC) {
            const damage = this.calculateDamage('1d6 + 2').total;
            this.applyDamage('player', damage, 'necrótico', 'Eco Sombrío');
        } else {
            this.logCombat('enemy', 'El Eco Sombrío falla.');
        }
        
        // Decrease duration
        echo.duration--;
        if (echo.duration <= 0) {
            this.removeEcho(echoId);
        }
    }
    
    /**
     * Remover eco sombrío
     */
    removeEcho(echoId) {
        const index = this.state.echoes.findIndex(e => e.id === echoId);
        if (index !== -1) {
            this.state.echoes.splice(index, 1);
            this.logCombat('system', 'Un Eco Sombrío se disipa.');
        }
    }
    
    /**
     * Registrar en el log de combate
     */
    logCombat(type, message) {
        const entry = {
            type: type,
            message: message,
            round: this.state.round,
            turn: this.state.turn,
            timestamp: new Date().toISOString()
        };
        
        this.state.combatLog.push(entry);
        
        // Keep log size manageable
        if (this.state.combatLog.length > 100) {
            this.state.combatLog.shift();
        }
    }
    
    /**
     * Trigger victoria
     */
    triggerVictory() {
        this.state.combatEnded = true;
        if (typeof window !== 'undefined' && window.showVictoryScreen) {
            window.showVictoryScreen();
        }
    }
    
    /**
     * Trigger derrota
     */
    triggerDefeat() {
        this.state.combatEnded = true;
        if (typeof window !== 'undefined' && window.showDefeatScreen) {
            window.showDefeatScreen();
        }
    }
    
    /**
     * Reiniciar combate
     */
    restartCombat() {
        this.state = {
            combatStarted: false,
            combatEnded: false,
            round: 1,
            turn: 'player',
            player: null,
            enemy: null,
            echoes: [],
            combatLog: [],
            diceHistory: []
        };
        
        this.initializeCombat();
    }
    
    /**
     * Obtener estado actual
     */
    getState() {
        return {
            ...this.state,
            playerHPPercent: (this.state.player.currentHP / this.state.player.maxHP) * 100,
            enemyHPPercent: (this.state.enemy.currentHP / this.state.enemy.maxHP) * 100
        };
    }
}

// ============================================
// ENEMY AI SYSTEM
// ============================================

class EnemyAI {
    constructor(combatEngine) {
        this.engine = combatEngine;
        this.config = ENEMY_AI_CONFIG;
    }
    
    /**
     * Ejecutar turno del enemigo
     */
    executeTurn() {
        const enemy = this.engine.state.enemy;
        const player = this.engine.state.player;
        const phase = enemy.phases[enemy.currentPhase];
        
        // Determine behavior based on priorities
        const behavior = this.determineBehavior(player, enemy);
        
        // Select action based on behavior and phase
        const action = this.selectAction(behavior, phase);
        
        // Execute action
        this.executeAction(action);
        
        // Echo actions
        this.executeEchoActions();
        
        // End turn
        setTimeout(() => {
            this.engine.endEnemyTurn();
        }, 1500);
    }
    
    /**
     * Determinar comportamiento basado en prioridades
     */
    determineBehavior(player, enemy) {
        const playerHPPercent = player.currentHP / player.maxHP;
        const enemyHPPercent = enemy.currentHP / enemy.maxHP;
        const phase = enemy.phases[enemy.currentPhase];
        
        // Check if player is low HP - finisher mode
        if (playerHPPercent <= this.config.priorities.playerLowHP.threshold) {
            return this.config.behaviors.finisher;
        }
        
        // Check if enemy is critical HP - desperate mode
        if (enemyHPPercent <= this.config.priorities.criticalHP.threshold) {
            return this.config.behaviors.desperate;
        }
        
        // Check if enemy is low HP - aggressive mode
        if (enemyHPPercent <= this.config.priorities.lowHP.threshold) {
            return this.config.behaviors.aggressive;
        }
        
        // Use phase behavior
        return this.config.behaviors[phase.behavior] || this.config.behaviors.basic;
    }
    
    /**
     * Seleccionar acción basado en comportamiento y fase
     */
    selectAction(behavior, phase) {
        const availableAbilities = phase.abilities.map(id => this.engine.state.enemy.abilities[id]);
        
        // Filter abilities on cooldown
        const readyAbilities = availableAbilities.filter(ability => {
            const cooldown = this.engine.state.enemy.cooldowns[ability.id];
            if (!cooldown) return true;
            return cooldown <= 0;
        });
        
        if (readyAbilities.length === 0) {
            // Default to basic attack if nothing ready
            return this.engine.state.enemy.abilities.shadow_claw;
        }
        
        // Apply contextual modifiers to weights
        const weights = { ...behavior.actionWeights };
        const player = this.engine.state.player;
        const enemy = this.engine.state.enemy;
        const echoCount = this.engine.state.echoes.length;
        
        // If player is far, prioritize ranged attacks and movement
        if (player.position === 'far') {
            weights.dark_lance = (weights.dark_lance || 0) * 2;
            weights.umbral_slip = (weights.umbral_slip || 0) * 1.5;
            weights.shadow_claw = (weights.shadow_claw || 0) * 0.5;
        }
        
        // If few ecos, prioritize summon abilities
        if (echoCount < this.config.priorities.fewEchos.threshold) {
            weights.summon_echo = (weights.summon_echo || 0) * 2;
            weights.shadow_fragmentation = (weights.shadow_fragmentation || 0) * 1.5;
        }
        
        // If enemy has ecos, prioritize absorption
        if (echoCount > 0) {
            weights.umbral_absorption = (weights.umbral_absorption || 0) * 1.5;
        }
        
        // Normalize weights
        const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
        let random = Math.random() * totalWeight;
        
        for (const [abilityId, weight] of Object.entries(weights)) {
            const ability = readyAbilities.find(a => a.id === abilityId);
            if (ability) {
                random -= weight;
                if (random <= 0) {
                    return ability;
                }
            }
        }
        
        // Fallback to first available
        return readyAbilities[0];
    }
    
    /**
     * Ejecutar acción del enemigo
     */
    executeAction(action) {
        const enemy = this.engine.state.enemy;
        const player = this.engine.state.player;
        
        // Set cooldown
        if (action.cooldown > 0) {
            enemy.cooldowns[action.id] = action.cooldown;
        }
        
        switch (action.id) {
            case 'shadow_claw':
                this.executeShadowClaw(action);
                break;
            case 'dark_lance':
                this.executeDarkLance(action);
                break;
            case 'shadow_explosion':
                this.executeShadowExplosion(action);
                break;
            case 'summon_echo':
                this.executeSummonEcho(action);
                break;
            case 'umbral_slip':
                this.executeUmbralSlip(action);
                break;
            case 'shadow_mantle':
                this.executeShadowMantle(action);
                break;
            case 'shadow_fragmentation':
                this.executeShadowFragmentation(action);
                break;
            case 'void_scream':
                this.executeVoidScream(action);
                break;
            case 'umbral_absorption':
                this.executeUmbralAbsorption(action);
                break;
            default:
                this.engine.logCombat('enemy', `${action.name} no implementado.`);
        }
    }
    
    /**
     * Zarpazo Umbrío
     */
    executeShadowClaw(action) {
        const toHit = this.engine.rollDice('d20', 7);
        const playerAC = this.getPlayerEffectiveAC();
        
        this.engine.logCombat('enemy', `Zarpazo Umbrío. Tirada: ${toHit.total} vs CA ${playerAC}`);
        
        if (toHit.total >= playerAC || toHit.critical) {
            let damage = this.engine.calculateDamage(action.damage, toHit.critical ? 2 : 1);
            const phaseMultiplier = this.getPhaseDamageMultiplier();
            let finalDamage = Math.floor(damage.total * phaseMultiplier);
            
            // Apply void_marked debuff if present
            const voidMarked = this.engine.state.player.conditions.find(c => c.id === 'void_marked');
            if (voidMarked) {
                finalDamage = Math.floor(finalDamage * 0.8); // -20% damage
            }
            
            this.engine.applyDamage('player', finalDamage, action.damageType, action.name);
            
            if (toHit.critical) {
                this.engine.logCombat('critical', '¡GOLPE CRÍTICO del enemigo!');
            }
        } else {
            this.engine.logCombat('enemy', 'El Zarpazo Umbrío falla.');
        }
    }
    
    /**
     * Lanza de Oscuridad
     */
    executeDarkLance(action) {
        const toHit = this.engine.rollDice('d20', 7);
        const playerAC = this.getPlayerEffectiveAC();
        
        this.engine.logCombat('enemy', `Lanza de Oscuridad. Tirada: ${toHit.total} vs CA ${playerAC}`);
        
        if (toHit.total >= playerAC || toHit.critical) {
            let damage = this.engine.calculateDamage(action.damage, toHit.critical ? 2 : 1);
            const phaseMultiplier = this.getPhaseDamageMultiplier();
            let finalDamage = Math.floor(damage.total * phaseMultiplier);
            
            // Apply void_marked debuff if present
            const voidMarked = this.engine.state.player.conditions.find(c => c.id === 'void_marked');
            if (voidMarked) {
                finalDamage = Math.floor(finalDamage * 0.8); // -20% damage
            }
            
            this.engine.applyDamage('player', finalDamage, action.damageType, action.name);
            
            if (toHit.critical) {
                this.engine.logCombat('critical', '¡GOLPE CRÍTICO del enemigo!');
            }
        } else {
            this.engine.logCombat('enemy', 'La Lanza de Oscuridad falla.');
        }
    }
    
    /**
     * Explosión Sombría
     */
    executeShadowExplosion(action) {
        const saveDC = 15;
        const playerSave = this.engine.rollDice('d20', this.engine.state.player.stats.dexterity);
        
        this.engine.logCombat('enemy', `Explosión Sombría. Salvación de Destreza DC ${saveDC}: ${playerSave.total}`);
        
        let damage;
        if (playerSave.total < saveDC) {
            damage = this.engine.calculateDamage(action.damage).total;
            this.engine.logCombat('enemy', '¡Salvación fallada! Daño completo.');
        } else {
            damage = Math.floor(this.engine.calculateDamage(action.damage).total / 2);
            this.engine.logCombat('enemy', 'Salvación exitosa. Daño reducido a la mitad.');
        }
        
        const phaseMultiplier = this.getPhaseDamageMultiplier();
        let finalDamage = Math.floor(damage * phaseMultiplier);
        
        // Apply void_marked debuff if present
        const voidMarked = this.engine.state.player.conditions.find(c => c.id === 'void_marked');
        if (voidMarked) {
            finalDamage = Math.floor(finalDamage * 0.8); // -20% damage
        }
        
        this.engine.applyDamage('player', finalDamage, action.damageType, action.name);
    }
    
    /**
     * Invocar Eco Sombrío
     */
    executeSummonEcho(action) {
        this.engine.summonEcho();
    }
    
    /**
     * Deslizamiento Umbral
     */
    executeUmbralSlip(action) {
        this.engine.state.enemy.position = 'close';
        this.engine.logCombat('enemy', 'El Fragmento de Sombra se desliza por las sombras, acercándose sin provocar ataques de oportunidad.');
    }
    
    /**
     * Manto de Penumbra
     */
    executeShadowMantle(action) {
        this.engine.addCondition('enemy', 'shadow_enhanced');
        this.engine.logCombat('enemy', 'El Fragmento de Sombra se envuelve en penumbra, aumentando su defensa.');
    }
    
    /**
     * Fragmentación Sombría
     */
    executeShadowFragmentation(action) {
        if (this.engine.state.enemy.currentHP <= action.selfDamage) {
            this.engine.logCombat('enemy', 'El Fragmento de Sombra no tiene suficiente HP para fragmentarse.');
            return;
        }
        
        this.engine.applyDamage('enemy', action.selfDamage, 'necrótico', 'Fragmentación Sombría');
        this.engine.summonEcho();
        this.engine.logCombat('enemy', 'El Fragmento de Sombra sacrifica energía para crear un Eco Sombrío.');
    }
    
    /**
     * Grito del Vacío
     */
    executeVoidScream(action) {
        const saveDC = 14;
        const playerSave = this.engine.rollDice('d20', this.engine.state.player.stats.wisdom);
        
        this.engine.logCombat('enemy', `Grito del Vacío. Salvación de Sabiduría DC ${saveDC}: ${playerSave.total}`);
        
        if (playerSave.total < saveDC) {
            this.engine.addCondition('player', 'void_marked');
            this.engine.logCombat('enemy', '¡Salvación fallada! El jugador está marcado por el vacío.');
        } else {
            this.engine.logCombat('enemy', 'Salvación exitosa. El jugador resiste el grito del vacío.');
        }
    }
    
    /**
     * Absorción Umbría
     */
    executeUmbralAbsorption(action) {
        const echoCount = this.engine.state.echoes.length;
        
        if (echoCount === 0) {
            this.engine.logCombat('enemy', 'No hay ecos sombríos para absorber.');
            return;
        }
        
        const healPerEcho = this.engine.calculateDamage('1d8').total;
        const totalHeal = healPerEcho * echoCount;
        
        this.engine.applyHeal('enemy', totalHeal, 'Absorción Umbría');
        
        // Remove one echo
        if (this.engine.state.echoes.length > 0) {
            const echoToRemove = this.engine.state.echoes[0];
            this.engine.removeEcho(echoToRemove.id);
        }
        
        this.engine.logCombat('enemy', `El Fragmento de Sombra absorbe energía de los ecos, recuperando ${totalHeal} HP.`);
    }
    
    /**
     * Ejecutar acciones de ecos
     */
    executeEchoActions() {
        this.engine.state.echoes.forEach(echo => {
            this.engine.echoAction(echo.id);
        });
    }
    
    /**
     * Obtener CA efectiva del jugador (considerando condiciones)
     */
    getPlayerEffectiveAC() {
        let ac = this.engine.state.player.armorClass;
        
        const dodging = this.engine.state.player.conditions.find(c => c.id === 'dodging');
        if (dodging) {
            ac += 2;
        }
        
        const shielded = this.engine.state.player.conditions.find(c => c.id === 'shielded');
        if (shielded) {
            ac += 5;
        }
        
        return ac;
    }
    
    /**
     * Obtener CA efectiva del enemigo (considerando condiciones)
     */
    getEnemyEffectiveAC() {
        let ac = this.engine.state.enemy.armorClass;
        
        const shadowEnhanced = this.engine.state.enemy.conditions.find(c => c.id === 'shadow_enhanced');
        if (shadowEnhanced) {
            ac += 3;
        }
        
        return ac;
    }
    
    /**
     * Obtener multiplicador de daño de fase
     */
    getPhaseDamageMultiplier() {
        const phase = this.engine.state.enemy.phases[this.engine.state.enemy.currentPhase];
        if (phase.modifiers && phase.modifiers.damageMultiplier) {
            return phase.modifiers.damageMultiplier;
        }
        return 1;
    }
    
    /**
     * Decrementar cooldowns
     */
    decrementCooldowns() {
        const enemy = this.engine.state.enemy;
        for (const [abilityId, cooldown] of Object.entries(enemy.cooldowns)) {
            if (cooldown > 0) {
                enemy.cooldowns[abilityId] = cooldown - 1;
            }
        }
    }
}

// Initialize combat engine when DOM is ready
if (typeof window !== 'undefined') {
    window.CombatEngine = CombatEngine;
    window.EnemyAI = EnemyAI;
}
