import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Card, CardContent } from '../ui/card';

export const PortfolioManager = () => {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image_url: '',
    demo_url: '#',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/admin/portfolio');
      setProjects(response.data);
    } catch (error) {
      toast.error('Error al cargar portafolio');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.put(`/admin/portfolio/${editingProject.id}`, formData);
        toast.success('Proyecto actualizado');
      } else {
        await api.post('/admin/portfolio', formData);
        toast.success('Proyecto creado');
      }
      fetchProjects();
      handleCloseDialog();
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar proyecto?')) {
      try {
        await api.delete(`/admin/portfolio/${id}`);
        toast.success('Proyecto eliminado');
        fetchProjects();
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData({ title: '', category: '', description: '', image_url: '', demo_url: '#' });
  };

  return (
    <div data-testid="portfolio-manager">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Portafolio</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProject(null)} data-testid="add-project-button">
              <Plus className="mr-2" size={20} /> Agregar Proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Categoría</label>
                <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required placeholder="Arquitectura, Salud, Retail, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL de Imagen</label>
                <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} required placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL Demo (opcional)</label>
                <Input value={formData.demo_url} onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">Guardar</Button>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-0">
              <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <span className="inline-block px-3 py-1 bg-[#0DB4B9]/10 text-[#0DB4B9] rounded-full text-sm mb-4">{project.category}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}><Edit size={14} /></Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)} className="text-red-600"><Trash2 size={14} /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortfolioManager;