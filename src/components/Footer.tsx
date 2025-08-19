import React from 'react';
import { Leaf, Facebook, Instagram, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <Leaf className="h-7 w-7 text-green-500" />
              <span className="ml-2 text-2xl font-bold">Cheapify</span>
            </div>
            <p className="text-gray-400 mb-6">
              Making vegan grocery shopping more affordable and accessible for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
{/*               <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a> */}
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.youtube.com/@CheapifyApp" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#features" className="text-gray-400 hover:text-green-500 transition-colors">Features</a>
              </li>
              <li>
                <a href="/#how-it-works" className="text-gray-400 hover:text-green-500 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="/#testimonials" className="text-gray-400 hover:text-green-500 transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="/#faq" className="text-gray-400 hover:text-green-500 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-green-500 transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/legal/terms" className="text-gray-400 hover:text-green-500 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="/legal/privacy" className="text-gray-400 hover:text-green-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/legal/cookies" className="text-gray-400 hover:text-green-500 transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="/legal/gdpr" className="text-gray-400 hover:text-green-500 transition-colors">GDPR Compliance</a>
              </li>
              <li>
                <a href="/legal/delete-account" className="text-gray-400 hover:text-green-500 transition-colors">Delete Account</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">support@cheapify.app</span>
              </li>
{/*               <li className="flex items-start">
                <Phone className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li> */}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Download the App</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded text-sm">
                  App Store
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.plantbasedsavers.cheapifyapp" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded text-sm">
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Cheapify. All rights reserved.
            </p>
{/*             <div className="mt-4 md:mt-0">
              <select className="bg-gray-800 border border-gray-700 text-gray-400 px-3 py-1 rounded text-sm">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;