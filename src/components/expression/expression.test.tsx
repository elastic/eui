import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiExpression,
} from './expression';

describe('EuiExpression', () => {
  test('renders', () => {
    const component = (
      <EuiExpression
        description="the answer is"
        buttonValue="42"
        isActive={false}
         // tslint:disable no-empty
        onClick={() => {}}
        {...requiredProps}
      />
    );

    expect(render(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isActive', () => {
      test('true renders active', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            buttonValue="42"
            isActive={true}
            onClick={() => {}}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });

      test('false renders inactive', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            buttonValue="42"
            isActive={false}
            onClick={() => {}}
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
            buttonValue="42"
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
