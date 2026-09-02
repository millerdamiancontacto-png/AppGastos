// --- 1. Lógica de Interfaz de Usuario ---

// Cambiar Tema (Modo Claro / Oscuro)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Cargar tema guardado
if (localStorage.getItem('theme') === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

// Sistema de Navegación Simple (SPA)
function navigateTo(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
}

// --- 2. Configuración Base de IndexedDB ---

let db;
const request = indexedDB.open('FinanzasAppDB', 1);

// Configurar la estructura de la base de datos (Se ejecuta al crear o actualizar la versión)
request.onupgradeneeded = function(event) {
    db = event.target.result;
    
    // Tabla para Mi Clio
    if (!db.objectStoreNames.contains('gastos_clio')) {
        const clioStore = db.createObjectStore('gastos_clio', { keyPath: 'id', autoIncrement: true });
        clioStore.createIndex('categoria', 'categoria', { unique: false });
        clioStore.createIndex('fecha', 'fecha', { unique: false });
    }
    
    // Tabla para Hogar
    if (!db.objectStoreNames.contains('gastos_hogar')) {
        db.createObjectStore('gastos_hogar', { keyPath: 'id', autoIncrement: true });
    }
    
    // Tabla para Mascotas
    if (!db.objectStoreNames.contains('mascotas_perfiles')) {
        db.createObjectStore('mascotas_perfiles', { keyPath: 'id', autoIncrement: true });
    }
    
    // Tabla para Ingresos
    if (!db.objectStoreNames.contains('ingresos')) {
        db.createObjectStore('ingresos', { keyPath: 'id', autoIncrement: true });
    }
    
    console.log("Base de datos estructurada con éxito.");
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("IndexedDB conectada exitosamente.");
    // Aquí puedes cargar los datos iniciales al arrancar la app
};

request.onerror = function(event) {
    console.error("Error al abrir IndexedDB", event.target.error);
};