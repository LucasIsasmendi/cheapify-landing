import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

type TestimonialProps = {
  quote: string;
  name: string;
  title: string;
  image: string;
  stars: number;
};

const testimonials: TestimonialProps[] = [
  {
    quote: "Cheapify has completely changed how I shop for vegan groceries. I'm saving at least $200 per month without compromising on quality.",
    name: "Sarah Johnson",
    title: "Vegan for 3 years",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    stars: 5
  },
  {
    quote: "As a college student on a tight budget, this app has been a lifesaver for maintaining my vegan lifestyle without breaking the bank.",
    name: "Michael Chen",
    title: "Student & Vegan Enthusiast",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    stars: 5
  },
  {
    quote: "I was skeptical at first, but the price comparison feature alone has saved me hundreds. The meal planning suggestions are fantastic too!",
    name: "Emma Rodriguez",
    title: "New to Veganism",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    stars: 4
  }
];

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, title, image, stars }) => (
  <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-5 w-5 ${i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
    </div>
    
    <p className="mt-4 text-gray-700 italic">"{quote}"</p>
    
    <div className="mt-6 flex items-center">
      <img 
        src={image} 
        alt={name} 
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who are saving money on their vegan grocery shopping with Cheapify.
          </p>
        </div>
        
        {/* Desktop view: Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        
        {/* Mobile view: Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <TestimonialCard {...testimonials[currentIndex]} />
            
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;