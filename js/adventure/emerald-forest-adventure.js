const EMERALD_FOREST_ADVENTURE = {
    id: 'emerald_forest_whispers',
    title: 'Susurros en los Bosques Esmeralda',
    description: 'Aventura solitaria sin personaje predefinido. Ideal para leer en voz alta y decidir: alianzas frágiles, secretos antiguos y un bosque que escucha. Incluye checks de información (1d20) con pistas opcionales.',
    category: 'Bosques Esmeralda',
    level: 5,
    tags: ['roleo', 'misterio', 'bosque', 'fey', 'decisiones', 'muchas_escenas'],
    type: 'solo',
    coverImage: '../images/aventura_pc.png',
    nodes: [
        {
            id: 'start',
            title: 'El Umbral Verde',
            narrative: `# Los Bosques Esmeralda

El camino se apaga bajo las raíces como una vela que se extingue lentamente, luchando contra una oscuridad que no es de noche, sino de antigüedad. La última piedra del sendero queda atrás, y con ella, la certeza de que el mundo "civilizado" tiene reglas, límites, y consecuencias predecibles.

El aire cambia drásticamente. Ya no huele a polvo de carretera, ni a humo de chimenea, ni a los olores familiares de las ciudades. Ahora huele a *hoja mojada* que ha esperado siglos para ser pisada, a savia fresca que sangra de cortes recientes como heridas que aún sanan, a tierra húmeda que guarda secretos de eras olvidadas, y a algo más: algo indefinible, una promesa antigua que te roza la nuca como un susurro, como si el bosque mismo estuviera probando tu nombre en la lengua, decidiendo si merece ser recordado.

Delante de ustedes, los árboles no son solo árboles. Son columnas vivas de un templo que nunca tuvo arquitecto humano, construido por raíces que se entrelazan como los dedos de amantes eternos. Los troncos son tan gruesos que tres hombres abrazados no alcanzarían a rodearlos, y la corteza tiene patrones que parecen rostros que observan con curiosidad ancestral, rostros que cambian sutilmente cuando parpadean, como si estuvieran vivos, como si fueran.

La luz aquí no es la misma. No cae del cielo en líneas rectas y predecibles. Se filtra a través de un dosel tan denso que el sol se vuelve verde, dorado, a veces violeta, como si la luz misma tuviera que negociar su paso con las hojas. Sombras se mueven sin que nada las proyecte, sombras que tienen peso, forma, intención, como si la oscuridad aquí no fuera ausencia de luz, sino otra forma de existencia.

Ustedes están en el borde. Un paso más y entran. Un paso atrás y regresan a un mundo donde la magia es historia, no memoria, donde los árboles son solo madera y el susurro del viento es solo viento.

--- 

## Roleo
Antes de cruzar el umbral, antes de que el bosque note su presencia definitivamente, respondan en ronda, cada uno con su verdad más profunda:

- ¿Qué **deuda** o **búsqueda** los trajo hasta este borde? ¿Quién los envió, o qué pérdida los empujó hacia adelante, o qué promesa rota los persigue como un fantasma?
- ¿A quién le juraron "volver", aunque sepan en su corazón que quizá no lo cumplan? ¿Qué promesa pesa más que el miedo, más que la razón, más que el instinto de supervivencia?

> "Los Bosques Esmeralda no te pierden: *te reclaman*."

[check:informacion dc=12]
[success]De repente, entre el silencio que parece absoluto, reconocen el canto de un ave que no existe fuera del bosque: *el mirlón de esmeralda*. Su melodía es como campanas de cristal que rompen y se recomponen en el aire, notas que parecen venir de todas direcciones y ninguna a la vez, una música que no se oye con los oídos sino con el alma. En las historias que sus abuelos contaban en noches de tormenta, cuando el fuego crepitaba y las sombras danzaban, su presencia anuncia que el bosque "está despierto", que está *consciente* de su presencia, que los ha notado antes de que pusieran un pie dentro, que ha estado esperándolos desde antes de que nacieran.[/success]
[failure]El silencio les parece natural. Tranquilo. Pacífico incluso. Un silencio que podría ser el de cualquier bosque en cualquier día. Pero a veces lo natural es la máscara de lo inevitable. A veces el silencio más absoluto es el que más grita, y a veces lo que parece paz es solo el momento antes de que la presa se dé cuenta de que está siendo cazada.[/failure]`,
            choices: [
                { text: 'Entrar por la senda de helechos (rápido, estrecho)', target: 'fern_path' },
                { text: 'Rodear por el arroyo de vidrio (lento, seguro)', target: 'glass_stream' },
                { text: 'Encender una lámpara y marcar el camino (prudente)', target: 'marked_light' }
            ]
        },
        {
            id: 'fern_path',
            title: 'Senda de Helechos',
            narrative: `El sendero se aprieta como si el bosque mismo estuviera exhalando, cerrándose alrededor de ustedes. Los helechos les acarician las manos como si contaran dedos, como si estuvieran saludando a viejos amigos que regresan después de mucho tiempo, o como si estuvieran memorizando sus texturas para poder reconocerlos en la oscuridad. La luz cae en cuchilladas verdes, fragmentos de sol que logran filtrarse a través del techo de hojas, creando patrones en el suelo que parecen letras de un idioma olvidado.

El aire aquí es más denso, más pesado, como si respirar requiriera más esfuerzo, como si cada inhalación fuera un pacto con el bosque.

## Roleo
Elijan en grupo, mientras los helechos susurran a su alrededor: ¿Quién va adelante y qué "señal" acordaron si algo sale mal? ¿Qué gesto, qué palabra, qué sonido será su alerta silenciosa?

[check:informacion dc=13]
[success]Detectan símbolos tallados en un tronco anciano, tan viejo que su corteza parece piel arrugada: un círculo y tres líneas que se entrelazan como serpientes. Marca de los **Guardianes de Savia**, una orden druidica que "cobra peaje" por cruzar sin permiso, no con oro, que para ellos no tiene valor, sino con secretos, con historias, con fragmentos de verdad que el bosque anhela conocer.[/success]
[failure]Pasan de largo… y el bosque se lo anota. No con tinta: con memoria. Cada árbol que cruzan, cada hoja que pisan, se convierte en parte del registro que el bosque mantiene de quienes osan entrar sin pedir permiso. La memoria del bosque es larga, y su paciencia, más larga aún.[/failure]`,
            choices: [
                { text: 'Seguir sin detenerse, como si no vieran nada', target: 'sudden_breeze' },
                { text: 'Dejar una ofrenda (comida, moneda, promesa)', target: 'offering' },
                { text: 'Buscar a quien dejó las marcas', target: 'sapia_watchers' }
            ]
        },
        {
            id: 'glass_stream',
            title: 'El Arroyo de Vidrio',
            narrative: `El agua corre clara, tan clara que parece *mentir*, tan transparente que podría ser aire condensado en forma líquida. Las piedras del fondo brillan como ojos que los observan desde la profundidad, ojos que no parpadean pero que siguen cada movimiento, cada gesto, cada respiración. A cada paso, el arroyo devuelve reflejos que no coinciden del todo con ustedes: versiones ligeramente diferentes, versiones que podrían ser quienes fueron, quienes son, o quienes serán.

> En el reflejo, alguien sonríe un segundo tarde. Una sonrisa que no parece suya, una sonrisa que parece conocer secretos que ustedes aún no han descubierto.

[check:informacion dc=14]
[success]Recuerdan la regla de los arroyos feéricos, enseñada por mentores que ya no existen o leída en libros que ya no se encuentran: **nunca** mirarse dos veces en el mismo remanso. La primera mirada muestra lo que eres. La segunda mirada "cobra" algo a cambio: un recuerdo, un nombre, un fragmento de identidad que el agua reclama como tributo.[/success]
[failure]Se entretienen con el reflejo… y el reflejo parece entretenerse con ustedes. El agua se ríe con el sonido de mil risas superpuestas, y por un momento, no están seguros de si están mirando el agua o si el agua los está mirando a ellos, devorándolos con una curiosidad que podría ser inocente… o podría ser hambre.[/failure]`,
            choices: [
                { text: 'Cruzar evitando mirar el agua', target: 'across_without_looking' },
                { text: 'Hablarle al arroyo (pedir paso, preguntar por señales)', target: 'talk_to_stream' },
                { text: 'Tomar una piedra del fondo como "amuleto"', target: 'take_stone' }
            ]
        },
        {
            id: 'marked_light',
            title: 'Luz Marcada',
            narrative: `Encienden una lámpara. La llama tiembla, no por el viento, sino porque el bosque parece observarla con curiosidad, como si fuera un animal nuevo, una criatura que nunca ha visto antes, algo que debe ser estudiado, comprendido, tal vez domesticado.

Van dejando señales: una rama cruzada, un nudo de hilo, un trazo en el barro. Marcas que parecen sólidas, permanentes, confiables. Pero en los Bosques Esmeralda, nada es lo que parece, y nada permanece igual por mucho tiempo.

[check:informacion dc=12]
[success]Saben que en los Bosques Esmeralda las marcas funcionan… *hasta que el bosque decide cambiarlas*. Un mapa útil, pero no eterno. Un camino seguro, hasta que el bosque decide que ya no debería serlo. El bosque no se opone a que usen sus caminos, pero tampoco promete que esos caminos seguirán siendo caminos mañana.[/success]
[failure]Confían demasiado en sus señales. El bosque ama la confianza: tiene dientes para eso. La confianza ciega, y lo que no se ve, no se puede evitar. Las marcas que dejaron comienzan a moverse cuando no las miran, reorganizándose en patrones que no reconocen, caminos que no eligieron, destinos que no desean.[/failure]`,
            choices: [
                { text: 'Seguir con la lámpara alta (desafiante)', target: 'eyes_in_canopy' },
                { text: 'Bajar la luz y avanzar en silencio (cauteloso)', target: 'silent_steps' },
                { text: 'Apagar la lámpara y dejar que el bosque guíe (arriesgado)', target: 'guided_by_dark' }
            ]
        },
        {
            id: 'sudden_breeze',
            title: 'Brisa que No Sopla',
            narrative: `La brisa llega sin mover hojas. No hay viento, pero hay aire frío que te enfría la nuca y te susurra un nombre al oído. No el tuyo: *el que te prohibiste decir*, el nombre que carries enterrado en la parte más profunda de tu memoria, el nombre que associated con dolor, con pérdida, con una culpa que nunca te perdonaste del todo.

## Roleo
Cada jugador elige, mientras la brisa sigue susurrando nombres que no deberían ser escuchados:
- ¿Qué nombre escuchó?
- ¿Por qué ese nombre duele? ¿Qué historia lleva, qué peso arrastra?

[check:informacion dc=15]
[success]Identifican un truco clásico del bosque: el **Viento de Recuerdo**. No mata, pero desarma al grupo, sembrando dudas donde no debería haberlas, despertando recuerdos donde deberían haber olvido. Resistan con palabras simples: "*estoy acá*", "*este es mi nombre*", "*no soy ese nombre*". Las palabras simples son anclas en un mar de confusión feérica.[/success]
[failure]El susurro se vuelve conversación. Y la conversación se vuelve camino. Cada nombre susurrado se convierte en un sendero que se abre en el bosque, caminos que no eligieron, destinos que no desean, hacia lugares donde el pasado espera ser confrontado, donde las deudas no pagadas cobran interés compuesto.[/failure]`,
            choices: [
                { text: 'Responder en voz alta al nombre (con sinceridad)', target: 'answer_the_name' },
                { text: 'Ignorarlo y apretar el paso', target: 'push_forward' },
                { text: 'Hacer un juramento grupal para mantenerse unidos', target: 'group_oath' }
            ]
        },
        {
            id: 'offering',
            title: 'Ofrenda al Tronco',
            narrative: `Dejan una ofrenda al pie del árbol marcado. Puede ser pan, una moneda, un mechón de pelo… o una promesa pronunciada con la garganta seca, con las palabras que pesan más que el oro.

El bosque tarda en responder. Segundos que se sienten como horas, minutos que podrían ser días. Luego, una hoja cae. No cualquier hoja: *justo en el centro* de la ofrenda, como si el bosque hubiera medido, calculado, decidido con precisión milimétrica.

[check:informacion dc=12]
[success]El gesto es aceptación. En los ritos de savia, enseñados por druidas que ya son polvo, la hoja en el centro significa: "pasan, pero los miro". El bosque permite el paso, pero no olvida. Cada paso que dan, cada decisión que toman, queda registrado en la memoria del bosque, disponible para cuando el bosque decida cobrar el precio de su generosidad.[/success]
[failure]La hoja no cae. Permanece suspendida en el aire, desafiando la gravedad, desafiando la lógica. Pero el silencio, por un momento, pesa como un juicio, como si el bosque estuviera considerando si la ofrenda es suficiente, si el sacrificio es digno, si merecen el privilegio de continuar o si deberían convertirse en parte del bosque para siempre, como tantos otros antes que ellos.[/failure]`,
            choices: [
                { text: 'Seguir y agradecer (aunque no sepan a quién)', target: 'safe_corridor' },
                { text: 'Cambiar la ofrenda por una más personal', target: 'deeper_offering' },
                { text: 'Romper la marca del tronco (provocación)', target: 'break_the_mark' }
            ]
        },
        {
            id: 'sapia_watchers',
            title: 'Los Guardianes de Savia',
            narrative: `Los ven cuando deciden que pueden verlos: siluetas entre líquenes que parecen moverse cuando no los miras, máscaras de corteza que podrían ser rostros o podrían ser decoración, ojos verdes como vidrio oscuro que reflejan un mundo que no existe.

Una voz suave, casi amable, emerge de entre los árboles:
> "¿Cruzan por necesidad… o por capricho?"

La pregunta no es casual. La respuesta determinará todo lo que sigue.

## Roleo
Respondan como grupo. Elijan un portavoz. El bosque *escucha el tono*, no solo las palabras. Una mentira dicha con verdad puede ser aceptada. Una verdad dicha con mentira puede ser rechazada.

[check:informacion dc=14]
[success]Reconocen el protocolo ancestral: no se negocia con oro. El oro no tiene valor aquí. Se negocia con **verdades**. La primera mentira suele costar caro, pero la primera verdad puede abrir puertas que ni sabían que existían, caminos que ni imaginaron que podían tomar.[/success]
[failure]Se sienten presionados a "quedar bien" y adornan la historia. El bosque adora los adornos: se enreda con ellos. Cada exageración, cada omisión, cada mentira piadosa se convierte en una cuerda que el bosque puede usar para atarlos, para manipularlos, para guiarlos hacia donde el bosque quiere que vayan, no hacia donde ellos desean ir.[/failure]`,
            choices: [
                { text: 'Decir la verdad completa, aunque los deje mal parados', target: 'truth_bargain' },
                { text: 'Ofrecer un servicio: limpiar una corrupción del bosque', target: 'service_offer' },
                { text: 'Desafiarlos: "pasamos igual"', target: 'challenge_guardians' }
            ]
        },
        {
            id: 'across_without_looking',
            title: 'Cruce Ciego',
            narrative: `Cruzan sin mirar. A medio paso, el agua suena como un aplauso pequeño, como si el arroyo estuviera aplaudiendo su prudencia o burlándose de su miedo. Al final, la orilla opuesta parece la misma… pero no *huele* igual. Huele a otro lado, a otro tiempo, a otra versión de la realidad.

Una risa diminuta, como una campanilla que se rompe, se esconde en un arbusto. Una risa que podría ser de alegría o podría ser de anticipación, una risa que podría pertenecer a un amigo o podría pertenecer a algo que nunca ha conocido la amistad.

[check:informacion dc=13]
[success]Saben que las risas en el bosque son señales: un ser feérico los "adoptó" como entretenimiento… o como presa. La diferencia es sutil pero crucial: el entretenimiento suele ser divertido. La presa, rara vez lo es.[/success]
[failure]Creen que es un animal. El bosque sonríe con paciencia. Paciencia de depredador que sabe que la presa eventualmente se cansará, eventualmente bajará la guardia, eventualmente estará lista para ser cazada. El bosque tiene tiempo. Mucho tiempo.[/failure]`,
            choices: [
                { text: 'Buscar a la criatura que ríe', target: 'sprite_meeting' },
                { text: 'Acelerar y salir de la zona del arroyo', target: 'moss_cathedral' },
                { text: 'Hacer una broma en voz alta (invitar a un juego)', target: 'joke_back' }
            ]
        },
        {
            id: 'talk_to_stream',
            title: 'Conversación con Agua',
            narrative: `Le hablan al arroyo como si fuera alguien. Y por un instante… lo es. El agua deja de ser agua y se convierte en algo más, algo que tiene conciencia, algo que tiene memoria, algo que tiene voz.

El agua forma un remolino que parece una boca, una boca que habla con el sonido de mil ríos superpuestos:
> "¿Qué buscan en mí… si no son reflejo?"

La pregunta es profunda, más profunda de lo que parece. Pregunta sobre sus identidades, sobre sus deseos, sobre la diferencia entre quienes son y quienes creen ser.

[check:informacion dc=15]
[success]Recuerdan un nombre verdadero del arroyo, aprendido de textos prohibidos o enseñado por mentores que ya no existen: **Vitra**. Pronunciarlo con respeto abre puertas pequeñas en el bosque, caminos que normalmente estarían cerrados, secretos que normalmente estarían ocultos.[/success]
[failure]El remolino se burla: "los nombres son para quienes pertenecen". El arroyo no los reconoce, no los acepta, no los permite. El agua se vuelve turbia, hostil, peligrosa, como si hubiera decidido que no son dignos de pasar, de continuar, de existir en su dominio.[/failure]`,
            choices: [
                { text: 'Decir "Vitra" y pedir una pista (con humildad)', target: 'vitreous_hint' },
                { text: 'Ofrecer algo al agua (una gota de sangre, una historia)', target: 'water_trade' },
                { text: 'Ignorar el fenómeno y cruzar igual', target: 'across_without_looking' }
            ]
        },
        {
            id: 'take_stone',
            title: 'Piedra que Recuerda',
            narrative: `Una mano se hunde en el agua y toma una piedra verde. Al salir, la piedra está tibia… como si acabaran de sacarla de un bolsillo humano, como si alguien la hubiera estado guardando cerca del corazón, esperando el momento perfecto para regresarla.

La piedra pulsa suavemente, como si tuviera un latido propio, como si estuviera viva de una manera que las piedras no deberían estar vivas.

## Roleo
¿A quién le "pertenece" la piedra? Cada jugador propone una teoría. ¿Qué historia carga esta piedra? ¿Qué memoria guarda? ¿ qué peso arrastra?

[check:informacion dc=16]
[success]Saben lo que implica: la piedra es un **ancla**. Una parte del bosque ahora viaja con ustedes. Y el bosque, a veces, tira de la cuerda. Dondequiera que vayan, el bosque podrá encontrarlos. Dondequiera que se escondan, el bosque sabrá dónde están. La piedra es un regalo, pero también es una cadena.[/success]
[failure]La piedra es linda. Eso basta para que la guarden. Lo lindo también muerde. Lo bello también puede ser peligroso. La piedra parece inofensiva, pero las cosas más peligrosas del bosque siempre parecen inofensivas al principio.[/failure]`,
            choices: [
                { text: 'Guardar la piedra y seguir', target: 'moss_cathedral' },
                { text: 'Devolverla con disculpas', target: 'glass_stream' },
                { text: 'Partirla para "romper el hechizo"', target: 'stone_break' }
            ]
        },
        {
            id: 'eyes_in_canopy',
            title: 'Ojos en la Copa',
            narrative: `Con la lámpara en alto, ven puntos de luz entre las ramas. No son estrellas: están demasiado cerca y parpadean en respuesta a su presencia, como si estuvieran comunicándose entre sí, discutiendo si deberían revelarse o permanecer ocultos.

> El bosque *contesta* cuando lo miran. Pero no siempre responde con lo que esperas.

[check:informacion dc=13]
[success]Reconocen un patrón de vigilancia: tres parpadeos cortos, uno largo. Señal de "grupo observado", usada por exploradores druidas para marcar territorios peligrosos, lugares donde el bosque está despierto y hambriento, donde la curiosidad puede costar más que la vida.[/success]
[failure]Les parece azar. El azar, en el bosque, es un lujo que rara vez existe. Todo tiene propósito, todo tiene significado, todo es parte de un plan tan antiguo y complejo que mentes mortales apenas pueden comprender sus bordes, mucho menos su centro.[/failure]`,
            choices: [
                { text: 'Saludar a los observadores con una señal (sin armas)', target: 'sapia_watchers' },
                { text: 'Bajar la luz para no ser blanco', target: 'silent_steps' },
                { text: 'Acelerar para "salirse" del área', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'silent_steps',
            title: 'Pasos Silenciosos',
            narrative: `Caminar se vuelve un ritual: *pie, pausa, escuchar*. La tierra está esponjosa, como si el bosque quisiera atraparlos sin esfuerzo, como si cada paso pudiera ser el último, como si el suelo mismo pudiera decidir abrirse y tragarlos.

En un claro pequeño, encuentran un círculo de hongos. No hongos ordinarios: hongos que brillan con luz propia, hongos que parecen respirar, hongos que forman un patrón demasiado perfecto para ser natural.

[check:informacion dc=14]
[success]El círculo es una frontera feérica. Cruzarlo sin permiso puede "cambiarles" algo: sombra, voz, recuerdos. El bosque exige su precio, y el precio puede ser cualquier cosa que poseas, incluso las cosas que ni sabías que poseías.[/success]
[failure]Un círculo de hongos, nada más. Y sin embargo, el aire alrededor está demasiado quieto. Demasiado quieto para ser natural. Demasiado quieto para ser seguro. El silencio tiene peso aquí, y ese peso está presionando contra ellos, esperando que cometan un error.[/failure]`,
            choices: [
                { text: 'Rodear el círculo sin cruzarlo', target: 'moss_cathedral' },
                { text: 'Cruzar por el centro (desafiando el rito)', target: 'fey_turn' },
                { text: 'Dejar una palabra de permiso ("con su venia") y cruzar', target: 'polite_crossing' }
            ]
        },
        {
            id: 'guided_by_dark',
            title: 'Guiados por la Oscuridad',
            narrative: `Apagan la lámpara. Al principio no ven nada. La oscuridad es absoluta, completa, aterradora. Luego, ven lo que el bosque quiere: un sendero de luciérnagas que se ordenan como letras, como si el bosque mismo estuviera escribiendo un mensaje solo para ellos.

Forman una frase, una palabra, una promesa:
> "*Vengan.*"

No es una invitación. Es una orden. Pero no pueden resistirla.

[check:informacion dc=15]
[success]Saben que seguir luces en Bosques Esmeralda es un contrato tácito. No siempre malo. Siempre *vinculante*. Al seguir la luz, aceptan los términos del contrato, aunque no sepan cuáles son esos términos, aunque no sepan el precio que eventualmente tendrán que pagar.[/success]
[failure]Confunden miedo con intuición. No son lo mismo. Pero el bosque aprovecha ambos. El miedo los hace vulnerables. La intuición falsa los hace confiados. El bosque tiene mil formas de cazar, y todas comienzan con hacer creer a la presa que está tomando la decisión correcta.[/failure]`,
            choices: [
                { text: 'Seguir a las luciérnagas', target: 'moss_cathedral' },
                { text: 'Encender la lámpara a mitad de camino (romper el ritmo)', target: 'broken_rhythm' },
                { text: 'Negarse y tomar una dirección al azar', target: 'lost_loop' }
            ]
        },
        {
            id: 'moss_cathedral',
            title: 'La Catedral de Musgo',
            narrative: `Los árboles se juntan como columnas de un templo forgotten. El musgo cae en cortinas verdes que parecen telas tejidas por arañas gigantes, telas que han estado colgadas por siglos, acumulando historia en cada fibra. La luz entra filtrada y verde, como si estuvieran adentro de un templo underwater, como si el aire mismo fuera agua.

En el centro hay un altar de raíz, raíces que se entrelazan formando una plataforma natural, una mesa de sacrificio que ha esperado siglos por ofrendas. Sobre él, un cuenco vacío con runas que brillan con luz tenue, runas que parecen moverse cuando no las miras directamente.

--- 
## Roleo
¿Qué sienten al ver un altar en medio del bosque?
- *Devoción*, el deseo de arrodillarse y adorar algo más grande que ustedes.
- *Desconfianza*, la certeza de que todo esto es una trampa.
- *Fascinación*, la incapacidad de mirar hacia otro lado.
- *Rabia*, el enfoque de que nadie tiene derecho a exigir nada de ustedes.

[check:informacion dc=15]
[success]Las runas son un pedido: "**Nombre + Propósito**". Si lo llenan con verdad, el bosque les muestra una ruta verdadera. Si mienten, la ruta es verdadera… hacia otra cosa, hacia un destino que no eligieron, hacia un final que no desean pero que merecen por su mentira.[/success]
[failure]Las runas parecen decoración. Pero el cuenco está demasiado limpio para estar abandonado. Demasiado cuidado para algo que nadie usa. Demasiada intención para algo que supuestamente no tiene propósito. El bosque no deja cosas al azar, y este altar no es una excepción.[/failure]`,
            choices: [
                { text: 'Llenar el cuenco con agua del lugar y decir sus nombres', target: 'name_and_purpose' },
                { text: 'Dejar una ofrenda material (comida, metal, gema)', target: 'material_offering' },
                { text: 'Ignorar el altar y explorar la catedral', target: 'explore_cathedral' }
            ]
        },
        {
            id: 'name_and_purpose',
            title: 'Nombre y Propósito',
            narrative: `El agua toca el cuenco y se vuelve esmeralda, un verde tan profundo que parece tener profundidad, como si pudieras sumergirte en esa agua y viajar a otro mundo. El bosque espera, paciente pero expectante, como un juez que ha escuchado miles de casos y sabe que este será diferente.

## Roleo
Cada jugador dice su nombre (o el que usa en este viaje) y una frase corta de propósito. No mentiras. No medias verdades. Solo lo que es.
Ejemplos:
- "Busco a mi hermano."
- "Huyo de mí."
- "Quiero una respuesta."
- "Vengo a sanar lo que roto."

El cuenco tiembla y el agua forma una flecha, una flecha de luz líquida que apunta en una dirección que cambia sutilmente, como si estuviera indecisa, como si estuviera esperando que ustedes tomen la decisión final.

[check:informacion dc=14]
[success]Notan un detalle crucial: la flecha no apunta a un lugar, apunta a un *momento*. La ruta cambia según el orden en que caminen, según quién vaya primero, según quién vaya último. El bosque no les está mostrando un camino: les está mostrando un destino que depende de cómo lleguen allí.[/success]
[failure]Creen que es solo dirección. El bosque no discute: simplemente cobra después. La flecha los lleva a donde quiere llevarlos, no a donde ellos quieren ir, y para cuando se den cuenta del error, ya será demasiado tarde para retroceder.[/failure]`,
            choices: [
                { text: 'Seguir la flecha con el orden actual del grupo', target: 'emerald_gate' },
                { text: 'Cambiar el orden de marcha y seguir (probar el "momento")', target: 'order_matters' },
                { text: 'Volver atrás: no aceptar rutas "vivas"', target: 'lost_loop' }
            ]
        },
        {
            id: 'material_offering',
            title: 'Peso por Paso',
            narrative: `Dejan algo tangible. El cuenco "pesa" la ofrenda en silencio, evaluando su valor no en oro sino en significado, no en costo material sino en costo emocional.

Una raíz se abre como una mano, lentamente, como si despertara de un sueño largo, y toma lo ofrecido. La mano no tiene dedos humanos, pero tiene dedos de raíz, dedos que pueden agarrar con fuerza suficiente para romper huesos o con suficiente delicadeza para no romper una flor.

[check:informacion dc=13]
[success]Entienden la lógica profunda del bosque: el bosque no quiere riqueza; quiere **compromiso**. Lo que duele dejar es lo que abre rutas. Lo que cuesta dar es lo que permite avanzar. El sacrificio es la moneda del bosque, y el bosque siempre sabe exactamente cuánto puedes pagar.[/success]
[failure]No sienten cambio. Pero el cuenco guarda memoria. La deuda también. La ofrenda fue aceptada, pero el precio aún no ha sido cobrado. El bosque tiene tiempo. Mucho tiempo. Puede esperar años, décadas, siglos para cobrar una deuda, y cuando lo haga, el interés será astronómico.[/failure]`,
            choices: [
                { text: 'Seguir explorando la catedral', target: 'explore_cathedral' },
                { text: 'Insistir con una ofrenda mayor', target: 'deeper_offering' },
                { text: 'Buscar marcas de pasos alrededor (quién vino antes)', target: 'old_tracks' }
            ]
        },
        {
            id: 'explore_cathedral',
            title: 'Ecos Verdes',
            narrative: `Exploran la catedral de musgo, pasando entre cortinas verdes que parecen telas de un teatro forgotten. Detrás de una cortina de musgo hay un relieve tallado en la madera viva del árbol: una figura coronada con ramas, sosteniendo un corazón de piedra.

> El relieve tiene un hueco en el pecho: falta el corazón. El hueco parece reciente, como si alguien hubiera arrancado el corazón hace poco, o como si el corazón hubiera decidido abandonar su lugar por voluntad propia.

[check:informacion dc=16]
[success]Reconocen la leyenda contada en whispers y canciones: el **Corazón Esmeralda**. Una reliquia que mantiene al bosque sano, que mantiene el equilibrio entre vida y muerte, entre crecimiento y decadencia. Si se daña, el bosque se defiende "por fiebre": confunde, hiere, devora rutas, convierte el paraíso en infierno.[/success]
[failure]Una historia tallada. Bonita… y triste. Eso es todo, por ahora. No ven el peligro, no ven la importancia, no ven que el destino del bosque entero podría depender de lo que hagan a continuación. A veces la ignorancia es una bendición. Otras veces, es el primer paso hacia la catástrofe.[/failure]`,
            choices: [
                { text: 'Buscar el "corazón" perdido (investigar el hueco)', target: 'hollow_chest' },
                { text: 'Rezar o prometer proteger el bosque (roleo)', target: 'vow_to_forest' },
                { text: 'Dejar la catedral y seguir sin tocar nada', target: 'emerald_gate' }
            ]
        },
        {
            id: 'emerald_gate',
            title: 'La Puerta Esmeralda',
            narrative: `El bosque se abre en un arco natural de enredaderas, enredaderas que parecen serpientes dormidas, serpientes que podrían despertar si se les provoca. Entre las hojas, un brillo verde respira como un pulmón, como si el aire mismo estuviera vivo, como si cada inhalación fuera un acto de voluntad.

No es un portal de luz. Es un portal de *decisión*. Un lugar donde el bosque exige que elijas, donde no puedes avanzar sin pagar un precio, donde la indecisión es más peligrosa que la decisión equivocada.

> Al cruzarlo, el aire cambia: ya no están "en el bosque". Están "dentro" de él. El bosque ya no está alrededor de ustedes: está *dentro* de ustedes, en cada latido, en cada respiración, en cada pensamiento.

[check:informacion dc=15]
[success]Entienden la regla fundamental: una vez adentro, el bosque les pedirá un precio final. No necesariamente oro, no necesariamente sangre. El precio puede ser cualquier cosa que valore, cualquier cosa que amen, cualquier cosa que defina quién son. Mejor decidir *qué están dispuestos a perder* antes de seguir, porque el bosque tomará lo que no estés dispuesto a defender.[/success]
[failure]Cruzan sin pensar en precio. El bosque adora lo espontáneo: siempre tiene un recibo. Lo que das sin pensar, el bosque toma sin preguntar. Y cuando finalmente te des cuenta de lo que perdiste, ya es demasiado tarde para recuperarlo.[/failure]`,
            choices: [
                { text: 'Cruzar y aceptar lo que venga', target: 'fey_court' },
                { text: 'Detenerse y definir un "precio permitido" (roleo)', target: 'define_price' },
                { text: 'Retroceder y buscar otra ruta', target: 'lost_loop' }
            ]
        },
        {
            id: 'define_price',
            title: 'Precio Permitido',
            narrative: `Se detienen justo antes de cruzar. Se miran, realmente se miran, por primera vez quizá, viendo no solo compañeros de viaje sino personas con miedos, deseos, secretos. Dicen en voz baja lo que están dispuestos a sacrificar, lo que están dispuestos a perder, lo que están dispuestos a entregar al bosque.

## Roleo
Cada jugador elige 1, con total honestidad, porque el bosque sabrá si mientes:
- Un recuerdo feliz
- Un secreto
- Una promesa
- Un objeto querido

No lo entregan todavía. Solo lo nombran. Y el bosque… escucha. El bosque siempre escucha.

[check:informacion dc=13]
[success]Nombrar el sacrificio *antes* de que se lo pidan les da ventaja: pueden negociar el "cómo", pueden influir en la forma del pago, pueden asegurarse de que el precio no sea más alto de lo que pueden pagar. El bosque respeta la preparación, respeta la honestidad premeditada.[/success]
[failure]Nombrar el sacrificio llama la atención. Algo dentro del bosque empieza a salivar, algo antiguo y hambriento que ha esperado mucho tiempo por presas que saben lo que están ofreciendo. El bosque ahora sabe exactamente qué tomar, y tomará más de eso, mucho más.[/failure]`,
            choices: [
                { text: 'Cruzar la puerta esmeralda', target: 'fey_court' },
                { text: 'Cambiar de idea: no pagar nada', target: 'lost_loop' }
            ]
        },
        {
            id: 'fey_court',
            title: 'La Corte de las Hojas',
            narrative: `Una explanada imposible: un anfiteatro de troncos que se curvan como si hubieran crecido así naturalmente, hongos como lámparas que brillan con luz propia, luciérnagas ordenadas en símbolos que parecen formar palabras en un idioma que casi pueden entender.

En el centro, un asiento vacío hecho de ramas entrelazadas, un trono que parece esperar a alguien que nunca llega, o que llegó hace mucho tiempo y nunca se fue.

Una voz, sin dueño, sin origen, emerge de todas partes y ninguna:
> "Bienvenidos. **Hablen bonito**."

La voz no es una amenaza. Es una invitación. Pero las invitaciones de la corte feérica son las trampas más peligrosas.

--- 
## Roleo
La corte quiere entretenimiento. La corte ha esperado mucho tiempo. Elijan uno:
- Un relato breve de su viaje
- Una canción
- Un juramento dramático

Pero recuerden: todo lo que digan puede ser usado contra ustedes. La corte recuerda todo.

[check:informacion dc=16]
[success]Recuerdan la regla fundamental de la corte feérica: a la corte feérica no se le pregunta "quién manda", se le pregunta "quién *cuida*". Eso revela jerarquías reales, alianzas secretas, enemigos ocultos. Saber quién cuida este lugar puede ser la diferencia entre la vida y la muerte.[/success]
[failure]Se enfocan en impresionar. La corte ama el show… y castiga la falta de sustancia. Lo que es impresionante pero vacío es ofensivo para la corte. La corte prefiere la verdad imperfecta a la mentira perfecta.[/failure]`,
            choices: [
                { text: 'Preguntar con respeto: "¿Quién cuida este lugar?"', target: 'who_cares' },
                { text: 'Sentarse en el trono vacío (provocación o destino)', target: 'sit_on_throne' },
                { text: 'Ofrecer un trato: "ayudamos al bosque, ustedes nos guían"', target: 'offer_deal' }
            ]
        },
        {
            id: 'who_cares',
            title: 'Quién Cuida',
            narrative: `El silencio dura un latido, un momento que parece durar una eternidad. Luego, alguien responde desde arriba de un hongo gigante: una figura pequeña con corona de pétalos, pétalos que parecen hechos de luz y sombra entrelazadas.

> "Yo cuido lo que me cuida. ¿Y ustedes?"

La pregunta es simple pero devastadora. La corte ríe. No con maldad. Con hambre. Una hambre antigua, una hambre que ha esperado mucho tiempo.

[check:informacion dc=14]
[success]Entienden la clave política de la corte: la corte está dividida. Unos quieren **sanar** el bosque, restaurarlo a su gloria antigua. Otros quieren **aprovechar** su fiebre para ganar poder, para usar el caos para sus propios fines. Esta división es su oportunidad, pero también su mayor peligro.[/success]
[failure]La respuesta suena filosófica, profunda. Pero no ven la política escondida detrás. No ven que están en medio de una guerra civil feérica, que cada palabra puede ser un arma, cada silencio puede ser una traición, cada decisión puede determinar el destino del bosque entero.[/failure]`,
            choices: [
                { text: 'Prometer ayudar a sanar el bosque', target: 'healing_path' },
                { text: 'Preguntar por el Corazón Esmeralda', target: 'heart_question' },
                { text: 'Desafiar la lógica feérica con un acertijo', target: 'riddle_duel' }
            ]
        },
        {
            id: 'offer_deal',
            title: 'Trato con Sombras Verdes',
            narrative: `Proponen un trato. Las luciérnagas se apagan una por una, como si alguien cerrara ojos, como si la corte misma estuviera perdiendo interés. Una voz distinta, más grave, más antigua, responde:

> "Los tratos se firman con pérdidas."

La voz no está amenazando. Está stating un hecho, una ley fundamental de la corte.

[check:informacion dc=15]
[success]Saben que pueden "pagar" con algo reversible: una noche de sueño, un nombre falso, una historia. No todo pago es permanente si se formula bien, si se negocia con cuidado, si se entienden los términos exactos del contrato.[/success]
[failure]Piensan en oro o amenazas. La corte bosteza: no entiende ese idioma. La corte no negocia con cosas materiales. La corte negocia con partes del alma, con fragmentos de identidad, con trozos de esencia que no pueden ser reemplazados por oro.[/failure]`,
            choices: [
                { text: 'Pagar con una historia verdadera (roleo)', target: 'pay_with_story' },
                { text: 'Pagar con una noche de sueño (aceptar cansancio)', target: 'pay_with_sleep' },
                { text: 'Negarse a pagar y salir', target: 'lost_loop' }
            ]
        },
        {
            id: 'sit_on_throne',
            title: 'Asiento Vacío',
            narrative: `Alguien se sienta. La madera cruje, como si recordara cuerpos antiguos que se sentaron allí antes, cuerpos que ya no existen, nombres que ya no se recuerdan.

Por un segundo, el bosque respira *al mismo ritmo* que ustedes. Sus latidos se sincronizan, sus respiraciones se alinean, sus pensamientos se entrelazan como raíces subterráneas.

[check:informacion dc=17]
[success]Entienden lo que hicieron: ocuparon un rol. El bosque ahora los reconoce como "parte del juego". Eso abre puertas… y atrae enemigos. Ahora tienen poder en la corte, pero también tienen blancos en sus espaldas, enemigos que quieren ese poder para sí mismos.[/success]
[failure]El trono se siente frío. Pero el frío, en el bosque, también es una firma. El frío puede ser rechazo, o puede ser aceptación, o puede ser algo más complejo que ninguna de esas cosas. Sin entender, están volando a ciegas, y en el bosque, volar a ciegas es la forma más rápida de estrellarse.[/failure]`,
            choices: [
                { text: 'Levantarse de inmediato y disculparse', target: 'who_cares' },
                { text: 'Aprovechar el rol y exigir una verdad', target: 'demand_truth' },
                { text: 'Declarar un mandato: "venimos a sanar el bosque"', target: 'healing_path' }
            ]
        },
        {
            id: 'heart_question',
            title: 'La Pregunta Prohibida',
            narrative: `Nombran el Corazón Esmeralda. La corte deja de reír. Las luciérnagas se congelan en el aire. El silencio se vuelve absoluto, pesado, casi físico.

Una hoja cae. Se parte en dos al tocar el suelo, como si el bosque mismo estuviera rechazando la pregunta.

> "El corazón late… *en manos equivocadas*."

La revelación es devastadora. El corazón no fue robado. Fue entregado.

[check:informacion dc=16]
[success]Captan el subtexto, la verdad oculta detrás de las palabras: no lo robó un monstruo. Lo robó alguien con permiso, alguien con "derecho" antiguo… y ese derecho está corrompido. El traidor no es un extraño: es alguien que debería proteger el bosque, alguien que traicionó su propósito por poder, por ambición, por algo que valía más que la integridad.[/success]
[failure]Solo escuchan "robado" y "mal". El bosque detesta los resúmenes simplistas. Al no entender la complejidad de la situación, corren el riesgo de tomar decisiones basadas en suposiciones incorrectas, decisiones que podrían tener consecuencias catastróficas.[/failure]`,
            choices: [
                { text: 'Pedir el nombre de quien lo tiene', target: 'name_the_thief' },
                { text: 'Ofrecerse a recuperarlo', target: 'recover_offer' },
                { text: 'Preguntar qué pasa si el corazón se rompe', target: 'if_heart_breaks' }
            ]
        },
        {
            id: 'name_the_thief',
            title: 'El Nombre que No Dicen',
            narrative: `Piden un nombre. La corte se mira entre sí. Algunos se encogen, como si el nombre mismo quemara. Otros sonríen, como si supieran algo que ustedes aún no comprenden.

Finalmente, la voz responde, con una mezcla de orgullo y vergüenza:
> "Lo llaman **El Guardián Hueco**."

El nombre resuena con el peso de siglos de historia, de traiciones, de dolor.

[check:informacion dc=14]
[success]Recuerdan mitos contados en noches de invierno: un guardián que perdió el "por qué" y se quedó con el "cómo". Protege sin entender. Obedece sin amar. Es una máquina de madera viva, un autómata de corteza y savia que sigue órdenes sin cuestionar, sin pensar, sin sentir. Un guardián sin propósito es la herramienta perfecta para quien sabe cómo usarlo.[/success]
[failure]El nombre les parece poético, misterioso. Pero no ven el peligro práctico: un guardián sin propósito es una trampa con piernas, una arma que puede ser apuntada en cualquier dirección, una fuerza destructiva que no tiene lealtad a nadie excepto a quien le da la última orden.[/failure]`,
            choices: [
                { text: 'Ir a buscar al Guardián Hueco', target: 'to_hollow_guardian' },
                { text: 'Investigar primero su origen', target: 'origin_research' },
                { text: 'Ofrecer un juicio: ¿salvar o destruir?', target: 'moral_vote' }
            ]
        },
        {
            id: 'to_hollow_guardian',
            title: 'Sendero de Corteza Negra',
            narrative: `La ruta cambia drásticamente. Las hojas se oscurecen, el musgo se endurece, el aire se vuelve frío. El verde se vuelve esmeralda profunda, casi negra, como si estuvieran entrando en la parte del bosque que la luz olvida.

Escuchan pasos delante. Pesados. Lentos. Como un tambor de guerra. Como el latido de un corazón gigante.

> Cada paso dice: "aquí mando yo".

[check:informacion dc=15]
[success]Entienden el patrón de movimiento: el guardián patrulla en círculos, protegiendo un territorio, protegiendo un secreto. Si lo enfrentan de frente, el bosque lo favorece, porque el guardián está en su terreno. Si lo esperan en un cruce, pueden hablar primero, pueden intentar negociar antes de que la violencia sea inevitable.[/success]
[failure]Se acercan sin plan. El bosque mira. La fiebre decide. Sin estrategia, sin preparación, sin entender las reglas del juego, están caminando hacia una derrota que podría ser permanente.[/failure]`,
            choices: [
                { text: 'Esperarlo en el cruce y hablar primero', target: 'parley_crossroads' },
                { text: 'Emboscarlo entre raíces', target: 'ambush_plan' },
                { text: 'Seguirlo sin ser vistos (tensión roleo)', target: 'shadow_follow' }
            ]
        },
        {
            id: 'parley_crossroads',
            title: 'Parlamento en el Cruce',
            narrative: `El cruce tiene cuatro caminos y ninguno parece real. Ustedes sí. Son lo único real en este lugar, lo único sólido en un mundo de ilusiones y magia.

El Guardián Hueco llega: una armadura de madera viva, ojos sin pupila que miran sin ver, un hueco en el pecho donde debería estar un corazón, un hueco que parece absorber la luz alrededor.

Habla con voz de rama quebrada, voz que suena como árboles muriendo:
> "¿Propósito?"

La pregunta es directa, sin adornos, sin metáforas. El guardián no tiene tiempo para juegos.

## Roleo
Respondan como grupo con una frase breve. Una sola. El guardián no tiene paciencia para discursos.

[check:informacion dc=16]
[success]Se dan cuenta: el guardián no entiende metáforas. Necesita *acciones* ("devolver", "sanar", "proteger"). Las palabras hermosas no significan nada para él. Solo las acciones directas, los verbos simples, las intenciones claras tienen poder aquí.[/success]
[failure]Hablan bonito. El guardián no reacciona. Y lo que no reacciona… actúa por defecto. El programa predeterminado del guardián es atacar primero, preguntar después. Al no recibir una respuesta clara, activa ese programa.[/failure]`,
            choices: [
                { text: 'Decir: "Devolver el corazón al bosque"', target: 'guardian_tests' },
                { text: 'Decir: "Queremos el corazón" (honestidad brutal)', target: 'guardian_hostile' },
                { text: 'Decir: "Buscamos negociar" y ofrecer algo', target: 'guardian_trade' }
            ]
        },
        {
            id: 'guardian_tests',
            title: 'Las Pruebas del Hueco',
            narrative: `El guardián inclina la cabeza. El movimiento es mecánico, como si fuera una marioneta controlada por hilos invisibles. Luego marca el suelo con su lanza de madera, y donde la lanza toca la tierra, aparecen símbolos brillantes.

Tres símbolos aparecen en la tierra:
- Una hoja
- Una espina  
- Un círculo

> "Elijan."

La elección determinará todo: qué tipo de prueba enfrentarán, qué tipo de sacrificio se exigirá, qué tipo de final tendrán.

[check:informacion dc=14]
[success]Interpretan los símbolos antiguos: hoja = **compasión**, espina = **sacrificio**, círculo = **ciclo** (devolver lo tomado). Cada elección cambia el final, cada camino lleva a un destino diferente, cada sacrificio tiene un precio específico.[/success]
[failure]Eligen por intuición. A veces funciona. A veces es la forma más rápida de pagar sin querer. Pero las elecciones basadas en intuición a veces llevan a lugares donde la intuición no sirve, donde solo la preparación y el conocimiento pueden salvarlos.[/failure]`,
            choices: [
                { text: 'Elegir la hoja (compasión)', target: 'test_leaf' },
                { text: 'Elegir la espina (sacrificio)', target: 'test_thorn' },
                { text: 'Elegir el círculo (ciclo)', target: 'test_circle' }
            ]
        },
        {
            id: 'test_leaf',
            title: 'Prueba de la Hoja',
            narrative: `El bosque les muestra una escena, como si estuvieran viendo a través de los ojos de otro: un animal herido, atrapado en un lazo viejo, un lazo que parece haber estado allí por mucho tiempo, esperando pacientemente. Sus ojos piden ayuda, pero el lazo tiene runas, runas que brillan con malicia.

> Ayudar podría activar la magia. Pero no ayudar podría ser peor.

## Roleo
Debatan en voz alta. Elijan una acción grupal. Esta decisión los definirá.

[check:informacion dc=15]
[success]Entienden el truco: el lazo está hecho para "culpar" al que ayuda. Pero hay una salida: romper la runa con una palabra de verdad, no con fuerza. La magia feérica se basa en engaño, y la verdad es su kryptonite. Una verdad dicha con sinceridad puede romper hechizos que ninguna espada puede romper.[/success]
[failure]El lazo parece simple. Y lo simple, en el bosque, suele ser cebo. Las trampas más efectivas son las que no parecen trampas, los peligros más mortales son los que parecen inofensivos, los engaños más devastadores son los que parecen verdad.[/failure]`,
            choices: [
                { text: 'Liberar al animal con cuidado y palabras (compasión)', target: 'leaf_success' },
                { text: 'Ignorarlo para no caer en la trampa', target: 'leaf_ignore' },
                { text: 'Cortar el lazo de un tajo (decisión dura)', target: 'leaf_cut' }
            ]
        },
        {
            id: 'test_thorn',
            title: 'Prueba de la Espina',
            narrative: `Aparece una zarza enorme, bloqueando el camino. No hay atajo, no hay forma de evitarla. Para avanzar deben pasar por ella, o a través de ella.

La zarza susurra, voz de mil espinas raspando:
> "*Duelen los pasos honestos.*"

Las palabras son un acertijo, una prueba, un desafío.

[check:informacion dc=14]
[success]Comprenden la naturaleza de la barrera: la zarza no bloquea cuerpos, bloquea **evasiones**. Si cada uno dice un secreto, una verdad que han ocultado, la zarza abre un corredor sin herir. El bosque quiere verdad, no sangre. La transparencia es la llave que abre todas las puertas.[/success]
[failure]Creen que se trata de resistencia física. La zarza se ríe como un ramo de cuchillos. Al intentar forzar su camino, las espinas los desgarran, no solo físicamente sino también espiritualmente, cada corte robando un secreto, cada herida revelando una verdad que preferían mantener oculta.[/failure]`,
            choices: [
                { text: 'Confesar un secreto cada uno (roleo fuerte)', target: 'thorn_confession' },
                { text: 'Atravesar igual y aceptar heridas simbólicas', target: 'thorn_blood' },
                { text: 'Intentar quemar la zarza', target: 'thorn_fire' }
            ]
        },
        {
            id: 'test_circle',
            title: 'Prueba del Círculo',
            narrative: `Ven el arroyo de vidrio otra vez. Pero esta vez, del otro lado está… el inicio. El lugar donde empezaron, el momento antes de cruzar el umbral. Como si el bosque les ofreciera repetirlo todo, como si les diera la oportunidad de deshacer sus errores.

> "Devuelvan lo que tomaron."

La demanda es clara, ineludible. El círculo exige restitución.

[check:informacion dc=15]
[success]Entienden: el círculo pide restitución. Si tomaron algo (piedra, marca, promesa), deben devolverlo o equivalerlo. Si no, el bosque los cicla hasta quebrarlos, los obliga a repetir el mismo error una y otra vez hasta que aprendan, hasta que entiendan, hasta que paguen.[/success]
[failure]Creen que es una ilusión, un truco del bosque. Pero el círculo es un mecanismo, no una broma. Los mecanismos del bosque no perdonan, no negocian, no tienen piedad. Funcionan según reglas antiguas que no pueden ser alteradas por negación o incredulidad.[/failure]`,
            choices: [
                { text: 'Devolver un objeto o romper una deuda (roleo)', target: 'circle_restitution' },
                { text: 'Negarse a devolver nada', target: 'circle_loop' },
                { text: 'Aceptar repetir el camino para "mejorar"', target: 'circle_loop' }
            ]
        },
        {
            id: 'leaf_success',
            title: 'Compasión que Abre',
            narrative: `El animal se libera. No corre: se acerca y apoya la frente en tu mano, en un gesto de gratitud que parece demasiado humano para una criatura del bosque.

El bosque exhala, un sonido que parece viento pero que es alivio, liberación.

Una luz verde aparece en el hueco del pecho del guardián, iluminando la oscuridad con un brillo que parece promesa.

> "Propósito… aceptado."

El Guardián Hueco entrega algo: una semilla de cristal, una semilla que parece contener un bosque entero en miniatura, una semilla que parece tener infinitas posibilidades.

[set:has_crystal_seed=true]`,
            choices: [
                { text: 'Aceptar la semilla y pedir el Corazón Esmeralda', target: 'final_request' },
                { text: 'Plantar la semilla en el hueco del guardián', target: 'seed_in_guardian' },
                { text: 'Rechazar regalos y pedir solo paso', target: 'final_request' }
            ]
        },
        {
            id: 'thorn_confession',
            title: 'Confesión',
            narrative: `Cada secreto cae al suelo como una gota de savia, y cada gota alimenta la zarza, la hace crecer, la transforma. La zarza se abre, no por fuerza, sino por elección, como si reconociera el valor de la verdad.

En el cruce, el guardián escucha sin emoción. Pero el hueco de su pecho vibra, como si algo estuviera despertando en su interior, como si la verdad de las confesiones estuviera despertando algo que había estado dormido por mucho tiempo.

[set:shared_secrets=true]`,
            choices: [
                { text: 'Avanzar hacia el corazón', target: 'final_request' },
                { text: 'Pedir al guardián que "devuelva" un secreto a cambio', target: 'guardian_trade' },
                { text: 'Usar la apertura para huir', target: 'lost_loop' }
            ]
        },
        {
            id: 'circle_restitution',
            title: 'Restitución',
            narrative: `Devuelven lo tomaron, o lo equivalen con una promesa real, una promesa que pesan, una promesa que significan. El bosque, por primera vez, parece… satisfecho. La tensión en el aire se disipa, la hostilidad se suaviza, el peligro se vuelve oportunidad.

El guardián inclina la cabeza, un gesto que parece respeto, o al menos reconocimiento.

> "Ciclo… respetado."

[set:paid_debt=true]`,
            choices: [
                { text: 'Pedir el corazón y ofrecer custodiarlo', target: 'final_request' },
                { text: 'Pedir una ruta de salida sin llevarse nada', target: 'ending_safe_exit' },
                { text: 'Preguntar cómo sanar al guardián', target: 'seed_in_guardian' }
            ]
        },
        {
            id: 'final_request',
            title: 'El Corazón Esmeralda',
            narrative: `El guardián abre su pecho. La madera se separa como cortinas, revelando el hueco interior. En ese hueco, el Corazón Esmeralda late como una gema viva, como un órgano hecho de luz y cristal. Verde. Hermoso. Peligroso.

No es "propiedad". Es *latido*. Es vida pura, concentrada en forma que la mente mortal apenas puede comprender.

## Roleo
Voten como grupo, esta decisión definirá el destino del bosque y el suyo propio:
- ¿Lo devuelven al bosque?
- ¿Lo guardan para evitar que otros lo tomen?
- ¿Lo rompen para que nadie lo use?

[check:informacion dc=17]
[success]Comprenden el costo de cada elección: devolverlo sana el bosque pero los ata a un pacto eterno, los convierte en protectores por siempre. Guardarlo los vuelve objetivo de la corte, los convierte en ladrones con un tesoro que todos quieren. Romperlo cura una cosa y enferma otra: el bosque recordará la traición, y la memoria del bosque es larga, vengativa, implacable.[/success]
[failure]Solo ven tres opciones. El bosque ve cien consecuencias, mil ramificaciones, diez mil futuros posibles. Al no comprender la complejidad de su decisión, corren el riesgo de elegir mal sin saberlo, de causar daño irreparable sin intención, de cambiar el destino del bosque sin entender qué están cambiando.[/failure]`,
            choices: [
                { text: 'Devolverlo al altar de la Catedral de Musgo', target: 'ending_return' },
                { text: 'Guardarlo y huir antes de que la corte reaccione', target: 'ending_keep' },
                { text: 'Romperlo aquí mismo (decisión extrema)', target: 'ending_break' }
            ]
        },
        {
            id: 'seed_in_guardian',
            title: 'Semilla en el Hueco',
            narrative: `Plantan la semilla (o una promesa equivalente) en el hueco del guardián. La madera cruje, no con dolor sino con transformación. El bosque respira, profundo y lento, como si estuviera despertando de un sueño largo.

Por primera vez, el guardián dice una frase completa, no un comando, no una pregunta, sino una declaración:
> "Recuerdo… por qué."

El guardián recuerda su propósito. El guardián recuerda quién era antes de ser una herramienta. El guardián recuerda por qué protege el bosque.

[check:informacion dc=15]
[success]Entienden: sanar al guardián crea un aliado y un testigo. La corte no podrá mentirles tan fácil después, no cuando el guardián pueda contradecir sus mentiras con la verdad de su memoria restaurada. Pero también crean un enemigo: quien controlaba al guardián no estará contento con perder su control.[/success]
[failure]El guardián cambia, pero no del todo. A veces lo roto aprende nuevas formas de romper, a veces la memoria restaurada trae tanto dolor como alivio, a veces el pasado es mejor olvidado. El guardián es más fuerte ahora, pero también más inestable, más impredecible, más peligroso.[/failure]`,
            choices: [
                { text: 'Pedir ayuda para devolver el corazón', target: 'ending_return' },
                { text: 'Pedir escolta para salir', target: 'ending_safe_exit' },
                { text: 'Pedir un juicio contra la corte', target: 'ending_court' }
            ]
        },
        {
            id: 'ending_return',
            title: 'Final: Latido Devuelto',
            narrative: `Regresan al altar. El bosque les abre pasos como si fuera piel, como si fueran parte de él ahora, como si siempre hubieran pertenecido.

Colocan el Corazón Esmeralda donde falta. La catedral de musgo se ilumina, no con luz externa sino con luz interna, cada brizna de musgo brillando con luz propia, cada gota de rocío reflejando el verde esmeralda del corazón.

> El verde vuelve a ser verde. No fiebre. No amenaza. Vida. Vida pura, sin corrupción, sin dolor, sin memoria de traición.

**FINAL – El Bosque Respira**

## Epílogo (roleo)
Cada jugador dice:
- Qué cambió en su personaje después de escuchar al bosque "hablar".
- Qué promesa quedó pendiente con el Bosque Esmeralda, qué deuda contrajeron con el bosque que eventualmente tendrán que pagar.`,
            choices: []
        },
        {
            id: 'ending_keep',
            title: 'Final: Ladrones de Verde',
            narrative: `Huyen con el corazón. El bosque no los frena. Eso es lo peor: los deja ir. Los deja ir como quien deja ir una presa que sabe que no puede escapar, como quien deja ir un enemigo que sabe que eventualmente será atrapado.

En la distancia, la Corte de las Hojas ríe. No por diversión: por cacería. La cacería ha comenzado, y ellos son la presa.

**FINAL – La Ruta del Trofeo**

## Epílogo (roleo)
¿Quién del grupo se queda con el corazón? ¿Y qué precio paga primero? ¿Cuánto tiempo tienen antes de que la corte los alcance?`,
            choices: []
        },
        {
            id: 'ending_break',
            title: 'Final: Esmeralda Hecha Astillas',
            narrative: `El corazón se rompe. El sonido no es un crack: es un gemido largo, un gemido que parece venir de todos los árboles a la vez, como si el bosque entero estuviera gritando de dolor.

El verde del bosque se apaga un segundo. Luego vuelve… pero distinto. Más frío. Más atento. Más peligroso. Algo fundamental ha cambiado, algo que no puede ser deshecho.

> "Los recordaré," susurra el bosque, voz de mil árboles superpuestos. "Como se recuerda una cicatriz. Como se recuerda el dolor."

**FINAL – La Cicatriz Esmeralda**

## Epílogo (roleo)
Cada jugador decide qué parte de sí perdió en ese instante (un recuerdo, un nombre, una emoción). El bosque tomó algo de cada uno, y lo que tomó, nunca lo devolverá.`,
            choices: []
        },
        {
            id: 'ending_safe_exit',
            title: 'Final: Salida sin Trofeo',
            narrative: `Eligen no llevarse nada. El bosque, sorprendentemente, respeta esa decisión. El bosque respeta la renuncia, respeta el sacrificio de no tomar, respeta la fuerza de decir "no" cuando todo dice "toma".

Vuelven a la frontera y el mundo de piedra les parece ruidoso, torpe, demasiado lineal. El mundo civilizado nunca volverá a sentirse igual, nunca volverá a ser suficiente, nunca volverá a ser hogar.

**FINAL – Camino Limpio**

## Epílogo (roleo)
¿Qué rumor llevan a la ciudad sobre los Bosques Esmeralda? ¿Y cuál guardan para ustedes, qué verdad mantienen en secreto, qué experiencia guardan como tesoro privado?`,
            choices: []
        },
        {
            id: 'ending_court',
            title: 'Final: Juicio de Hojas',
            narrative: `Regresan a la corte. Esta vez, no como visitantes: como acusadores. Como quienes exigen justicia, como quienes demandan verdad.

Los hongos brillan más brillante. Las luciérnagas escriben palabras en el aire, palabras que parecen condenas y perdones a la vez.

> "Hablen bonito," repite la voz sin dueño. "Y díganlo todo. Todo."

La corte escuchará. La corte juzgará. La corte ejecutará.

**FINAL – La Corte Escucha**

## Epílogo (roleo)
¿A quién condena el grupo: a la corte, al guardián, o a sí mismos? ¿Qué justicia demandan, y qué justicia reciben?`,
            choices: []
        },
        {
            id: 'lost_loop',
            title: 'El Bucle del Bosque',
            narrative: `Caminan… y vuelven. Caminan… y vuelven. El camino se repite, una y otra vez, idéntico pero diferente cada vez, como si estuvieran atrapados en un momento que no puede avanzar.

El bosque no castiga con dolor. Castiga con repetición. La repetición es el castigo más cruel porque destruye la esperanza, porque hace que cada paso sea una agonía de déjà vu, porque convierte el viaje en una prisión de tiempo.

> Si no elegís, el bosque elige por vos: *otra vez lo mismo*.

**FIN (abierto) – El Bucle**

Pueden retomar desde "El Umbral Verde" cuando decidan qué precio están dispuestos a pagar, cuando decidan que la libertad vale más que la seguridad, cuando decidan que el destino vale más que el control.`,
            choices: [
                { text: 'Volver a intentarlo desde el principio', target: 'start' }
            ]
        },
        {
            id: 'broken_rhythm',
            title: 'Ritmo Roto',
            narrative: `Encienden la lámpara de golpe. Las luciérnagas se dispersan como letras borradas, como si la luz violenta hubiera destruido un poema escrito en el aire.

El bosque se ofende sin decirlo. Eso es peor: no hay discusión, solo consecuencia. La ofensa del bosque no es gritar ni amenazar: es simplemente dejar de ser amable, dejar de ser hospitalario, dejar de ser perdonable.

[check:informacion dc=14]
[success]Entienden el error: en lo feérico, romper el ritmo equivale a romper una promesa. Pueden "reparar" con una disculpa ritual (palabras + gesto), pero la disculpa debe ser sincera, debe significar algo, debe costar algo. Las disculpas baratas no valen nada en el bosque.[/success]
[failure]Creen que nada pasó. Pero el aire se volvió un poco más frío. El bosque no olvida, no perdona, no ignora. El bosque espera, pacientemente, el momento perfecto para cobrar el precio de la ofensa. Y cuando lo cobre, el interés será astronómico.[/failure]`,
            choices: [
                { text: 'Hacer una disculpa ritual (roleo)', target: 'moss_cathedral' },
                { text: 'Seguir como si nada (arrogancia)', target: 'lost_loop' },
                { text: 'Intentar apaciguar al bosque con ofrendas', target: 'offering' }
            ]
        }
    ]
};
