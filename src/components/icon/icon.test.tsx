import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiIcon,
  SIZES,
  TYPES,
} from './icon';

describe('EuiIcon', () => {
  test('is rendered', () => {
    const component = render(
      <EuiIcon type="search" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('other props', () => {
      test('are passed through to the icon', () => {
        const component = render(
          <EuiIcon type="search" aria-label="a custom title" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiIcon type="search" size={size} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('type', () => {
      TYPES.forEach(type => {
        test(`${type} is rendered`, () => {
          const component = render(
            <EuiIcon type={type} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('tabIndex', () => {
      test('renders focusable="false" when not provided', () => {
        const component = render(<EuiIcon type="search" />);
        expect(component).toMatchSnapshot();
      });

      test('renders focusable="false" when -1', () => {
        const component = render(<EuiIcon type="search" tabIndex={-1} />);
        expect(component).toMatchSnapshot();
      });

      test('renders focusable="true" when 0', () => {
        const component = render(<EuiIcon type="search" tabIndex={0} />);
        expect(component).toMatchSnapshot();
      });
    });
  });
});
