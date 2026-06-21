# Guía de Personalización - Cámara de Combate: El Trono Malefico

> **Nota**: Para crear un nuevo minijuego de combate táctico desde cero, consulta la guía completa en `docs/GUIA_CREACION_MINIJUEGOS_COMBATE.md`.

## Cambiar Imágenes
- **Mapa del Salón del Trono**: Editar `index.html` línea 93, cambiar `trono_carmesi.jpg` por tu imagen
- Rutas: `../../../images/tu-imagen.ext`

## Cambiar Estadísticas del Cazador de Sangre
- Editar `game.js` función de inicialización (líneas 2-24):
  - `hp`: Puntos de vida (actual: 62)
  - `ac`: Clase de armadura (actual: 17)
  - `movement`: Movimiento en pies (actual: 30)
  - `bloodCurses`: Maldiciones de Sangre (actual: 3)
  - `bloodAmplifications`: Amplificaciones (actual: 2)

## Modificar Acciones del Jugador
- **HTML**: Editar botones en `index.html` (líneas 152-197)
- **JavaScript**: Editar funciones en `game.js`:
  - `swordAttack()`: Ataque con Espada Bastarda
  - `crossbowShot()`: Disparo de Ballesta
  - `bloodCurse()`: Maldición de Sangre
  - `dodgeAction()`: Esquivar
  - `retreatAction()`: Retirada
  - `dashAction()`: Carrera
  - `bloodAmplification()`: Amplificación Carmesí
  - `changeTarget()`: Cambio de Objetivo
  - `hunterPreparation()`: Preparación de Cazador
  - `opportunityAttack()`: Ataque de Oportunidad
  - `instinctiveCounter()`: Contraataque Instintivo

## Cambiar Estadísticas de Thir
- Editar `game.js` objeto `gameState.thir` (líneas 25-32):
  - `hp`: Puntos de vida (actual: 120)
  - `ac`: Clase de armadura (actual: 16)
  - `movement`: Movimiento en metros (actual: 35)
  - `crimsonRainCooldown`: Cooldown de Lluvia Carmesí

## Modificar IA de Thir
- Editar `decideThirAction()` en `game.js` (líneas 747-785)
- Ajustar pesos (`weight`) de cada acción
- Modificar prioridades según HP del jugador y distancia
- Acciones disponibles: summon, charm, bite, teleport, crimsonRain, claws, move

## Modificar Invocaciones
- Editar `thirSummon()` en `game.js` (líneas 787-825)
- Tipos de invocaciones disponibles:
  - Murciélago Vampírico (HP 15, CA 12)
  - Siervo Nocturno (HP 25, CA 14)
  - Sombra Hambrienta (HP 20, CA 13)
- Modificar `maxSummons` en `gameState` (línea 34) para cambiar límite

## Ajustar Cuadrilla
- **Tamaño**: Editar `generateGrid()` en `game.js` (actualmente 10x10)
- **Coordenadas**: Modificar array `letters` en `generateGrid()`
- **Celdas por pie**: Cambiar cálculo en `calculateDistance()` (actualmente 5 pies/celda)

## Cambiar Narrativas
- Editar `narrativeBanks` en `game.js` (líneas 38-237)
- Categorías: gameStart, thirEntrance, summon, playerAttack, thirAttack, bite, charm, teleport, bleeding, critical, victory, defeat
- Mínimo 20 textos por categoría

## Modificar Iniciativa
- Editar `startGame()` en `game.js` (líneas 447-463)
- Modificar bonus de iniciativa del jugador (actual: +3)
- Modificar bonus de iniciativa de Thir (actual: +4)

## Ajustar Posiciones Iniciales
- Editar `gameState` en `game.js`:
  - `player.position`: Posición inicial del jugador (línea 9)
  - `thir.position`: Posición inicial de Thir (línea 27)

## Ajustar Estilos
- Editar `styles.css` para cambiar colores, tamaños, efectos
- Variables principales: colores en `:root`, `.token`, `.action-btn`, `.log-entry`
- Tokens: `.player-token`, `.thir-token`, `.summon-token`
- Paleta actual: Negro, gris oscuro, rojo profundo, carmesí, púrpura oscuro

## Modificar Condiciones de Victoria/Derrota
- **Victoria**: Editar `checkVictory()` en `game.js` (líneas 1027-1041)
- **Derrota**: Editar `checkDefeat()` en `game.js` (líneas 1043-1057)

## Agregar Nuevas Invocaciones
- Editar array `summonTypes` en `thirSummon()` en `game.js`
- Agregar nuevo objeto con estructura:
  ```javascript
  {
      name: "Nombre de la Invocación",
      hp: 20,
      maxHp: 20,
      ac: 13,
      damage: "1d6+2"
  }
  ```

## Modificar Sistema de Estados
- Estados disponibles: dodging, charmed, frightened, bleeding, weakened, cursed, hidden, poisoned, disengaged
- Editar `translateStatus()` en `game.js` para añadir traducciones
- Modificar efectos de estados en las funciones de combate correspondientes

## Personalizar Habilidades de Thir
- Editar funciones de Thir en `game.js`:
  - `thirSummon()`: Invocación de criaturas
  - `thirCharm()`: Encanto Vampírico
  - `thirBite()`: Mordida Vampírica
  - `thirTeleport()`: Paso Sombrío
  - `thirCrimsonRain()`: Lluvia Carmesí
  - `thirClaws()`: Garras Sangrientas
  - `thirMove()`: Movimiento

## Ajustar Consola de Combate
- Editar `.combat-log` en `styles.css` (líneas 323-358)
- `max-height`: Altura máxima (actual: 400px)
- `.log-entry`: Tamaño de fuente (actual: 1.1em)
- Auto-scroll está activado por defecto en `addLogEntry()`

## Crear Nuevos Jefes con Invocaciones
Este sistema está diseñado para ser reutilizable:
1. Copiar la estructura de `gameState.thir` y `gameState.summons`
2. Adaptar la IA en `decideThirAction()` y `executeThirAction()`
3. Modificar las habilidades según el nuevo jefe
4. Ajustar las narrativas en `narrativeBanks`
5. Personalizar los estilos en `styles.css` si es necesario

## Mejores Prácticas
1. **Consistencia Visual**: Mantener los mismos colores y estilos góticos
2. **Mecánicas D&D**: Seguir las reglas de D&D 5e cuando sea posible
3. **Narrativa**: Usar textos narrativos variados (mínimo 20 por categoría)
4. **Feedback**: Mostrar claramente el resultado de cada acción en el registro
5. **Accesibilidad**: Incluir fallbacks para imágenes y colores con buen contraste
6. **Performance**: Minimizar cálculos innecesarios en el loop de renderizado
7. **Mantenibilidad**: Organizar el código en secciones claras con comentarios
