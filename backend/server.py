from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from sqlalchemy import select, update, delete as sql_delete
from sqlalchemy.ext.asyncio import AsyncSession
import os
import logging
from pathlib import Path
from datetime import datetime, timedelta, timezone
import bcrypt
import jwt

from database import get_db
from models import (
    Admin, SiteContent, Service, PortfolioProject, 
    Testimonial, SocialLink, FooterConfig
)

ROOT_DIR = Path(__file__).parent
SECRET_KEY = os.environ.get('SECRET_KEY', 'default-secret-key')
ALGORITHM = 'HS256'

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


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

class SiteContentUpdate(BaseModel):
    hero_title: Optional[str] = None
    hero_slogan: Optional[str] = None
    hero_bg_url: Optional[str] = None
    logo_url: Optional[str] = None
    mission: Optional[str] = None
    vision: Optional[str] = None

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

class PortfolioProjectResponse(BaseModel):
    id: str
    title: str
    category: str
    description: Optional[str]
    image_url: str
    demo_url: Optional[str]

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

class TestimonialResponse(BaseModel):
    id: str
    name: str
    company: Optional[str]
    content: str
    rating: int
    avatar_url: Optional[str]
    display_order: int

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

class SocialLinkResponse(BaseModel):
    id: str
    platform: str
    url: str
    icon_name: Optional[str]
    display_order: int

class SocialLinkCreate(BaseModel):
    platform: str
    url: str
    icon_name: Optional[str] = None
    display_order: int = 0

class SocialLinkUpdate(BaseModel):
    platform: Optional[str] = None
    url: Optional[str] = None
    icon_name: Optional[str] = None
    display_order: Optional[int] = None

class FooterConfigResponse(BaseModel):
    id: str
    location_name: str
    location_address: str
    map_lat: str
    map_lng: str
    copyright_text: str
    show_authors: bool
    authors: Optional[str]

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

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        result = await db.execute(select(Admin).where(Admin.username == username))
        user = result.scalar_one_or_none()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# Public Endpoints
@api_router.get("/")
async def root():
    return {"message": "Almy.W.E.B. API"}

@api_router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Admin).where(Admin.username == request.username))
    admin = result.scalar_one_or_none()
    
    if not admin or not bcrypt.checkpw(request.password.encode(), admin.password_hash.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": admin.username})
    return {"token": token, "username": admin.username}

@api_router.get("/content", response_model=SiteContentResponse)
async def get_site_content(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SiteContent).limit(1))
    content = result.scalar_one_or_none()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content

@api_router.get("/services", response_model=List[ServiceResponse])
async def get_services(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).order_by(Service.display_order))
    services = result.scalars().all()
    return services

@api_router.get("/portfolio", response_model=List[PortfolioProjectResponse])
async def get_portfolio(
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    query = select(PortfolioProject)
    
    if category and category.lower() != 'all':
        query = query.where(PortfolioProject.category == category)
    
    if search:
        search_pattern = f"%{search}%"
        query = query.where(
            (PortfolioProject.title.ilike(search_pattern)) |
            (PortfolioProject.description.ilike(search_pattern))
        )
    
    result = await db.execute(query.order_by(PortfolioProject.created_at.desc()))
    projects = result.scalars().all()
    return projects

@api_router.get("/testimonials", response_model=List[TestimonialResponse])
async def get_testimonials(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Testimonial).order_by(Testimonial.display_order))
    testimonials = result.scalars().all()
    return testimonials

@api_router.get("/social-links", response_model=List[SocialLinkResponse])
async def get_social_links(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SocialLink).order_by(SocialLink.display_order))
    links = result.scalars().all()
    return links

@api_router.get("/footer-config", response_model=FooterConfigResponse)
async def get_footer_config(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FooterConfig).limit(1))
    config = result.scalar_one_or_none()
    if not config:
        raise HTTPException(status_code=404, detail="Footer config not found")
    return config


# Admin Endpoints (Protected)
@api_router.put("/admin/content", response_model=SiteContentResponse)
async def update_site_content(
    updates: SiteContentUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(SiteContent).limit(1))
    content = result.scalar_one_or_none()
    
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(content, key, value)
    
    await db.commit()
    await db.refresh(content)
    return content

@api_router.get("/admin/services", response_model=List[ServiceResponse])
async def admin_get_services(
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(Service).order_by(Service.display_order))
    return result.scalars().all()

