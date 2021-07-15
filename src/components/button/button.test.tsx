/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiButton, COLORS, SIZES } from './button';
import { ICON_SIDES } from './button_content';

describe('EuiButton', () => {
  test('is rendered', () => {
    const component = render(<EuiButton {...requiredProps}>Content</EuiButton>);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('fill', () => {
      it('is rendered', () => {
        const component = render(<EuiButton fill />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<EuiButton isDisabled />);

        expect(component).toMatchSnapshot();
      });

      it('renders a button even when href is defined', () => {
        const component = render(<EuiButton href="#" isDisabled />);

        expect(component).toMatchSnapshot();
      });

      it('renders if passed as disabled', () => {
        const component = render(<EuiButton disabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      it('is rendered', () => {
        const component = render(<EuiButton isLoading />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered as true', () => {
        const component = render(<EuiButton isSelected />);

        expect(component).toMatchSnapshot();
      });

      it('is rendered as false', () => {
        const component = render(<EuiButton isSelected={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('fullWidth', () => {
      it('is rendered', () => {
        const component = render(<EuiButton fullWidth />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('minWidth', () => {
      it('is rendered', () => {
        const component = render(<EuiButton minWidth={0} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(<EuiButton iconType="user" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<EuiButton color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(<EuiButton size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('iconSide', () => {
      ICON_SIDES.forEach((iconSide) => {
        test(`${iconSide} is rendered`, () => {
          const component = render(
            <EuiButton iconType="user" iconSide={iconSide}>
              Content
            </EuiButton>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const component = render(<EuiButton href="#" target="_blank" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', () => {
        const handler = jest.fn();
        const component = mount(<EuiButton href="#" onClick={handler} />);
        component.find('a').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const component = mount(<EuiButton onClick={handler} />);
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });

    test('contentProps is rendered', () => {
      const component = render(
        <EuiButton contentProps={requiredProps}>Content</EuiButton>
      );

      expect(component).toMatchSnapshot();
    });

    test('textProps is rendered', () => {
      const component = render(
        <EuiButton textProps={requiredProps}>Content</EuiButton>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
