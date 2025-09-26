import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, Plus, Trash2, Edit, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BlogAdmin = ({ isOpen, onClose, blogPosts, setBlogPosts, saveBlogPosts }) => {
  const [editingPost, setEditingPost] = useState(null);
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    if (blogPosts) {
      const postsWithData = blogPosts.map(p => p.data || p);
      const sorted = [...postsWithData].sort((a,b) => new Date(b.date) - new Date(a.date));
      setSortedPosts(sorted);
    }
  }, [blogPosts]);


  const handleCreateNew = () => {
    const newPost = {
      id: `blog-post-${Date.now()}`,
      title: "Nuevo Borrador de Entrada",
      slug: `nuevo-borrador-${Date.now()}`,
      author: "Admin",
      date: new Date().toISOString(),
      excerpt: "Breve descripción de la entrada...",
      coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      content: "<h2>Título de la sección</h2><p>Escribe tu contenido aquí. Puedes usar etiquetas HTML como &lt;h2&gt; para títulos y &lt;p&gt; para párrafos.</p>"
    };
    setEditingPost(newPost);
  };
  
  const handleEdit = (post) => {
    setEditingPost({ ...post });
  };
  
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta entrada?")) {
      const updatedPosts = blogPosts.filter(p => (p.data?.id || p.id) !== id);
      setBlogPosts(updatedPosts);
      saveBlogPosts(updatedPosts);
      toast({ title: "Entrada eliminada" });
    }
  };

  const handleSave = () => {
    if (!editingPost) return;
    const postDataToSave = editingPost.data || editingPost;
    const allPosts = blogPosts.map(p => p.data || p);
    const existingIndex = allPosts.findIndex(p => p.id === postDataToSave.id);
    
    let updatedPosts;
    if (existingIndex > -1) {
      updatedPosts = [...allPosts];
      updatedPosts[existingIndex] = postDataToSave;
    } else {
      updatedPosts = [...allPosts, postDataToSave];
    }
    
    setBlogPosts(updatedPosts);
    saveBlogPosts(updatedPosts);
    
    toast({ title: "Entrada guardada" });
    setEditingPost(null);
  };
  
  const handleFieldChange = (field, value) => {
    let newSlug = editingPost.slug;
    if (field === 'title') {
      newSlug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
    setEditingPost(prev => ({ ...prev, [field]: value, slug: newSlug }));
  };
  
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleFieldChange('coverImage', event.target.result);
        toast({ title: "Imagen cargada", description: "Recuerda guardar para aplicar los cambios."});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()} 
        >
          <header className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold">Gestionar Entradas del Blog</h2>
            <Button variant="ghost" size="sm" onClick={onClose}><X className="h-5 w-5" /></Button>
          </header>
          
          <div className="flex-grow flex overflow-hidden">
            <div className="w-1/3 border-r overflow-y-auto p-4 space-y-3">
              <Button onClick={handleCreateNew} className="w-full"><Plus className="h-4 w-4 mr-2"/> Crear Nueva Entrada</Button>
              <h3 className="text-lg font-medium pt-4">Entradas Publicadas</h3>
              {sortedPosts.map(post => (
                    <div key={post.id} className="p-3 border rounded-md flex items-center justify-between hover:bg-gray-50">
                      <span className="text-sm font-medium truncate pr-2">{post.title}</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleEdit(post)}><Edit className="h-4 w-4"/></Button>
                        <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => handleDelete(post.id)}><Trash2 className="h-4 w-4"/></Button>
                      </div>
                    </div>
                ))
              }
            </div>
            
            <div className="w-2/3 overflow-y-auto p-6">
              {editingPost ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="postTitle">Título</Label>
                    <Input id="postTitle" value={editingPost.title} onChange={(e) => handleFieldChange('title', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="postSlug">URL (Slug)</Label>
                    <Input id="postSlug" value={editingPost.slug} onChange={(e) => handleFieldChange('slug', e.target.value)} />
                  </div>
                   <div>
                    <Label htmlFor="postAuthor">Autor</Label>
                    <Input id="postAuthor" value={editingPost.author} onChange={(e) => handleFieldChange('author', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="postExcerpt">Extracto (Resumen)</Label>
                    <Textarea id="postExcerpt" value={editingPost.excerpt} onChange={(e) => handleFieldChange('excerpt', e.target.value)} />
                  </div>
                  <div>
                    <Label>Imagen de Portada</Label>
                    <img src={editingPost.coverImage} alt="Cover" className="w-full h-48 object-cover rounded-md my-2"/>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} />
                  </div>
                  <div>
                    <Label htmlFor="postContent">Contenido (HTML)</Label>
                    <Textarea id="postContent" value={editingPost.content} onChange={(e) => handleFieldChange('content', e.target.value)} rows={15} />
                    <p className="text-xs text-gray-500 mt-1">Puedes usar etiquetas HTML como &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, etc.</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEditingPost(null)}>Cancelar</Button>
                    <Button onClick={handleSave}><Save className="h-4 w-4 mr-2"/> Guardar Entrada</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Selecciona una entrada para editar o crea una nueva.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogAdmin;