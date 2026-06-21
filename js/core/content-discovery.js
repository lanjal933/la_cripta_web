/**
 * Content Discovery System
 * Sistema de descubrimiento automático de contenido basado en carpetas
 * Detecta automáticamente nuevas carpetas y genera índices
 */

class ContentDiscovery {
    constructor(basePath = '../content/') {
        this.contentBasePath = basePath;
        this.categories = ['aventuras', 'ciudades', 'minijuegos', 'facciones', 'razas', 'guias'];
        this.indexCache = {};
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutos
    }

    /**
     * Descubre todo el contenido de todas las categorías
     */
    async discoverAll() {
        const indices = {};
        
        for (const category of this.categories) {
            indices[category] = await this.discoverCategory(category);
        }
        
        return indices;
    }

    /**
     * Descubre contenido de una categoría específica
     */
    async discoverCategory(category) {
        const cacheKey = `${category}_index`;
        const cached = this.getFromCache(cacheKey);
        
        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(`${this.contentBasePath}${category}/index.json`);
            if (!response.ok) {
                throw new Error(`No se pudo cargar index.json para ${category}`);
            }
            
            const index = await response.json();
            this.saveToCache(cacheKey, index);
            return index;
        } catch (error) {
            console.warn(`No se pudo cargar índice para ${category}, usando fallback:`, error);
            return this.generateFallbackIndex(category);
        }
    }

    /**
     * Genera índice fallback cuando no existe index.json
     * Intenta descubrir carpetas directamente
     */
    async generateFallbackIndex(category) {
        try {
            const response = await fetch(`${this.contentBasePath}${category}/`);
            const html = await response.text();
            
            // Parsear HTML para encontrar carpetas
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('a[href$="/"]');
            
            const items = [];
            links.forEach(link => {
                const href = link.getAttribute('href');
                const name = href.replace(/\/$/, '');
                
                // Ignorar carpetas especiales
                if (name === '' || name.startsWith('.') || name === '.template') {
                    return;
                }
                
                items.push({
                    id: name,
                    title: this.formatTitle(name),
                    path: `${this.contentBasePath}${category}/${name}/`,
                    discovered: true
                });
            });
            
            return {
                category,
                version: '1.0',
                generated: new Date().toISOString(),
                items
            };
        } catch (error) {
            console.error(`Error generando fallback para ${category}:`, error);
            return { category, version: '1.0', items: [] };
        }
    }

    /**
     * Carga metadata de un item específico
     */
    async loadItemMetadata(category, itemId) {
        try {
            const response = await fetch(`${this.contentBasePath}${category}/${itemId}/metadata.json`);
            if (!response.ok) {
                throw new Error(`No se pudo cargar metadata para ${itemId}`);
            }
            
            return await response.json();
        } catch (error) {
            console.warn(`No se pudo cargar metadata para ${itemId}, usando defaults:`, error);
            return this.generateDefaultMetadata(category, itemId);
        }
    }

    /**
     * Genera metadata default cuando no existe metadata.json
     */
    generateDefaultMetadata(category, itemId) {
        return {
            id: itemId,
            title: this.formatTitle(itemId),
            description: '',
            category,
            order: 0,
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            published: true,
            tags: [],
            thumbnail: '',
            author: 'Unknown',
            content: {
                type: 'html',
                file: 'index.html'
            },
            metadata: {}
        };
    }

    /**
     * Carga el contenido HTML de un item
     */
    async loadItemContent(category, itemId) {
        try {
            const metadata = await this.loadItemMetadata(category, itemId);
            const contentFile = metadata.content?.file || 'index.html';
            
            const response = await fetch(`${this.contentBasePath}${category}/${itemId}/${contentFile}`);
            if (!response.ok) {
                throw new Error(`No se pudo cargar contenido para ${itemId}`);
            }
            
            return await response.text();
        } catch (error) {
            console.error(`Error cargando contenido para ${itemId}:`, error);
            return '<p>Error cargando contenido</p>';
        }
    }

    /**
     * Formatea un ID a título legible
     */
    formatTitle(id) {
        return id
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    /**
     * Guarda en cache
     */
    saveToCache(key, data) {
        this.indexCache[key] = {
            data,
            timestamp: Date.now()
        };
    }

    /**
     * Obtiene del cache si no ha expirado
     */
    getFromCache(key) {
        const cached = this.indexCache[key];
        if (!cached) return null;
        
        const age = Date.now() - cached.timestamp;
        if (age > this.cacheExpiry) {
            delete this.indexCache[key];
            return null;
        }
        
        return cached.data;
    }

    /**
     * Limpia toda la cache
     */
    clearCache() {
        this.indexCache = {};
    }

    /**
     * Busca items por término
     */
    async search(term) {
        const indices = await this.discoverAll();
        const results = [];
        
        const lowerTerm = term.toLowerCase();
        
        for (const category in indices) {
            const index = indices[category];
            if (!index.items) continue;
            
            for (const item of index.items) {
                const title = (item.title || '').toLowerCase();
                const description = (item.description || '').toLowerCase();
                const tags = (item.tags || []).join(' ').toLowerCase();
                
                if (title.includes(lowerTerm) || 
                    description.includes(lowerTerm) || 
                    tags.includes(lowerTerm)) {
                    results.push({
                        ...item,
                        category
                    });
                }
            }
        }
        
        return results;
    }

    /**
     * Obtiene items por tag
     */
    async getByTag(tag) {
        const indices = await this.discoverAll();
        const results = [];
        
        for (const category in indices) {
            const index = indices[category];
            if (!index.items) continue;
            
            for (const item of index.items) {
                if (item.tags && item.tags.includes(tag)) {
                    results.push({
                        ...item,
                        category
                    });
                }
            }
        }
        
        return results;
    }

    /**
     * Obtiene items recientes
     */
    async getRecent(limit = 10) {
        const indices = await this.discoverAll();
        const allItems = [];
        
        for (const category in indices) {
            const index = indices[category];
            if (!index.items) continue;
            
            for (const item of index.items) {
                allItems.push({
                    ...item,
                    category
                });
            }
        }
        
        // Ordenar por fecha de actualización descendente
        allItems.sort((a, b) => {
            const dateA = new Date(a.updated || a.created || 0);
            const dateB = new Date(b.updated || b.created || 0);
            return dateB - dateA;
        });
        
        return allItems.slice(0, limit);
    }
}

// Instancia global
window.contentDiscovery = new ContentDiscovery();
