/* ============================================
   BASE DE DATOS SIMULADA (MOCK DATA)
   Este archivo simula una API y maneja la persistencia local
   ============================================ */

// Base de datos en memoria
const DATABASE = {
    // Array de doctores
    doctores: [
        {
            id: 1,
            nombre: 'Dr. Carlos Rodríguez',
            especialidad: 'Odontología General',
            avatar: 'CR'
        },
        {
            id: 2,
            nombre: 'Dra. María González',
            especialidad: 'Ortodoncia',
            avatar: 'MG'
        },
        {
            id: 3,
            nombre: 'Dr. Juan Martínez',
            especialidad: 'Endodoncia',
            avatar: 'JM'
        }
    ],

    // Array de tratamientos con precios
    tratamientos: [
        { id: 1, nombre: 'Limpieza Dental', precio: 50, duracion: 30 },
        { id: 2, nombre: 'Ortodoncia', precio: 1200, duracion: 60 },
        { id: 3, nombre: 'Endodoncia', precio: 300, duracion: 90 },
        { id: 4, nombre: 'Implante Dental', precio: 800, duracion: 120 },
        { id: 5, nombre: 'Blanqueamiento', precio: 200, duracion: 45 },
        { id: 6, nombre: 'Extracción', precio: 80, duracion: 30 },
        { id: 7, nombre: 'Corona Dental', precio: 400, duracion: 60 }
    ],

    // Array de citas (se cargará desde localStorage o usará datos por defecto)
    citas: []
};

// Datos de citas por defecto para el mes actual
const CITAS_DEFAULT = [
    {
        id: 1,
        paciente: 'Ana Martínez',
        fecha: '2026-02-05',
        hora: '09:00',
        tratamiento: 'Limpieza Dental',
        doctor_id: 1,
        estado: 'confirmed',
        precio: 50
    },
    {
        id: 2,
        paciente: 'Carlos López',
        fecha: '2026-02-05',
        hora: '10:30',
        tratamiento: 'Ortodoncia',
        doctor_id: 2,
        estado: 'confirmed',
        precio: 1200
    },
    {
        id: 3,
        paciente: 'María Fernández',
        fecha: '2026-02-05',
        hora: '14:00',
        tratamiento: 'Endodoncia',
        doctor_id: 3,
        estado: 'pending',
        precio: 300
    },
    {
        id: 4,
        paciente: 'Roberto Silva',
        fecha: '2026-02-07',
        hora: '11:00',
        tratamiento: 'Implante Dental',
        doctor_id: 1,
        estado: 'confirmed',
        precio: 800
    },
    {
        id: 5,
        paciente: 'Laura Gómez',
        fecha: '2026-02-07',
        hora: '15:30',
        tratamiento: 'Blanqueamiento',
        doctor_id: 2,
        estado: 'confirmed',
        precio: 200
    },
    {
        id: 6,
        paciente: 'Pedro Ramírez',
        fecha: '2026-02-10',
        hora: '09:30',
        tratamiento: 'Extracción',
        doctor_id: 3,
        estado: 'pending',
        precio: 80
    },
    {
        id: 7,
        paciente: 'Elena Vargas',
        fecha: '2026-02-10',
        hora: '11:00',
        tratamiento: 'Corona Dental',
        doctor_id: 1,
        estado: 'confirmed',
        precio: 400
    },
    {
        id: 8,
        paciente: 'Diego Torres',
        fecha: '2026-02-12',
        hora: '10:00',
        tratamiento: 'Limpieza Dental',
        doctor_id: 2,
        estado: 'confirmed',
        precio: 50
    },
    {
        id: 9,
        paciente: 'Sofía Morales',
        fecha: '2026-02-14',
        hora: '16:00',
        tratamiento: 'Ortodoncia',
        doctor_id: 2,
        estado: 'pending',
        precio: 1200
    },
    {
        id: 10,
        paciente: 'Andrés Castro',
        fecha: '2026-02-15',
        hora: '09:00',
        tratamiento: 'Endodoncia',
        doctor_id: 3,
        estado: 'confirmed',
        precio: 300
    },
    {
        id: 11,
        paciente: 'Valentina Ruiz',
        fecha: '2026-02-18',
        hora: '14:30',
        tratamiento: 'Blanqueamiento',
        doctor_id: 1,
        estado: 'confirmed',
        precio: 200
    },
    {
        id: 12,
        paciente: 'Javier Mendoza',
        fecha: '2026-02-20',
        hora: '10:30',
        tratamiento: 'Implante Dental',
        doctor_id: 1,
        estado: 'pending',
        precio: 800
    },
    {
        id: 13,
        paciente: 'Camila Herrera',
        fecha: '2026-02-22',
        hora: '15:00',
        tratamiento: 'Limpieza Dental',
        doctor_id: 2,
        estado: 'confirmed',
        precio: 50
    },
    {
        id: 14,
        paciente: 'Lucas Ortiz',
        fecha: '2026-02-25',
        hora: '11:30',
        tratamiento: 'Corona Dental',
        doctor_id: 3,
        estado: 'confirmed',
        precio: 400
    },
    {
        id: 15,
        paciente: 'Isabella Rojas',
        fecha: '2026-02-28',
        hora: '09:30',
        tratamiento: 'Extracción',
        doctor_id: 1,
        estado: 'pending',
        precio: 80
    }
];

