import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Store, Tag, Package, Eye, Filter } from 'lucide-react';

type Item = [
  string, // store
  {
    n: string;    // name
    p: number;    // price
    q: string;    // quantity
    u: string;    // unit
    ppuom: string; // price per unit of measure
    img?: string; // image
  }
];

interface GenericItemName {
  [itemName: string]:  Item[] ;
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

// Unified store color
const storeColor = 'bg-blue-100 text-blue-800';

// Helper function to get price color based on relative position
const getPriceColor = (price: number, prices: number[]): string => {
  if (prices.length <= 1) return 'bg-green-500'; // Single item is always cheapest
  
  const sortedPrices = [...prices].sort((a, b) => a - b);
  const minPrice = sortedPrices[0];
  const maxPrice = sortedPrices[sortedPrices.length - 1];
  
  // If all prices are the same
  if (minPrice === maxPrice) return 'bg-green-500';
  
  // Traffic light system
  if (price === minPrice) return 'bg-green-500'; // Cheapest = Green
  if (price === maxPrice) return 'bg-red-500';   // Most expensive = Red
  return 'bg-amber-500'; // Middle prices = Amber
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
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${storeColor} shadow-sm`}>
            {storeName}
          </span>
        </div>
        
        {/* Price Badge - Top Right */}
        <div className="absolute top-2 right-2">
          <span className="text-white px-2 py-1 rounded-full text-sm font-bold shadow-sm">
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

const ItemGroup: React.FC<{
  itemName: string;
  items: Item[];
}> = ({ itemName, items }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{itemName}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const CategorySection: React.FC<{ 
  categoryName: string; 
  categoryContent: GenericItemName;
}> = ({ categoryName, categoryContent }) => {
  const displayName = categoryNames[categoryName as keyof typeof categoryNames] || categoryName;
  return (
    <div className="mb-8">
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800">
          {displayName}
        </h2>
      </div>
      
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
              <ItemGroup key={itemName} itemName={itemName} items={itemsToRender} />
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
                    <ItemGroup key={`${itemName}-${subKey}`} itemName={displayName} items={itemsToRender} />
                  );
                })}
              </div>
            );
          }
          
          return null;
        })}
      </div>
    </div>
  );
};

const ItemCardWithPricing: React.FC<{ 
  itemName: string;
  items: Item[];
}> = ({ itemName, items }) => {
  const [showAllPrices, setShowAllPrices] = useState(false);
  
  // Sort items by price to get cheapest first
  const sortedItems = [...items].sort((a, b) => a[1].p - b[1].p);
  const cheapestItem = sortedItems[0];
  const otherItems = sortedItems.slice(1);
  
  return (
    <div className="space-y-3">
      {/* Main cheapest item card */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-gray-300">
        {/* Generic Item Name Header */}
        <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 text-sm">{itemName}</h3>
        </div>
        
        {/* Square Image Container */}
        <div className="relative w-full aspect-square bg-gray-50">
          {cheapestItem[1].img ? (
            <img 
              src={cheapestItem[1].img} 
              alt={cheapestItem[1].n} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-300" />
            </div>
          )}
          
          {/* Store Badge - Top Left */}
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${storeColor} shadow-sm`}>
              {storeNames[cheapestItem[0]] || cheapestItem[0].toUpperCase()}
            </span>
          </div>
          
