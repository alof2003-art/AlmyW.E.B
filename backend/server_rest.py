from fastapi import FastAPI, APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import logging
from datetime import datetime, timedelta, timezone
import bcrypt
import jwt
from supabase_client import supabase

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SECRET_KEY = os.environ.get('SECRET_KEY', 'almyweb_secret_key_2026_secure_token')
ALGORITHM = 'HS256'

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# Pydantic Models
class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    token: str
    username: str

class SiteContentResponse(BaseModel):
    id: str
    hero_title: str
    hero_slogan: str
    hero_bg_url: Optional[str]
    logo_url: Optional[str]
    mission: Optional[str]
    vision: Optional[str]

class ServiceResponse(BaseModel):
    id: str
    title: str
    description: str
    pages: Optional[str]
    features: Optional[str]
    price: float
    renewal_price: float
    is_featured: bool
    display_order: int

class PortfolioProjectResponse(BaseModel):
    id: str
    title: str
    category: str
    description: Optional[str]
    image_url: str
    demo_url: Optional[str]

class TestimonialResponse(BaseModel):
    id: str
    name: str
    company: Optional[str]
    content: str
    rating: int
    avatar_url: Optional[str]
    display_order: int

class SocialLinkResponse(BaseModel):
    id: str
    platform: str
    url: str
    icon_name: Optional[str]
    display_order: int

class FooterConfigResponse(BaseModel):
    id: str
    location_name: str
    location_address: str
    map_lat: str
    map_lng: str
    copyright_text: str
    show_authors: bool
    authors: Optional[str]

class SiteContentUpdate(BaseModel):
    hero_title: Optional[str] = None
    hero_slogan: Optional[str] = None
    hero_bg_url: Optional[str] = None
    logo_url: Optional[str] = None
    mission: Optional[str] = None
    vision: Optional[str] = None

class ServiceCreate(BaseModel):
    title: str
    description: str
    pages: Optional[str] = None
    features: Optional[str] = None
    price: float
    renewal_price: float
    is_featured: bool = False
    display_order: int = 0

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    pages: Optional[str] = None
    features: Optional[str] = None
    price: Optional[float] = None
    renewal_price: Optional[float] = None
    is_featured: Optional[bool] = None
    display_order: Optional[int] = None

class PortfolioProjectCreate(BaseModel):
    title: str
    category: str
    description: Optional[str] = None
    image_url: str
    demo_url: Optional[str] = None

class PortfolioProjectUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    demo_url: Optional[str] = None

class TestimonialCreate(BaseModel):
    name: str
    company: Optional[str] = None
    content: str
    rating: int = 5
    avatar_url: Optional[str] = None
    display_order: int = 0

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    company: Optional[str] = None
    content: Optional[str] = None
    rating: Optional[int] = None
    avatar_url: Optional[str] = None
    display_order: Optional[int] = None

class FooterConfigUpdate(BaseModel):
    location_name: Optional[str] = None
    location_address: Optional[str] = None
    map_lat: Optional[str] = None
    map_lng: Optional[str] = None
    copyright_text: Optional[str] = None
    show_authors: Optional[bool] = None
    authors: Optional[str] = None

# Auth helpers
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=7)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def verify_token(credentials):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Public Endpoints
@api_router.get("/")
async def root():
    return {"message": "Almy.W.E.B. API"}

@api_router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    try:
        admins = await supabase.query("admins", filters={"username": f"eq.{request.username}"})
        
        if not admins or not bcrypt.checkpw(request.password.encode(), admins[0]['password_hash'].encode()):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        token = create_access_token({"sub": admins[0]['username']})
        return {"token": token, "username": admins[0]['username']}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/content", response_model=SiteContentResponse)
async def get_site_content():
    try:
        logger.info("→ GET /api/content")
        content = await supabase.query("site_content", filters={"limit": 1})
        
        if not content:
            raise HTTPException(status_code=404, detail="Content not found")
        
        logger.info("✓ Content retrieved successfully")
        return content[0]
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"✗ Error getting content: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/services", response_model=List[ServiceResponse])
async def get_services():
    try:
        logger.info("→ GET /api/services")
        services = await supabase.query("services", filters={"order": "display_order"})
        logger.info(f"✓ Retrieved {len(services)} services")
        return services
    except Exception as e:
        logger.error(f"✗ Error getting services: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/portfolio", response_model=List[PortfolioProjectResponse])
async def get_portfolio(category: Optional[str] = None, search: Optional[str] = None):
    try:
        logger.info(f"→ GET /api/portfolio (category={category}, search={search})")
        filters = {"order": "created_at.desc"}
        
        if category and category.lower() != 'all':
            filters["category"] = f"eq.{category}"
        
        if search:
            filters["or"] = f"(title.ilike.%{search}%,description.ilike.%{search}%)"
        
        projects = await supabase.query("portfolio_projects", filters=filters)
        logger.info(f"✓ Retrieved {len(projects)} projects")
        return projects
    except Exception as e:
        logger.error(f"✗ Error getting portfolio: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/testimonials", response_model=List[TestimonialResponse])
async def get_testimonials():
    try:
        logger.info("→ GET /api/testimonials")
        testimonials = await supabase.query("testimonials", filters={"order": "display_order"})
        logger.info(f"✓ Retrieved {len(testimonials)} testimonials")
        return testimonials
    except Exception as e:
        logger.error(f"✗ Error getting testimonials: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/social-links", response_model=List[SocialLinkResponse])
async def get_social_links():
    try:
        logger.info("→ GET /api/social-links")
        links = await supabase.query("social_links", filters={"order": "display_order"})
        logger.info(f"✓ Retrieved {len(links)} social links")
        return links
    except Exception as e:
        logger.error(f"✗ Error getting social links: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/footer-config", response_model=FooterConfigResponse)
async def get_footer_config():
    try:
        logger.info("→ GET /api/footer-config")
        config = await supabase.query("footer_config", filters={"limit": 1})
        
        if not config:
            raise HTTPException(status_code=404, detail="Footer config not found")
        
        logger.info("✓ Footer config retrieved successfully")
        return config[0]
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"✗ Error getting footer config: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Rutas alternativas para el footer (compatibilidad)
@api_router.get("/footer/config", response_model=FooterConfigResponse)
async def get_footer_config_alt():
    return await get_footer_config()

@api_router.get("/footer/social", response_model=List[SocialLinkResponse])
async def get_footer_social():
    return await get_social_links()

# ============================================
# ADMIN ENDPOINTS (Protected)
# ============================================

# Admin - Content Management
@api_router.get("/admin/content", response_model=SiteContentResponse)
async def admin_get_content(credentials = Depends(security)):
    await verify_token(credentials)
    return await get_site_content()

