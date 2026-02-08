<?php
require_once 'config.php';

$supabase = new SupabaseClient();

// ============================================
// PUBLIC ENDPOINTS
// ============================================

function root() {
    Response::json(['message' => 'Almy.W.E.B. API']);
}

function login() {
    global $supabase;
    
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        Response::error('Usuario y contrasena requeridos', 400);
    }
    
    $admins = $supabase->query('admins', ['username' => 'eq.' . $username]);
    
    if (!$admins || count($admins) === 0) {
        Response::error('Credenciales invalidas', 401);
    }
    
    $admin = $admins[0];
    
    if (!password_verify($password, $admin['password_hash'])) {
        Response::error('Credenciales invalidas', 401);
    }
    
    $token = createAccessToken($admin['username']);
    
    Response::json([
        'token' => $token,
        'username' => $admin['username']
    ]);
}

function getContent() {
    global $supabase;
    
    $content = $supabase->query('site_content', ['limit' => '1']);
    
    if (!$content || count($content) === 0) {
        Response::error('Contenido no encontrado', 404);
    }
    
    Response::json($content[0]);
}

function getServices() {
    global $supabase;
    
    $services = $supabase->query('services', ['order' => 'display_order']);
    Response::json($services ?: []);
}

function getPortfolio() {
    global $supabase;
    
    $filters = ['order' => 'created_at.desc'];
    
    $category = $_GET['category'] ?? null;
    if ($category && strtolower($category) !== 'all') {
        $filters['category'] = 'eq.' . $category;
    }
    
    $search = $_GET['search'] ?? null;
    if ($search) {
        $filters['or'] = '(title.ilike.%' . $search . '%,description.ilike.%' . $search . '%)';
    }
    
    $projects = $supabase->query('portfolio_projects', $filters);
    Response::json($projects ?: []);
}

function getTestimonials() {
    global $supabase;
    
    $testimonials = $supabase->query('testimonials', ['order' => 'display_order']);
    Response::json($testimonials ?: []);
}

function getSocialLinks() {
    global $supabase;
    
    $links = $supabase->query('social_links', ['order' => 'display_order']);
    Response::json($links ?: []);
}

function getFooterConfig() {
    global $supabase;
    
    $config = $supabase->query('footer_config', ['limit' => '1']);
    
    if (!$config || count($config) === 0) {
        Response::error('Configuracion de footer no encontrada', 404);
    }
    
    Response::json($config[0]);
}

// ============================================
// ADMIN ENDPOINTS (Protected)
// ============================================

function adminGetContent() {
    verifyToken();
    getContent();
}

function adminUpdateContent() {
    verifyToken();
    global $supabase;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Filtrar solo campos no nulos
    $updateData = array_filter($input, function($value) {
        return $value !== null;
    });
    
    if (empty($updateData)) {
        Response::error('No hay datos para actualizar', 400);
    }
    
    $result = $supabase->update('site_content', $updateData, ['id' => 'eq.content-001']);
    
    if (!$result || count($result) === 0) {
        Response::error('Error al actualizar contenido', 500);
    }
    
    Response::json($result[0]);
}

function adminGetServices() {
    verifyToken();
    getServices();
}

function adminCreateService() {
    verifyToken();
    global $supabase;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $input['id'] = 'service-' . substr(uniqid(), -8);
    
    $result = $supabase->insert('services', $input);
    
    if (!$result || count($result) === 0) {
        Response::error('Error al crear servicio', 500);
    }
    
    Response::json($result[0], 201);
}

function adminUpdateService() {
    verifyToken();
    global $supabase;
    
    $serviceId = $_GET['service_id'] ?? '';
    $input = json_decode(file_get_contents('php://input'), true);
    
    $updateData = array_filter($input, function($value) {
        return $value !== null;
    });
    
    if (empty($updateData)) {
        Response::error('No hay datos para actualizar', 400);
    }
    
    $result = $supabase->update('services', $updateData, ['id' => 'eq.' . $serviceId]);
    
    if (!$result || count($result) === 0) {
        Response::error('Servicio no encontrado', 404);
    }
    
    Response::json($result[0]);
}

