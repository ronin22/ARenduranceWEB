import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { X, KeyRound, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Las contraseñas no coinciden.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "La contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
      return;
    }
    onSubmit(newPassword);
    setNewPassword(''); 
    setConfirmPassword('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()} 
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="flex flex-col items-center mb-6">
            <div className="bg-teal-100 p-3 rounded-full mb-3">
              <KeyRound className="h-8 w-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Cambiar Contraseña</h2>
            <p className="text-sm text-gray-500 mt-1">Establece una nueva contraseña para el panel de administración.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="newPasswordAdmin" className="text-gray-700">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="newPasswordAdmin"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 pr-10"
                  placeholder="Nueva contraseña"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPasswordAdmin" className="text-gray-700">Confirmar Nueva Contraseña</Label>
              <Input
                id="confirmPasswordAdmin"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
                placeholder="Confirmar contraseña"
                required
              />
            </div>
            <Button type="submit" className="w-full btn-primary text-white">
              Cambiar Contraseña
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChangePasswordModal;