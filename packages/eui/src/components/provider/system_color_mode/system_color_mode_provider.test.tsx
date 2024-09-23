/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, act } from '@testing-library/react';

import { EuiSystemColorModeProvider } from './system_color_mode_provider';

describe('EuiSystemColorModeProvider', () => {
  // @see https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  const mockAddEventListener = jest.fn();
  const mockRemoveEventListener = jest.fn();
  const mockMatchMedia = (matches = false) => {
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

  beforeEach(() => {
    mockMatchMedia();
    jest.clearAllMocks();
  });

  it('falls back to light mode if no dark mode media query has been set', () => {
    const { container } = render(
      <EuiSystemColorModeProvider>
        {(systemColorMode) => <>{systemColorMode}</>}
      </EuiSystemColorModeProvider>
    );

    expect(container.textContent).toEqual('LIGHT');
  });

  it('detects dark mode system settings', () => {
    mockMatchMedia(true);
    const { container } = render(
      <EuiSystemColorModeProvider>
        {(systemColorMode) => <>{systemColorMode}</>}
      </EuiSystemColorModeProvider>
    );

    expect(container.textContent).toEqual('DARK');
  });

  describe('event listener', () => {
    it('initializes an event listener that listens for system light/dark mode changes', () => {
      const { container } = render(
        <EuiSystemColorModeProvider>
          {(systemColorMode) => <>{systemColorMode}</>}
        </EuiSystemColorModeProvider>
      );
      expect(container.textContent).toEqual('LIGHT');

      expect(mockAddEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
      act(() => {
        mockAddEventListener.mock.calls[0][1]({ matches: true });
      });

      expect(container.textContent).toEqual('DARK');
    });

    it('removes the event listener on unmount', () => {
      const { unmount } = render(
        <EuiSystemColorModeProvider>
          {(systemColorMode) => <>{systemColorMode}</>}
        </EuiSystemColorModeProvider>
      );
      unmount();
      expect(mockRemoveEventListener).toHaveBeenCalledTimes(1);
    });
  });
});
