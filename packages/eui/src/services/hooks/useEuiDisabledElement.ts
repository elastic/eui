/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useRef } from 'react';

import { keys } from '../../services/keys';

export type EuiDisabledProps = {
  /**
   * Controls the disabled behavior via the native `disabled` attribute.
   */
  isDisabled?: boolean;
  /**
   * NOTE: Beta feature, may be changed or removed in the future
   *
   * Changes the native `disabled` attribute to `aria-disabled` to preserve focusability.
   * This results in a semantically disabled button without the default browser handling of the disabled state.
   *
   * Use e.g. when a disabled button should have a tooltip.
   */
  hasAriaDisabled?: boolean;
};

type DisabledElementKeyEventHandlers = {
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
};

export type DisabledElementEventHandlers = DisabledElementKeyEventHandlers & {
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseDown?: React.MouseEventHandler<HTMLElement>;
  onMouseUp?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onMouseOut?: React.MouseEventHandler<HTMLElement>;
  onMouseMove?: React.MouseEventHandler<HTMLElement>;
  onMouseOver?: React.MouseEventHandler<HTMLElement>;
  onPointerDown?: React.PointerEventHandler<HTMLElement>;
  onPointerUp?: React.PointerEventHandler<HTMLElement>;
  onPointerEnter?: React.PointerEventHandler<HTMLElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLElement>;
  onPointerMove?: React.PointerEventHandler<HTMLElement>;
  onPointerOver?: React.PointerEventHandler<HTMLElement>;
  onTouchStart?: React.TouchEventHandler<HTMLElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLElement>;
  onTouchMove?: React.TouchEventHandler<HTMLElement>;
  onSubmit?: React.FormEventHandler<HTMLElement>;
};

type DisabledElementProps<T extends HTMLElement> = {
  ref: React.Ref<T>;
  disabled?: boolean;
};

type AriaDisabledElementProps<T extends HTMLElement> =
  DisabledElementEventHandlers &
    DisabledElementProps<T> & {
      ref: React.Ref<T>;
      'aria-disabled'?: boolean;
    };

type EuiDisabledElementArgs = EuiDisabledProps &
  DisabledElementKeyEventHandlers;

const DISABLED_ELEMENT_EVENTS = {
  click: 'onClick',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mouseout: 'onMouseOut',
  mousemove: 'onMouseMove',
  mouseover: 'onMouseOver',
  pointerdown: 'onPointerDown',
  pointerup: 'onPointerUp',
  pointerenter: 'onPointerEnter',
  pointerleave: 'onPointerLeave',
  pointermove: 'onPointerMove',
  pointerover: 'onPointerOver',
  touchstart: 'onTouchStart',
  touchend: 'onTouchEnd',
  touchmove: 'onTouchMove',
  keydown: 'onKeyDown',
  keyup: 'onKeyUp',
  keypress: 'onKeyPress',
  submit: 'onSubmit',
} as const;

const ALLOWED_KEY_EVENTS = [keys.TAB, keys.ESCAPE] as string[];

const getReactEventHandlers = (): DisabledElementEventHandlers => {
  return Object.values(DISABLED_ELEMENT_EVENTS).reduce((acc, curr) => {
    acc[curr] = undefined;
    return acc;
  }, {} as DisabledElementEventHandlers);
};

const UNSET_REACT_EVENT_HANDLERS = getReactEventHandlers();

type ElementEventMethodState = {
  click?: () => void;
  dispatchEvent: (event: Event) => boolean;
};

const useCustomDisabledEvents = () => {
  const elementMethodsRef = useRef<ElementEventMethodState | null>(null);

  const isAllowedKeyEvent = (event: Event) =>
    event instanceof KeyboardEvent && ALLOWED_KEY_EVENTS.includes(event.key);

  const preventEvent = useCallback((event: Event) => {
    if (isAllowedKeyEvent(event)) {
      return;
    }

    event.stopImmediatePropagation();
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const preventElementEvents = useCallback(
    <T extends HTMLElement>(element: T) => {
      if (elementMethodsRef.current) return;

      const originalEvents: ElementEventMethodState = {
        click: 'click' in element ? element.click : undefined,
        dispatchEvent: element.dispatchEvent,
      };

      try {
        elementMethodsRef.current = originalEvents;

        // Add prevention listeners
        Object.keys(DISABLED_ELEMENT_EVENTS).forEach((eventType) => {
          element.addEventListener(eventType, preventEvent, {
            capture: true,
          });
        });

        if ('click' in element && typeof element.click === 'function') {
          element.click = () => {};
        }

        element.dispatchEvent = (event: Event) => {
          if (Object.keys(DISABLED_ELEMENT_EVENTS).includes(event.type)) {
            if (isAllowedKeyEvent(event)) {
              return originalEvents.dispatchEvent.call(element, event);
            }
            return false;
          }
          return originalEvents.dispatchEvent.call(element, event);
        };
      } catch (error) {
        elementMethodsRef.current = null;
      }
    },
    [preventEvent]
  );

  const resetElementEvents = useCallback(
    <T extends HTMLElement>(element: T) => {
      if (!elementMethodsRef.current) return;

      const { click, dispatchEvent } = elementMethodsRef.current;

      try {
        // remove prevention listeners
        Object.keys(DISABLED_ELEMENT_EVENTS).forEach((eventType) => {
          element.removeEventListener(eventType, preventEvent, {
            capture: true,
          });
        });

        // restore click method
        if (click && 'click' in element) {
          element.click = click;
        }

        // restore dispatchEvent
        element.dispatchEvent = dispatchEvent;
      } catch (error) {}

      elementMethodsRef.current = null;
    },
    [preventEvent]
  );

  return {
    preventElementEvents,
    resetElementEvents,
  };
};

/**
 * NOTE: Beta feature, may be changed or removed in the future
 *
 * Utility to apply either the native or a custom semantic disabled state.
 *
 * It applies `aria-disabled` instead of `disabled`  when `hasAriaDisabled=true`
 * to ensure the element is semantically disabled while still focusable.
 *
 * It mimics the native `disabled` behavior by removing any programmatic mouse, pointer, touch
 * or keyboard event handler but it differs to the native `disabled` behavior in that it preserves
 * the focus, blur and tabIndex behavior.
 */
export const useEuiDisabledElement = <T extends HTMLElement>({
  isDisabled = false,
  hasAriaDisabled = false,
  onKeyDown,
  onKeyUp,
  onKeyPress,
}: EuiDisabledElementArgs):
  | DisabledElementProps<T>
  | AriaDisabledElementProps<T> => {
  const elementRef = useRef<T | null>(null);
  const { preventElementEvents, resetElementEvents } =
    useCustomDisabledEvents();
  const shouldBeDisabled = hasAriaDisabled && isDisabled;

  const setRef = useCallback(
    (node: T | null) => {
      if (elementRef.current) {
        resetElementEvents(elementRef.current);
      }

      elementRef.current = node;

      if (node && shouldBeDisabled) {
        preventElementEvents(node);
      }
    },
    [shouldBeDisabled, preventElementEvents, resetElementEvents]
  );

  useEffect(() => {
    if (!elementRef.current) return;

    if (shouldBeDisabled) {
      preventElementEvents(elementRef.current);
    } else {
      resetElementEvents(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        resetElementEvents(elementRef.current);
      }
    };
  }, [shouldBeDisabled, preventElementEvents, resetElementEvents]);

  if (!hasAriaDisabled) {
    return {
      ref: setRef,
      disabled: isDisabled,
    };
  }

  const onKeyboardEvent = (
    e: React.KeyboardEvent<T>,
    callback?: (e: React.KeyboardEvent<T>) => void
  ) => {
    if (ALLOWED_KEY_EVENTS.includes(e.key)) {
      callback?.(e);
    }
  };

  const eventHandlers = shouldBeDisabled && {
    ...UNSET_REACT_EVENT_HANDLERS,
    onKeyDown: onKeyDown
      ? (e: React.KeyboardEvent<T>) => onKeyboardEvent(e, onKeyDown)
      : undefined,
    onKeyUp: onKeyUp
      ? (e: React.KeyboardEvent<T>) => onKeyboardEvent(e, onKeyUp)
      : undefined,
    onKeyPress: onKeyPress
      ? (e: React.KeyboardEvent<T>) => onKeyboardEvent(e, onKeyPress)
      : undefined,
  };

  return {
    ref: setRef,
    'aria-disabled': isDisabled ? true : undefined,
    disabled: isDisabled ? undefined : false,
    ...eventHandlers,
  };
};
