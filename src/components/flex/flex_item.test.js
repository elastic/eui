import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiFlexItem,
  GROW_SIZES,
} from './flex_item';

const consoleWarn = console.warn;
const consoleError = console.error;

beforeAll(() => {
  console.warn = console.error = (msg) => { throw msg; };
});

afterAll(() => {
  console.warn = consoleWarn;
  console.error = consoleError;
});

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
