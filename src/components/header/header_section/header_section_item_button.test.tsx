/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import {
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItemButtonRef,
} from './header_section_item_button';

describe('EuiHeaderSectionItemButton', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiHeaderSectionItemButton {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders children', () => {
    const { container } = render(
      <EuiHeaderSectionItemButton>
        <span>Ahoy!</span>
      </EuiHeaderSectionItemButton>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a link', () => {
    const { container } = render(<EuiHeaderSectionItemButton href="#" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('renders notification', () => {
    test('as a badge', () => {
      const { container } = render(
        <EuiHeaderSectionItemButton notification="1" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('as a dot', () => {
      const { container } = render(
        <EuiHeaderSectionItemButton notification={true} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('color', () => {
      const { container } = render(
        <EuiHeaderSectionItemButton
          notification="1"
          notificationColor="subdued"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('animation', () => {
    const animate = HTMLElement.prototype.animate;
    beforeAll(() => {
      HTMLElement.prototype.animate = jest.fn();
    });
    afterAll(() => {
      HTMLElement.prototype.animate = animate;
    });

    it('renders animation', () => {
      expect.assertions(2);

      mount(
        <EuiHeaderSectionItemButton ref={testAnimation} notification={true} />
      );

      function testAnimation(element: EuiHeaderSectionItemButtonRef) {
        if (element) {
          expect(element.animate).toHaveBeenCalledTimes(0);
          element.euiAnimate();
          expect(element.animate).toHaveBeenCalledTimes(1);
        }
      }
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

  describe('ref', () => {
    it('is the button element', () => {
      const ref = jest.fn();
      const component = mount(<EuiHeaderSectionItemButton ref={ref} />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref).toHaveBeenCalledWith(component.find('button').getDOMNode());
    });

    it('is the anchor element', () => {
      const ref = jest.fn();
      const component = mount(
        <EuiHeaderSectionItemButton href="#" ref={ref} />
      );

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref).toHaveBeenCalledWith(component.find('a').getDOMNode());
    });
  });
});
