from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
import os
from pathlib import Path
from dotenv import load_dotenv
import ssl
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv(Path(__file__).parent / '.env')

DATABASE_URL = os.environ.get('DATABASE_URL')
logger.info(f"✓ DATABASE_URL cargada: {DATABASE_URL[:50]}..." if DATABASE_URL else "✗ DATABASE_URL no encontrada")

ASYNC_DATABASE_URL = DATABASE_URL.replace('postgresql://', 'postgresql+asyncpg://')
logger.info(f"✓ ASYNC_DATABASE_URL: {ASYNC_DATABASE_URL[:50]}...")

# Crear contexto SSL para Supabase
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE
logger.info("✓ Contexto SSL creado")

try:
    engine = create_async_engine(
        ASYNC_DATABASE_URL,
        pool_size=10,
        max_overflow=5,
        pool_timeout=30,
        pool_recycle=1800,
        pool_pre_ping=False,
        echo=False,
        connect_args={
            "statement_cache_size": 0,
            "command_timeout": 30,
            "ssl": ssl_context,
        }
    )
    logger.info("✓ Engine de base de datos creado exitosamente")
except Exception as e:
    logger.error(f"✗ Error creando engine: {e}")
    raise

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

Base = declarative_base()

async def get_db():
    logger.info("→ Iniciando sesión de base de datos")
    async with AsyncSessionLocal() as session:
        try:
            logger.info("✓ Sesión de base de datos creada")
            yield session
        except Exception as e:
            logger.error(f"✗ Error en sesión de base de datos: {e}")
            raise
        finally:
            logger.info("→ Cerrando sesión de base de datos")
            await session.close()