/**
 * Admin Access System - New Version
 * Sistema de acceso simplificado para el nuevo sistema basado en carpetas
 */

const ADMIN_PASSWORD = 'BenjaMarcePau9';
const ADMIN_STORAGE_KEY = 'admin_auth_v2';

// Simple hash function
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
}

// Verificar autenticación
function isAdminAuthenticated() {
    const storedAuth = localStorage.getItem(ADMIN_STORAGE_KEY);
    return storedAuth === simpleHash(ADMIN_PASSWORD);
}

// Solicitar contraseña
function promptAdminPassword() {
    if (isAdminAuthenticated()) {
        return true;
    }
    
    const password = prompt('Contraseña del Panel Admin:');
    if (password && simpleHash(password) === simpleHash(ADMIN_PASSWORD)) {
        localStorage.setItem(ADMIN_STORAGE_KEY, simpleHash(ADMIN_PASSWORD));
        return true;
    } else if (password) {
        alert('Contraseña incorrecta');
    }
    
    return false;
}

// Abrir panel admin (nuevo sistema)
function openAdminPanel() {
    if (promptAdminPassword()) {
        window.location.href = 'admin-new.html';
    }
}

// Cerrar sesión
function adminLogout() {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    alert('Sesión de admin cerrada');
    window.location.href = 'index.html';
}

// Listener global para Ctrl+Alt+P
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'p') {
        e.preventDefault();
        openAdminPanel();
    }
});

// Exportar funciones
window.openAdminPanel = openAdminPanel;
window.adminLogout = adminLogout;
window.isAdminAuthenticated = isAdminAuthenticated;
