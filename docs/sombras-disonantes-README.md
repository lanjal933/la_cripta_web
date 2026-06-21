# SOMBRAS DISONANTES - Cámara de Combate Individual

Una aventura de combate táctico completamente funcional para un solo jugador, implementada con HTML, CSS y JavaScript puro.

## 📋 Descripción

SOMBRAS DISONANTES es una cámara de combate donde el jugador controla un Guerrero Arcano Nivel 7 y debe derrotar al Fragmento de Sombra, una entidad con 3 fases de combate y IA estratégica.

## 🎯 Características

### Sistema de Combate
- **Turnos por rondas**: Sistema de turnos claro con indicadores visuales
- **Acciones infinitas**: Ataque melee, ataque a distancia, esquivar, retirada, preparar acción
- **Recursos consumibles**: Segundo Aliento, Acción Adicional
- **Sistema de conjuros**: 6 conjuros con espacios de conjuro por nivel
- **Dados integrados**: d4, d6, d8, d10, d12, d20, d100 con historial de tiradas

### Enemigo
- **3 fases de combate**: Forma Estable (100-60%), Forma Inestable (59-25%), Forma Crítica (24-0%)
- **5 habilidades únicas**: Zarpazo Umbrío, Lanza de Oscuridad, Explosión Sombría, Invocar Eco Sombrío, Deslizamiento Umbral
- **IA estratégica**: Sistema de prioridades que adapta el comportamiento según el estado del combate
- **Ecos sombríos**: Invocaciones menores que generan presión adicional

### Interfaz
- **Tema oscuro elegante**: Paleta de negro, gris oscuro, blanco roto y rojo tenue
- **Totalmente responsive**: Funciona en móvil y escritorio
- **Animaciones fluidas**: Transiciones suaves y efectos visuales
- **Log de combate narrativo**: Registro completo de eventos en formato de historia

## 📁 Estructura de Archivos

```
Minijuegos/
└── minijuegos-solitario/
    └── sombras-disonantes/
        ├── index.html              # Interfaz principal
        ├── combat-styles.css       # Estilos con tema dark fantasy
        ├── combat-data.js          # Estructuras de datos configurables
        ├── combat-engine.js        # Motor de combate y IA enemiga
        ├── combat-ui.js            # Controlador de interfaz
        ├── registration.js         # Sistema de registro automático
        └── README.md               # Este archivo
```

## 🚀 Instalación e Integración

### 1. Copiar archivos
Los archivos ya están ubicados en:
```
c:\Users\Usuario\Desktop\web_cripta\Minijuegos\minijuegos-solitario\sombras-disonantes\
```

### 2. Registro automático
El archivo `registration.js` registra automáticamente la aventura en el sistema de minijuegos cuando se carga la página.

### 3. Modificación del sistema existente
Se ha modificado `js/adventure/minigames-ui.js` para soportar URLs personalizadas para cámaras de combate:

```javascript
// Check if it's a combat chamber with custom URL
if (minigame.customUrl && minigame.type === 'combat_chamber') {
    window.location.href = minigame.customUrl;
    return;
}
```

### 4. Acceso a la aventura
1. Navegar a `pages/aventuras.html`
2. Ir a la sección "◈ Minijuegos D&D"
3. Buscar "SOMBRAS DISONANTES"
4. Hacer clic en "📜 Ver reglas" o en la tarjeta para acceder

## 🎮 Cómo Jugar

### Inicio
1. Lee la introducción narrativa
2. Revisa las recompensas
3. Haz clic en "⚔ Comenzar Combate"

### Durante el combate
1. **Turno del jugador**: Selecciona acciones o conjuros
2. **Gestión de recursos**: Monitorea Segundo Aliento, Acción Adicional y espacios de conjuro
3. **Tiradas de dados**: Usa el botón de dados cuando sea necesario
4. **Finalizar turno**: Haz clic en "Finalizar Turno" para pasar al enemigo

### Acciones disponibles
- 🗡️ **Ataque Melee**: Ataque cuerpo a cuerpo con +6 al golpe
- 🏹 **Ataque Rango**: Ataque a distancia con +5 al golpe
- 🛡️ **Esquivar**: CA +2, ventaja en salvaciones
- 🏃 **Retirada**: Movimiento + desenganche
- ⏳ **Preparar**: Prepara una acción reactiva
- 💨 **Segundo Aliento**: Recupera 1d10 + 7 HP (1 uso)
- ⚡ **Acción Adicional**: Acción adicional este turno (1 uso)

### Conjuros disponibles
- 🔮 **Proyectil Mágico** (Nv 1): 3d4 daño fuerza, siempre acierta
- 🛡️ **Escudo** (Nv 1): CA +5 hasta inicio del próximo turno
- 🌊 **Absorber Elementos** (Nv 3): Resistencia elemental
- ❄️ **Rayo de Escarcha** (Nv 2): 4d8 daño frío, puede ralentizar
- 🔥 **Descarga de Fuego** (Truco): 2d10 daño fuego
- ⚡ **Toque Electrizante** (Truco): 3d6 daño eléctrico, ventaja si está cerca

## 🏗️ Arquitectura del Sistema

### Estructuras de Datos Configurables

Todas las mecánicas están almacenadas en estructuras de datos configurables en `combat-data.js`:

- `ADVENTURE_CONFIG`: Configuración general de la aventura
- `NARRATIVES`: Textos narrativos para introducción, victoria y derrota
- `PLAYER_CLASSES`: Clases de jugador con estadísticas, recursos y habilidades
- `ENEMIES`: Definición de enemigos con fases, habilidades y estadísticas
- `CONDITIONS`: Estados y condiciones aplicables
- `ENEMY_AI_CONFIG`: Configuración de IA enemiga con prioridades y comportamientos
- `DICE_CONFIG`: Configuración del sistema de dados
- `COMBAT_CONFIG`: Configuración general de combate

### Motor de Combate

La clase `CombatEngine` en `combat-engine.js` maneja:
- Inicialización de combate
- Sistema de dados con ventaja/desventaja
- Cálculo y aplicación de daño
- Gestión de recursos y condiciones
- Turnos de jugador y enemigo
- Registro de combate narrativo

### IA Enemiga

La clase `EnemyAI` implementa:
- Comportamiento basado en prioridades
- Selección ponderada de acciones
- Coordinación con ecos sombríos
- Adaptación a fases del jefe
- Modos: básico, agresivo, desesperado, finalizador

### Controlador de Interfaz

La clase `CombatUI` en `combat-ui.js` maneja:
- Actualizaciones del DOM
- Eventos de botones
- Visualización de estado
- Animaciones y transiciones
- Pantallas de victoria/derrota

## 🔧 Personalización

### Crear nuevas cámaras de combate

Para crear una nueva cámara de combate usando este sistema:

1. **Copiar la estructura**: Duplica la carpeta `sombras-disonantes`
2. **Modificar datos**: Edita `combat-data.js` con nuevos enemigos, habilidades y narrativas
3. **Actualizar registro**: Modifica `registration.js` con el nuevo ID y configuración
4. **Personalizar estilos**: Ajusta `combat-styles.css` si deseas un tema diferente

### Ejemplo: Modificar enemigo

```javascript
const ENEMIES = {
    nuevo_enemigo: {
        id: 'nuevo_enemigo',
        name: 'Nombre del Enemigo',
        hitPoints: 100,
        armorClass: 14,
        phases: {
            phase1: {
                name: 'Fase 1',
                hpThreshold: { min: 50, max: 100 },
                abilities: ['ability1', 'ability2'],
                behavior: 'basic'
            }
            // ... más fases
        },
        abilities: {
            ability1: {
                id: 'ability1',
                name: 'Nombre de Habilidad',
                type: 'attack',
                damage: '2d6 + 3',
                damageType: 'fuego',
                toHit: '+5',
                range: 'Cuerpo a cuerpo',
                description: 'Descripción de la habilidad',
                cooldown: 0
            }
            // ... más habilidades
        }
    }
};
```

## 📊 Estadísticas de Balance

### Guerrero Arcano Nivel 7
- HP: 65
- CA: 16
- Daño melee: 1d8 + 3 (promedio 7.5)
- Daño ranged: 1d8 + 3 (promedio 7.5)
- Proyectil Mágico: 3d4 (promedio 7.5)
- Recursos limitados pero estratégicos

### Fragmento de Sombra
- HP: 120
- CA: 15
- Daño promedio por turno: 12-18
- 3 fases con dificultad creciente
- Invocaciones de ecos para presión adicional

## 🐛 Solución de Problemas

### La aventura no aparece en Minijuegos
1. Verifica que `registration.js` se esté ejecutando
2. Abre la consola del navegador para ver errores
3. Ejecuta manualmente `registerSombrasDisonantes()` en la consola

### El combate no inicia
1. Verifica que todos los archivos JS estén cargados
2. Revisa la consola para errores de JavaScript
3. Asegúrate de que `combat-data.js` se cargue antes que `combat-engine.js`

### La IA no funciona
1. Verifica que `ENEMY_AI_CONFIG` esté definido en `combat-data.js`
2. Revisa que las habilidades del enemigo tengan IDs correctos
3. Verifica que los cooldowns se estén decrementando correctamente

## 📝 Notas Técnicas

### Dependencias
- Tailwind CSS (vía CDN)
- Google Fonts (Cinzel, Cormorant Garamond, Inter, Manrope)
- JavaScript ES6+ (sin frameworks)

### Compatibilidad
- Chrome/Edge: ✅ Total
- Firefox: ✅ Total
- Safari: ✅ Total
- Móvil: ✅ Responsive

### Rendimiento
- Carga inicial: < 1 segundo
- Actualizaciones de UI: 500ms (intervalo)
- Sin dependencias externas pesadas

## 🎨 Tema y Estética

### Paleta de Colores
- **Fondo**: #050408 (negro profundo)
- **Primario**: #7B5CE8 (violeta)
- **Secundario**: #4A7DE8 (azul arcano)
- **Acento**: #8B0000 (rojo sangre)
- **Texto**: #F0F1F3 (blanco roto)
- **Muted**: #989EAB (gris apagado)

### Efectos Visuales
- Niebla atmosférica animada
- Pulso de sombra en elementos críticos
- Transiciones suaves en barras de HP
- Animaciones de entrada para log de combate
- Indicadores de fase con brillo pulsante

## 📄 Licencia

Este código es parte del proyecto La Cripta y sigue las mismas licencias del proyecto principal.

## 👥 Contribución

Para crear nuevas cámaras de combate:
1. Usa este sistema como base
2. Mantén la estructura de datos configurables
3. Sigue los patrones de código establecidos
4. Documenta las nuevas mecánicas en el README

## 🎓 Créditos

- **Diseño de sistema**: Arquitectura configurable para reutilización
- **Balance de combate**: Basado en D&D 5e simplificado
- **IA enemiga**: Sistema de prioridades estratégicas
- **Interfaz**: Diseño responsive con tema dark fantasy

---

**Versión**: 1.0.0  
**Fecha**: Junio 2026  
**Estado**: ✅ Completado y funcional
