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

import { EuiButtonIcon, DISPLAYS, SIZES } from './button_icon';
import { BUTTON_COLORS } from '../../../global_styling/mixins';

describe('EuiButtonIcon', () => {
  shouldRenderCustomStyles(
    <EuiButtonIcon iconType="user" {...requiredProps} />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiButtonIcon iconType="user" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiButtonIcon iconType="user" aria-label="button" isDisabled />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('or disabled is rendered', () => {
        const { container } = render(
          <EuiButtonIcon iconType="user" aria-label="button" disabled />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('renders a button even when href is defined', () => {
        const { container } = render(
          <EuiButtonIcon
            iconType="user"
            aria-label="button"
            href="#"
            isDisabled
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiButtonIcon aria-label="button" iconType="user" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      BUTTON_COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiButtonIcon iconType="user" aria-label="button" color={color} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('display', () => {
      DISPLAYS.forEach((display) => {
        test(`${display} is rendered`, () => {
          const { container } = render(
            <EuiButtonIcon
              iconType="user"
              aria-label="button"
              display={display}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <EuiButtonIcon iconType="user" aria-label="button" size={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('isSelected', () => {
      it('is rendered as true', () => {
        const { container } = render(
          <EuiButtonIcon iconType="user" aria-label="button" isSelected />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('is rendered as false', () => {
        const { container } = render(
          <EuiButtonIcon
            iconType="user"
            aria-label="button"
            isSelected={false}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const { container } = render(
          <EuiButtonIcon
            iconType="user"
            aria-label="button"
            href="#"
            target="_blank"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', () => {
        const onClick = jest.fn();
        const { container } = render(
          <EuiButtonIcon
            iconType="user"
            aria-label="hoi"
            href="#"
            onClick={onClick}
          />
        );
        fireEvent.click(container.querySelector('a')!);
        expect(onClick).toHaveBeenCalledTimes(1);
      });

      it('supports onClick as a button', () => {
        const onClick = jest.fn();
        const { container } = render(
          <EuiButtonIcon iconType="user" aria-label="hoi" onClick={onClick} />
        );
        fireEvent.click(container.querySelector('button')!);
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiButtonIcon aria-label="button" iconType="user" isLoading />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
