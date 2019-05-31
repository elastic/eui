import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';
import { requiredProps } from '../../test/required_props';

import { EuiStepHorizontal } from './step_horizontal';

describe('EuiStepHorizontal', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStepHorizontal
        {...requiredProps}
        step={1}
        title={'First step'}
        onClick={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('onClick', () => {
      test('is called when clicked', () => {
        const onClickHandler = sinon.stub();

        const component = mount(
          <EuiStepHorizontal step={1} onClick={onClickHandler} />
        );

        component.simulate('click');

        sinon.assert.calledOnce(onClickHandler);
      });

      test("isn't called when clicked if it's disabled", () => {
        const onClickHandler = sinon.stub();

        const component = mount(
          <EuiStepHorizontal disabled step={1} onClick={onClickHandler} />
        );

        component.simulate('click');

        sinon.assert.notCalled(onClickHandler);
      });
    });
  });
});
