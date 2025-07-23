import React from 'react';

const SIDEBAR_WIDTH = '20%';

const AboutMeSection = ({ sidebarText, children }) => (
  <section>
    {/* Top separator */}
    <hr style={{ margin: '1.5rem 0' }} />

    {/* Two-column layout */}
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      {/* Sidebar column */}
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
        }}
      >
        {sidebarText}
      </aside>

      {/* Main body */}
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>

    {/* Bottom separator */}
    <hr style={{ margin: '1.5rem 0' }} />
  </section>
);

export default AboutMeSection;
