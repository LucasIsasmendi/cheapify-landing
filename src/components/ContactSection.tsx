import React, { useState } from 'react';
import ContactForm from './ContactForm';

const ContactSection: React.FC = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
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

export default ContactSection;