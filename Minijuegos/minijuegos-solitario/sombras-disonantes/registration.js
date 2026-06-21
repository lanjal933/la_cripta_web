/**
 * SOMBRAS DISONANTES - Registration System
 * 
 * Registra automáticamente la aventura en el sistema de minijuegos
 * para que aparezca en Juegos → Minijuegos.
 */

const SOMBRAS_DISONANTES_MINIGAME = {
    id: 'sombras_disonantes',
    title: 'SOMBRAS DISONANTES',
    description: 'Cámara de Combate Individual. Derrota al Fragmento de Sombra para liberar un alma atrapada entre planos. Sistema de combate táctico con IA enemiga estratégica.',
    category: 'Minijuego',
    level: 7,
    tags: ['combate', 'solo', 'jefe', 'sombras', 'fantasía oscura', 'táctico'],
    type: 'combat_chamber',
    coverImage: '../../../images/aventura_pc.png',
    difficulty: 'Difícil',
    estimatedTime: '15-20 minutos',
    customUrl: '../Minijuegos/minijuegos-solitario/sombras-disonantes/index.html',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

/**
 * Registrar el minijuego en localStorage
 */
function registerSombrasDisonantes() {
    const MINIGAMES_STORAGE_KEY = 'dd_minigames';
    
    try {
        // Get existing minigames
        const existingMinigames = JSON.parse(localStorage.getItem(MINIGAMES_STORAGE_KEY) || '[]');
        
        // Check if already exists
        const existingIndex = existingMinigames.findIndex(m => m.id === SOMBRAS_DISONANTES_MINIGAME.id);
        
        if (existingIndex > -1) {
            // Update existing
            existingMinigames[existingIndex] = SOMBRAS_DISONANTES_MINIGAME;
            console.log('SOMBRAS DISONANTES actualizado en el sistema de minijuegos');
        } else {
            // Add new
            existingMinigames.push(SOMBRAS_DISONANTES_MINIGAME);
            console.log('SOMBRAS DISONANTES registrado en el sistema de minijuegos');
        }
        
        // Save to localStorage
        localStorage.setItem(MINIGAMES_STORAGE_KEY, JSON.stringify(existingMinigames));
        
        return true;
    } catch (error) {
        console.error('Error al registrar SOMBRAS DISONANTES:', error);
        return false;
    }
}

/**
 * Inicializar registro cuando el DOM esté listo
 */
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        registerSombrasDisonantes();
    });
    
    // Expose function for manual registration if needed
    window.registerSombrasDisonantes = registerSombrasDisonantes;
}
