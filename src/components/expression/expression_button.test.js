import React from 'react';
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import sinon from 'sinon';

import {
  EuiExpressionButton,
} from './expression_button';

describe('EuiExpressionButton', () => {
  test('renders', () => {
    const component = (
      <EuiExpressionButton
        description="the answer is"
        buttonValue="42"
        isActive={false}
        onClick={()=>{}}
        {...requiredProps}
      />
    );

    expect(render(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isActive', () => {
      test('true renders active', () => {
        const component = (
          <EuiExpressionButton
            description="the answer is"
            buttonValue="42"
            isActive={true}
            onClick={()=>{}}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });

      test('false renders inactive', () => {
        const component = (
          <EuiExpressionButton
            description="the answer is"
            buttonValue="42"
            isActive={false}
            onClick={()=>{}}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test('is called when the button is clicked', () => {
        const onClickHandler = sinon.spy();

        const button = shallow(
          <EuiExpressionButton
            description="the answer is"
            buttonValue="42"
            isActive={false}
            onClick={onClickHandler}
            {...requiredProps}
          />
        );

        button.simulate('click');

        sinon.assert.calledOnce(onClickHandler);
      });
    });
  });
});
