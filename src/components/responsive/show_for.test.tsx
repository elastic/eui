import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import {
  EuiShowForBreakpoints,
  EuiShowForDisplay,
  EuiShowFor,
} from './show_for';

const BREAKPOINTS: EuiShowForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];
const DISPLAYS: EuiShowForDisplay[] = ['block', 'inlineBlock', 'flex'];

describe('EuiShowFor', () => {
  BREAKPOINTS.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiShowFor sizes={[size]} {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  DISPLAYS.forEach(display => {
    test(`${display} is rendered`, () => {
      const component = render(
        <EuiShowFor sizes={['xs']} display={display} {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
