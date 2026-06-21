# Guía de Personalización - Cámara de Combate: La Catedral de las Cenizas

> **Nota**: Para crear un nuevo minijuego de combate táctico desde cero, consulta la guía completa en `docs/GUIA_CREACION_MINIJUEGOS_COMBATE.md`.

## Cambiar Imágenes
- **Mapa de la Catedral**: Editar `index.html` línea 132, cambiar `catedral_cenizas.jpg` por tu imagen
- **Retrato del Jefe**: Editar `index.html` línea 149, cambiar `obispo_ceniza.jpg` por tu imagen
- Rutas: `../../../images/tu-imagen.ext`

## Cambiar Estadísticas del Clérigo
- Editar `game.js` objeto `gameState.player` (líneas 8-35):
  - `hp`: Puntos de vida (actual: 61)
  - `maxHp`: Puntos de vida máximos (actual: 61)
  - `baseAc`: Clase de armadura base (actual: 18)
  - `ac`: Clase de armadura actual (actual: 18)
  - `movement`: Movimiento en metros (actual: 7.5)
  - `spellSlots`: Espacios de conjuro por nivel (actual: 4/3/3)
  - `channelDivinity`: Usos de Canalizar Divinidad (actual: 2)

## Modificar Hechizos del Jugador
- **HTML**: Editar botones en `index.html` (líneas 224-277)
- **JavaScript**: Editar funciones en `game.js`:
  - `cureWounds()`: Curar Heridas (Nivel 1)
  - `healingWord()`: Palabra Sanadora (Nivel 1)
  - `blessSpell()`: Bendecir (Nivel 1)
  - `spiritualWeapon()`: Arma Espiritual (Nivel 2)
  - `lesserRestoration()`: Restablecimiento Menor (Nivel 2)
  - `spiritGuardians()`: Espíritus Guardianes (Nivel 3)
  - `beaconOfHope()`: Faro de Esperanza (Nivel 3)

## Modificar Acciones del Jugador
- **HTML**: Editar botones en `index.html` (líneas 224-247)
- **JavaScript**: Editar funciones en `game.js`:
  - `maceAttack()`: Ataque con Maza
  - `symbolThrow()`: Lanzar Símbolo Consagrado
  - `dodgeAction()`: Esquivar
  - `dashAction()`: Carrera
  - `disengageAction()`: Retirada

## Modificar Acciones Adicionales
- **HTML**: Editar botones en `index.html` (líneas 251-265)
- **JavaScript**: Editar funciones en `game.js`:
  - `defensivePrayer()`: Oración Defensiva

## Modificar Canalizar Divinidad
- **HTML**: Editar botones en `index.html` (líneas 267-277)
- **JavaScript**: Editar funciones en `game.js`:
  - `preserveLife()`: Preservar la Vida
  - `sacredFlame()`: Destello Sagrado

## Cambiar Estadísticas del Jefe
- Editar `game.js` objeto `gameState.boss` (líneas 37-68):
  - `hp`: Puntos de vida (actual: 145)
  - `maxHp`: Puntos de vida máximos (actual: 145)
  - `baseAc`: Clase de armadura base (actual: 17)
  - `ac`: Clase de armadura actual (actual: 17)
  - `movement`: Movimiento en metros (actual: 9)
  - `phase2Threshold`: HP para entrar en fase 2 (actual: 58, 40% de 145)

## Modificar IA del Jefe
- Editar `decideBossAction()` en `game.js` (líneas 847-903)
- Ajustar pesos (`weight`) de cada acción
- Modificar prioridades según fase del jefe
- Acciones Fase 1: maceOfEmbers, purifyingFlame, ashExplosion, chainOfPenance, judgmentOfHeretic
- Acciones Fase 2: emberStorm, sacredColumns, ashBreath, martyrWrath

## Modificar Habilidades del Jefe
- Editar `executeBossAction()` en `game.js` (líneas 905-1023)
- Modificar daño y efectos de cada habilidad
- Ajustar cooldowns en `gameState.boss.abilities`

