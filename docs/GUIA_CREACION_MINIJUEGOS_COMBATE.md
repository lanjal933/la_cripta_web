# Guía para Crear Minijuegos de Combate Táctico

Esta guía explica cómo crear minijuegos de combate táctico inspirados en D&D 5e, similar a "La Caza del Alfa Gris".

## Estructura de Carpetas

```
content/minijuegos/[nombre-minijuego]/
├── metadata.json          # Metadatos del minijuego
├── index.html             # Interfaz principal
├── styles.css             # Estilos del minijuego
├── game.js                # Lógica del juego
└── GUIA_PERSONALIZACION.md # Guía de personalización
```

## Archivos Esenciales

### 1. metadata.json

Define la información del minijuego para el sistema de descubrimiento automático.

```json
{
  "title": "Título del Minijuego",
  "description": "Descripción breve del minijuego",
  "category": "combate",
  "tags": ["táctico", "dnd", "combate"],
  "difficulty": "medio",
  "estimatedTime": "15-20 minutos",
  "version": "1.0.0",
  "author": "Tu Nombre",
  "gameMetadata": {
    "characterLevel": 4,
    "enemyCount": 4,
    "gridSize": "10x10"
  }
}
```

### 2. index.html

Estructura HTML del minijuego con los siguientes paneles:
- **Panel Izquierdo**: Ficha del personaje (estadísticas, recursos, estados)
- **Panel Central**: Mapa táctico con grid
- **Panel Derecho**: Información del enemigo seleccionado
- **Panel Inferior**: Registro narrativo de combate
- **Panel de Acciones**: Botones de acciones (debajo del registro)

Elementos clave:
```html
<div class="game-container">
  <!-- Panel del Personaje -->
  <div class="panel character-sheet">
    <h2>Nombre del Personaje</h2>
    <!-- Estadísticas, HP, recursos, estados -->
  </div>

  <!-- Mapa Táctico -->
  <div class="panel tactical-map">
    <div class="map-container">
      <img src="../../../images/tablero.jpg" alt="Tablero">
      <div class="grid-overlay" id="grid-overlay"></div>
      <!-- Tokens del jugador y enemigos -->
    </div>
  </div>

  <!-- Panel del Enemigo -->
  <div class="panel enemy-panel">
    <h2 id="enemy-name">Selecciona un Enemigo</h2>
    <!-- Imagen del enemigo, estadísticas, habilidades -->
  </div>

  <!-- Registro de Combate -->
  <div class="panel combat-log">
    <h2>Registro Narrativo</h2>
    <div id="combat-log"></div>
  </div>

  <!-- Panel de Acciones -->
  <div class="panel actions-panel">
    <h2>Acciones</h2>
    <div class="actions-grid">
      <!-- Botones de acciones -->
    </div>
  </div>
</div>
```

### 3. styles.css

Estilos CSS que mantienen consistencia visual con otros minijuegos.

Clases importantes:
- `.game-container`: Grid layout (3 columnas, 3 filas)
- `.panel`: Contenedor con fondo oscuro y bordes púrpuras
- `.character-sheet`, `.tactical-map`, `.enemy-panel`: Paneles principales
- `.combat-log`: Registro de combate (max-height: 300px)
- `.actions-panel`: Panel de acciones (grid layout)
- `.actions-grid`: Grid responsive para botones de acción
- `.action-btn`: Botones de acción con gradiente púrpura
- `.token`: Tokens en el mapa
- `.grid-overlay`: Overlay para movimiento y selección

### 4. game.js

Lógica del juego con las siguientes secciones:

#### Estado del Juego
```javascript
const gameState = {
  player: {
    hp, maxHp, baseAc, ac, movement, position,
    resources: { spellSlots, layOnHands, divineSense },
    status: [],
    hasAction, hasAdditionalAction, movementRemaining,
    isDodging, divinePunishmentActive,
    concentration, blessedTargets, shieldOfFaithActive
  },
  wolves: [
    { id, name, hp, maxHp, ac, movement, position, isAlpha, isDead, status }
  ],
  selectedWolf, turn, isPlayerTurn, movementEnabled,
  combatStats: { turnsUsed, damageDealt, damageTaken, wolvesDefeated }
};
```

#### Bancos Narrativos
```javascript
const narrativeBanks = {
  attack: ["Texto 1", "Texto 2"],
  damage: ["Texto 1", "Texto 2"],
  healing: ["Texto 1", "Texto 2"],
  wolfAttack: ["Texto 1", "Texto 2"],
  alphaHowl: ["Texto 1", "Texto 2"],
  victory: ["Texto 1", "Texto 2"],
  defeat: ["Texto 1", "Texto 2"]
};
```

#### Funciones de Utilidad
- `rollDice(sides)`: Lanza dados y devuelve resultado
- `calculateDistance(pos1, pos2)`: Calcula distancia entre posiciones
- `calculateGridDistance(pos1, pos2)`: Calcula distancia en grid
- `getRandomNarrative(category)`: Obtiene texto narrativo aleatorio
- `addLogEntry(text, type)`: Agrega entrada al registro de combate

#### Funciones de UI
- `updateUI()`: Actualiza toda la interfaz
- `updateTokenPositions()`: Actualiza posiciones de tokens
- `updateEnemyPanel()`: Actualiza panel del enemigo seleccionado
- `updateActionButtons()`: Actualiza estado de botones de acción
- `translateStatus(status)`: Traduce estados al español

#### Flujo del Juego
- `startGame()`: Inicializa el juego
- `endTurn()`: Finaliza turno del jugador
- `checkVictory()`: Verifica condición de victoria
- `checkDefeat()`: Verifica condición de derrota
- `restartGame()`: Reinicia el juego

#### Acciones del Jugador
- `swordAttack()`: Ataque con arma principal
- `throwJavelin()`: Ataque a distancia
- `dodgeAction()`: Esquiva (desventaja a ataques)
- `retreatAction()`: Retirada (evita ataques de oportunidad)
- `dashAction()`: Carrera (duplica movimiento)
- `healSpell()`: Hechizo de curación
- `buffSpell()`: Hechizo de mejora (con concentración)
- `layOnHands()`: Habilidad especial de curación
- `divineSense()`: Habilidad especial de detección
- `enableMovement()`: Habilita movimiento en el grid
- `moveTo(x, y)`: Mueve el jugador a posición específica

#### IA de Enemigos
- `wolfPackTurn()`: Turno de la manada de enemigos
- `decideWolfAction(wolf)`: Decide acción de lobo normal
- `decideAlphaAction(wolf)`: Decide acción de lobo alfa
- `wolfApproach(wolf, callback)`: Acercarse al jugador
- `wolfSurround(wolf, callback)`: Rodear al jugador
- `wolfBite(wolf, callback)`: Ataque de mordisco
- `alphaHowl(wolf, callback)`: Aullido del alfa
- `alphaWildCharge(wolf, callback)`: Carga salvaje del alfa

## Sistema de Concentración

Los hechizos que requieren concentración:
- Solo un hechizo de concentración activo a la vez
- Al lanzar un nuevo hechizo de concentración, se rompe el anterior
- La concentración persiste entre turnos
- Se muestra en la interfaz del jugador

```javascript
// En cada hechizo de concentración:
if (gameState.player.concentration) {
  addLogEntry("Rompes tu concentración anterior.", "normal");
}
gameState.player.concentration = 'nombreHechizo';
gameState.player.status.push("concentrating");
```

## Sistema de Ataques de Oportunidad

Los ataques de oportunidad se activan cuando:
- El jugador se aleja de un enemigo en melee (sin retirada)
- Un enemigo se aleja del jugador en melee

