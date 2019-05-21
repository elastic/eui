import React from 'react';
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import sinon from 'sinon';

import { EuiTab } from './tab';

describe('EuiTab', () => {
  test('renders', () => {
    const component = (
      <EuiTab onClick={() => {}} {...requiredProps}>
        children
      </EuiTab>
    );
    expect(render(component)).toMatchSnapshot();
  });

  test('renders isSelected', () => {
    const component = (
      <EuiTab onClick={() => {}} isSelected {...requiredProps}>
        children
      </EuiTab>
    );
    expect(render(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('onClick', () => {
      test('is called when the button is clicked', () => {
        const onClickHandler = sinon.stub();

        const $button = shallow(<EuiTab onClick={onClickHandler} />);

        $button.simulate('click');

        sinon.assert.calledOnce(onClickHandler);
      });
    });
  });
});
