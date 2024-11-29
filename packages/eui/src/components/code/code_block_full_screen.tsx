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
  PropsWithChildren,
  useRef,
} from 'react';
import { keys, useEuiMemoizedStyles } from '../../services';
import { useEuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { euiCodeBlockStyles } from './code_block.styles';
import { EuiDelayRender } from '../delay_render';

/**
 * Hook that returns fullscreen-related state/logic/utils
 */
export const useFullScreen = ({
  overflowHeight,
}: {
  overflowHeight?: number | string;
}) => {
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const showFullScreenButton = !!overflowHeight;

  const [isFullScreen, setIsFullScreen] = useState(false);

  const returnFocus = () => {
    // uses timeout to ensure focus is placed after potential other updates happen
    setTimeout(() => {
      toggleButtonRef.current?.focus();
    });
  };

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((isFullScreen) => !isFullScreen);

    if (isFullScreen) {
      returnFocus();
    }
  }, [isFullScreen]);

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

        returnFocus();
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
    const button = (
      <EuiButtonIcon
        buttonRef={toggleButtonRef}
        className="euiCodeBlock__fullScreenButton"
        onClick={toggleFullScreen}
        iconType={isFullScreen ? 'fullScreenExit' : 'fullScreen'}
        color="text"
        aria-label={isFullScreen ? fullscreenCollapse : fullscreenExpand}
      />
    );

    return showFullScreenButton ? (
      isFullScreen ? (
        // use delay to prevent label being updated in non-fullscreen state before fullscreen is opened
        // otherwise this causes screen readers to read the collapse label before anything else (as the button was focused when opening)
        <EuiDelayRender delay={10}>{button}</EuiDelayRender>
      ) : (
        button
      )
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
export const EuiCodeBlockFullScreenWrapper: FunctionComponent<
  PropsWithChildren & {
    onClose: (event: React.KeyboardEvent<HTMLElement>) => void;
  }
> = ({ children, onClose }) => {
  const styles = useEuiMemoizedStyles(euiCodeBlockStyles);
  const cssStyles = [
    styles.euiCodeBlock,
    styles.l, // Force fullscreen to use large font
    styles.isFullScreen,
  ];

  const ariaLabel = useEuiI18n(
    'euiCodeBlockFullScreen.ariaLabel',
    'Expanded code block'
  );

  const dialogProps = {
    role: 'dialog',
    'aria-modal': true,
    'aria-label': ariaLabel,
    onKeyDown: onClose,
  };

  return (
    <EuiOverlayMask>
      <EuiFocusTrap scrollLock preventScrollOnFocus clickOutsideDisables={true}>
        <div
          className="euiCodeBlockFullScreen"
          css={cssStyles}
          {...dialogProps}
        >
          {children}
        </div>
      </EuiFocusTrap>
    </EuiOverlayMask>
  );
};