```javascript
// En moveTo():
const wasAdjacent = gameState.wolves.filter(w => !w.isDead && calculateDistance(gameState.player.position, w.position) <= 5);
// ... mover jugador ...
const nowAdjacent = gameState.wolves.filter(w => !w.isDead && calculateDistance(gameState.player.position, w.position) <= 5);
const separatedWolves = wasAdjacent.filter(w => !nowAdjacent.includes(w));

if (separatedWolves.length > 0 && !gameState.player.status.includes("disengaged")) {
  separatedWolves.forEach(wolf => {
    if (Math.random() < 0.5) {
      addLogEntry(`${wolf.name} intenta un ataque de oportunidad.`, "normal");
      wolfBite(wolf, () => {});
    }
  });
}
```

## Sistema de Imágenes

### Imágenes del Tablero
- Colocar en `images/` con nombre descriptivo
- Usar ruta relativa: `../../../images/nombre_archivo.ext`
- Incluir fallback SVG en caso de error

### Imágenes de Enemigos
- Colocar en `images/` con nombre descriptivo
- Mostrar en panel de enemigo cuando seleccionado
- Usar onerror para ocultar si no carga

```html
<!-- En index.html - mapa -->
<img src="../../../images/tablero_minijuego_lobos.png" alt="Tablero" 
     onerror="this.src='data:image/svg+xml,...'">

<!-- En index.html - tokens -->
<div id="wolf1-token" class="token wolf-token">
  <img src="../../../images/lobos_1-2-3.jpg" alt="Lobo 1" 
       onerror="this.style.display='none'; this.parentElement.textContent='L1'">
</div>

<!-- En index.html - panel de enemigo -->
<img id="enemy-image" src="" alt="" 
     onerror="this.style.display='none';">

// En game.js - updateEnemyPanel()
const enemyImage = document.getElementById("enemy-image");
if (wolf.isAlpha) {
  enemyImage.src = "../../../images/Lobo_Alfa.jpg";
} else {
  enemyImage.src = "../../../images/lobos_1-2-3.jpg";
}
enemyImage.style.display = "inline-block";
```

## Sistema de Recursos

### Espacios de Hechizo
- Nivel 1: 3 espacios (para Paladín nivel 4)
- Se consumen al lanzar hechizos
- Se muestran en el panel del personaje

### Imposición de Manos
- 20 puntos totales (para Paladín nivel 4)
- Se gastan para curar (1 punto = 1 PV)
- Se pueden gastar hasta 10 puntos por acción

### Sentido Divino
- 1 uso por descanso largo
- Detecta presencias sobrenaturales a 60 pies
- No consume acción

## Sistema de Estados

Estados del personaje:
- `concentrating`: Manteniendo concentración
- `disengaged`: Retirada activa (evita ataques de oportunidad)
- `dodging`: Esquivando (desventaja a ataques)
- `protected`: Protección activa

Estados de enemigos:
- `buffed`: Potenciado (por aullido del alfa)
- `frightened`: Asustado

## Actualizar index.json

Después de crear un minijuego, actualizar `content/minijuegos/index.json`:

```json
{
  "minijuegos": [
    {
      "id": "caza-alfa-gris",
      "title": "La Caza del Alfa Gris",
      "path": "caza-alfa-gris/",
      "metadata": "metadata.json"
    }
  ]
}
```

## Personalización

Para personalizar un minijuego existente, consulta el archivo `GUIA_PERSONALIZACION.md` en la carpeta del minijuego.

## Mejores Prácticas

1. **Consistencia Visual**: Mantener los mismos colores y estilos que otros minijuegos
2. **Mecánicas D&D**: Seguir las reglas de D&D 5e cuando sea posible
3. **Narrativa**: Usar textos narrativos variados para cada tipo de evento
4. **Feedback**: Mostrar claramente el resultado de cada acción en el registro
5. **Accesibilidad**: Incluir fallbacks para imágenes y colores con buen contraste
6. **Performance**: Minimizar cálculos innecesarios en el loop de renderizado
7. **Mantenibilidad**: Organizar el código en secciones claras con comentarios

## Ejemplo Completo

Para ver un ejemplo completo de implementación, consulta:
- `content/minijuegos/caza-alfa-gris/` - Minijuego de ejemplo
- `content/minijuegos/camara-combate-ecos-devorador/` - Otro ejemplo de referencia
