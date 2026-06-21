/**
 * SISTEMA DE DATOS CONFIGURABLES PARA CÁMARAS DE COMBATE
 * 
 * Este archivo contiene todas las estructuras de datos configurables
 * para crear aventuras de combate individuales reutilizables.
 * 
 * Cada sección está diseñada para ser fácilmente modificable desde
 * el panel de administración sin necesidad de tocar el código.
 */

// ============================================
// CONFIGURACIÓN DE LA AVENTURA
// ============================================

const ADVENTURE_CONFIG = {
    id: 'sombras_disonantes',
    title: 'SOMBRAS DISONANTES',
    subtitle: 'Cámara de Combate Individual',
    description: 'Una alma atrapada entre planos clama por liberación. Derrota al Fragmento de Sombra para liberarla.',
    difficulty: 'Difícil',
    recommendedLevel: 7,
    estimatedTime: '15-20 minutos',
    rewards: [
        'Experiencia de combate táctico',
        'Narrativa de liberación',
        'Desafío estratégico'
    ],
    tags: ['combate', 'solo', 'jefe', 'sombras', 'fantasía oscura'],
    coverImage: '../../images/sombras-disonantes-cover.jpg',
    category: 'Cámara de Combate'
};

// ============================================
// NARRATIVAS
// ============================================

const NARRATIVES = {
    introduction: {
        title: 'La Cámara Umbría',
        text: `Te encuentras en una cámara ritual antigua, rodeado de velas que arden con llamas violetas.
        
En el centro de la habitación, una forma oscura se agita. Es un Fragmento de Sombra, un trozo de alma rota atrapado entre planos.

Puedes sentir el sufrimiento de un alma prisionera, clamando por liberación. Solo derrotando a esta entidad oscura podrás liberarla.

El Fragmento de Sombra te mira con ojos vacíos. El combate es inevitable.`,
        buttonText: 'Comenzar Combate'
    },
    
    victory: {
        title: 'Liberación',
        text: `Con un último golpe, el Fragmento de Sombra se disuelve en humo negro.

Ante ti, una figura etérea emerge de las cenizas. El alma atrapada brilla con luz suave, liberada finalmente de su prisión oscura.

"Gracias, aventurero," susurra la figura antes de desvanecerse en la luz.

La cámara ritual se ilumina. Has completado la prueba.`,
        buttonText: 'Volver al Inicio'
    },
    
    defeat: {
        title: 'Consumido por las Sombras',
        text: `Tu visión se oscurece mientras las sombras te envuelven.

El Fragmento de Sombra se alimenta de tu esencia, añadiéndola a su colección de almas perdidas.

El alma atrapada permanece prisionera, esperando quizás a otro héroe que tenga más fortuna...`,
        buttonText: 'Intentar de Nuevo'
    },
    
    phaseTransition: {
        phase2: 'El Fragmento de Sombra se vuelve inestable. Ecos sombríos comienzan a manifestarse a su alrededor.',
        phase3: '¡El Fragmento de Sombra entra en estado crítico! Su forma se distorsiona violentamente.'
    }
};

// ============================================
// CLASES DE JUGADOR
// ============================================

