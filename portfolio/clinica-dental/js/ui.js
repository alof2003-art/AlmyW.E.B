/* ============================================
   GESTIÓN DE LA INTERFAZ DE USUARIO
   Maneja modales, formularios y notificaciones
   ============================================ */

/**
 * Muestra el modal con las citas del día
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {Array} citas - Array de citas del día
 */
function showAppointmentsModal(fecha, citas) {
    const modal = document.getElementById('modalCitas');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // Formatear la fecha para el título
    const dateObj = new Date(fecha + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = dateObj.toLocaleDateString('es-ES', options);

    modalTitle.textContent = `Citas - ${fechaFormateada}`;

    // Limpiar el cuerpo del modal
    modalBody.innerHTML = '';

    if (citas.length === 0) {
        // No hay citas
        const emptyMessage = document.createElement('div');
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '2rem';
        emptyMessage.style.color = 'var(--text-secondary)';
        emptyMessage.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem; opacity: 0.5;">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <p>No hay citas programadas para este día</p>
        `;
        modalBody.appendChild(emptyMessage);

        // Botón para agregar cita
        const btnAgregar = document.createElement('button');
        btnAgregar.className = 'btn-primary';
        btnAgregar.style.width = '100%';
        btnAgregar.style.marginTop = '1rem';
        btnAgregar.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Agregar Cita
        `;
        btnAgregar.addEventListener('click', () => {
            showNewAppointmentForm(fecha);
        });
        modalBody.appendChild(btnAgregar);
    } else {
        // Crear lista de citas
        const appointmentList = document.createElement('div');
        appointmentList.className = 'appointment-list';

        citas.forEach(cita => {
            const item = createAppointmentItem(cita);
            appointmentList.appendChild(item);
        });

        modalBody.appendChild(appointmentList);

        // Botón para agregar más citas
        const btnAgregar = document.createElement('button');
        btnAgregar.className = 'btn-primary';
        btnAgregar.style.width = '100%';
        btnAgregar.style.marginTop = '1.5rem';
        btnAgregar.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Agregar Otra Cita
        `;
        btnAgregar.addEventListener('click', () => {
            showNewAppointmentForm(fecha);
        });
        modalBody.appendChild(btnAgregar);
    }

    // Mostrar el modal
    modal.classList.add('active');
}

/**
 * Crea un elemento de cita para la lista
 * @param {Object} cita - Objeto de cita
 * @returns {HTMLElement} Elemento de cita
 */
function createAppointmentItem(cita) {
    const item = document.createElement('div');
    item.className = 'appointment-item';

    const doctor = getDoctorById(cita.doctor_id);
    const doctorName = doctor ? doctor.nombre : 'Doctor no asignado';

    // Traducir estado
    const estadoTexto = {
        'confirmed': 'Confirmada',
        'pending': 'Pendiente',
        'canceled': 'Cancelada'
    };

    item.innerHTML = `
        <div class="appointment-time">${cita.hora}</div>
        <div class="appointment-info">
            <div class="appointment-patient">${cita.paciente}</div>
            <div class="appointment-treatment">${cita.tratamiento} - ${doctorName}</div>
        </div>
        <div class="appointment-badge ${cita.estado}">${estadoTexto[cita.estado]}</div>
    `;

    return item;
}

/**
 * Muestra el formulario para agregar una nueva cita
 * @param {string} fecha - Fecha preseleccionada
 */
function showNewAppointmentForm(fecha) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = 'Nueva Cita';
    modalBody.innerHTML = '';

    const form = document.createElement('form');
    form.className = 'appointment-form';
    form.id = 'formNuevaCita';

    form.innerHTML = `
        <div class="form-group">
            <label class="form-label">Nombre del Paciente</label>
            <input type="text" class="form-input" id="inputPaciente" required placeholder="Ej: Juan Pérez">
        </div>

        <div class="form-group">
            <label class="form-label">Fecha</label>
            <input type="date" class="form-input" id="inputFecha" value="${fecha}" required>
        </div>

        <div class="form-group">
            <label class="form-label">Hora</label>
            <input type="time" class="form-input" id="inputHora" required>
        </div>

        <div class="form-group">
            <label class="form-label">Tratamiento</label>
            <select class="form-select" id="inputTratamiento" required>
                <option value="">Seleccionar tratamiento</option>
                ${DATABASE.tratamientos.map(t => 
                    `<option value="${t.nombre}" data-precio="${t.precio}">${t.nombre} - $${t.precio}</option>`
                ).join('')}
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">Doctor</label>
            <select class="form-select" id="inputDoctor" required>
                <option value="">Seleccionar doctor</option>
                ${DATABASE.doctores.map(d => 
                    `<option value="${d.id}">${d.nombre} - ${d.especialidad}</option>`
                ).join('')}
            </select>
        </div>

        <div class="form-actions">
            <button type="button" class="btn-secondary" id="btnCancelar">Cancelar</button>
            <button type="submit" class="btn-submit">Guardar Cita</button>
        </div>
    `;

    modalBody.appendChild(form);

    // Event listeners
    document.getElementById('btnCancelar').addEventListener('click', () => {
        closeModal();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleNewAppointment();
    });
}

/**
 * Maneja el envío del formulario de nueva cita
 */
function handleNewAppointment() {
    const paciente = document.getElementById('inputPaciente').value.trim();
    const fecha = document.getElementById('inputFecha').value;
    const hora = document.getElementById('inputHora').value;
    const tratamientoSelect = document.getElementById('inputTratamiento');
    const tratamiento = tratamientoSelect.value;
    const precio = parseInt(tratamientoSelect.selectedOptions[0].dataset.precio);
    const doctor_id = parseInt(document.getElementById('inputDoctor').value);

    // Validar campos
    if (!paciente || !fecha || !hora || !tratamiento || !doctor_id) {
        showToast('Por favor complete todos los campos', 'error');
        return;
    }

    // Verificar conflicto de horario
    if (checkConflicto(fecha, hora, doctor_id)) {
        showToast('Ya existe una cita en ese horario para este doctor', 'error');
        // Agregar animación de shake al formulario
        const form = document.getElementById('formNuevaCita');
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 500);
        return;
    }

    // Crear la cita
    const nuevaCita = {
        paciente,
        fecha,
        hora,
        tratamiento,
        doctor_id,
        precio,
        estado: 'pending'
    };

    addCita(nuevaCita);

    // Cerrar modal y actualizar
    closeModal();
    calendarApp.refresh();
    showToast('Cita agregada exitosamente');
}

/**
 * Cierra el modal
 */
function closeModal() {
    const modal = document.getElementById('modalCitas');
    modal.classList.remove('active');
}

/**
 * Muestra una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error)
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;

    // Cambiar el ícono según el tipo
    const icon = toast.querySelector('svg');
    if (type === 'error') {
        icon.innerHTML = `
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        `;
        icon.style.color = 'var(--danger)';
    } else {
        icon.innerHTML = `
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        `;
        icon.style.color = 'var(--success)';
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Inicializa los event listeners de la UI
 */
function initUI() {
    // Botón de nueva cita en el header
    document.getElementById('btnNuevaCita').addEventListener('click', () => {
        const hoy = formatDate(new Date());
        showNewAppointmentForm(hoy);
        document.getElementById('modalCitas').classList.add('active');
    });

    // Botón de cerrar modal
    document.getElementById('btnCloseModal').addEventListener('click', () => {
        closeModal();
    });

    // Cerrar modal al hacer clic fuera
    document.getElementById('modalCitas').addEventListener('click', (e) => {
        if (e.target.id === 'modalCitas') {
            closeModal();
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
