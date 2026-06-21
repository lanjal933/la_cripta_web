# Guía de Despliegue - La Cripta

## Resumen de Cambios

He creado un backend completo con Node.js, Express, Prisma (MySQL) y Socket.IO para que el sistema de matchmaking funcione en un servidor real con múltiples usuarios. El sistema ahora soporta autenticación por email/password además de Discord.

## Sistema de Autenticación por Email

El sistema ahora soporta dos métodos de autenticación:
1. **Discord** - Para usuarios que quieren participar en matchmaking (requiere usuario de Discord)
2. **Email/Password** - Para usuarios que solo quieren crear y jugar aventuras (sin Discord)

### Nuevas Rutas de Autenticación

- `POST /api/auth/register-email` - Registro con email y contraseña
- `POST /api/auth/login-email` - Login con email y contraseña
- `POST /api/auth/register` - Registro con Discord (mantenido para compatibilidad)

## Archivos Creados

### Backend (carpeta `server/`)
- `package.json` - Dependencias del servidor
- `.env.example` - Template de variables de entorno
- `server.js` - Servidor principal con Express y Socket.IO
- `prisma/schema.prisma` - Schema de Prisma para MySQL
- `middleware/auth.js` - Middleware de autenticación JWT
- `routes/auth.js` - Rutas de autenticación (Discord y Email)
- `routes/users.js` - Rutas de usuarios
- `routes/matchmaking.js` - Rutas de matchmaking
- `services/userService.js` - Servicio de usuarios
- `README.md` - Documentación del servidor

### Frontend
- `js/api-client.js` - Cliente API para el frontend
- `js/api-config.js` - Configuración de API

### Archivos Actualizados
- `pages/login.html` - Ahora usa la API en lugar de localStorage
- `pages/matchmaking.html` - Ahora usa la API y Socket.IO
- `js/user-menu.js` - Ahora usa la API para todas las operaciones

## Instrucciones de Despliegue Gratuito

### Opción 1: Render (Recomendado - Totalmente Gratis)

Render ofrece un plan gratuito perfecto para este proyecto:
- **Backend:** Render.com (Free tier)
- **Base de Datos:** Render PostgreSQL (Free tier) o PlanetScale (Free tier MySQL)
- **Frontend:** Vercel o Netlify (Free tier)

#### Pasos para desplegar en Render:

**1. Preparar el repositorio:**
```bash
git init
git add .
git commit -m "Initial commit"
# Subir a GitHub/GitLab
```

**2. Desplegar Backend en Render:**
1. Crear cuenta en https://render.com
2. Click en "New +" → "Web Service"
3. Conectar tu repositorio de GitHub
4. Configurar:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment Variables:**
     ```
     PORT=3000
     DATABASE_URL=tu_url_de_base_de_datos
     JWT_SECRET=tu_secreto_jwt_aleatorio
     NODE_ENV=production
     ```
5. Click en "Deploy Web Service"

**3. Configurar Base de Datos:**
- **Opción A: Render PostgreSQL (Gratis)**
  - En Render, crear "New +" → "PostgreSQL"
  - Obtener la DATABASE_URL del dashboard
  - Agregarla como variable de entorno en el backend

- **Opción B: PlanetScale MySQL (Gratis)**
  - Crear cuenta en https://planetscale.com
  - Crear una base de datos gratuita
  - Obtener la DATABASE_URL
  - Agregarla como variable de entorno en el backend

**4. Desplegar Frontend en Vercel:**
1. Crear cuenta en https://vercel.com
2. Click en "Add New Project"
3. Conectar tu repositorio de GitHub
4. Configurar:
   - **Root Directory:** `.` (raíz del proyecto)
   - **Build Command:** (dejar vacío, es sitio estático)
   - **Output Directory:** `.` (o la carpeta donde están los HTML)
5. Click en "Deploy"

**5. Configurar API URL en Frontend:**
En `js/api-config.js`, cambiar:
```javascript
BASE_URL: 'https://tu-backend-url.onrender.com/api'
```

### Opción 2: Railway (Alternativa Gratis)

Railway también ofrece un plan gratuito:
1. Crear cuenta en https://railway.app
2. Crear un nuevo proyecto
3. Agregar servicio de base de datos (PostgreSQL o MySQL)
4. Agregar servicio de backend (Node.js)
5. Configurar variables de entorno
6. Desplegar frontend en Vercel/Netlify

### Opción 3: Fly.io (Alternativa Gratis)

Fly.io ofrece $5 de crédito gratis:
1. Instalar Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Crear app: `fly launch --region iad`
4. Configurar base de datos
5. Desplegar: `fly deploy`

## Instrucciones de Despliegue Local

### 1. Instalar Base de Datos (MySQL)

**Opción A: Local**
```bash
# Windows: Descargar desde https://dev.mysql.com/downloads/mysql/
# Linux: sudo apt install mysql-server
# Mac: brew install mysql
```

