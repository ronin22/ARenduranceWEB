import React from 'react';
import { Calendar, Plus, Trash2, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; 

const NewsSection = ({ news, setNews, isAdminMode, saveData }) => {
  const addNewsArticle = () => {
    const newArticle = {
      id: `news-${Date.now()}`,
      title: "Nueva noticia",
      date: new Date().toISOString().split('T')[0],
      content: "Contenido de la noticia...",
      image: "https://images.unsplash.com/photo-1504777014986-5a97c25065f2" 
    };
    setNews(prevNews => [...prevNews, newArticle]);
  };

  const removeNewsArticle = (id) => {
    setNews(prevNews => prevNews.filter(article => article.id !== id));
    toast({ title: "Noticia eliminada", description: "La noticia ha sido eliminada."});
  };

  const handleNewsChange = (id, field, value) => {
    const updatedNews = news.map(n => 
      n.id === id ? {...n, [field]: value} : n
    );
    setNews(updatedNews);
  };
  
  const handleImageUpload = (id, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleNewsChange(id, 'image', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    saveData(news);
  };

  return (
    <section id="noticias" className="py-20 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Noticias y Calendario</h2>
          <p className="text-xl text-gray-600">Mantente al día con nuestras novedades</p>
        </div>

        {isAdminMode && (
          <div className="text-center mb-8">
            <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Guardar Cambios de Noticias</Button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {(news || []).map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover relative">
              {isAdminMode && (
                <div className="absolute top-2 right-2 z-10 space-x-1">
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white" onClick={() => document.getElementById(`newsImageUpload-${article.id}`).click()}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <input type="file" id={`newsImageUpload-${article.id}`} accept="image/*" className="hidden" onChange={(e) => handleImageUpload(article.id, e)} />
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removeNewsArticle(article.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <img alt={`${article.title} news image`} className="w-full h-48 object-cover" src={article.image} />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Calendar className="h-4 w-4 text-teal-600 mr-2" />
                  {isAdminMode ? (
                    <Input 
                      type="date" 
                      value={article.date} 
                      onChange={(e) => handleNewsChange(article.id, 'date', e.target.value)}
                      className="text-sm text-gray-600 flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {isAdminMode ? (
                    <Input
                      type="text"
                      value={article.title}
                      onChange={(e) => handleNewsChange(article.id, 'title', e.target.value)}
                      className="border rounded px-2 py-1 w-full font-semibold text-xl"
                    />
                  ) : (
                    article.title
                  )}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isAdminMode ? (
                    <Textarea
                      value={article.content}
                      onChange={(e) => handleNewsChange(article.id, 'content', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                      rows="3"
                    />
                  ) : (
                    article.content
                  )}
                </p>
                <Button
                  onClick={() => toast({
                    title: "🚧 Esta función no está implementada aún",
                    description: "¡No te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
                  })}
                  variant="outline"
                  className="w-full"
                >
                  Leer más
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {isAdminMode && (
          <div className="text-center mt-8">
            <Button
              onClick={addNewsArticle}
              className="btn-primary text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar noticia
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;