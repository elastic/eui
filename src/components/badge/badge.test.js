import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiBadge, COLORS, ICON_SIDES } from './badge';

describe('EuiBadge', () => {
  test('is rendered', () => {
    const component = render(<EuiBadge {...requiredProps}>Content</EuiBadge>);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<EuiBadge iconType="user">Content</EuiBadge>);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        it(`${color} is rendered`, () => {
          const component = render(<EuiBadge color={color}>Content</EuiBadge>);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach(iconSide => {
        it(`${iconSide} is rendered`, () => {
          const component = render(
            <EuiBadge iconType="user" iconSide={iconSide}>
              Content
            </EuiBadge>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
