// Adventure Render - Sistema de Renderizado Estilizado para Aventuras

// Función para convertir texto de aventura a HTML estilizado
function renderAdventureToHTML(content) {
    if (!content) return '<p class="text-silver-soft">No hay contenido disponible</p>';
    
    let html = content;
    
    // Convertir encabezados markdown
    html = html.replace(/^# (.+)$/gm, '<h1 class="font-title text-4xl text-violet-primary mb-6 mt-8 border-b border-violet-primary/30 pb-4">$1</h1>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="font-title text-2xl text-violet-soft mb-4 mt-6">$1</h2>');
    html = html.replace(/^### (.+)$/gm, '<h3 class="font-title text-xl text-arcane-blue mb-3 mt-4">$1</h3>');
    
    // Convertir texto en negrita
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-violet-bright">$1</strong>');
    
    // Convertir texto en cursiva
    html = html.replace(/\*(.+?)\*/g, '<em class="text-silver-soft">$1</em>');
    
    // Convertir citas
    html = html.replace(/^> "(.+)"$/gm, '<blockquote class="border-l-4 border-violet-primary/50 pl-4 py-2 my-4 bg-bg-panel/50 rounded-r italic text-silver-soft">"$1"</blockquote>');
    html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-violet-primary/50 pl-4 py-2 my-4 bg-bg-panel/50 rounded-r italic text-silver-soft">$1</blockquote>');
    
    // Convertir listas con bullets
    html = html.replace(/^(\*) (.+)$/gm, '<li class="text-silver-soft ml-6 mb-2 list-disc">$2</li>');
    
    // Convertir listas numeradas
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="text-silver-soft ml-6 mb-2 list-decimal">$2</li>');
    
    // Convertir separadores
    html = html.replace(/^---$/gm, '<hr class="border-violet-primary/20 my-6">');
    
    // Convertir código inline
    html = html.replace(/`(.+?)`/g, '<code class="bg-bg-panel px-2 py-1 rounded text-violet-soft text-sm font-mono">$1</code>');
    
    // Convertir bloques de código
    html = html.replace(/```([\s\S]+?)```/g, '<pre class="bg-bg-panel p-4 rounded-lg my-4 overflow-x-auto"><code class="text-silver-soft text-sm font-mono">$1</code></pre>');
    
    // Convertir checks de información [check:informacion dc=X]
    html = html.replace(/\[check:informacion dc=(\d+)\]/g, '<div class="bg-arcane-blue/10 border border-arcane-blue/30 rounded-lg p-4 my-4"><div class="flex items-center gap-2 mb-2"><span class="text-arcane-blue">🎲</span><span class="text-arcane-blue font-semibold">Check de Información (DC $1)</span></div><p class="text-silver-soft/80 text-sm">Tiren 1d20 y comparen con el DC indicado.</p></div>');
    
    // Convertir resultados [success]...[/success]
    html = html.replace(/\[success\]([\s\S]+?)\[\/success\]/g, '<div class="bg-violet-primary/10 border border-violet-primary/30 rounded-lg p-4 my-4"><div class="flex items-center gap-2 mb-2"><span class="text-violet-primary">✓</span><span class="text-violet-primary font-semibold">Éxito</span></div><p class="text-silver-soft">$1</p></div>');
    
    // Convertir resultados [failure]...[/failure]
    html = html.replace(/\[failure\]([\s\S]+?)\[\/failure\]/g, '<div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4 my-4"><div class="flex items-center gap-2 mb-2"><span class="text-red-400">✗</span><span class="text-red-400 font-semibold">Fallo</span></div><p class="text-silver-soft">$1</p></div>');
    
    // Convertir variables [set:variable=value]
    html = html.replace(/\[set:(\w+)=(\w+)\]/g, '<div class="bg-bg-panel/50 border border-violet-primary/20 rounded px-3 py-1 my-2 inline-block text-xs text-violet-soft">📝 $1 = $2</div>');
    
    // Envolver párrafos que no son HTML
    const lines = html.split('\n');
    let result = '';
    let inList = false;
    let inCheck = false;
    let inResult = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('<div class="bg-arcane-blue') || line.startsWith('<div class="bg-violet-primary') || line.startsWith('<div class="bg-red-500')) {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            inCheck = true;
            inResult = true;
            result += line + '\n';
        } else if (line.startsWith('</div>')) {
            if (inCheck || inResult) {
                result += line + '\n';
                if (!line.includes('</div></div>')) {
                    inCheck = false;
                    inResult = false;
                }
            } else {
                result += line + '\n';
            }
        } else if (line.startsWith('<li') || line.startsWith('<h1') || line.startsWith('<h2') || line.startsWith('<h3') || line.startsWith('<blockquote') || line.startsWith('<hr') || line.startsWith('<pre')) {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            result += line + '\n';
        } else if (line === '') {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            if (!inCheck && !inResult) {
                result += '<p class="text-silver-soft mb-4"></p>\n';
            }
        } else if (line.startsWith('*') || line.match(/^\d+\./)) {
            if (!inList) {
                result += '<ul class="mb-4">\n';
                inList = true;
            }
            // Ya fue convertido a <li> arriba
        } else if (!line.startsWith('<')) {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            if (!inCheck && !inResult) {
                result += '<p class="text-silver-soft mb-4 leading-relaxed">' + line + '</p>\n';
            }
        } else {
            result += line + '\n';
        }
    }
    
    if (inList) {
        result += '</ul>';
    }
    
    return result;
}

// Hacer funciones disponibles globalmente
window.renderAdventureToHTML = renderAdventureToHTML;
