import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-50 py-10 mt-16 border-t border-orange-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-8">
        
        {/* --- About Section --- */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-lg">Cuisinex 🍳</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your personal <strong>AI kitchen companion</strong>.  
            Discover recipes, filter by your preferences, and make the most of the 
            ingredients you already have.
          </p>
        </div>

        {/* --- Explore Section --- */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-lg">Explore</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Ingredient Search</li>
            <li>Recipe Filters</li>
            <li>Smart Suggestions</li>
            <li>AI-Based Matching</li>
          </ul>
        </div>

        {/* --- Resources Section --- */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-lg">Resources</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Blog</li>
            <li>Cooking Tips</li>
            <li>Developer Docs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* --- Contact Section --- */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-lg">Get in Touch</h4>
          <p className="text-gray-600 text-sm mb-3">
            Have feedback or a feature request?  
            Drop a hi 👋 — we’d love to hear from you!
          </p>
          <a
            href="mailto:support@cuisinex.com"
            className="text-orange-600 font-medium hover:underline"
          >
            adarshtry70@gmail.com
          </a>
        </div>
      </div>

      {/* --- Copyright --- */}
      <p className="text-center text-gray-500 text-sm mt-10 border-t pt-5 border-orange-100">
        © {new Date().getFullYear()} <span className="font-semibold text-gray-700">Cuisinex</span>. 
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
