<?php
require_once 'config.php';

// Router simple
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remover query string
$path = parse_url($requestUri, PHP_URL_PATH);

// Remover /api/ del path si existe
$path = preg_replace('#^/api#', '', $path);

// Rutas
$routes = [
    'GET' => [
        '/' => 'root',
        '/content' => 'getContent',
        '/services' => 'getServices',
        '/portfolio' => 'getPortfolio',
        '/testimonials' => 'getTestimonials',
        '/social-links' => 'getSocialLinks',
        '/footer-config' => 'getFooterConfig',
        '/footer/config' => 'getFooterConfig',
        '/footer/social' => 'getSocialLinks',
        // Admin routes
        '/admin/content' => 'adminGetContent',
        '/admin/services' => 'adminGetServices',
        '/admin/portfolio' => 'adminGetPortfolio',
        '/admin/testimonials' => 'adminGetTestimonials',
        '/admin/social-links' => 'adminGetSocialLinks',
    ],
    'POST' => [
        '/auth/login' => 'login',
        '/admin/services' => 'adminCreateService',
        '/admin/portfolio' => 'adminCreateProject',
        '/admin/testimonials' => 'adminCreateTestimonial',
    ],
    'PUT' => [
        '/admin/content' => 'adminUpdateContent',
        '/admin/footer' => 'adminUpdateFooter',
    ],
    'DELETE' => []
];

// Buscar ruta exacta
$handler = null;
if (isset($routes[$requestMethod][$path])) {
    $handler = $routes[$requestMethod][$path];
}

// Buscar rutas con parametros (ej: /admin/services/123)
if (!$handler) {
    foreach ($routes[$requestMethod] as $route => $func) {
        $pattern = preg_replace('#\{[^\}]+\}#', '([^/]+)', $route);
        if (preg_match('#^' . $pattern . '$#', $path, $matches)) {
            $handler = $func;
            array_shift($matches); // Remover match completo
            $_GET['params'] = $matches;
            break;
        }
    }
}

// Rutas dinamicas para PUT y DELETE
if (!$handler && $requestMethod === 'PUT') {
    if (preg_match('#^/admin/services/([^/]+)$#', $path, $matches)) {
        $handler = 'adminUpdateService';
        $_GET['service_id'] = $matches[1];
    } elseif (preg_match('#^/admin/portfolio/([^/]+)$#', $path, $matches)) {
        $handler = 'adminUpdateProject';
        $_GET['project_id'] = $matches[1];
    } elseif (preg_match('#^/admin/testimonials/([^/]+)$#', $path, $matches)) {
        $handler = 'adminUpdateTestimonial';
        $_GET['testimonial_id'] = $matches[1];
    }
}

if (!$handler && $requestMethod === 'DELETE') {
    if (preg_match('#^/admin/services/([^/]+)$#', $path, $matches)) {
        $handler = 'adminDeleteService';
        $_GET['service_id'] = $matches[1];
    } elseif (preg_match('#^/admin/portfolio/([^/]+)$#', $path, $matches)) {
        $handler = 'adminDeleteProject';
        $_GET['project_id'] = $matches[1];
    } elseif (preg_match('#^/admin/testimonials/([^/]+)$#', $path, $matches)) {
        $handler = 'adminDeleteTestimonial';
        $_GET['testimonial_id'] = $matches[1];
    }
}

if (!$handler) {
    Response::error('Ruta no encontrada', 404);
}

// Ejecutar handler
require_once 'handlers.php';
call_user_func($handler);
