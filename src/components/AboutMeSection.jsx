import React from 'react';

const AboutMeSection = ({ sidebarText, children }) => (
  <section className="py-4 w-full flex justify-center">
    {/* Two-column layout with theme styling */}
    <div className="flex overflow-hidden items-stretch w-full max-w-4xl mx-6 rounded-2xl shadow-lg hover:shadow-primary-md transition-shadow duration-300 border border-medium">
      {/* Sidebar column - center items vertically */}
      <div className="min-w-[20%] max-w-[20%] gradient-primary p-6 flex items-center justify-center border-r border-medium text-white font-medium text-center">
        {sidebarText}
      </div>

      {/* Main body */}
      <div className="min-w-[80%] bg-bg-secondary p-6 flex items-start text-left min-w-0 flex-grow text-content-primary leading-relaxed">
        {children}
      </div>
    </div>
  </section>
);

export default AboutMeSection;
