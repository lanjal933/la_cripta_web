// La Maldición de las Sombras Eternas - Aventura D&D Épica
// Aventura completa para 4 jugadores con sistema de combate, jefes y múltiples finales

const EPIC_ADVENTURE = {
    id: 'shadows_eternal_curse',
    title: 'La Maldición de las Sombras Eternas',
    description: 'Una aventura de fantasía oscura para jugar en solitario: elegís un personaje, tirás dados y decidís cómo sobrevivir a una maldición que devora el reino. Tu ruta define qué se salva… y qué queda en sombras.',
    category: 'Fantasía Oscura',
    level: 12,
    tags: ['epica', 'jefes', 'multiples_finales', 'combate'],
    type: 'solo',
    coverImage: '../images/aventura_pc.png',
    
    // Party de 4 aventureros predefinidos
    party: [
        {
            id: 'kaelen',
            name: 'Kaelen Martillo de Tormenta',
            class: 'Paladín',
            maxHp: 120,
            currentHp: 120,
            stats: {
                strength: 18,
                dexterity: 14,
                constitution: 16,
                intelligence: 12,
                wisdom: 14,
                charisma: 16
            },
            inventory: ['holy_avenger', 'plate_armor', 'shield_of_faith', 'healing_potion_x3'],
            abilities: ['divine_smite', 'lay_on_hands', 'aura_of_protection']
        },
        {
            id: 'lyra',
            name: 'Lyra Sombra de Luna',
            class: 'Rogue/Mago',
            maxHp: 85,
            currentHp: 85,
            stats: {
                strength: 10,
                dexterity: 20,
                constitution: 14,
                intelligence: 18,
                wisdom: 14,
                charisma: 12
            },
            inventory: ['shadow_blade', 'arcane_focus', 'invisibility_ring', 'poison_darts'],
            abilities: ['sneak_attack', 'shadow_step', 'arcane_trickster']
        },
        {
            id: 'thorin',
            name: 'Thorin Barbafuego',
            class: 'Bárbaro',
            maxHp: 140,
            currentHp: 140,
            stats: {
                strength: 20,
                dexterity: 12,
                constitution: 18,
                intelligence: 8,
                wisdom: 10,
                charisma: 12
            },
            inventory: ['greataxe', 'barbarian_armor', 'rage_token', 'healing_potion_x2'],
            abilities: ['rage', 'reckless_attack', 'brutal_critical']
        },
        {
            id: 'elara',
            name: 'Elara Luz del Amanecer',
            class: 'Clérigo',
            maxHp: 95,
            currentHp: 95,
            stats: {
                strength: 12,
                dexterity: 10,
                constitution: 14,
                intelligence: 14,
                wisdom: 20,
                charisma: 16
            },
            inventory: ['mace_of_healing', 'holy_symbol', 'divine_focus', 'scroll_mass_heal'],
            abilities: ['healing_word', 'divine_intervention', 'turn_undead']
        }
    ],
    
    // Nodos de la aventura
    nodes: [
        {
            id: 'start',
            title: 'El Comienzo de la Pesadilla',
            narrative: `La noche cae sobre el Reino de Eldoria como un manto de ceniza. En la taberna "El Último Refugio", cuatro aventureros se reúnen en torno a una mesa de roble desgastado. Las velas parpadean con luz inestable, como si la misma oscuridad intentara apagarlas.

Un mensajero entra, su capa manchada de sangre y polvo. Su rostro pálido refleja el terror que ha presenciado.

"Señores," dice con voz temblorosa, "el Rey Oscurio ha despertado. La profecía se cumple. Las Sombras Eternas se extienden desde el Castillo de las Tinieblas, consumiendo todo a su paso. Aldeas enteras han desaparecido durante la noche. Los que sobreviven... ya no son humanos."

El tabulero se queda en silencio. El mensajero continúa:

"El Consejo de los Sabios ha identificado a cuatro héroes capaces de detener esta amenaza. Ustedes. El Rey Oscurio busca los Artefactos de Luz para completar su ritual de resurrección. Si logra reunirlos, la oscuridad será eterna."

[check:insight dc=15 success=insight_success fail=insight_fail]

[success]Notas que el mensajero oculta algo detrás de su capa. Su pulso acelera cuando menciona los Artefactos de Luz. Hay más en esta historia de lo que cuenta.[/success]

[failure]El mensajero parece genuinamente aterrorizado, pero no detectas nada inusual en su comportamiento.[/failure]

"Los Artefactos de Luz están dispersos por el reino," explica el mensajero. "La Espada del Amanecer en las Ruinas de Solara, el Escudo de la Esperanza en el Bosque de los Susurros, el Orbe de la Verdad en las Montañas de Cristal, y el Amuleto del Alma en el Cementerio de los Olvidados."

"Deben recuperarlos antes que el Rey Oscurio. El destino del reino depende de ustedes."

¿Qué decisión toma el grupo?`,
            choices: [
                { text: 'Aceptar la misión inmediatamente', target: 'accept_mission' },
                { text: 'Pedir más información sobre el Rey Oscurio', target: 'ask_about_dark_king' },
                { text: 'Exigir pruebas de la amenaza antes de actuar', target: 'demand_proof' },
                { text: 'Negarse - es demasiado peligroso', target: 'refuse_mission' }
            ],
            conditions: [],
            events: [
                { type: 'check', stat: 'insight', dc: 15, successNode: 'insight_success', failNode: 'insight_fail' }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'accept_mission',
            title: 'El Juramento de los Héroes',
            narrative: `"Aceptamos," declara Kaelen, su voz resonando con autoridad divina. "Por la luz y la justicia, enfrentaremos esta oscuridad."

Los otros tres asienten. Thorin golpea la mesa con su puño. "¡Por el honor de nuestros ancestros! ¡Ninguna sombra nos detendrá!"

Lyra sonríe con determinación. "Las sombras no pueden esconderse de mí. Las encontraré y las destruiré."

Elara cierra los ojos en oración. "La luz nos guiará a través de la oscuridad."

El mensajero suspira de alivio. "Gracias. Aquí tienen un mapa con las ubicaciones de los artefactos. Pero advierto... el camino estará lleno de peligros. Criaturas de pesadilla, trampas mortales, y los sirvientes del Rey Oscurio."

[set:mission_accepted=true]
[set:party_morale=high]

"Además," añade el mensajero con voz baja, "hay rumores de que el Rey Oscurio no siempre fue malo. Cuentan que hace mil años, era un héroe legendario que salvó el reino de una amenaza aún mayor. Pero algo lo cambió... algo lo corrompió."

Esta información cambia la perspectiva de su misión. ¿Investigan más sobre el pasado del Rey Oscurio o se enfocan en la misión actual?`,
            choices: [
                { text: 'Investigar el pasado del Rey Oscurio', target: 'investigate_dark_king_past' },
                { text: 'Enfocarse en recuperar los artefactos primero', target: 'focus_on_artifacts' },
                { text: 'Preguntar al mensajero sobre su conocimiento del Rey Oscurio', target: 'question_messenger' }
            ],
            conditions: [],
            events: [],
            dice: [],
            items: [{ name: 'map_of_artifacts', action: 'add' }],
            variables: [{ name: 'mission_accepted', value: true }, { name: 'party_morale', value: 'high' }]
        },
        
        {
            id: 'ask_about_dark_king',
            title: 'Los Secretos del Rey Oscurio',
            narrative: `"¿Quién es exactamente el Rey Oscurio?" pregunta Lyra, sus ojos analíticos escaneando al mensajero.

El mensajero titubea. "Su nombre original era Aldric el Valiente. Era el paladín más grande de su tiempo. Hace mil años, derrotó al Señor del Vacío, una entidad de pura nada que amenazaba con consumir la existencia misma."

"¿Y qué lo cambió?" interrumpe Thorin.

" Nadie lo sabe con certeza," responde el mensajero. "Después de su victoria, Aldric desapareció durante cincuenta años. Cuando regresó, ya no era el mismo. Tenía poder sobre las sombras, y sus ojos... sus ojos brillaban con luz negra. Se proclamó Rey Oscurio y se retiró al Castillo de las Tinieblas."

[check:history dc=14 success=history_success fail=history_fail]

[success]Elara reconoce la historia. "Los textos antiguos mencionan que Aldric usó un artefacto prohibido para derrotar al Señor del Vacío. El Espejo de las Almas Perdidas. Se dice que el espejo mostró a Aldric algo que lo rompió por dentro."[/success]

[failure]Nadie reconoce la historia, pero es evidente que hay mucho más en esta historia de lo que parece.[/failure]

"Esto cambia todo," dice Kaelen pensativo. "Si el Rey Oscurio fue una vez un héroe, quizás pueda ser salvado. O quizás... debamos destruirlo por completo."

[set:knows_dark_king_past=true]

¿Qué camino eligen?`,
            choices: [
                { text: 'Intentar salvar al Rey Oscurio de su corrupción', target: 'redemption_path' },
                { text: 'Destruir al Rey Oscurio sin piedad', target: 'destruction_path' },
                { text: 'Investigar más antes de decidir', target: 'investigate_more' }
            ],
            conditions: [],
            events: [
                { type: 'check', stat: 'history', dc: 14, successNode: 'history_success', failNode: 'history_fail' }
            ],
            dice: [],
            items: [],
            variables: [{ name: 'knows_dark_king_past', value: true }]
        },
        
        {
            id: 'demand_proof',
            title: 'La Demanda de Pruebas',
            narrative: `"No nos moveremos hasta ver pruebas," declara Thorin con firmeza. "Palabras vacías no nos convencerán."

El mensajero asiente con respeto. "Entiendo. Prudente. Tienen derecho a saber la verdad."

Saca un pequeño espejo de plata de su capa. "Miren esto. Es un Espejo de Verdad. Muestra lo que realmente ocurre en el reino."

Cuando miran el espejo, ven imágenes aterradoras: aldeas en llamas, sombras que se arrastran por las calles, personas que se transforman en criaturas de pesadilla. Y en el centro de todo, un castillo negro que pulsa con energía oscura.

"Esto es lo que está pasando ahora mismo," dice el mensajero con voz grave. "Y cada día que pasa, la oscuridad se expande más."

[check:perception dc=16 success=perception_success fail=perception_fail]

[success]Lyra nota algo en el espejo: una figura familiar entre las sombras. "¡Es el hermano del Rey! ¡El príncipe que desapareció hace años! ¡Está vivo... pero no es humano!"[/success]

[failure]Las imágenes son demasiado horribles para procesar completamente, pero la amenaza es innegable.[/failure]

El grupo queda en silencio, procesando lo que han visto. La amenaza es real, y más urgente de lo que imaginaban.

[set:has_seen_proof=true]

¿Ahora qué deciden?`,
            choices: [
                { text: 'Aceptamos la misión inmediatamente', target: 'accept_mission' },
                { text: 'Investigar al príncipe visto en el espejo', target: 'investigate_prince' },
                { text: 'Prepararnos mejor antes de partir', target: 'prepare_better' }
            ],
            conditions: [],
            events: [
                { type: 'check', stat: 'perception', dc: 16, successNode: 'perception_success', failNode: 'perception_fail' }
            ],
            dice: [],
            items: [{ name: 'mirror_of_truth', action: 'add' }],
            variables: [{ name: 'has_seen_proof', value: true }]
        },
        
        {
            id: 'refuse_mission',
            title: 'La Negativa',
            narrative: `"No podemos aceptar," dice Kaelen después de considerar la situación. "Es demasiado peligroso. No tenemos suficiente información."

El mensajero se desmorona. "Por favor... el tiempo se agota. Cada hora que pasa, más personas mueren. Más almas se pierden para siempre."

"Entonces el reino debería enviar un ejército," responde Thorin. "No cuatro aventureros."

"¡Ningún ejército puede entrar al Castillo de las Tinieblas!" grita el mensajero. "¡Solo héroes con luz en sus almas pueden penetrar las defensas del Rey Oscurio! ¡Ustedes son la última esperanza!"

El grupo se queda en silencio, pesando la decisión. El mensajero espera, desesperado.

[check:persuasion dc=17 success=persuasion_success fail=persuasion_fail]

[success]Elara interviene con voz suave pero firme. "Hemos jurado proteger a los inocentes. ¿Podemos vivir con nosotros mismos si abandonamos al reino cuando más nos necesita?"[/success]

[failure]El grupo permanece firme en su decisión. El riesgo es demasiado grande sin más información.[/failure]

¿Cambian de opinión?`,
            choices: [
                { text: 'Cambiar de opinión y aceptar la misión', target: 'accept_mission' },
                { text: 'Mantener la negativa y pedir más información', target: 'ask_about_dark_king' },
                { text: 'Mantener la negativa definitivamente', target: 'final_refusal' }
            ],
            conditions: [],
            events: [
                { type: 'check', stat: 'persuasion', dc: 17, successNode: 'persuasion_success', failNode: 'persuasion_fail' }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'final_refusal',
            title: 'El Final de la Esperanza',
            narrative: `"Lo sentimos," dice Kaelen finalmente. "No podemos aceptar esta misión."

El mensajero se va, derrotado. El grupo se queda en la taberna, con el peso de la decisión sobre sus conciencias.

Días después, llegan noticias terribles: el Rey Oscurio ha completado su ritual. Las Sombras Eternas han consumido el reino entero. No hay escapatoria. La oscuridad es absoluta y eterna.

[set:bad_ending=true]

**FINAL MALO - El Reino Caído**

El grupo sobrevive por un tiempo, escondido en las profundidades de la tierra. Pero eventualmente, incluso ellos son consumidos por las Sombras Eternas. Su último pensamiento es el arrepentimiento por no haber actuado cuando tuvieron la oportunidad.

A veces, la inacción tiene consecuencias peores que la acción.`,
            choices: [],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'bad_ending', value: true }]
        },
        
        {
            id: 'focus_on_artifacts',
            title: 'El Camino de los Artefactos',
            narrative: `"Enfocémonos en recuperar los artefactos," decide Kaelen. "El pasado del Rey Oscurio es importante, pero no podemos permitir que complete su ritual."

El grupo estudia el mapa. Hay cuatro rutas posibles:

1. **Las Ruinas de Solara** - Donde se encuentra la Espada del Amanecer. Al este, a través del Desierto de los Suspiros.
2. **El Bosque de los Susurros** - Donde se encuentra el Escudo de la Esperanza. Al norte, a través de las Montañas de Niebla.
3. **Las Montañas de Cristal** - Donde se encuentra el Orbe de la Verdad. Al oeste, a través del Valle de los Ecos.
4. **El Cementerio de los Olvidados** - Donde se encuentra el Amuleto del Alma. Al sur, a través del Pantano de las Lágrimas.

"Cada ruta tiene sus propios peligros," advierte el mensajero. "Pero también cada artefacto tiene guardián. No serán fáciles de recuperar."

[set:artifact_hunt_started=true]

¿Qué ruta eligen primero?`,
            choices: [
                { text: 'Ir a las Ruinas de Solara (Espada del Amanecer)', target: 'ruins_of_solara' },
                { text: 'Ir al Bosque de los Susurros (Escudo de la Esperanza)', target: 'whispering_forest' },
                { text: 'Ir a las Montañas de Cristal (Orbe de la Verdad)', target: 'crystal_mountains' },
                { text: 'Ir al Cementerio de los Olvidados (Amuleto del Alma)', target: 'forgotten_cemetery' }
            ],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'artifact_hunt_started', value: true }]
        },
        
        {
            id: 'ruins_of_solara',
            title: 'Las Ruinas de Solara',
            narrative: `El grupo viaja hacia el este, cruzando el Desierto de los Suspiros. El sol abrasa durante el día, y las noches están llenas de los lamentos de almas atrapadas en la arena.

Al llegar a las Ruinas de Solara, encuentran un antiguo templo dedicado al dios sol. Las columnas están rotas, y el suelo está cubierto de arena y huesos.

"El templo está protegido por una barrera de luz sagrada," observa Elara. "Solo los puros de corazón pueden pasar."

[check:charisma dc=15 success=charisma_success fail=charisma_fail]

[success]Kaelen, con su aura de paladín, logra disipar la barrera temporalmente. "¡Rápido! ¡Tenemos poco tiempo antes de que se reforme!"[/success]

[failure]La barrera rechaza al grupo. "Necesitamos otra forma de entrar," dice Lyra. "Quizás haya una entrada secreta."[/failure]

Dentro del templo, escuchan un rugido que hace temblar las ruinas. Algo grande duerme en las profundidades.

[combat:start]

**JEFE FINAL: EL FÉNIX DE CENIZA**
- Un fénix corrupto que una vez fue el guardián del templo
- Ahora es una criatura de fuego y oscuridad
- HP: 250, Ataque: +15, Defensa: 18
- Habilidades: Llama Corrupta, Fénix Renacido, Escudo de Fuego

¿Cómo enfrentan este desafío?`,
            choices: [],
            conditions: [],
            events: [
                { type: 'check', stat: 'charisma', dc: 15, successNode: 'charisma_success', failNode: 'charisma_fail' },
                { type: 'combat', enemies: ['ash_phoenix_boss'] }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'charisma_success',
            title: 'Entrada al Templo',
            narrative: `La barrera se disipa bajo el aura sagrada de Kaelen. El grupo corre hacia el interior del templo antes de que se reforme.

Dentro, el templo es magnífico a pesar del deterioro. Estatuas de antiguos héroes linean las paredes, y en el centro, sobre un altar de oro, brilla la Espada del Amanecer.

Pero antes de que puedan alcanzarla, el suelo se abre y de las profundidades emerge una criatura aterradora. Es un fénix, pero no uno de fuego y luz. Sus plumas son negras como la ceniza, y sus ojos brillan con luz roja malévola.

"¡Intrusos!" grita con voz que suena como llamas crepitantes. "¡Nadie tocará la Espada del Amanecer! ¡Yo, Fénix de Ceniza, la protegeré hasta mi último aliento!"

[combat:start]

**JEFE: FÉNIX DE CENIZA**
- HP: 250, Ataque: +15, Defensa: 18
- Habilidades: Llama Corrupta, Fénix Renacido, Escudo de Fuego

El combate comienza. El fénix ataca con garras de fuego y plumas afiladas como cuchillos.`,
            choices: [],
            conditions: [],
            events: [
                { type: 'combat', enemies: ['ash_phoenix_boss'] }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'charisma_fail',
            title: 'Búsqueda de Entrada Secreta',
            narrative: `La barrera rechaza al grupo. "Necesitamos otra forma de entrar," dice Lyra, escaneando las ruinas con sus ojos de ladrón.

[check:investigation dc=14 success=find_secret_entrance fail=no_secret_entrance]

[success]Lyra encuentra una entrada oculta detrás de una estatua caída. "¡Aquí! Un pasaje subterráneo que lleva al templo."[/success]

[failure]No encuentran entrada secreta. "Quizás podamos destruir la barrera con fuerza," sugiere Thorin.[/failure]

El grupo decide intentar el pasaje subterráneo. Es estrecho y oscuro, lleno de telarañas y el olor a descomposición.

Al final del pasaje, emergen en el templo. Pero no están solos. El fénix de ceniza los espera, como si supiera que vendrían por esta ruta.

"¡Intrusos astutos!" ruge la criatura. "¡Pero no pueden engañar a la muerte!"

[combat:start]

**JEFE: FÉNIX DE CENIZA**
- HP: 250, Ataque: +15, Defensa: 18
- Habilidades: Llama Corrupta, Fénix Renacido, Escudo de Fuego`,
            choices: [],
            conditions: [],
            events: [
                { type: 'check', stat: 'investigation', dc: 14, successNode: 'find_secret_entrance', failNode: 'no_secret_entrance' },
                { type: 'combat', enemies: ['ash_phoenix_boss'] }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'whispering_forest',
            title: 'El Bosque de los Susurros',
            narrative: `El grupo viaja hacia el norte, cruzando las Montañas de Niebla. El aire es frío y cargado de misterio. Los árboles del Bosque de los Susurros son antiguos, sus troncos retorcidos como si estuvieran en dolor.

Al entrar al bosque, escuchan susurros. No son viento, son voces. Voces de personas que alguna vez caminaron por aquí.

"¡Vuelvan! ¡Vuelvan antes de que sea demasiado tarde!" susurran las voces.

[check:wisdom dc=16 success=wisdom_success fail=wisdom_fail]

[success]Elara reconoce la naturaleza de los susurros. "Son almas atrapadas. El bosque consume a quienes entran y los convierte en parte de él."[/success]

[failure]Los susurros son incomprensibles, pero claramente malignos. El grupo siente una presión psíquica creciente.[/failure]

En el centro del bosque, encuentran un claro donde crece un árbol inmenso. En sus ramas cuelga el Escudo de la Esperanza. Pero el árbol está vivo... y hambriento.

[combat:start]

**JEFE: EL ÁRBOL DE ALMAS**
- Un árbol antiguo corrupto que se alimenta de almas
- HP: 200, Ataque: +12, Defensa: 20
- Habilidades: Raíces de Agarre, Susurros de Locura, Consumir Alma

"¡Almas frescas!" ruge el árbol. "¡Ha pasado demasiado tiempo desde mi último festín!"`,
            choices: [],
            conditions: [],
            events: [
                { type: 'check', stat: 'wisdom', dc: 16, successNode: 'wisdom_success', failNode: 'wisdom_fail' },
                { type: 'combat', enemies: ['soul_tree_boss'] }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'crystal_mountains',
            title: 'Las Montañas de Cristal',
            narrative: `El grupo viaja hacia el oeste, cruzando el Valle de los Ecos. Cada paso que dan se refleja en los cristales de las montañas, creando ecos de sus movimientos y pensamientos.

Las Montañas de Cristal son hermosas pero peligrosas. Los cristales pueden atrapar a los incautos, reflejando sus peores miedos de vuelta a ellos.

[check:intelligence dc=15 success=intelligence_success fail=intelligence_fail]

[success]Lyra analiza los patrones de reflexión. "Si seguimos los ángulos correctos, podemos navegar sin ser atrapados. Los cristales reflejan la luz, pero también la oscuridad. Deben mantener la mente clara."[/success]

[failure]Los cristales confunden al grupo. Ven reflejos de sí mismos, pero distorsionados, mostrando versiones corruptas de quiénes son.[/failure]

En la cima de la montaña más alta, encuentran un santuario de cristal puro. En el centro, sobre un pedestal de diamante, flota el Orbe de la Verdad.

Pero el orbe está protegido por un guardián: un Golem de Cristal que ha existido desde el amanecer del tiempo.

[combat:start]

**JEFE: GOLEM DE CRISTAL**
- HP: 300, Ataque: +18, Defensa: 22
- Habilidades: Reflejo de Daño, Escudo de Cristal, Láser de Prisma

"¡Solo los dignos pueden poseer la Verdad!" declara el golem con voz que resuena como cristal rompiéndose.`,
            choices: [],
            conditions: [],
            events: [
                { type: 'check', stat: 'intelligence', dc: 15, successNode: 'intelligence_success', failNode: 'intelligence_fail' },
                { type: 'combat', enemies: ['crystal_golem_boss'] }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'forgotten_cemetery',
            title: 'El Cementerio de los Olvidados',
            narrative: `El grupo viaja hacia el sur, cruzando el Pantano de las Lágrimas. El agua es negra y espesa, y las lágrimas de los caídos parecen haber formado el pantano mismo.

El Cementerio de los Olvidados es un lugar de tristeza eterna. Tumbas antiguas se extienden hasta donde alcanza la vista, y el aire está cargado con el peso de mil años de dolor.

[check:constitution dc=14 success=constitution_success fail=constitution_fail]

[success]Thorin, con su constitución bárbara, resiste el efecto debilitante del cementerio. "¡Nada nos detendrá! ¡Ni siquiera la muerte misma!"[/success]

[failure]El grupo se siente debilitado por la atmósfera del cementerio. Sus movimientos son más lentos, y sus mentes nubladas por la tristeza.[/failure]

En el centro del cementerio, hay una tumba masiva con una inscripción: "Aquel que Fue y Será Nuevamente". Sobre la tumba, el Amuleto del Alma brilla con luz tenue.

Pero la tumba no está vacía. De ella emerge una figura encapuchada, sostenando una guadaña de hueso.

[combat:start]

**JEFE: EL RECOLECTOR DE ALMAS**
- HP: 280, Ataque: +20, Defensa: 16
- Habilidades: Guadaña de la Muerte, Invocar No Muertos, Drenar Vida

"¡Almas para la cosecha!" declara el Recolector. "¡El Rey Oscurio tendrá su ejército!"`,
            choices: [],
            conditions: [],
            events: [
                { type: 'check', stat: 'constitution', dc: 14, successNode: 'constitution_success', failNode: 'constitution_fail' },
                { type: 'combat', enemies: ['soul_reaper_boss'] }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'redemption_path',
            title: 'El Camino de la Redención',
            narrative: `"Intentemos salvarlo," propone Elara con compasión. "Si el Rey Oscurio fue una vez un héroe, quizás todavía haya luz en él."

El grupo decide investigar más sobre el pasado de Aldric antes de enfrentarlo. Buscan en los archivos del Consejo de los Sabios, encontrando textos antiguos que mencionan el Espejo de las Almas Perdidas.

"El espejo mostró a Aldric la verdad definitiva," lee Kaelen. "Que el Señor del Vacío no fue destruido, solo contenido. Y que para mantenerlo contenido, alguien debía sacrificar su propia humanidad."

"Aldric se sacrificó para salvar al reino," dice Thorin con asombro. "Y por mil años, ha contenido al Señor del Vacío dentro de sí mismo."

[set:redemption_path_chosen=true]

"Entonces el ritual del Rey Oscurio no es para resucitar a alguien," deduce Lyra. "Es para liberarse de su carga. Pero si lo hace, el Señor del Vacío será liberado."

Esto cambia todo. ¿Intentan ayudar a Aldric a encontrar otra forma, o deben detenerlo para evitar que libere al Señor del Vacío?`,
            choices: [
                { text: 'Buscar una forma de ayudar a Aldric sin liberar al Señor del Vacío', target: 'help_aldric_alternative' },
                { text: 'Detener a Aldric para proteger al reino del Señor del Vacío', target: 'stop_aldric' },
                { text: 'Enfrentar al Señor del Vacío directamente', target: 'face_void_lord' }
            ],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'redemption_path_chosen', value: true }]
        },
        
        {
            id: 'destruction_path',
            title: 'El Camino de la Destrucción',
            narrative: `"Debe ser destruido," declara Kaelen con firmeza. "Sea quien fuera, ahora es una amenaza para el reino."

El grupo se enfoca en recuperar los artefactos para poder enfrentarse al Rey Oscurio. No hay lugar para la compasión cuando el destino del mundo está en juego.

[set:destruction_path_chosen=true]

"Recuperaremos los artefactos," decide Thorin. "Y luego iremos al Castillo de las Tinieblas. Pondremos fin a esta amenaza de una vez por todas."

Lyra asiente. "Las sombras no tienen piedad. Nosotros tampoco."

Elara guarda silencio, pero su expresión muestra conflicto. Como clériga, su naturaleza es sanar y salvar, no destruir. Pero como defensora del reino, sabe que a veces se deben tomar decisiones difíciles.

[set:moral_conflict=true]

¿Qué ruta eligen primero para recuperar los artefactos?`,
            choices: [
                { text: 'Ir a las Ruinas de Solara (Espada del Amanecer)', target: 'ruins_of_solara' },
                { text: 'Ir al Bosque de los Susurros (Escudo de la Esperanza)', target: 'whispering_forest' },
                { text: 'Ir a las Montañas de Cristal (Orbe de la Verdad)', target: 'crystal_mountains' },
                { text: 'Ir al Cementerio de los Olvidados (Amuleto del Alma)', target: 'forgotten_cemetery' }
            ],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'destruction_path_chosen', value: true }, { name: 'moral_conflict', value: true }]
        },
        
        {
            id: 'help_aldric_alternative',
            title: 'La Búsqueda de una Solución Alternativa',
            narrative: `"Debe haber otra forma," insiste Elara. "Aldric ha contenido al Señor del Vacío por mil años. No podemos simplemente destruirlo después de todo ese sacrificio."

El grupo decide buscar en los textos prohibidos del Consejo, esperando encontrar un ritual que pueda separar a Aldric del Señor del Vacío sin liberar a la entidad.

[check:arcana dc=18 success=arcana_success fail=arcana_fail]

[success]Lyra encuentra un ritual antiguo: "El Ritual de Separación". Requiere los cuatro Artefactos de Luz, pero no para destruir a Aldric, sino para purificarlo y transferir al Señor del Vacío a una prisión eterna.[/success]

[failure]No encuentran solución alternativa. Los textos solo hablan de destrucción o contención temporal.[/failure]

"¡Esto es!" exclama Lyra si tiene éxito. "Podemos salvar a Aldric y proteger al reino al mismo tiempo. Pero el ritual es peligroso. Si fallamos, el Señor del Vacío será liberado inmediatamente."

[set:alternative_ritual_found=true]

¿Arriesgan el ritual peligroso o eligen el camino más seguro de destrucción?`,
            choices: [
                { text: 'Intentar el Ritual de Separación', target: 'attempt_separation_ritual' },
                { text: 'Elegir el camino seguro de destrucción', target: 'destruction_path' },
                { text: 'Buscar más información antes de decidir', target: 'search_more_info' }
            ],
            conditions: [],
            events: [
                { type: 'check', stat: 'arcana', dc: 18, successNode: 'arcana_success', failNode: 'arcana_fail' }
            ],
            dice: [],
            items: [],
            variables: [{ name: 'alternative_ritual_found', value: true }]
        },
        
        {
            id: 'attempt_separation_ritual',
            title: 'El Ritual de Separación',
            narrative: `El grupo decide intentar el Ritual de Separación. Primero deben recuperar los cuatro Artefactos de Luz, luego viajar al Castillo de las Tinieblas para realizar el ritual.

[set:separation_ritual_attempted=true]

El viaje es largo y peligroso. Cada artefacto está protegido por un guardián poderoso, y el Rey Oscurio ha enviado a sus sirvientes para detenerlos.

Tras semanas de viaje y combate, el grupo finalmente tiene los cuatro artefactos:
- La Espada del Amanecer
- El Escudo de la Esperanza  
- El Orbe de la Verdad
- El Amuleto del Alma

Ahora deben entrar al Castillo de las Tinieblas y enfrentar al Rey Oscurio.

"Este ritual requiere que Aldric coopere," advierte Elara. "Debemos convencerlo de que hay otra manera."

[set:all_artifacts_collected=true]

¿Cómo entran al castillo?`,
            choices: [
                { text: 'Entrar por la puerta principal con los artefactos', target: 'enter_castle_front' },
                { text: 'Buscar una entrada secreta', target: 'find_secret_castle_entrance' },
                { text: 'Usar los artefactos para crear un portal', target: 'create_portal' }
            ],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'separation_ritual_attempted', value: true }, { name: 'all_artifacts_collected', value: true }]
        },
        
        {
            id: 'enter_castle_front',
            title: 'El Castillo de las Tinieblas',
            narrative: `El grupo se presenta ante las puertas masivas del Castillo de las Tinieblas. Las puertas están hechas de obsidiana negra, talladas con símbolos de dolor y sufrimiento.

Kaelen sostiene la Espada del Amanecer adelante. "¡Somos portadores de los Artefactos de Luz! ¡Venimos en paz!"

Las puertas se abren lentamente, como si el castillo mismo estuviera dudando. Dentro, el salón del trono es vasto y oscuro. En el trono de obsidiana, sentado como una estatua de desesperación, está el Rey Oscurio.

Aldric se levanta lentamente. Sus ojos son pozos de oscuridad infinita, pero por un momento, ven un destello de su humanidad original.

"Portadores de Luz..." su voz es un susurro que resuena en sus almas. "¿Han venido a destruirme? ¿O a liberarme de mi carga?"

[check:persuasion dc=20 success=persuasion_aldric fail=persuasion_aldric_fail]

[success]"Hemos venido a ofrecerte una alternativa," dice Elara con compasión. "Un ritual que puede separarte del Señor del Vacío sin liberarlo."[/success]

[failure]Aldric no se deja convencer. "No hay alternativa. Solo destrucción. O la mía, o la del mundo entero."[/failure]

El destino del reino depende de esta conversación.`,
            choices: [],
            conditions: [],
            events: [
                { type: 'check', stat: 'persuasion', dc: 20, successNode: 'persuade_aldric', failNode: 'persuade_aldric_fail' }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'persuade_aldric',
            title: 'La Esperanza de Redención',
            narrative: `Aldric escucha las palabras de Elara. Por primera vez en mil años, sus ojos dejan de ser pozos de oscuridad. Se ve en ellos... esperanza.

"¿Es... es posible?" pregunta con voz temblorosa. "¿He sufrido todo este tiempo en vano?"

Lyra explica el Ritual de Separación. "Requiere los cuatro Artefactos de Luz, que tenemos. Y requiere tu cooperación. El ritual transferirá al Señor del Vacío a una prisión eterna, y tú... tú serás libre."

Aldric cae de rodillas, llorando. "Mil años... mil años conteniendo la oscuridad. ¿Realmente puedo ser libre?"

"El ritual es peligroso," advierte Kaelin. "Si fallamos, el Señor del Vacío será liberado. Pero es nuestra mejor esperanza."

Aldric se levanta, decidido. "Háganlo. No importa el riesgo. No puedo continuar así."

[set:aldric_cooperates=true]

El ritual comienza. Los cuatro artefactos se colocan en círculo alrededor de Aldric. El grupo recita las palabras antiguas mientras la energía de los artefactos fluye hacia el Rey Oscurio.

[check:arcana dc=22 success=ritual_success fail=ritual_fail]

[success]El ritual funciona. Una luz deslumbrante emerge de Aldric, y una entidad de pura oscuridad es arrancada de su cuerpo. El Señor del Vacío es transferido a una prisión dimensional, y Aldric cae al suelo, libre por fin.[/success]

[failure]El ritual falla. El Señor del Vacío es liberado, y el castillo comienza a colapsar bajo su poder.[/failure]`,
            choices: [],
            conditions: [],
            events: [
                { type: 'check', stat: 'arcana', dc: 22, successNode: 'ritual_success', failNode: 'ritual_fail' }
            ],
            dice: [],
            items: [],
            variables: [{ name: 'aldric_cooperates', value: true }]
        },
        
        {
            id: 'ritual_success',
            title: 'La Liberación',
            narrative: `El ritual funciona perfectamente. Una luz deslumbrante emerge de Aldric, y una entidad de pura oscuridad es arrancada de su cuerpo. El Señor del Vacío es transferido a una prisión dimensional, sellada para la eternidad.

Aldric cae al suelo, libre por fin. Cuando se levanta, sus ojos son marrones cálidos, llenos de vida y gratitud.

"Estoy... libre," susurra, tocando su rostro como si no pudiera creerlo. "Después de mil años... soy yo otra vez."

El grupo lo ayuda a levantarse. El castillo, que antes era un lugar de oscuridad, ahora comienza a brillar con luz suave. La corrupción se disipa.

[set:true_redemption_ending=true]

**FINAL VERDADERO - La Redención Completada**

Aldric renuncia al trono y se convierte en un ermita, dedicando su vida a ayudar a aquellos que sufren como él sufrió. Los cuatro héroes son celebrados como salvadores del reino, y su historia se cuenta por generaciones.

A veces, la compasión y la perseverancia pueden lograr lo que la fuerza nunca podría. El Rey Oscurio no fue destruido, fue salvado. Y al salvarlo, salvaron al reino entero.`,
            choices: [],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'true_redemption_ending', value: true }]
        },
        
        {
            id: 'ritual_fail',
            title: 'El Desastre',
            narrative: `El ritual falla catastróficamente. El Señor del Vacío es liberado, y el castillo comienza a colapsar bajo su poder.

"¡NO!" grita Aldric. "¡Lo he arruinado todo!"

La entidad de oscuridad se expande, consumiendo todo a su paso. El grupo intenta huir, pero el castillo se derrumba sobre ellos.

[set:catastrophic_ending=true]

**FINAL CATASTRÓFICO - El Vacío Liberado**

El Señor del Vacío consume el reino entero. No hay escape. No hay esperanza. La oscuridad es absoluta.

Aldric, el grupo de héroes, y todo el reino son absorbidos por el Vacío. Sus almas vagan en la nada por la eternidad, atrapados en un estado de no-existencia.

A veces, las mejores intenciones llevan a los peores resultados. El grupo trató de hacer lo correcto, pero el riesgo era demasiado grande.`,
            choices: [],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'catastrophic_ending', value: true }]
        },
        
        {
            id: 'stop_aldric',
            title: 'La Decisión Difícil',
            narrative: `"Debe ser detenido," decide Kaelen con pesar pero determinación. "No podemos arriesgar el destino del mundo por la compasión."

El grupo recupera los cuatro Artefactos de Luz y viaja al Castillo de las Tinieblas. Esta vez, no hay negociación. No hay compasión. Solo el deber de proteger al reino.

Al llegar al castillo, el grupo se enfrenta a Aldric directamente.

"Venimos a detenerte, Rey Oscurio," declara Kaelen. "Tu ritual debe ser detenido."

Aldric los mira con sus ojos de oscuridad. "¿Creen que pueden detenerme? He contenido al Señor del Vacío por mil años. ¿Qué son cuatro mortales ante tal poder?"

[combat:start]

**JEFE FINAL: EL REY OSCURO (ALDRIC CORRUPTO)**
- HP: 400, Ataque: +25, Defensa: 20
- Habilidades: Llamas del Vacío, Escudo de Sombras, Invocar No Muertos, Último Sacrificio

Este es el combate final. El destino del reino depende del resultado.`,
            choices: [],
            conditions: [],
            events: [
                { type: 'combat', enemies: ['dark_king_boss'] }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'face_void_lord',
            title: 'Enfrentar al Señor del Vacío',
            narrative: `"Si el Señor del Vacío es el verdadero problema," propone Lyra, "¿por qué no lo enfrentamos directamente?"

El grupo decide buscar una forma de comunicarse con el Señor del Vacío dentro de Aldric. Usan el Orbe de la Verdad para ver más allá de la corrupción.

[check:wisdom dc=20 success=wisdom_void_success fail=wisdom_void_fail]

[success]Elara logra comunicarse con el Señor del Vacío. La entidad es antigua, más antigua que el universo mismo. No es malvola en el sentido humano... simplemente es. El Vacío es la ausencia de existencia, y anhela volver a ser nada.[/success]

[failure]El Señor del Vacío es demasiado alienígena para comprender. Su mente es un abismo que consume todo lo que intenta entenderlo.[/failure]

"El Vacío no quiere destruir," explica Elara si tiene éxito. "Quiere volver a ser nada. Pero para ser nada, debe consumir todo lo que existe."

Esto cambia todo. El Señor del Vacío no es el villano... es una fuerza natural que simplemente es. El verdadero villano es la situación misma.

[set:understands_void_lord=true]

¿Qué hace el grupo con esta revelación?`,
            choices: [
                { text: 'Ayudar al Vacío a volver a ser nada (destruir el universo)', target: 'help_void_return' },
                { text: 'Encontrar una forma de contener al Vacío eternamente', target: 'contain_void_forever' },
                { text: 'Negociar con el Vacío', target: 'negotiate_with_void' }
            ],
            conditions: [],
            events: [
                { type: 'check', stat: 'wisdom', dc: 20, successNode: 'wisdom_void_success', failNode: 'wisdom_void_fail' }
            ],
            dice: [],
            items: [],
            variables: [{ name: 'understands_void_lord', value: true }]
        },
        
        {
            id: 'negotiate_with_void',
            title: 'Negociación con el Vacío',
            narrative: `"Negociemos con el Vacío," sugiere Elara. "Quizás podamos encontrar un acuerdo que beneficie a todos."

Usando el Orbe de la Verdad y el Amuleto del Alma, el grupo establece comunicación directa con el Señor del Vacío.

"¿Qué quieres?" pregunta Lyra directamente a la entidad.

La respuesta no es palabras, sino conceptos puros: **EXISTENCIA. QUIERO EXISTIR. NO SER NADA. SER ALGO.**

El Señor del Vacío no quiere destruir. Quiere existir. Quiere ser algo más que la ausencia de todo.

[check:charisma dc=22 success=charisma_void_success fail=charisma_void_fail]

[success]Kaelen tiene una idea. "Si el Vacío quiere existir, quizás podamos darle una forma. No una forma física, pero una forma conceptual. Podemos convertirlo en el guardián del equilibrio entre existencia y no-existencia."[/success]

[failure]El Vacío no puede ser convencido. Su anhelo de ser algo es demasiado profundo, demasiado fundamental.[/failure]

Si tienen éxito, esta podría ser la solución más inesperada de todas.`,
            choices: [],
            conditions: [],
            events: [
                { type: 'check', stat: 'charisma', dc: 22, successNode: 'charisma_void_success', failNode: 'charisma_void_fail' }
            ],
            dice: [],
            items: [],
            variables: []
        },
        
        {
            id: 'charisma_void_success',
            title: 'El Guardián del Equilibrio',
            narrative: `Kaelin propone una solución audaz. "Si el Vacío quiere existir, podemos darle una forma. No física, pero conceptual. Podemos convertirlo en el guardián del equilibrio entre existencia y no-existencia."

El Señor del Vacío considera esta propuesta. Por primera vez en la historia del universo, la entidad de nada considera la posibilidad de ser algo.

[set:void_guardian_proposed=true]

"El ritual requeriría los cuatro Artefactos de Luz," explica Lyra. "Pero no para destruir o contener. Para transformar. Para dar al Vacío un propósito y una forma."

Aldic, que ha estado escuchando, habla por primera vez. "¿Esto... esto me liberaría? ¿Y al Vacío le daría lo que anhela?"

"Sí," responde Elara. "Todos saldríamos ganando. Tú serías libre. El Vacío tendría existencia. El reino estaría a salvo."

[set:transcendent_solution=true]

**FINAL TRANSCENDENTE - El Guardián del Equilibrio**

El ritual se realiza. El Señor del Vacío es transformado en el Guardián del Equilibrio, una entidad conceptual que mantiene el balance entre existencia y no-existencia. Aldric es liberado de su carga milenaria.

El grupo no solo ha salvado el reino, ha transformado la naturaleza fundamental del universo. El Vacío ya no es una amenaza, sino un guardián necesario.

Esta es la solución más inesperada y profunda que cualquiera podría haber imaginado. A veces, los problemas más grandes tienen las soluciones más inesperadas.`,
            choices: [],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'void_guardian_proposed', value: true }, { name: 'transcendent_solution', value: true }]
        },
        
        {
            id: 'charisma_void_fail',
            title: 'El Anhelo Insatisfecho',
            narrative: `El Señor del Vacío no puede ser convencido. Su anhelo de ser algo es demasiado profundo, demasiado fundamental. La entidad no puede aceptar una solución parcial.

"EXISTENCIA. QUIERO EXISTIR. COMPLETA. NO PARCIAL."

El grupo se queda sin opciones. El Vacío continuará buscando la existencia completa, lo que significa la destrucción de todo lo que existe.

[set:void_ending_fail=true]

**FINAL DEL VACÍO - El Anhelo Eterno**

El Señor del Vacío eventualmente consume todo. El universo entero se convierte en nada. Pero incluso en la nada, el Vacío sigue existiendo, eternamente insatisfecho, eternamente buscando la existencia completa que nunca podrá tener.

Es un final existencial, un final donde la nada misma anhela ser algo. Es el final más profundo y filosófico posible.`,
            choices: [],
            conditions: [],
            events: [],
            dice: [],
            items: [],
            variables: [{ name: 'void_ending_fail', value: true }]
        }
    ],
    
    startNodeId: 'start',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

