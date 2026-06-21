/**
 * SOMBRAS DISONANTES - UI Controller
 * 
 * Maneja la interfaz de usuario, actualizaciones del DOM,
 * eventos y visualización del estado de combate.
 */

class CombatUI {
    constructor() {
        this.combatEngine = null;
        this.updateInterval = null;
        this.initializeUI();
    }
    
    /**
     * Inicializar la interfaz de usuario
     */
    initializeUI() {
        // Screen elements
        this.introScreen = document.getElementById('introScreen');
        this.combatScreen = document.getElementById('combatScreen');
        this.victoryScreen = document.getElementById('victoryScreen');
        this.defeatScreen = document.getElementById('defeatScreen');
        
        // Button event listeners
        document.getElementById('startCombatBtn').addEventListener('click', () => this.startCombat());
        document.getElementById('victoryRestartBtn').addEventListener('click', () => this.restartCombat());
        document.getElementById('defeatRestartBtn').addEventListener('click', () => this.restartCombat());
        
        // Action buttons
        document.getElementById('meleeAttackBtn').addEventListener('click', () => this.handlePlayerAction('melee_attack'));
        document.getElementById('rangedAttackBtn').addEventListener('click', () => this.handlePlayerAction('ranged_attack'));
        document.getElementById('dodgeBtn').addEventListener('click', () => this.handlePlayerAction('dodge'));
        document.getElementById('retreatBtn').addEventListener('click', () => this.handlePlayerAction('retreat'));
        document.getElementById('prepareActionBtn').addEventListener('click', () => this.handlePlayerAction('prepare_action'));
        document.getElementById('secondWindBtn').addEventListener('click', () => this.handleSecondWind());
        document.getElementById('actionSurgeBtn').addEventListener('click', () => this.handleActionSurge());
        
        // Spell buttons
        document.getElementById('magicMissileBtn').addEventListener('click', () => this.handleSpell('magic_missile'));
        document.getElementById('shieldBtn').addEventListener('click', () => this.handleSpell('shield'));
        document.getElementById('absorbElementsBtn').addEventListener('click', () => this.handleSpell('absorb_elements'));
        document.getElementById('frostRayBtn').addEventListener('click', () => this.handleSpell('frost_ray'));
        document.getElementById('fireBoltBtn').addEventListener('click', () => this.handleSpell('fire_bolt'));
        document.getElementById('shockingGraspBtn').addEventListener('click', () => this.handleSpell('shocking_grasp'));
        
        // End turn button
        document.getElementById('endTurnBtn').addEventListener('click', () => this.endTurn());
        
        // Dice buttons
        document.querySelectorAll('.dice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const diceType = e.target.dataset.dice;
                this.rollDice(diceType);
            });
        });
        
        // Expose functions for combat engine
        window.showVictoryScreen = () => this.showVictoryScreen();
        window.showDefeatScreen = () => this.showDefeatScreen();
    }
    
    /**
     * Iniciar combate
     */
    startCombat() {
        this.introScreen.classList.add('hidden');
        this.combatScreen.classList.remove('hidden');
        
        this.combatEngine = new CombatEngine(ADVENTURE_CONFIG);
        
        // Start update loop
        this.startUpdateLoop();
        
        // Initial UI update
        this.updateUI();
    }
    
    /**
     * Reiniciar combate
     */
    restartCombat() {
        this.victoryScreen.classList.add('hidden');
        this.defeatScreen.classList.add('hidden');
        this.introScreen.classList.remove('hidden');
        this.combatScreen.classList.add('hidden');
        
        if (this.combatEngine) {
            this.combatEngine.restartCombat();
        }
        
        // Clear combat log
        const combatLog = document.getElementById('combatLog');
        combatLog.innerHTML = '';
    }
    
    /**
     * Iniciar bucle de actualización
     */
    startUpdateLoop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        this.updateInterval = setInterval(() => {
            if (this.combatEngine && !this.combatEngine.state.combatEnded) {
                this.updateUI();
            }
        }, 500);
    }
    
    /**
     * Actualizar toda la interfaz
     */
    updateUI() {
        if (!this.combatEngine) return;
        
        const state = this.combatEngine.getState();
        
        this.updateCombatHeader(state);
        this.updatePlayerPanel(state);
        this.updateEnemyPanel(state);
        this.updateCombatLog(state);
        this.updateActionButtons(state);
        this.updateEchoPanel(state);
    }
    
    /**
     * Actualizar encabezado de combate
     */
    updateCombatHeader(state) {
        document.getElementById('roundCounter').textContent = state.round;
        
        const phaseNames = {
            'phase1': 'Forma Estable',
            'phase2': 'Forma Inestable',
            'phase3': 'Forma Crítica'
        };
        
        const phaseElement = document.getElementById('currentPhase');
        phaseElement.textContent = phaseNames[state.enemy.currentPhase];
        phaseElement.className = `text-blood-red font-semibold phase-badge phase-${state.enemy.currentPhase.replace('phase', '')}`;
        
        const turnElement = document.getElementById('currentTurn');
        turnElement.textContent = state.turn === 'player' ? 'Jugador' : 'Enemigo';
        
        const turnIndicator = document.getElementById('turnIndicator');
        turnIndicator.className = `bg-violet-deep/50 border border-violet-primary/30 px-4 py-2 rounded-lg turn-indicator ${state.turn === 'player' ? 'player-turn' : 'enemy-turn'}`;
    }
    
    /**
     * Actualizar panel del jugador
     */
    updatePlayerPanel(state) {
        // HP
        document.getElementById('playerHP').textContent = state.player.currentHP;
        const hpBar = document.getElementById('playerHPBar');
        hpBar.style.width = `${state.playerHPPercent}%`;
        
        if (state.playerHPPercent <= 25) {
            hpBar.classList.add('hp-bar-critical');
        } else {
            hpBar.classList.remove('hp-bar-critical');
        }
        
        // Resources
        document.getElementById('secondWindCounter').textContent = `${state.player.currentResources.secondWind}/1`;
        document.getElementById('actionSurgeCounter').textContent = `${state.player.currentResources.actionSurge}/1`;
        
        // Spell slots
        document.getElementById('spellSlots1').textContent = state.player.currentResources.spellSlots.level1;
        document.getElementById('spellSlots2').textContent = state.player.currentResources.spellSlots.level2;
        document.getElementById('spellSlots3').textContent = state.player.currentResources.spellSlots.level3;
        document.getElementById('spellSlots4').textContent = state.player.currentResources.spellSlots.level4;
        
        // Conditions
        this.updateConditions('player', state.player.conditions);
    }
    
    /**
     * Actualizar panel del enemigo
     */
    updateEnemyPanel(state) {
        // HP
        document.getElementById('enemyHP').textContent = state.enemy.currentHP;
        const hpBar = document.getElementById('enemyHPBar');
        hpBar.style.width = `${state.enemyHPPercent}%`;
        
        if (state.enemyHPPercent <= 25) {
            hpBar.classList.add('hp-bar-critical');
        } else {
            hpBar.classList.remove('hp-bar-critical');
        }
        
        // Conditions
        this.updateConditions('enemy', state.enemy.conditions);
    }
    
    /**
     * Actualizar condiciones
     */
    updateConditions(target, conditions) {
        const listElement = document.getElementById(`${target}ConditionsList`);
        
        if (conditions.length === 0) {
            listElement.innerHTML = '<span class="text-silver-muted text-sm italic">Ninguno</span>';
            return;
        }
        
        listElement.innerHTML = conditions.map(condition => {
            return `<span class="condition-badge ${condition.id}">${condition.name} (${condition.duration})</span>`;
        }).join('');
    }
    
    /**
     * Actualizar panel de ecos
     */
    updateEchoPanel(state) {
        const echoSection = document.getElementById('echoSection');
        const echoList = document.getElementById('echoList');
        
        if (state.echoes.length === 0) {
            echoSection.classList.add('hidden');
            return;
        }
        
        echoSection.classList.remove('hidden');
        
        echoList.innerHTML = state.echoes.map(echo => {
            const hpPercent = (echo.currentHP / echo.maxHP) * 100;
            return `
                <div class="echo-card">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-sm text-blood-red">Eco Sombrío</span>
                        <span class="text-xs text-silver-muted">${echo.currentHP}/${echo.maxHP} HP</span>
                    </div>
                    <div class="w-full bg-bg-panel rounded-full h-2">
                        <div class="bg-gradient-to-r from-blood-red to-violet-deep h-2 rounded-full" style="width: ${hpPercent}%"></div>
                    </div>
                    <div class="text-xs text-silver-muted mt-1">Duración: ${echo.duration} turnos</div>
                </div>
            `;
        }).join('');
    }
    
    /**
     * Actualizar log de combate
     */
    updateCombatLog(state) {
        const combatLog = document.getElementById('combatLog');
        const currentEntries = combatLog.children.length;
        const newEntries = state.combatLog.length - currentEntries;
        
        if (newEntries > 0) {
            for (let i = currentEntries; i < state.combatLog.length; i++) {
                const entry = state.combatLog[i];
                const logEntry = document.createElement('div');
                logEntry.className = `log-entry log-entry-${entry.type}`;
                logEntry.innerHTML = `
                    <span class="text-violet-bright">[R${entry.round}]</span> ${entry.message}
                `;
                combatLog.appendChild(logEntry);
            }
            
            // Auto scroll to bottom
            combatLog.scrollTop = combatLog.scrollHeight;
        }
    }
    
    /**
     * Actualizar botones de acción
     */
    updateActionButtons(state) {
        const isPlayerTurn = state.turn === 'player';
        const buttons = document.querySelectorAll('.combat-btn');
        
        buttons.forEach(btn => {
            if (btn.id === 'endTurnBtn') return;
            btn.disabled = !isPlayerTurn;
        });
        
        // Update end turn button - only enable during player turn
        const endTurnBtn = document.getElementById('endTurnBtn');
        if (endTurnBtn) {
            endTurnBtn.disabled = !isPlayerTurn;
        }
        
        // Update resource buttons
        const secondWindBtn = document.getElementById('secondWindBtn');
        secondWindBtn.disabled = !isPlayerTurn || state.player.currentResources.secondWind <= 0;
        
        const actionSurgeBtn = document.getElementById('actionSurgeBtn');
        actionSurgeBtn.disabled = !isPlayerTurn || state.player.currentResources.actionSurge <= 0;
        
        // Update spell buttons based on available slots
        this.updateSpellButtons(state);
    }
    
    /**
     * Actualizar botones de conjuros
     */
    updateSpellButtons(state) {
        const spellSlots = state.player.currentResources.spellSlots;
        
        const spellLevels = {
            'magicMissileBtn': 1,
            'shieldBtn': 1,
            'absorbElementsBtn': 3,
            'frostRayBtn': 2,
            'fireBoltBtn': 0,
            'shockingGraspBtn': 0
        };
        
        for (const [btnId, level] of Object.entries(spellLevels)) {
            const btn = document.getElementById(btnId);
            if (level > 0) {
                const slotKey = `level${level}`;
                btn.disabled = !this.isPlayerTurn() || spellSlots[slotKey] <= 0;
            } else {
                btn.disabled = !this.isPlayerTurn();
            }
        }
    }
    
    /**
     * Verificar si es turno del jugador
     */
    isPlayerTurn() {
        return this.combatEngine && this.combatEngine.state.turn === 'player';
    }
    
    /**
     * Manejar acción del jugador
     */
    handlePlayerAction(actionId) {
        if (!this.combatEngine || !this.isPlayerTurn()) return;
        
        const result = this.combatEngine.playerAction(actionId);
        
        if (result.success) {
            this.updateUI();
        }
    }
    
    /**
     * Manejar Segundo Aliento
     */
    handleSecondWind() {
        if (!this.combatEngine || !this.isPlayerTurn()) return;
        
        const result = this.combatEngine.useSecondWind();
        
        if (result.success) {
            this.updateUI();
        } else {
            this.showAlert(result.message);
        }
    }
    
    /**
     * Manejar Acción Adicional
     */
    handleActionSurge() {
        if (!this.combatEngine || !this.isPlayerTurn()) return;
        
        const result = this.combatEngine.useActionSurge();
        
        if (result.success) {
            this.updateUI();
        } else {
            this.showAlert(result.message);
        }
    }
    
    /**
     * Manejar lanzamiento de conjuro
     */
    handleSpell(spellId) {
        if (!this.combatEngine || !this.isPlayerTurn()) return;
        
        const result = this.combatEngine.castSpell(spellId);
        
        if (result.success) {
            this.updateUI();
        } else {
            this.showAlert(result.message);
        }
    }
    
    /**
     * Finalizar turno
     */
    endTurn() {
        if (!this.combatEngine || !this.isPlayerTurn()) return;
        
        this.combatEngine.endPlayerTurn();
        this.updateUI();
    }
    
    /**
     * Tirar dado
     */
    rollDice(diceType) {
        if (!this.combatEngine) return;
        
        const result = this.combatEngine.rollDice(diceType);
        
        const diceResult = document.getElementById('diceResult');
        diceResult.innerHTML = `
            <div class="dice-result ${result.critical ? 'dice-critical' : result.fumble ? 'dice-failure' : ''}">
                ${result.used === 'advantage' ? 'Ventaja: ' : result.used === 'disadvantage' ? 'Desventaja: ' : ''}${result.total}
                <span class="text-sm text-silver-muted">(${result.roll1}${result.used !== 'normal' ? `, ${result.roll2}` : ''}${result.modifier !== 0 ? (result.modifier > 0 ? '+' : '') + result.modifier : ''})</span>
            </div>
        `;
        
        // Add to combat log
        this.combatEngine.logCombat('system', `Tirada de ${diceType}: ${result.total}`);
        this.updateUI();
    }
    
    /**
     * Mostrar pantalla de victoria
     */
    showVictoryScreen() {
        this.combatScreen.classList.add('hidden');
        this.victoryScreen.classList.remove('hidden');
        
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
    
    /**
     * Mostrar pantalla de derrota
     */
    showDefeatScreen() {
        this.combatScreen.classList.add('hidden');
        this.defeatScreen.classList.remove('hidden');
        
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
    
    /**
     * Mostrar alerta
     */
    showAlert(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-bg-card border border-violet-primary/30 rounded-lg p-4 shadow-lg z-50';
        toast.innerHTML = `
            <p class="text-silver-soft">${message}</p>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.combatUI = new CombatUI();
});
