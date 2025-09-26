import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Footer from '@/components/Footer';

const BlogListPage = ({ posts }) => {
  const sortedPosts = [...posts].sort((a, b) => new Date((b.data || b).date) - new Date((a.data || a).date));

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600">Consejos, noticias y recursos de nuestro equipo.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => {
              const postData = post.data || post;
              return (
                <Link to={`/blog/${postData.slug}`} key={postData.id} className="group block bg-white rounded-lg shadow-md overflow-hidden card-hover">
                  <div className="relative">
                    <img src={postData.coverImage} alt={`Cover for ${postData.title}`} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{postData.title}</h2>
                    <div className="flex items-center space-x-4 text-gray-500 text-xs mb-3">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span>{postData.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(postData.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{postData.excerpt}</p>
                    <span className="font-semibold text-teal-600 flex items-center">
                      Leer más <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListPage;