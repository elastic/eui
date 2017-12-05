import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import {
  EuiButtonEmpty,
  COLORS,
  SIZES,
  ICON_SIDES,
  FLUSH_TYPES,
} from './button_empty';

describe('EuiButtonEmpty', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonEmpty {...requiredProps}>
        Content
      </EuiButtonEmpty>
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonEmpty isDisabled />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonEmpty iconType="user" />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiButtonEmpty color={color} />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiButtonEmpty size={size} />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach(iconSide => {
        test(`${iconSide} is rendered`, () => {
          const component = render(
            <EuiButtonEmpty iconType="user" iconSide={iconSide}>
              Content
            </EuiButtonEmpty>
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });

    describe('flush', () => {
      FLUSH_TYPES.forEach(flushType => {
        test(`${flushType} is rendered`, () => {
          const component = render(
            <EuiButtonEmpty flush={flushType} />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
  });
});
