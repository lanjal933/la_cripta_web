# Guía de Personalización - La Caza del Alfa Gris

> **Nota**: Para crear un nuevo minijuego de combate táctico desde cero, consulta la guía completa en `docs/GUIA_CREACION_MINIJUEGOS_COMBATE.md`.

## Cambiar Imágenes
- **Mapa del Bosque**: Editar `index.html` línea 70, cambiar `tablero_minijuego_lobos.png` por tu imagen
- **Lobos**: Editar `index.html` líneas 74-84, cambiar rutas de imágenes de lobos
- **Lobo Alfa**: Editar `index.html` línea 83, cambiar `Lobo_Alfa.jpg` por tu imagen
- Rutas: `../../../images/tu-imagen.ext`

## Cambiar Estadísticas del Paladín
- Editar `game.js` función de inicialización:
  - `hp`: Puntos de vida (actual: 42)
  - `ac`: Clase de armadura (actual: 18)
  - `movement`: Movimiento en pies (actual: 30)
  - `spellSlots`: Espacios de hechizo (actual: 3)
  - `layOnHands`: Puntos de Imposición de Manos (actual: 20)
  - `divineSense`: Usos de Sentido Divino (actual: 1)

## Modificar Acciones del Jugador
- **HTML**: Editar botones en `index.html` (líneas 88-130)
- **JavaScript**: Editar funciones en `game.js`:
  - `swordAttack()`: Ataque con espada
  - `throwJavelin()`: Lanzamiento de jabalina
  - `dodgeAction()`: Esquivar
  - `retreatAction()`: Retirada
  - `dashAction()`: Carrera
  - `divineAid()`: Ayuda Divina
  - `shieldPush()`: Empujón con escudo
  - `opportunityAttack()`: Ataque de oportunidad
  - `protectionAction()`: Protección

## Cambiar Estadísticas de los Lobos
- Editar `game.js` array `gameState.wolves`:
  - `hp`: Puntos de vida
  - `ac`: Clase de armadura
  - `movement`: Movimiento en metros
  - `isAlpha`: true para el lobo alfa

## Modificar IA de los Lobos
- **Lobos Normales**: Editar `decideWolfAction()` en `game.js`
  - Ajustar pesos (`weight`) de cada acción
  - Modificar prioridades según el ID del lobo (wolf1, wolf2, wolf3)
- **Lobo Alfa**: Editar `decideAlphaAction()` en `game.js`
  - Ajustar pesos de acciones especiales
  - Modificar umbrales de HP para Furia Desesperada

## Acciones de los Lobos
- **Lobos Normales**:
  - `bite`: Mordisco básico
  - `harass`: Acosar
  - `approach`: Acercarse
  - `surround`: Rodear
  - `retreat`: Retirada instintiva
- **Lobo Alfa**:
  - `brutalBite`: Mordisco brutal
  - `howl`: Aullido del Alfa
  - `wildCharge`: Carga salvaje
  - `fury`: Furia desesperada

## Ajustar Cuadrilla
- **Tamaño**: Editar `generateGrid()` en `game.js` (actualmente 10x10)
- **Coordenadas**: Modificar array `letters` en `generateGrid()`
- **Celdas por pie**: Cambiar cálculo en `calculateDistance()` (actualmente 5 pies/celda)

## Cambiar Narrativas
- Editar `narrativeBanks` en `game.js` para cambiar textos de combate
- Categorías: `gameStart`, `playerTurn`, `enemyTurn`, `bite`, `criticalHit`, `healing`, `divinePunishment`, `alphaHowl`, `victory`, `defeat`
- Mínimo 5 textos por categoría

## Modificar Iniciativa
- Editar `startGame()` en `game.js`
  - Modificar bonus de iniciativa del jugador (actual: +3)
  - Modificar bonus de iniciativa de los lobos (actual: +2)

## Ajustar Posiciones Iniciales
- Editar `gameState` en `game.js`:
  - `player.position`: Posición inicial del paladín
  - `wolves[].position`: Posición inicial de cada lobo

## Ajustar Estilos
- Editar `styles.css` para cambiar colores, tamaños, efectos
- Variables principales: colores en `:root`, `.token`, `.action-btn-small`, `.log-entry`
- Tokens: `.player-token`, `.wolf-token`, `.alpha-token`

## Modificar Condiciones de Victoria/Derrota
- **Victoria**: Editar `checkVictory()` en `game.js`
- **Derrota**: Editar `checkDefeat()` en `game.js`

## Agregar Nuevos Lobos
- Editar array `gameState.wolves` en `game.js`
- Agregar nuevo objeto con estructura:
  ```javascript
  {
      id: 'wolf4',
      name: 'Lobo 4',
      hp: 11,
      maxHp: 11,
      ac: 13,
      movement: 12,
      position: { x: 3, y: 7 },
      status: [],
      isAlpha: false,
      isDead: false
  }
  ```
- Agregar token correspondiente en `index.html`

## Cambiar Orden de Turno de los Lobos
- Editar `wolfPackTurn()` en `game.js`
- Los lobos actúan en orden del array `gameState.wolves`
