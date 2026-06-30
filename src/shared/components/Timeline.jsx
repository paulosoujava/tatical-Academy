// Componente Timeline - Tactical Academy
import React from 'react';

const Timeline = ({ items }) => {
  return (
    <div className="timeline-container">
      {items.map((item, index) => (
        <div key={index} className={`timeline-item ${item.active ? 'active' : ''}`}>
          <div className="timeline-date">{item.date}</div>
          <div className="timeline-title">{item.title}</div>
          {item.description && <div className="timeline-desc">{item.description}</div>}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
