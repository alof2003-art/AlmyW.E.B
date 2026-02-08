// Script para interceptar clics en enlaces de Portfolio
(function() {
    'use strict';
    
    console.log('Portfolio Redirect Script Loaded');
    
    function interceptPortfolioLinks() {
        // Buscar todos los enlaces
        const allLinks = document.querySelectorAll('a');
        
        allLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            const text = link.textContent.toLowerCase();
            
            // Si el enlace contiene "portfolio" o "portafolio"
            if ((href && (href.includes('portfolio') || href.includes('portafolio'))) || 
                (text && (text.includes('portfolio') || text.includes('portafolio')))) {
                
                // Si no está ya interceptado
                if (!link.hasAttribute('data-portfolio-intercepted')) {
                    link.setAttribute('data-portfolio-intercepted', 'true');
                    
                    // Remover event listeners de React
                    const newLink = link.cloneNode(true);
                    link.parentNode.replaceChild(newLink, link);
                    
                    // Agregar nuevo event listener
                    newLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        
                        console.log('Portfolio link clicked - redirecting to static version');
                        
                        // Forzar navegación completa
                        window.location.href = '/portfolio/';
                        
                        return false;
                    }, true);
                    
                    console.log('Intercepted portfolio link:', newLink.textContent);
                }
            }
        });
    }
    
    // Ejecutar inmediatamente
    interceptPortfolioLinks();
    
    // Ejecutar después de que React renderice
    setTimeout(interceptPortfolioLinks, 500);
    setTimeout(interceptPortfolioLinks, 1000);
    setTimeout(interceptPortfolioLinks, 2000);
    
    // Observer para detectar cambios en el DOM
    const observer = new MutationObserver(function(mutations) {
        interceptPortfolioLinks();
    });
    
    // Observar cambios en el body
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    
    console.log('Portfolio redirect observer started');
})();
