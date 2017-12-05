import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiButton,
  COLORS,
  SIZES,
  ICON_SIDES,
} from './button';

describe('EuiButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButton {...requiredProps}>
        Content
      </EuiButton>
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('fill', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButton fill />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButton isDisabled />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButton iconType="user" />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiButton color={color} />
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
            <EuiButton size={size} />
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
            <EuiButton iconType="user" iconSide={iconSide}>
              Content
            </EuiButton>
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
  });
});
