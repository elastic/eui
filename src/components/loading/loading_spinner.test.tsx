import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiLoadingSpinner, SIZES } from './loading_spinner';

describe('EuiLoadingSpinner', () => {
  test('is rendered', () => {
    const component = render(<EuiLoadingSpinner {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach(size => {
      test(`${size} is rendered`, () => {
        const component = render(<EuiLoadingSpinner size={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