## Ajustar Cuadrícula
- **Tamaño**: Editar `generateGrid()` en `game.js` (actualmente 10x10)
- **Coordenadas**: Modificar array `letters` en `generateGrid()`
- **Celdas por metro**: Cambiar cálculo en `calculateDistance()` (actualmente 1.5 metros/celda)

## Cambiar Narrativas
- Editar `narrativeBanks` en `game.js` (líneas 70-319)
- Categorías: gameStart, bossEntrance, playerAttack, playerHeal, playerSpell, channelDivinity, bossAttack, bossPhase2, critical, victory, defeat, statusBurned, statusBlessed, bossDialogue
- Mínimo 20 textos por categoría

## Modificar Sistema de Estados
- Estados disponibles: burned, blessed, inspired, weakened, stunned, frightened, consecrated, concentrating, dodging, disengaged
- Editar `translateStatus()` en `game.js` para añadir traducciones
- Modificar efectos de estados en las funciones de combate correspondientes

## Modificar Sistema de Concentración
- Hechizos con concentración: Bless, Spirit Guardians, Beacon of Hope
- Solo un hechizo de concentración activo a la vez
- Editar funciones de hechizo para romper concentración anterior

## Ajustar Posiciones Iniciales
- Editar `gameState` en `game.js`:
  - `player.position`: Posición inicial del jugador (línea 12)
  - `boss.position`: Posición inicial del jefe (línea 44)

## Ajustar Estilos
- Editar `styles.css` para cambiar colores, tamaños, efectos
- Variables principales: colores en `:root`, `.token`, `.action-btn`, `.log-entry`
- Tokens: `.player-token`, `.boss-token`
- Paleta actual: Negro carbón, gris ceniza, dorado antiguo, blanco roto, naranja oscuro, rojo apagado

## Modificar Condiciones de Victoria/Derrota
- **Victoria**: Editar `checkVictory()` en `game.js` (líneas 1077-1089)
- **Derrota**: Editar `checkDefeat()` en `game.js` (líneas 1091-1103)

## Crear Nuevos Jefes con Múltiples Fases
Este sistema está diseñado para ser reutilizable:
1. Copiar la estructura de `gameState.boss` y sus habilidades
2. Adaptar la IA en `decideBossAction()` y `executeBossAction()`
3. Modificar las habilidades según el nuevo jefe
4. Ajustar las narrativas en `narrativeBanks`
5. Personalizar los estilos en `styles.css` si es necesario
6. Ajustar el umbral de fase 2 en `phase2Threshold`

## Modificar Sistema de Espacios de Conjuro
- Editar `gameState.player.spellSlots` para cambiar cantidad por nivel
- Modificar `updateSpellSlots()` para reflejar cambios en UI
- Ajustar verificaciones en funciones de hechizo

## Ajustar Consola de Combate
- Editar `.combat-log` en `styles.css` (líneas 404-441)
- `max-height`: Altura máxima (actual: 400px)
- `.log-entry`: Tamaño de fuente (actual: 1.1em)
- Auto-scroll está activado por defecto en `addLogEntry()`

## Personalizar Transición de Fase
- Editar `checkBossPhaseTransition()` en `game.js` (líneas 1025-1031)
- Ajustar porcentaje de HP para activar fase 2
- Modificar narrativa de transición en `narrativeBanks.bossPhase2`

## Ajustar Daño de Estados
- Editar daño por estado Quemado en `endTurn()` (líneas 1049-1054)
- Modificar efectos de otros estados en funciones correspondientes

## Mejores Prácticas
1. **Consistencia Visual**: Mantener los mismos colores y estilos de catedral en cenizas
2. **Mecánicas D&D**: Seguir las reglas de D&D 5e cuando sea posible
3. **Narrativa**: Usar textos narrativos variados (mínimo 20 por categoría)
4. **Feedback**: Mostrar claramente el resultado de cada acción en el registro
5. **Accesibilidad**: Incluir fallbacks para imágenes y colores con buen contraste
6. **Performance**: Minimizar cálculos innecesarios en el loop de renderizado
7. **Mantenibilidad**: Organizar el código en secciones claras con comentarios
