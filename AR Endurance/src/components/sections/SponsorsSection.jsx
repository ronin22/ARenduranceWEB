import React from 'react';
import { Instagram, Plus, Trash2, Edit3, Save, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const SponsorsSection = ({ sponsors, setSponsors, isAdminMode, saveData }) => {
  const addSponsor = () => {
    const newSponsor = {
      id: `sponsor-${Date.now()}`,
      name: "Nuevo Sponsor",
      logo: "https://images.unsplash.com/photo-1693240708742-171b1f0f8abf",
      website: "#",
      instagram: "@nuevosponsor"
    };
    setSponsors(prev => [...prev, newSponsor]);
  };

  const removeSponsor = (id) => {
    setSponsors(prev => prev.filter(s => s.id !== id));
    toast({ title: "Sponsor eliminado" });
  };

  const handleSponsorChange = (id, field, value) => {
    setSponsors(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleImageUpload = (id, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleSponsorChange(id, 'logo', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    saveData(sponsors);
  };

  return (
    <section id="sponsors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sponsors y Colaboradores</h2>
          <p className="text-xl text-gray-600">Marcas que confían en nosotros</p>
        </div>

        {isAdminMode && (
          <div className="text-center mb-8">
            <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" /> Guardar Cambios de Sponsors</Button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {(sponsors || []).map((sponsor) => (
            <div key={sponsor.id} className="bg-gray-50 rounded-lg p-8 text-center card-hover relative">
              {isAdminMode && (
                <div className="absolute top-2 right-2 z-10">
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removeSponsor(sponsor.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="relative w-full h-16 mb-4 flex justify-center items-center">
                <img alt={`${sponsor.name} logo`} className="h-16 mx-auto" src={sponsor.logo} />
                {isAdminMode && (
                  <label htmlFor={`sponsorImageUpload-${sponsor.id}`} className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 cursor-pointer transition-opacity">
                    <Edit3 className="h-6 w-6 text-white" />
                  </label>
                )}
                <input type="file" id={`sponsorImageUpload-${sponsor.id}`} accept="image/*" className="hidden" onChange={(e) => handleImageUpload(sponsor.id, e)} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {isAdminMode ? (
                  <Input value={sponsor.name} onChange={(e) => handleSponsorChange(sponsor.id, 'name', e.target.value)} className="text-center" />
                ) : (
                  sponsor.name
                )}
              </h3>
              <div className="flex justify-center space-x-2">
                {isAdminMode ? (
                  <>
                    <Input value={sponsor.website} onChange={(e) => handleSponsorChange(sponsor.id, 'website', e.target.value)} placeholder="https://website.com" className="text-xs" />
                    <Input value={sponsor.instagram} onChange={(e) => handleSponsorChange(sponsor.id, 'instagram', e.target.value)} placeholder="@instagram" className="text-xs" />
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <a href={sponsor.website} target="_blank" rel="noopener noreferrer"><Globe className="h-4 w-4 mr-1" /> Sitio web</a>
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <a href={`https://instagram.com/${sponsor.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer"><Instagram className="h-4 w-4" /></a>
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {isAdminMode && (
          <div className="text-center mt-8">
            <Button onClick={addSponsor} className="btn-primary text-white">
              <Plus className="h-4 w-4 mr-2" /> Agregar Sponsor
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;