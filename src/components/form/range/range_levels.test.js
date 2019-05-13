import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiRangeLevels } from './range_levels';

describe('EuiRangeLevels', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRangeLevels
        min={0}
        max={100}
        showTicks
        levels={[
          {
            min: 0,
            max: 20,
            color: 'danger',
          },
          {
            min: 20,
            max: 100,
            color: 'success',
          },
        ]}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('should throw error if `level.min` is lower than `min`', () => {
    const component = () =>
      render(
        <EuiRangeLevels
          min={0}
          max={100}
          levels={[
            {
              min: -10,
              max: 20,
              color: 'danger',
            },
          ]}
        />
      );

    expect(component).toThrowErrorMatchingSnapshot();
  });

  test('should throw error if `level.max` is higher than `max`', () => {
    const component = () =>
      render(
        <EuiRangeLevels
          min={0}
          max={100}
          levels={[
            {
              min: 20,
              max: 200,
              color: 'danger',
            },
          ]}
        />
      );

    expect(component).toThrowErrorMatchingSnapshot();
  });
});
