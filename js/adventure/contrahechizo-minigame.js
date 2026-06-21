const CONTRAHECHIZO_MINIGAME = {
    id: 'contrahechizo_minijuego',
    title: 'CONTRÂHECHIZÖ',
    description: 'Reglamento visual y elegante para un deporte magico de reaccion, precision y caos arcano. Dos equipos, una esfera encantada y reglas listas para jugar sin DM.',
    category: 'Minijuego D&D',
    tags: ['minijuego', 'deporte', 'arcano', 'reaccion', 'equipo', 'reglas'],
    type: 'minigame',
    coverImage: '../images/portada_minijueg_contrahechizo.png',
    nodes: [
        {
            id: 'intro',
            title: 'Bienvenida al Caos Arcano',
            narrative: `# CONTRÂHECHIZÖ
### El deporte magico de reaccion, precision y caos arcano

*"Dos equipos. Una esfera de magia. Cero piedad."*

---

## ¿Que es CONTRÂHECHIZÖ?
**Tipo:** Minijuego repetible  
**Requiere:** 4 a 6 jugadores recomendados  
**DM:** No requiere  
**Precio:** Gratis

Contrâhechizö es un deporte magico jugado entre dos equipos usando **Varitas de Contrahechizo**.

No hace falta ser lanzador de conjuros para participar. Las varitas estan encantadas especificamente para interactuar con una esfera magica usada como pelota de juego.

## Objetivo
**Lograr que el hechizo toque el suelo dentro del campo enemigo**... aunque a veces tambien choque a un oponente.

## Estilo de partida
- Rapido
- Repetible
- Ideal para mesa o grid
- Caotico, tactico y muy rolero si quieren narrarlo con energia`,
            choices: [
                { text: 'Ver equipos y campo de juego', target: 'teams_field' },
                { text: 'Ir directo a turnos y acciones', target: 'turns_actions' }
            ]
        },
        {
            id: 'teams_field',
            title: 'Equipos, Vidas y Cancha',
            narrative: `# Equipos
- **2 equipos**
- Recomendado: entre **2 y 4 jugadores por equipo**
- Cada jugador posee:
- **1 Varita de Contrahechizo**
- **3 vidas**

Cuando un jugador pierde sus 3 vidas:
- Queda eliminado
- No puede volver a entrar hasta finalizar el partido

---

# Campo de Juego
Cada casilla representa:
- **5 pies**

La cancha esta dividida por una **barrera magica central**.

## Tamaño recomendado
- **9 casillas de ancho**
- **12 casillas de largo por lado**

La pelota siempre ocupa:
- **1 casilla horizontal**
- Una altura determinada sobre el suelo

## La pelota
La pelota es un **hechizo estabilizado**. Puede adoptar cualquier apariencia:
- Bola de fuego
- Esfera de agua
- Craneo espectral
- Relampago comprimido
- Orbe sombrio

La apariencia **no modifica las reglas**.`,
            choices: [
                { text: 'Seguir a sistema de turnos', target: 'turns_actions' },
                { text: 'Leer la cancha y la altura de la pelota', target: 'height_court' }
            ]
        },
        {
            id: 'turns_actions',
            title: 'Turnos, Movimiento y Economia',
            narrative: `# Sistema de Turnos
No existen iniciativas.

El control del turno depende de **que lado de la cancha va a ocupar la pelota**.

## Funcionamiento
1. Un equipo tiene el control porque la pelota esta en su campo.
2. Los jugadores de ese equipo actuan.
3. Si una accion hace que la pelota cruce la red y entre al campo rival:
   - El turno termina inmediatamente
   - El equipo rival obtiene el control
4. Los jugadores del nuevo equipo pueden actuar

Todos los integrantes de un mismo equipo **comparten el turno** y pueden actuar en cualquier orden.

---

# Movimiento
Cada jugador dispone de **1 casilla de movimiento (5 pies) por turno**.

Puede usarla:
- Antes de actuar
- Despues de actuar
- Entre acciones

---

# Economia de Acciones
Cada jugador dispone de **4 acciones por turno**.

Las acciones base son:
- **Contrahechizo**
- **Golpe de Varita**
- **Preparar**
- **Reinvocar**`,
            choices: [
                { text: 'Ver altura de la pelota y cancha', target: 'height_court' },
                { text: 'Leer Contrahechizo', target: 'counterspell_action' }
            ]
        },
        {
            id: 'height_court',
            title: 'Altura y Disposicion de la Cancha',
            narrative: `# Altura de la Pelota
La pelota mantiene su altura durante toda su trayectoria.

Cuando faltan exactamente **10 pies** para llegar a su destino:
**desciende automaticamente 5 pies**.

## Ejemplo
- La pelota es enviada a **15 pies de altura**
- Recorre casi toda su trayectoria a 15 pies
- Al entrar en los ultimos 10 pies:
  - Baja a **10 pies**
- Finaliza su movimiento

---

# Cancha sugerida
Esta es una cancha que pueden usar para su partida de Contrâhechizö. Si quieren, tambien pueden reemplazarla por una personalizada.

![Cancha de Contrahechizo](../images/cancha_contrahechizo.jpg)

## Regla extra de la red
La red mide **5 pies**.

Si por algun motivo la pelota va recta hacia la red:
- Es **punto para el equipo contrario** al que tiro la pelota`,
            choices: [
                { text: 'Pasar a Contrahechizo', target: 'counterspell_action' },
                { text: 'Volver a turnos y acciones', target: 'turns_actions' }
            ]
        },
        {
            id: 'counterspell_action',
            title: 'Accion: Contrahechizo',
            narrative: `# ACCION: CONTRAHECHIZO
**Uso ilimitado**

La varita dispara energia para empujar la pelota.

## Alcance
Puede usarse desde cualquier lugar de la cancha.

Sin embargo:
**por cada 15 pies de distancia entre el jugador y la pelota: -2 al resultado**

### Ejemplos
- 25 pies -> **-2**
- 35 pies -> **-4**
- 45 pies -> **-6**

Si estas a **5 pies de la pelota**, recibis un **-3**.  
Si estas a **10 pies (2 casillas)**, no tenes ese penalizador.

## Bloqueo por otro jugador
No puede usarse si otro jugador esta **exactamente entre el lanzador y la pelota**.

Los aliados tambien bloquean.

## Tirada
### Modo Simple
**1d20**

### Modo Profesional
**1d20 + modificador de Sabiduria**

## Resultado
### 1-5
**Fallo:** la pelota sigue igual.

### 6-10
**Impacto debil:** avanza 15 pies.  
Despues tira **1d6**:
- 1-2 -> una casilla a la izquierda
- 3-4 -> recto
- 5-6 -> una casilla a la derecha

### 11-19
**Impacto normal:** avanza 20 pies.  
Despues tira **1d6** con la misma tabla.

### 20
**Impacto perfecto:** avanza 25 pies y el jugador elige:
- Izquierda
- Derecha
- Recto

## Contrahechizos Encadenados
Varios jugadores pueden afectar la misma pelota durante el mismo turno.

Cada intento adicional recibe:
**-1 acumulativo**

Ejemplo:
- Primer intento: sin penalizador
- Segundo intento: -1
- Tercer intento: -2
- Cuarto intento: -3`,
            choices: [
                { text: 'Ver Golpe de Varita', target: 'wand_hit_action' },
                { text: 'Ir a Preparar y Reinvocar', target: 'prepare_reinvoke' }
            ]
        },
        {
            id: 'wand_hit_action',
            title: 'Accion: Golpe de Varita',
            narrative: `# ACCION: GOLPE DE VARITA
El jugador rodea la varita con un campo de fuerza temporal y golpea directamente la pelota.

## Requisito
Estar a **5 pies o menos** de la pelota.

## Tirada
### Modo Simple
**1d20**

### Modo Profesional
**1d20 + modificador de Destreza**

## Resultado
### 1-3
**Fallo:** la pelota cae.  
**Punto para el equipo rival**

### 4-10
**Golpe debil:** la pelota avanza 10 pies

### 11-15
**Golpe normal:** la pelota avanza 15 pies

### 16-19
**Golpe fuerte:** la pelota avanza 20 pies

### 20
**Golpe muy fuerte:** la pelota avanza 20 pies y el jugador decide:
- Izquierda
- Derecha
- Recto`,
            choices: [
                { text: 'Ver Preparar y Reinvocar', target: 'prepare_reinvoke' },
                { text: 'Ir a acciones especiales e impactos', target: 'special_impacts' }
            ]
        },
        {
            id: 'prepare_reinvoke',
            title: 'Preparar y Reinvocar',
            narrative: `# ACCION: PREPARAR
El jugador pronuncia:
**"Levitar"**
y fuerza a la pelota a ganar altura.

Te podes encontrar **maximo a 10 pies** de la pelota.

## Tirada
### Modo Simple
**1d20**

### Modo Profesional
**1d20 + modificador de Inteligencia**

## Resultado
### 1-5
**Fallo:** la pelota cae inmediatamente

### 6-19
**Exito:** la pelota gana 10 pies de altura

### 20
**Exito critico:** la pelota gana 15 pies de altura

---

# ACCION: REINVOCAR
El jugador reorganiza la estructura magica de la pelota.

## Usos
**1 uso**

Recupera el uso tras **2 rondas completas**

## Requisito
Estar a **10 pies o menos** de la pelota

## Procedimiento
El jugador declara:
- Casilla objetivo
- Altura objetivo

La altura minima es de **10 pies**

## Tirada
**1d100**

### 1
**Fallo:** la accion se pierde

### 2-49
**Interferencia magica:** la pelota aparece en la posicion opuesta del campo respecto al lugar indicado

### 50-99
**Exito:** la pelota aparece exactamente donde fue declarada

### 100
**Exito critico:** aparece:
- En el lugar indicado
- **5 pies mas baja** de lo declarado`,
            choices: [
                { text: 'Ver acciones especiales e impactos', target: 'special_impacts' },
                { text: 'Saltar a puntuacion y victoria', target: 'scoring_modes' }
            ]
        },
        {
            id: 'special_impacts',
            title: 'Acciones Especiales e Impactos',
            narrative: `# Acciones Especiales
**Cuentan como acciones comunes**

## Tirarse
Podes tirarte al suelo gastando **de 5 a 10 pies**.

Esto hace que puedas golpear una pelota que este a **5 pies del suelo**.

Levantarte cuesta:
- **1 accion**
- **5 pies de movimiento**

Estar derribado hace que todas tus acciones somaticas peguen con **desventaja**.  
**Reinvocar** no se ve afectada.

## Escudo Humano
Podes usar tu cuerpo como escudo para evitar que una pelota toque tu area.

- Salvas con **ventaja**
- Podes combinarlo con **Tirarse**
- Si lo combinas con Tirarse, la salvacion pasa a ser **normal** en Constitucion

---

# Impactos Contra Jugadores
Si la pelota atraviesa una casilla ocupada por un jugador y este no logra detenerla:
debe hacer una **tirada de resistencia**

## Modo Simple
**1d20**

## Modo Profesional
**1d20 + modificador de Constitucion**

## Resultado
### 1-10
Pierde **1 vida**

### 11-20
**Resiste** el impacto`,
            choices: [
                { text: 'Ver puntuacion, victoria y modos', target: 'scoring_modes' },
                { text: 'Leer posiciones oficiales', target: 'positions' }
            ]
        },
        {
            id: 'scoring_modes',
            title: 'Puntuacion, Victoria y Modos',
            narrative: `# Puntuacion
Un equipo obtiene **1 punto** cuando:
- La pelota toca el suelo en el campo enemigo
- La pelota sale fuera de los limites por una accion rival
- Un rival falla una accion y provoca que la pelota caiga

---

# Victoria
## Partido Rapido
**5 puntos**

## Partido Estandar
**10 puntos**

## Partido de Campeonato
**15 puntos**

---

# Modos de Juego
## Modo Simple
No requiere personajes de D&D.

Todas las tiradas se realizan **sin modificadores**.

## Modo Profesional
Se juega usando personajes de D&D.

Se agregan modificadores de caracteristica:
- Contrahechizo -> **Sabiduria**
- Golpe de Varita -> **Destreza**
- Preparar -> **Inteligencia**
- Reinvocar -> **Inteligencia**
- Resistir Impactos -> **Constitucion**`,
            choices: [
                { text: 'Ver posiciones oficiales', target: 'positions' },
                { text: 'Volver al inicio del reglamento', target: 'intro' }
            ]
        },
        {
            id: 'positions',
            title: 'Posiciones Oficiales',
            narrative: `# Posiciones Oficiales
*Variante opcional*

Cada jugador puede elegir una especializacion.

---

## INTERCEPTOR
*"Si la ves venir, ya es tarde."*

Especialista en cobertura y defensa.

### Pasiva: Paso Relampago
Una vez por turno puede moverse **5 pies hacia la pelota**.

No consume movimiento.

### Habilidad: Intercepcion Imposible
**1 vez cada 2 rondas**

Puede realizar **Golpe de Varita** a una distancia de hasta **10 pies**.

---

## DISTORSIONADOR
*"Nadie sabe donde caera."*

Especialista en trayectorias impredecibles.

### Pasiva: Efecto Curvo
Cuando modifica la direccion de la pelota puede volver a tirar el dado de direccion.

Debe aceptar el nuevo resultado.

### Habilidad: Giro Arcano
**1 vez por ronda**

Despues de impactar la pelota puede desplazar su destino **una casilla adicional** a izquierda o derecha.

---

## INVOCADOR
*"El caos tambien es una estrategia."*

Especialista en **Reinvocar**.

### Pasiva: Memoria Arcana
Al usar Reinvocar:
los resultados entre **2 y 19** pasan a contar como exito normal.

### Habilidad: Reinvocacion Forzada
**1 vez por partido**

Puede ignorar completamente la tirada de Reinvocar.

La pelota aparece exactamente donde fue declarada.`,
            choices: [
                { text: 'Volver a puntuacion y modos', target: 'scoring_modes' },
                { text: 'Terminar y volver al inicio', target: 'intro' }
            ]
        }
    ],
    startNodeId: 'intro',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

function loadContrahechizoMinigame() {
    try {
        const adventures = JSON.parse(localStorage.getItem(ADVENTURES_STORAGE_KEY) || '[]');
        const existingIndex = adventures.findIndex(a => a.id === CONTRAHECHIZO_MINIGAME.id);
        if (existingIndex > -1) {
            adventures[existingIndex] = CONTRAHECHIZO_MINIGAME;
        } else {
            adventures.push(CONTRAHECHIZO_MINIGAME);
        }
        localStorage.setItem(ADVENTURES_STORAGE_KEY, JSON.stringify(adventures));
        return CONTRAHECHIZO_MINIGAME;
    } catch (error) {
        return null;
    }
}

if (typeof window !== 'undefined') {
    window.loadContrahechizoMinigame = loadContrahechizoMinigame;
    document.addEventListener('DOMContentLoaded', function() {
        loadContrahechizoMinigame();
    });
}
