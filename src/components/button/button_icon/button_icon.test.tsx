import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiButtonIcon, COLORS } from './button_icon';

describe('EuiButtonIcon', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonIcon label="button" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<EuiButtonIcon label="button" isDisabled />);

        expect(component).toMatchSnapshot();
      });

      it('renders a button even when href is defined', () => {
        const component = render(
          <EuiButtonIcon label="button" href="#" isDisabled />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonIcon label="button" iconType="user" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiButtonIcon label="button" color={color} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('href', () => {
      it('secures the rel attribute when the target is _blank', () => {
        const component = render(
          <EuiButtonIcon label="button" href="#" target="_blank" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick and href', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiButtonIcon label="hoi" href="#" onClick={handler} />
        );
        component.find('a').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });

      it('supports onClick as a button', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiButtonIcon label="hoi" onClick={handler} />
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
