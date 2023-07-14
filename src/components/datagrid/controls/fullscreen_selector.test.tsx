/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from '@testing-library/react';
import { shallow } from 'enzyme';
import { keys } from '../../../services';
import { testCustomHook } from '../../../test/internal';
import { useDataGridFullScreenSelector } from './fullscreen_selector';

describe('useDataGridFullScreenSelector', () => {
  type ReturnedValues = ReturnType<typeof useDataGridFullScreenSelector>;

  describe('isFullScreen state', () => {
    test('setFullScreen toggles isFullScreen', () => {
      const {
        return: { isFullScreen, setIsFullScreen },
        getUpdatedState,
      } = testCustomHook(() => useDataGridFullScreenSelector());

      expect(isFullScreen).toEqual(false);
      act(() => setIsFullScreen(true));
      expect(getUpdatedState().isFullScreen).toEqual(true);
    });
  });

  describe('fullScreenSelector', () => {
    it('renders a button that toggles entering fullscreen', () => {
      const {
        return: { fullScreenSelector },
      } = testCustomHook(() => useDataGridFullScreenSelector());
      const component = shallow(<div>{fullScreenSelector}</div>);

      expect(component).toMatchInlineSnapshot(`
        <div>
          <EuiToolTip
            content="Enter fullscreen"
            delay="long"
            display="inlineBlock"
            position="top"
          >
            <EuiButtonIcon
              aria-label="Enter fullscreen"
              className="euiDataGrid__controlBtn"
              color="text"
              data-test-subj="dataGridFullScreenButton"
              iconType="fullScreen"
              onClick={[Function]}
              size="xs"
            />
          </EuiToolTip>
        </div>
      `);
    });

    it('renders a button that toggles exiting fullscreen', () => {
      const {
        return: { setIsFullScreen },
        getUpdatedState,
      } = testCustomHook<ReturnedValues>(() => useDataGridFullScreenSelector());
      act(() => setIsFullScreen(true));

      const { fullScreenSelector } = getUpdatedState();
      const component = shallow(<div>{fullScreenSelector}</div>);

      expect(component).toMatchInlineSnapshot(`
        <div>
          <EuiToolTip
            content={
              <React.Fragment>
                Exit fullscreen
                 (
                <kbd>
                  esc
                </kbd>
                )
              </React.Fragment>
            }
            delay="long"
            display="inlineBlock"
            position="top"
          >
            <EuiButtonIcon
              aria-label="Exit fullscreen"
              className="euiDataGrid__controlBtn euiDataGrid__controlBtn--active"
              color="text"
              data-test-subj="dataGridFullScreenButton"
              iconType="fullScreenExit"
              onClick={[Function]}
              size="xs"
            />
          </EuiToolTip>
        </div>
      `);
    });

    it('toggles fullscreen mode on button click', () => {
      const {
        return: { fullScreenSelector, isFullScreen },
        getUpdatedState,
      } = testCustomHook(() => useDataGridFullScreenSelector());
      expect(isFullScreen).toEqual(false);
      const component = shallow(<div>{fullScreenSelector}</div>);

      act(() => {
        component
          .find('[data-test-subj="dataGridFullScreenButton"]')
          .simulate('click');
      });
      expect(getUpdatedState().isFullScreen).toEqual(true);
    });
  });

  describe('handleGridKeyDown', () => {
    it('exits fullscreen mode when the Escape key is pressed', () => {
      const {
        return: { setIsFullScreen },
        getUpdatedState,
      } = testCustomHook<ReturnedValues>(() => useDataGridFullScreenSelector());
      act(() => setIsFullScreen(true));
      const { handleGridKeyDown } = getUpdatedState();

      const preventDefault = jest.fn();
      act(() => handleGridKeyDown({ key: keys.ESCAPE, preventDefault } as any));

      expect(preventDefault).toHaveBeenCalled();
      expect(getUpdatedState().isFullScreen).toEqual(false);
    });

    it('does nothing if fullscreen is not open', () => {
      const {
        return: { handleGridKeyDown },
        getUpdatedState,
      } = testCustomHook<ReturnedValues>(() => useDataGridFullScreenSelector());

      const preventDefault = jest.fn();
      act(() => handleGridKeyDown({ key: keys.ESCAPE, preventDefault } as any));

      expect(preventDefault).not.toHaveBeenCalled();
      expect(getUpdatedState().isFullScreen).toEqual(false);
    });

    it('does nothing if other keys are pressed or fullscreen is not open', () => {
      const {
        return: { handleGridKeyDown },
        getUpdatedState,
      } = testCustomHook<ReturnedValues>(() => useDataGridFullScreenSelector());

      const preventDefault = jest.fn();
      act(() => handleGridKeyDown({ key: keys.ENTER, preventDefault } as any));

      expect(preventDefault).not.toHaveBeenCalled();
      expect(getUpdatedState().isFullScreen).toEqual(false);
    });
  });

  describe('body classes', () => {
    it('adds and removes a fullscreen class to the document body when fullscreen opens/closes', () => {
      const {
        return: { setIsFullScreen },
      } = testCustomHook(() => useDataGridFullScreenSelector());
      act(() => setIsFullScreen(true));
      expect(
        document.body.classList.contains('euiDataGrid__restrictBody')
      ).toBe(true);

      act(() => setIsFullScreen(false));
      expect(
        document.body.classList.contains('euiDataGrid__restrictBody')
      ).toBe(false);
    });
  });
});
