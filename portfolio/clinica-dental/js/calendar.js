/* ============================================
   MOTOR DEL CALENDARIO
   Maneja el cálculo y renderizado del calendario
   ============================================ */

// Estado del calendario
const CalendarState = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    selectedDate: null
};

/**
 * Clase principal del Calendario
 */
class CalendarApp {
    constructor() {
        this.state = CalendarState;
        this.gridElement = document.getElementById('calendarGrid');
        this.monthElement = document.getElementById('currentMonth');
    }

    /**
     * Inicializa el calendario
     */
    init() {
        this.render();
        this.attachEvents();
    }

    /**
     * Renderiza el calendario completo
     */
    render() {
        this.updateMonthDisplay();
        this.renderCalendarGrid();
        this.updateStats();
    }

    /**
     * Actualiza el texto del mes actual
     */
    updateMonthDisplay() {
        const monthName = getMonthName(this.state.currentMonth);
        this.monthElement.textContent = `${monthName} ${this.state.currentYear}`;
    }

    /**
     * Renderiza la cuadrícula del calendario
     * Usa CSS Grid para una disposición perfecta de 7 columnas
     */
    renderCalendarGrid() {
        // Limpiar el grid
        this.gridElement.innerHTML = '';

        // Renderizar encabezados de días
        const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        diasSemana.forEach(dia => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = dia;
            this.gridElement.appendChild(header);
        });

        // Calcular días del mes
        const primerDia = new Date(this.state.currentYear, this.state.currentMonth, 1);
        const ultimoDia = new Date(this.state.currentYear, this.state.currentMonth + 1, 0);
        const diasEnMes = ultimoDia.getDate();
        const primerDiaSemana = primerDia.getDay();

        // Calcular días del mes anterior para rellenar
        const mesAnterior = new Date(this.state.currentYear, this.state.currentMonth, 0);
        const diasMesAnterior = mesAnterior.getDate();

        // Renderizar días del mes anterior (relleno)
        for (let i = primerDiaSemana - 1; i >= 0; i--) {
            const dia = diasMesAnterior - i;
            const dayElement = this.createDayElement(dia, true);
            this.gridElement.appendChild(dayElement);
        }

        // Renderizar días del mes actual
        for (let dia = 1; dia <= diasEnMes; dia++) {
            const dayElement = this.createDayElement(dia, false);
            this.gridElement.appendChild(dayElement);
        }

        // Calcular cuántos días del siguiente mes necesitamos
        const totalCeldas = this.gridElement.children.length - 7; // Restar los headers
        const celdasRestantes = 42 - totalCeldas; // 6 semanas * 7 días = 42

        // Renderizar días del mes siguiente (relleno)
        for (let dia = 1; dia <= celdasRestantes; dia++) {
            const dayElement = this.createDayElement(dia, true);
            this.gridElement.appendChild(dayElement);
        }
    }

    /**
     * Crea un elemento de día del calendario
     * @param {number} dia - Número del día
     * @param {boolean} otherMonth - Si pertenece a otro mes
     * @returns {HTMLElement} Elemento del día
     */
    createDayElement(dia, otherMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (otherMonth) {
            dayElement.classList.add('other-month');
        }

        // Crear el número del día
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = dia;
        dayElement.appendChild(dayNumber);

        // Si no es de otro mes, verificar citas y estado
        if (!otherMonth) {
            const fecha = this.getDateString(dia);
            const citas = getCitasByDate(fecha);

            // Marcar si es hoy
            if (this.isToday(dia)) {
                dayElement.classList.add('is-today');
            }

            // Agregar indicadores de citas
            if (citas.length > 0) {
                dayElement.classList.add('has-appointments');
                const indicators = this.createAppointmentIndicators(citas);
                dayElement.appendChild(indicators);
            }

            // Agregar evento de clic
            dayElement.addEventListener('click', () => {
                this.handleDayClick(fecha, citas);
            });
        }

        return dayElement;
    }

    /**
     * Crea los indicadores visuales de citas
     * @param {Array} citas - Array de citas del día
     * @returns {HTMLElement} Contenedor de indicadores
     */
    createAppointmentIndicators(citas) {
        const container = document.createElement('div');
        container.className = 'day-indicators';

        // Mostrar máximo 3 indicadores
        const maxIndicators = Math.min(citas.length, 3);
        
        for (let i = 0; i < maxIndicators; i++) {
            const dot = document.createElement('div');
            dot.className = `appointment-dot ${citas[i].estado}`;
            container.appendChild(dot);
        }

        return container;
    }

    /**
     * Verifica si un día es hoy
     * @param {number} dia - Número del día
     * @returns {boolean} true si es hoy
     */
    isToday(dia) {
        const hoy = new Date();
        return hoy.getDate() === dia &&
               hoy.getMonth() === this.state.currentMonth &&
               hoy.getFullYear() === this.state.currentYear;
    }

    /**
     * Obtiene la fecha en formato YYYY-MM-DD
     * @param {number} dia - Número del día
     * @returns {string} Fecha formateada
     */
    getDateString(dia) {
        const year = this.state.currentYear;
        const month = String(this.state.currentMonth + 1).padStart(2, '0');
        const day = String(dia).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Maneja el clic en un día del calendario
     * @param {string} fecha - Fecha en formato YYYY-MM-DD
     * @param {Array} citas - Array de citas del día
     */
    handleDayClick(fecha, citas) {
        this.state.selectedDate = fecha;
        showAppointmentsModal(fecha, citas);
    }

    /**
     * Navega al mes anterior
     */
    previousMonth() {
        if (this.state.currentMonth === 0) {
            this.state.currentMonth = 11;
            this.state.currentYear--;
        } else {
            this.state.currentMonth--;
        }
        this.render();
    }

    /**
     * Navega al mes siguiente
     */
    nextMonth() {
        if (this.state.currentMonth === 11) {
            this.state.currentMonth = 0;
            this.state.currentYear++;
        } else {
            this.state.currentMonth++;
        }
        this.render();
    }

    /**
     * Actualiza las estadísticas del dashboard
     */
    updateStats() {
        // Pacientes hoy
        const citasHoy = getCitasHoy();
        document.getElementById('statPacientesHoy').textContent = citasHoy.length;

        // Ingresos del mes
        const ingresos = calcularIngresosMes(this.state.currentYear, this.state.currentMonth);
        document.getElementById('statIngresos').textContent = `$${ingresos.toLocaleString()}`;

        // Citas pendientes
        const citasMes = getCitasByMonth(this.state.currentYear, this.state.currentMonth);
        const pendientes = citasMes.filter(cita => cita.estado === 'pending').length;
        document.getElementById('statPendientes').textContent = pendientes;

        // Ocupación
        const ocupacion = calcularOcupacion(this.state.currentYear, this.state.currentMonth);
        document.getElementById('statOcupacion').textContent = `${ocupacion}%`;
    }

    /**
     * Adjunta los eventos de navegación
     */
    attachEvents() {
        document.getElementById('btnPrevMonth').addEventListener('click', () => {
            this.previousMonth();
        });

        document.getElementById('btnNextMonth').addEventListener('click', () => {
            this.nextMonth();
        });
    }

    /**
     * Refresca el calendario (útil después de agregar una cita)
     */
    refresh() {
        this.render();
    }
}

// Instancia global del calendario
let calendarApp;

/**
 * Inicializa el calendario cuando el DOM esté listo
 */
function initCalendar() {
    calendarApp = new CalendarApp();
    calendarApp.init();
}
