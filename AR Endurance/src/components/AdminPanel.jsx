import React from 'react';
import { motion } from 'framer-motion';
import { X, Eye, EyeOff, LogOut, KeyRound, BookOpen, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminPanel = ({ showAdminPanel, setShowAdminPanel, isAdminMode, setIsAdminMode, setIsAuthenticated, setShowChangePasswordModal, setShowBlogAdmin, onSave }) => {
  if (!showAdminPanel) return null;

  const handleLogout = () => {
    setIsAdminMode(false);
    setIsAuthenticated(false);
    setShowAdminPanel(false);
    toast({ title: "Sesión cerrada", description: "Has salido del panel de administración." });
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed right-0 top-0 h-full w-80 admin-panel text-white z-[60] overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Panel de Administración</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdminPanel(false)}
            className="text-white hover:bg-slate-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="w-full"
            variant={isAdminMode ? "destructive" : "default"}
          >
            {isAdminMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {isAdminMode ? 'Salir del modo edición' : 'Modo edición'}
          </Button>
          
          <p className="text-gray-400 text-xs text-center">El modo edición permite cambiar textos e imágenes directamente en la página principal.</p>

          <Button
            onClick={() => setShowBlogAdmin(true)}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Gestionar Blog
          </Button>

          <Button
            onClick={() => setShowChangePasswordModal(true)}
            variant="outline"
            className="w-full text-white border-white hover:bg-slate-600"
          >
            <KeyRound className="h-4 w-4 mr-2" />
            Cambiar Contraseña
          </Button>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-white border-white hover:bg-slate-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;