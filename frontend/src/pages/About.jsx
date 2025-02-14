import React from "react";

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-25 text-gray-800 text-center">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6">About Us</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-10">
        Welcome to <span className="font-semibold">FundConnect</span> – the platform bridging the gap between 
        <strong> innovative projects</strong> and <strong>passionate investors</strong>. We empower startups, 
        social causes, and creative minds by providing a secure & transparent crowdfunding ecosystem.
      </p>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-blue-500 flex items-center justify-center gap-2">
          🚀 Our Mission
        </h3>
        <p className="text-gray-700 mt-3">
          We believe in the power of community-driven funding. Our goal is to support 
          entrepreneurs, nonprofits, and creators in turning visions into reality.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-blue-500 flex items-center justify-center gap-2">
          💡 How It Works
        </h3>
        <ul className="text-gray-700 mt-3 text-left mx-auto max-w-md space-y-2">
          <li>✅ <strong>Discover Projects:</strong> Explore innovative ideas across various categories.</li>
          <li>✅ <strong>Invest Securely:</strong> Make safe transactions through our platform.</li>
          <li>✅ <strong>Track Progress:</strong> Stay updated on funding milestones.</li>
        </ul>
      </div>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-6">
        <h3 className="text-2xl font-semibold text-blue-500 flex items-center justify-center gap-2">
          🌟 Why Choose Us?
        </h3>
        <ul className="text-gray-700 mt-3 text-left mx-auto max-w-md space-y-2">
          <li>✔️ Transparent and secure funding process.</li>
          <li>✔️ User-friendly platform for investors and project owners.</li>
          <li>✔️ Dedicated support team to assist at every step.</li>
        </ul>
      </div>

      <p className="text-lg text-gray-600 mt-8">
        Join us in shaping the future – one project at a time! 🚀
      </p>
    </div>
  );
}

export default About;
