import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

import Navigation from '@/components/Navigation';
import AdminPanel from '@/components/AdminPanel';
import PasswordModal from '@/components/PasswordModal';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import BlogAdmin from '@/components/BlogAdmin';

import MainPage from '@/pages/MainPage';
import BlogPostPage from '@/pages/BlogPostPage';
import BlogListPage from '@/pages/BlogListPage';

import useSupabaseData from '@/hooks/useSupabaseData';

const initialBlogPosts = [
  { 
    id: 'blog-post-1', 
    title: "5 Mitos sobre el Entrenamiento de Fuerza que Debes Dejar de Creer",
    slug: "5-mitos-entrenamiento-fuerza",
    author: "Carlos Rodríguez",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    excerpt: "El entrenamiento de fuerza es fundamental, pero está rodeado de mitos. Desmentimos los más comunes para que entrenes de forma más inteligente y segura.",
    coverImage: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
    content: "<h2>Mito 1: Levantar pesas te hará 'voluminoso' (especialmente a las mujeres)</h2><p>Este es uno de los mitos más persistentes. La realidad es que ganar una cantidad significativa de masa muscular requiere un superávit calórico muy específico y años de entrenamiento dedicado, además de factores hormonales. Para la mayoría, el entrenamiento de fuerza tonificará los músculos, aumentará el metabolismo y mejorará la composición corporal sin un aumento exagerado de tamaño.</p><h2>Mito 2: Debes sentir dolor al día siguiente para que haya sido un buen entrenamiento</h2><p>El Dolor Muscular de Aparición Tardía (DOMS) no es un indicador de un entrenamiento efectivo. Si bien puede ocurrir, especialmente al empezar una nueva rutina, no es un requisito. Un progreso consistente, el aumento de la fuerza y una buena técnica son mejores indicadores de un entrenamiento exitoso.</p><h2>Mito 3: El cardio es para perder peso, las pesas para ganar músculo</h2><p>La pérdida de peso se reduce a un déficit calórico. El entrenamiento de fuerza es una herramienta increíblemente eficaz para la pérdida de grasa, ya que aumenta la masa muscular, lo que a su vez eleva tu metabolismo basal (las calorías que quemas en reposo).</p><h2>Mito 4: Necesitas pasar horas en el gimnasio</h2><p>La calidad supera a la cantidad. Sesiones de entrenamiento de fuerza bien estructuradas y enfocadas de 45-60 minutos, 3-4 veces por semana, pueden producir resultados excelentes. La clave está en la intensidad y la sobrecarga progresiva.</p><h2>Mito 5: Las máquinas son más seguras que los pesos libres</h2><p>Si bien las máquinas pueden guiar el movimiento, los pesos libres (mancuernas, barras) reclutan más músculos estabilizadores y enseñan al cuerpo a moverse como una unidad coordinada, lo que se traduce mejor en actividades de la vida diaria y deportes. Ambos tienen su lugar, pero no hay que temer a los pesos libres si se aprende la técnica correcta.</p>"
  },
  { 
    id: 'blog-post-2', 
    title: "La Importancia de la Recuperación: Duerme y Come para Rendir Más",
    slug: "importancia-recuperacion-deportiva",
    author: "María González",
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    excerpt: "Entrenas duro, pero ¿descansas igual de duro? La recuperación es donde realmente ocurren las adaptaciones y mejoras. Te contamos por qué es la pieza clave de tu rendimiento.",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    content: "<h2>El entrenamiento rompe, la recuperación construye</h2><p>Imagina que cada sesión de entrenamiento es como hacer pequeñas fisuras en un muro. La recuperación (sueño, nutrición, descanso activo) es el cemento que no solo repara esas fisuras, sino que fortalece el muro para la próxima vez. Sin una recuperación adecuada, solo sigues rompiendo el muro hasta que se derrumba (lesión, sobreentrenamiento).</p><h2>Pilares de la Recuperación</h2><h3>1. Sueño</h3><p>Es el rey de la recuperación. Durante el sueño profundo, tu cuerpo libera la hormona del crecimiento, esencial para la reparación muscular y tisular. Apunta a 7-9 horas de sueño de calidad por noche. Crea una rutina, evita pantallas antes de dormir y mantén tu habitación oscura y fresca.</p><h3>2. Nutrición</h3><p>Lo que comes después de entrenar es crucial. Necesitas reponer el glucógeno muscular (con carbohidratos) y proporcionar proteínas para la reparación muscular. La 'ventana anabólica' no es tan estricta como se pensaba, pero consumir una comida equilibrada dentro de las 2 horas posteriores al ejercicio es una buena práctica.</p><h3>3. Hidratación</h3><p>Incluso una deshidratación leve puede afectar drásticamente tu rendimiento y capacidad de recuperación. Bebe agua a lo largo del día, no solo cuando tengas sed.</p><h3>4. Descanso Activo</h3><p>Los días de descanso no tienen por qué ser completamente sedentarios. El descanso activo, como una caminata ligera, yoga suave o un paseo en bicicleta a baja intensidad, puede ayudar a aumentar el flujo sanguíneo a los músculos, reduciendo el dolor y acelerando la recuperación.</p><h2>Conclusión</h2><p>No subestimes el poder de la recuperación. Es una parte tan importante de tu plan de entrenamiento como las series y repeticiones. Escucha a tu cuerpo, prioriza el descanso y verás cómo tu rendimiento se dispara.</p>"
  }
];