const PLAYER_CLASSES = {
    guerrero_arcano_nivel_7: {
        id: 'guerrero_arcano_nivel_7',
        name: 'Guerrero Arcano',
        level: 7,
        hitPoints: 65,
        armorClass: 16,
        stats: {
            strength: 16,
            dexterity: 14,
            constitution: 16,
            intelligence: 14,
            wisdom: 12,
            charisma: 10
        },
        resources: {
            secondWind: {
                name: 'Segundo Aliento',
                uses: 1,
                maxUses: 1,
                description: 'Recupera 1d10 + 7 HP',
                recovery: 'Descanso corto'
            },
            actionSurge: {
                name: 'Acción Adicional',
                uses: 1,
                maxUses: 1,
                description: 'Obtienes una acción adicional este turno',
                recovery: 'Descanso corto'
            },
            spellSlots: {
                level1: 4,
                level2: 3,
                level3: 2,
                level4: 1
            }
        },
        actions: {
            meleeAttack: {
                id: 'melee_attack',
                name: 'Ataque Cuerpo a Cuerpo',
                type: 'attack',
                damage: '1d8 + 3',
                damageType: 'cortante',
                toHit: '+6',
                range: 'Cuerpo a cuerpo',
                description: 'Ataque con arma melee',
                uses: 'infinite'
            },
            rangedAttack: {
                id: 'ranged_attack',
                name: 'Ataque a Distancia',
                type: 'attack',
                damage: '1d8 + 3',
                damageType: 'perforante',
                toHit: '+5',
                range: '20/60 pies',
                description: 'Ataque con arma a distancia',
                uses: 'infinite'
            },
            dodge: {
                id: 'dodge',
                name: 'Esquivar',
                type: 'action',
                effect: 'CA +2, ventaja en salvaciones',
                description: 'Esquiva ataques este turno',
                uses: 'infinite'
            },
            retreat: {
                id: 'retreat',
                name: 'Retirada',
                type: 'action',
                effect: 'Movimiento + desenganche',
                description: 'Retirada táctica',
                uses: 'infinite'
            },
            prepareAction: {
                id: 'prepare_action',
                name: 'Preparar Acción',
                type: 'action',
                effect: 'Ataca cuando se cumpla condición',
                description: 'Prepara un ataque reactivo',
                uses: 'infinite'
            }
        },
        spells: {
            magic_missile: {
                id: 'magic_missile',
                name: 'Proyectil Mágico',
                level: 1,
                school: 'evocación',
                castingTime: '1 acción',
                range: '120 pies',
                damage: '3d4',
                damageType: 'fuerza',
                description: '3 proyectiles que siempre aciertan',
                slotLevel: 1
            },
            shield: {
                id: 'shield',
                name: 'Escudo',
                level: 1,
                school: 'abjuración',
                castingTime: '1 reacción',
                range: 'Personal',
                effect: 'CA +5 hasta inicio de tu próximo turno',
                description: 'Escudo mágico de fuerza',
                slotLevel: 1
            },
            absorb_elements: {
                id: 'absorb_elements',
                name: 'Absorber Elementos',
                level: 3,
                school: 'abjuración',
                castingTime: '1 reacción',
                range: 'Personal',
                effect: 'Resistencia a un elemento, absorbe daño',
                description: 'Protección elemental',
                slotLevel: 3
            },
            frost_ray: {
                id: 'frost_ray',
                name: 'Rayo de Escarcha',
                level: 2,
                school: 'evocación',
                castingTime: '1 acción',
                range: '60 pies',
                damage: '4d8',
                damageType: 'frío',
                save: 'Constitución DC 15',
                description: 'Rayo de frío que ralentiza',
                slotLevel: 2
            },
            fire_bolt: {
                id: 'fire_bolt',
                name: 'Descarga de Fuego',
                level: 0,
                school: 'evocación',
                castingTime: '1 acción',
                range: '120 pies',
                damage: '2d10',
                damageType: 'fuego',
                description: 'Truco de daño a distancia',
                slotLevel: 0
            },
            shocking_grasp: {
                id: 'shocking_grasp',
                name: 'Toque Electrizante',
                level: 0,
                school: 'evocación',
                castingTime: '1 acción',
                range: 'Cuerpo a cuerpo',
                damage: '3d6',
                damageType: 'eléctrico',
                advantage: 'Ventaja contra armadura metálica',
                description: 'Truco de daño melee con ventaja',
                slotLevel: 0
            }
        }
    }
};

// ============================================
// ENEMIGOS
// ============================================