@api_router.put("/admin/content", response_model=SiteContentResponse)
async def admin_update_content(updates: SiteContentUpdate, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        update_data = {k: v for k, v in updates.dict(exclude_unset=True).items() if v is not None}
        result = await supabase.update("site_content", update_data, {"id": "eq.content-001"})
        if result:
            return result[0]
        raise HTTPException(status_code=404, detail="Content not found")
    except Exception as e:
        logger.error(f"Error updating content: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin - Services Management
@api_router.get("/admin/services", response_model=List[ServiceResponse])
async def admin_get_services(credentials = Depends(security)):
    await verify_token(credentials)
    return await get_services()

@api_router.post("/admin/services", response_model=ServiceResponse)
async def admin_create_service(service: ServiceCreate, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        import uuid
        service_data = service.dict()
        service_data['id'] = f"service-{str(uuid.uuid4())[:8]}"
        result = await supabase.insert("services", service_data)
        return result[0]
    except Exception as e:
        logger.error(f"Error creating service: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/admin/services/{service_id}", response_model=ServiceResponse)
async def admin_update_service(service_id: str, updates: ServiceUpdate, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        update_data = {k: v for k, v in updates.dict(exclude_unset=True).items() if v is not None}
        result = await supabase.update("services", update_data, {"id": f"eq.{service_id}"})
        if result:
            return result[0]
        raise HTTPException(status_code=404, detail="Service not found")
    except Exception as e:
        logger.error(f"Error updating service: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/admin/services/{service_id}")
async def admin_delete_service(service_id: str, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        await supabase.delete("services", {"id": f"eq.{service_id}"})
        return {"message": "Service deleted"}
    except Exception as e:
        logger.error(f"Error deleting service: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin - Portfolio Management
@api_router.get("/admin/portfolio", response_model=List[PortfolioProjectResponse])
async def admin_get_portfolio(credentials = Depends(security)):
    await verify_token(credentials)
    return await get_portfolio()

@api_router.post("/admin/portfolio", response_model=PortfolioProjectResponse)
async def admin_create_project(project: PortfolioProjectCreate, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        import uuid
        project_data = project.dict()
        project_data['id'] = f"project-{str(uuid.uuid4())[:8]}"
        result = await supabase.insert("portfolio_projects", project_data)
        return result[0]
    except Exception as e:
        logger.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/admin/portfolio/{project_id}", response_model=PortfolioProjectResponse)
async def admin_update_project(project_id: str, updates: PortfolioProjectUpdate, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        update_data = {k: v for k, v in updates.dict(exclude_unset=True).items() if v is not None}
        result = await supabase.update("portfolio_projects", update_data, {"id": f"eq.{project_id}"})
        if result:
            return result[0]
        raise HTTPException(status_code=404, detail="Project not found")
    except Exception as e:
        logger.error(f"Error updating project: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/admin/portfolio/{project_id}")
async def admin_delete_project(project_id: str, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        await supabase.delete("portfolio_projects", {"id": f"eq.{project_id}"})
        return {"message": "Project deleted"}
    except Exception as e:
        logger.error(f"Error deleting project: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin - Testimonials Management
@api_router.get("/admin/testimonials", response_model=List[TestimonialResponse])
async def admin_get_testimonials(credentials = Depends(security)):
    await verify_token(credentials)
    return await get_testimonials()

@api_router.post("/admin/testimonials", response_model=TestimonialResponse)
async def admin_create_testimonial(testimonial: TestimonialCreate, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        import uuid
        testimonial_data = testimonial.dict()
        testimonial_data['id'] = f"testimonial-{str(uuid.uuid4())[:8]}"
        result = await supabase.insert("testimonials", testimonial_data)
        return result[0]
    except Exception as e:
        logger.error(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/admin/testimonials/{testimonial_id}", response_model=TestimonialResponse)
async def admin_update_testimonial(testimonial_id: str, updates: TestimonialUpdate, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        update_data = {k: v for k, v in updates.dict(exclude_unset=True).items() if v is not None}
        result = await supabase.update("testimonials", update_data, {"id": f"eq.{testimonial_id}"})
        if result:
            return result[0]
        raise HTTPException(status_code=404, detail="Testimonial not found")
    except Exception as e:
        logger.error(f"Error updating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/admin/testimonials/{testimonial_id}")
async def admin_delete_testimonial(testimonial_id: str, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        await supabase.delete("testimonials", {"id": f"eq.{testimonial_id}"})
        return {"message": "Testimonial deleted"}
    except Exception as e:
        logger.error(f"Error deleting testimonial: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin - Footer Management
@api_router.put("/admin/footer", response_model=FooterConfigResponse)
async def admin_update_footer(updates: FooterConfigUpdate, credentials = Depends(security)):
    await verify_token(credentials)
    try:
        update_data = {k: v for k, v in updates.dict(exclude_unset=True).items() if v is not None}
        result = await supabase.update("footer_config", update_data, {"id": "eq.footer-001"})
        if result:
            return result[0]
        raise HTTPException(status_code=404, detail="Footer config not found")
    except Exception as e:
        logger.error(f"Error updating footer: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin - Social Links Management
@api_router.get("/admin/social-links", response_model=List[SocialLinkResponse])
async def admin_get_social_links(credentials = Depends(security)):
    await verify_token(credentials)
    return await get_social_links()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    logger.info("=" * 60)
    logger.info("🚀 Iniciando servidor Almy.W.E.B. (REST API)")
    logger.info("=" * 60)
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
