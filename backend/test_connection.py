import asyncio
import asyncpg
from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv(Path(__file__).parent / '.env')

async def test_connection():
    DATABASE_URL = os.environ.get('DATABASE_URL')
    print(f"Intentando conectar a: {DATABASE_URL}")
    
    try:
        # Extraer componentes de la URL
        conn = await asyncpg.connect(DATABASE_URL)
        print("✓ Conexión exitosa a Supabase!")
        
        # Probar una consulta simple
        result = await conn.fetchval('SELECT 1')
        print(f"✓ Consulta de prueba exitosa: {result}")
        
        # Verificar tablas
        tables = await conn.fetch("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        print(f"\n✓ Tablas encontradas ({len(tables)}):")
        for table in tables:
            print(f"  - {table['table_name']}")
        
        await conn.close()
        print("\n✓ Todo funciona correctamente!")
        
    except Exception as e:
        print(f"\n✗ Error de conexión: {e}")
        print(f"\nTipo de error: {type(e).__name__}")

if __name__ == "__main__":
    asyncio.run(test_connection())