const ENEMIES = {
    fragmento_sombra: {
        id: 'fragmento_sombra',
        name: 'Fragmento de Sombra',
        title: 'Alma Rota Atrapada',
        hitPoints: 120,
        armorClass: 15,
        stats: {
            strength: 14,
            dexterity: 18,
            constitution: 16,
            intelligence: 12,
            wisdom: 14,
            charisma: 16
        },
        immunities: ['veneno', 'psíquico'],
        resistances: ['necrótico'],
        vulnerabilities: ['radiante'],
        phases: {
            phase1: {
                name: 'Forma Estable',
                hpThreshold: { min: 60, max: 100 },
                abilities: ['shadow_claw', 'dark_lance', 'umbral_slip', 'shadow_mantle'],
                behavior: 'basic'
            },
            phase2: {
                name: 'Forma Inestable',
                hpThreshold: { min: 25, max: 59 },
                abilities: ['shadow_claw', 'dark_lance', 'shadow_explosion', 'summon_echo', 'shadow_fragmentation', 'void_scream'],
                behavior: 'aggressive'
            },
            phase3: {
                name: 'Forma Crítica',
                hpThreshold: { min: 0, max: 24 },
                abilities: ['shadow_claw', 'shadow_explosion', 'summon_echo', 'umbral_slip', 'void_scream', 'umbral_absorption'],
                behavior: 'desperate',
                modifiers: {
                    damageMultiplier: 1.5,
                    armorClass: 13,
                    aggression: 2
                }
            }
        },
        abilities: {
            shadow_claw: {
                id: 'shadow_claw',
                name: 'Zarpazo Umbrío',
                type: 'offensive',
                damage: '2d6 + 4',
                damageType: 'necrótico',
                toHit: '+7',
                range: 'Cuerpo a cuerpo',
                description: 'Golpe de sombra que drena vida',
                cooldown: 0,
                priority: 3
            },
            dark_lance: {
                id: 'dark_lance',
                name: 'Lanza de Oscuridad',
                type: 'offensive',
                damage: '3d8',
                damageType: 'necrótico',
                toHit: '+7',
                range: '60 pies',
                description: 'Proyectil de oscuridad concentrada',
                cooldown: 0,
                priority: 2,
                requiresDistance: true
            },
            shadow_explosion: {
                id: 'shadow_explosion',
                name: 'Explosión Sombría',
                type: 'offensive',
                damage: '4d6',
                damageType: 'necrótico',
                save: 'Destreza DC 15',
                radius: '20 pies',
                description: 'Onda de choque de sombras',
                cooldown: 3,
                priority: 2
            },
            summon_echo: {
                id: 'summon_echo',
                name: 'Invocar Eco Sombrío',
                type: 'special',
                description: 'Invoca un eco sombrío para combatir',
                cooldown: 4,
                maxEchos: 2,
                priority: 1,
                requiresFewEchos: true
            },
            umbral_slip: {
                id: 'umbral_slip',
                name: 'Deslizamiento Umbral',
                type: 'tactical',
                effect: 'Teletransporte 30 pies, sin ataques de oportunidad',
                description: 'Movimiento a través de sombras',
                cooldown: 2,
                priority: 1,
                requiresDistance: true
            },
            shadow_mantle: {
                id: 'shadow_mantle',
                name: 'Manto de Penumbra',
                type: 'tactical',
                effect: 'CA +3, ventaja en salvaciones',
                duration: 2,
                description: 'Aumenta temporalmente su defensa',
                cooldown: 3,
                priority: 1,
                defensive: true
            },
            shadow_fragmentation: {
                id: 'shadow_fragmentation',
                name: 'Fragmentación Sombría',
                type: 'special',
                effect: 'Consume 10 HP para generar Eco Sombrío',
                description: 'Sacrifica energía para crear un esbirro',
                cooldown: 3,
                priority: 1,
                requiresFewEchos: true,
                selfDamage: 10
            },
            void_scream: {
                id: 'void_scream',
                name: 'Grito del Vacío',
                type: 'debuff',
                effect: 'Jugador: -2 al ataque y daño por 2 rondas',
                save: 'Sabiduría DC 14',
                description: 'Debuff temporal sobre el jugador',
                cooldown: 4,
                priority: 2
            },
            umbral_absorption: {
                id: 'umbral_absorption',
                name: 'Absorción Umbría',
                type: 'heal',
                effect: 'Recupera 1d8 HP por cada Eco activo',
                description: 'Absorbe energía de los ecos',
                cooldown: 3,
                priority: 2,
                requiresEchos: true
            }
        }
    },
    
    eco_sombrio: {
        id: 'eco_sombrio',
        name: 'Eco Sombrío',
        hitPoints: 15,
        armorClass: 12,
        damage: '1d6 + 2',
        damageType: 'necrótico',
        toHit: '+5',
        duration: 3, // rounds
        description: 'Réplica menor del Fragmento de Sombra'
    }
};

// ============================================
// ESTADOS Y CONDICIONES
// ============================================

