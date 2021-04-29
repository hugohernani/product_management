import React from 'react';
import { render } from '@testing-library/react';
import Logo from '.';

const img_src_sample = 'https://via.placeholder.com/150';

test('Image rendering', () => {
  const { getByRole } = render(<Logo src={img_src_sample} />);

  expect(getByRole(/img/)).toBeInTheDocument();
  expect(getByRole(/img/)).toHaveAttribute('src', img_src_sample);
});
