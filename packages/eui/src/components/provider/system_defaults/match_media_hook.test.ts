/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook, renderHookAct } from '../../../test/rtl';

import { useWindowMediaMatcher } from './match_media_hook';

describe('useWindowMediaMatcher', () => {
  const useMockMediaQuery = () => useWindowMediaMatcher('(min-width: 500px)');

  // @see https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  const mockAddEventListener = jest.fn();
  const mockRemoveEventListener = jest.fn();
  const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn((query) => ({
        matches,
        media: query,
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })),
    });
  };

  beforeEach(() => jest.clearAllMocks());

  describe('returns the `.matches` value of the window.matchMedia', () => {
    test('true', () => {
      mockMatchMedia(true);
      const { result } = renderHook(useMockMediaQuery);
      expect(result.current).toEqual(true);
    });

    test('false', () => {
      mockMatchMedia(false);
      const { result } = renderHook(useMockMediaQuery);
      expect(result.current).toEqual(false);
    });
  });

  describe('event listener', () => {
    it('initializes an event listener that listens for changes to the media query', () => {
      mockMatchMedia(false);

      const { result } = renderHook(useMockMediaQuery);
      expect(result.current).toEqual(false);

      expect(mockAddEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
      renderHookAct(() => {
        mockAddEventListener.mock.calls[0][1]({ matches: true });
      });

      expect(result.current).toEqual(true);
    });

    it('removes the event listener on unmount', () => {
      const { unmount } = renderHook(useMockMediaQuery);
      unmount();
      expect(mockRemoveEventListener).toHaveBeenCalledTimes(1);
    });
  });
});
