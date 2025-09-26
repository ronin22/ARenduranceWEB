import React from 'react';

const Footer = ({ scrollToSection }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img alt="AR Endurance Logo" className="h-8 w-8" src="https://images.unsplash.com/photo-1643784312985-d235913bf61b" />
              <span className="text-xl font-bold">AR Endurance</span>
            </div>
            <p className="text-gray-400">
              Entrenamiento deportivo profesional para atletas de todos los niveles.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('inicio')} className="text-gray-400 hover:text-white">Inicio</button></li>
              <li><button onClick={() => scrollToSection('entrenador')} className="text-gray-400 hover:text-white">Entrenador</button></li>
              <li><button onClick={() => scrollToSection('planes')} className="text-gray-400 hover:text-white">Planes</button></li>
              <li><button onClick={() => scrollToSection('contacto')} className="text-gray-400 hover:text-white">Contacto</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Entrenamiento personalizado</li>
              <li>Coaching nutricional</li>
              <li>Análisis biomecánico</li>
              <li>Preparación para competencias</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-400">
              <p>info@arendurance.com</p>
              <p>+54 11 1234-5678</p>
              <p>Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AR Endurance. Todos los derechos reservados. | Creado por <span className="text-teal-400">onami</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;