const CONDITIONS = {
    shielded: {
        id: 'shielded',
        name: 'Escudado',
        effect: 'CA +5',
        duration: 1,
        stackable: false
    },
    dodging: {
        id: 'dodging',
        name: 'Esquivando',
        effect: 'CA +2, ventaja en salvaciones',
        duration: 1,
        stackable: false
    },
    slowed: {
        id: 'slowed',
        name: 'Ralentizado',
        effect: 'Velocidad reducida a la mitad, desventaja en ataques',
        duration: 2,
        stackable: false
    },
    burning: {
        id: 'burning',
        name: 'Ardiendo',
        effect: '1d6 daño de fuego al inicio de turno',
        duration: 3,
        stackable: true
    },
    weakened: {
        id: 'weakened',
        name: 'Debilitado',
        effect: 'Daño reducido a la mitad',
        duration: 2,
        stackable: false
    },
    void_marked: {
        id: 'void_marked',
        name: 'Marcado por el Vacío',
        effect: '-2 al ataque y daño',
        duration: 2,
        stackable: false
    },
    shadow_enhanced: {
        id: 'shadow_enhanced',
        name: 'Mejorado por Sombras',
        effect: 'CA +3, ventaja en salvaciones',
        duration: 2,
        stackable: false
    }
};

// ============================================
// CONFIGURACIÓN DE IA ENEMIGA
// ============================================

const ENEMY_AI_CONFIG = {
    priorities: {
        lowHP: {
            threshold: 0.5,
            behavior: 'aggressive',
            description: 'Si el enemigo tiene menos de 50% HP, aumenta agresividad'
        },
        playerLowHP: {
            threshold: 0.35,
            behavior: 'finisher',
            description: 'Si el jugador tiene menos de 35% HP, intenta acabar'
        },
        criticalHP: {
            threshold: 0.25,
            behavior: 'desperate',
            description: 'Si el enemigo tiene menos de 25% HP, comportamiento desesperado'
        },
        distance: {
            close: 10,
            far: 30,
            description: 'Umbral de distancia para decisiones de movimiento'
        },
        echoCoordination: {
            enabled: true,
            description: 'Coordina ataques con ecos sombríos'
        },
        fewEchos: {
            threshold: 1,
            description: 'Si hay menos de 1 eco, considerar invocar'
        }
    },
    behaviors: {
        basic: {
            description: 'Comportamiento estándar con ataques básicos',
            actionWeights: {
                shadow_claw: 0.4,
                dark_lance: 0.3,
                umbral_slip: 0.1,
                shadow_mantle: 0.2
            }
        },
        aggressive: {
            description: 'Mayor agresividad, uso de habilidades especiales',
            actionWeights: {
                shadow_claw: 0.25,
                dark_lance: 0.25,
                shadow_explosion: 0.2,
                summon_echo: 0.1,
                shadow_fragmentation: 0.1,
                void_scream: 0.1
            }
        },
        desperate: {
            description: 'Comportamiento desesperado con daño aumentado',
            actionWeights: {
                shadow_claw: 0.35,
                shadow_explosion: 0.3,
                summon_echo: 0.15,
                void_scream: 0.1,
                umbral_absorption: 0.1
            },
            modifiers: {
                damageMultiplier: 1.5,
                ignoreDefense: 0.2
            }
        },
        finisher: {
            description: 'Intenta acabar al jugador con ataques potentes',
            actionWeights: {
                dark_lance: 0.4,
                shadow_explosion: 0.3,
                shadow_claw: 0.2,
                void_scream: 0.1
            },
            modifiers: {
                aggression: 2,
                ignoreDefense: 0.1
            }
        }
    }
};

// ============================================
// CONFIGURACIÓN DE DADOS
// ============================================

const DICE_CONFIG = {
    types: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'],
    defaultRoll: 'd20',
    criticalSuccess: 20,
    criticalFailure: 1,
    advantage: {
        description: 'Tira 2d20, usa el mayor'
    },
    disadvantage: {
        description: 'Tira 2d20, usa el menor'
    }
};

// ============================================
// CONFIGURACIÓN DE COMBATE
// ============================================

const COMBAT_CONFIG = {
    initiative: {
        playerBonus: 0,
        enemyBonus: 2
    },
    turnOrder: ['player', 'enemy'],
    roundStructure: {
        start: 'Inicio de ronda',
        playerTurn: 'Turno del jugador',
        enemyTurn: 'Turno del enemigo',
        end: 'Fin de ronda'
    },
    combatLog: {
        maxEntries: 100,
        autoScroll: true,
        format: 'narrative'
    }
};

// ============================================
// EXPORTAR CONFIGURACIONES
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ADVENTURE_CONFIG,
        NARRATIVES,
        PLAYER_CLASSES,
        ENEMIES,
        CONDITIONS,
        ENEMY_AI_CONFIG,
        DICE_CONFIG,
        COMBAT_CONFIG
    };
}