**Opción B: PlanetScale (Recomendado para desarrollo)**
1. Crear cuenta en https://planetscale.com
2. Crear una base de datos gratuita
3. Obtener la DATABASE_URL
4. Reemplazar `DATABASE_URL` en `.env`

### 2. Configurar el Servidor

```bash
cd server
npm install
cp .env.example .env
```

Editar `.env`:
```
PORT=3000
DATABASE_URL="mysql://usuario:password@localhost:3306/la_cripta"
JWT_SECRET=tu_secreto_jwt_muy_largo_y_seguro_aqui
NODE_ENV=development
```

**IMPORTANTE:** Cambiar `JWT_SECRET` a un string largo y aleatorio en producción.

### 3. Ejecutar Migraciones de Prisma

```bash
cd server
npx prisma generate
npx prisma db push
```

### 4. Ejecutar en Desarrollo

```bash
cd server
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### 4. Actualizar URLs del Frontend

En los archivos del frontend, cambiar:
- `pages/login.html`: Línea 237 - `http://localhost:3000/api/auth/me`
- `pages/login.html`: Línea 301 - `http://localhost:3000/api/auth/register`
- `pages/login.html`: Línea 414 - `http://localhost:3000/api/auth/availability`
- `pages/login.html`: Línea 442 - `http://localhost:3000/api/auth/availability`
- `pages/matchmaking.html`: Línea 231 - `http://localhost:3000/api`
- `pages/matchmaking.html`: Línea 232 - `http://localhost:3000`
- `js/user-menu.js`: Línea 3 - `http://localhost:3000/api`

**Para producción:** Reemplazar `http://localhost:3000` con tu URL de servidor real.

### 5. Despliegue en Producción

#### Usando PM2 (Recomendado)

```bash
npm install -g pm2
cd server
pm2 start server.js --name la-cripta
pm2 save
pm2 startup
```

#### Usando Docker (Opcional)

```bash
cd server
docker build -t la-cripta-server .
docker run -p 3000:3000 la-cripta-server
```

### 6. Configurar HTTPS (Producción)

Usar Nginx o Apache como reverse proxy con SSL:
```nginx
server {
    listen 443 ssl;
    server_name tu-dominio.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro/Login
- `GET /api/auth/me` - Obtener usuario actual
- `PUT /api/auth/profile` - Actualizar perfil
- `PUT /api/auth/availability` - Actualizar disponibilidad
- `PUT /api/auth/settings` - Actualizar configuración
- `POST /api/auth/logout` - Cerrar sesión

### Matchmaking
- `POST /api/matchmaking/search` - Crear búsqueda
- `DELETE /api/matchmaking/search` - Cancelar búsqueda
- `GET /api/matchmaking/my-search` - Obtener mi búsqueda
- `GET /api/matchmaking/active` - Obtener búsquedas activas
- `POST /api/matchmaking/check-matches` - Verificar matches

### Usuarios
- `GET /api/users/notifications` - Obtener notificaciones
- `PUT /api/users/notifications/:id/read` - Marcar como leída
- `DELETE /api/users/notifications/:id` - Eliminar notificación

## Socket.IO Events

### Cliente → Servidor
- `join-matchmaking` - Unirse a matchmaking
- `leave-matchmaking` - Salir de matchmaking

### Servidor → Cliente
- `new-search` - Nueva búsqueda creada
- `search-cancelled` - Búsqueda cancelada
- `group-found` - Grupo encontrado

## Notas Importantes

1. **Seguridad:**
   - Cambiar `JWT_SECRET` en producción
   - Usar HTTPS en producción
   - Configurar CORS correctamente
   - Usar variables de entorno para datos sensibles

2. **Base de Datos:**
   - Usar MongoDB Atlas para producción
   - Configurar backups automáticos
   - Monitorear uso de almacenamiento

3. **Escalabilidad:**
   - Considerar usar Redis para Socket.IO en múltiples servidores
   - Configurar balanceador de carga si es necesario
   - Monitorear rendimiento con herramientas como New Relic o Datadog

4. **Mantenimiento:**
   - Implementar logs estructurados (Winston, Pino)
   - Configurar monitoreo de errores (Sentry)
   - Implementar health checks
   - Configurar limpieza automática de búsquedas expiradas

## Solución de Problemas

### El servidor no inicia
- Verificar que MongoDB esté corriendo
- Verificar que el puerto 3000 esté disponible
- Revisar logs del servidor

### Error de conexión a MongoDB
- Verificar `MONGODB_URI` en `.env`
- Verificar que MongoDB esté accesible
- Revisar credenciales si usando Atlas

### Socket.IO no conecta
- Verificar que el servidor Socket.IO esté corriendo
- Revisar configuración de CORS
- Verificar firewall/proxy

### El frontend no se conecta a la API
- Verificar que el servidor esté corriendo
- Verificar URLs en los archivos del frontend
- Revisar console del navegador para errores
