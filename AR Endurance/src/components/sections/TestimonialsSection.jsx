import React from 'react';
import { Star, Instagram, Plus, Trash2, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const TestimonialsSection = ({ testimonials, setTestimonials, isAdminMode, saveData }) => {
  const addTestimonial = () => {
    const newTestimonial = {
      id: `testimonial-${Date.now()}`,
      name: "Nuevo Cliente",
      sport: "Deporte",
      achievement: "Logro Alcanzado",
      text: "Un testimonio increíble sobre cómo mejoró...",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", 
      instagram: "@nuevo_cliente"
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const removeTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    toast({ title: "Testimonio eliminado", description: "El testimonio ha sido eliminado."});
  };

  const handleTestimonialChange = (id, field, value) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleImageUpload = (id, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleTestimonialChange(id, 'image', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    saveData(testimonials);
  };

  return (
    <section id="testimonios" className="py-20 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Testimonios</h2>
          <p className="text-xl text-gray-600">Lo que dicen nuestros atletas</p>
        </div>

        {isAdminMode && (
          <div className="text-center mb-8">
            <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Guardar Cambios de Testimonios</Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(testimonials || []).map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card rounded-lg p-6 card-hover relative">
              {isAdminMode && (
                <div className="absolute top-2 right-2 z-10 space-x-1">
                   <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white" onClick={() => document.getElementById(`testimonialImageUpload-${testimonial.id}`).click()}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <input type="file" id={`testimonialImageUpload-${testimonial.id}`} accept="image/*" className="hidden" onChange={(e) => handleImageUpload(testimonial.id, e)} />
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removeTestimonial(testimonial.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center mb-4">
                <img alt={`${testimonial.name} - ${testimonial.sport} athlete`} className="w-12 h-12 rounded-full object-cover mr-4" src={testimonial.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2"} />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isAdminMode ? (
                      <Input value={testimonial.name} onChange={(e) => handleTestimonialChange(testimonial.id, 'name', e.target.value)} className="h-8 text-sm" />
                    ) : (
                      testimonial.name
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isAdminMode ? (
                      <Input value={testimonial.sport} onChange={(e) => handleTestimonialChange(testimonial.id, 'sport', e.target.value)} className="h-8 text-xs mt-1" />
                    ) : (
                      testimonial.sport
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    onClick={() => isAdminMode && handleTestimonialChange(testimonial.id, 'rating', i + 1)}
                    style={{ cursor: isAdminMode ? 'pointer' : 'default' }}
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-4 italic text-sm">
                "{isAdminMode ? (
                  <Textarea value={testimonial.text} onChange={(e) => handleTestimonialChange(testimonial.id, 'text', e.target.value)} rows="4" className="text-sm" />
                ) : (
                  testimonial.text
                )}"
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-teal-600">
                  {isAdminMode ? (
                    <Input value={testimonial.achievement} onChange={(e) => handleTestimonialChange(testimonial.id, 'achievement', e.target.value)} className="h-8 text-xs" />
                  ) : (
                    testimonial.achievement
                  )}
                </span>
                <div className="flex items-center">
                  <Instagram className="h-4 w-4 text-gray-400 mr-1" />
                  {isAdminMode ? (
                    <Input value={testimonial.instagram} onChange={(e) => handleTestimonialChange(testimonial.id, 'instagram', e.target.value)} placeholder="@usuario" className="h-8 text-xs w-24" />
                  ) : (
                    <a href={`https://instagram.com/${testimonial.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 hover:underline">
                      {testimonial.instagram}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {isAdminMode && (
          <div className="text-center mt-8">
            <Button onClick={addTestimonial} className="btn-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              Agregar testimonio
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;