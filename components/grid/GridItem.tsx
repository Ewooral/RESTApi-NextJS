import React from 'react';

interface GridItemProps {
  colSpan?: number;
  rowSpan?: number;
    children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ colSpan, rowSpan, children }) => {
  // Calculate grid-column and grid-row classes
  const gridColumnClass = `col-span-${colSpan}`;
  const gridRowClass = `row-span-${rowSpan}`;

  return (
    <div
      className={`bg-gray-300 border border-gray-400 flex items-center justify-center ${gridColumnClass}`}
    >
      {children}
    </div>
  );
};

export default GridItem;
