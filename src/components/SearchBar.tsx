import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    const fuse = new Fuse(posts, {
      keys: ['title', 'description', 'category', 'tags'],
      threshold: 0.3,
    });
    
    if (searchTerm) {
      const results = fuse.search(searchTerm);
      setSearchResults(results.map(result => result.item));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, posts]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          {searchResults.map((post, index) => (
            <a
              key={index}
              href={`/blog/${post.slug}`}
              className="block px-4 py-2 hover:bg-gray-50"
            >
              <h3 className="font-medium text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.description}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;