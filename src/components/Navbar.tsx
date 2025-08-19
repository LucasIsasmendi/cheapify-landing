import React, { useState, useEffect } from 'react';
import { Menu, X, Apple, PlayCircle, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/favicon.png" alt="Cheapify" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold text-gray-800">Cheapify</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
            <a href="/#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">How It Works</a>
            <a href="/#testimonials" className="text-gray-700 hover:text-green-600 transition-colors">Testimonials</a>
            <a href="/#faq" className="text-gray-700 hover:text-green-600 transition-colors">FAQ</a>
            <a href="/blog" className="text-gray-700 hover:text-green-600 transition-colors">Blog</a>
            <div className="relative download-menu-container">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDownloadMenu(!showDownloadMenu);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center"
              >
                Download Now
                <ChevronDown className="h-5 w-5 ml-2" />
              </button>
              
              {showDownloadMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 animate-fadeIn">
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
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute left-0 right-0 top-full shadow-lg animate-fade-in">
            <div className="flex flex-col py-4 px-4 space-y-4">
              <a 
                href="/#features" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="/#how-it-works" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="/#testimonials" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="/#faq" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="/blog" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <div className="space-y-2">
                <a 
                  href="#" 
                  className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Apple className="h-5 w-5 mr-3 text-gray-700" />
                  <div>
                    <p className="font-medium text-gray-800">App Store</p>
                    <p className="text-sm text-gray-500">Download for iOS</p>
                  </div>
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.plantbasedsavers.cheapifyapp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <PlayCircle className="h-5 w-5 mr-3 text-gray-700" />
                  <div>
                    <p className="font-medium text-gray-800">Google Play</p>
                    <p className="text-sm text-gray-500">Download for Android</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;