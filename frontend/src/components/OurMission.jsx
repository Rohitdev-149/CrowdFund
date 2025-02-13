import React from "react";

function AboutSection() {
  return (
    <div className="p-7 sm:p-10 md:p-20 bg-gray-100 text-gray-900 flex flex-col md:flex-row md:justify-between items-center space-y-12 md:space-y-0 md:space-x-10">
  
      <div className="text-center max-w-md flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-semibold underline underline-offset-8 text-gray-800 mb-4">
          Our Mission
        </h2>
        <img 
          src="/mission.png" 
          alt="Our Mission" 
          className="w-48 h-48 object-cover rounded-lg  mb-4" 
        />
        <p className="text-base sm:text-lg">
          Our mission is to empower innovators and visionaries by providing a seamless crowdfunding platform.
        </p>
      </div>
      
     
      <div className="text-center max-w-md flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-semibold underline underline-offset-8 text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <img 
          src="/mission2.png" 
          alt="Why Choose Us" 
          className="w-48 h-48 object-contain rounded-lg  mb-4" 
        />
        <p className="text-base sm:text-lg">
          We offer a user-friendly, secure, and transparent platform that makes fundraising effortless.
        </p>
      </div>
      
     
      <div className="text-center max-w-md flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-semibold underline underline-offset-8 text-gray-800 mb-4">
          How It Works
        </h2>
        <img 
          src="/mission3.png" 
          alt="How It Works" 
          className="w-48 h-48 object-cover rounded-lg  mb-4" 
        />
        <p className="text-base sm:text-lg">
          Creating a campaign is easy! Sign up, share your story, and connect with backers to bring your idea to life.
        </p>
      </div>
    </div>
  );
}

export default AboutSection;