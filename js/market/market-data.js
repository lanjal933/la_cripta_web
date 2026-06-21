// Market Data Management System
// Handles all market-related data storage and operations

const MARKET_DATA_VERSION = 'v2';
const MARKET_STORAGE_KEY = 'market_data_version';

// Default market categories based on items file
const defaultMarketCategories = [
    {
        id: 'servicios',
        name: 'Servicios de Ciudad',
        icon: '🏰',
        description: 'Servicios disponibles en las ciudades',
        order: 1
    },
    {
        id: 'armas',
        name: 'Armas',
        icon: '⚔️',
        description: 'Armas para combate',
        order: 2
    },
    {
        id: 'armaduras',
        name: 'Armaduras',
        icon: '🛡️',
        description: 'Protección para el cuerpo',
        order: 3
    },
    {
        id: 'objetos',
        name: 'Objetos Mundanos',
        icon: '🎒',
        description: 'Objetos de uso diario',
        order: 4
    },
    {
        id: 'baratijas',
        name: 'Baratijas Mágicas',
        icon: '✨',
        description: 'Objetos mágicos menores',
        order: 5
    },
    {
        id: 'monturas',
        name: 'Monturas y Vehículos',
        icon: '🐎',
        description: 'Transporte y monturas',
        order: 6
    }
];

