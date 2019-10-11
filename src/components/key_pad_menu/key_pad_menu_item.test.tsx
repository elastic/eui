import React from 'react';
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../test';

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
      const onClickHandler = jest.fn();

      shallow(
        <EuiKeyPadMenuItemButton label="Label" onClick={onClickHandler}>
          Icon
        </EuiKeyPadMenuItemButton>
      );

      expect(onClickHandler).not.toBeCalled();
    });

    test('is called when the button is clicked', () => {
      const onClickHandler = jest.fn();

      const $button = shallow(
        <EuiKeyPadMenuItemButton label="Label" onClick={onClickHandler}>
          Icon
        </EuiKeyPadMenuItemButton>
      );

      $button.simulate('click');

      expect(onClickHandler).toBeCalledTimes(1);
    });
  });
});
