import React from 'react';
import { render } from 'enzyme';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';

import {
  EuiFlexItem,
  GROW_SIZES,
} from './flex_item';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

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

    const validValues = GROW_SIZES;
    const invalidValues = ['true', 'false', '1', 0];

    validValues.forEach(value =>
      expect(propType({ grow: value }, `grow`)).toBe(undefined)
    );
    invalidValues.forEach(value =>
      expect(propType({ grow: value }, `grow`) instanceof Error).toBe(true)
    );
  });

  describe('grow', () => {
    GROW_SIZES.concat([true, false]).forEach(value => {
      test(`${value} is rendered`, () => {
        const component = render(
          <EuiFlexItem grow={value} />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });
  });

  describe('component', () => {
    ['div', 'span'].forEach(value => {
      test(`${value} is rendered`, () => {
        const component = render(
          <EuiFlexItem component={value} />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    ['h2'].forEach(value => {
      test(`${value} is not rendered`, () => {
        expect(() => render(
          <EuiFlexItem component={value} />
        )).toThrow();
      });
    });
  });
});
