
import React from 'react';

interface TornEdgeProps {
  color: string;
  position: 'top' | 'bottom';
}

const TornEdge: React.FC<TornEdgeProps> = ({ color, position }) => {
  const isTop = position === 'top';
  
  return (
    <div 
      className={`absolute left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none ${isTop ? 'top-0' : 'bottom-0'}`}
      style={{ transform: isTop ? 'none' : 'scaleY(-1)' }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block w-full h-[60px] md:h-[100px]"
        style={{ fill: color }}
      >
        <path d="M0,0V120H1200V0C1100,20,1000,60,900,40C800,20,700,80,600,60C500,40,400,100,300,80C200,60,100,20,0,0Z" />
        <path d="M0,40 C150,10 300,80 450,50 C600,20 750,90 900,60 C1050,30 1200,80 1200,80 V120 H0 Z" opacity="0.4" />
        <path d="M0,80 C100,60 200,100 300,80 C400,60 500,110 600,85 C700,60 800,105 900,80 C1000,55 1100,95 1200,75 V120 H0 Z" opacity="0.7" />
      </svg>
    </div>
  );
};

export default TornEdge;
