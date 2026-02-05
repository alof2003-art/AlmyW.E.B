import asyncio
from supabase_client import supabase

async def test_api():
    print("🔍 Probando conexión a Supabase via API REST...")
    
    try:
        # Intentar obtener contenido del sitio
        result = await supabase.query("site_content", filters={"limit": 1})
        print(f"✓ Conexión exitosa!")
        print(f"✓ Datos obtenidos: {len(result)} registros")
        if result:
            print(f"✓ Primer registro: {result[0]}")
    except Exception as e:
        print(f"✗ Error: {e}")
        print(f"Tipo de error: {type(e).__name__}")

if __name__ == "__main__":
    asyncio.run(test_api())