const APP_SETTINGS_TABLE = 'app_settings';
const ADMIN_PASSWORD_KEY = 'admin_password';
const DEFAULT_ADMIN_PASSWORD = "admin";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState(DEFAULT_ADMIN_PASSWORD);
  const [showBlogAdmin, setShowBlogAdmin] = useState(false);
  const location = useLocation();

  const memoizedInitialBlogPosts = useMemo(() => initialBlogPosts, []);
  const { data: blogPosts, setData: setBlogPosts, saveDataToSupabase: saveBlogPosts } = useSupabaseData('blog_posts', memoizedInitialBlogPosts);

  const fetchAdminPassword = useCallback(async () => {
    try {
      let { data, error } = await supabase
        .from(APP_SETTINGS_TABLE)
        .select('value')
        .eq('key', ADMIN_PASSWORD_KEY)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { 
        console.error("Error fetching admin password (select):", error);
        throw error;
      }
      
      if (data && data.value) {
        setAdminPassword(data.value);
      } else {
        const { error: upsertError } = await supabase
          .from(APP_SETTINGS_TABLE)
          .upsert({ key: ADMIN_PASSWORD_KEY, value: DEFAULT_ADMIN_PASSWORD }, { onConflict: 'key' });
        
        if (upsertError) {
          console.error("Error upserting admin password:", upsertError);
          throw upsertError;
        }
        setAdminPassword(DEFAULT_ADMIN_PASSWORD);
      }
    } catch (error) {
      console.error("Error in fetchAdminPassword:", error);
      toast({ title: "Error de configuración", description: "No se pudo cargar la configuración de contraseña. Usando contraseña por defecto.", variant: "destructive" });
      setAdminPassword(DEFAULT_ADMIN_PASSWORD);
    }
  }, []);

  useEffect(() => {
    fetchAdminPassword();
  }, [fetchAdminPassword]);

   useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setShowAdminPanel(true);
    } else {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (password) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setShowAdminPanel(true);
      toast({ title: "Acceso concedido", description: "Panel de administración desbloqueado." });
    } else {
      toast({ title: "Contraseña incorrecta", description: "Inténtalo de nuevo.", variant: "destructive" });
    }
  };

  const handleChangePassword = async (newPassword) => {
    try {
      const { error } = await supabase
        .from(APP_SETTINGS_TABLE)
        .update({ value: newPassword })
        .eq('key', ADMIN_PASSWORD_KEY);

      if (error) throw error;
      setAdminPassword(newPassword);
      setShowChangePasswordModal(false);
      toast({ title: "Contraseña actualizada", description: "La contraseña de administrador ha sido cambiada." });
    } catch (error) {
      console.error("Error updating password:", error);
      toast({ title: "Error al cambiar contraseña", description: error.message, variant: "destructive" });
    }
  };
  
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <Toaster />
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setShowAdminPanel={handleAdminAccess}
      />
      {isAuthenticated && (
        <>
          <AdminPanel 
            showAdminPanel={showAdminPanel}
            setShowAdminPanel={setShowAdminPanel}
            isAdminMode={isAdminMode}
            setIsAdminMode={setIsAdminMode}
            setIsAuthenticated={setIsAuthenticated}
            setShowChangePasswordModal={setShowChangePasswordModal}
            setShowBlogAdmin={setShowBlogAdmin}
          />
          <BlogAdmin 
            isOpen={showBlogAdmin}
            onClose={() => setShowBlogAdmin(false)}
            blogPosts={blogPosts || []}
            setBlogPosts={setBlogPosts}
            saveBlogPosts={saveBlogPosts}
          />
        </>
      )}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
      />
      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        onSubmit={handleChangePassword}
      />
      
      <Routes>
        <Route path="/" element={
          <MainPage 
            setActiveSection={setActiveSection} 
            isAuthenticated={isAuthenticated} 
            isAdminMode={isAdminMode}
            blogPosts={blogPosts}
          />} 
        />
        <Route path="/blog" element={<BlogListPage posts={blogPosts || []} />} />
        <Route path="/blog/:slug" element={<BlogPostPage posts={blogPosts || []} />} />
      </Routes>
    </div>
  );
}

export default App;