function adminDeleteService() {
    verifyToken();
    global $supabase;
    
    $serviceId = $_GET['service_id'] ?? '';
    
    $success = $supabase->delete('services', ['id' => 'eq.' . $serviceId]);
    
    if (!$success) {
        Response::error('Error al eliminar servicio', 500);
    }
    
    Response::json(['message' => 'Servicio eliminado']);
}

function adminGetPortfolio() {
    verifyToken();
    getPortfolio();
}

function adminCreateProject() {
    verifyToken();
    global $supabase;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $input['id'] = 'project-' . substr(uniqid(), -8);
    
    $result = $supabase->insert('portfolio_projects', $input);
    
    if (!$result || count($result) === 0) {
        Response::error('Error al crear proyecto', 500);
    }
    
    Response::json($result[0], 201);
}

function adminUpdateProject() {
    verifyToken();
    global $supabase;
    
    $projectId = $_GET['project_id'] ?? '';
    $input = json_decode(file_get_contents('php://input'), true);
    
    $updateData = array_filter($input, function($value) {
        return $value !== null;
    });
    
    if (empty($updateData)) {
        Response::error('No hay datos para actualizar', 400);
    }
    
    $result = $supabase->update('portfolio_projects', $updateData, ['id' => 'eq.' . $projectId]);
    
    if (!$result || count($result) === 0) {
        Response::error('Proyecto no encontrado', 404);
    }
    
    Response::json($result[0]);
}

function adminDeleteProject() {
    verifyToken();
    global $supabase;
    
    $projectId = $_GET['project_id'] ?? '';
    
    $success = $supabase->delete('portfolio_projects', ['id' => 'eq.' . $projectId]);
    
    if (!$success) {
        Response::error('Error al eliminar proyecto', 500);
    }
    
    Response::json(['message' => 'Proyecto eliminado']);
}

function adminGetTestimonials() {
    verifyToken();
    getTestimonials();
}

function adminCreateTestimonial() {
    verifyToken();
    global $supabase;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $input['id'] = 'testimonial-' . substr(uniqid(), -8);
    
    $result = $supabase->insert('testimonials', $input);
    
    if (!$result || count($result) === 0) {
        Response::error('Error al crear testimonio', 500);
    }
    
    Response::json($result[0], 201);
}

function adminUpdateTestimonial() {
    verifyToken();
    global $supabase;
    
    $testimonialId = $_GET['testimonial_id'] ?? '';
    $input = json_decode(file_get_contents('php://input'), true);
    
    $updateData = array_filter($input, function($value) {
        return $value !== null;
    });
    
    if (empty($updateData)) {
        Response::error('No hay datos para actualizar', 400);
    }
    
    $result = $supabase->update('testimonials', $updateData, ['id' => 'eq.' . $testimonialId]);
    
    if (!$result || count($result) === 0) {
        Response::error('Testimonio no encontrado', 404);
    }
    
    Response::json($result[0]);
}

function adminDeleteTestimonial() {
    verifyToken();
    global $supabase;
    
    $testimonialId = $_GET['testimonial_id'] ?? '';
    
    $success = $supabase->delete('testimonials', ['id' => 'eq.' . $testimonialId]);
    
    if (!$success) {
        Response::error('Error al eliminar testimonio', 500);
    }
    
    Response::json(['message' => 'Testimonio eliminado']);
}

function adminGetSocialLinks() {
    verifyToken();
    getSocialLinks();
}

function adminUpdateFooter() {
    verifyToken();
    global $supabase;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $updateData = array_filter($input, function($value) {
        return $value !== null;
    });
    
    if (empty($updateData)) {
        Response::error('No hay datos para actualizar', 400);
    }
    
    $result = $supabase->update('footer_config', $updateData, ['id' => 'eq.footer-001']);
    
    if (!$result || count($result) === 0) {
        Response::error('Error al actualizar footer', 500);
    }
    
    Response::json($result[0]);
}
