import React from 'react';

const HeroSection = () => {
  return (
    <div className="px-6 md:px-20 py-16">
<section className="relative flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-purple-800 to-indigo-900 overflow-hidden mt-20">
        
      
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/HeroSection.jpeg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

       
        <div className="relative z-10 text-center text-white px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bring Your Ideas to Life
          </h1>

          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
            Join thousands of creators and start your crowdfunding campaign today. 
            Turn your vision into reality with the support of a global community.
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 shadow-lg px-8 py-4 rounded-lg text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-105">
            Start a Campaign
          </button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
