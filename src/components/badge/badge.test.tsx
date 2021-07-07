/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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

  test('is rendered with href provided', () => {
    const component = render(
      <EuiBadge {...requiredProps} href="/#/">
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

  test('is rendered with iconOnClick and href provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/">
        Content
      </EuiBadge>
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with href and rel provided', () => {
    const component = render(
      <EuiBadge
        {...requiredProps}
        iconOnClick={jest.fn()}
        iconOnClickAriaLabel="Example of onclick event for icon within the anchor"
        href="/#/"
        rel="noopener">
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
      COLORS.forEach((color) => {
        it(`${color} is rendered`, () => {
          const component = render(<EuiBadge color={color}>Content</EuiBadge>);

          expect(component).toMatchSnapshot();
        });
      });

      it('accepts rgba', () => {
        const component = render(
          <EuiBadge color="rgba(255,255,255,1)">Content</EuiBadge>
        );

        expect(component).toMatchSnapshot();
      });

      it('accepts hex', () => {
        const component = render(<EuiBadge color="#333">Content</EuiBadge>);

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach((iconSide) => {
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

    describe('style', () => {
      const style = { border: '4px solid tomato' };

      it('is rendered', () => {
        const component = render(<EuiBadge style={style}>Content</EuiBadge>);

        expect(component).toMatchSnapshot();
      });

      COLORS.forEach((color) => {
        it(`is rendered with ${color}`, () => {
          const component = render(
            <EuiBadge style={style} color={color}>
              Content
            </EuiBadge>
          );

          expect(component).toMatchSnapshot();
        });
      });

      it('is rendered with hollow', () => {
        const component = render(
          <EuiBadge style={style} color="hollow">
            Content
          </EuiBadge>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
