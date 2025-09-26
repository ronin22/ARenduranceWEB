import React from 'react';
import { Instagram, CheckCircle, Plus, Trash2, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const AboutTrainerSection = ({ trainerData, setTrainerData, assistantTrainers, setAssistantTrainers, isAdminMode, saveTrainerData, saveAssistantTrainers }) => {
  
  const handleTrainerDataChange = (field, value) => {
    setTrainerData(prev => ({ ...prev, [field]: value }));
  };

  const handleTrainerImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleTrainerDataChange('image', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCredentialChange = (index, value) => {
    const newCredentials = [...trainerData.credentials];
    newCredentials[index] = value;
    handleTrainerDataChange('credentials', newCredentials);
  };
  
  const addCredential = () => {
    handleTrainerDataChange('credentials', [...trainerData.credentials, "Nueva credencial"]);
  };

  const removeCredential = (index) => {
    const newCredentials = trainerData.credentials.filter((_, i) => i !== index);
    handleTrainerDataChange('credentials', newCredentials);
  };


  const handleAssistantChange = (id, field, value) => {
    setAssistantTrainers(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };
  
  const handleAssistantImageChange = (id, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleAssistantChange(id, 'image', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAssistantCredentialChange = (assistantId, credIndex, value) => {
    setAssistantTrainers(prev => prev.map(a => {
      if (a.id === assistantId) {
        const newCredentials = [...a.credentials];
        newCredentials[credIndex] = value;
        return { ...a, credentials: newCredentials };
      }
      return a;
    }));
  };
  
  const addAssistantCredential = (assistantId) => {
     setAssistantTrainers(prev => prev.map(a => {
      if (a.id === assistantId) {
        return { ...a, credentials: [...a.credentials, "Nueva credencial"] };
      }
      return a;
    }));
  };

  const removeAssistantCredential = (assistantId, credIndex) => {
    setAssistantTrainers(prev => prev.map(a => {
      if (a.id === assistantId) {
        const newCredentials = a.credentials.filter((_, i) => i !== credIndex);
        return { ...a, credentials: newCredentials };
      }
      return a;
    }));
  };

  const addAssistantTrainer = () => {
    const newAssistant = {
      id: `assistant-${Date.now()}`,
      name: "Nuevo Asistente",
      title: "Título Asistente",
      bio: "Bio del asistente...",
      credentials: ["Credencial 1"],
      instagram: "@nuevo_asistente",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" 
    };
    setAssistantTrainers(prev => [...prev, newAssistant]);
  };

  const removeAssistantTrainer = (id) => {
    setAssistantTrainers(prev => prev.filter(a => a.id !== id));
    toast({ title: "Asistente eliminado", description: "El entrenador asistente ha sido eliminado."});
  };

  const handleSave = () => {
    saveTrainerData(trainerData);
    saveAssistantTrainers(assistantTrainers);
  }

  return (
    <section id="entrenador" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre el Entrenador</h2>
          <p className="text-xl text-gray-600">Conoce a nuestro equipo de profesionales</p>
        </div>
        
        {isAdminMode && (
          <div className="text-center mb-8">
            <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Guardar Cambios de Entrenadores</Button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div className="relative">
            <img alt={trainerData.name || "Entrenador Principal"} className="w-full h-auto md:h-[500px] object-cover rounded-lg shadow-lg" src={trainerData.image || "https://images.unsplash.com/photo-1613533847488-5d1869695ee0"} />
            {isAdminMode && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <label htmlFor="trainerImageUpload" className="bg-white text-gray-800 px-3 py-1.5 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition-colors text-xs">
                  Cambiar Foto
                </label>
                <input id="trainerImageUpload" type="file" accept="image/*" onChange={handleTrainerImageChange} className="hidden" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {isAdminMode ? (
                <Input value={trainerData.name} onChange={(e) => handleTrainerDataChange('name', e.target.value)} className="text-3xl font-bold" />
              ) : (
                trainerData.name
              )}
            </h3>
            <p className="text-xl text-teal-600 mb-4">
              {isAdminMode ? (
                <Input value={trainerData.title} onChange={(e) => handleTrainerDataChange('title', e.target.value)} className="text-xl" />
              ) : (
                trainerData.title
              )}
            </p>
            <p className="text-gray-600 mb-6">
              {isAdminMode ? (
                <Textarea value={trainerData.bio} onChange={(e) => handleTrainerDataChange('bio', e.target.value)} rows="5" />
              ) : (
                trainerData.bio
              )}
            </p>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Credenciales:</h4>
              <ul className="space-y-2">
                {(trainerData.credentials || []).map((credential, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0" />
                    {isAdminMode ? (
                      <div className="flex items-center w-full">
                        <Input value={credential} onChange={(e) => handleCredentialChange(index, e.target.value)} className="flex-1 mr-2" />
                        <Button variant="ghost" size="icon" onClick={() => removeCredential(index)} className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      credential
                    )}
                  </li>
                ))}
              </ul>
              {isAdminMode && (
                <Button variant="outline" size="sm" onClick={addCredential} className="mt-2">
                  <Plus className="h-4 w-4 mr-1" /> Agregar Credencial
                </Button>
              )}
            </div>
            
            <div className="flex items-center">
              <Instagram className="h-5 w-5 text-gray-500 mr-2" />
              {isAdminMode ? (
                <Input value={trainerData.instagram} onChange={(e) => handleTrainerDataChange('instagram', e.target.value)} placeholder="@usuario_instagram" />
              ) : (
                <a href={`https://instagram.com/${trainerData.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                  {trainerData.instagram}
                </a>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Entrenadores Asistentes</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {(assistantTrainers || []).map((trainer) => (
              <div key={trainer.id} className="bg-gray-50 rounded-lg p-6 card-hover relative">
                {isAdminMode && (
                  <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => removeAssistantTrainer(trainer.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <div className="flex items-start mb-4">
                  <div className="relative mr-4">
                    <img alt={trainer.name} className="w-20 h-20 rounded-full object-cover" src={trainer.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2"} />
                     {isAdminMode && (
                        <label htmlFor={`assistantImageUpload-${trainer.id}`} className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow cursor-pointer">
                          <Edit3 className="h-3 w-3 text-teal-600" />
                        </label>
                     )}
                    <input id={`assistantImageUpload-${trainer.id}`} type="file" accept="image/*" onChange={(e) => handleAssistantImageChange(trainer.id, e)} className="hidden" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900">
                      {isAdminMode ? (
                        <Input value={trainer.name} onChange={(e) => handleAssistantChange(trainer.id, 'name', e.target.value)} className="text-xl font-semibold" />
                      ) : (
                        trainer.name
                      )}
                    </h4>
                    <p className="text-teal-600">
                      {isAdminMode ? (
                        <Input value={trainer.title} onChange={(e) => handleAssistantChange(trainer.id, 'title', e.target.value)} />
                      ) : (
                        trainer.title
                      )}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 text-sm">
                  {isAdminMode ? (
                    <Textarea value={trainer.bio} onChange={(e) => handleAssistantChange(trainer.id, 'bio', e.target.value)} rows="4" />
                  ) : (
                    trainer.bio
                  )}
                </p>
                <div className="mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm">Credenciales:</h5>
                  <ul className="space-y-1">
                    {(trainer.credentials || []).map((credential, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="h-4 w-4 text-teal-600 mr-2 flex-shrink-0" />
                        {isAdminMode ? (
                          <div className="flex items-center w-full">
                            <Input value={credential} onChange={(e) => handleAssistantCredentialChange(trainer.id, index, e.target.value)} className="flex-1 mr-1 text-xs h-7" />
                            <Button variant="ghost" size="icon" onClick={() => removeAssistantCredential(trainer.id, index)} className="h-6 w-6">
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </Button>
                          </div>
                        ) : (
                          credential
                        )}
                      </li>
                    ))}
                  </ul>
                   {isAdminMode && (
                    <Button variant="outline" size="sm" onClick={() => addAssistantCredential(trainer.id)} className="mt-2 text-xs h-7">
                      <Plus className="h-3 w-3 mr-1" /> Agregar
                    </Button>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Instagram className="h-4 w-4 text-gray-500 mr-2" />
                  {isAdminMode ? (
                     <Input value={trainer.instagram} onChange={(e) => handleAssistantChange(trainer.id, 'instagram', e.target.value)} placeholder="@usuario_instagram" className="text-sm h-8" />
                  ) : (
                    <a href={`https://instagram.com/${trainer.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                      {trainer.instagram}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={addAssistantTrainer} className="btn-primary text-white">
                <Plus className="h-4 w-4 mr-2" /> Agregar Asistente
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutTrainerSection;