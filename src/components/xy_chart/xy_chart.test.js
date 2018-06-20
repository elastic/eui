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
        yTicks={[[0, 'zero'], [100, 'one hundred']]}
        xTicks={[[0, 'zero', 5, 'five'], [10, '10']]}
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
        onHover={() => {}}
        onMouseLeave={() => {}}
        onSelectEnd={() => {}}
        yTicks={[[0, 'zero'], [100, 'one hundred']]}
        xTicks={[[0, 'zero', 5, 'five'], [10, '10']]}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
