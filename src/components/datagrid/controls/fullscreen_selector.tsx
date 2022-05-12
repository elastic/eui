/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
  KeyboardEvent,
  KeyboardEventHandler,
} from 'react';
import classNames from 'classnames';
import { keys } from '../../../services';
import { EuiToolTip } from '../../tool_tip';
import { EuiButtonIcon } from '../../button';
import { useEuiI18n } from '../../i18n';

const GRID_IS_FULLSCREEN_CLASSNAME = 'euiDataGrid__restrictBody';

export const useDataGridFullScreenSelector = (): {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
  fullScreenSelector: ReactNode;
  handleGridKeyDown: KeyboardEventHandler<HTMLDivElement>;
} => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [fullScreenButton, fullScreenButtonActive] = useEuiI18n(
    [
      'euiFullscreenSelector.fullscreenButton',
      'euiFullscreenSelector.fullscreenButtonActive',
    ],
    ['Enter fullscreen', 'Exit fullscreen']
  );
  const controlBtnClasses = classNames('euiDataGrid__controlBtn', {
    'euiDataGrid__controlBtn--active': isFullScreen,
  });
  const fullScreenSelector = useMemo(
    () => (
      <EuiToolTip
        content={
          isFullScreen ? (
            <>
              {fullScreenButtonActive} (<kbd>esc</kbd>)
            </>
          ) : (
            fullScreenButton
          )
        }
        delay="long"
      >
        <EuiButtonIcon
          size="xs"
          iconType={isFullScreen ? 'fullScreenExit' : 'fullScreen'}
          color="text"
          className={controlBtnClasses}
          data-test-subj="dataGridFullScreenButton"
          onClick={() => setIsFullScreen(!isFullScreen)}
          aria-label={isFullScreen ? fullScreenButtonActive : fullScreenButton}
        />
      </EuiToolTip>
    ),
    [isFullScreen, controlBtnClasses, fullScreenButton, fullScreenButtonActive]
  );

  const handleGridKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case keys.ESCAPE:
          if (isFullScreen) {
            event.preventDefault();
            setIsFullScreen(false);
          }
          break;
      }
    },
    [isFullScreen]
  );

  useEffect(() => {
    // When the data grid is fullscreen, we add a class to the body to remove the extra scrollbar and stay above any fixed headers
    if (isFullScreen) {
      document.body.classList.add(GRID_IS_FULLSCREEN_CLASSNAME);

      return () => {
        document.body.classList.remove(GRID_IS_FULLSCREEN_CLASSNAME);
      };
    }
  }, [isFullScreen]);

  return {
    isFullScreen,
    setIsFullScreen,
    fullScreenSelector,
    handleGridKeyDown,
  };
};
