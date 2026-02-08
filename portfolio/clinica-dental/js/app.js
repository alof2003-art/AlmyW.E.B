/* ============================================
   INICIALIZADOR DE LA APLICACIÓN
   Punto de entrada principal
   ============================================ */

/**
 * Inicializa toda la aplicación cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DentalPro - Iniciando aplicación...');

    // Inicializar la base de datos
    initDatabase();
    console.log('Base de datos inicializada');

    // Inicializar el calendario
    initCalendar();
    console.log('Calendario inicializado');

    // Inicializar la interfaz de usuario
    initUI();
    console.log('Interfaz de usuario inicializada');

    // Agregar animaciones de entrada
    addEntryAnimations();

    console.log('DentalPro - Aplicación lista');
});

/**
 * Agrega animaciones de entrada a los elementos
 */
function addEntryAnimations() {
    // Animar las tarjetas de estadísticas
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
        }, index * 100);
    });
}

/**
 * Maneja errores globales
 */
window.addEventListener('error', (event) => {
    console.error('Error global capturado:', event.error);
});

/**
 * Maneja promesas rechazadas no capturadas
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada no capturada:', event.reason);
});

/**
 * Función de utilidad para debugging
 */
function debug() {
    console.log('=== DEBUG INFO ===');
    console.log('Estado del Calendario:', CalendarState);
    console.log('Total de Citas:', DATABASE.citas.length);
    console.log('Doctores:', DATABASE.doctores);
    console.log('Tratamientos:', DATABASE.tratamientos);
    console.log('==================');
}

// Exponer función de debug globalmente para desarrollo
window.debugDentalPro = debug;
