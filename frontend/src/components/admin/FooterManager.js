import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const FooterManager = () => {
  const [config, setConfig] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [configRes, socialRes] = await Promise.all([
        api.get('/footer-config'),
        api.get('/admin/social-links'),
      ]);
      setConfig(configRes.data);
      setSocialLinks(socialRes.data);
    } catch (error) {
      toast.error('Error al cargar configuración');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/admin/footer', config);
      toast.success('Configuración actualizada');
    } catch (error) {
      toast.error('Error al actualizar');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialUpdate = async (id, field, value) => {
    try {
      await api.put(`/admin/social-links/${id}`, { [field]: value });
      toast.success('Red social actualizada');
      fetchData();
    } catch (error) {
      toast.error('Error al actualizar');
    }
  };

  if (!config) return <div>Cargando...</div>;

  return (
    <div data-testid="footer-manager">
      <h1 className="text-3xl font-bold mb-6">Gestionar Footer</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Ubicación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del Lugar</label>
              <Input value={config.location_name} onChange={(e) => setConfig({ ...config, location_name: e.target.value })} data-testid="location-name-input" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dirección Completa</label>
              <Input value={config.location_address} onChange={(e) => setConfig({ ...config, location_address: e.target.value })} data-testid="location-address-input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Latitud</label>
                <Input value={config.map_lat} onChange={(e) => setConfig({ ...config, map_lat: e.target.value })} data-testid="map-lat-input" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Longitud</label>
                <Input value={config.map_lng} onChange={(e) => setConfig({ ...config, map_lng: e.target.value })} data-testid="map-lng-input" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Texto de Copyright</CardTitle>
          </CardHeader>
          <CardContent>
            <Input value={config.copyright_text} onChange={(e) => setConfig({ ...config, copyright_text: e.target.value })} data-testid="copyright-input" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="show_authors" checked={config.show_authors} onChange={(e) => setConfig({ ...config, show_authors: e.target.checked })} className="rounded" data-testid="show-authors-checkbox" />
              <label htmlFor="show_authors" className="text-sm font-medium">Mostrar autores en todas las páginas</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nombres de autores (separados por |)</label>
              <Input value={config.authors || ''} onChange={(e) => setConfig({ ...config, authors: e.target.value })} placeholder="Nombre1|Nombre2" data-testid="authors-input" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes Sociales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialLinks.map((link) => (
              <div key={link.id} className="flex gap-4 items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">{link.platform}</label>
                  <Input value={link.url} onChange={(e) => handleSocialUpdate(link.id, 'url', e.target.value)} onBlur={(e) => handleSocialUpdate(link.id, 'url', e.target.value)} placeholder="URL" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={loading} data-testid="save-footer-button">
          <Save className="mr-2" size={20} />
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </form>
    </div>
  );
};

export default FooterManager;