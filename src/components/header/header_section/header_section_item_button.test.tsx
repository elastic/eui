import React from 'react';
import { render, shallow } from 'enzyme';
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

  describe('renders notification', () => {
    test('children', () => {
      const component = render(<EuiHeaderSectionItemButton notification="1" />);

      expect(component).toMatchSnapshot();
    });

    test('color', () => {
      const component = render(
        <EuiHeaderSectionItemButton
          notification="1"
          notificationColor="subdued"
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('onClick', () => {
    test("isn't called upon instantiation", () => {
      const onClickHandler = jest.fn();

      shallow(<EuiHeaderSectionItemButton onClick={onClickHandler} />);

      expect(onClickHandler).not.toHaveBeenCalled();
    });

    test('is called when the button is clicked', () => {
      const onClickHandler = jest.fn();

      const $button = shallow(
        <EuiHeaderSectionItemButton onClick={onClickHandler} />
      );

      $button.simulate('click');

      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
  });
});
