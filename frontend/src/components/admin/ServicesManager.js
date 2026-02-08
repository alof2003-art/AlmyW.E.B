import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Card, CardContent } from '../ui/card';

export const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pages: '',
    features: '',
    price: 0,
    renewal_price: 0,
    is_featured: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/admin/services');
      setServices(response.data);
    } catch (error) {
      toast.error('Error al cargar servicios');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingService) {
        await api.put(`/admin/services/${editingService.id}`, formData);
        toast.success('Servicio actualizado');
      } else {
        await api.post('/admin/services', formData);
        toast.success('Servicio creado');
      }
      fetchServices();
      handleCloseDialog();
    } catch (error) {
      toast.error('Error al guardar servicio');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Eliminar este servicio?')) {
      try {
        await api.delete(`/admin/services/${id}`);
        toast.success('Servicio eliminado');
        fetchServices();
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData(service);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      pages: '',
      features: '',
      price: 0,
      renewal_price: 0,
      is_featured: false,
      display_order: 0,
    });
  };

  return (
    <div data-testid="services-manager">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Servicios</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingService(null)} data-testid="add-service-button">
              <Plus className="mr-2" size={20} /> Agregar Servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Editar Servicio' : 'Nuevo Servicio'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titulo</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Descripcion</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Paginas</label>
                <Input
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  placeholder="Ej: Hasta 5 secciones"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Caracteristicas (separadas por |)</label>
                <Textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={3}
                  placeholder="Hosting y Dominio|Optimizacion SEO basica"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Precio</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Precio Renovacion</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.renewal_price}
                    onChange={(e) => setFormData({ ...formData, renewal_price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="is_featured" className="text-sm font-medium">
                  Destacado (recomendado)
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Orden de visualizacion</label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="flex-1" data-testid="save-service-button">
                  <Save className="mr-2" size={20} />
                  Guardar
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {service.title}
                    {service.is_featured && (
                      <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">
                        DESTACADO
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-[#0DB4B9]">
                    ${service.price.toFixed(2)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(service)}>
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;