import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiLoadingSpinner,
  SIZES,
  EuiLoadingSpinnerComponentType,
} from './loading_spinner';

describe('EuiLoadingSpinner', () => {
  test('is rendered', () => {
    const component = render(<EuiLoadingSpinner {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach(size => {
      test(`${size} is rendered`, () => {
        const component = render(<EuiLoadingSpinner size={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('component', () => {
    (['div', 'span', 'figure'] as EuiLoadingSpinnerComponentType[]).forEach(
      value => {
        test(`${value} is rendered`, () => {
          const component = render(<EuiLoadingSpinner component={value} />);

          expect(component).toMatchSnapshot();
        });
      }
    );

    ['h2'].forEach(value => {
      test(`${value} is not rendered`, () => {
        expect(() =>
          render(
            // intentionally passing an invalid value
            // @ts-ignore
            <EuiLoadingSpinner component={value} />
          )
        ).toThrow();
      });
    });
  });
});
