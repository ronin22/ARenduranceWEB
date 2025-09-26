import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ContactSection = ({ handleContactSubmit, contactInfo, isAdminMode, setTrainerData, trainerData }) => {
  
  const handleInfoChange = (field, value) => {
    setTrainerData(prev => ({...prev, [field]: value}));
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h2>
          <p className="text-xl text-gray-600">¿Listo para comenzar tu transformación?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Información de contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-teal-600 mr-3" />
                {isAdminMode ? (
                  <Input 
                    type="email" 
                    value={contactInfo.email || ''} 
                    onChange={(e) => handleInfoChange('email', e.target.value)}
                    className="text-gray-600 flex-1"
                    placeholder="Email de contacto"
                  />
                ) : (
                  <span className="text-gray-600">{contactInfo.email}</span>
                )}
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-teal-600 mr-3" />
                 {isAdminMode ? (
                  <Input 
                    type="tel" 
                    value={contactInfo.phone || ''} 
                    onChange={(e) => handleInfoChange('phone', e.target.value)}
                    className="text-gray-600 flex-1"
                    placeholder="Teléfono de contacto"
                  />
                ) : (
                  <span className="text-gray-600">{contactInfo.phone}</span>
                )}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-teal-600 mr-3" />
                <span className="text-gray-600">Buenos Aires, Argentina</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Síguenos en redes sociales</h4>
              <div className="flex space-x-4">
                <Button
                  onClick={() => toast({
                    title: "🚧 Esta función no está implementada aún",
                    description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
                  })}
                  variant="outline"
                  size="sm"
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  onClick={() => toast({
                    title: "🚧 Esta función no está implementada aún",
                    description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
                  })}
                  variant="outline"
                  size="sm"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-1">
                  Objetivo deportivo
                </Label>
                <select
                  id="sport"
                  name="sport"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-background"
                >
                  <option value="">Selecciona tu objetivo</option>
                  <option value="ciclismo">Ciclismo</option>
                  <option value="running">Running</option>
                  <option value="triatlon">Triatlón</option>
                  <option value="natacion">Natación</option>
                  <option value="fitness">Fitness general</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </Label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  placeholder="Cuéntanos sobre tus objetivos y experiencia deportiva..."
                ></textarea>
              </div>
              
              <Button
                type="submit"
                className="w-full btn-primary text-white"
              >
                Enviar mensaje
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;