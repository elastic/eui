import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiBadge, COLORS, ICON_SIDES } from './badge';

describe('EuiBadge', () => {
  test('is rendered', () => {
    const component = render(<EuiBadge {...requiredProps}>Content</EuiBadge>);

    expect(component).toMatchSnapshot();
  });

  test('is disabled', () => {
    const component = render(
      <EuiBadge isDisabled {...requiredProps}>
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with onClick provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with iconOnClick provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with iconOnClick and onClick provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the button"
        onClick={jest.fn()}
        onClickAriaLabel="Example of onclick event for the button">
        Content
      </EuiBadge>
    );

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
