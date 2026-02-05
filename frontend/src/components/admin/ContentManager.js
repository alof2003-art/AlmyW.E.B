import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export const ContentManager = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get('/content');
      setContent(response.data);
    } catch (error) {
      toast.error('Error al cargar contenido');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put('/admin/content', content);
      toast.success('Contenido actualizado');
    } catch (error) {
      toast.error('Error al actualizar');
    } finally {
      setLoading(false);
    }
  };

  if (!content) return <div>Cargando</div>;

  return (
    <div data-testid="content-manager">
      <h1 className="text-3xl font-bold mb-6">Gestionar Contenido</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-l-4 border-l-cyan-500 bg-cyan-50/20">
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>Contenido de la seccion principal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titulo</label>
              <Input
                value={content.hero_title}
                onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                data-testid="hero-title-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slogan</label>
              <Input
                value={content.hero_slogan}
                onChange={(e) => setContent({ ...content, hero_slogan: e.target.value })}
                data-testid="hero-slogan-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL Imagen de Fondo</label>
              <Input
                value={content.hero_bg_url || ''}
                onChange={(e) => setContent({ ...content, hero_bg_url: e.target.value })}
                placeholder="https://..."
                data-testid="hero-bg-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL del Logo</label>
              <Input
                value={content.logo_url || ''}
                onChange={(e) => setContent({ ...content, logo_url: e.target.value })}
                placeholder="https://..."
                data-testid="logo-url-input"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-violet-500 bg-violet-50/20">
          <CardHeader>
            <CardTitle>Mision y Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mision</label>
              <Textarea
                value={content.mission || ''}
                onChange={(e) => setContent({ ...content, mission: e.target.value })}
                rows={4}
                data-testid="mission-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Vision</label>
              <Textarea
                value={content.vision || ''}
                onChange={(e) => setContent({ ...content, vision: e.target.value })}
                rows={4}
                data-testid="vision-input"
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={loading} data-testid="save-content-button">
          <Save className="mr-2" size={20} />
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </form>
    </div>
  );
};

export default ContentManager;