          {/* Price Badge - Top Right */}
          <div className="absolute top-2 right-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold shadow-sm">
              £{cheapestItem[1].p.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="p-3">
          <h4 className="font-medium text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
            {cheapestItem[1].n}
          </h4>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span className="truncate">{cheapestItem[1].q} {cheapestItem[1].u}</span>
            <span className="font-medium">{cheapestItem[1].ppuom}</span>
          </div>
          
          {/* Compare button at bottom */}
          {otherItems.length > 0 && (
            <button
              onClick={() => setShowAllPrices(!showAllPrices)}
              className="w-full mt-4 flex items-center justify-center text-xs text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 rounded py-2"
            >
              <Eye className="h-3 w-3 mr-2" />
              Compare ({otherItems.length + 1} options)
              <ChevronDown className={`h-3 w-3 ml-2 transition-transform ${showAllPrices ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>
      
      {/* Other product cards when expanded */}
      {showAllPrices && otherItems.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-8 pb-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Other options for {itemName}</h3>
              <button
                onClick={() => setShowAllPrices(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {otherItems.map((item, index) => {
                  const prices = sortedItems.map(item => item[1].p);
                  const priceColor = getPriceColor(item[1].p, prices);
                  const priceColorClass = priceColor === 'bg-green-500' ? 'bg-green-500' : 
                                        priceColor === 'bg-red-500' ? 'bg-red-500' : 'bg-amber-500';
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-gray-300">
                      {/* Image Container */}
                      <div className="relative w-full aspect-square bg-gray-50">
                        {item[1].img ? (
                          <img 
                            src={item[1].img} 
                            alt={item[1].n} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                        
                        {/* Store Badge - Top Left */}
                        <div className="absolute top-2 left-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${storeColor} shadow-sm`}>
                            {storeNames[item[0]] || item[0].toUpperCase()}
                          </span>
                        </div>
                        
                        {/* Price Badge - Top Right */}
                        <div className="absolute top-2 right-2">
                          <span className={`${priceColorClass} text-white px-2 py-1 rounded-full text-sm font-bold shadow-sm`}>
                            £{item[1].p.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Product Details */}
                      <div className="p-3">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
                          {item[1].n}
                        </h4>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="truncate">{item[1].q} {item[1].u}</span>
                          <span className="font-medium">{item[1].ppuom}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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
  const [selectedStores, setSelectedStores] = useState<Set<string>>(new Set(Object.keys(storeNames)));

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleStore = (storeCode: string) => {
    const newSelected = new Set(selectedStores);
    if (newSelected.has(storeCode)) {
      newSelected.delete(storeCode);
    } else {
      newSelected.add(storeCode);
    }
    setSelectedStores(newSelected);
  };

  const toggleAllStores = () => {
    if (selectedStores.size === Object.keys(storeNames).length) {
      // If all are selected, deselect all
      setSelectedStores(new Set());
    } else {
      // If not all are selected, select all
      setSelectedStores(new Set(Object.keys(storeNames)));
    }
  };

  // Filter items based on selected stores
  const filterItemsByStores = (items: Item[]): Item[] => {
    return items.filter(item => selectedStores.has(item[0]));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/cheapest-items-short-list.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Organize cheapest items by category
  const categorizedItems: Record<string, Array<{
    genericName: string;
    cheapestItem: Item;
    allItems: Item[];
  }>> = {};

  // Process all categories and subcategories to extract cheapest items
  Object.entries(data.items).forEach(([categoryName, categoryContent]) => {
    if (!categorizedItems[categoryName]) {
      categorizedItems[categoryName] = [];
    }
    
    Object.entries(categoryContent).forEach(([itemName, value]) => {
      if (Array.isArray(value)) {
        // Direct items for this itemName
        const validItems = value.filter(item => 
          Array.isArray(item) && 
          item.length === 2 && 
          typeof item[0] === 'string'
        );
        
        if (validItems.length > 0) {
          const filteredItems = filterItemsByStores(validItems);
          if (filteredItems.length > 0) {
            const sortedItems = [...filteredItems].sort((a, b) => a[1].p - b[1].p);
            categorizedItems[categoryName].push({
              genericName: itemName,
              cheapestItem: sortedItems[0],
              allItems: sortedItems
            });
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        // SubCategory - contains nested items
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (Array.isArray(subValue)) {
            const validItems = subValue.filter(item => 
              Array.isArray(item) && 
              item.length === 2 && 
              typeof item[0] === 'string'
            );
            
            if (validItems.length > 0) {
              const filteredItems = filterItemsByStores(validItems);
              if (filteredItems.length > 0) {
                const sortedItems = [...filteredItems].sort((a, b) => a[1].p - b[1].p);
                categorizedItems[categoryName].push({
                  genericName: `${itemName} ${subKey}`,
                  cheapestItem: sortedItems[0],
                  allItems: sortedItems
                });
              }
            }
          } else if (typeof subValue === 'object' && subValue !== null) {
            // Nested subcategory
            Object.entries(subValue).forEach(([nestedKey, nestedValue]) => {
              if (Array.isArray(nestedValue)) {
                const validItems = nestedValue.filter(item => 
                  Array.isArray(item) && 
                  item.length === 2 && 
                  typeof item[0] === 'string'
                );
                
                if (validItems.length > 0) {
                  const filteredItems = filterItemsByStores(validItems);
                  if (filteredItems.length > 0) {
                    const sortedItems = [...filteredItems].sort((a, b) => a[1].p - b[1].p);
                    categorizedItems[categoryName].push({
                      genericName: `${itemName} ${subKey} ${nestedKey}`,
                      cheapestItem: sortedItems[0],
                      allItems: sortedItems
                    });
                  }
                }
              }
            });
          }
        });
      }
    });
  });

  if (Object.keys(categorizedItems).length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-600">No items found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Supermarket Selector */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Filter by Supermarket</h3>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={toggleAllStores}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedStores.size === Object.keys(storeNames).length
                ? 'bg-green-600 text-white'
                : selectedStores.size === 0
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {selectedStores.size === Object.keys(storeNames).length ? 'Deselect All' : 'Select All'}
          </button>
          
          {Object.entries(storeNames).map(([code, name]) => (
            <button
              key={code}
              onClick={() => toggleStore(code)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedStores.has(code)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        
        <p className="text-sm text-gray-600">
          {selectedStores.size === 0 
            ? 'No supermarkets selected - select at least one to see items'
            : selectedStores.size === Object.keys(storeNames).length
            ? 'Showing items from all supermarkets'
            : `Showing items from ${selectedStores.size} selected supermarket${selectedStores.size > 1 ? 's' : ''}`
          }
        </p>
      </div>

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

      {/* Category sections with dropdown buttons */}
      {selectedStores.size === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-600">Please select at least one supermarket to view items</p>
        </div>
      ) : Object.keys(categorizedItems).length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-600">No items found for the selected supermarkets</p>
        </div>
      ) : (
        <div className="space-y-6">
        {Object.entries(categorizedItems).map(([categoryName, items]) => {
          const displayName = categoryNames[categoryName as keyof typeof categoryNames] || categoryName;
          const isExpanded = expandedCategories.has(categoryName);
          
          return (
            <div key={categoryName} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Category Header with Dropdown Button */}
              <button
                onClick={() => toggleCategory(categoryName)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{displayName}</h2>
                  <p className="text-sm text-gray-600">{items.length} items</p>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {/* Category Content */}
              {isExpanded && (
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {items.map((itemGroup, index) => (
                      <ItemCardWithPricing
                        key={`${itemGroup.genericName}-${index}`}
                        itemName={itemGroup.genericName}
                        items={itemGroup.allItems}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
};

export default CheapestItemsGrid;