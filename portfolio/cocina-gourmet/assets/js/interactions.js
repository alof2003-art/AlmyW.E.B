/* ============================================================
   INTERACTIONS.JS - Hover Effects & Form Interactions
   Casa & Estilo v2.0
   ============================================================ */

(function() {
    'use strict';

    // ============================================================
    // FORM INTERACTIONS
    // ============================================================
    function initFormInteractions() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Input focus effects
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.style.borderColor = 'var(--matte-gold)';
                    this.style.outline = 'none';
                });
                
                input.addEventListener('blur', function() {
                    this.style.borderColor = 'rgba(51, 51, 51, 0.2)';
                });
            });

            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmit(this);
            });
        });
    }

    function handleFormSubmit(form) {
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('Gracias por su interés. Un miembro de nuestro equipo de diseño se pondrá en contacto con usted en breve.');
        
        // Reset form
        form.reset();
        
        // Log data (for development)
        console.log('Form submitted:', data);
    }

    // ============================================================
    // MODAL SYSTEM
    // ============================================================
    function initModalSystem() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        const modals = document.querySelectorAll('.modal');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.dataset.modal;
                const modal = document.getElementById(modalId);
                if (modal) {
                    openModal(modal);
                }
            });
        });

        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.modal__close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => closeModal(modal));
            }
            
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this);
                }
            });
        });

        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal--active');
                if (activeModal) {
                    closeModal(activeModal);
                }
            }
        });
    }

    function openModal(modal) {
        modal.classList.add('modal--active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('modal--active');
        document.body.style.overflow = '';
    }

    // ============================================================
    // FILTER SYSTEM
    // ============================================================
    function initFilterSystem() {
        const filterButtons = document.querySelectorAll('.filter__item');
        const filterableItems = document.querySelectorAll('[data-category]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('filter__item--active'));
                this.classList.add('filter__item--active');
                
                // Filter items
                filterableItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = '';
                        item.classList.add('reveal');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ============================================================
    // HOVER EFFECTS
    // ============================================================
    function initHoverEffects() {
        // Link hover effects
        const links = document.querySelectorAll('a:not(.btn):not(.nav__link)');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                if (this.style.color) {
                    this.dataset.originalColor = this.style.color;
                    this.style.color = 'var(--matte-gold)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (this.dataset.originalColor) {
                    this.style.color = this.dataset.originalColor;
                }
            });
        });
    }

    // ============================================================
    // CURSOR CUSTOMIZATION (Optional)
    // ============================================================
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            width: 8px;
            height: 8px;
            background: var(--matte-gold);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Expand cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // ============================================================
    // INITIALIZATION
    // ============================================================
    document.addEventListener('DOMContentLoaded', () => {
        initFormInteractions();
        initModalSystem();
        initFilterSystem();
        initHoverEffects();
        // initCustomCursor(); // Uncomment for custom cursor
        
        console.log('Casa & Estilo v2.0 - Interactions initialized');
    });

})();
