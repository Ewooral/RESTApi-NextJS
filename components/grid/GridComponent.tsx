// GridComponent.tsx
import React from 'react';

type GridComponentProps = {
    children: React.ReactNode;
};

const GridComponent: React.FC<GridComponentProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-10 gap-4">
            {children}
        </div>
    );
};

export default GridComponent;
