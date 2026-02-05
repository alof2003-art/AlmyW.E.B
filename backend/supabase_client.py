import os
import httpx
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / '.env')

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_KEY') or os.environ.get('SUPABASE_ANON_KEY')

class SupabaseClient:
    def __init__(self):
        self.base_url = f"{SUPABASE_URL}/rest/v1"
        self.headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
    
    async def query(self, table: str, select: str = "*", filters: dict = None):
        """Consultar datos de una tabla"""
        url = f"{self.base_url}/{table}"
        params = {"select": select}
        
        if filters:
            params.update(filters)
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            return response.json()
    
    async def insert(self, table: str, data: dict):
        """Insertar datos en una tabla"""
        url = f"{self.base_url}/{table}"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=data)
            response.raise_for_status()
            return response.json()
    
    async def update(self, table: str, data: dict, filters: dict):
        """Actualizar datos en una tabla"""
        url = f"{self.base_url}/{table}"
        
        async with httpx.AsyncClient() as client:
            response = await client.patch(url, headers=self.headers, json=data, params=filters)
            response.raise_for_status()
            return response.json()
    
    async def delete(self, table: str, filters: dict):
        """Eliminar datos de una tabla"""
        url = f"{self.base_url}/{table}"
        
        async with httpx.AsyncClient() as client:
            response = await client.delete(url, headers=self.headers, params=filters)
            response.raise_for_status()
            return response.json()

supabase = SupabaseClient()
