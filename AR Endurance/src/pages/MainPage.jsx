import React, { useEffect, useMemo } from 'react';
import useSupabaseData from '@/hooks/useSupabaseData';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

import HeroSection from '@/components/sections/HeroSection';
import AboutTrainerSection from '@/components/sections/AboutTrainerSection';
import TrainingPlansSection from '@/components/sections/TrainingPlansSection';
import ResourcesSection from '@/components/sections/ResourcesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import BlogHighlightSection from '@/components/sections/BlogHighlightSection';

const initialHeroData = {
  id: 'hero-data-singleton', 
  title: "Transforma tu rendimiento deportivo",
  subtitle: "Entrenamiento personalizado y coaching profesional para atletas de todos los niveles",
  backgroundImage: "https://storage.googleapis.com/hostinger-horizons-assets-prod/9a34ac19-ee1c-473d-8bdb-5bc294be9269/657a7cd2bc774b948eafbd286ed92c13.jpg"
};

const initialTrainerData = {
  id: 'trainer-data-singleton',
  name: "Carlos Rodríguez",
  title: "Entrenador Principal",
  bio: "Con más de 10 años de experiencia en entrenamiento deportivo, especializado en ciclismo de resistencia y triatlón. Certificado por la Federación Internacional de Triatlón.",
  credentials: ["Licenciado en Ciencias del Deporte", "Certificación ITU Level 2", "Especialista en Nutrición Deportiva"],
  instagram: "@carlosrodriguez_coach",
  email: "info@arendurance.com",
  phone: "+54 11 1234-5678",
  image: "https://images.unsplash.com/photo-1613533847488-5d1869695ee0"
};

const initialAssistantTrainers = [
  { id: 'assistant-1', name: "María González", title: "Entrenadora de Running", bio: "Especialista en carreras de fondo y maratón. Ex-atleta olímpica con experiencia en coaching personalizado.", credentials: ["Licenciada en Educación Física", "Certificación IAAF Level 2"], instagram: "@maria_running_coach", image: "https://images.unsplash.com/photo-1609202294447-002f37886769" },
  { id: 'assistant-2', name: "Diego Martínez", title: "Entrenador de Natación", bio: "Entrenador especializado en técnica de natación y deportes acuáticos. Formador de nadadores de élite.", credentials: ["Técnico Superior en Natación", "Certificación World Aquatics"], instagram: "@diego_swim_coach", image: "https://images.unsplash.com/photo-1551803091-e37a8d51add1" }
];

const initialTrainingPlans = [
  { id: 'plan-basic', name: "Plan Básico", description: "Ideal para principiantes que buscan mejorar su condición física general", features: ["3 sesiones por semana", "Plan nutricional básico", "Seguimiento mensual", "Acceso a app móvil"], price: "$150", period: "/mes", popular: false },
  { id: 'plan-advanced', name: "Plan Avanzado", description: "Para atletas intermedios que buscan mejorar su rendimiento específico", features: ["5 sesiones por semana", "Plan nutricional personalizado", "Seguimiento semanal", "Análisis biomecánico", "Acceso a app móvil"], price: "$250", period: "/mes", popular: true },
  { id: 'plan-elite', name: "Plan Elite", description: "Entrenamiento profesional para atletas de alto rendimiento", features: ["Entrenamiento diario", "Nutrición especializada", "Seguimiento diario", "Análisis completo", "Coaching 1:1", "Acceso prioritario"], price: "$400", period: "/mes", popular: false }
];

