import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ContactForm from './ContactForm';

type FaqItemProps = {
  question: string;
  answer: string;
};

const faqItems: FaqItemProps[] = [
  {
    question: "Is Cheapify only for vegans?",
    answer: "While Cheapify is designed with vegans in mind, anyone looking to save money on plant-based groceries can benefit from our app. Our focus is on making vegan shopping more affordable and accessible for everyone."
  },
  {
    question: "How does Cheapify find the best deals?",
    answer: "Cheapify uses a combination of user-reported prices, partnerships with stores, and automated web scraping to gather and compare prices across multiple retailers in your area. We update our database regularly to ensure you always get the most current pricing information."
  },
  {
    question: "Is Cheapify available in my area?",
    answer: "Cheapify currently supports major cities in the UK. We're rapidly expanding to new locations."
  },
  {
    question: "How much does Cheapify cost?",
    answer: "Cheapify offers both free and premium plans. The free plan includes basic price comparison and shopping list features. The premium plan (£4.99/month) unlocks unlimited price comparisons and exclusive deals with partner stores."
  }
];

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-5">
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-green-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-green-600" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-3 text-gray-600 animate-fadeIn">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq: React.FC = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Got questions about Cheapify? Find answers to the most common questions below.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            {faqItems.map((item, index) => (
              <FaqItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="text-green-600 hover:text-green-700 font-medium underline transition-colors"
            >
              Contact our support team
            </button>
          </div>
        </div>
      </div>

      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </section>
  );
};

export default Faq;