const EMERALD_FOREST_ADVENTURE = {
    id: 'emerald_forest_whispers',
    title: 'Susurros en los Bosques Esmeralda',
    description: 'Aventura grupal sin personajes predefinidos. Ideal para leer en voz alta y decidir en equipo: alianzas frágiles, secretos antiguos y un bosque que escucha. Incluye checks de información (1d20) con pistas opcionales.',
    category: 'Bosques Esmeralda',
    level: 5,
    tags: ['roleo', 'misterio', 'bosque', 'fey', 'decisiones', 'muchas_escenas'],
    type: 'group',
    coverImage: '../images/aventura_pc.png',
    nodes: [
        {
            id: 'start',
            title: 'El Umbral Verde',
            narrative: `# Los Bosques Esmeralda
El camino se apaga bajo las raíces. La última piedra del sendero queda atrás y, con ella, la certeza de que el mundo “civilizado” tiene reglas.

El aire huele a *hoja mojada*, a savia fresca y a algo más: una promesa antigua que te roza la nuca como un susurro.

--- 
## Roleo
Antes de entrar, respondan en ronda:
- ¿Qué **deuda** o **búsqueda** los trajo hasta acá?
- ¿A quién le juraron “volver”, aunque sepan que quizá no lo cumplan?

> “Los Bosques Esmeralda no te pierden: *te reclaman*.”

[check:informacion dc=12]
[success]Reconocen el canto de un ave que no existe fuera del bosque: *el mirlón de esmeralda*. En las historias, su presencia anuncia que el bosque “está despierto”.[/success]
[failure]El silencio les parece natural. Pero a veces lo natural es la máscara de lo inevitable.[/failure]`,
            choices: [
                { text: 'Entrar por la senda de helechos (rápido, estrecho)', target: 'fern_path' },
                { text: 'Rodear por el arroyo de vidrio (lento, seguro)', target: 'glass_stream' },
                { text: 'Encender una lámpara y marcar el camino (prudente)', target: 'marked_light' }
            ]
        },
        {
            id: 'fern_path',
            title: 'Senda de Helechos',
            narrative: `El sendero se aprieta. Los helechos les acarician las manos como si contaran dedos. La luz cae en cuchilladas verdes.

## Roleo
Elijan en grupo: ¿Quién va adelante y qué “señal” acordaron si algo sale mal?

[check:informacion dc=13]
[success]Detectan símbolos tallados en un tronco: un círculo y tres líneas. Marca de los **Guardianes de Savia**, una orden druidica que “cobra peaje” por cruzar sin permiso.[/success]
[failure]Pasan de largo… y el bosque se lo anota. No con tinta: con memoria.[/failure]`,
            choices: [
                { text: 'Seguir sin detenerse, como si no vieran nada', target: 'sudden_breeze' },
                { text: 'Dejar una ofrenda (comida, moneda, promesa)', target: 'offering' },
                { text: 'Buscar a quien dejó las marcas', target: 'sapia_watchers' }
            ]
        },
        {
            id: 'glass_stream',
            title: 'El Arroyo de Vidrio',
            narrative: `El agua corre clara, tan clara que parece *mentir*. Las piedras del fondo brillan como ojos. A cada paso, el arroyo devuelve reflejos que no coinciden del todo con ustedes.

> En el reflejo, alguien sonríe un segundo tarde.

[check:informacion dc=14]
[success]Recuerdan la regla de los arroyos feéricos: **nunca** mirarse dos veces en el mismo remanso. La segunda mirada “cobra” algo a cambio.[/success]
[failure]Se entretienen con el reflejo… y el reflejo parece entretenerse con ustedes.[/failure]`,
            choices: [
                { text: 'Cruzar evitando mirar el agua', target: 'across_without_looking' },
                { text: 'Hablarle al arroyo (pedir paso, preguntar por señales)', target: 'talk_to_stream' },
                { text: 'Tomar una piedra del fondo como “amuleto”', target: 'take_stone' }
            ]
        },
        {
            id: 'marked_light',
            title: 'Luz Marcada',
            narrative: `Encienden una lámpara. La llama tiembla y el bosque parece observarla con curiosidad, como si fuera un animal nuevo.

Van dejando señales: una rama cruzada, un nudo de hilo, un trazo en el barro.

[check:informacion dc=12]
[success]Saben que en los Bosques Esmeralda las marcas funcionan… *hasta que el bosque decide cambiarlas*. Un mapa útil, pero no eterno.[/success]
[failure]Confían demasiado en sus señales. El bosque ama la confianza: tiene dientes para eso.[/failure]`,
            choices: [
                { text: 'Seguir con la lámpara alta (desafiante)', target: 'eyes_in_canopy' },
                { text: 'Bajar la luz y avanzar en silencio (cauteloso)', target: 'silent_steps' },
                { text: 'Apagar la lámpara y dejar que el bosque guíe (arriesgado)', target: 'guided_by_dark' }
            ]
        },
        {
            id: 'sudden_breeze',
            title: 'Brisa que No Sopla',
            narrative: `La brisa llega sin mover hojas. Te enfría la nuca y te susurra un nombre. No el tuyo: *el que te prohibiste decir*.

## Roleo
Cada jugador elige:
- ¿Qué nombre escuchó?
- ¿Por qué ese nombre duele?

[check:informacion dc=15]
[success]Identifican un truco clásico del bosque: el **Viento de Recuerdo**. No mata, pero desarma al grupo. Resistan con palabras simples: “*estoy acá*”.[/success]
[failure]El susurro se vuelve conversación. Y la conversación se vuelve camino.[/failure]`,
            choices: [
                { text: 'Responder en voz alta al nombre (con sinceridad)', target: 'answer_the_name' },
                { text: 'Ignorarlo y apretar el paso', target: 'push_forward' },
                { text: 'Hacer un juramento grupal para mantenerse unidos', target: 'group_oath' }
            ]
        },
        {
            id: 'offering',
            title: 'Ofrenda al Tronco',
            narrative: `Dejan una ofrenda al pie del árbol marcado. Puede ser pan, una moneda, un mechón de pelo… o una promesa pronunciada con la garganta seca.

El bosque tarda en responder. Luego, una hoja cae. *Justo en el centro* de la ofrenda.

[check:informacion dc=12]
[success]El gesto es aceptación. En los ritos de savia, la hoja en el centro significa: “pasan, pero los miro”.[/success]
[failure]La hoja no cae. Pero el silencio, por un momento, pesa como un juicio.[/failure]`,
            choices: [
                { text: 'Seguir y agradecer (aunque no sepan a quién)', target: 'safe_corridor' },
                { text: 'Cambiar la ofrenda por una más personal', target: 'deeper_offering' },
                { text: 'Romper la marca del tronco (provocación)', target: 'break_the_mark' }
            ]
        },
        {
            id: 'sapia_watchers',
            title: 'Los Guardianes de Savia',
            narrative: `Los ven cuando deciden que pueden verlos: siluetas entre líquenes, máscaras de corteza, ojos verdes como vidrio oscuro.

Una voz suave, casi amable:
> “¿Cruzan por necesidad… o por capricho?”

## Roleo
Respondan como grupo. Elijan un portavoz. El bosque *escucha el tono*, no solo las palabras.

[check:informacion dc=14]
[success]Reconocen el protocolo: no se negocia con oro. Se negocia con **verdades**. La primera mentira suele costar caro.[/success]
[failure]Se sienten presionados a “quedar bien” y adornan la historia. El bosque adora los adornos: se enreda con ellos.[/failure]`,
            choices: [
                { text: 'Decir la verdad completa, aunque los deje mal parados', target: 'truth_bargain' },
                { text: 'Ofrecer un servicio: limpiar una corrupción del bosque', target: 'service_offer' },
                { text: 'Desafiarlos: “pasamos igual”', target: 'challenge_guardians' }
            ]
        },
        {
            id: 'across_without_looking',
            title: 'Cruce Ciego',
            narrative: `Cruzan sin mirar. A medio paso, el agua suena como un aplauso pequeño. Al final, la orilla opuesta parece la misma… pero no *huele* igual.

Una risa diminuta, como una campanilla, se esconde en un arbusto.

[check:informacion dc=13]
[success]Saben que las risas en el bosque son señales: un ser feérico los “adoptó” como entretenimiento… o como presa.[/success]
[failure]Creen que es un animal. El bosque sonríe con paciencia.[/failure]`,
            choices: [
                { text: 'Buscar a la criatura que ríe', target: 'sprite_meeting' },
                { text: 'Acelerar y salir de la zona del arroyo', target: 'moss_cathedral' },
                { text: 'Hacer una broma en voz alta (invitar a un juego)', target: 'joke_back' }
            ]
        },
        {
            id: 'talk_to_stream',
            title: 'Conversación con Agua',
            narrative: `Le hablan al arroyo como si fuera alguien. Y por un instante… lo es.

El agua forma un remolino que parece una boca.
> “¿Qué buscan en mí… si no son reflejo?”

[check:informacion dc=15]
[success]Recuerdan un nombre verdadero del arroyo: **Vitra**. Pronunciarlo con respeto abre puertas pequeñas en el bosque.[/success]
[failure]El remolino se burla: “los nombres son para quienes pertenecen”.[/failure]`,
            choices: [
                { text: 'Decir “Vitra” y pedir una pista (con humildad)', target: 'vitreous_hint' },
                { text: 'Ofrecer algo al agua (una gota de sangre, una historia)', target: 'water_trade' },
                { text: 'Ignorar el fenómeno y cruzar igual', target: 'across_without_looking' }
            ]
        },
        {
            id: 'take_stone',
            title: 'Piedra que Recuerda',
            narrative: `Una mano se hunde en el agua y toma una piedra verde. Al salir, la piedra está tibia… como si acabaran de sacarla de un bolsillo humano.

## Roleo
¿A quién le “pertenece” la piedra? Cada jugador propone una teoría.

[check:informacion dc=16]
[success]Saben lo que implica: la piedra es un **ancla**. Una parte del bosque ahora viaja con ustedes. Y el bosque, a veces, tira de la cuerda.[/success]
[failure]La piedra es linda. Eso basta para que la guarden. Lo lindo también muerde.[/failure]`,
            choices: [
                { text: 'Guardar la piedra y seguir', target: 'moss_cathedral' },
                { text: 'Devolverla con disculpas', target: 'glass_stream' },
                { text: 'Partirla para “romper el hechizo”', target: 'stone_break' }
            ]
        },
        {
            id: 'eyes_in_canopy',
            title: 'Ojos en la Copa',
            narrative: `Con la lámpara en alto, ven puntos de luz entre las ramas. No son estrellas: están demasiado cerca y parpadean en respuesta.

> El bosque *contesta* cuando lo miran.

[check:informacion dc=13]
[success]Reconocen un patrón de vigilancia: tres parpadeos cortos, uno largo. Señal de “grupo observado”, usada por exploradores druidas.[/success]
[failure]Les parece azar. El azar, en el bosque, es un lujo que rara vez existe.[/failure]`,
            choices: [
                { text: 'Saludar a los observadores con una señal (sin armas)', target: 'sapia_watchers' },
                { text: 'Bajar la luz para no ser blanco', target: 'silent_steps' },
                { text: 'Acelerar para “salirse” del área', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'silent_steps',
            title: 'Pasos Silenciosos',
            narrative: `Caminar se vuelve un ritual: *pie, pausa, escuchar*. La tierra está esponjosa, como si el bosque quisiera atraparlos sin esfuerzo.

En un claro pequeño, encuentran un círculo de hongos.

[check:informacion dc=14]
[success]El círculo es una frontera feérica. Cruzarlo sin permiso puede “cambiarles” algo: sombra, voz, recuerdos.[/success]
[failure]Un círculo de hongos, nada más. Y sin embargo, el aire alrededor está demasiado quieto.[/failure]`,
            choices: [
                { text: 'Rodear el círculo sin cruzarlo', target: 'moss_cathedral' },
                { text: 'Cruzar por el centro (desafiando el rito)', target: 'fey_turn' },
                { text: 'Dejar una palabra de permiso (“con su venia”) y cruzar', target: 'polite_crossing' }
            ]
        },
        {
            id: 'guided_by_dark',
            title: 'Guiados por la Oscuridad',
            narrative: `Apagan la lámpara. Al principio no ven nada. Luego, ven lo que el bosque quiere: un sendero de luciérnagas que se ordenan como letras.

Forman una frase:
> “*Vengan.*”

[check:informacion dc=15]
[success]Saben que seguir luces en Bosques Esmeralda es un contrato tácito. No siempre malo. Siempre *vinculante*.[/success]
[failure]Confunden miedo con intuición. No son lo mismo. Pero el bosque aprovecha ambos.[/failure]`,
            choices: [
                { text: 'Seguir a las luciérnagas', target: 'moss_cathedral' },
                { text: 'Encender la lámpara a mitad de camino (romper el ritmo)', target: 'broken_rhythm' },
                { text: 'Negarse y tomar una dirección al azar', target: 'lost_loop' }
            ]
        },
        {
            id: 'moss_cathedral',
            title: 'La Catedral de Musgo',
            narrative: `Los árboles se juntan como columnas. El musgo cae en cortinas. La luz entra filtrada y verde, como si estuvieran adentro de un templo.

En el centro hay un altar de raíz. Sobre él, un cuenco vacío con runas.

--- 
## Roleo
¿Qué sienten al ver un altar en medio del bosque?
- *Devoción*, *desconfianza*, *fascinación* o *rabia*.

[check:informacion dc=15]
[success]Las runas son un pedido: “**Nombre + Propósito**”. Si lo llenan, el bosque les muestra una ruta verdadera. Si mienten, la ruta es verdadera… hacia otra cosa.[/success]
[failure]Las runas parecen decoración. Pero el cuenco está demasiado limpio para estar abandonado.[/failure]`,
            choices: [
                { text: 'Llenar el cuenco con agua del lugar y decir sus nombres', target: 'name_and_purpose' },
                { text: 'Dejar una ofrenda material (comida, metal, gema)', target: 'material_offering' },
                { text: 'Ignorar el altar y explorar la catedral', target: 'explore_cathedral' }
            ]
        },
        {
            id: 'name_and_purpose',
            title: 'Nombre y Propósito',
            narrative: `El agua toca el cuenco y se vuelve esmeralda. El bosque espera.

## Roleo
Cada jugador dice su nombre (o el que usa en este viaje) y una frase corta de propósito.
Ejemplos:
- “Busco a mi hermano.”
- “Huyo de mí.”
- “Quiero una respuesta.”

El cuenco tiembla y el agua forma una flecha.

[check:informacion dc=14]
[success]Notan un detalle: la flecha no apunta a un lugar, apunta a un *momento*. La ruta cambia según el orden en que caminen.[/success]
[failure]Creen que es solo dirección. El bosque no discute: simplemente cobra después.[/failure]`,
            choices: [
                { text: 'Seguir la flecha con el orden actual del grupo', target: 'emerald_gate' },
                { text: 'Cambiar el orden de marcha y seguir (probar el “momento”)', target: 'order_matters' },
                { text: 'Volver atrás: no aceptar rutas “vivas”', target: 'lost_loop' }
            ]
        },
        {
            id: 'material_offering',
            title: 'Peso por Paso',
            narrative: `Dejan algo tangible. El cuenco “pesa” la ofrenda en silencio.

Una raíz se abre como una mano y toma lo ofrecido.

[check:informacion dc=13]
[success]Entienden la lógica: el bosque no quiere riqueza; quiere **compromiso**. Lo que duele dejar es lo que abre rutas.[/success]
[failure]No sienten cambio. Pero el cuenco guarda memoria. La deuda también.[/failure]`,
            choices: [
                { text: 'Seguir explorando la catedral', target: 'explore_cathedral' },
                { text: 'Insistir con una ofrenda mayor', target: 'deeper_offering' },
                { text: 'Buscar marcas de pasos alrededor (quién vino antes)', target: 'old_tracks' }
            ]
        },
        {
            id: 'explore_cathedral',
            title: 'Ecos Verdes',
            narrative: `Exploran. Detrás de una cortina de musgo hay un relieve: una figura coronada con ramas, sosteniendo un corazón de piedra.

> El relieve tiene un hueco en el pecho: falta el corazón.

[check:informacion dc=16]
[success]Reconocen la leyenda: el **Corazón Esmeralda**. Una reliquia que mantiene al bosque sano. Si se daña, el bosque se defiende “por fiebre”: confunde, hiere, devora rutas.[/success]
[failure]Una historia tallada. Bonita… y triste. Eso es todo, por ahora.[/failure]`,
            choices: [
                { text: 'Buscar el “corazón” perdido (investigar el hueco)', target: 'hollow_chest' },
                { text: 'Rezar o prometer proteger el bosque (roleo)', target: 'vow_to_forest' },
                { text: 'Dejar la catedral y seguir sin tocar nada', target: 'emerald_gate' }
            ]
        },
        {
            id: 'emerald_gate',
            title: 'La Puerta Esmeralda',
            narrative: `El bosque se abre en un arco natural de enredaderas. Entre las hojas, un brillo verde respira como un pulmón.

No es un portal de luz. Es un portal de *decisión*.

> Al cruzarlo, el aire cambia: ya no están “en el bosque”. Están “dentro” de él.

[check:informacion dc=15]
[success]Entienden la regla: una vez adentro, el bosque les pedirá un precio final. Mejor decidir *qué están dispuestos a perder* antes de seguir.[/success]
[failure]Cruzan sin pensar en precio. El bosque adora lo espontáneo: siempre tiene un recibo.[/failure]`,
            choices: [
                { text: 'Cruzar y aceptar lo que venga', target: 'fey_court' },
                { text: 'Detenerse y definir un “precio permitido” (roleo)', target: 'define_price' },
                { text: 'Retroceder y buscar otra ruta', target: 'lost_loop' }
            ]
        },
        {
            id: 'define_price',
            title: 'Precio Permitido',
            narrative: `Se detienen. Se miran. Dicen en voz baja lo que están dispuestos a sacrificar.

## Roleo
Cada jugador elige 1:
- Un recuerdo feliz
- Un secreto
- Una promesa
- Un objeto querido

No lo entregan todavía. Solo lo nombran. Y el bosque… escucha.

[check:informacion dc=13]
[success]Nombrar el sacrificio *antes* de que se lo pidan les da ventaja: pueden negociar el “cómo”.[/success]
[failure]Nombrar el sacrificio llama la atención. Algo dentro del bosque empieza a salivar.[/failure]`,
            choices: [
                { text: 'Cruzar la puerta esmeralda', target: 'fey_court' },
                { text: 'Cambiar de idea: no pagar nada', target: 'lost_loop' }
            ]
        },
        {
            id: 'fey_court',
            title: 'La Corte de las Hojas',
            narrative: `Una explanada imposible: un anfiteatro de troncos, hongos como lámparas, luciérnagas ordenadas en símbolos.

En el centro, un asiento vacío hecho de ramas.

Una voz, sin dueño:
> “Bienvenidos. **Hablen bonito**.”

--- 
## Roleo
La corte quiere entretenimiento. Elijan uno:
- Un relato breve de su viaje
- Una canción
- Un juramento dramático

[check:informacion dc=16]
[success]Recuerdan: a la corte feérica no se le pregunta “quién manda”, se le pregunta “quién *cuida*”. Eso revela jerarquías reales.[/success]
[failure]Se enfocan en impresionar. La corte ama el show… y castiga la falta de sustancia.[/failure]`,
            choices: [
                { text: 'Preguntar con respeto: “¿Quién cuida este lugar?”', target: 'who_cares' },
                { text: 'Sentarse en el trono vacío (provocación o destino)', target: 'sit_on_throne' },
                { text: 'Ofrecer un trato: “ayudamos al bosque, ustedes nos guían”', target: 'offer_deal' }
            ]
        },
        {
            id: 'who_cares',
            title: 'Quién Cuida',
            narrative: `El silencio dura un latido. Luego, alguien responde desde arriba de un hongo gigante: una figura pequeña con corona de pétalos.

> “Yo cuido lo que me cuida. ¿Y ustedes?”

La corte ríe. No con maldad. Con hambre.

[check:informacion dc=14]
[success]Entienden la clave: la corte está dividida. Unos quieren **sanar** el bosque. Otros quieren **aprovechar** su fiebre para ganar poder.[/success]
[failure]La respuesta suena filosófica. Pero no ven la política escondida detrás.[/failure]`,
            choices: [
                { text: 'Prometer ayudar a sanar el bosque', target: 'healing_path' },
                { text: 'Preguntar por el Corazón Esmeralda', target: 'heart_question' },
                { text: 'Desafiar la lógica feérica con un acertijo', target: 'riddle_duel' }
            ]
        },
        {
            id: 'offer_deal',
            title: 'Trato con Sombras Verdes',
            narrative: `Proponen un trato. Las luciérnagas se apagan una por una, como si alguien cerrara ojos.

Una voz distinta, más grave:
> “Los tratos se firman con pérdidas.”

[check:informacion dc=15]
[success]Saben que pueden “pagar” con algo reversible: una noche de sueño, un nombre falso, una historia. No todo pago es permanente si se formula bien.[/success]
[failure]Piensan en oro o amenazas. La corte bosteza: no entiende ese idioma.[/failure]`,
            choices: [
                { text: 'Pagar con una historia verdadera (roleo)', target: 'pay_with_story' },
                { text: 'Pagar con una noche de sueño (aceptar cansancio)', target: 'pay_with_sleep' },
                { text: 'Negarse a pagar y salir', target: 'lost_loop' }
            ]
        },
        {
            id: 'sit_on_throne',
            title: 'Asiento Vacío',
            narrative: `Alguien se sienta. La madera cruje, como si recordara cuerpos antiguos.

Por un segundo, el bosque respira *al mismo ritmo* que ustedes.

[check:informacion dc=17]
[success]Entienden lo que hicieron: ocuparon un rol. El bosque ahora los reconoce como “parte del juego”. Eso abre puertas… y atrae enemigos.[/success]
[failure]El trono se siente frío. Pero el frío, en el bosque, también es una firma.[/failure]`,
            choices: [
                { text: 'Levantarse de inmediato y disculparse', target: 'who_cares' },
                { text: 'Aprovechar el rol y exigir una verdad', target: 'demand_truth' },
                { text: 'Declarar un mandato: “venimos a sanar el bosque”', target: 'healing_path' }
            ]
        },
        {
            id: 'heart_question',
            title: 'La Pregunta Prohibida',
            narrative: `Nombran el Corazón Esmeralda. La corte deja de reír.

Una hoja cae. Se parte en dos al tocar el suelo.

> “El corazón late… *en manos equivocadas*.”

[check:informacion dc=16]
[success]Captan el subtexto: no lo robó un monstruo. Lo robó alguien con permiso, alguien con “derecho” antiguo… y ese derecho está corrompido.[/success]
[failure]Solo escuchan “robado” y “mal”. El bosque detesta los resúmenes simplistas.[/failure]`,
            choices: [
                { text: 'Pedir el nombre de quien lo tiene', target: 'name_the_thief' },
                { text: 'Ofrecerse a recuperarlo', target: 'recover_offer' },
                { text: 'Preguntar qué pasa si el corazón se rompe', target: 'if_heart_breaks' }
            ]
        },
        {
            id: 'name_the_thief',
            title: 'El Nombre que No Dicen',
            narrative: `Piden un nombre. La corte se mira entre sí. Algunos se encogen. Otros sonríen.

Finalmente:
> “Lo llaman **El Guardián Hueco**.”

[check:informacion dc=14]
[success]Recuerdan mitos: un guardián que perdió el “por qué” y se quedó con el “cómo”. Protege sin entender. Obedece sin amar.[/success]
[failure]El nombre les parece poético. Pero no ven el peligro práctico: un guardián sin propósito es una trampa con piernas.[/failure]`,
            choices: [
                { text: 'Ir a buscar al Guardián Hueco', target: 'to_hollow_guardian' },
                { text: 'Investigar primero su origen', target: 'origin_research' },
                { text: 'Ofrecer un juicio: ¿salvar o destruir?', target: 'moral_vote' }
            ]
        },
        {
            id: 'to_hollow_guardian',
            title: 'Sendero de Corteza Negra',
            narrative: `La ruta cambia: las hojas se oscurecen, el musgo se endurece. El verde se vuelve esmeralda profunda, casi negra.

Escuchan pasos delante. Pesados. Lentos. Como un tambor.

> Cada paso dice: “aquí mando yo”.

[check:informacion dc=15]
[success]Entienden el patrón: el guardián patrulla en círculos. Si lo enfrentan de frente, el bosque lo favorece. Si lo esperan en un cruce, pueden hablar primero.[/success]
[failure]Se acercan sin plan. El bosque mira. La fiebre decide.[/failure]`,
            choices: [
                { text: 'Esperarlo en el cruce y hablar primero', target: 'parley_crossroads' },
                { text: 'Emboscarlo entre raíces', target: 'ambush_plan' },
                { text: 'Seguirlo sin ser vistos (tensión roleo)', target: 'shadow_follow' }
            ]
        },
        {
            id: 'parley_crossroads',
            title: 'Parlamento en el Cruce',
            narrative: `El cruce tiene cuatro caminos y ninguno parece real. Ustedes sí.

El Guardián Hueco llega: una armadura de madera viva, ojos sin pupila, un hueco en el pecho donde debería estar un corazón.

Habla con voz de rama quebrada:
> “¿Propósito?”

## Roleo
Respondan como grupo con una frase breve. Una sola.

[check:informacion dc=16]
[success]Se dan cuenta: el guardián no entiende metáforas. Necesita *acciones* (“devolver”, “sanar”, “proteger”).[/success]
[failure]Hablan bonito. El guardián no reacciona. Y lo que no reacciona… actúa por defecto.[/failure]`,
            choices: [
                { text: 'Decir: “Devolver el corazón al bosque”', target: 'guardian_tests' },
                { text: 'Decir: “Queremos el corazón” (honestidad brutal)', target: 'guardian_hostile' },
                { text: 'Decir: “Buscamos negociar” y ofrecer algo', target: 'guardian_trade' }
            ]
        },
        {
            id: 'guardian_tests',
            title: 'Las Pruebas del Hueco',
            narrative: `El guardián inclina la cabeza. Luego marca el suelo con su lanza de madera.

Tres símbolos aparecen en la tierra:
- Una hoja
- Una espina
- Un círculo

> “Elijan.”

[check:informacion dc=14]
[success]Interpretan los símbolos: hoja = **compasión**, espina = **sacrificio**, círculo = **ciclo** (devolver lo tomado). Cada elección cambia el final.[/success]
[failure]Eligen por intuición. A veces funciona. A veces es la forma más rápida de pagar sin querer.[/failure]`,
            choices: [
                { text: 'Elegir la hoja (compasión)', target: 'test_leaf' },
                { text: 'Elegir la espina (sacrificio)', target: 'test_thorn' },
                { text: 'Elegir el círculo (ciclo)', target: 'test_circle' }
            ]
        },
        {
            id: 'test_leaf',
            title: 'Prueba de la Hoja',
            narrative: `El bosque les muestra una escena: un animal herido, atrapado en un lazo viejo. Sus ojos piden ayuda, pero el lazo tiene runas.

> Ayudar podría activar la magia.

## Roleo
Debatan en voz alta. Elijan una acción grupal.

[check:informacion dc=15]
[success]Entienden el truco: el lazo está hecho para “culpar” al que ayuda. Pero hay una salida: romper la runa con una palabra de verdad, no con fuerza.[/success]
[failure]El lazo parece simple. Y lo simple, en el bosque, suele ser cebo.[/failure]`,
            choices: [
                { text: 'Liberar al animal con cuidado y palabras (compasión)', target: 'leaf_success' },
                { text: 'Ignorarlo para no caer en la trampa', target: 'leaf_ignore' },
                { text: 'Cortar el lazo de un tajo (decisión dura)', target: 'leaf_cut' }
            ]
        },
        {
            id: 'test_thorn',
            title: 'Prueba de la Espina',
            narrative: `Aparece una zarza enorme. Para avanzar deben pasar por ella. No hay atajo.

La zarza susurra:
> “*Duelen los pasos honestos.*”

[check:informacion dc=14]
[success]Comprenden: la zarza no bloquea cuerpos, bloquea **evasiones**. Si cada uno dice un secreto, la zarza abre un corredor sin herir.[/success]
[failure]Creen que se trata de resistencia física. La zarza se ríe como un ramo de cuchillos.[/failure]`,
            choices: [
                { text: 'Confesar un secreto cada uno (roleo fuerte)', target: 'thorn_confession' },
                { text: 'Atravesar igual y aceptar heridas simbólicas', target: 'thorn_blood' },
                { text: 'Intentar quemar la zarza', target: 'thorn_fire' }
            ]
        },
        {
            id: 'test_circle',
            title: 'Prueba del Círculo',
            narrative: `Ven el arroyo de vidrio otra vez. Pero esta vez, del otro lado está… el inicio. Como si el bosque les ofreciera repetirlo todo.

> “Devuelvan lo que tomaron.”

[check:informacion dc=15]
[success]Entienden: el círculo pide restitución. Si tomaron algo (piedra, marca, promesa), deben devolverlo o equivalerlo. Si no, el bosque los cicla hasta quebrarlos.[/success]
[failure]Creen que es una ilusión. Pero el círculo es un mecanismo, no una broma.[/failure]`,
            choices: [
                { text: 'Devolver un objeto o romper una deuda (roleo)', target: 'circle_restitution' },
                { text: 'Negarse a devolver nada', target: 'circle_loop' },
                { text: 'Aceptar repetir el camino para “mejorar”', target: 'circle_loop' }
            ]
        },
        {
            id: 'leaf_success',
            title: 'Compasión que Abre',
            narrative: `El animal se libera. No corre: se acerca y apoya la frente en tu mano.

El bosque exhala.

Una luz verde aparece en el hueco del pecho del guardián.

> “Propósito… aceptado.”

El Guardián Hueco entrega algo: una semilla de cristal.

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
            narrative: `Cada secreto cae al suelo como una gota de savia. La zarza se abre.

En el cruce, el guardián escucha sin emoción. Pero el hueco de su pecho vibra.

[set:shared_secrets=true]`,
            choices: [
                { text: 'Avanzar hacia el corazón', target: 'final_request' },
                { text: 'Pedir al guardián que “devuelva” un secreto a cambio', target: 'guardian_trade' },
                { text: 'Usar la apertura para huir', target: 'lost_loop' }
            ]
        },
        {
            id: 'circle_restitution',
            title: 'Restitución',
            narrative: `Devuelven lo tomado, o lo equivalen con una promesa real. El bosque, por primera vez, parece… satisfecho.

El guardián inclina la cabeza.

> “Ciclo… respetado.”

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
            narrative: `El guardián abre su pecho. En el hueco, el Corazón Esmeralda late como una gema viva. Verde. Hermoso. Peligroso.

No es “propiedad”. Es *latido*.

## Roleo
Voten como grupo:
- ¿Lo devuelven al bosque?
- ¿Lo guardan para evitar que otros lo tomen?
- ¿Lo rompen para que nadie lo use?

[check:informacion dc=17]
[success]Comprenden el costo: devolverlo sana el bosque pero los ata a un pacto. Guardarlo los vuelve objetivo de la corte. Romperlo cura una cosa y enferma otra: el bosque recordará la traición.[/success]
[failure]Solo ven tres opciones. El bosque ve cien consecuencias.[/failure]`,
            choices: [
                { text: 'Devolverlo al altar de la Catedral de Musgo', target: 'ending_return' },
                { text: 'Guardarlo y huir antes de que la corte reaccione', target: 'ending_keep' },
                { text: 'Romperlo aquí mismo (decisión extrema)', target: 'ending_break' }
            ]
        },
        {
            id: 'seed_in_guardian',
            title: 'Semilla en el Hueco',
            narrative: `Plantan la semilla (o una promesa equivalente) en el hueco del guardián. La madera cruje. El bosque respira.

Por primera vez, el guardián dice una frase completa:
> “Recuerdo… por qué.”

[check:informacion dc=15]
[success]Entienden: sanar al guardián crea un aliado y un testigo. La corte no podrá mentirles tan fácil después.[/success]
[failure]El guardián cambia, pero no del todo. A veces lo roto aprende nuevas formas de romper.[/failure]`,
            choices: [
                { text: 'Pedir ayuda para devolver el corazón', target: 'ending_return' },
                { text: 'Pedir escolta para salir', target: 'ending_safe_exit' },
                { text: 'Pedir un juicio contra la corte', target: 'ending_court' }
            ]
        },
        {
            id: 'ending_return',
            title: 'Final: Latido Devuelto',
            narrative: `Regresan al altar. El bosque les abre pasos como si fuera piel.

Colocan el Corazón Esmeralda donde falta. La catedral de musgo se ilumina.

> El verde vuelve a ser verde. No fiebre. No amenaza. Vida.

**FINAL – El Bosque Respira**

## Epílogo (roleo)
Cada jugador dice:
- Qué cambió en su personaje después de escuchar al bosque “hablar”.
- Qué promesa quedó pendiente con el Bosque Esmeralda.`,
            choices: []
        },
        {
            id: 'ending_keep',
            title: 'Final: Ladrones de Verde',
            narrative: `Huyen con el corazón. El bosque no los frena. Eso es lo peor: los deja ir.

En la distancia, la Corte de las Hojas ríe. No por diversión: por cacería.

**FINAL – La Ruta del Trofeo**

## Epílogo (roleo)
¿Quién del grupo se queda con el corazón? ¿Y qué precio paga primero?`,
            choices: []
        },
        {
            id: 'ending_break',
            title: 'Final: Esmeralda Hecha Astillas',
            narrative: `El corazón se rompe. El sonido no es un crack: es un gemido largo.

El verde del bosque se apaga un segundo. Luego vuelve… pero distinto. Más frío. Más atento.

> “Los recordaré,” susurra el bosque. “Como se recuerda una cicatriz.”

**FINAL – La Cicatriz Esmeralda**

## Epílogo (roleo)
Cada jugador decide qué parte de sí perdió en ese instante (un recuerdo, un nombre, una emoción).`,
            choices: []
        },
        {
            id: 'ending_safe_exit',
            title: 'Final: Salida sin Trofeo',
            narrative: `Eligen no llevarse nada. El bosque, sorprendentemente, respeta esa decisión.

Vuelven a la frontera y el mundo de piedra les parece ruidoso, torpe, demasiado lineal.

**FINAL – Camino Limpio**

## Epílogo (roleo)
¿Qué rumor llevan a la ciudad sobre los Bosques Esmeralda? ¿Y cuál guardan para ustedes?`,
            choices: []
        },
        {
            id: 'ending_court',
            title: 'Final: Juicio de Hojas',
            narrative: `Regresan a la corte. Esta vez, no como visitantes: como acusadores.

Los hongos brillan. Las luciérnagas escriben palabras en el aire.

> “Hablen bonito,” repite la voz sin dueño. “Y díganlo todo.”

**FINAL – La Corte Escucha**

## Epílogo (roleo)
¿A quién condena el grupo: a la corte, al guardián, o a sí mismos?`,
            choices: []
        },
        {
            id: 'lost_loop',
            title: 'El Bucle del Bosque',
            narrative: `Caminan… y vuelven. Caminan… y vuelven.

El bosque no castiga con dolor. Castiga con repetición.

> Si no elegís, el bosque elige por vos: *otra vez lo mismo*.

**FIN (abierto) – El Bucle**

Pueden retomar desde “El Umbral Verde” cuando decidan qué precio están dispuestos a pagar.`,
            choices: [
                { text: 'Volver a intentarlo desde el principio', target: 'start' }
            ]
        },
        {
            id: 'broken_rhythm',
            title: 'Ritmo Roto',
            narrative: `Encienden la lámpara de golpe. Las luciérnagas se dispersan como letras borradas.

El bosque se ofende sin decirlo. Eso es peor: no hay discusión, solo consecuencia.

[check:informacion dc=14]
[success]Entienden el error: en lo feérico, romper el ritmo equivale a romper una promesa. Pueden “reparar” con una disculpa ritual (palabras + gesto).[/success]
[failure]Creen que nada pasó. Pero el aire se volvió un poco más frío.[/failure]`,
            choices: [
                { text: 'Hacer una disculpa ritual (roleo)', target: 'moss_cathedral' },
                { text: 'Seguir igual, sin disculparse', target: 'lost_loop' }
            ]
        },
        {
            id: 'old_tracks',
            title: 'Huellas Antiguas',
            narrative: `Encuentran huellas viejas: botas, pezuñas, algo que arrastra.

Entre las marcas, una pisada humana pequeña: alguien que dudó, y volvió atrás.

[check:informacion dc=15]
[success]La huella pequeña tiene un patrón: pasos cortos, constantes. No huía. **Seguía un ritual**. Eso los acerca a la corte.[/success]
[failure]Solo ven “gente pasó por acá”. Pero no leen el lenguaje del suelo.[/failure]`,
            choices: [
                { text: 'Seguir las huellas hacia donde “dudan”', target: 'fey_court' },
                { text: 'Alejarse de huellas: buscar un camino intacto', target: 'emerald_gate' }
            ]
        },
        {
            id: 'hollow_chest',
            title: 'Hueco en el Pecho del Relieve',
            narrative: `El hueco tiene bordes pulidos, como si algo hubiera estado ahí miles de veces. No por repetición, sino por destino.

Dentro, una línea de runas casi borradas:
> “*Cuando el corazón se va, el bosque aprende a morder.*”

[check:informacion dc=14]
[success]Esto confirma que la “fiebre” del bosque es defensiva: no es maldad, es sistema inmune. Sanarlo requiere devolver el latido o reemplazarlo por otro pacto.[/success]
[failure]Entienden “peligro” y “bosque”. Lo demás queda para después.[/failure]`,
            choices: [
                { text: 'Buscar la ruta hacia el guardián', target: 'emerald_gate' },
                { text: 'Hacer un pacto: “seremos el corazón si hace falta” (roleo)', target: 'vow_to_forest' }
            ]
        },
        {
            id: 'vow_to_forest',
            title: 'Voto al Verde',
            narrative: `Prometen algo. El bosque no responde con palabras; responde con temperatura. Se vuelve un poco más cálido.

> A veces, “aceptación” se siente como no estar solos.

[check:informacion dc=13]
[success]Notan un detalle: el altar tiene una ranura. Para devolver el corazón, necesitarán un “testigo” (la corte o el guardián).[/success]
[failure]Creen que el voto alcanza. Pero el bosque ama los rituales completos.[/failure]`,
            choices: [
                { text: 'Ir hacia la puerta esmeralda', target: 'emerald_gate' },
                { text: 'Buscar un testigo en la corte', target: 'fey_court' }
            ]
        },
        {
            id: 'pay_with_story',
            title: 'Pago: Historia Verdadera',
            narrative: `Cuentan una historia real. No la más linda: la más verdadera.

La corte escucha en silencio. Y en el silencio, hay respeto… o cálculo.

[set:paid_with_story=true]`,
            choices: [
                { text: 'Preguntar por el Guardián Hueco', target: 'name_the_thief' },
                { text: 'Pedir una ruta segura hacia el altar', target: 'emerald_gate' },
                { text: 'Pedir un favor: una mentira que suene a verdad', target: 'riddle_duel' }
            ]
        },
        {
            id: 'pay_with_sleep',
            title: 'Pago: Una Noche',
            narrative: `Ofrecen una noche de sueño. La corte sonríe: es un pago delicioso.

De repente, sienten cansancio en los huesos, como si ya hubieran caminado días.

[set:paid_with_sleep=true]`,
            choices: [
                { text: 'Seguir igual, pero más lentos (roleo de cansancio)', target: 'name_the_thief' },
                { text: 'Cambiar de idea y ofrecer una historia en su lugar', target: 'pay_with_story' }
            ]
        },
        {
            id: 'riddle_duel',
            title: 'Duelo de Acertijos',
            narrative: `Proponen un acertijo. La corte se entusiasma: ama los juegos donde alguien pierde sin sangre.

## Roleo
Improvisen un acertijo o un desafío verbal. Si no quieren inventar, usen:
> “¿Qué se rompe cuando lo nombrás?”

[check:informacion dc=15]
[success]Saben la respuesta: *el silencio*. La corte aprecia lo simple si es certero.[/success]
[failure]Dudan, se enredan. La corte ríe… y el bosque cobra con confusión.[/failure]`,
            choices: [
                { text: 'Responder: “el silencio” y exigir una pista', target: 'name_the_thief' },
                { text: 'Aceptar perder y pedir que el precio sea leve', target: 'define_price' },
                { text: 'Romper el juego e irse', target: 'lost_loop' }
            ]
        },
        {
            id: 'moral_vote',
            title: 'Voto Moral',
            narrative: `La pregunta cae como una piedra: ¿*salvar* a quien sostiene el corazón… o *destruirlo*?

## Roleo
Cada jugador argumenta 30 segundos. Luego votan:
- Salvar (si se puede)
- Destruir (si hace falta)
- Negociar (si conviene)

[check:informacion dc=14]
[success]Entienden que el bosque valora el consenso: cuanto más unidos estén, menos “juega” con ustedes. La división lo alimenta.[/success]
[failure]La discusión se vuelve pelea. El bosque escucha… y aprende cómo partirlos.[/failure]`,
            choices: [
                { text: 'Ir a negociar con el guardián', target: 'parley_crossroads' },
                { text: 'Ir a emboscar al guardián', target: 'ambush_plan' },
                { text: 'Volver a la corte a buscar ventaja', target: 'fey_court' }
            ]
        },
        {
            id: 'ambush_plan',
            title: 'Plan de Emboscada',
            narrative: `Se esconden entre raíces. El guardián se acerca. Su peso hace temblar la tierra.

El bosque espera el primer golpe… como si fuera una apuesta.

[check:informacion dc=16]
[success]Comprenden el riesgo: si atacan primero, la corte los marcará como “agresores” y algunas rutas se cerrarán. Si esperan y hablan, el bosque ofrece margen.[/success]
[failure]Solo ven ventaja táctica. Pero este bosque no es solo terreno: es juez.[/failure]`,
            choices: [
                { text: 'Abortar la emboscada y hablar', target: 'parley_crossroads' },
                { text: 'Atacar igual (decisión dura)', target: 'guardian_hostile' }
            ]
        },
        {
            id: 'shadow_follow',
            title: 'Seguir la Sombra',
            narrative: `Siguen al guardián a distancia. Cada vez que se detiene, el aire se vuelve más denso.

En un claro, lo ven arrodillarse. No reza. Solo… espera.

[check:informacion dc=15]
[success]Entienden: el guardián no es malvado. Está vacío. Y lo vacío puede llenarse… con lo primero que encuentre.[/success]
[failure]Se conmueven, pero no ven la consecuencia: si no lo llenan ustedes, lo llenará la corte.[/failure]`,
            choices: [
                { text: 'Aparecer y hablar (humanizar)', target: 'parley_crossroads' },
                { text: 'Aprovechar la distracción para robar el corazón', target: 'guardian_hostile' },
                { text: 'Volver a la corte con esta información', target: 'fey_court' }
            ]
        },
        {
            id: 'guardian_trade',
            title: 'Intercambio',
            narrative: `El guardián escucha la palabra “negociar” como si fuera un idioma incompleto.

Extiende la mano, palma arriba.

> “Pago.”

[check:informacion dc=14]
[success]Entienden cómo: el guardián acepta pagos concretos. Un objeto, un juramento simple, un recuerdo narrado. Lo abstracto lo confunde.[/success]
[failure]Le ofrecen conceptos. El guardián se queda inmóvil, como una puerta que no reconoce la llave.[/failure]`,
            choices: [
                { text: 'Ofrecer un juramento simple: “protegeremos el bosque”', target: 'guardian_tests' },
                { text: 'Ofrecer un recuerdo contado (roleo)', target: 'pay_with_story' },
                { text: 'Ofrecer un objeto querido', target: 'material_offering' }
            ]
        },
        {
            id: 'guardian_hostile',
            title: 'Hostilidad',
            narrative: `La tensión se rompe. El guardián levanta su lanza. El bosque contiene el aliento.

No es una pelea “real” (esto es una aventura de decisiones), pero sí es un punto de no retorno:

> Cuando el bosque te etiqueta, te sigue.

[check:informacion dc=17]
[success]Entienden una salida: ceder primero y pedir juicio de la corte. Convertir violencia en *ritual* reduce daño a largo plazo.[/success]
[failure]Solo ven ataque/defensa. El bosque ve “enemigos”.[/failure]`,
            choices: [
                { text: 'Retroceder y pedir juicio ante la corte', target: 'ending_court' },
                { text: 'Seguir adelante y romper el corazón (final extremo)', target: 'ending_break' },
                { text: 'Huir con lo que puedan y salir', target: 'ending_keep' }
            ]
        },
        {
            id: 'leaf_ignore',
            title: 'No Mirar',
            narrative: `Ignoran al animal. Siguen.

Detrás, el lazo se tensa solo. El bosque aprende una cosa sobre ustedes: qué dejan atrás.

Vuelven al cruce con el guardián. Él no dice nada. Pero el hueco de su pecho se siente más frío.`,
            choices: [
                { text: 'Hablar con el guardián de todos modos', target: 'parley_crossroads' },
                { text: 'Ir directo por el corazón', target: 'final_request' }
            ]
        },
        {
            id: 'leaf_cut',
            title: 'Cortar',
            narrative: `Cortan el lazo. La runa chispea. El animal se va, pero deja un rastro de sombra… como si se llevara algo más que miedo.

El bosque no castiga. Solo recuerda.`,
            choices: [
                { text: 'Seguir hacia el guardián', target: 'to_hollow_guardian' },
                { text: 'Volver al altar para pedir perdón', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'thorn_blood',
            title: 'Sangre por Camino',
            narrative: `Atraviesan la zarza. No solo rasga piel. Rasga *posturas*. Sienten vergüenza de cosas que jamás confesaron.

Cuando llegan al cruce, el guardián los mira con algo parecido a respeto. O a reconocimiento de deuda.`,
            choices: [
                { text: 'Pedir el corazón', target: 'final_request' },
                { text: 'Pedir un descanso y roleo de heridas', target: 'parley_crossroads' }
            ]
        },
        {
            id: 'thorn_fire',
            title: 'Fuego',
            narrative: `Intentan quemar la zarza. El fuego prende… y el humo huele a recuerdos.

El bosque se vuelve más silencioso. No por miedo. Por atención.

[check:informacion dc=16]
[success]Entienden que el fuego es tabú aquí. Pueden compensar con un acto de cuidado inmediato (regar, replantar, prometer reparar).[/success]
[failure]Siguen quemando. El bosque decide que ustedes son una enfermedad.[/failure]`,
            choices: [
                { text: 'Apagar el fuego y reparar el daño (roleo)', target: 'circle_restitution' },
                { text: 'Seguir con fuego y forzar el paso', target: 'guardian_hostile' }
            ]
        },
        {
            id: 'answer_the_name',
            title: 'Responder al Viento',
            narrative: `Respondés al nombre que el bosque te entrega. No con gritos: con una verdad corta.

El viento se queda quieto, como si escuchara.

## Roleo
Decí en voz alta una frase que te ancle:
- “*Estoy acá.*”
- “*No soy ese recuerdo.*”
- “*Sigo caminando.*”

[check:informacion dc=13]
[success]El Viento de Recuerdo afloja. No se va, pero deja de empujar. Ganaron un margen: el bosque prefiere el coraje sencillo a la pose heroica.[/success]
[failure]El viento responde con otro nombre. Y otro. Como si probara llaves en una cerradura emocional.[/failure]`,
            choices: [
                { text: 'Seguir hacia el primer claro (sin discutir)', target: 'moss_cathedral' },
                { text: 'Buscar a los Guardianes de Savia para “negociar” paso', target: 'sapia_watchers' }
            ]
        },
        {
            id: 'push_forward',
            title: 'Apretar el Paso',
            narrative: `Ignoran el susurro. Caminan más rápido. El bosque no los detiene… pero les cambia el fondo del sonido. Ya no escuchan pájaros: escuchan *expectativa*.

[check:informacion dc=12]
[success]Entienden lo que ganaron: distancia. Y lo que perdieron: sensibilidad. A partir de ahora, el bosque les avisará menos.[/success]
[failure]Confunden velocidad con control. El bosque no se apura: los deja correr hacia donde quiere.[/failure]`,
            choices: [
                { text: 'Llegar al templo de musgo', target: 'moss_cathedral' },
                { text: 'Volver sobre sus pasos y bajar un cambio', target: 'silent_steps' }
            ]
        },
        {
            id: 'group_oath',
            title: 'Juramento Grupal',
            narrative: `Se juntan, hombro con hombro, y hacen un juramento simple: no separarse sin hablarlo, no callar miedo por orgullo.

El bosque escucha y, por un momento, parece respetar la unidad.

[set:oath_bound=true]`,
            choices: [
                { text: 'Seguir por el corredor más “tranquilo”', target: 'safe_corridor' },
                { text: 'Buscar el altar para pedir una ruta verdadera', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'safe_corridor',
            title: 'Corredor Tranquilo',
            narrative: `Encuentran un tramo raro: no hay susurros, no hay bromas feéricas, no hay trampas visibles. Solo el verde y el paso.

Eso, en los Bosques Esmeralda, es un regalo… o una preparación.`,
            choices: [
                { text: 'Aprovechar el corredor y llegar al claro del altar', target: 'moss_cathedral' },
                { text: 'Detenerse a descansar y hacer roleo de tensiones', target: 'silent_steps' }
            ]
        },
        {
            id: 'deeper_offering',
            title: 'Ofrenda Personal',
            narrative: `Cambian la ofrenda. Esta vez no es “algo”: es *algo que significa*.

Un botón de un uniforme, una carta vieja, una medalla… o una promesa que no pueden deshacer.

[check:informacion dc=14]
[success]El bosque acepta el lenguaje correcto. Se abre una ruta menos caprichosa: la Catedral de Musgo los espera.[/success]
[failure]La ofrenda no alcanza. O quizá el bosque está demasiado hambriento hoy.[/failure]`,
            choices: [
                { text: 'Seguir hacia la Catedral de Musgo', target: 'moss_cathedral' },
                { text: 'Buscar a los Guardianes de Savia para explicar la ofrenda', target: 'sapia_watchers' }
            ]
        },
        {
            id: 'break_the_mark',
            title: 'Romper la Marca',
            narrative: `Rompen la marca del tronco. La corteza se abre como una herida y la savia cae lenta, *verde oscura*.

El bosque no grita. Solo se vuelve más atento.

[check:informacion dc=15]
[success]Entienden el peligro y actúan rápido: limpian la herida, piden disculpas, y prometen reparar. El bosque no perdona… pero negocia.[/success]
[failure]No reparan nada. El bosque decide que ustedes son el tipo de problema que se arregla con repetición. Mucha repetición.[/failure]`,
            choices: [
                { text: 'Intentar disculparse y seguir en silencio', target: 'moss_cathedral' },
                { text: 'Huir sin mirar atrás', target: 'lost_loop' }
            ]
        },
        {
            id: 'truth_bargain',
            title: 'Trato de Verdad',
            narrative: `Dicen la verdad completa. Con defectos. Con vergüenza. Sin heroísmo.

Los Guardianes de Savia se quedan quietos. Uno asiente.

> “Pasan. Pero el bosque los va a probar igual.”`,
            choices: [
                { text: 'Aceptar la prueba y avanzar', target: 'moss_cathedral' },
                { text: 'Pedir una tarea concreta para ganar favor', target: 'service_offer' }
            ]
        },
        {
            id: 'service_offer',
            title: 'Servicio al Bosque',
            narrative: `Ofrecen un servicio: limpiar una corrupción. Los guardianes no sonríen, pero el aire se aligera.

> “Bien. Busquen el latido roto. Y tráiganlo de vuelta.”`,
            choices: [
                { text: 'Seguir hacia el altar para entender el problema', target: 'moss_cathedral' },
                { text: 'Ir directo a donde el bosque “duele”', target: 'emerald_gate' }
            ]
        },
        {
            id: 'challenge_guardians',
            title: 'Desafío',
            narrative: `Los desafían. La corteza alrededor se endurece, como si el bosque quisiera volverse armadura.

Los guardianes no pelean. Solo dicen:
> “Si pasan por fuerza, el bosque les cobrará por miedo.”`,
            choices: [
                { text: 'Bajar el orgullo y negociar', target: 'truth_bargain' },
                { text: 'Pasar igual y aceptar consecuencias', target: 'lost_loop' }
            ]
        },
        {
            id: 'sprite_meeting',
            title: 'Encuentro con un Duende',
            narrative: `Encuentran a la criatura de la risa: un duende de alas finas y ojos demasiado inteligentes.

Se inclina como un actor:
> “¿Vinieron a salvar el bosque… o a protagonizarlo?”

[check:informacion dc=14]
[success]Entienden que el duende es mensajero de la corte. Si lo tratan con respeto, los guía hacia un “teatro” feérico: la Corte de las Hojas.[/success]
[failure]Lo toman por mascota. El duende se ofende y los guía… pero por rutas que se ríen de ustedes.[/failure]`,
            choices: [
                { text: 'Pedir guía hacia quien manda (sin insultar)', target: 'fey_court' },
                { text: 'Pedir guía hacia un altar de poder', target: 'moss_cathedral' },
                { text: 'Seguir sin aceptar compañía', target: 'lost_loop' }
            ]
        },
        {
            id: 'joke_back',
            title: 'Broma Devuelta',
            narrative: `Devuelven la broma. El bosque parece disfrutarlo.

La risa responde, más cerca. Como si alguien aplaudiera con dedos pequeños.`,
            choices: [
                { text: 'Buscar a quien ríe', target: 'sprite_meeting' },
                { text: 'Cortar el juego y seguir al templo de musgo', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'vitreous_hint',
            title: 'Pista de Vitra',
            narrative: `Pronuncian “Vitra”. El arroyo se calma y les muestra un remanso donde el reflejo no miente.

En el agua ven un arco de enredaderas y un trono vacío.

> “Busquen el lugar donde las hojas hablan.”`,
            choices: [
                { text: 'Seguir hacia la Corte de las Hojas', target: 'fey_court' },
                { text: 'Ir primero a la Catedral de Musgo', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'water_trade',
            title: 'Trueque con el Agua',
            narrative: `Ofrecen algo al arroyo: una gota de sangre, o una historia contada sin adornos.

El agua “traga” la ofrenda y deja una palabra en la orilla, escrita con burbujas:
> “**Corazón**”`,
            choices: [
                { text: 'Seguir la palabra hacia el altar', target: 'moss_cathedral' },
                { text: 'Seguir la palabra hacia el arco verde', target: 'emerald_gate' }
            ]
        },
        {
            id: 'stone_break',
            title: 'Astillar el Ancla',
            narrative: `Parten la piedra. La fractura brilla un instante y después se apaga.

Algo se suelta… y algo se engancha.

[check:informacion dc=15]
[success]Entienden que rompieron un ancla, pero no el vínculo: solo lo volvieron irregular. El bosque se vuelve menos predecible… para bien o para mal.[/success]
[failure]Sienten un tirón en el pecho, como si el bosque hubiese atado un hilo a su respiración.[/failure]`,
            choices: [
                { text: 'Seguir hacia la Catedral de Musgo', target: 'moss_cathedral' },
                { text: 'Volver al arroyo y pedir perdón', target: 'talk_to_stream' }
            ]
        },
        {
            id: 'fey_turn',
            title: 'Giro Feérico',
            narrative: `Cruzan el círculo de hongos. Un paso. Dos.

La luz cambia de lugar. La sombra cambia de dueño. El mundo parpadea.

> Cuando el bosque decide jugar, el tablero se mueve.

[check:informacion dc=14]
[success]Reconocen el síntoma: fueron “redirigidos” hacia un punto social del bosque. Están cerca de la Corte de las Hojas.[/success]
[failure]Se marean. El bosque aprovecha y los hace olvidar un detalle importante del camino.[/failure]`,
            choices: [
                { text: 'Seguir el rumor de risas y luz', target: 'fey_court' },
                { text: 'Resistir el cambio y buscar el altar de musgo', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'polite_crossing',
            title: 'Cruce Cortés',
            narrative: `Piden permiso. No como reyes. Como visitantes.

El aire se afloja. Los hongos parecen inclinarse.

> “Pasen,” dice nadie. “Y hablen bonito.”`,
            choices: [
                { text: 'Seguir por la ruta que se abre hacia el anfiteatro', target: 'fey_court' },
                { text: 'Tomar el camino que huele a musgo y altar', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'order_matters',
            title: 'El Orden Importa',
            narrative: `Cambian el orden de marcha. La flecha del cuenco se corrige como si fuera una frase reescrita.

La ruta los lleva a un lugar con eco y luces pequeñas: como un teatro al aire libre.`,
            choices: [
                { text: 'Seguir la ruta hasta el “teatro”', target: 'fey_court' },
                { text: 'Volver al altar: no confiar en rutas sensibles al orden', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'healing_path',
            title: 'Camino de Sanación',
            narrative: `Prometen sanar el bosque. La corte escucha la intención… y evalúa la utilidad.

Una voz de pétalos responde:
> “Si quieren sanar algo, primero entiendan quién lo sostiene.”`,
            choices: [
                { text: 'Preguntar por el Corazón Esmeralda', target: 'heart_question' },
                { text: 'Pedir el nombre del Guardián Hueco', target: 'name_the_thief' },
                { text: 'Ir directo a enfrentarlo', target: 'to_hollow_guardian' }
            ]
        },
        {
            id: 'demand_truth',
            title: 'Exigir Verdad',
            narrative: `Exigen una verdad. La corte se calla. El bosque se inclina hacia ustedes.

Una sola frase cae como sentencia:
> “El guardián está vacío porque alguien le robó el porqué.”`,
            choices: [
                { text: 'Preguntar por el Corazón Esmeralda', target: 'heart_question' },
                { text: 'Ir al guardián y hablar de propósito', target: 'parley_crossroads' }
            ]
        },
        {
            id: 'recover_offer',
            title: 'Ofrecerse a Recuperarlo',
            narrative: `Se ofrecen a recuperarlo. La corte sonríe con aprobación… y con expectativa.

> “Entonces vayan,” dice la voz. “Y vuelvan con un final.”`,
            choices: [
                { text: 'Ir hacia el Guardián Hueco', target: 'to_hollow_guardian' },
                { text: 'Pedir una ruta menos peligrosa', target: 'define_price' }
            ]
        },
        {
            id: 'if_heart_breaks',
            title: 'Si el Corazón se Rompe',
            narrative: `Preguntan qué pasa si se rompe. La corte no ríe.

> “El bosque no muere. El bosque *aprende.*”

Y lo que aprende no siempre es amable.`,
            choices: [
                { text: 'Decidir protegerlo a toda costa', target: 'to_hollow_guardian' },
                { text: 'Volver al altar para entender el ritual', target: 'moss_cathedral' }
            ]
        },
        {
            id: 'origin_research',
            title: 'Investigar el Origen',
            narrative: `Piden contexto, origen, historia. La corte ofrece algo raro: una memoria.

Ves al guardián antes de ser hueco. Ves un juramento. Ves una traición pequeña, casi “justificada”.

[check:informacion dc=16]
[success]Entienden el punto débil: el guardián no cae por fuerza. Cae por una frase correcta: el porqué perdido.[/success]
[failure]Entienden solo que hubo traición. Pero no cómo repararla.[/failure]`,
            choices: [
                { text: 'Ir a negociar con el guardián', target: 'parley_crossroads' },
                { text: 'Ir a buscar el corazón de todos modos', target: 'to_hollow_guardian' }
            ]
        },
        {
            id: 'circle_loop',
            title: 'Ciclo de Repetición',
            narrative: `Repiten. Una vez. Dos. Tres. El bosque prueba si aprenden.

La cuarta vez, ya no recuerdan con claridad qué era “la primera”.

**FIN (abierto) – Ciclo**

Pueden volver a intentar desde el Umbral cuando decidan devolver algo al bosque.`,
            choices: [
                { text: 'Volver al Umbral Verde', target: 'start' }
            ]
        }
    ],
    startNodeId: 'start',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

function loadEmeraldForestAdventure() {
    try {
        const adventures = JSON.parse(localStorage.getItem(ADVENTURES_STORAGE_KEY) || '[]');
        const existingIndex = adventures.findIndex(a => a.id === EMERALD_FOREST_ADVENTURE.id);
        if (existingIndex > -1) {
            adventures[existingIndex] = EMERALD_FOREST_ADVENTURE;
        } else {
            adventures.push(EMERALD_FOREST_ADVENTURE);
        }
        localStorage.setItem(ADVENTURES_STORAGE_KEY, JSON.stringify(adventures));
        return EMERALD_FOREST_ADVENTURE;
    } catch (error) {
        return null;
    }
}

if (typeof window !== 'undefined') {
    window.loadEmeraldForestAdventure = loadEmeraldForestAdventure;
    document.addEventListener('DOMContentLoaded', function() {
        loadEmeraldForestAdventure();
    });
}
