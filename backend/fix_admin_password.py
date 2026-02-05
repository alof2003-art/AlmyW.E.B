import asyncio
import bcrypt
from supabase_client import supabase

async def fix_password():
    # Generar nuevo hash para "admin123"
    password = "admin123"
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt).decode()
    
    print(f"🔐 Generando nuevo hash para contraseña: {password}")
    print(f"Hash generado: {hashed}")
    
    try:
        # Actualizar en Supabase
        result = await supabase.update(
            "admins",
            {"password_hash": hashed},
            {"username": "eq.admin"}
        )
        
        print("✓ Contraseña actualizada exitosamente en Supabase!")
        print(f"✓ Usuario: admin")
        print(f"✓ Contraseña: {password}")
        
        # Verificar que funciona
        admins = await supabase.query("admins", filters={"username": "eq.admin"})
        if admins and bcrypt.checkpw(password.encode(), admins[0]['password_hash'].encode()):
            print("✓ Verificación exitosa! Ahora puedes iniciar sesión.")
        else:
            print("✗ Error en verificación")
            
    except Exception as e:
        print(f"✗ Error actualizando contraseña: {e}")

if __name__ == "__main__":
    asyncio.run(fix_password())
