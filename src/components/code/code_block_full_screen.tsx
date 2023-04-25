/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  KeyboardEvent,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { keys, useEuiTheme } from '../../services';
import { useEuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { euiCodeBlockStyles } from './code_block.styles';

/**
 * Hook that returns fullscreen-related state/logic/utils
 */
export const useFullScreen = ({
  overflowHeight,
}: {
  overflowHeight?: number | string;
}) => {
  const showFullScreenButton = !!overflowHeight;

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((isFullScreen) => !isFullScreen);
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.key === keys.ESCAPE) {
      // We need to make sure annotation Escape keypresses don't also cause fullscreen mode to close
      const focus = document.activeElement as HTMLElement;
      const isAnnotationPopover =
        !!focus?.dataset.popoverOpen || !!focus?.closest('[data-popover-open]');

      if (!isAnnotationPopover) {
        event.preventDefault();
        event.stopPropagation();
        setIsFullScreen(false);
      }
    }
  }, []);

  const [fullscreenCollapse, fullscreenExpand] = useEuiI18n(
    [
      'euiCodeBlockFullScreen.fullscreenCollapse',
      'euiCodeBlockFullScreen.fullscreenExpand',
    ],
    ['Collapse', 'Expand']
  );

  const fullScreenButton = useMemo(() => {
    return showFullScreenButton ? (
      <EuiButtonIcon
        className="euiCodeBlock__fullScreenButton"
        onClick={toggleFullScreen}
        iconType={isFullScreen ? 'fullScreenExit' : 'fullScreen'}
        color="text"
        aria-label={isFullScreen ? fullscreenCollapse : fullscreenExpand}
      />
    ) : null;
  }, [
    showFullScreenButton,
    toggleFullScreen,
    isFullScreen,
    fullscreenCollapse,
    fullscreenExpand,
  ]);

  return {
    fullScreenButton,
    isFullScreen,
    onKeyDown,
  };
};

/**
 * Portalled full screen wrapper
 */
export const EuiCodeBlockFullScreenWrapper: FunctionComponent = ({
  children,
}) => {
  const euiThemeContext = useEuiTheme();

  const styles = euiCodeBlockStyles(euiThemeContext);
  const cssStyles = [
    styles.euiCodeBlock,
    styles.l, // Force fullscreen to use large font
    styles.isFullScreen,
  ];

  return (
    <EuiOverlayMask>
      <EuiFocusTrap scrollLock preventScrollOnFocus clickOutsideDisables={true}>
        <div className="euiCodeBlockFullScreen" css={cssStyles}>
          {children}
        </div>
      </EuiFocusTrap>
    </EuiOverlayMask>
  );
};