// Function to load this epic adventure
function loadEpicAdventure() {
    try {
        console.log('Loading epic adventure...');
        const adventures = JSON.parse(localStorage.getItem(ADVENTURES_STORAGE_KEY) || '[]');
        console.log('Current adventures:', adventures.length);
        
        const existingIndex = adventures.findIndex(a => a.id === EPIC_ADVENTURE.id);
        if (existingIndex > -1) {
            adventures[existingIndex] = EPIC_ADVENTURE;
            console.log('Updating existing epic adventure');
        } else {
            adventures.push(EPIC_ADVENTURE);
            console.log('Adding new epic adventure');
        }
        
        localStorage.setItem(ADVENTURES_STORAGE_KEY, JSON.stringify(adventures));
        console.log('Epic adventure loaded successfully');
        console.log('Total adventures:', adventures.length);
        return EPIC_ADVENTURE;
    } catch (error) {
        console.error('Error loading epic adventure:', error);
        return null;
    }
}

// Auto-load if in browser environment
if (typeof window !== 'undefined') {
    window.loadEpicAdventure = loadEpicAdventure;
    
    // Auto-load on page load if no adventures exist
    document.addEventListener('DOMContentLoaded', function() {
        const adventures = JSON.parse(localStorage.getItem(ADVENTURES_STORAGE_KEY) || '[]');
        if (adventures.length === 0) {
            console.log('No adventures found, loading epic adventure...');
            loadEpicAdventure();
            setTimeout(() => location.reload(), 500);
        }
    });
}
