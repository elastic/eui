import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiHideForBreakpoints, EuiHideFor } from './hide_for';

const BREAKPOINTS: EuiHideForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];

describe('EuiHideFor', () => {
  BREAKPOINTS.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiHideFor sizes={[size]} {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
