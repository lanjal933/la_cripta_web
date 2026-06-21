// Minigames UI - Sistema de Interfaz de Minijuegos
const MINIGAMES_STORAGE_KEY = 'dd_minigames';

// Contenido del minijuego Contrahechizö (incluido directamente para evitar problemas de CORS)
const CONTRAHECHIZO_CONTENT = `# CONTRÂHECHIZÖ

### El deporte mágico de reacción, precisión y caos arcano

*"Dos equipos. Una esfera de magia. Cero piedad."*

---

# ¿Qué es CONTRÂHECHIZÖ?

Tipo: Minijuego Repetible (juego de mesa)
Requiere: de 4 o 6 jugadores recomendados. No requiere DM
Precio: Gratis

Contrâhechizö es un deporte mágico jugado entre dos equipos utilizando Varitas de Contrahechizo.

No es necesario ser lanzador de conjuros para participar. Las varitas están encantadas específicamente para interactuar con una esfera mágica utilizada como pelota de juego.

El objetivo es simple:

**Lograr que el hechizo toque el suelo dentro del campo enemigo... aunque aveces choque al oponente**

---

# Equipos

* 2 equipos.
* Recomendado: entre 2 y 4 jugadores por equipo.
* Cada jugador posee:

  * 1 Varita de Contrahechizo.
  * 3 vidas.

Cuando un jugador pierde sus 3 vidas:

* Queda eliminado.
* No puede volver a entrar hasta finalizar el partido.

---

# Campo de Juego

Cada casilla representa:

* 5 pies.

La cancha está dividida por una barrera mágica central.

Tamaño recomendado:

* 9 casillas de ancho.
* 12 casillas de largo por lado.

La pelota siempre ocupa:

* 1 casilla horizontal.
* Una altura determinada sobre el suelo.
(te deje un campo de juego mas abajo para que uses en olwbear rodeo)
---

# La "Pelota"

La pelota es un hechizo estabilizado.

Puede adoptar cualquier apariencia:

* Bola de fuego.
* Esfera de agua.
* Cráneo espectral.
* Relámpago comprimido.
* Orbe sombrío.

La apariencia no modifica las reglas.

---

# Sistema de Turnos

No existen iniciativas.

El control del turno depende de qué lado de la cancha valla a ocupar la pelota.

## Funcionamiento

1. Un equipo tiene el control porque la pelota está en su campo.
2. Los jugadores de ese equipo actúan.
3. Si una acción hace que la pelota cruce la red y entre en el campo rival:

   * El turno termina inmediatamente.
   * El equipo rival obtiene el control.
4. Los jugadores del nuevo equipo pueden actuar.

Todos los integrantes de un mismo equipo comparten el turno.

Pueden actuar en cualquier orden.

Incluso pueden realizar acciones de forma coordinada durante el mismo turno.

Ejemplo:

Turno 1.
La pelota se dirige el campo enemigo (lo sabemos por las tiradas y la posición final).
* Un jugador usa una acción para acercarse.
* Otro jugador utiliza un Contrahechizo.
* Un tercero utiliza Reinvocar.
* La pelota se acerca 5 pies a su dirección

Turno 2.
La pelota se dirige el campo enemigo (lo sabemos por las tiradas y la posición final).
* Un jugador usa una acción para acercarse.
* Otro jugador utiliza un Contrahechizo.
* Un jugador usa una acción para acercarse.
* La pelota se acerca 5 pies a su dirección
Se envia la pelota al otro lado

Se reinicia turno para el otro equipo
Turno 1...

Todo ocurre dentro del mismo turno de equipo.

---

# Movimiento

Cada jugador dispone de:

**1 casilla de movimiento (5 pies) por turno.**

Puede utilizarla:

* Antes de actuar.
* Después de actuar.
* Entre acciones.

---

# Economía de Acciones

Cada jugador dispone de:

**4 acciones por turno.**

Las acciones disponibles son:

* Contrahechizo.
* Golpe de Varita.
* Preparar.
* Reinvocar.

---

# Altura de la Pelota

La pelota mantiene su altura durante toda su trayectoria.

Cuando faltan exactamente 10 pies para llegar a su destino:

**Desciende automáticamente 5 pies.**

Ejemplo:

* La pelota es enviada a 15 pies de altura.
* Recorre casi toda la trayectoria a 15 pies.
* Al entrar en los últimos 10 pies de recorrido:

  * Baja a 10 pies.
* Finaliza su movimiento.

---

# ACCIÓN: CONTRAHECHIZO

Uso ilimitado.

La varita dispara energía para empujar la pelota.

## Alcance

Puede utilizarse desde cualquier lugar de la cancha.

Sin embargo:

Por cada 15 pies de distancia entre el jugador y la pelota:

-2 al resultado de la tirada.

Ejemplo:

* 25 pies → -2.
* 35 pies → -4.
* 45 pies → -6.

Si se esta a 5 pies de la pelota es un penalizador de -3
(Solo si estas a 10 pies ósea 2 casillas de distancia de la pelota esta no te da penalizador
 ## Bloqueo por otro jugaor

.No puede utilizarse si otro jugador está exactamente entre el lanzador y la pelota.

Los aliados también bloquean.

## Tirada

### Modo Simple

1d20

### Modo Profesional

1d20 + modificador de Sabiduría

## Resultado

### 1-5

Fallo.

La pelota continúa su trayectoria sin alteraciones.

### 6-10

Impacto débil.

La pelota avanza 15 pies.

Luego se tira 1d6 para definir curvatura:

* 1-2 → una casilla a la izquierda.
* 3-4 → recto.
* 5-6 → una casilla a la derecha.

### 11-19

Impacto normal.

La pelota avanza 20 pies.

Luego se tira 1d6:

* 1-2 → una casilla a la izquierda.
* 3-4 → recto.
* 5-6 → una casilla a la derecha.

### 20

Impacto perfecto.

La pelota avanza 25 pies.

El jugador decide:

* Izquierda.
* Derecha.
* Recto.

## Contrahechizos Encadenados

Varios jugadores pueden intentar afectar la misma pelota durante un mismo turno.

Cada intento adicional recibe:

-1 acumulativo.

Ejemplo:

* Primer intento: sin penalizador.
* Segundo intento: -1.
* Tercer intento: -2.
* Cuarto intento: -3.

---

# ACCIÓN: GOLPE DE VARITA

El jugador rodea la varita con un campo de fuerza temporal y golpea directamente la pelota.

## Requisito

Estar a 5 pies o menos de la pelota.

## Tirada

### Modo Simple

1d20

### Modo Profesional

1d20 + modificador de Destreza

## Resultado

### 1-3

Fallo.

La pelota cae.

Punto para el equipo rival.

### 4-10

Golpe débil.

La pelota avanza 10 pies.

### 11-15

Golpe normal.

La pelota avanza 15 pies.

### 16-19

Golpe fuerte.

La pelota avanza 20 pies.

### 20

Golpe muy fuerte.

La pelota avanza 20 pies.

Además el jugador elige:

* Izquierda.
* Derecha.
* Recto.

---

# ACCIÓN: PREPARAR

El jugador pronuncia:

**"Levitar"**

y fuerza a la pelota a ganar altura. Te podes encontrar máximo a 10 pies de la pelota

## Tirada

### Modo Simple

1d20

### Modo Profesional

1d20 + modificador de Inteligencia

## Resultado

### 1-5

Fallo.

La pelota cae inmediatamente.

### 6-19

Éxito.

La pelota gana 10 pies de altura.

### 20

Éxito crítico.

La pelota gana 15 pies de altura.

---

# ACCIÓN: REINVOCAR

El jugador reorganiza la estructura mágica de la pelota.

## Usos

1 uso.

Recupera el uso tras 2 rondas completas.

## Requisito

Estar a 10 pies o menos de la pelota.

## Procedimiento

El jugador declara:

* Casilla objetivo.
* Altura objetivo.

La altura mínima es de 10 pies.

## Tirada

1d100

### 1

Fallo.

La acción se pierde.

### 2-49

Interferencia mágica.

La pelota aparece en la posición opuesta del campo respecto al lugar indicado.

### 50-99

Éxito.

La pelota aparece exactamente donde fue declarada.

### 100

Éxito crítico.

La pelota aparece:

* En el lugar indicado.
* 5 pies más baja de lo declarado.

# Acciones Especiales 
cuentan como acciones comunes:
* Tirarse: Puedes tirate al suelo gastando de 5 a 10 pies, esto hará que puedas golpear una pelota que esta a 5 pies del suelo. Levantarse cuesta una accion de un turno (5 pies de movimiento). Estar derribado hace que todas tus acciones somaticas peguen con desventaja (todas menos reinvocar).
* Escudo Humano: Puedes usar tu cuerpo como escudo para evitar que una pelota toque tu área. Salvas con ventaja. Podes convinarlo con tirarse pero salvas normal la constitución


---

# Impactos Contra Jugadores

Si la pelota atraviesa una casilla ocupada por un jugador y este no logra detenerla:

Debe realizar una tirada de resistencia.

## Modo Simple

1d20

## Modo Profesional

1d20 + modificador de Constitución

## Resultado

### 1-10

Pierde 1 vida.

### 11-20

Resiste el impacto.

---

# Puntuación

Un equipo obtiene 1 punto cuando:

* La pelota toca el suelo en el campo enemigo.
* La pelota sale fuera de los límites por una acción rival.
* Un rival falla una acción y provoca que la pelota caiga.

---

# Victoria

Formatos recomendados:

## Partido Rápido

5 puntos.

## Partido Estándar

10 puntos.

## Partido de Campeonato

15 puntos.

---

# Posiciones Oficiales (Variante opcional)

Cada jugador puede elegir una especialización.

---

## INTERCEPTOR

*"Si la ves venir, ya es tarde."*

Especialista en cobertura y defensa.

### Pasiva: Paso Relámpago

Una vez por turno puede moverse 5 pies hacia la pelota.

No consume movimiento.

### Habilidad: Intercepción Imposible

1 vez cada 2 rondas.

Puede realizar Golpe de Varita a una distancia de hasta 10 pies.

---

## DISTORSIONADOR

*"Nadie sabe dónde caerá."*

Especialista en trayectorias impredecibles.

### Pasiva: Efecto Curvo

Cuando modifica la dirección de la pelota puede volver a tirar el dado de dirección.

Debe aceptar el nuevo resultado.

### Habilidad: Giro Arcano

1 vez por ronda.

Después de impactar la pelota puede desplazar su destino una casilla adicional hacia la izquierda o derecha.

---

## INVOCADOR

*"El caos también es una estrategia."*

Especialista en Reinvocar.

### Pasiva: Memoria Arcana

Al utilizar Reinvocar:

Los resultados entre 2 y 19 pasan a contar como éxito normal.

### Habilidad: Reinvocación Forzada

1 vez por partido.

Puede ignorar completamente la tirada de Reinvocar.

La pelota aparece exactamente donde declaró.

---

# Modos de Juego

## Modo Simple

No requiere personajes de D&D.

Todas las tiradas se realizan sin modificadores.

---

## Modo Profesional

Se juega utilizando personajes de D&D.

Se añaden modificadores de característica:

* Contrahechizo → Sabiduría.
* Golpe de Varita → Destreza.
* Preparar → Inteligencia.
* Reinvocar → Inteligencia.
* Resistir Impactos → Constitución.

# Cancha:
[Poner imagen imágenes/contrahechizo_cancha]
Esta es una canhca que pueden usar para su juego de contrahechizo, obvio pueden usar las sullas personalizadas. La red mide 5 pies, en caso que por algún motivo la pelota valla recta hacia la red es punto para el equipo contrario al que tiro la pelota`;

