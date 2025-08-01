import React from 'react';
import '../styles/AboutMeSection.css';

const AboutMeSection = ({ sidebarText, children }) => (
  <section>

    {/* Two-column layout */}
    <div
      className='section-container'
    >
      {/* Sidebar column - center items vertically */}
      <div
        className='section-sidebar'
      >
        {sidebarText}
      </div>

      {/* Main body */}
      <div className='section-details'>
        {children}
      </div>
    </div>
  </section>
);

export default AboutMeSection;
