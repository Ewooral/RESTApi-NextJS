import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../header';

describe('Header component', () => {
  test('renders header with links', () => {
    // @ts-ignore
    render(<Header user={{ name: 'John Doe' }} />);

    // Assert that the "My Profile" link is present
    const myProfileLink = screen.getByText(/profile/i);
    // @ts-ignore
    expect(myProfileLink).toBeInTheDocument();

    // Assert that the "Settings" and "Logout" links are present
    const settingsLink = screen.getByText(/Settings/i);
    const logoutLink = screen.getByText(/Logout/i);
     // @ts-ignore
    expect(settingsLink).toBeInTheDocument();
     // @ts-ignore
    expect(logoutLink).toBeInTheDocument();
  });
});
