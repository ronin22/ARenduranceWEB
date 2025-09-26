import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = ({ heroData, setHeroData, isAdminMode, scrollToSection, saveData }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setHeroData({ ...heroData, backgroundImage: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSave = () => {
    saveData(heroData);
  };

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      {isAdminMode && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
          <label htmlFor="heroImageUpload" className="bg-white text-gray-800 px-4 py-2 rounded-md shadow-lg cursor-pointer hover:bg-gray-100 transition-colors text-sm">
            Cambiar Imagen de Portada
          </label>
          <input
            id="heroImageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Button onClick={handleSave} size="sm"><Save className="h-4 w-4 mr-2" /> Guardar</Button>
        </div>
      )}

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          {isAdminMode ? (
            <input
              type="text"
              value={heroData.title}
              onChange={(e) => setHeroData({...heroData, title: e.target.value})}
              className="bg-transparent border-b border-white text-center w-full text-5xl md:text-7xl font-bold"
            />
          ) : (
            heroData.title
          )}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          {isAdminMode ? (
            <textarea
              value={heroData.subtitle}
              onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
              className="bg-transparent border border-white rounded p-2 w-full text-center text-xl md:text-2xl"
              rows="2"
            />
          ) : (
            heroData.subtitle
          )}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-x-4"
        >
          <Button
            onClick={() => scrollToSection('contacto')}
            className="btn-primary text-white px-8 py-3 text-lg"
          >
            Contactar ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={() => scrollToSection('planes')}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg"
          >
            Ver planes
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;