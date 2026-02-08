from sqlalchemy import Column, String, Text, Float, Boolean, Integer, DateTime
from sqlalchemy.sql import func
from database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Admin(Base):
    __tablename__ = 'admins'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    username = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SiteContent(Base):
    __tablename__ = 'site_content'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    hero_title = Column(String(255), nullable=False, default='Almy.W.E.B.')
    hero_slogan = Column(String(255), nullable=False, default='tu imagen digital')
    hero_bg_url = Column(Text, nullable=True)
    logo_url = Column(Text, nullable=True)
    mission = Column(Text, nullable=True)
    vision = Column(Text, nullable=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Service(Base):
    __tablename__ = 'services'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    pages = Column(String(100), nullable=True)
    features = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    renewal_price = Column(Float, nullable=False)
    is_featured = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class PortfolioProject(Base):
    __tablename__ = 'portfolio_projects'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    image_url = Column(Text, nullable=False)
    demo_url = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Testimonial(Base):
    __tablename__ = 'testimonials'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    content = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    avatar_url = Column(Text, nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SocialLink(Base):
    __tablename__ = 'social_links'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    platform = Column(String(50), nullable=False)
    url = Column(Text, nullable=False)
    icon_name = Column(String(50), nullable=True)
    display_order = Column(Integer, default=0)

class FooterConfig(Base):
    __tablename__ = 'footer_config'
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    location_name = Column(String(255), default='ESPOCH, Riobamba')
    location_address = Column(Text, default='Escuela Superior Politécnica de Chimborazo, Riobamba, Chimborazo, Ecuador')
    map_lat = Column(String(50), default='-1.6544')
    map_lng = Column(String(50), default='-78.6795')
    copyright_text = Column(String(255), default='desarrollado por AlmyW.E.B.')
    show_authors = Column(Boolean, default=False)
    authors = Column(Text, nullable=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())