/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiButtonEmpty, SIZES, FLUSH_TYPES } from './button_empty';
import { ICON_SIDES } from '../button_display/_button_display_content';
import { BUTTON_COLORS } from '../../../global_styling/mixins';

describe('EuiButtonEmpty', () => {
  shouldRenderCustomStyles(<EuiButtonEmpty>Content</EuiButtonEmpty>, {
    childProps: ['contentProps', 'textProps'],
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiButtonEmpty {...requiredProps}>Content</EuiButtonEmpty>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const { container, getByTestSubject } = render(
          <EuiButtonEmpty isDisabled data-test-subj="button" />
        );

        const button = getByTestSubject('button');

        expect(container.firstChild).toMatchSnapshot();
        expect(button).toBeEuiDisabled();
        expect(button).toHaveAttribute('disabled', '');
        expect(button).not.toHaveAttribute('aria-disabled');
      });

      it('renders a button even when href is defined', () => {
        const { container } = render(<EuiButtonEmpty href="#" isDisabled />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('renders if passed simply as disabled', () => {
        const { container } = render(<EuiButtonEmpty disabled />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('hasAriaDisabled', () => {
      it('renders `aria-disabled` when `isDisabled=true`', () => {
        const { getByTestSubject } = render(
          <EuiButtonEmpty hasAriaDisabled isDisabled data-test-subj="button" />
        );

        const button = getByTestSubject('button');

        expect(button).toBeEuiDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
        expect(button).not.toHaveAttribute('disabled');
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const { container } = render(<EuiButtonEmpty isLoading />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered as true', () => {
        const { container } = render(<EuiButtonEmpty isSelected />);

        expect(container.firstChild).toMatchSnapshot();
      });

      it('is rendered as false', () => {
        const { container } = render(<EuiButtonEmpty isSelected={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(<EuiButtonEmpty iconType="user" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      BUTTON_COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<EuiButtonEmpty color={color} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(<EuiButtonEmpty size={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach((iconSide) => {
        test(`${iconSide} is rendered`, () => {
          const { container } = render(
            <EuiButtonEmpty iconType="user" iconSide={iconSide}>
              Content
            </EuiButtonEmpty>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('flush', () => {
      FLUSH_TYPES.forEach((flushType) => {
        test(`${flushType} is rendered`, () => {
          const { container } = render(<EuiButtonEmpty flush={flushType} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const { container } = render(
          <EuiButtonEmpty href="#" target="_blank" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', () => {
        const handler = jest.fn();
        const { container } = render(
          <EuiButtonEmpty href="#" onClick={handler} />
        );
        fireEvent.click(container.querySelector('a')!);
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const { container } = render(<EuiButtonEmpty onClick={handler} />);
        fireEvent.click(container.querySelector('button')!);
        expect(handler).toHaveBeenCalledTimes(1);
      });
    });

    test('contentProps is rendered', () => {
      const { container } = render(
        <EuiButtonEmpty contentProps={requiredProps}>Content</EuiButtonEmpty>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('textProps is rendered', () => {
      const { container } = render(
        <EuiButtonEmpty textProps={requiredProps}>Content</EuiButtonEmpty>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('does not render the text wrapper when textProps is set to false', () => {
      const { container } = render(
        <EuiButtonEmpty textProps={false}>Content</EuiButtonEmpty>
      );

      expect(
        container.querySelector('.euiButtonEmpty__text')
      ).not.toBeInTheDocument();
    });
  });
});
