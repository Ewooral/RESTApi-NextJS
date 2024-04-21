import {render, fireEvent, screen } from '@testing-library/react';
import DynamicSidebar from './DynamicSidebar';
import { sidebarData } from '@/data/data';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => children);

describe('DynamicSidebar', () => {
  test('renders sidebar items. sidebarwidth must be greater than 100', () => {
    render(<DynamicSidebar sidebarWidth="101" />);
    sidebarData.forEach(item => {
      const sidebarItem = screen.getByText(item.label);
      expect(sidebarItem).toBeInTheDocument(); // Use toBeInTheDocument matcher
    });
  });

it("Should have the text 'Logout' in it", () => {
  render(<DynamicSidebar sidebarWidth="101" />);
  expect(screen.getByText("Logout")).toBeInTheDocument();
})


}
)