import React, { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { trackEvent } from './Analytics';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const { error: dbError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (dbError) {
        if (dbError.code === '23505') { // Unique violation
          setError('This email is already subscribed to our newsletter.');
        } else {
          throw dbError;
        }
        return;
      }

      setIsSubmitted(true);
      setEmail('');
      
      // Track successful newsletter signup
      trackEvent('newsletter_signup', {
        email: email,
        source: 'homepage'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Newsletter subscription error:', err);
      
      // Track newsletter signup error
      trackEvent('newsletter_signup_error', {
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-green-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Exclusive Vegan Deals & Tips</h2>
          <p className="text-lg text-green-100 mb-8">
            Join our newsletter to receive the latest money-saving tips, exclusive deals, and seasonal recipes that won't break the bank.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring ${
                  error ? 'border-2 border-red-500 focus:ring-red-200' : 'focus:ring-green-200'
                }`}
                disabled={isSubmitting || isSubmitted}
              />
              
              <button
                type="submit"
                className={`absolute right-1 top-1 bottom-1 bg-green-800 hover:bg-green-900 text-white px-6 rounded-full font-medium transition-colors flex items-center justify-center ${
                  (isSubmitting || isSubmitted) ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : isSubmitted ? (
                  <>
                    <Check className="h-5 w-5 mr-1" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-1" />
                    Subscribe
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="mt-2 text-left flex items-center text-yellow-300 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
            
            <p className="mt-4 text-sm text-green-200">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;