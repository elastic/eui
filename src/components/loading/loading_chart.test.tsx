import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiLoadingChart, SIZES } from './loading_chart';

describe('EuiLoadingChart', () => {
  test('is rendered', () => {
    const component = render(<EuiLoadingChart {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('mono is rendered', () => {
    const component = render(<EuiLoadingChart mono />);

    expect(component).toMatchSnapshot();
  });
  describe('size', () => {
    SIZES.forEach(size => {
      test(`${size} is rendered`, () => {
        const component = render(<EuiLoadingChart size={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
