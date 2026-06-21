// API Configuration
const API_CONFIG = {
  // Use relative path since backend serves frontend from same origin
  BASE_URL: '/api',
  
  // Socket.IO URL - use same origin
  SOCKET_URL: window.location.origin
};

// Helper function para hacer peticiones a la API
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('cripta_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error en la petición');
  }

  return response.json();
}

// Guardar token
function saveToken(token) {
  localStorage.setItem('cripta_token', token);
}

// Obtener token
function getToken() {
  return localStorage.getItem('cripta_token');
}

// Eliminar token
function removeToken() {
  localStorage.removeItem('cripta_token');
}

// Verificar si está autenticado
function isAuthenticated() {
  return !!getToken();
}

// Obtener ID del usuario actual
function getCurrentUserId() {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// Obtener nombre de usuario actual
function getCurrentUsername() {
  const userStr = localStorage.getItem('cripta_user');
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return user.username;
  } catch (error) {
    console.error('Error parsing user:', error);
    return null;
  }
}

// Guardar usuario
function saveUser(user) {
  localStorage.setItem('cripta_user', JSON.stringify(user));
}

// Obtener usuario
function getUser() {
  const userStr = localStorage.getItem('cripta_user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user:', error);
    return null;
  }
}

// Eliminar usuario
function removeUser() {
  localStorage.removeItem('cripta_user');
}

// Funciones de autenticación con email
async function registerWithEmail(email, username, password, country, timezone) {
  const response = await apiCall('/auth/register-email', {
    method: 'POST',
    body: JSON.stringify({ email, username, password, country, timezone })
  });
  
  saveToken(response.token);
  saveUser(response.user);
  
  return response;
}

async function loginWithEmail(email, password) {
  const response = await apiCall('/auth/login-email', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  saveToken(response.token);
  saveUser(response.user);
  
  return response;
}

async function logout() {
  try {
    await apiCall('/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  removeToken();
  removeUser();
}

async function getCurrentUser() {
  if (!isAuthenticated()) return null;
  
  try {
    const response = await apiCall('/auth/me');
    saveUser(response.user);
    return response.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    removeToken();
    removeUser();
    return null;
  }
}
