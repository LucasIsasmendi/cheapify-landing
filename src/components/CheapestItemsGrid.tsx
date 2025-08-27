import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Store, Tag, Package } from 'lucide-react';

type ItemsStore = {
  [itemID: string]: {
    n: string;    // name
    p: number;    // price
    q: string;    // quantity
    u: string;    // unit
    ppuom: string; // price per unit of measure
    img?: string; // image
    nw: { t: number, u: string };
  }
}

type Item = [string, ItemsStore]; // [store, items]

interface GenericItemName {
  [itemName: string]: Item[];
}

interface SubCategory {
  [subcategory: string]: GenericItemName;
}

interface Data {
  items: {
    [category: string]: GenericItemName | SubCategory;
  };
  ts?: string; // timestamp field
}

const storeNames = {
  "as": "Asda", 
  "al": "Aldi", 
  "ms": "Morrisons", 
  "oc": "Ocado",
  "tc": "Tesco"
};

const categoryNames = {
  "fruit": "Fruits",
  "pbvsn": "Plant Based Substitution Items",
  "sndfm": "Seeds, Nuts and Dried Fruit",
  "prtn": "Proteins",
  "salad": "Salads",
  "vegs": "Vegetables",
  "_in": "New Items"
};

const storeColors: { [key: string]: string } = {
  'tc': 'bg-blue-100 text-blue-800',
  'as': 'bg-green-100 text-green-800',
  'al': 'bg-orange-100 text-orange-800',
  'ms': 'bg-purple-100 text-purple-800',
  'oc': 'bg-gray-100 text-gray-800'
};

// Helper function to flatten category content into an array of items
const flattenCategoryContent = (categoryContent: GenericItemName): Item[] => {
  const items: Item[] = [];
  
  // GenericItemName is an object where each key is an item name
  // and each value is either Item[] or SubCategory
  for (const [itemName, value] of Object.entries(categoryContent)) {
    if (Array.isArray(value)) {
      // It's an array of items for this item name
      const validItems = value.filter(item => 
        Array.isArray(item) && 
        item.length === 2 && 
        typeof item[0] === 'string'
      );
      items.push(...validItems);
    } else if (typeof value === 'object' && value !== null) {
      // It's a SubCategory, recursively flatten it
      for (const [subKey, subValue] of Object.entries(value)) {
        if (Array.isArray(subValue)) {
          const validItems = subValue.filter(item => 
            Array.isArray(item) && 
            item.length === 2 && 
            typeof item[0] === 'string'
          );
          items.push(...validItems);
        }
      }
    }
  }
  
  return items;
};

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const store = item[0];
  const details = item[1];
  const storeName = storeNames[store] || store.toUpperCase();
  const storeColorClass = storeColors[store] || 'bg-gray-100 text-gray-800';
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-gray-300">
      {/* Square Image Container */}
      <div className="relative w-full aspect-square bg-gray-50">
        {details.img ? (
          <img 
            src={details.img} 
            alt={details.n} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-12 w-12 text-gray-300" />
          </div>
        )}
        
        {/* Store Badge - Top Left */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${storeColorClass} shadow-sm`}>
            {storeName}
          </span>
        </div>
        
        {/* Price Badge - Top Right */}
        <div className="absolute top-2 right-2">
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold shadow-sm">
            £{details.p.toFixed(2)}
          </span>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
          {details.n}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="truncate">{details.q} {details.u}</span>
          <span className="font-medium">{details.ppuom}</span>
        </div>
      </div>
    </div>
  );
};

const CategorySection: React.FC<{ 
  categoryName: string; 
  categoryContent: GenericItemName;
  isExpanded: boolean; 
  onToggle: () => void; 
}> = ({ categoryName, categoryContent, isExpanded, onToggle }) => {
  const displayName = categoryNames[categoryName as keyof typeof categoryNames] || categoryName;
  return (
    <div className="mb-8">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          {displayName}
        </h2>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-600" />
        )}
      </button>
      
      {isExpanded && (
        <div className="space-y-6">
          {Object.entries(categoryContent).map(([itemName, value]) => {
            if (Array.isArray(value)) {
              // It's an Item[] array - direct items for this itemName
              const itemsToRender = value.filter(item => 
                Array.isArray(item) && 
                item.length === 2 && 
                typeof item[0] === 'string'
              );
              
              if (itemsToRender.length === 0) return null;
              
              return (
                <div key={itemName} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                    {itemName}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {itemsToRender.map((item, index) => (
                      <ItemCard key={index} item={item} />
                    ))}
                  </div>
                </div>
              );
            } else if (typeof value === 'object' && value !== null) {
              // It's a SubCategory - contains nested GenericItemName structure
              return (
                <div key={itemName} className="space-y-4">
                  {Object.entries(value).map(([subKey, subValue]) => {
                    const displayName = `${itemName} > ${subKey}`;
                    let itemsToRender: Item[] = [];
                    
                    if (Array.isArray(subValue)) {
                      // SubCategory contains Item[] arrays
                      itemsToRender = subValue.filter(item => 
                        Array.isArray(item) && 
                        item.length === 2 && 
                        typeof item[0] === 'string'
                      );
                    } else if (typeof subValue === 'object' && subValue !== null) {
                      // SubCategory contains nested GenericItemName - flatten recursively
                      for (const [nestedKey, nestedValue] of Object.entries(subValue)) {
                        if (Array.isArray(nestedValue)) {
                          const validItems = nestedValue.filter(item => 
                            Array.isArray(item) && 
                            item.length === 2 && 
                            typeof item[0] === 'string'
                          );
                          itemsToRender.push(...validItems);
                        }
                      }
                    }
                    
                    if (itemsToRender.length === 0) return null;
                    
                    return (
                      <div key={`${itemName}-${subKey}`} className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                          {displayName}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                          {itemsToRender.map((item, index) => (
                            <ItemCard key={index} item={item} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
            
            return null;
          })}
        </div>
      )}
    </div>
  );
};

const CheapestItemsGrid: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/cheapest-items-short-list.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        
        // Expand first category by default
        const firstCategory = Object.keys(jsonData.items)[0];
        if (firstCategory) {
          setExpandedCategories(new Set([firstCategory]));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">Loading cheapest items...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">Error loading data: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data || !data.items) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-600">No data available</p>
      </div>
    );
  }

  // Check if we have any categories with items using the correct interface structure
  const categoriesWithItems = Object.entries(data.items).filter(([_, items]) => {
    // items is GenericItemName, check if it has any content
    return Object.keys(items).length > 0;
  });

  if (categoriesWithItems.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-600">No items found in any category</p>
        <details className="mt-4 text-left">
          <summary className="cursor-pointer text-sm text-gray-600">Debug Info</summary>
          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Price Update Legend */}
      {data.ts && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Last price update:</span> {new Date(data.ts).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {categoriesWithItems.map(([categoryName, items]) => {
        return (
          <CategorySection
            key={categoryName}
            categoryName={categoryName}
            categoryContent={items}
            isExpanded={expandedCategories.has(categoryName)}
            onToggle={() => toggleCategory(categoryName)}
          />
        );
      })}
    </div>
  );
};

export default CheapestItemsGrid;