@api_router.post("/admin/services", response_model=ServiceResponse)
async def create_service(
    service: ServiceCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    new_service = Service(**service.model_dump())
    db.add(new_service)
    await db.commit()
    await db.refresh(new_service)
    return new_service

@api_router.put("/admin/services/{service_id}", response_model=ServiceResponse)
async def update_service(
    service_id: str,
    updates: ServiceUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(Service).where(Service.id == service_id))
    service = result.scalar_one_or_none()
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(service, key, value)
    
    await db.commit()
    await db.refresh(service)
    return service

@api_router.delete("/admin/services/{service_id}")
async def delete_service(
    service_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(Service).where(Service.id == service_id))
    service = result.scalar_one_or_none()
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    await db.delete(service)
    await db.commit()
    return {"message": "Service deleted"}

@api_router.get("/admin/portfolio", response_model=List[PortfolioProjectResponse])
async def admin_get_portfolio(
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(PortfolioProject).order_by(PortfolioProject.created_at.desc()))
    return result.scalars().all()

@api_router.post("/admin/portfolio", response_model=PortfolioProjectResponse)
async def create_portfolio_project(
    project: PortfolioProjectCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    new_project = PortfolioProject(**project.model_dump())
    db.add(new_project)
    await db.commit()
    await db.refresh(new_project)
    return new_project

@api_router.put("/admin/portfolio/{project_id}", response_model=PortfolioProjectResponse)
async def update_portfolio_project(
    project_id: str,
    updates: PortfolioProjectUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(PortfolioProject).where(PortfolioProject.id == project_id))
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)
    
    await db.commit()
    await db.refresh(project)
    return project

@api_router.delete("/admin/portfolio/{project_id}")
async def delete_portfolio_project(
    project_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(PortfolioProject).where(PortfolioProject.id == project_id))
    project = result.scalar_one_or_none()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    await db.delete(project)
    await db.commit()
    return {"message": "Project deleted"}

@api_router.get("/admin/testimonials", response_model=List[TestimonialResponse])
async def admin_get_testimonials(
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(Testimonial).order_by(Testimonial.display_order))
    return result.scalars().all()

@api_router.post("/admin/testimonials", response_model=TestimonialResponse)
async def create_testimonial(
    testimonial: TestimonialCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    new_testimonial = Testimonial(**testimonial.model_dump())
    db.add(new_testimonial)
    await db.commit()
    await db.refresh(new_testimonial)
    return new_testimonial

@api_router.put("/admin/testimonials/{testimonial_id}", response_model=TestimonialResponse)
async def update_testimonial(
    testimonial_id: str,
    updates: TestimonialUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(Testimonial).where(Testimonial.id == testimonial_id))
    testimonial = result.scalar_one_or_none()
    
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(testimonial, key, value)
    
    await db.commit()
    await db.refresh(testimonial)
    return testimonial

@api_router.delete("/admin/testimonials/{testimonial_id}")
async def delete_testimonial(
    testimonial_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(Testimonial).where(Testimonial.id == testimonial_id))
    testimonial = result.scalar_one_or_none()
    
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    await db.delete(testimonial)
    await db.commit()
    return {"message": "Testimonial deleted"}

@api_router.put("/admin/footer", response_model=FooterConfigResponse)
async def update_footer_config(
    updates: FooterConfigUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(FooterConfig).limit(1))
    config = result.scalar_one_or_none()
    
    if not config:
        raise HTTPException(status_code=404, detail="Footer config not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(config, key, value)
    
    await db.commit()
    await db.refresh(config)
    return config

@api_router.get("/admin/social-links", response_model=List[SocialLinkResponse])
async def admin_get_social_links(
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(SocialLink).order_by(SocialLink.display_order))
    return result.scalars().all()

@api_router.post("/admin/social-links", response_model=SocialLinkResponse)
async def create_social_link(
    link: SocialLinkCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    new_link = SocialLink(**link.model_dump())
    db.add(new_link)
    await db.commit()
    await db.refresh(new_link)
    return new_link

@api_router.put("/admin/social-links/{link_id}", response_model=SocialLinkResponse)
async def update_social_link(
    link_id: str,
    updates: SocialLinkUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(SocialLink).where(SocialLink.id == link_id))
    link = result.scalar_one_or_none()
    
    if not link:
        raise HTTPException(status_code=404, detail="Social link not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(link, key, value)
    
    await db.commit()
    await db.refresh(link)
    return link

@api_router.delete("/admin/social-links/{link_id}")
async def delete_social_link(
    link_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(get_current_user)
):
    result = await db.execute(select(SocialLink).where(SocialLink.id == link_id))
    link = result.scalar_one_or_none()
    
    if not link:
        raise HTTPException(status_code=404, detail="Social link not found")
    
    await db.delete(link)
    await db.commit()
    return {"message": "Social link deleted"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
