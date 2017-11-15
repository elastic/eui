import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiFlexItem } from './flex_item';

describe('EuiFlexItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFlexItem {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('tests the grow prop correctly', () => {
    const propType = EuiFlexItem.propTypes.grow;

    const validValues = [undefined, null, true, false, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const invalidValues = ['true', 'false', '1', 0];

    validValues.forEach(value =>
      expect(propType({ grow: value }, `grow`)).toBe(undefined)
    );
    invalidValues.forEach(value =>
      expect(propType({ grow: value }, `grow`) instanceof Error).toBe(true)
    );
  });
});
