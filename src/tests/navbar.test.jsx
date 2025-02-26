import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

it('Renders the navigation bar with correct tabs', async () => {
  render(<App />);

  // Check if the navigation bar contains expected tabs
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About')).toBeInTheDocument();
  expect(screen.getByText('Experience')).toBeInTheDocument();
  expect(screen.getByText('Projects')).toBeInTheDocument();
});

it('Highlights the Home tab by default', async () => {
  render(<App />);
  
  const homeTab = screen.getByText('Home');
  expect(homeTab).toHaveStyle('font-weight: bold'); // Assuming bold text for selected tab
});

it('Applies dark mode styling by default', async () => {
  render(<App />);

  const navbar = screen.getByRole('navigation');
  expect(navbar).toHaveStyle('background-color: #121212'); // Default dark mode background
});

it('Applies light mode styling when toggled', async () => {
  render(<App />);

  const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i });

  // Click the toggle button to switch to light mode
  fireEvent.click(toggleButton);

  const navbar = screen.getByRole('navigation');
  expect(navbar).toHaveStyle('background-color: #FAF9F6'); // Light mode background
});
