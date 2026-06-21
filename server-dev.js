#!/usr/bin/env node

/**
 * Simple Development Server
 * Servidor HTTP simple para desarrollo local
 * Evita problemas de CORS al abrir archivos HTML directamente
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    // Eliminar query string
    const urlPath = req.url.split('?')[0];
    
    // Servir index.html por defecto en la raíz
    let filePath = urlPath === '/' ? '/index.html' : urlPath;
    
    // Si es pages/ pero sin archivo, servir index.html
    if (filePath.endsWith('/pages') || filePath.endsWith('/pages/')) {
        filePath = '/index.html';
    }
    
    // Eliminar slash inicial para path.join
    const relativePath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
    const fullPath = path.join(__dirname, relativePath);
    
    console.log(`📄 Sirviendo: ${urlPath} -> ${fullPath}`);
    
    // Verificar si el archivo existe
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`❌ Archivo no encontrado: ${fullPath}`);
            // Si no existe, intentar redirigir a pages/ SOLO si no empieza con /pages/
            if (!filePath.startsWith('/pages/')) {
                const pagesPath = path.join(__dirname, 'pages', relativePath);
                console.log(`🔍 Intentando en pages/: ${pagesPath}`);
                fs.access(pagesPath, fs.constants.F_OK, (pagesErr) => {
                    if (!pagesErr) {
                        serveFile(pagesPath, res);
                    } else {
                        serve404(res);
                    }
                });
            } else {
                serve404(res);
            }
            return;
        }
        
        serveFile(fullPath, res);
    });
});

function serveFile(filePath, res) {
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(`❌ Error leyendo archivo: ${filePath}`, err.message);
            serve404(res);
            return;
        }
        
        console.log(`✅ Archivo servido: ${filePath} (${data.length} bytes)`);
        res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(data);
    });
}

function serve404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>404 - No Encontrado</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #050408; color: #F4F5F7; }
                h1 { color: #7B5CE8; font-size: 72px; margin: 0; }
                p { font-size: 18px; }
                a { color: #7B5CE8; text-decoration: none; }
            </style>
        </head>
        <body>
            <h1>404</h1>
            <p>Página no encontrada</p>
            <a href="/">Volver al inicio</a>
        </body>
        </html>
    `);
}

server.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Servidor de desarrollo iniciado');
    console.log('='.repeat(50));
    console.log(`📁 Directorio: ${__dirname}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('='.repeat(50));
    console.log('📝 Páginas disponibles:');
    console.log(`   - http://localhost:${PORT}/ (Inicio)`);
    console.log(`   - http://localhost:${PORT}/pages/admin-new.html (Admin)`);
    console.log(`   - http://localhost:${PORT}/pages/ciudades-new.html (Ciudades)`);
    console.log('='.repeat(50));
    console.log('⚠️  Presiona Ctrl+C para detener el servidor');
    console.log('='.repeat(50));
});
