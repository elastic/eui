/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { type MutableRefObject, useRef } from 'react';
import { act } from '@testing-library/react';

import { render, renderHook, renderHookAct } from '../../test/rtl';

import { useIsPointerDown } from './useIsPointerDown';

// JSDOM doesn't support PointerEvent, so we need to polyfill it
class MockPointerEvent extends MouseEvent {
  constructor(type: string, params: PointerEventInit = {}) {
    super(type, params);
  }
}

// @ts-ignore - polyfill for JSDOM
global.PointerEvent = MockPointerEvent;

describe('useIsPointerDown', () => {
  describe('without container', () => {
    it('returns true when pointer is down and false when pointer is up', () => {
      const {
        result: { current: ref },
      } = renderHook(useIsPointerDown);

      expect(ref.current).toBe(false);

      renderHookAct(() => {
        document.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true })
        );
      });

      expect(ref.current).toBe(true);

      renderHookAct(() => {
        document.dispatchEvent(
          new PointerEvent('pointerup', { bubbles: true })
        );
      });
      expect(ref.current).toBe(false);
    });
  });

  describe('with container', () => {
    it('returns true when pointer is down inside the container', () => {
      let isPointerDownRef: MutableRefObject<boolean> = { current: false };

      const TestComponent = () => {
        const containerRef = useRef<HTMLDivElement | null>(null);
        isPointerDownRef = useIsPointerDown(containerRef);
        return (
          <div>
            <div data-test-subj="outside" />
            <div ref={containerRef} data-test-subj="container" />
          </div>
        );
      };

      const { getByTestSubject } = render(<TestComponent />);
      expect(isPointerDownRef.current).toBe(false);

      act(() => {
        const container = getByTestSubject('container');
        container.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true })
        );
      });
      expect(isPointerDownRef.current).toBe(true);

      act(() => {
        document.dispatchEvent(
          new PointerEvent('pointerup', { bubbles: true })
        );
      });
      expect(isPointerDownRef.current).toBe(false);
    });

    it('returns false when pointer is down outside the container', () => {
      let isPointerDownRef: MutableRefObject<boolean> = { current: false };

      const TestComponent = () => {
        const containerRef = useRef<HTMLDivElement | null>(null);
        isPointerDownRef = useIsPointerDown(containerRef);
        return (
          <div>
            <div data-test-subj="outside" />
            <div ref={containerRef} data-test-sub="container" />
          </div>
        );
      };

      const { getByTestSubject } = render(<TestComponent />);
      expect(isPointerDownRef.current).toBe(false);

      act(() => {
        const outside = getByTestSubject('outside');
        outside.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true })
        );
      });
      expect(isPointerDownRef.current).toBe(false);
    });
  });

  describe('pointercancel and visibilitychange events', () => {
    it('resets to false on pointercancel', () => {
      const {
        result: { current: ref },
      } = renderHook(useIsPointerDown);

      renderHookAct(() => {
        document.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true })
        );
      });
      expect(ref.current).toBe(true);

      renderHookAct(() => {
        document.dispatchEvent(
          new PointerEvent('pointercancel', { bubbles: true })
        );
      });
      expect(ref.current).toBe(false);
    });

    it('resets to false when document becomes hidden', () => {
      const {
        result: { current: ref },
      } = renderHook(useIsPointerDown);

      renderHookAct(() => {
        document.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true })
        );
      });
      expect(ref.current).toBe(true);

      renderHookAct(() => {
        Object.defineProperty(document, 'visibilityState', {
          value: 'hidden',
          configurable: true,
        });
        document.dispatchEvent(new Event('visibilitychange'));
      });
      expect(ref.current).toBe(false);

      // reset
      Object.defineProperty(document, 'visibilityState', {
        value: 'visible',
        configurable: true,
      });
    });
  });
});