// Default items parsed from the items file
const defaultMarketItems = [
    // Servicios
    { id: 'srv_portal', name: 'Portales', price: 40, category: 'servicios', description: 'Viaja entre ciudades de forma segura' },
    { id: 'srv_viaje', name: 'Servicios de viaje', price: 35, category: 'servicios', description: 'Transporte a cualquier lugar del continente' },
    { id: 'srv_entrenamiento', name: 'Entrenamiento de Combate', price: 55, category: 'servicios', description: '12 horas de entrenamiento intensivo' },
    { id: 'srv_hospital', name: 'Hospital', price: 40, category: 'servicios', description: 'Curación profesional y tratamiento' },
    { id: 'srv_coliseo', name: 'Coliseos', price: 30, category: 'servicios', description: 'Participa en combates por premios' },
    { id: 'srv_publicacion', name: 'Publicación de Venta', price: 30, category: 'servicios', description: 'Publica productos para venta' },
    { id: 'srv_diario', name: 'Publicación del diario', price: 40, category: 'servicios', description: 'Espacio en el diario semanal' },
    
    // Armas Simples
    { id: 'wep_garrote', name: 'Garrote', price: 5, category: 'armas', subcategory: 'Armas Simples', description: 'Arma simple contundente' },
    { id: 'wep_daga', name: 'Daga', price: 10, category: 'armas', subcategory: 'Armas Simples', description: 'Corta y fácil de ocultar' },
    { id: 'wep_gran_garrote', name: 'Gran Garrote', price: 15, category: 'armas', subcategory: 'Armas Simples', description: 'Versión más grande del garrote' },
    { id: 'wep_hacha_mano', name: 'Hacha de Mano', price: 20, category: 'armas', subcategory: 'Armas Simples', description: 'Hacha ligera para combate cercano' },
    { id: 'wep_jabalina', name: 'Jabalina', price: 15, category: 'armas', subcategory: 'Armas Simples', description: 'Arma arrojadiza' },
    { id: 'wep_martillo_ligero', name: 'Martillo Ligero', price: 20, category: 'armas', subcategory: 'Armas Simples', description: 'Martillo de guerra ligero' },
    { id: 'wep_lanza', name: 'Lanza', price: 20, category: 'armas', subcategory: 'Armas Simples', description: 'Arma básica de asta' },
    { id: 'wep_maza', name: 'Maza', price: 30, category: 'armas', subcategory: 'Armas Simples', description: 'Arma contundente' },
    { id: 'wep_baston', name: 'Bastón', price: 5, category: 'armas', subcategory: 'Armas Simples', description: 'Bastón simple' },
    { id: 'wep_hoz', name: 'Hoz', price: 20, category: 'armas', subcategory: 'Armas Simples', description: 'Hoz de combate' },
    { id: 'wep_ballesta_ligera', name: 'Ballesta Ligera', price: 50, category: 'armas', subcategory: 'Armas Simples', description: 'Ballesta de mano ligera' },
    { id: 'wep_dardo', name: 'Dardo', price: 5, category: 'armas', subcategory: 'Armas Simples', description: 'Proyectil pequeño' },
    { id: 'wep_arco_corto', name: 'Arco Corto', price: 55, category: 'armas', subcategory: 'Armas Simples', description: 'Arco de corto alcance' },
    { id: 'wep_honda', name: 'Honda', price: 15, category: 'armas', subcategory: 'Armas Simples', description: 'Arma de proyectiles simple' },
    
    // Armas Marciales
    { id: 'wep_hacha_batalla', name: 'Hacha de Batalla', price: 60, category: 'armas', subcategory: 'Armas Marciales', description: 'Hacha de guerra estándar' },
    { id: 'wep_mangual', name: 'Mangual', price: 65, category: 'armas', subcategory: 'Armas Marciales', description: 'Arma de cadena' },
    { id: 'wep_guja', name: 'Guja', price: 40, category: 'armas', subcategory: 'Armas Marciales', description: 'Arma de asta con gancho' },
    { id: 'wep_gran_hacha', name: 'Gran Hacha', price: 70, category: 'armas', subcategory: 'Armas Marciales', description: 'Hacha de dos manos' },
    { id: 'wep_espadon', name: 'Espadón', price: 80, category: 'armas', subcategory: 'Armas Marciales', description: 'Espada grande de dos manos' },
    { id: 'wep_alabarda', name: 'Alabarda', price: 85, category: 'armas', subcategory: 'Armas Marciales', description: 'Arma de asta versátil' },
    { id: 'wep_lanza_caballeria', name: 'Lanza de Caballería', price: 90, category: 'armas', subcategory: 'Armas Marciales', description: 'Lanza para combate montado' },
    { id: 'wep_espada_larga', name: 'Espada Larga', price: 60, category: 'armas', subcategory: 'Armas Marciales', description: 'Espada versátil' },
    { id: 'wep_martillo_guerra', name: 'Martillo de Guerra', price: 90, category: 'armas', subcategory: 'Armas Marciales', description: 'Martillo de guerra pesado' },
    { id: 'wep_lucero', name: 'Lucero del Alba', price: 60, category: 'armas', subcategory: 'Armas Marciales', description: 'Maza con púas' },
    { id: 'wep_pica', name: 'Pica', price: 60, category: 'armas', subcategory: 'Armas Marciales', description: 'Arma de asta muy larga' },
    { id: 'wep_estoque', name: 'Estoque', price: 65, category: 'armas', subcategory: 'Armas Marciales', description: 'Espada para estocadas' },
    { id: 'wep_cimitarra', name: 'Cimitarra', price: 50, category: 'armas', subcategory: 'Armas Marciales', description: 'Espada curva' },
    { id: 'wep_espada_corta', name: 'Espada Corta', price: 45, category: 'armas', subcategory: 'Armas Marciales', description: 'Espada corta' },
    { id: 'wep_tridente', name: 'Tridente', price: 50, category: 'armas', subcategory: 'Armas Marciales', description: 'Arma de tres puntas' },
    { id: 'wep_pico_guerra', name: 'Pico de Guerra', price: 60, category: 'armas', subcategory: 'Armas Marciales', description: 'Pico para perforar armaduras' },
    { id: 'wep_latigo', name: 'Látigo', price: 40, category: 'armas', subcategory: 'Armas Marciales', description: 'Arma flexible' },
    
    // Armas a Distancia
    { id: 'wep_cerbatana', name: 'Cerbatana', price: 30, category: 'armas', subcategory: 'Armas a Distancia', description: 'Arma de proyectiles silenciosa' },
    { id: 'wep_ballesta_mano', name: 'Ballesta de Mano', price: 110, category: 'armas', subcategory: 'Armas a Distancia', description: 'Ballesta compacta' },
    { id: 'wep_ballesta_pesada', name: 'Ballesta Pesada', price: 150, category: 'armas', subcategory: 'Armas a Distancia', description: 'Ballesta de gran potencia' },
    { id: 'wep_arco_largo', name: 'Arco Largo', price: 140, category: 'armas', subcategory: 'Armas a Distancia', description: 'Arco de gran alcance' },
    { id: 'wep_red', name: 'Red', price: 40, category: 'armas', subcategory: 'Armas a Distancia', description: 'Red para inmovilizar' },
    
    // Armas Especiales
    { id: 'wep_espada_runica', name: 'Espada Rúnica Vacía', price: 330, category: 'armas', subcategory: 'Armas Especiales', description: 'Espada con runas vacías' },
    { id: 'wep_hoja_ziidov', name: 'Hoja de Ziidov', price: 265, category: 'armas', subcategory: 'Armas Especiales', description: 'Hoja especial para Ziidov' },
    { id: 'wep_baston_arcano', name: 'Bastón Arcano Refinado', price: 240, category: 'armas', subcategory: 'Armas Especiales', description: 'Bastón mágico mejorado' },
    { id: 'wep_cuchilla_resonante', name: 'Cuchilla Resonante', price: 165, category: 'armas', subcategory: 'Armas Especiales', description: 'Cuchilla con propiedades resonantes' },
    { id: 'wep_lanza_cristal', name: 'Lanza de Cristal Astral', price: 330, category: 'armas', subcategory: 'Armas Especiales', description: 'Lanza de cristal estelar' },
    { id: 'wep_martillo_igneo', name: 'Martillo de Núcleo Ígneo', price: 285, category: 'armas', subcategory: 'Armas Especiales', description: 'Martillo con núcleo de fuego' },
    { id: 'wep_arco_vigia', name: 'Arco del Vigía Lunar', price: 285, category: 'armas', subcategory: 'Armas Especiales', description: 'Arco bendecido por la luna' },
    
    // Armaduras Ligeras
    { id: 'arm_acolchada', name: 'Acolchada', price: 25, category: 'armaduras', subcategory: 'Armaduras Ligeras', description: 'Armadura acolchada básica' },
    { id: 'arm_cuero', name: 'Cuero', price: 40, category: 'armaduras', subcategory: 'Armaduras Ligeras', description: 'Armadura de cuero' },
    { id: 'arm_cuero_reforzado', name: 'Cuero Reforzado', price: 75, category: 'armaduras', subcategory: 'Armaduras Ligeras', description: 'Cuero con refuerzos' },
    { id: 'arm_explorador', name: 'Abrigo del Explorador', price: 90, category: 'armaduras', subcategory: 'Armaduras Ligeras', description: 'Abrigo para exploradores' },
    { id: 'arm_sombría', name: 'Vestimenta Sombría', price: 120, category: 'armaduras', subcategory: 'Armaduras Ligeras', description: 'Ropa para sigilo' },
    
    // Armaduras Medias
    { id: 'arm_pieles', name: 'Pieles', price: 45, category: 'armaduras', subcategory: 'Armaduras Medias', description: 'Armadura de pieles' },
    { id: 'arm_camison', name: 'Camisón de Malla', price: 110, category: 'armaduras', subcategory: 'Armaduras Medias', description: 'Malla ligera' },
    { id: 'arm_escamas', name: 'Escamas', price: 140, category: 'armaduras', subcategory: 'Armaduras Medias', description: 'Armadura de escamas' },
    { id: 'arm_coraza_ligera', name: 'Coraza Ligera', price: 180, category: 'armaduras', subcategory: 'Armaduras Medias', description: 'Coraza de protección media' },
    { id: 'arm_media_placas', name: 'Media Placas', price: 260, category: 'armaduras', subcategory: 'Armaduras Medias', description: 'Armadura de placas parciales' },
    
    // Armaduras Pesadas
    { id: 'arm_cota_anillas', name: 'Cota de Anillas', price: 90, category: 'armaduras', subcategory: 'Armaduras Pesadas', description: 'Malla de anillas' },
    { id: 'arm_cota_malla', name: 'Cota de Malla', price: 170, category: 'armaduras', subcategory: 'Armaduras Pesadas', description: 'Malla pesada' },
    { id: 'arm_laminada', name: 'Armadura Laminada', price: 220, category: 'armaduras', subcategory: 'Armaduras Pesadas', description: 'Armadura de láminas' },
    { id: 'arm_guardia', name: 'Armadura Completa de Guardia', price: 300, category: 'armaduras', subcategory: 'Armaduras Pesadas', description: 'Armadura completa' },
    
    // Escudos
    { id: 'shd_madera', name: 'Escudo de Madera', price: 20, category: 'armaduras', subcategory: 'Escudos', description: 'Escudo básico de madera' },
    { id: 'shd_reforzado', name: 'Escudo Reforzado', price: 55, category: 'armaduras', subcategory: 'Escudos', description: 'Escudo reforzado' },
    { id: 'shd_acero', name: 'Escudo de Acero', price: 85, category: 'armaduras', subcategory: 'Escudos', description: 'Escudo de acero' },
    { id: 'shd_torre', name: 'Escudo Torre', price: 140, category: 'armaduras', subcategory: 'Escudos', description: 'Gran escudo torre' },
    { id: 'shd_runico', name: 'Escudo Rúnico Vacío', price: 280, category: 'armaduras', subcategory: 'Escudos', description: 'Escudo con runas vacías' },
    
    // Objetos Mundanos - Aventurería
    { id: 'obj_mochila', name: 'Mochila de Viaje', price: 15, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Mochila para viajes' },
    { id: 'obj_bolsa', name: 'Bolsa de Componentes', price: 25, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Bolsa para componentes mágicos' },
    { id: 'obj_cuerda_c', name: 'Cuerda de Cáñamo (15m)', price: 10, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Cuerda resistente' },
    { id: 'obj_cuerda_s', name: 'Cuerda de Seda (15m)', price: 35, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Cuerda de seda fina' },
    { id: 'obj_antorcha', name: 'Antorcha', price: 2, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Fuente de luz' },
    { id: 'obj_farol', name: 'Farol de Aceite', price: 18, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Farol portátil' },
    { id: 'obj_aceite', name: 'Frasco de Aceite', price: 5, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Aceite para faroles' },
    { id: 'obj_pedernal', name: 'Pedernal y Acero', price: 4, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Herramienta para hacer fuego' },
    { id: 'obj_manta', name: 'Manta de Campamento', price: 8, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Manta para dormir' },
    { id: 'obj_racion', name: 'Ración de Viaje (1 día)', price: 3, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Comida para un día' },
    { id: 'obj_cantimplora', name: 'Cantimplora', price: 6, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Recipiente para agua' },
    { id: 'obj_tienda', name: 'Tienda Pequeña', price: 40, category: 'objetos', subcategory: 'Aventurería Básica', description: 'Tienda de campaña' },
    
    // Objetos Mundanos - Utilidades y Herramientas
    { id: 'obj_ganzuas', name: 'Ganzúas Básicas', price: 35, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Set de ganzúas para abrir cerraduras' },
    { id: 'obj_martillo_l', name: 'Martillo Ligero', price: 10, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Martillo pequeño para trabajos' },
    { id: 'obj_caja_herramientas', name: 'Caja de Herramientas Simple', price: 45, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Caja con herramientas básicas' },
    { id: 'obj_pala', name: 'Pala de Acero', price: 20, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Pala resistente para cavar' },
    { id: 'obj_pico', name: 'Pico Minero', price: 30, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Pico para minería' },
    { id: 'obj_sierra', name: 'Sierra Manual', price: 18, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Sierra para cortar madera' },
    { id: 'obj_cadena', name: 'Cadena de Hierro (3m)', price: 25, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Cadena resistente' },
    { id: 'obj_candado', name: 'Candado Reforzado', price: 28, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Candado de seguridad' },
    { id: 'obj_garfio', name: 'Garfio de Escalada', price: 15, category: 'objetos', subcategory: 'Utilidades y Herramientas', description: 'Garfio para escalar' },
    
    // Objetos Mundanos - Escritura y Navegación
    { id: 'obj_libro', name: 'Libro Vacío', price: 20, category: 'objetos', subcategory: 'Escritura y Navegación', description: 'Libro en blanco para escribir' },
    { id: 'obj_pergamino', name: 'Pergamino en Blanco', price: 3, category: 'objetos', subcategory: 'Escritura y Navegación', description: 'Pergamino para documentos' },
    { id: 'obj_tinta', name: 'Tinta Común', price: 5, category: 'objetos', subcategory: 'Escritura y Navegación', description: 'Tinta para escribir' },
    { id: 'obj_pluma', name: 'Pluma de Escritura', price: 2, category: 'objetos', subcategory: 'Escritura y Navegación', description: 'Pluma para escribir' },
    { id: 'obj_mapa', name: 'Mapa Regional', price: 25, category: 'objetos', subcategory: 'Escritura y Navegación', description: 'Mapa de la región' },
    { id: 'obj_brujula', name: 'Brújula', price: 40, category: 'objetos', subcategory: 'Escritura y Navegación', description: 'Brújula para orientarse' },
    { id: 'obj_reloj', name: 'Reloj de Bolsillo Simple', price: 55, category: 'objetos', subcategory: 'Escritura y Navegación', description: 'Reloj de bolsillo básico' },
    
    // Objetos Mundanos - Consumibles Mundanos
    { id: 'obj_jabon', name: 'Jabón Artesanal', price: 2, category: 'objetos', subcategory: 'Consumibles Mundanos', description: 'Jabón para higiene' },
    { id: 'obj_perfume', name: 'Perfume Común', price: 15, category: 'objetos', subcategory: 'Consumibles Mundanos', description: 'Perfume básico' },
    { id: 'obj_sales', name: 'Sales Curativas Básicas', price: 20, category: 'objetos', subcategory: 'Consumibles Mundanos', description: 'Sales para curación' },
    { id: 'obj_vendajes', name: 'Vendajes', price: 6, category: 'objetos', subcategory: 'Consumibles Mundanos', description: 'Vendajes para heridas' },
    { id: 'obj_higiene', name: 'Kit de Higiene', price: 12, category: 'objetos', subcategory: 'Consumibles Mundanos', description: 'Kit de higiene personal' },
    { id: 'obj_alcohol', name: 'Botella de Alcohol Fuerte', price: 10, category: 'objetos', subcategory: 'Consumibles Mundanos', description: 'Alcohol de alta graduación' },
    
    // Baratijas Mágicas
    { id: 'mag_piedra_l', name: 'Piedra Luminosa', price: 15, category: 'baratijas', subcategory: 'Baratijas Arcanas', description: 'Emite luz constante' },
    { id: 'mag_moneda', name: 'Moneda Cambiante', price: 25, category: 'baratijas', subcategory: 'Baratijas Arcanas', description: 'Cambia de valor aleatoriamente' },
    { id: 'mag_brujula', name: 'Brújula Caprichosa', price: 40, category: 'baratijas', subcategory: 'Baratijas Arcanas', description: 'Apunta a lo que deseas' },
    { id: 'mag_cristal', name: 'Cristal Susurrante', price: 55, category: 'baratijas', subcategory: 'Baratijas Arcanas', description: 'Susurra secretos' },
    { id: 'mag_pluma', name: 'Pluma Inagotable', price: 35, category: 'baratijas', subcategory: 'Baratijas Arcanas', description: 'Nunca se acaba la tinta' },
    { id: 'mag_cubo', name: 'Cubo Refrigerante', price: 20, category: 'baratijas', subcategory: 'Baratijas Arcanas', description: 'Enfría objetos' },
    { id: 'mag_encendedor', name: 'Encendedor Arcano', price: 30, category: 'baratijas', subcategory: 'Baratijas Arcanas', description: 'Crea fuego mágico' },
    { id: 'mag_campana', name: 'Campana Etérea', price: 45, category: 'baratijas', subcategory: 'Baratijas Arcanas', description: 'Suena en el plano etéreo' },
    
    // Baratijas Mágicas - Objetos Curiosos
    { id: 'mag_ojo_vidrio', name: 'Ojo de Vidrio Animado', price: 70, category: 'baratijas', subcategory: 'Objetos Curiosos', description: 'Ojo que se mueve por sí solo' },
    { id: 'mag_mascara', name: 'Máscara Sonriente', price: 85, category: 'baratijas', subcategory: 'Objetos Curiosos', description: 'Máscara que siempre sonríe' },
    { id: 'mag_reloj_st', name: 'Reloj Sin Tiempo', price: 95, category: 'baratijas', subcategory: 'Objetos Curiosos', description: 'Reloj que no marca el tiempo' },
    { id: 'mag_llave', name: 'Llave Inservible Misteriosa', price: 25, category: 'baratijas', subcategory: 'Objetos Curiosos', description: 'Llave que no abre nada' },
    { id: 'mag_frasco_niebla', name: 'Frasco de Niebla Viva', price: 90, category: 'baratijas', subcategory: 'Objetos Curiosos', description: 'Niebla que se mueve' },
    { id: 'mag_caja_ecos', name: 'Caja de Ecos', price: 110, category: 'baratijas', subcategory: 'Objetos Curiosos', description: 'Repite sonidos grabados' },
    { id: 'mag_ficha', name: 'Ficha del Apostador Arcano', price: 50, category: 'baratijas', subcategory: 'Objetos Curiosos', description: 'Ficha de juego mágica' },
    
    // Baratijas Mágicas - Baratijas Sociales
    { id: 'mag_anillo', name: 'Anillo de Chispas', price: 45, category: 'baratijas', subcategory: 'Baratijas Sociales', description: 'Emite chispas al moverse' },
    { id: 'mag_broche', name: 'Broche Fragante', price: 35, category: 'baratijas', subcategory: 'Baratijas Sociales', description: 'Emite aroma agradable' },
    { id: 'mag_sombrero', name: 'Sombrero de Apariencia Limpia', price: 75, category: 'baratijas', subcategory: 'Baratijas Sociales', description: 'Mantiene la ropa limpia' },
    { id: 'mag_capa', name: 'Capa de Viento Dramático', price: 120, category: 'baratijas', subcategory: 'Baratijas Sociales', description: 'Se mueve con el viento' },
    { id: 'mag_medallon', name: 'Medallón Musical', price: 80, category: 'baratijas', subcategory: 'Baratijas Sociales', description: 'Toca melodías' },
    { id: 'mag_monoculo', name: 'Monóculo Ilusorio', price: 140, category: 'baratijas', subcategory: 'Baratijas Sociales', description: 'Muestra ilusiones' },
    
    // Baratijas Mágicas - Utilidades Menores
    { id: 'mag_botella', name: 'Botella Autorrellenable', price: 95, category: 'baratijas', subcategory: 'Utilidades Menores', description: 'Se llena sola de agua' },
    { id: 'mag_cuchara', name: 'Cuchara de Sabor Cambiante', price: 35, category: 'baratijas', subcategory: 'Utilidades Menores', description: 'Cambia el sabor de los alimentos' },
    { id: 'mag_tiza', name: 'Tiza Arcana Reutilizable', price: 20, category: 'baratijas', subcategory: 'Utilidades Menores', description: 'Tiza que no se gasta' },
    { id: 'mag_cofre', name: 'Mini Cofre Sellado', price: 130, category: 'baratijas', subcategory: 'Utilidades Menores', description: 'Cofre pequeño mágico' },
    { id: 'mag_bolsita', name: 'Bolsita Conservadora', price: 110, category: 'baratijas', subcategory: 'Utilidades Menores', description: 'Mantiene alimentos frescos' },
    { id: 'mag_piedra_t', name: 'Piedra Térmica', price: 40, category: 'baratijas', subcategory: 'Utilidades Menores', description: 'Mantiene temperatura constante' },
    
    // Baratijas Mágicas - Rarezas y Objetos Extraños
    { id: 'mag_muneco', name: 'Muñeco que Observa', price: 160, category: 'baratijas', subcategory: 'Rarezas y Objetos Extraños', description: 'Muñeco que sigue con la mirada' },
    { id: 'mag_dados', name: 'Dados del Destino Menor', price: 180, category: 'baratijas', subcategory: 'Rarezas y Objetos Extraños', description: 'Dados que influyen en el destino' },
    { id: 'mag_sueno', name: 'Fragmento de Sueño', price: 210, category: 'baratijas', subcategory: 'Rarezas y Objetos Extraños', description: 'Fragmento de un sueño' },
    { id: 'mag_esfera', name: 'Esfera de Sombras Tenues', price: 240, category: 'baratijas', subcategory: 'Rarezas y Objetos Extraños', description: 'Esfera con sombras' },
    { id: 'mag_colmillo', name: 'Colmillo Resonante', price: 260, category: 'baratijas', subcategory: 'Rarezas y Objetos Extraños', description: 'Colmillo que vibra' },
    { id: 'mag_espejo', name: 'Espejo del Otro Lado', price: 300, category: 'baratijas', subcategory: 'Rarezas y Objetos Extraños', description: 'Espejo que refleja otro plano' },
    
    // Monturas
    { id: 'mnt_caballo_t', name: 'Caballo de Trabajo', price: 90, category: 'monturas', subcategory: 'Monturas Comunes', description: 'Caballo para trabajo' },
    { id: 'mnt_caballo_m', name: 'Caballo de Montura', price: 150, category: 'monturas', subcategory: 'Monturas Comunes', description: 'Caballo para montar' },
    { id: 'mnt_poni', name: 'Poni Resistente', price: 75, category: 'monturas', subcategory: 'Monturas Comunes', description: 'Poni resistente' },
    { id: 'mnt_mula', name: 'Mula de Carga', price: 55, category: 'monturas', subcategory: 'Monturas Comunes', description: 'Mula para carga' },
    { id: 'mnt_burro', name: 'Burro de Viaje', price: 40, category: 'monturas', subcategory: 'Monturas Comunes', description: 'Burro para viajes' },
    { id: 'mnt_perro', name: 'Perro de Trineo', price: 65, category: 'monturas', subcategory: 'Monturas Comunes', description: 'Perro para trineo' },
    
    // Monturas Especiales
    { id: 'mnt_ciervo', name: 'Ciervo de Bosque Domesticado', price: 180, category: 'monturas', subcategory: 'Monturas Especiales', description: 'Ciervo domesticado' },
    { id: 'mnt_jabali', name: 'Jabalí de Guerra Joven', price: 220, category: 'monturas', subcategory: 'Monturas Especiales', description: 'Jabalí de combate' },
    { id: 'mnt_lobo', name: 'Lobo Domesticado', price: 260, category: 'monturas', subcategory: 'Monturas Especiales', description: 'Lobo montable' },
    { id: 'mnt_lagarto', name: 'Lagarto de Arena', price: 320, category: 'monturas', subcategory: 'Monturas Especiales', description: 'Lagarto del desierto' },
    { id: 'mnt_carnero', name: 'Carnero Acorazado', price: 320, category: 'monturas', subcategory: 'Monturas Especiales', description: 'Carnero con armadura' },
    
    // Monturas Exóticas
    { id: 'mnt_avestruz', name: 'Avestruz de Carrera', price: 290, category: 'monturas', subcategory: 'Monturas Exóticas', description: 'Avestruz rápido' },
    { id: 'mnt_cabra', name: 'Cabra Montesa Gigante', price: 290, category: 'monturas', subcategory: 'Monturas Exóticas', description: 'Cabra gigante' },
    { id: 'mnt_alce', name: 'Alce de Patrulla', price: 320, category: 'monturas', subcategory: 'Monturas Exóticas', description: 'Alce de patrulla' },
    
    // Vehículos y Transporte
    { id: 'veh_carreta', name: 'Carreta Simple', price: 120, category: 'monturas', subcategory: 'Vehículos y Transporte', description: 'Carreta básica' },
    { id: 'veh_carro', name: 'Carro Reforzado', price: 300, category: 'monturas', subcategory: 'Vehículos y Transporte', description: 'Carro reforzado' },
    { id: 'veh_carreta_c', name: 'Carreta Cubierta', price: 310, category: 'monturas', subcategory: 'Vehículos y Transporte', description: 'Carreta con cubierta' },
    { id: 'veh_trineo', name: 'Trineo de Viaje', price: 110, category: 'monturas', subcategory: 'Vehículos y Transporte', description: 'Trineo para viajes' },
    { id: 'veh_carrito', name: 'Carrito de Mano', price: 95, category: 'monturas', subcategory: 'Vehículos y Transporte', description: 'Carrito manual' },
    
    // Equipamiento para Monturas
    { id: 'eq_silla', name: 'Silla de Montar Común', price: 25, category: 'monturas', subcategory: 'Equipamiento para Monturas', description: 'Silla de montar básica' },
    { id: 'eq_silla_m', name: 'Silla Militar Reforzada', price: 70, category: 'monturas', subcategory: 'Equipamiento para Monturas', description: 'Silla militar' },
    { id: 'eq_alforjas', name: 'Alforjas de Viaje', price: 20, category: 'monturas', subcategory: 'Equipamiento para Monturas', description: 'Bolsas para montura' },
    { id: 'eq_herraduras', name: 'Herraduras Reforzadas', price: 45, category: 'monturas', subcategory: 'Equipamiento para Monturas', description: 'Herraduras mejoradas' },
    { id: 'eq_manta', name: 'Manta Protectora', price: 35, category: 'monturas', subcategory: 'Equipamiento para Monturas', description: 'Manta de protección' },
    { id: 'eq_alimentacion', name: 'Kit de Alimentación Animal', price: 25, category: 'monturas', subcategory: 'Equipamiento para Monturas', description: 'Kit para alimentar animales' },
    
    // Servicios de Monturas
    { id: 'srv_establo', name: 'Establo Diario', price: 5, category: 'monturas', subcategory: 'Servicios', description: 'Alojamiento por día' },
    { id: 'srv_entrenamiento_b', name: 'Entrenamiento Básico', price: 40, category: 'monturas', subcategory: 'Servicios', description: 'Entrenamiento básico' },
    { id: 'srv_entrenamiento_c', name: 'Entrenamiento de Combate', price: 120, category: 'monturas', subcategory: 'Servicios', description: 'Entrenamiento de combate' },
    { id: 'srv_veterinaria', name: 'Curación Veterinaria', price: 35, category: 'monturas', subcategory: 'Servicios', description: 'Servicio veterinario' },
    { id: 'srv_herraduras_r', name: 'Reemplazo de Herraduras', price: 20, category: 'monturas', subcategory: 'Servicios', description: 'Cambio de herraduras' },
    
    // Personalización de Armas
    { id: 'wep_grabado', name: 'Grabado Simple', price: 20, category: 'armas', subcategory: 'Personalización de Armas', description: 'Grabado básico en arma' },
    { id: 'wep_cosmetico', name: 'Cambio Cosmético', price: 80, category: 'armas', subcategory: 'Personalización de Armas', description: 'Cambio de apariencia' },
    { id: 'wep_empuñadura', name: 'Reforjado de Empuñadura', price: 180, category: 'armas', subcategory: 'Personalización de Armas', description: 'Nueva empuñadura reforzada' },
    { id: 'wep_engaste', name: 'Engaste para Ziidov', price: 300, category: 'armas', subcategory: 'Personalización de Armas', description: 'Engaste especial para Ziidov' },
    { id: 'wep_restauracion', name: 'Restauración Completa', price: 500, category: 'armas', subcategory: 'Personalización de Armas', description: 'Restauración total del arma' },
    
    // Mejoras y Reparaciones de Armaduras
    { id: 'arm_pulido', name: 'Pulido Básico', price: 15, category: 'armaduras', subcategory: 'Mejoras y Reparaciones', description: 'Pulido de armadura' },
    { id: 'arm_correas', name: 'Refuerzo de Correas', price: 30, category: 'armaduras', subcategory: 'Mejoras y Reparaciones', description: 'Refuerzo de correas' },
    { id: 'arm_tamano', name: 'Ajuste de Tamaño', price: 45, category: 'armaduras', subcategory: 'Mejoras y Reparaciones', description: 'Ajuste a medida' },
    { id: 'arm_reparacion', name: 'Reparación Completa', price: 90, category: 'armaduras', subcategory: 'Mejoras y Reparaciones', description: 'Reparación total' },
    { id: 'arm_grabado', name: 'Grabado Personalizado', price: 120, category: 'armaduras', subcategory: 'Mejoras y Reparaciones', description: 'Grabado personalizado' },
    { id: 'arm_engaste', name: 'Engaste para Ziidov', price: 250, category: 'armaduras', subcategory: 'Mejoras y Reparaciones', description: 'Engaste especial para Ziidov' },
];

// Default redemption codes
const defaultCodes = [
    {
        code: 'CRYPTA',
        reward: '100 BLINES',
        description: 'Recompensa de bienvenida',
        uses: -1, // -1 = unlimited
        active: true,
        expires: null
    },
    {
        code: 'GHOST',
        reward: 'Item aleatorio de Tienda Fantasma',
        description: 'Recompensa misteriosa',
        uses: 1,
        active: true,
        expires: null
    }
];

// Ghost shop configuration
const defaultGhostShopConfig = {
    rotationDays: 7,
    offerCount: 8,
    lastRotation: null,
    currentOffers: []
};

// Initialize market data
function initializeMarketData() {
    const currentVersion = localStorage.getItem(MARKET_STORAGE_KEY);
    
    if (currentVersion !== MARKET_DATA_VERSION) {
        console.log('Inicializando datos del Market versión', MARKET_DATA_VERSION);
        
        // Load categories
        if (!localStorage.getItem('market_categories')) {
            localStorage.setItem('market_categories', JSON.stringify(defaultMarketCategories));
        }
        
        // Load items
        if (!localStorage.getItem('market_items')) {
            localStorage.setItem('market_items', JSON.stringify(defaultMarketItems));
        }
        
        // Load codes
        if (!localStorage.getItem('market_codes')) {
            localStorage.setItem('market_codes', JSON.stringify(defaultCodes));
        }
        
        // Load ghost shop config
        if (!localStorage.getItem('market_ghost_config')) {
            localStorage.setItem('market_ghost_config', JSON.stringify(defaultGhostShopConfig));
        }
        
        localStorage.setItem(MARKET_STORAGE_KEY, MARKET_DATA_VERSION);
        console.log('Datos del Market inicializados');
    }
}

// Get all categories
function getCategories() {
    const data = localStorage.getItem('market_categories');
    return data ? JSON.parse(data) : defaultMarketCategories;
}

// Get all items
function getItems() {
    const data = localStorage.getItem('market_items');
    return data ? JSON.parse(data) : defaultMarketItems;
}

// Get items by category
function getItemsByCategory(categoryId) {
    const items = getItems();
    return items.filter(item => item.category === categoryId);
}

// Get all codes
function getCodes() {
    const data = localStorage.getItem('market_codes');
    return data ? JSON.parse(data) : defaultCodes;
}

// Get ghost shop config
function getGhostShopConfig() {
    const data = localStorage.getItem('market_ghost_config');
    return data ? JSON.parse(data) : defaultGhostShopConfig;
}

// Save categories
function saveCategories(categories) {
    localStorage.setItem('market_categories', JSON.stringify(categories));
}

// Save items
function saveItems(items) {
    localStorage.setItem('market_items', JSON.stringify(items));
}

// Save codes
function saveCodes(codes) {
    localStorage.setItem('market_codes', JSON.stringify(codes));
}

// Save ghost shop config
function saveGhostShopConfig(config) {
    localStorage.setItem('market_ghost_config', JSON.stringify(config));
}

// Add new category
function addCategory(category) {
    const categories = getCategories();
    category.id = category.id || 'cat_' + Date.now();
    categories.push(category);
    saveCategories(categories);
    return category;
}

// Update category
function updateCategory(categoryId, updates) {
    const categories = getCategories();
    const index = categories.findIndex(c => c.id === categoryId);
    if (index !== -1) {
        categories[index] = { ...categories[index], ...updates };
        saveCategories(categories);
        return categories[index];
    }
    return null;
}

// Delete category
function deleteCategory(categoryId) {
    const categories = getCategories();
    const filtered = categories.filter(c => c.id !== categoryId);
    saveCategories(filtered);
}

// Add new item
function addItem(item) {
    const items = getItems();
    item.id = item.id || 'item_' + Date.now();
    items.push(item);
    saveItems(items);
    return item;
}

// Update item
function updateItem(itemId, updates) {
    const items = getItems();
    const index = items.findIndex(i => i.id === itemId);
    if (index !== -1) {
        items[index] = { ...items[index], ...updates };
        saveItems(items);
        return items[index];
    }
    return null;
}

// Delete item
function deleteItem(itemId) {
    const items = getItems();
    const filtered = items.filter(i => i.id !== itemId);
    saveItems(filtered);
}

// Add new code
function addCode(code) {
    const codes = getCodes();
    codes.push(code);
    saveCodes(codes);
    return code;
}

// Update code
function updateCode(codeStr, updates) {
    const codes = getCodes();
    const index = codes.findIndex(c => c.code === codeStr);
    if (index !== -1) {
        codes[index] = { ...codes[index], ...updates };
        saveCodes(codes);
        return codes[index];
    }
    return null;
}

// Delete code
function deleteCode(codeStr) {
    const codes = getCodes();
    const filtered = codes.filter(c => c.code !== codeStr);
    saveCodes(filtered);
}

// Validate and redeem code
function redeemCode(codeStr) {
    const codes = getCodes();
    const codeIndex = codes.findIndex(c => c.code === codeStr && c.active);
    
    if (codeIndex === -1) {
        return { success: false, message: 'Código inválido o inactivo' };
    }
    
    const code = codes[codeIndex];
    
    // Check expiration
    if (code.expires && new Date(code.expires) < new Date()) {
        return { success: false, message: 'Código expirado' };
    }
    
    // Check uses
    if (code.uses !== -1 && code.uses <= 0) {
        return { success: false, message: 'Código sin usos disponibles' };
    }
    
    // Decrement uses if limited
    if (code.uses !== -1) {
        code.uses--;
        codes[codeIndex] = code;
        saveCodes(codes);
    }
    
    return { 
        success: true, 
        reward: code.reward, 
        description: code.description 
    };
}

// Generate random ghost shop offers
function generateGhostShopOffers() {
    const config = getGhostShopConfig();
    const items = getItems();
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const offers = shuffled.slice(0, config.offerCount);
    
    config.lastRotation = new Date().toISOString();
    config.currentOffers = offers;
    saveGhostShopConfig(config);
    
    return offers;
}

// Check if ghost shop needs rotation
function checkGhostShopRotation() {
    const config = getGhostShopConfig();
    
    if (!config.lastRotation) {
        return true;
    }
    
    const lastRotation = new Date(config.lastRotation);
    const now = new Date();
    const daysSinceRotation = (now - lastRotation) / (1000 * 60 * 60 * 24);
    
    return daysSinceRotation >= config.rotationDays;
}

// Get current ghost shop offers (rotate if needed)
function getCurrentGhostShopOffers() {
    if (checkGhostShopRotation()) {
        return generateGhostShopOffers();
    }
    
    const config = getGhostShopConfig();
    return config.currentOffers || [];
}

// Get time until next rotation
function getTimeUntilRotation() {
    const config = getGhostShopConfig();
    
    if (!config.lastRotation) {
        return 0;
    }
    
    const lastRotation = new Date(config.lastRotation);
    const nextRotation = new Date(lastRotation.getTime() + (config.rotationDays * 24 * 60 * 60 * 1000));
    const now = new Date();
    
    const diff = nextRotation - now;
    return Math.max(0, diff);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initializeMarketData();
});

// Make functions available globally
window.MarketData = {
    getCategories,
    getItems,
    getItemsByCategory,
    getCodes,
    getGhostShopConfig,
    saveCategories,
    saveItems,
    saveCodes,
    saveGhostShopConfig,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
    addCode,
    updateCode,
    deleteCode,
    redeemCode,
    generateGhostShopOffers,
    checkGhostShopRotation,
    getCurrentGhostShopOffers,
    getTimeUntilRotation,
    initializeMarketData
};
