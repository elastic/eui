import React from 'react';
import { render, shallow } from 'enzyme';
import sinon from 'sinon';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderSectionItemButton } from './header_section_item_button';

describe('EuiHeaderSectionItemButton', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderSectionItemButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders children', () => {
    const component = render(
      <EuiHeaderSectionItemButton>
        <span>Ahoy!</span>
      </EuiHeaderSectionItemButton>
    );

    expect(component).toMatchSnapshot();
  });

  describe('onClick', () => {
    test(`isn't called upon instantiation`, () => {
      const onClickHandler = sinon.stub();

      shallow(<EuiHeaderSectionItemButton onClick={onClickHandler} />);

      sinon.assert.notCalled(onClickHandler);
    });

    test('is called when the button is clicked', () => {
      const onClickHandler = sinon.stub();

      const $button = shallow(
        <EuiHeaderSectionItemButton onClick={onClickHandler} />
      );

      $button.simulate('click');

      sinon.assert.calledOnce(onClickHandler);
    });
  });
});
