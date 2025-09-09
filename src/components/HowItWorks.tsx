import React, { useState, useEffect } from 'react';
import { CheckCircle as CircleCheck, ShoppingBag, Store, Receipt, Apple, PlayCircle, ChevronDown, Globe } from 'lucide-react';

type StepProps = {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Step: React.FC<StepProps> = ({ number, title, description, icon }) => (
  <div className="flex items-start">
    <div className="relative">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg">
        {number}
      </div>
      {number < 4 && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-1 bg-green-200 h-full"></div>
      )}
    </div>
    <div className="ml-6">
      <div className="flex items-center mb-2">
        <div className="mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  // Close download menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.download-menu-container')) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">How Cheapify Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process helps you save money on your vegan grocery shopping without compromising on quality or ethics.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-12">
          <Step 
            number={1} 
            title="Create Your Shopping List" 
            description="Add items to your shopping list or choose from our curated vegan meal plans that automatically populate your list with ingredients."
            icon={<ShoppingBag className="h-6 w-6 text-green-600" />}
          />
          
          <Step 
            number={2} 
            title="Compare Store Prices" 
            description="Our app automatically compares prices across stores in your area to find the best deals on every item on your list."
            icon={<Store className="h-6 w-6 text-green-600" />}
          />
          
          <Step 
            number={3} 
            title="Shop with Confidence" 
            description="Follow your optimized shopping plan, use the barcode scanner in-store to verify prices, and check for any last-minute deals."
            icon={<Receipt className="h-6 w-6 text-green-600" />}
          />
          
          <Step 
            number={4} 
            title="Track Your Savings" 
            description="See exactly how much you've saved, track your spending over time, and get personalized tips to save even more on future shopping trips."
            icon={<CircleCheck className="h-6 w-6 text-green-600" />}
          />
        </div>
        
        <div className="mt-16 text-center">
          <div className="relative inline-block download-menu-container">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDownloadMenu(!showDownloadMenu);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center"
            >
              Start Saving Today
              <ChevronDown className="h-5 w-5 ml-2" />
            </button>
            
            {showDownloadMenu && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 animate-fadeIn z-10">
                <a 
                  href="#" 
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors rounded-t-lg"
                >
                  <Apple className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">App Store</p>
                    <p className="text-sm text-gray-500">Download for iOS</p>
                  </div>
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.plantbasedsavers.cheapifyapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors rounded-b-lg"
                >
                  <PlayCircle className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">Google Play</p>
                    <p className="text-sm text-gray-500">Download for Android</p>
                  </div>
                </a>
                                  <a 
                    href="https://web.cheapify.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors rounded-b-lg"
                  >
                    <Globe className="h-5 w-5 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Web App</p>
                      <p className="text-sm text-gray-500">Start in the browser</p>
                    </div>
                  </a>
              </div>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-600">No credit card required. Free to download.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;