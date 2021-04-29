import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dbadapt-weather title', () => {
  render(<App />);
  const linkElement = screen.getByText(/dbadapt-weather/i);
  expect(linkElement).toBeInTheDocument();
});
