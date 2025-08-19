import React, { useState } from 'react';
import { PoundSterling, ArrowRight, Pound } from 'lucide-react';

const Savings: React.FC = () => {
  const [monthlySpending, setMonthlySpending] = useState<number>(300);
  
  // Calculate estimated savings (30% of current spending)
  const estimatedSavings = monthlySpending * 0.3;
  const annualSavings = estimatedSavings * 12;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setMonthlySpending(value);
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Calculate Your Vegan Grocery Savings</h2>
            <p className="text-lg text-gray-600 mb-8">
              Users of Cheapify save an average of 30% on their monthly grocery bills. Use our calculator to see how much you could save.
            </p>
            
            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-sm">
              <div className="mb-6">
                <label htmlFor="monthly-spending" className="block text-sm font-medium text-gray-700 mb-2">
                  Your current monthly grocery spending (£)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <PoundSterling className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="monthly-spending"
                    value={monthlySpending}
                    onChange={handleInputChange}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 py-3 bg-white"
                    placeholder="200"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600 text-sm mb-1">Monthly Savings</p>
                  <p className="text-3xl font-bold text-green-600">£{estimatedSavings.toFixed(2)}</p>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600 text-sm mb-1">Annual Savings</p>
                  <p className="text-3xl font-bold text-teal-600">£{annualSavings.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center">
                  Start Saving Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5605061/pexels-photo-5605061.jpeg?auto=compress&cs=tinysrgb&w=1260"
                alt="Vegan grocery savings" 
                className="rounded-2xl shadow-lg w-full"
              />
              
              {/* Floating statistics cards */}
              <div className="absolute -top-5 -left-5 md:-left-10 bg-white p-4 rounded-lg shadow-md transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <p className="text-sm text-gray-600">Average Annual Savings</p>
                <p className="text-2xl font-bold text-green-600">£720</p>
              </div>
              
              <div className="absolute -bottom-5 -right-5 md:-right-10 bg-white p-4 rounded-lg shadow-md transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <p className="text-sm text-gray-600">Priced Items</p>
                <p className="text-2xl font-bold text-green-600">7,000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Savings;