/* ============================================
   FUNCIONES DE GESTIÓN DE DATOS
   ============================================ */

/**
 * Inicializa la base de datos cargando desde localStorage
 * o usando datos por defecto si no existen
 */
function initDatabase() {
    const savedCitas = localStorage.getItem('dentalPro_citas');
    
    if (savedCitas) {
        try {
            DATABASE.citas = JSON.parse(savedCitas);
        } catch (error) {
            console.error('Error al cargar citas desde localStorage:', error);
            DATABASE.citas = [...CITAS_DEFAULT];
        }
    } else {
        DATABASE.citas = [...CITAS_DEFAULT];
        saveToLocalStorage();
    }
}

/**
 * Guarda las citas en localStorage
 */
function saveToLocalStorage() {
    try {
        localStorage.setItem('dentalPro_citas', JSON.stringify(DATABASE.citas));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

/**
 * Obtiene todas las citas de un mes específico
 * @param {number} year - Año
 * @param {number} month - Mes (0-11)
 * @returns {Array} Array de citas del mes
 */
function getCitasByMonth(year, month) {
    return DATABASE.citas.filter(cita => {
        const citaDate = new Date(cita.fecha);
        return citaDate.getFullYear() === year && citaDate.getMonth() === month;
    });
}

/**
 * Obtiene todas las citas de un día específico
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @returns {Array} Array de citas del día
 */
function getCitasByDate(fecha) {
    return DATABASE.citas.filter(cita => cita.fecha === fecha)
        .sort((a, b) => a.hora.localeCompare(b.hora));
}

/**
 * Obtiene las citas del día actual
 * @returns {Array} Array de citas de hoy
 */
function getCitasHoy() {
    const hoy = new Date();
    const fechaHoy = formatDate(hoy);
    return getCitasByDate(fechaHoy);
}

/**
 * Agrega una nueva cita a la base de datos
 * @param {Object} cita - Objeto con los datos de la cita
 * @returns {Object} La cita creada con su ID
 */
function addCita(cita) {
    // Generar un nuevo ID
    const newId = DATABASE.citas.length > 0 
        ? Math.max(...DATABASE.citas.map(c => c.id)) + 1 
        : 1;
    
    const newCita = {
        id: newId,
        ...cita,
        estado: cita.estado || 'pending'
    };
    
    DATABASE.citas.push(newCita);
    saveToLocalStorage();
    
    return newCita;
}

/**
 * Verifica si hay conflicto de horario
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} hora - Hora en formato HH:MM
 * @param {number} doctor_id - ID del doctor
 * @returns {boolean} true si hay conflicto
 */
function checkConflicto(fecha, hora, doctor_id) {
    return DATABASE.citas.some(cita => 
        cita.fecha === fecha && 
        cita.hora === hora && 
        cita.doctor_id === doctor_id &&
        cita.estado !== 'canceled'
    );
}

/**
 * Calcula los ingresos totales del mes
 * @param {number} year - Año
 * @param {number} month - Mes (0-11)
 * @returns {number} Total de ingresos
 */
function calcularIngresosMes(year, month) {
    const citasMes = getCitasByMonth(year, month);
    return citasMes
        .filter(cita => cita.estado === 'confirmed')
        .reduce((total, cita) => total + (cita.precio || 0), 0);
}

/**
 * Calcula el porcentaje de ocupación del mes
 * @param {number} year - Año
 * @param {number} month - Mes (0-11)
 * @returns {number} Porcentaje de ocupación
 */
function calcularOcupacion(year, month) {
    const citasMes = getCitasByMonth(year, month);
    const citasConfirmadas = citasMes.filter(cita => cita.estado === 'confirmed').length;
    
    // Asumiendo 8 horas al día, 5 días a la semana, 4 semanas al mes
    // y citas de 1 hora en promedio = 160 slots disponibles
    const slotsDisponibles = 160;
    
    return Math.min(Math.round((citasConfirmadas / slotsDisponibles) * 100), 100);
}

/**
 * Obtiene un doctor por su ID
 * @param {number} id - ID del doctor
 * @returns {Object|null} Objeto doctor o null
 */
function getDoctorById(id) {
    return DATABASE.doctores.find(doctor => doctor.id === id) || null;
}

/**
 * Formatea una fecha a YYYY-MM-DD
 * @param {Date} date - Objeto Date
 * @returns {string} Fecha formateada
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Obtiene el nombre del mes en español
 * @param {number} month - Mes (0-11)
 * @returns {string} Nombre del mes
 */
function getMonthName(month) {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[month];
}

// Inicializar la base de datos al cargar el script
initDatabase();
