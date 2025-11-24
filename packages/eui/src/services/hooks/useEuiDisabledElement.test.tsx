/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';

import { render, renderHook } from '../../test/rtl';
import { findTestSubject } from '../../test';
import { useEuiDisabledElement } from './useEuiDisabledElement';

describe('useEuiDisabledElement', () => {
  describe('hasAriaDisabled=false', () => {
    it('returns `disabled="true"` for `isDisabled=true`', () => {
      const { result } = renderHook(() =>
        useEuiDisabledElement<HTMLButtonElement>({
          isDisabled: true,
        })
      );

      render(<button {...result.current}>button label</button>);

      const { ref, ...props } = result.current;

      expect(props).toEqual({ disabled: true });
      expect(props).not.toEqual({ 'aria-disabled': true });
    });

    it('returns `disabled="false"` for `isDisabled=false`', () => {
      const { result } = renderHook(() =>
        useEuiDisabledElement<HTMLButtonElement>({
          isDisabled: false,
        })
      );

      render(<button {...result.current}>button label</button>);

      const { ref, ...props } = result.current;

      expect(props).toEqual({ disabled: false });
      expect(props).not.toEqual({ 'aria-disabled': undefined });
    });
  });

  describe('hasAriaDisabled=true', () => {
    it('returns `aria-disabled="true"`', () => {
      const { result } = renderHook(() =>
        useEuiDisabledElement<HTMLButtonElement>({
          isDisabled: true,
          hasAriaDisabled: true,
        })
      );

      render(
        <button {...result.current} data-test-subj="button">
          button label
        </button>
      );

      const { ref, ...props } = result.current;

      expect(props).toEqual({
        'aria-disabled': true,
        disabled: undefined,
        onClick: undefined,
        onMouseDown: undefined,
        onMouseUp: undefined,
        onMouseOver: undefined,
        onMouseOut: undefined,
        onMouseEnter: undefined,
        onMouseLeave: undefined,
        onKeyDown: undefined,
        onKeyUp: undefined,
        onKeyPress: undefined,
        onTouchStart: undefined,
        onTouchEnd: undefined,
        onTouchMove: undefined,
        onPointerDown: undefined,
        onPointerUp: undefined,
        onPointerMove: undefined,
        onPointerEnter: undefined,
        onPointerLeave: undefined,
        onPointerOver: undefined,
      });

      expect(props).not.toEqual({ disabled: true });
    });

    it('returns `aria-disabled=undefined`', () => {
      const { result } = renderHook(() =>
        useEuiDisabledElement<HTMLButtonElement>({
          isDisabled: false,
          hasAriaDisabled: true,
        })
      );

      render(
        <button {...result.current} data-test-subj="button">
          button label
        </button>
      );

      const { ref, ...props } = result.current;

      expect(props).toEqual({
        disabled: false,
        'aria-disabled': undefined,
      });
    });

    it('returns `aria-disabled="true"` for custom elements', () => {
      const { result } = renderHook(() =>
        useEuiDisabledElement<HTMLDivElement>({
          isDisabled: true,
          hasAriaDisabled: true,
        })
      );

      render(
        <div {...result.current} data-test-subj="button">
          button label
        </div>
      );

      const { ref, ...props } = result.current;

      expect(props).toEqual(
        // checks only the disabled attributes not specifically the event handlers again
        expect.objectContaining({
          'aria-disabled': true,
          disabled: undefined,
        })
      );
    });
  });

  describe('DOM event listeners', () => {
    const clickHandler = jest.fn();

    const mouseDownHandler = jest.fn();
    const mouseUpHandler = jest.fn();
    const mouseMoveHandler = jest.fn();
    const mouseOverHandler = jest.fn();
    const mouseOutHandler = jest.fn();
    const mouseEnterHandler = jest.fn();
    const mouseLeaveHandler = jest.fn();

    const pointerDownHandler = jest.fn();
    const pointerUpHandler = jest.fn();
    const pointerMoveHandler = jest.fn();
    const pointerEnterHandler = jest.fn();
    const pointerLeaveHandler = jest.fn();
    const pointerOverHandler = jest.fn();

    const touchStartHandler = jest.fn();
    const touchEndHandler = jest.fn();
    const touchMoveHandler = jest.fn();

    const focusHandler = jest.fn();
    const blurHandler = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('does not trigger mouse, pointer or touch events', () => {
      const { result } = renderHook(
        ({ isDisabled, hasAriaDisabled }) =>
          useEuiDisabledElement<HTMLButtonElement>({
            isDisabled,
            hasAriaDisabled,
          }),
        {
          initialProps: { isDisabled: true, hasAriaDisabled: true },
        }
      );

      const { getByTestSubject } = render(
        <button {...result.current} data-test-subj="button">
          button label
        </button>
      );

      const button = getByTestSubject('button');

      button.addEventListener('click', clickHandler);

      button.addEventListener('mousedown', mouseDownHandler);
      button.addEventListener('mouseup', mouseUpHandler);
      button.addEventListener('mousemove', mouseMoveHandler);
      button.addEventListener('mouseover', mouseOverHandler);
      button.addEventListener('mouseout', mouseOutHandler);
      button.addEventListener('mouseenter', mouseEnterHandler);
      button.addEventListener('mouseleave', mouseLeaveHandler);

      button.addEventListener('pointerdown', pointerDownHandler);
      button.addEventListener('pointerup', pointerUpHandler);
      button.addEventListener('pointermove', pointerMoveHandler);
      button.addEventListener('pointerenter', pointerEnterHandler);
      button.addEventListener('pointerleave', pointerLeaveHandler);
      button.addEventListener('pointerover', pointerOverHandler);

      button.addEventListener('touchstart', touchStartHandler);
      button.addEventListener('touchend', touchEndHandler);
      button.addEventListener('touchmove', touchMoveHandler);

      fireEvent.click(button);
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
      fireEvent.mouseMove(button);
      fireEvent.mouseOver(button);
      fireEvent.mouseOut(button);
      fireEvent.mouseEnter(button);
      fireEvent.mouseLeave(button);
      fireEvent.pointerDown(button);
      fireEvent.pointerUp(button);
      fireEvent.pointerMove(button);
      fireEvent.pointerEnter(button);
      fireEvent.pointerLeave(button);
      fireEvent.pointerOver(button);
      fireEvent.touchStart(button);
      fireEvent.touchEnd(button);
      fireEvent.touchMove(button);

      expect(clickHandler).not.toHaveBeenCalled();
      expect(mouseDownHandler).not.toHaveBeenCalled();
      expect(mouseUpHandler).not.toHaveBeenCalled();
      expect(mouseMoveHandler).not.toHaveBeenCalled();
      expect(mouseOverHandler).not.toHaveBeenCalled();
      expect(mouseOutHandler).not.toHaveBeenCalled();
      expect(mouseEnterHandler).not.toHaveBeenCalled();
      expect(mouseLeaveHandler).not.toHaveBeenCalled();
      expect(pointerDownHandler).not.toHaveBeenCalled();
      expect(pointerUpHandler).not.toHaveBeenCalled();
      expect(pointerMoveHandler).not.toHaveBeenCalled();
      expect(pointerEnterHandler).not.toHaveBeenCalled();
      expect(pointerLeaveHandler).not.toHaveBeenCalled();
      expect(pointerOverHandler).not.toHaveBeenCalled();
      expect(touchStartHandler).not.toHaveBeenCalled();
      expect(touchEndHandler).not.toHaveBeenCalled();
      expect(touchMoveHandler).not.toHaveBeenCalled();
    });

    it('correctly resets events when updating to `isDisabled=false`', () => {
      const { result, rerender } = renderHook(
        ({ isDisabled, hasAriaDisabled }) =>
          useEuiDisabledElement<HTMLButtonElement>({
            isDisabled,
            hasAriaDisabled,
          }),
        {
          initialProps: { isDisabled: true, hasAriaDisabled: true },
        }
      );

      const { getByTestSubject } = render(
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <button {...result.current} data-test-subj="button">
          button label
        </button>
      );

      const button = getByTestSubject('button');

      button.addEventListener('click', clickHandler);
      button.addEventListener('mousedown', mouseDownHandler);

      fireEvent.click(button);
      fireEvent.mouseDown(button);

      expect(clickHandler).not.toHaveBeenCalled();
      expect(mouseDownHandler).not.toHaveBeenCalled();

      rerender({ isDisabled: false, hasAriaDisabled: true });

      fireEvent.click(button);
      fireEvent.mouseDown(button);

      expect(clickHandler).toHaveBeenCalledTimes(1);
      expect(mouseDownHandler).toHaveBeenCalledTimes(1);
    });

    it('allows focus and blur events', () => {
      const { result } = renderHook(
        ({ isDisabled, hasAriaDisabled }) =>
          useEuiDisabledElement<HTMLButtonElement>({
            isDisabled,
            hasAriaDisabled,
          }),
        {
          initialProps: { isDisabled: true, hasAriaDisabled: true },
        }
      );

      const { getByTestSubject } = render(
        <button {...result.current} data-test-subj="button">
          button label
        </button>
      );

      const button = getByTestSubject('button');

      button.addEventListener('focus', focusHandler);
      button.addEventListener('blur', blurHandler);

      expect(document.activeElement).not.toBe(button);

      button.focus();
      expect(document.activeElement).toBe(button);
      expect(focusHandler).toHaveBeenCalledTimes(1);

      button.blur();
      expect(document.activeElement).not.toBe(button);
      expect(blurHandler).toHaveBeenCalledTimes(1);
    });

    describe('key events', () => {
      it('does not trigger disallowed key events', () => {
        const keyDownHandler = jest.fn();
        const keyUpHandler = jest.fn();
        const keyPressHandler = jest.fn();

        const { result } = renderHook(
          ({ isDisabled, hasAriaDisabled }) =>
            useEuiDisabledElement<HTMLButtonElement>({
              isDisabled,
              hasAriaDisabled,
            }),
          {
            initialProps: { isDisabled: true, hasAriaDisabled: true },
          }
        );

        const { getByTestSubject } = render(
          <button {...result.current} data-test-subj="button">
            button label
          </button>
        );

        const button = getByTestSubject('button');

        button.addEventListener('keydown', keyDownHandler);
        button.addEventListener('keyup', keyUpHandler);
        button.addEventListener('keypress', keyPressHandler);

        fireEvent.keyDown(button, { key: 'Space' });
        fireEvent.keyUp(button, { key: 'A' });
        fireEvent.keyPress(button, { key: 'B' });

        expect(keyDownHandler).not.toHaveBeenCalled();
        expect(keyUpHandler).not.toHaveBeenCalled();
        expect(keyPressHandler).not.toHaveBeenCalled();
      });

      it('triggers allowed key events correctly when the event listener is added after updating to `isDisabled=true`', () => {
        const keyDownHandler = jest.fn();

        const { result, rerender } = renderHook(
          ({ isDisabled, hasAriaDisabled }) =>
            useEuiDisabledElement<HTMLButtonElement>({
              isDisabled,
              hasAriaDisabled,
            }),
          {
            initialProps: { isDisabled: true, hasAriaDisabled: true },
          }
        );

        const { getByTestSubject } = render(
          <button {...result.current} data-test-subj="button">
            button label
          </button>
        );

        const button = getByTestSubject('button');
        button.addEventListener('keydown', keyDownHandler);

        fireEvent.keyDown(button, { key: 'Tab' });
        fireEvent.keyDown(button, { key: 'Escape' });
        fireEvent.keyDown(button, { key: 'Enter' }); // excluded
        expect(keyDownHandler).toHaveBeenCalledTimes(2);

        rerender({ isDisabled: false, hasAriaDisabled: true });

        fireEvent.keyDown(button, { key: 'Tab' });
        fireEvent.keyDown(button, { key: 'Escape' });
        fireEvent.keyDown(button, { key: 'Enter' });
        expect(keyDownHandler).toHaveBeenCalledTimes(5);
      });

      it('triggers allowed key events correctly when the event listener is added before updating to `isDisabled=true`', () => {
        const keyDownHandler = jest.fn();

        const { result, rerender } = renderHook(
          ({ isDisabled, hasAriaDisabled }) =>
            useEuiDisabledElement<HTMLButtonElement>({
              isDisabled,
              hasAriaDisabled,
            }),
          {
            initialProps: { isDisabled: false, hasAriaDisabled: true },
          }
        );

        const { getByTestSubject } = render(
          <button {...result.current} data-test-subj="button">
            button label
          </button>
        );

        const button = getByTestSubject('button');
        button.addEventListener('keydown', keyDownHandler);

        // rerender to disabled state
        rerender({ isDisabled: true, hasAriaDisabled: true });

        fireEvent.keyDown(button, { key: 'Tab' });
        fireEvent.keyDown(button, { key: 'Escape' });
        fireEvent.keyDown(button, { key: 'Enter' }); // excluded
        expect(keyDownHandler).toHaveBeenCalledTimes(2);

        rerender({ isDisabled: false, hasAriaDisabled: true });

        fireEvent.keyDown(button, { key: 'Tab' });
        fireEvent.keyDown(button, { key: 'Escape' });
        fireEvent.keyDown(button, { key: 'Enter' });
        expect(keyDownHandler).toHaveBeenCalledTimes(5);
      });
    });
  });

  describe('Enzyme (legacy)', () => {
    const Component = ({ isDisabled = false, hasAriaDisabled = false }) => {
      const disabledProps = useEuiDisabledElement<HTMLButtonElement>({
        isDisabled,
        hasAriaDisabled,
      });

      return (
        <button {...disabledProps} data-test-subj="button">
          button label
        </button>
      );
    };

    it('renders enabled buttons', () => {
      const component = mount(<Component />);

      const button = findTestSubject(component, 'button');

      expect(button.props()).not.toHaveEuiDisabledProp();
    });

    it('renders `disabled` buttons', () => {
      const component = mount(<Component isDisabled />);

      const button = findTestSubject(component, 'button');

      expect(button.props()).toHaveEuiDisabledProp();
      expect(button.props()).toEqual(
        expect.objectContaining({
          disabled: true,
        })
      );
    });

    it('renders `aria-disabled` buttons', () => {
      const component = mount(<Component isDisabled hasAriaDisabled />);

      const button = findTestSubject(component, 'button');

      expect(button.props()).toHaveEuiDisabledProp();
      expect(button.props()).toEqual(
        expect.objectContaining({
          'aria-disabled': true,
          disabled: undefined,
        })
      );
    });
  });
});
