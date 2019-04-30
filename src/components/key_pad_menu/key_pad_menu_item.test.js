import React from 'react';
import { render, shallow } from 'enzyme';
import sinon from 'sinon';
import { requiredProps } from '../../test/required_props';

import {
  EuiKeyPadMenuItem,
  EuiKeyPadMenuItemButton,
} from './key_pad_menu_item';

describe('EuiKeyPadMenuItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiKeyPadMenuItem label="Label" {...requiredProps}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders href', () => {
    const component = render(
      <EuiKeyPadMenuItem label="Label" href="#">
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });
});

describe('EuiKeyPadMenuItemButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiKeyPadMenuItemButton label="Label" {...requiredProps}>
        Icon
      </EuiKeyPadMenuItemButton>
    );

    expect(component).toMatchSnapshot();
  });

  describe('onClick', () => {
    test("isn't called upon instantiation", () => {
      const onClickHandler = sinon.stub();

      shallow(
        <EuiKeyPadMenuItemButton label="Label" onClick={onClickHandler}>
          Icon
        </EuiKeyPadMenuItemButton>
      );

      sinon.assert.notCalled(onClickHandler);
    });

    test('is called when the button is clicked', () => {
      const onClickHandler = sinon.stub();

      const $button = shallow(
        <EuiKeyPadMenuItemButton label="Label" onClick={onClickHandler}>
          Icon
        </EuiKeyPadMenuItemButton>
      );

      $button.simulate('click');

      sinon.assert.calledOnce(onClickHandler);
    });
  });
});