const initialTestimonials = [
  { id: 'testimonial-1', name: "Ana Pérez", sport: "Triatlón", achievement: "Finisher Ironman 70.3", text: "Gracias al entrenamiento personalizado logré completar mi primer Ironman. El seguimiento fue excepcional.", rating: 5, image: "https://images.unsplash.com/photo-1600663085088-7e460ff086ac", instagram: "@ana_tri_athlete" },
  { id: 'testimonial-2', name: "Roberto Silva", sport: "Ciclismo", achievement: "1er lugar Gran Fondo", text: "Mejoré mi FTP en un 20% en solo 6 meses. El plan de entrenamiento fue perfecto para mis objetivos.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", instagram: "@roberto_cyclist" },
  { id: 'testimonial-3', name: "Laura Mendoza", sport: "Running", achievement: "Sub 3:30 en Maratón", text: "Logré mi objetivo de bajar de 3:30 en maratón. El coaching fue fundamental para mi progreso.", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", instagram: "@laura_runner" }
];

const initialSponsors = [
  { id: 'sponsor-1', name: "SportTech", logo: "https://images.unsplash.com/photo-1693240708742-171b1f0f8abf", website: "https://sporttech.com", instagram: "@sporttech_official" },
  { id: 'sponsor-2', name: "NutriPro", logo: "https://images.unsplash.com/photo-1693240708742-171b1f0f8abf", website: "https://nutripro.com", instagram: "@nutripro_sports" },
  { id: 'sponsor-3', name: "EnduranceGear", logo: "https://images.unsplash.com/photo-1693240708742-171b1f0f8abf", website: "https://endurancegear.com", instagram: "@endurance_gear" }
];

const initialNews = [
  { id: 'news-1', title: "Nuevos cupos disponibles para entrenamiento grupal", date: "2024-01-15", content: "Abrimos nuevos horarios para entrenamientos grupales de ciclismo y running.", image: "https://images.unsplash.com/photo-1504777014986-5a97c25065f2" },
  { id: 'news-2', title: "Taller de nutrición deportiva - Febrero 2024", date: "2024-01-10", content: "Únete a nuestro taller especializado en nutrición para deportes de resistencia.", image: "https://images.unsplash.com/photo-1543286386-71314a00ae56" },
  { id: 'news-3', title: "Resultados destacados de nuestros atletas", date: "2024-01-05", content: "Celebramos los logros de nuestros atletas en las competencias de fin de año.", image: "https://images.unsplash.com/photo-1517649763983-6e3b6b0987a8" }
];

const initialResources = [
  { id: 'resource-1', title: "Guía de entrenamiento para principiantes", type: "PDF", description: "Todo lo que necesitas saber para comenzar tu entrenamiento deportivo", downloadUrl: "#" },
  { id: 'resource-2', title: "Plan nutricional básico", type: "PDF", description: "Fundamentos de nutrición para deportistas de resistencia", downloadUrl: "#" },
  { id: 'resource-3', title: "Ejercicios de calentamiento", type: "Video", description: "Rutina completa de calentamiento pre-entrenamiento", downloadUrl: "#" }
];

const MainPage = ({ setActiveSection, isAuthenticated, isAdminMode, blogPosts }) => {
  const memoizedInitialHeroData = useMemo(() => [initialHeroData], []);
  const { data: heroData, setData: setHeroData, saveDataToSupabase: saveHeroData } = useSupabaseData('hero_section', memoizedInitialHeroData, true);
  
  const memoizedInitialTrainerData = useMemo(() => [initialTrainerData], []);
  const { data: trainerData, setData: setTrainerData, saveDataToSupabase: saveTrainerData } = useSupabaseData('trainer_section', memoizedInitialTrainerData, true);
  
  const memoizedInitialAssistants = useMemo(() => initialAssistantTrainers, []);
  const { data: assistantTrainers, setData: setAssistantTrainers, saveDataToSupabase: saveAssistantTrainers } = useSupabaseData('assistant_trainers', memoizedInitialAssistants);
  
  const memoizedInitialPlans = useMemo(() => initialTrainingPlans, []);
  const { data: trainingPlans, setData: setTrainingPlans, saveDataToSupabase: saveTrainingPlans } = useSupabaseData('training_plans', memoizedInitialPlans);
  
  const memoizedInitialTestimonials = useMemo(() => initialTestimonials, []);
  const { data: testimonials, setData: setTestimonials, saveDataToSupabase: saveTestimonials } = useSupabaseData('testimonials', memoizedInitialTestimonials);
  
  const memoizedInitialSponsors = useMemo(() => initialSponsors, []);
  const { data: sponsors, setData: setSponsors, saveDataToSupabase: saveSponsors } = useSupabaseData('sponsors', memoizedInitialSponsors);
  
  const memoizedInitialNews = useMemo(() => initialNews, []);
  const { data: news, setData: setNews, saveDataToSupabase: saveNews } = useSupabaseData('news', memoizedInitialNews);
  
  const memoizedInitialResources = useMemo(() => initialResources, []);
  const { data: resources, setData: setResources, saveDataToSupabase: saveResources } = useSupabaseData('resources', memoizedInitialResources);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [setActiveSection]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const contactData = Object.fromEntries(formData.entries());
    
    try {
      const { error } = await supabase.from('contact_submissions').insert([contactData]);
      if (error) throw error;
      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      e.target.reset();
    } catch (error) {
      toast({
        title: "Error al enviar mensaje",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {heroData && <HeroSection 
        heroData={heroData} 
        setHeroData={setHeroData} 
        isAdminMode={isAdminMode && isAuthenticated} 
        scrollToSection={scrollToSection} 
        saveData={saveHeroData}
      />}
      {trainerData && <AboutTrainerSection 
        trainerData={trainerData} 
        setTrainerData={setTrainerData} 
        assistantTrainers={assistantTrainers || []}
        setAssistantTrainers={setAssistantTrainers}
        isAdminMode={isAdminMode && isAuthenticated} 
        saveTrainerData={saveTrainerData}
        saveAssistantTrainers={saveAssistantTrainers}
      />}
      <TrainingPlansSection 
        trainingPlans={trainingPlans || []} 
        setTrainingPlans={setTrainingPlans} 
        isAdminMode={isAdminMode && isAuthenticated} 
        scrollToSection={scrollToSection} 
        saveData={saveTrainingPlans}
      />
      <ResourcesSection 
        resources={resources || []} 
        setResources={setResources} 
        isAdminMode={isAdminMode && isAuthenticated}
        saveData={saveResources}
      />
      <TestimonialsSection 
        testimonials={testimonials || []} 
        setTestimonials={setTestimonials} 
        isAdminMode={isAdminMode && isAuthenticated} 
        saveData={saveTestimonials}
      />
      <SponsorsSection 
        sponsors={sponsors || []} 
        setSponsors={setSponsors} 
        isAdminMode={isAdminMode && isAuthenticated} 
        saveData={saveSponsors}
      />
      <NewsSection 
        news={news || []} 
        setNews={setNews} 
        isAdminMode={isAdminMode && isAuthenticated}
        saveData={saveNews}
      />
       <BlogHighlightSection posts={blogPosts || []} />
      <ContactSection 
        handleContactSubmit={handleContactSubmit} 
        contactInfo={trainerData ? { email: trainerData.email, phone: trainerData.phone } : { email: initialTrainerData.email, phone: initialTrainerData.phone }}
        isAdminMode={isAdminMode && isAuthenticated}
        setTrainerData={setTrainerData}
        trainerData={trainerData}
      />
      <Footer scrollToSection={scrollToSection} />
    </>
  );
};

export default MainPage;