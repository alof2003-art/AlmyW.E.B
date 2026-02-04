import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../utils/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Card, CardContent } from '../ui/card';

export const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    content: '',
    rating: 5,
    avatar_url: '',
    display_order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/admin/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      toast.error('Error al cargar testimonios');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await api.put(`/admin/testimonials/${editingTestimonial.id}`, formData);
        toast.success('Testimonio actualizado');
      } else {
        await api.post('/admin/testimonials', formData);
        toast.success('Testimonio creado');
      }
      fetchTestimonials();
      handleCloseDialog();
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Eliminar testimonio?')) {
      try {
        await api.delete(`/admin/testimonials/${id}`);
        toast.success('Testimonio eliminado');
        fetchTestimonials();
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTestimonial(null);
    setFormData({ name: '', company: '', content: '', rating: 5, avatar_url: '', display_order: 0 });
  };

  return (
    <div data-testid="testimonials-manager">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestionar Testimonios</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTestimonial(null)} data-testid="add-testimonial-button">
              <Plus className="mr-2" size={20} /> Agregar Testimonio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Empresa (opcional)</label>
                <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Testimonio</label>
                <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Calificacion (1-5)</label>
                <Input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL Avatar (opcional)</label>
                <Input value={formData.avatar_url} onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">Guardar</Button>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {testimonial.avatar_url && (
                      <img src={testimonial.avatar_url} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      {testimonial.company && <p className="text-sm text-gray-500">{testimonial.company}</p>}
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600">"{testimonial.content}"</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(testimonial)}><Edit size={16} /></Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(testimonial.id)} className="text-red-600"><Trash2 size={16} /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsManager;