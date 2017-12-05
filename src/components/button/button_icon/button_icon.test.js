import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiButtonIcon, COLORS } from './button_icon';

describe('EuiButtonIcon', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonIcon {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonIcon aria-label="button" isDisabled />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonIcon aria-label="button" iconType="user" />
        );

        expect(component)
          .toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiButtonIcon aria-label="button" color={color} />
          );

          expect(component)
            .toMatchSnapshot();
        });
      });
    });
  });
});
