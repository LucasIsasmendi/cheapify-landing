import React from 'react';
import { ShoppingCart, Wallet, Salad, Search, Star } from 'lucide-react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => (
  <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${className}`}>
    <div className="rounded-full bg-green-100 w-14 h-14 flex items-center justify-center mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Features That Make Vegan Shopping Easier</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how Cheapify helps you save money while maintaining your vegan lifestyle with these powerful features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Search className="h-6 w-6 text-green-600" />}
            title="Price Comparison"
            description="Compare prices across multiple stores to find the best deals on vegan products in your area."
            className="transform hover:-translate-y-1"
          />
          
          <FeatureCard 
            icon={<ShoppingCart className="h-6 w-6 text-green-600" />}
            title="Smart Shopping Lists"
            description="Create and organize shopping lists that automatically prioritize the best value items."
            className="transform hover:-translate-y-1 md:translate-y-8"
          />
          
      
          <FeatureCard 
            icon={<Wallet className="h-6 w-6 text-green-600" />}
            title="Budget Tracking"
            description="Set grocery budgets and track your spending to ensure you stay within your financial goals."
            className="transform hover:-translate-y-1"
          />
          
        </div>
      </div>
    </section>
  );
};

export default Features;