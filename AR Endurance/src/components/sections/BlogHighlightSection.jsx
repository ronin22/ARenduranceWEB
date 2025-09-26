import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogHighlightSection = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }
  
  const highlightedPosts = [...posts]
    .sort((a, b) => new Date((b.data || b).date) - new Date((a.data || a).date))
    .slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Últimas Entradas del Blog</h2>
          <p className="text-xl text-gray-600">Consejos, historias y conocimientos de nuestro equipo.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlightedPosts.map(post => {
            const postData = post.data || post;
            if (!postData) return null;
            return (
              <Link to={`/blog/${postData.slug}`} key={postData.id} className="group block bg-white rounded-lg shadow-md overflow-hidden card-hover">
                <div className="relative">
                  <img src={postData.coverImage} alt={postData.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{postData.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{postData.excerpt}</p>
                  <span className="font-semibold text-teal-600 flex items-center">
                    Leer más <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/blog">Ver todas las entradas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlightSection;