import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = ({ isMenuOpen, setIsMenuOpen, activeSection, setActiveSection, setShowAdminPanel }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'entrenador', label: 'Entrenador' },
    { id: 'planes', label: 'Planes' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'noticias', label: 'Noticias' },
    { id: 'blog', label: 'Blog' },
    { id: 'contacto', label: 'Contacto' }
  ];

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          setActiveSection(sectionId);
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        setActiveSection(sectionId);
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="fixed top-0 w-full z-50 navbar-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-3" onClick={() => setActiveSection('inicio')}>
            <img  alt="AR Endurance Logo" className="h-10 w-auto" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/9a34ac19-ee1c-473d-8bdb-5bc294be9269/9dc4ddcb45b6b3b9c7a40a2812789245.jpg" />
            <span className="text-xl font-bold text-gradient" title="AR Endurance">AR Endurance</span>
          </NavLink>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => item.id === 'blog' ? navigate('/blog') : scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                  activeSection === item.id && location.pathname === '/' ? 'text-teal-600' : 
                  (item.id === 'blog' && location.pathname.startsWith('/blog')) ? 'text-teal-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => setShowAdminPanel(true)}
              variant="outline"
              size="sm"
              className="ml-4"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'blog' ? navigate('/blog') : scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  setShowAdminPanel(true);
                  setIsMenuOpen(false);
                }}
                variant="outline"
                size="sm"
                className="w-full mt-2"
              >
                <Settings className="h-4 w-4 mr-2" />
                Panel Admin
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;