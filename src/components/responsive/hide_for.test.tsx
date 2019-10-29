import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiHideForBreakpoints, EuiHideFor } from './hide_for';

const BREAKPOINTS: EuiHideForBreakpoints[] = ['xs', 's', 'm', 'l', 'xl'];

describe('EuiHideFor', () => {
  test('renders wraps chilren in a span', () => {
    const component = render(
      <EuiHideFor sizes={['xs']} {...requiredProps}>
        Child
      </EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders and copies classes', () => {
    const component = render(
      <EuiHideFor sizes={['xs']}>
        <div>Child</div>
      </EuiHideFor>
    );

    expect(component).toMatchSnapshot();
  });

  BREAKPOINTS.forEach(size => {
    test(`${size} is rendered`, () => {
      const component = render(
        <EuiHideFor sizes={[size]} {...requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
