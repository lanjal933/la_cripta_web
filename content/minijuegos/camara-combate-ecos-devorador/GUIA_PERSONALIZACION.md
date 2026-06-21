# Guía de Personalización - Cámara de Combate

> **Nota**: Para crear un nuevo minijuego de combate táctico desde cero, consulta la guía completa en `docs/GUIA_CREACION_MINIJUEGOS_COMBATE.md`.

## Cambiar Imágenes
- **Enemigo**: Editar `index.html` línea 107, cambiar `azotamentes.jpg` por tu imagen
- **Tablero**: Editar `index.html` línea 93, cambiar `tablero_devorador_minijuego.jpg` por tu imagen
- Rutas: `../../../images/tu-imagen.jpg`

## Cambiar Nombre del Enemigo
- Editar `index.html` línea 109: cambiar `Azotamentes` por tu nombre
- Editar `game.js`: buscar `"Azotamentes"` y reemplazar

## Cambiar Estadísticas del Enemigo
- Editar `game.js` función `startGame()`:
  - `hp`: Puntos de vida
  - `ac`: Clase de armadura
  - `movement`: Movimiento en pies

## Modificar Acciones del Jugador
- **HTML**: Editar botones en `index.html` (líneas 120-180)
- **JavaScript**: Editar funciones en `game.js`:
  - `swordAttack()`: Ataque cuerpo a cuerpo
  - `crossbowShot()`: Ataque a distancia
  - `pushAttack()`: Empujón
  - `knockdownAttack()`: Derribar
  - `precisionAttack()`: Ataque de precisión
  - `sweepingAttack()`: Barrido
  - `threateningAttack()`: Ataque amenazante
  - `secondWind()`: Aliento segundo
  - `suddenAction()`: Acción súbita

## Cambiar Terminología
- **Acciones adicionales**: Buscar `hasAdditionalAction` en `game.js`
- **Movimiento**: Buscar `movementRemaining` y cambiar valor base (30 pies)
- **Dados**: Modificar `rollDice()` para cambiar número de caras

## Ajustar Cuadrilla
- **Tamaño**: Editar `generateGrid()` en `game.js` (actualmente 10x10)
- **Coordenadas**: Modificar array `letters` en `generateGrid()`
- **Celdas por pie**: Cambiar cálculo en `calculateGridDistance()` (actualmente 5 pies/celda)

## Cambiar Narrativas
- Editar `narratives` en `game.js` para cambiar textos de combate
- Categorías: `gameStart`, `attackSuccess`, `attackFail`, `criticalHit`, `damageReceived`, `skillUse`, `mindControl`

## Modificar IA del Enemigo
- Editar `decideEnemyAction()` en `game.js`
- Ajustar pesos (`weight`) de cada acción
- Modificar umbrales de distancia y HP

## Ajustar Estilos
- Editar `styles.css` para cambiar colores, tamaños, efectos
- Variables principales: colores en `:root`, `.token`, `.action-btn`, `.log-entry`
