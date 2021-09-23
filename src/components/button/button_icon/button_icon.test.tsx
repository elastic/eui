/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiButtonIcon, COLORS, DISPLAYS, SIZES } from './button_icon';

describe('EuiButtonIcon', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonIcon iconType="user" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonIcon iconType="user" aria-label="button" isDisabled />
        );

        expect(component).toMatchSnapshot();
      });

      it('or disabled is rendered', () => {
        const component = render(
          <EuiButtonIcon iconType="user" aria-label="button" disabled />
        );

        expect(component).toMatchSnapshot();
      });

      it('renders a button even when href is defined', () => {
        const component = render(
          <EuiButtonIcon
            iconType="user"
            aria-label="button"
            href="#"
            isDisabled
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonIcon aria-label="button" iconType="user" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiButtonIcon iconType="user" aria-label="button" color={color} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('display', () => {
      DISPLAYS.forEach((display) => {
        test(`${display} is rendered`, () => {
          const component = render(
            <EuiButtonIcon
              iconType="user"
              aria-label="button"
              display={display}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiButtonIcon iconType="user" aria-label="button" size={size} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('isSelected', () => {
      it('is rendered as true', () => {
        const component = render(
          <EuiButtonIcon iconType="user" aria-label="button" isSelected />
        );

        expect(component).toMatchSnapshot();
      });

      it('is rendered as false', () => {
        const component = render(
          <EuiButtonIcon
            iconType="user"
            aria-label="button"
            isSelected={false}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const component = render(
          <EuiButtonIcon
            iconType="user"
            aria-label="button"
            href="#"
            target="_blank"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiButtonIcon
            iconType="user"
            aria-label="hoi"
            href="#"
            onClick={handler}
          />
        );
        component.find('a').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiButtonIcon iconType="user" aria-label="hoi" onClick={handler} />
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
