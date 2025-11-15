import React from "react";

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="
        bg-white/90 
        backdrop-blur-sm
        p-6 
        rounded-2xl 
        shadow-[0_6px_20px_rgba(0,0,0,0.05)]
        border border-orange-100 
        hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]
        hover:-translate-y-1
        transition-all 
        duration-300
      "
    >
      {/* ICON */}
      <div
        className="
          flex items-center justify-center 
          w-14 h-14 
          bg-orange-50 
          border border-orange-100
          rounded-2xl 
          mb-4 
          shadow-inner
        "
      >
        <Icon
          className="text-orange-500 drop-shadow-sm"
          size={26}
        />
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-1 text-gray-900 tracking-tight">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
