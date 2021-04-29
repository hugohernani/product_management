import React from 'react';
import { render, screen, within } from '@testing-library/react';
import HomepageNavBar from '.';

test('Renders Home Link', () => {
  const { getByRole } = render(<HomepageNavBar />);

  const navbarElem = getByRole('navigation');
  expect(navbarElem).toBeInTheDocument();
  expect(navbarElem).toHaveClass('navbar', 'navbar-expand-lg', 'navbar-light');

  const homeLinkBtn = within(navbarElem).getByRole('link');
  expect(homeLinkBtn).toBeInTheDocument();
  expect(homeLinkBtn).toHaveClass('active btn-outline-primary btn-lg');
  expect(homeLinkBtn).toHaveAttribute('href', '/');
});
