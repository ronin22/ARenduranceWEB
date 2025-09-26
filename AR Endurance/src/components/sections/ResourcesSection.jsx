import React from 'react';
import { Target, Zap, Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ResourcesSection = ({ resources, setResources, isAdminMode, saveData }) => {
  const addResource = () => {
    const newResource = {
      id: `resource-${Date.now()}`,
      title: "Nuevo Recurso",
      type: "PDF",
      description: "Descripción del recurso...",
      downloadUrl: "#"
    };
    setResources(prevResources => [...prevResources, newResource]);
  };

  const removeResource = (id) => {
    setResources(prevResources => prevResources.filter(resource => resource.id !== id));
    toast({ title: "Recurso eliminado", description: "El recurso ha sido eliminado."});
  };

  const handleResourceChange = (id, field, value) => {
    const updatedResources = resources.map(r => 
      r.id === id ? {...r, [field]: value} : r
    );
    setResources(updatedResources);
  };

  const handleSave = () => {
    saveData(resources);
  };

  return (
    <section id="recursos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Notas y Recursos</h2>
          <p className="text-xl text-gray-600">Contenido gratuito para mejorar tu rendimiento</p>
        </div>

        {isAdminMode && (
          <div className="text-center mb-8">
            <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Guardar Cambios de Recursos</Button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {(resources || []).map((resource) => (
            <div key={resource.id} className="bg-gray-50 rounded-lg p-6 card-hover relative">
              {isAdminMode && (
                <div className="absolute top-2 right-2 z-10">
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removeResource(resource.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center mb-4">
                <div className="bg-teal-600 text-white p-2 rounded-lg mr-4">
                  {resource.type === 'PDF' ? (
                    <Target className="h-6 w-6" />
                  ) : (
                    <Zap className="h-6 w-6" />
                  )}
                </div>
                {isAdminMode ? (
                  <select 
                    value={resource.type} 
                    onChange={(e) => handleResourceChange(resource.id, 'type', e.target.value)}
                    className="text-sm font-medium text-teal-600 bg-teal-100 px-2 py-1 rounded border border-teal-200"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Video">Video</option>
                    <option value="Artículo">Artículo</option>
                  </select>
                ) : (
                  <span className="text-sm font-medium text-teal-600 bg-teal-100 px-2 py-1 rounded">
                    {resource.type}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isAdminMode ? (
                  <Input
                    type="text"
                    value={resource.title}
                    onChange={(e) => handleResourceChange(resource.id, 'title', e.target.value)}
                    className="border rounded px-2 py-1 w-full font-semibold text-xl"
                  />
                ) : (
                  resource.title
                )}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {isAdminMode ? (
                  <Textarea
                    value={resource.description}
                    onChange={(e) => handleResourceChange(resource.id, 'description', e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                    rows="2"
                  />
                ) : (
                  resource.description
                )}
              </p>
              
              {isAdminMode && (
                <div className="mb-4">
                  <label htmlFor={`downloadUrl-${resource.id}`} className="text-xs text-gray-500 block mb-1">URL de Descarga/Enlace</label>
                  <Input
                    id={`downloadUrl-${resource.id}`}
                    type="text"
                    value={resource.downloadUrl}
                    onChange={(e) => handleResourceChange(resource.id, 'downloadUrl', e.target.value)}
                    className="border rounded px-2 py-1 w-full text-sm"
                    placeholder="https://ejemplo.com/recurso.pdf"
                  />
                </div>
              )}

              <Button
                onClick={() => {
                  if (resource.downloadUrl && resource.downloadUrl !== "#") {
                    window.open(resource.downloadUrl, '_blank');
                  } else {
                    toast({
                      title: "🚧 Enlace no disponible",
                      description: "Este recurso aún no tiene un enlace de descarga configurado."
                    });
                  }
                }}
                className="w-full"
                variant="outline"
              >
                {resource.type === 'Video' || resource.type === 'Artículo' ? 'Ver Recurso' : 'Descargar gratis'}
              </Button>
            </div>
          ))}
        </div>
        {isAdminMode && (
          <div className="text-center mt-8">
            <Button
              onClick={addResource}
              className="btn-primary text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Recurso
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;