// components/Layout.tsx
import React from 'react';
import GridComponent from '../grid/GridComponent';
import GridItem from '../grid/GridItem';
import GridSidebar from '../sidebars/GridSidebar';
// import LeftSideMenu from './LeftSideMenu';

interface LayoutProps {
    children: React.ReactNode;
}

const GridLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <GridComponent>
      <GridItem colSpan={3}>
        {/* Sidebar menu */}
        <GridSidebar />
      </GridItem>
      <GridItem colSpan={9}>
        {/* Main content */}
        {children}
      </GridItem>
    </GridComponent>
  );
};

export default GridLayout;
