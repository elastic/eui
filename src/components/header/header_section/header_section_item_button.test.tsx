/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';

import {
  EuiHeaderSectionItemButton,
  EuiHeaderSectionItemButtonRef,
} from './header_section_item_button';

describe('EuiHeaderSectionItemButton', () => {
  shouldRenderCustomStyles(<EuiHeaderSectionItemButton />);

  it('renders', () => {
    const { container } = render(
      <EuiHeaderSectionItemButton {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders children', () => {
    const { container } = render(
      <EuiHeaderSectionItemButton>
        <span>Ahoy!</span>
      </EuiHeaderSectionItemButton>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a link', () => {
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
      const testAnimation = (element: EuiHeaderSectionItemButtonRef) => {
        if (element) {
          expect(element.animate).toHaveBeenCalledTimes(0);
          element.euiAnimate();
          expect(element.animate).toHaveBeenCalledTimes(1);
        }
      };

      render(
        <EuiHeaderSectionItemButton ref={testAnimation} notification={true} />
      );

      expect.assertions(2);
    });
  });

  describe('onClick', () => {
    it("isn't called upon instantiation", () => {
      const onClickHandler = jest.fn();

      render(<EuiHeaderSectionItemButton onClick={onClickHandler} />);

      expect(onClickHandler).not.toHaveBeenCalled();
    });

    it('is called when the button is clicked', () => {
      const onClickHandler = jest.fn();

      const { getByTestSubject } = render(
        <EuiHeaderSectionItemButton
          onClick={onClickHandler}
          data-test-subj="button"
        />
      );

      fireEvent.click(getByTestSubject('button'));

      expect(onClickHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('ref', () => {
    it('is the button element', () => {
      const ref = jest.fn();
      const { container } = render(<EuiHeaderSectionItemButton ref={ref} />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref).toHaveBeenCalledWith(container.querySelector('button'));
    });

    it('is the anchor element', () => {
      const ref = jest.fn();
      const { container } = render(
        <EuiHeaderSectionItemButton href="#" ref={ref} />
      );

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref).toHaveBeenCalledWith(container.querySelector('a'));
    });
  });
});
