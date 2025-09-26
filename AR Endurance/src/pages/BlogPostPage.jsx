import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const BlogPostPage = ({ posts }) => {
  const { slug } = useParams();
  const post = posts.find(p => (p.data?.slug || p.slug) === slug);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center text-center px-4 pt-24">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Post no encontrado</h1>
            <p className="text-gray-600 mb-8">La entrada del blog que estás buscando no existe o fue movida.</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Blog
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const postData = post.data || post;
  const postDate = new Date(postData.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver a todas las entradas
              </Link>
            </Button>
          </div>
          
          <article className="bg-white p-8 sm:p-12 rounded-lg shadow-lg">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{postData.title}</h1>
              <div className="flex justify-center items-center space-x-4 text-gray-500 text-sm">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1.5" />
                  <span>{postData.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <time dateTime={postData.date}>{postDate}</time>
                </div>
              </div>
            </header>
            
            <div className="mb-12">
              <img src={postData.coverImage} alt={`Cover for ${postData.title}`} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"/>
            </div>

            <div 
              className="prose prose-lg lg:prose-xl max-w-none mx-auto"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;