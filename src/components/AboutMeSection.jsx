import React from 'react';
import '../styles/AboutMeSection.css';

const AboutMeSection = ({ sidebarText, children }) => (
  <section>
    {/* Top separator */}
    <hr style={{ margin: '1.5rem 0' }} />

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

    {/* Bottom separator */}
    <hr style={{ margin: '1.5rem 0' }} />
  </section>
);

export default AboutMeSection;
