import React, { useEffect, useRef } from 'react';

const Tooltip: React.FC = () => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '1';
      tooltipRef.current.style.visibility = 'visible'; // Ensure visibility is set to visible
      setTimeout(() => {
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '0';
          tooltipRef.current.style.visibility = 'hidden'; // Hide the tooltip
        }
      }, 5000); // Hide after 5 seconds
    }
  }, []);

  return (
    <div ref={tooltipRef} className="tooltip">
      Use Scroll to zoom, and drag to pan.
    </div>
  );
};

export default Tooltip;

