
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "JOURNEY TO ORIGIN: EXPLORING ETHIOPIAN COFFEE FARM",
    excerpt: "Follow us on our latest sourcing trip to the birthplace of coffee. Learn about our Ethiopian blend farmers.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600"
  },
  {
    id: 2,
    title: "CREATING BEAUTIFUL DESIGNS WITH LATTE ART",
    excerpt: "Transform your morning latte into a work of art. Latte art techniques from our baristas.",
    img: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600"
  },
  {
    id: 3,
    title: "A COFFEE RITUAL FOR A BETTER MORNING",
    excerpt: "Explore the mindful practice of coffee brewing. Become a morning meditation expert.",
    img: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=600"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-5xl md:text-7xl font-bebas tracking-wider text-[#2D1B14]">COFFEE SHOP <span className="text-yellow-600">UPDATES</span></h2>
        <button className="text-[#2D1B14] border border-[#2D1B14]/30 px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 hover:bg-[#2D1B14] hover:text-white transition-all">
          <span>All Blogs</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-3xl mb-6 aspect-video">
              <img 
                src={post.img} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-bold text-[#2D1B14] mb-4 group-hover:text-yellow-600 transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm italic line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
