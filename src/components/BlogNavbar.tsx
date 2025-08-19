import React from 'react';

const BlogNavbar: React.FC = () => {
  return (
    <nav className="fixed w-full z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/favicon.png" alt="Cheapify" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold text-gray-800">Cheapify</span>
          </a>
          
          <div className="flex items-center space-x-8">
            <a href="/blog" className="text-gray-700 hover:text-green-600 transition-colors">All Posts</a>
            <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">Back to Home</a>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Download App
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BlogNavbar;