// Adventure Engine - Sistema de Juegos D&D
class AdventureEngine {
    constructor() {
        this.currentAdventure = null;
        this.currentNode = null;
        this.party = [];
        this.gameState = {};
    }

    escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    formatInline(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>');
    }

    // Parse DSL (Domain Specific Language) para juegos
    parseDSL(text) {
        const rawText = text || '';
        const result = {
            narrative: rawText,
            choices: [],
            dice: [],
            events: [],
            items: [],
            variables: [],
            conditional: { success: [], failure: [] }
        };

        // Parse choices: [Opción](goto:NODE_ID)
        const choiceRegex = /\[([^\]]+)\]\(goto:([^\)]+)\)/g;
        let match;
        while ((match = choiceRegex.exec(rawText)) !== null) {
            result.choices.push({
                text: match[1],
                target: match[2]
            });
        }

        // Parse dice rolls: [dice:XdY+Z]
        const diceRegex = /\[dice:(\d+)d(\d+)([+-]\d+)?\]/g;
        while ((match = diceRegex.exec(rawText)) !== null) {
            result.dice.push({
                count: parseInt(match[1]),
                sides: parseInt(match[2]),
                modifier: match[3] ? parseInt(match[3]) : 0
            });
        }

        // Parse checks: [check:stat dc=X success=Y fail=Z]
        const checkRegex = /\[check:(\w+)\s+dc=(\d+)(?:\s+success=([^\s]+))?(?:\s+fail=([^\s]+))?\]/g;
        while ((match = checkRegex.exec(rawText)) !== null) {
            result.events.push({
                type: 'check',
                stat: match[1],
                dc: parseInt(match[2]),
                successNode: match[3] || null,
                failNode: match[4] || null
            });
        }

        // Parse variables: [set:variable=value]
        const varRegex = /\[set:(\w+)=(\w+)\]/g;
        while ((match = varRegex.exec(rawText)) !== null) {
            result.variables.push({
                name: match[1],
                value: match[2]
            });
        }

        // Parse items: [add_item:item_name]
        const itemRegex = /\[add_item:(\w+)\]/g;
        while ((match = itemRegex.exec(rawText)) !== null) {
            result.items.push({
                name: match[1],
                action: 'add'
            });
        }

        const successRegex = /\[success\]([\s\S]*?)\[\/success\]/g;
        const failureRegex = /\[failure\]([\s\S]*?)\[\/failure\]/g;
        while ((match = successRegex.exec(rawText)) !== null) {
            const content = String(match[1]).trim();
            if (content) result.conditional.success.push(content);
        }
        while ((match = failureRegex.exec(rawText)) !== null) {
            const content = String(match[1]).trim();
            if (content) result.conditional.failure.push(content);
        }

        let cleaned = rawText
            .replace(successRegex, '')
            .replace(failureRegex, '')
            .replace(choiceRegex, '')
            .replace(diceRegex, '')
            .replace(checkRegex, '')
            .replace(varRegex, '')
            .replace(itemRegex, '');

        cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();
        result.narrative = cleaned;

        return result;
    }

    // Render Markdown a HTML
    renderMarkdown(text) {
        const safe = this.escapeHtml(text || '');
        const lines = safe.replace(/\r/g, '').split('\n');
        let html = '';
        let paragraph = [];
        let inList = false;

        const flushParagraph = () => {
            if (!paragraph.length) return;
            html += `<p>${this.formatInline(paragraph.join('<br>'))}</p>`;
            paragraph = [];
        };

        const closeList = () => {
            if (!inList) return;
            html += '</ul>';
            inList = false;
        };

        for (const rawLine of lines) {
            const line = rawLine.trimEnd();
            const trimmed = line.trim();

            if (!trimmed) {
                flushParagraph();
                closeList();
                continue;
            }

            if (/^#{1,3}\s+/.test(trimmed)) {
                flushParagraph();
                closeList();
                const level = trimmed.startsWith('###') ? 3 : trimmed.startsWith('##') ? 2 : 1;
                const content = this.formatInline(trimmed.replace(/^#{1,3}\s+/, ''));
                html += `<h${level}>${content}</h${level}>`;
                continue;
            }

            if (/^[-*_]{3,}$/.test(trimmed)) {
                flushParagraph();
                closeList();
                html += '<hr>';
                continue;
            }

            if (/^>\s+/.test(trimmed)) {
                flushParagraph();
                closeList();
                const content = this.formatInline(trimmed.replace(/^>\s+/, ''));
                html += `<blockquote>${content}</blockquote>`;
                continue;
            }

            if (/^[-*]\s+/.test(trimmed)) {
                flushParagraph();
                if (!inList) {
                    html += '<ul>';
                    inList = true;
                }
                const content = this.formatInline(trimmed.replace(/^[-*]\s+/, ''));
                html += `<li>${content}</li>`;
                continue;
            }

            closeList();
            paragraph.push(trimmed);
        }

        flushParagraph();
        closeList();
        return html;
    }

    // Roll dice
    rollDice(count, sides, modifier = 0) {
        let total = 0;
        const rolls = [];
        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            rolls.push(roll);
            total += roll;
        }
        return {
            total: total + modifier,
            rolls: rolls,
            modifier: modifier
        };
    }

    // Perform skill check
    performCheck(stat, dc, character) {
        const normalized = String(stat || '').toLowerCase();
        const isInfo =
            normalized === 'info' ||
            normalized === 'informacion' ||
            normalized === 'information';
        const raw = !isInfo && character && character.stats ? character.stats[stat] : undefined;
        const statValue = isInfo ? 0 : (typeof raw === 'number' ? raw : 10);
        const roll = Math.floor(Math.random() * 20) + 1;
        const total = roll + statValue;
        
        return {
            success: total >= dc,
            roll: roll,
            stat: statValue,
            total: total,
            dc: dc
        };
    }

    // Load adventure
    loadAdventure(adventure) {
        this.currentAdventure = adventure;
        this.gameState = {};
        this.party = adventure.party || [];
        
        if (adventure.startNodeId) {
            this.goToNode(adventure.startNodeId);
        }
        
        return adventure;
    }

    // Go to specific node
    goToNode(nodeId) {
        if (!this.currentAdventure) return null;
        
        const node = this.currentAdventure.nodes.find(n => n.id === nodeId);
        if (node) {
            this.currentNode = node;
            return node;
        }
        
        return null;
    }

    // Make choice
    makeChoice(choiceIndex) {
        if (!this.currentNode || !this.currentNode.choices) return null;
        
        const choice = this.currentNode.choices[choiceIndex];
        if (choice && choice.target) {
            return this.goToNode(choice.target);
        }
        
        return null;
    }

    // Get current node
    getCurrentNode() {
        return this.currentNode;
    }

    // Get party
    getParty() {
        return this.party;
    }

    // Set game state variable
    setVariable(name, value) {
        this.gameState[name] = value;
    }

    // Get game state variable
    getVariable(name) {
        return this.gameState[name];
    }

    // Check condition
    checkCondition(condition) {
        if (!condition) return true;
        
        const variable = this.getVariable(condition.variable);
        switch (condition.operator) {
            case '==': return variable == condition.value;
            case '!=': return variable != condition.value;
            case '>': return variable > condition.value;
            case '<': return variable < condition.value;
            case '>=': return variable >= condition.value;
            case '<=': return variable <= condition.value;
            default: return true;
        }
    }
}

// Global instance
const adventureEngine = new AdventureEngine();