const minigamesGrid = document.getElementById('minigamesGrid');
const minigamesEmptyState = document.getElementById('minigamesEmptyState');

let allMinigames = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing minigames system...');
    loadMinigames();
    
    // Create minigame button
    const createBtn = document.getElementById('createMinigameBtn');
    if (createBtn) {
        createBtn.addEventListener('click', createNewMinigame);
    }
});

// LocalStorage Functions
function getMinigames() {
    const data = localStorage.getItem(MINIGAMES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveMinigames(minigames) {
    localStorage.setItem(MINIGAMES_STORAGE_KEY, JSON.stringify(minigames));
}

// Load Minigames
async function loadMinigames() {
    console.log('Loading minigames...');
    
    // Clear localStorage to force reload with correct paths
    localStorage.removeItem(MINIGAMES_STORAGE_KEY);
    allMinigames = getMinigames();
    
    // Si no existe el minijuego Contrahechizö, agregarlo desde el contenido incluido
    try {
        const exists = allMinigames.some(m => m && m.id === 'minigame_contrahechizo');
        if (!exists) {
            const contraMinigame = {
                id: 'minigame_contrahechizo',
                title: 'Contrahechizö - Reglas Completas',
                description: 'El deporte mágico de reacción, precisión y caos arcano. Dos equipos, una esfera de magia, cero piedad.',
                category: 'Minijuego',
                level: 0,
                tags: ['minijuego', 'contrahechizo', 'deporte', 'magia'],
                type: 'minigame',
                coverImage: '../images/cancha_contrahechizo.jpg',
                createdAt: new Date().toISOString(),
                content: CONTRAHECHIZO_CONTENT,
                rules: CONTRAHECHIZO_CONTENT
            };
            allMinigames.push(contraMinigame);
            saveMinigames(allMinigames);
            console.log('Minijuego Contrahechizö cargado desde contenido incluido');
        }
    } catch (e) {
        console.error('Error al verificar minijuegos por defecto:', e);
    }
    
    // Cargar minijuegos desde el sistema de carpetas (content-discovery)
    try {
        if (window.contentDiscovery) {
            const minijuegosIndex = await window.contentDiscovery.discoverCategory('minijuegos');
            console.log('Minijuegos desde sistema de carpetas:', minijuegosIndex);
            
            if (minijuegosIndex.items && minijuegosIndex.items.length > 0) {
                for (const item of minijuegosIndex.items) {
                    // Verificar si ya existe en localStorage
                    const exists = allMinigames.some(m => m && m.id === item.id);
                    
                    if (!exists && item.published !== false) {
                        // Convertir del formato del sistema de carpetas al formato de localStorage
                        const folderMinigame = {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            category: item.category || 'Minijuego',
                            level: item.metadata?.difficulty === 'Difícil' ? 5 : 0,
                            tags: item.tags || [],
                            type: 'combat_chamber',
                            coverImage: item.thumbnail || '',
                            createdAt: item.created || new Date().toISOString(),
                            customUrl: '../' + item.path.replace('./', '') + 'index.html',
                            content: `Minijuego de combate táctico: ${item.description}`,
                            rules: `Minijuego de combate táctico: ${item.description}`
                        };
                        
                        allMinigames.push(folderMinigame);
                        console.log('Minijuego cargado desde sistema de carpetas:', item.id);
                    }
                }
                
                // Guardar los minijuegos actualizados
                saveMinigames(allMinigames);
            }
        }
    } catch (e) {
        console.error('Error al cargar minijuegos desde sistema de carpetas:', e);
    }
    
    console.log('Found minigames:', allMinigames.length);
    renderMinigames();
    console.log('Minigames loaded successfully');
}

// Render Minigames
function renderMinigames() {
    if (minigamesGrid) minigamesGrid.innerHTML = '';
    
    let minigameCount = 0;
    
    allMinigames.forEach(minigame => {
        const card = createMinigameCard(minigame);
        minigameCount++;
        if (minigamesGrid) minigamesGrid.appendChild(card);
    });
    
    if (minigamesEmptyState) minigamesEmptyState.classList.toggle('hidden', minigameCount > 0);
}

// Create Minigame Card
function createMinigameCard(minigame) {
    const card = document.createElement('div');
    card.className = 'bg-bg-card/85 border border-violet-primary/20 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer backdrop-blur-sm hover:bg-bg-hover/85 hover:border-violet-primary/35 hover:-translate-y-0.5';
    
    const cover = minigame.coverImage
        ? `<img src="${minigame.coverImage}" alt="${minigame.title}" class="w-full h-56 object-cover" onerror="this.style.display='none'">`
        : `<div class="w-full h-56 bg-gradient-to-br from-violet-primary/15 to-arcane-blue/10 flex items-center justify-center"><span class="text-6xl">🎮</span></div>`;
    
    card.innerHTML = `
        <div class="relative">
            ${cover}
            <div class="absolute top-3 left-3">
                <span class="bg-bg-panel/80 border border-violet-primary/20 text-silver-soft text-xs px-2 py-1 rounded">Minijuego</span>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-title text-xl text-violet-primary mb-2">${minigame.title || minigame.name || minigame.nombre || minigame.id || 'Sin nombre'}</h3>
            <p class="text-silver-soft/80 text-sm mb-3 line-clamp-2">${minigame.description || minigame.descripcion || minigame.type || minigame.tipo || ''}</p>
            <div class="flex flex-wrap gap-2 mb-3">
                <span class="bg-bg-panel/70 border border-violet-primary/10 text-silver-soft text-xs px-2 py-1 rounded">${minigame.category}</span>
                ${minigame.tags ? minigame.tags.map(tag => `<span class="bg-bg-panel/70 border border-violet-primary/10 text-silver-soft text-xs px-2 py-1 rounded">${tag}</span>`).join('') : ''}
            </div>
            <div class="flex items-center justify-between text-sm text-silver-soft/70">
                <span>📜 Reglas</span>
                <span>${formatDate(minigame.createdAt)}</span>
            </div>
            <div class="mt-3 pt-3 border-t border-violet-primary/10 flex gap-2">
                ${minigame.type === 'combat_chamber' ? 
                    `<button class="play-btn flex-1 bg-gradient-to-r from-blood-red to-violet-deep hover:from-blood-red hover:to-violet-primary text-white text-xs py-2 rounded transition-colors" data-id="${minigame.id}">
                        ⚔ Jugar
                    </button>` :
                    `<button class="play-btn flex-1 bg-arcane-blue hover:bg-violet-primary text-white text-xs py-2 rounded transition-colors" data-id="${minigame.id}">
                        📜 Ver reglas
                    </button>`
                }
                <button class="delete-btn bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 rounded transition-colors" data-id="${minigame.id}">
                    🗑️
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const playBtn = card.querySelector('.play-btn');
    const deleteBtn = card.querySelector('.delete-btn');
    
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playMinigame(minigame.id);
    });
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteMinigame(minigame.id);
    });
    
    return card;
}

// Función para convertir texto de reglas a HTML estilizado
function renderRulesToHTML(content) {
    if (!content) return '<p class="text-silver-soft">No hay contenido disponible</p>';
    
    let html = content;
    
    // Convertir encabezados markdown
    html = html.replace(/^# (.+)$/gm, '<h1 class="font-title text-4xl text-violet-primary mb-6 mt-8 border-b border-violet-primary/30 pb-4">$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="font-title text-2xl text-violet-soft mb-4 mt-6">$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3 class="font-title text-xl text-arcane-blue mb-3 mt-4">$1</h3>');
    
    // Convertir texto en negrita
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-violet-bright">$1</strong>');
    
    // Convertir texto en cursiva
    html = html.replace(/\*(.+?)\*/g, '<em class="text-silver-soft">$1</em>');
    
    // Convertir citas
    html = html.replace(/^> "(.+)"$/gm, '<blockquote class="border-l-4 border-violet-primary/50 pl-4 py-2 my-4 bg-bg-panel/50 rounded-r italic text-silver-soft">"$1"</blockquote>');
    
    // Convertir listas con bullets
    html = html.replace(/^(\*) (.+)$/gm, '<li class="text-silver-soft ml-6 mb-2 list-disc">$2</li>');
    
    // Convertir listas numeradas
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="text-silver-soft ml-6 mb-2 list-decimal">$2</li>');
    
    // Convertir separadores
    html = html.replace(/^---$/gm, '<hr class="border-violet-primary/20 my-6">');
    
    // Convertir código inline
    html = html.replace(/`(.+?)`/g, '<code class="bg-bg-panel px-2 py-1 rounded text-violet-soft text-sm font-mono">$1</code>');
    
    // Convertir bloques de código
    html = html.replace(/```([\s\S]+?)```/g, '<pre class="bg-bg-panel p-4 rounded-lg my-4 overflow-x-auto"><code class="text-silver-soft text-sm font-mono">$1</code></pre>');
    
    // Envolver párrafos que no son HTML
    const lines = html.split('\n');
    let result = '';
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('<li') || line.startsWith('<h1') || line.startsWith('<h2') || line.startsWith('<h3') || line.startsWith('<blockquote') || line.startsWith('<hr') || line.startsWith('<pre')) {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            result += line + '\n';
        } else if (line === '') {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            result += '<p class="text-silver-soft mb-4"></p>\n';
        } else if (line.startsWith('*') || line.match(/^\d+\./)) {
            if (!inList) {
                result += '<ul class="mb-4">\n';
                inList = true;
            }
            // Ya fue convertido a <li> arriba
        } else if (!line.startsWith('<')) {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            result += '<p class="text-silver-soft mb-4 leading-relaxed">' + line + '</p>\n';
        } else {
            result += line + '\n';
        }
    }
    
    if (inList) {
        result += '</ul>';
    }
    
    return result;
}

// Play Minigame (show rules - no adventure elements)
function playMinigame(minigameId) {
    const minigames = getMinigames();
    const minigame = minigames.find(m => m.id === minigameId);
    
    if (minigame) {
        // Check if it's a combat chamber with custom URL
        if (minigame.customUrl && minigame.type === 'combat_chamber') {
            window.location.href = minigame.customUrl;
            return;
        }
        
        const rulesHTML = renderRulesToHTML(minigame.content || minigame.rules);
        const hasCustomCode = minigame.htmlCode || minigame.cssCode || minigame.jsCode;
        
        // Crear modal estilizado para mostrar las reglas
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-bg-card border border-violet-primary/30 rounded-xl max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl">
                <!-- Header -->
                <div class="flex items-center justify-between p-6 border-b border-violet-primary/20 bg-gradient-to-r from-bg-panel to-bg-card">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-violet-primary to-arcane-blue rounded-lg flex items-center justify-center">
                            <span class="text-2xl">🎮</span>
                        </div>
                        <div>
                            <h2 class="font-title text-3xl text-violet-primary">${minigame.title || minigame.name || minigame.nombre || 'Sin nombre'}</h2>
                            <p class="text-silver-soft/70 text-sm">${minigame.description || minigame.descripcion || ''}</p>
                        </div>
                    </div>
                    <button class="close-modal text-silver-soft hover:text-white text-4xl leading-none transition-colors hover:rotate-90 duration-300">&times;</button>
                </div>
                
                <!-- Content -->
                <div class="p-8 overflow-y-auto max-h-[calc(95vh-140px)] bg-bg-deep custom-scrollbar">
                    ${hasCustomCode ? `
                        <!-- Rendered Preview Section -->
                        <div class="mb-6">
                            <h3 class="font-title text-xl text-violet-primary mb-3">🎨 Preview Renderizado</h3>
                            <div id="minigamePreview" class="bg-white rounded-lg p-4 min-h-[200px] overflow-auto">
                                ${minigame.htmlCode ? minigame.htmlCode : '<p class="text-gray-500 text-sm">No hay HTML para mostrar</p>'}
                            </div>
                        </div>
                        ${minigame.jsCode ? `
                            <div class="mb-6">
                                <h3 class="font-title text-xl text-yellow-400 mb-3">📜 JavaScript</h3>
                                <div class="bg-bg-panel/50 border border-yellow-600/30 rounded-lg p-4">
                                    <pre class="text-sm text-yellow-300 font-mono overflow-x-auto">${minigame.jsCode}</pre>
                                </div>
                            </div>
                        ` : ''}
                        ${minigame.content || minigame.rules ? `
                            <div class="border-t border-violet-primary/20 pt-6 mt-6">
                                <h3 class="font-title text-xl text-violet-primary mb-3">📜 Reglas</h3>
                                <div class="prose prose-invert prose-lg max-w-none">
                                    ${rulesHTML}
                                </div>
                            </div>
                        ` : ''}
                    ` : `
                        <div class="prose prose-invert prose-lg max-w-none">
                            ${rulesHTML}
                        </div>
                    `}
                </div>
                
                <!-- Footer -->
                <div class="p-4 border-t border-violet-primary/20 bg-bg-panel flex justify-between items-center">
                    <div class="text-silver-soft/60 text-sm">
                        ${hasCustomCode ? '🎮 Preview del minijuego' : '📜 Reglas completas del minijuego'}
                    </div>
                    <button class="close-modal bg-gradient-to-r from-violet-primary to-arcane-blue hover:from-violet-soft hover:to-violet-primary text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-primary/25 font-medium">
                        Cerrar
                    </button>
                </div>
            </div>
            
            <style>
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #181722;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #7C5CFF;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9277FF;
                }
            </style>
        `;
        
        document.body.appendChild(modal);
        
        // Apply CSS to the rendered preview
        if (minigame.cssCode) {
            const renderedPreview = document.getElementById('minigamePreview');
            if (renderedPreview) {
                const styleTag = document.createElement('style');
                styleTag.textContent = minigame.cssCode;
                renderedPreview.appendChild(styleTag);
            }
        }
        
        // Execute JS if present
        if (minigame.jsCode) {
            try {
                eval(minigame.jsCode);
            } catch (e) {
                console.error('Error executing minigame JS:', e);
            }
        }
        
        // Cerrar modal
        const closeButtons = modal.querySelectorAll('.close-modal');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => modal.remove());
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Cerrar con ESC
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
}

// Delete Minigame
function deleteMinigame(minigameId) {
    if (!confirm('¿Estás seguro de eliminar este minijuego?')) return;
    
    const minigames = getMinigames();
    const filtered = minigames.filter(m => m.id !== minigameId);
    saveMinigames(filtered);
    loadMinigames();
}

// Create New Minigame
function createNewMinigame() {
    const newId = 'minigame_' + Date.now().toString(36);
    
    // Create modal for editing minigame
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-bg-card border border-violet-primary/30 rounded-xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between p-6 border-b border-violet-primary/20 bg-gradient-to-r from-bg-panel to-bg-card">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-violet-primary to-arcane-blue rounded-lg flex items-center justify-center">
                        <span class="text-2xl">🎮</span>
                    </div>
                    <div>
                        <h2 class="font-title text-3xl text-violet-primary">Crear Nuevo Minijuego</h2>
                        <p class="text-silver-soft/70 text-sm">Define las reglas y contenido del minijuego</p>
                    </div>
                </div>
                <button class="close-modal text-silver-soft hover:text-white text-4xl leading-none transition-colors hover:rotate-90 duration-300">&times;</button>
            </div>
            
            <!-- Content -->
            <div class="p-8 overflow-y-auto max-h-[calc(95vh-140px)] bg-bg-deep custom-scrollbar">
                <form id="minigameForm" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm text-silver-soft mb-2">ID del Minijuego</label>
                            <input type="text" id="newMinigameId" value="${newId}" readonly class="w-full bg-bg-panel border border-violet-primary/20 text-silver-soft p-3 rounded focus:border-violet-primary focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm text-silver-soft mb-2">Título *</label>
                            <input type="text" id="newMinigameTitle" required class="w-full bg-bg-panel border border-violet-primary/20 text-white p-3 rounded focus:border-violet-primary focus:outline-none" placeholder="Ej: Puzzle de Runas">
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm text-silver-soft mb-2">Descripción *</label>
                        <textarea id="newMinigameDescription" rows="2" required class="w-full bg-bg-panel border border-violet-primary/20 text-white p-3 rounded focus:border-violet-primary focus:outline-none" placeholder="Breve descripción del minijuego..."></textarea>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label class="block text-sm text-silver-soft mb-2">Categoría</label>
                            <select id="newMinigameCategory" class="w-full bg-bg-panel border border-violet-primary/20 text-white p-3 rounded focus:border-violet-primary focus:outline-none">
                                <option value="Puzzle">Puzzle</option>
                                <option value="Deporte">Deporte</option>
                                <option value="Dados">Dados</option>
                                <option value="Cartas">Cartas</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm text-silver-soft mb-2">Nivel</label>
                            <input type="number" id="newMinigameLevel" value="0" min="0" max="20" class="w-full bg-bg-panel border border-violet-primary/20 text-white p-3 rounded focus:border-violet-primary focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-sm text-silver-soft mb-2">Tags (separados por coma)</label>
                            <input type="text" id="newMinigameTags" class="w-full bg-bg-panel border border-violet-primary/20 text-white p-3 rounded focus:border-violet-primary focus:outline-none" placeholder="ej: puzzle, logica, rapido">
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm text-silver-soft mb-2">URL de Imagen (opcional)</label>
                        <input type="text" id="newMinigameCover" class="w-full bg-bg-panel border border-violet-primary/20 text-white p-3 rounded focus:border-violet-primary focus:outline-none" placeholder="../images/minijuego.jpg">
                    </div>
                    
                    <div>
                        <label class="block text-sm text-silver-soft mb-2">Reglas/Contenido (Markdown) *</label>
                        <textarea id="newMinigameContent" rows="15" required class="w-full bg-bg-panel border border-violet-primary/20 text-white p-3 rounded focus:border-violet-primary focus:outline-none font-mono text-sm" placeholder="# Título del Minijuego

## Descripción
Describe cómo funciona el minijuego...

## Reglas
- Regla 1
- Regla 2

## Ejemplos
Describe ejemplos de juego..."></textarea>
                    </div>
                </form>
            </div>
            
            <!-- Footer -->
            <div class="p-4 border-t border-violet-primary/20 bg-bg-panel flex justify-between items-center">
                <div class="text-silver-soft/60 text-sm">
                    Los campos marcados con * son obligatorios
                </div>
                <div class="flex gap-4">
                    <button class="close-modal bg-bg-hover hover:bg-bg-card text-white px-6 py-3 rounded-lg transition-all duration-300">
                        Cancelar
                    </button>
                    <button id="saveMinigameBtn" class="bg-gradient-to-r from-violet-primary to-arcane-blue hover:from-violet-soft hover:to-violet-primary text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-violet-primary/25 font-medium">
                        💾 Guardar Minijuego
                    </button>
                </div>
            </div>
        </div>
        
        <style>
            .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #181722;
                border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #7C5CFF;
                border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #9277FF;
            }
        </style>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
    
    // Save minigame
    document.getElementById('saveMinigameBtn').addEventListener('click', () => {
        const title = document.getElementById('newMinigameTitle').value;
        const description = document.getElementById('newMinigameDescription').value;
        const category = document.getElementById('newMinigameCategory').value;
        const level = parseInt(document.getElementById('newMinigameLevel').value) || 0;
        const tagsStr = document.getElementById('newMinigameTags').value;
        const coverImage = document.getElementById('newMinigameCover').value;
        const content = document.getElementById('newMinigameContent').value;
        
        if (!title || !description || !content) {
            alert('Por favor completa los campos obligatorios');
            return;
        }
        
        const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : [];
        
        const newMinigame = {
            id: newId,
            title,
            description,
            category,
            level,
            tags,
            type: 'minigame',
            coverImage: coverImage || null,
            createdAt: new Date().toISOString(),
            content,
            rules: content
        };
        
        const minigames = getMinigames();
        minigames.push(newMinigame);
        saveMinigames(minigames);
        
        modal.remove();
        document.body.style.overflow = '';
        loadMinigames();
        
        alert('Minijuego creado exitosamente');
    });
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Hacer funciones disponibles globalmente
window.loadMinigames = loadMinigames;
window.renderMinigames = renderMinigames;
window.playMinigame = playMinigame;
window.deleteMinigame = deleteMinigame;
