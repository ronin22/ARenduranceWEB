import React from 'react';
import { CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const TrainingPlansSection = ({ trainingPlans, setTrainingPlans, isAdminMode, scrollToSection }) => {

  const handlePlanChange = (id, field, value) => {
    setTrainingPlans(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleFeatureChange = (planId, featureIndex, value) => {
    setTrainingPlans(prev => prev.map(p => {
      if (p.id === planId) {
        const newFeatures = [...p.features];
        newFeatures[featureIndex] = value;
        return { ...p, features: newFeatures };
      }
      return p;
    }));
  };

  const addFeature = (planId) => {
    setTrainingPlans(prev => prev.map(p => {
      if (p.id === planId) {
        return { ...p, features: [...p.features, "Nueva característica"] };
      }
      return p;
    }));
  };

  const removeFeature = (planId, featureIndex) => {
     setTrainingPlans(prev => prev.map(p => {
      if (p.id === planId) {
        const newFeatures = p.features.filter((_, i) => i !== featureIndex);
        return { ...p, features: newFeatures };
      }
      return p;
    }));
  };
  
  const addPlan = () => {
    const newPlan = {
      id: `plan-${Date.now()}`,
      name: "Nuevo Plan",
      description: "Descripción del nuevo plan...",
      features: ["Característica 1", "Característica 2"],
      price: "$0",
      period: "/mes",
      popular: false
    };
    setTrainingPlans(prev => [...prev, newPlan]);
  };

  const removePlan = (id) => {
    setTrainingPlans(prev => prev.filter(p => p.id !== id));
    toast({ title: "Plan eliminado", description: "El plan de entrenamiento ha sido eliminado."});
  };


  return (
    <section id="planes" className="py-20 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Planes de Entrenamiento</h2>
          <p className="text-xl text-gray-600">Encuentra el plan perfecto para tus objetivos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(trainingPlans || []).map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg p-8 card-hover relative ${
                plan.popular ? 'ring-2 ring-teal-600' : ''
              }`}
            >
              {isAdminMode && (
                <div className="absolute top-2 right-2 z-10 flex flex-col space-y-1">
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => removePlan(plan.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                   <label className={`h-8 w-8 flex items-center justify-center rounded-md border text-xs cursor-pointer ${plan.popular ? 'bg-teal-600 text-white border-teal-700' : 'bg-gray-200 border-gray-300'}`}>
                    Pop
                    <input type="checkbox" checked={plan.popular} onChange={(e) => handlePlanChange(plan.id, 'popular', e.target.checked)} className="hidden" />
                  </label>
                </div>
              )}
              {plan.popular && !isAdminMode && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {isAdminMode ? (
                    <Input value={plan.name} onChange={(e) => handlePlanChange(plan.id, 'name', e.target.value)} className="text-2xl font-bold text-center" />
                  ) : (
                    plan.name
                  )}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isAdminMode ? (
                    <Textarea value={plan.description} onChange={(e) => handlePlanChange(plan.id, 'description', e.target.value)} rows="3" className="text-sm" />
                  ) : (
                    plan.description
                  )}
                </p>
              </div>
              
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {isAdminMode ? (
                    <Input value={plan.price} onChange={(e) => handlePlanChange(plan.id, 'price', e.target.value)} className="text-4xl font-bold w-28 text-center" />
                  ) : (
                    plan.price
                  )}
                </span>
                {isAdminMode ? (
                  <Input value={plan.period} onChange={(e) => handlePlanChange(plan.id, 'period', e.target.value)} className="text-gray-600 w-20 ml-1 text-sm" />
                ) : (
                  <span className="text-gray-600">{plan.period}</span>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {(plan.features || []).map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0" />
                    {isAdminMode ? (
                      <div className="flex items-center w-full">
                        <Input value={feature} onChange={(e) => handleFeatureChange(plan.id, index, e.target.value)} className="flex-1 mr-1 text-sm h-8" />
                        <Button variant="ghost" size="icon" onClick={() => removeFeature(plan.id, index)} className="h-7 w-7">
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      feature
                    )}
                  </li>
                ))}
              </ul>
              {isAdminMode && (
                <Button variant="outline" size="sm" onClick={() => addFeature(plan.id)} className="w-full mb-4 text-xs h-8">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Agregar Característica
                </Button>
              )}
              
              <Button
                onClick={() => scrollToSection('contacto')}
                className={`w-full ${plan.popular ? 'btn-primary text-white' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                Comenzar ahora
              </Button>
            </div>
          ))}
        </div>
         {isAdminMode && (
          <div className="text-center mt-12">
            <Button onClick={addPlan} className="btn-primary text-white">
              <Plus className="h-4 w-4 mr-2" /> Agregar Plan
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainingPlansSection;