// Market UI - Handles all market interface functionality
let currentCategory = 'all';
let countdownInterval = null;

// Navigation functions
function goToPage(page) {
    window.location.href = `${page}.html`;
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.market-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Hide main cards
    document.getElementById('mainCards').style.display = 'none';
    
    // Show selected section
    const section = document.getElementById(`${sectionId}-section`);
    if (section) {
        section.classList.add('active');
        
        // Load section-specific content
        if (sectionId === 'catalogo') {
            loadCatalogo();
        } else if (sectionId === 'tienda-fantasma') {
            loadTiendaFantasma();
        } else if (sectionId === 'code-redemption') {
            // Code redemption is already loaded
        }
    }
}

// Go back to main cards
function showMainCards() {
    document.querySelectorAll('.market-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('mainCards').style.display = 'grid';
    
    // Clear countdown interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

// Load Catalogo section
function loadCatalogo() {
    loadCategoryTabs();
    loadCatalogItems(currentCategory);
}

// Load category tabs
function loadCategoryTabs() {
    const categories = window.MarketData.getCategories();
    const tabsContainer = document.getElementById('categoryTabs');
    
    let html = `
        <button class="category-tab ${currentCategory === 'all' ? 'active' : ''}" onclick="selectCategory('all')">
            <span class="category-tab-icon">📦</span>
            Todos
        </button>
    `;
    
    categories.forEach(cat => {
        html += `
            <button class="category-tab ${currentCategory === cat.id ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
                <span class="category-tab-icon">${cat.icon}</span>
                ${cat.name}
            </button>
        `;
    });
    
    tabsContainer.innerHTML = html;
}

// Select category
function selectCategory(categoryId) {
    currentCategory = categoryId;
    loadCategoryTabs();
    loadCatalogItems(categoryId);
}

// Load catalog items
function loadCatalogItems(categoryId) {
    const carousel = document.getElementById('catalogCarousel');
    let items;
    
    if (categoryId === 'all') {
        items = window.MarketData.getItems();
    } else {
        items = window.MarketData.getItemsByCategory(categoryId);
    }
    
    if (items.length === 0) {
        carousel.innerHTML = '<p style="color: #BFC5D2; padding: 20px;">No hay items en esta categoría.</p>';
        return;
    }
    
    let html = '';
    items.forEach(item => {
        const icon = getItemIcon(item.category);
        html += `
            <div class="carousel-item">
                <div class="carousel-item-image">${icon}</div>
                ${item.subcategory ? `<div class="carousel-item-subcategory">${item.subcategory}</div>` : ''}
                <div class="carousel-item-name">${item.name}</div>
                <div class="carousel-item-price">${item.price} BLINES</div>
                <div class="carousel-item-description">${item.description}</div>
            </div>
        `;
    });
    
    carousel.innerHTML = html;
}

// Get icon for item category
function getItemIcon(category) {
    const icons = {
        'servicios': '🏰',
        'armas': '⚔️',
        'armaduras': '🛡️',
        'objetos': '🎒',
        'baratijas': '✨',
        'monturas': '🐎'
    };
    return icons[category] || '📦';
}

// Scroll carousel
function scrollCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const scrollAmount = 300;
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Load Tienda Fantasma section
function loadTiendaFantasma() {
    const offers = window.MarketData.getCurrentGhostShopOffers();
    loadGhostOffers(offers);
    startCountdown();
}

// Load ghost offers
function loadGhostOffers(offers) {
    const carousel = document.getElementById('ghostOffersCarousel');
    
    if (offers.length === 0) {
        carousel.innerHTML = '<p style="color: #BFC5D2; padding: 20px;">No hay ofertas disponibles en este momento.</p>';
        return;
    }
    
    let html = '';
    offers.forEach(item => {
        const icon = getItemIcon(item.category);
        html += `
            <div class="ghost-offer-item">
                <span class="special-badge">✨ OFERTA ESPECIAL</span>
                <div class="carousel-item-image">${icon}</div>
                ${item.subcategory ? `<div class="carousel-item-subcategory">${item.subcategory}</div>` : ''}
                <div class="carousel-item-name">${item.name}</div>
                <div class="carousel-item-price">${item.price} BLINES</div>
                <div class="carousel-item-description">${item.description}</div>
                <a href="https://discord.com/channels/1467738240567083133/1514009126542377050" target="_blank" class="discord-button">
                    🎮 Solicitar en Discord
                </a>
            </div>
        `;
    });
    
    carousel.innerHTML = html;
}

// Start countdown timer
function startCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const timeLeft = window.MarketData.getTimeUntilRotation();
    const display = document.getElementById('countdownDisplay');
    
    if (timeLeft <= 0) {
        display.textContent = 'Rotando ofertas...';
        window.MarketData.generateGhostShopOffers();
        loadTiendaFantasma();
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    display.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Redeem code
function redeemCode() {
    const input = document.getElementById('codeInput');
    const code = input.value.trim().toUpperCase();
    const resultDiv = document.getElementById('codeResult');
    const titleEl = document.getElementById('codeResultTitle');
    const messageEl = document.getElementById('codeResultMessage');
    
    // Validate code format (6 characters)
    if (code.length !== 6) {
        resultDiv.className = 'code-result error';
        titleEl.textContent = '❌ Código inválido';
        messageEl.textContent = 'El código debe tener exactamente 6 caracteres.';
        resultDiv.style.display = 'block';
        return;
    }
    
    const result = window.MarketData.redeemCode(code);
    
    if (result.success) {
        resultDiv.className = 'code-result success';
        titleEl.textContent = '✅ ¡Código canjeado!';
        messageEl.textContent = `Recompensa: ${result.reward}. ${result.description}`;
        input.value = '';
    } else {
        resultDiv.className = 'code-result error';
        titleEl.textContent = '❌ Error al canjear';
        messageEl.textContent = result.message;
    }
    
    resultDiv.style.display = 'block';
}

// Add back button to sections
document.addEventListener('DOMContentLoaded', function() {
    // Add back button functionality
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const backButton = document.createElement('button');
        backButton.textContent = '← Volver';
        backButton.style.cssText = `
            background: #181722;
            color: #BFC5D2;
            border: 1px solid rgba(124, 92, 255, 0.2);
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
            transition: all 0.2s;
        `;
        backButton.onmouseover = function() {
            this.style.background = '#1F1D2B';
            this.style.borderColor = 'rgba(124, 92, 255, 0.4)';
        };
        backButton.onmouseout = function() {
            this.style.background = '#181722';
            this.style.borderColor = 'rgba(124, 92, 255, 0.2)';
        };
        backButton.onclick = showMainCards;
        header.appendChild(backButton);
    });
    
    // Initialize market data
    window.MarketData.initializeMarketData();
});
