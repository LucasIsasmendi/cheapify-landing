import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <Tag className="h-5 w-5 text-gray-500 mr-2" />
        <span className="font-medium text-gray-700">Categories</span>
      </div>
      
      <div className="space-y-2">
        {categories.map((category, index) => (
          <label key={index} className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="ml-2 text-gray-700">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;