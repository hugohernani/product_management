import React from 'react';
import { render, within } from '@testing-library/react';
import Logo from '../Logo';
import NavBar from '.';

jest.mock('../Logo', () => {
  const FakeLogo = jest.fn(() => null);

  return {
    __esModule: true,
    default: FakeLogo,
  };
});

test('Logo component', () => {
  render(<NavBar />);

  expect(Logo).toHaveBeenCalledWith({ src: expect.any(String) }, expect.any(Object));
});

test('renders bootstrap navbar structure', () => {
  const { getByRole } = render(<NavBar />);

  const navbarElem = getByRole('navigation');
  expect(navbarElem).toBeInTheDocument();
  expect(navbarElem).toHaveClass('navbar', 'navbar-expand-lg', 'navbar-light');

  const navbarBrandElement = within(navbarElem).getByRole('link');
  expect(navbarBrandElement).toBeInTheDocument();
  expect(navbarBrandElement).toHaveClass('navbar-brand');
  expect(navbarBrandElement).toHaveAttribute('href', '/');
});
