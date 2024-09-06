/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, renderHook, renderHookAct } from '../../../test/rtl';
import { keys } from '../../../services';

import { useDataGridFullScreenSelector } from './fullscreen_selector';

describe('useDataGridFullScreenSelector', () => {
  describe('isFullScreen state', () => {
    test('setFullScreen toggles isFullScreen', () => {
      const { result } = renderHook(() => useDataGridFullScreenSelector());

      expect(result.current.isFullScreen).toEqual(false);
      renderHookAct(() => result.current.setIsFullScreen(true));
      expect(result.current.isFullScreen).toEqual(true);
    });
  });

  describe('fullScreenSelector', () => {
    it('renders a button that toggles entering and exiting fullscreen', () => {
      const { result } = renderHook(() => useDataGridFullScreenSelector());
      const { container, getByTestSubject, rerender } = render(
        <>{result.current.fullScreenSelector}</>
      );
      expect(
        container.querySelector('[data-euiicon-type="fullScreen"]')
      ).toBeInTheDocument();

      renderHookAct(() => {
        fireEvent.click(getByTestSubject('dataGridFullScreenButton'));
      });
      expect(result.current.isFullScreen).toEqual(true);
      rerender(<>{result.current.fullScreenSelector}</>);

      expect(
        container.querySelector('[data-euiicon-type="fullScreenExit"]')
      ).toBeInTheDocument();
    });
  });

  describe('handleGridKeyDown', () => {
    const preventDefault = jest.fn();
    const keyDownEvent = {
      preventDefault,
    } as unknown as React.KeyboardEvent<HTMLDivElement>;

    beforeEach(() => preventDefault.mockReset());

    it('exits fullscreen mode when the Escape key is pressed', () => {
      const { result } = renderHook(() => useDataGridFullScreenSelector());
      renderHookAct(() => result.current.setIsFullScreen(true));

      renderHookAct(() =>
        result.current.handleGridKeyDown({ ...keyDownEvent, key: keys.ESCAPE })
      );

      expect(preventDefault).toHaveBeenCalled();
      expect(result.current.isFullScreen).toEqual(false);
    });

    it('does nothing if fullscreen is not open', () => {
      const { result } = renderHook(() => useDataGridFullScreenSelector());

      renderHookAct(() =>
        result.current.handleGridKeyDown({ ...keyDownEvent, key: keys.ESCAPE })
      );

      expect(preventDefault).not.toHaveBeenCalled();
      expect(result.current.isFullScreen).toEqual(false);
    });

    it('does nothing if other keys are pressed', () => {
      const { result } = renderHook(() => useDataGridFullScreenSelector());

      renderHookAct(() =>
        result.current.handleGridKeyDown({ ...keyDownEvent, key: keys.ENTER })
      );

      expect(preventDefault).not.toHaveBeenCalled();
      expect(result.current.isFullScreen).toEqual(false);
    });
  });

  describe('body classes', () => {
    it('adds and removes a fullscreen class to the document body when fullscreen opens/closes', () => {
      const { setIsFullScreen } = renderHook(() =>
        useDataGridFullScreenSelector()
      ).result.current;

      renderHookAct(() => setIsFullScreen(true));
      expect(
        document.body.classList.contains('euiDataGrid__restrictBody')
      ).toBe(true);

      renderHookAct(() => setIsFullScreen(false));
      expect(
        document.body.classList.contains('euiDataGrid__restrictBody')
      ).toBe(false);
    });
  });

  describe('fullScreenStyles', () => {
    it('returns an Emotion fullscreen className to apply to the EuiDataGrid', () => {
      const { fullScreenStyles } = renderHook(() =>
        useDataGridFullScreenSelector()
      ).result.current;

      expect(fullScreenStyles).toContain('euiDataGrid--fullScreen');
    });
  });
});
