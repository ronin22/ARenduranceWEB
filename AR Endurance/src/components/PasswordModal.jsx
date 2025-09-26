import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { X, Lock } from 'lucide-react';

const PasswordModal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
    setPassword(''); 
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
              <Lock className="h-8 w-8 text-teal-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Acceso Restringido</h2>
            <p className="text-sm text-gray-500 mt-1">Ingresa la contraseña para acceder al panel de administración.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="passwordAdmin" className="text-gray-700">Contraseña</Label>
              <Input
                id="passwordAdmin"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="********"
                required
              />
            </div>
            <Button type="submit" className="w-full btn-primary text-white">
              Acceder
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PasswordModal;