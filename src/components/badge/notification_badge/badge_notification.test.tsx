import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiNotificationBadge, COLORS, SIZES } from './badge_notification';

describe('EuiNotificationBadge', () => {
  test('is rendered', () => {
    const component = render(
      <EuiNotificationBadge {...requiredProps}>5</EuiNotificationBadge>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiNotificationBadge color={color}>5</EuiNotificationBadge>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiNotificationBadge size={size}>5</EuiNotificationBadge>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
