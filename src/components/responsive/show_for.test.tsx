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
  test('renders wraps chilren in a span', () => {
    const component = render(
      <EuiShowFor sizes={['xs']} {...requiredProps}>
        Child
      </EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders and copies classes', () => {
    const component = render(
      <EuiShowFor sizes={['xs']}>
        <div>Child</div>
      </EuiShowFor>
    );

    expect(component).toMatchSnapshot();
  });

  BREAKPOINTS.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(<EuiShowFor sizes={[size]} />);

      expect(component).toMatchSnapshot();
    });
  });

  DISPLAYS.forEach(display => {
    test(`${display} is rendered`, () => {
      const component = render(<EuiShowFor sizes={['xs']} display={display} />);

      expect(component).toMatchSnapshot();
    });
  });
});
