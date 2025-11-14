/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiButton, COLORS, SIZES } from './button';

import {
  ICON_SIDES,
  ICON_SIZES,
} from './button_display/_button_display_content';

describe('EuiButton', () => {
  shouldRenderCustomStyles(<EuiButton>Content</EuiButton>, {
    childProps: ['contentProps'],
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiButton {...requiredProps}>Content</EuiButton>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('fill', () => {
      it('is rendered', () => {
        const { container } = render(<EuiButton fill />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const { container, getByTestSubject } = render(
          <EuiButton isDisabled data-test-subj="button" />
        );

        const button = getByTestSubject('button');

        expect(container.firstChild).toMatchSnapshot();
        expect(button).toBeEuiDisabled();
        expect(button).toHaveAttribute('disabled', '');
        expect(button).not.toHaveAttribute('aria-disabled');
      });

      it('renders a button even when href is defined', () => {
        const { container } = render(<EuiButton href="#" isDisabled />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('renders if passed as disabled', () => {
        const { container } = render(<EuiButton disabled />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('hasAriaDisabled', () => {
      it('renders `aria-disabled` when `isDisabled=true`', () => {
        const { getByTestSubject } = render(
          <EuiButton hasAriaDisabled isDisabled data-test-subj="button" />
        );

        const button = getByTestSubject('button');

        expect(button).toBeEuiDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
        expect(button).not.toHaveAttribute('disabled');
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const { container } = render(<EuiButton isLoading />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered as true', () => {
        const { container } = render(<EuiButton isSelected />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('is rendered as false', () => {
        const { container } = render(<EuiButton isSelected={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('fullWidth', () => {
      it('is rendered', () => {
        const { container } = render(<EuiButton fullWidth />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('minWidth', () => {
      it('is rendered', () => {
        const { container } = render(<EuiButton minWidth={0} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(<EuiButton iconType="user" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<EuiButton color={color} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(<EuiButton size={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach((iconSide) => {
        test(`${iconSide} is rendered`, () => {
          const { container } = render(
            <EuiButton iconType="user" iconSide={iconSide}>
              Content
            </EuiButton>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('iconSize', () => {
      ICON_SIZES.forEach((iconSize) => {
        test(`${iconSize} is rendered`, () => {
          const { container } = render(
            <EuiButton iconType="user" iconSize={iconSize}>
              Content
            </EuiButton>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const { container } = render(<EuiButton href="#" target="_blank" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', () => {
        const handler = jest.fn();
        const { getByRole } = render(<EuiButton href="#" onClick={handler} />);
        fireEvent.click(getByRole('link'));
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const { getByRole } = render(<EuiButton onClick={handler} />);
        fireEvent.click(getByRole('button'));
        expect(handler).toHaveBeenCalledTimes(1);
      });
    });

    test('contentProps is rendered', () => {
      const { container } = render(
        <EuiButton contentProps={requiredProps}>Content</EuiButton>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('textProps is rendered', () => {
      const { container } = render(
        <EuiButton textProps={requiredProps}>Content</EuiButton>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
