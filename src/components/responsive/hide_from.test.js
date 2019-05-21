import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { RESPONSIVE_SIZES, EuiHideFor } from './hide_from';

describe('EuiHideFor', () => {
  RESPONSIVE_SIZES.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiHideFor sizes={[size]} {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
