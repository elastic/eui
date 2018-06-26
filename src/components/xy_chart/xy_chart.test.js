import React from 'react';
import { mount, render } from 'enzyme';

import { EuiXYChart } from './xy_chart';
import { requiredProps } from '../../test/required_props';

describe('EuiXYChart', () => {
  test('is rendered (empty)', () => {
    const component = render(
      <EuiXYChart
        width={600}
        height={200}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('passes handler functions', () => {
    const component = mount(
      <EuiXYChart
        width={600}
        height={200}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
