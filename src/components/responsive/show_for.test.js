import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { RESPONSIVE_SIZES, EuiShowFor } from './show_for';

describe('EuiShowFor', () => {
  RESPONSIVE_SIZES.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiShowFor sizes={[size]} {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
