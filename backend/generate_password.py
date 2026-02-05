import bcrypt

# Generar hash para la contraseña "admin123"
password = "admin123"
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password.encode(), salt)

print(f"Contraseña: {password}")
print(f"Hash: {hashed.decode()}")

# Verificar que funciona
if bcrypt.checkpw(password.encode(), hashed):
    print("✓ Verificación exitosa!")
else:
    print("✗ Error en verificación")
