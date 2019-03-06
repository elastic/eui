import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiExpression, COLORS } from './expression';

describe('EuiExpression', () => {
  test('renders', () => {
    const component = (
      <EuiExpression
        description="the answer is"
        value="42"
        isActive={false}
        // tslint:disable no-empty
        onClick={() => {}}
        {...requiredProps}
      />
    );

    expect(render(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiExpression
              description="the answer is"
              value="42"
              color={color}
              {...requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('uppercase', () => {
      test('true renders uppercase', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            uppercase={true}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });

      test('false renders inherted case', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            uppercase={false}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('isActive', () => {
      test('true renders active', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={true}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });

      test('false renders inactive', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={false}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('is called when the button is clicked', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={false}
            onClick={handler}
            {...requiredProps}
          />
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
