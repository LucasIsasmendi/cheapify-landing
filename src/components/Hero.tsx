import React from 'react';
import { Apple, PlayCircle, Globe } from 'lucide-react';
import { trackEvent } from './Analytics';

const Hero: React.FC = () => {
  const handleAppStoreClick = () => {
    trackEvent('app_store_click', {
      source: 'hero_section',
      platform: 'ios'
    });
  };

  const handleGooglePlayClick = () => {
    trackEvent('google_play_click', {
      source: 'hero_section',
      platform: 'android'
    });
  };

    const handleWebAppClick = () => {
    trackEvent('web_app_click', {
      source: 'hero_section',
      platform: 'web'
    });
  };
  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Save Money on Your <span className="text-green-600">Vegan</span> Grocery Shopping
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Cheapify helps you find the best deals on vegan products, plan your meals, and save up to 30% on your grocery bills every week.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAppStoreClick}
                className="flex items-center justify-center bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105"
              >
                <Apple className="h-5 w-5 mr-2" />
                App Store
              </button>
              <a 
                href="https://play.google.com/store/apps/details?id=com.plantbasedsavers.cheapifyapp" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleGooglePlayClick}
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105"
              >
                <PlayCircle className="h-5 w-5 mr-2" />
                Google Play
              </a>
                            <a 
                href="https://web.cheapify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleWebAppClick}
                className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105"
              >
                <Globe className="h-5 w-5 mr-2" />
                Web App
              </a>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <img 
                  src="https://dm.emea.cms.aldi.cx/is/image/aldiprodeu/product/jpg/scaleWidth/300/a56a00f5-6470-492f-8d89-84336c505821/%7Bslug%7D" 
                  alt="No Chicken Burgers" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://ui.assets-asda.com/dm/5202390030321" 
                  alt="No Cheese" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://ui.assets-asda.com/dm/5057172440023" 
                  alt="Avocado" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <p className="ml-4 text-gray-600">
                <span className="font-semibold text-green-600">7,000+</span> plant based item prices
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative">
              {/* Phone mockup */}
              <div className="bg-white p-2 rounded-[3rem] shadow-xl border-4 border-gray-100 relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="rounded-[2.5rem] overflow-hidden border border-gray-200">
                  <img 
                    src="/images/cheapify_landing.jpeg" 
                    alt="Cheapify App" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-full"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-green-100 rounded-full filter blur-xl opacity-70"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-100 rounded-full filter blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;