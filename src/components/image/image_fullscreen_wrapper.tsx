/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiIcon } from '../icon';
import { useEuiTheme, keys } from '../../services';
import { useInnerText } from '../inner_text';

import { euiImageFullscreenWrapperStyles } from './image_fullscreen_wrapper.styles';
import type { EuiImageWrapperProps } from './image_types';

import { EuiImageButton } from './image_button';
import { euiImageButtonIconStyles } from './image_button.styles';

import { EuiImageCaption } from './image_caption';

export const EuiImageFullScreenWrapper: FunctionComponent<
  EuiImageWrapperProps
> = ({
  alt,
  hasShadow,
  caption,
  children,
  setIsFullScreen,
  wrapperProps,
  isFullWidth,
  fullScreenIconColor,
  onFullScreen,
}) => {
  const euiTheme = useEuiTheme();

  const styles = euiImageFullscreenWrapperStyles(euiTheme);

  const cssStyles = [styles.euiImageFullscreenWrapper, wrapperProps?.css];

  const classes = classNames(
    'euiImageFullScreenWrapper',
    wrapperProps && wrapperProps.className
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      closeFullScreen();
    }
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    onFullScreen?.(false);
  };

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();

  const iconStyles = euiImageButtonIconStyles(euiTheme);
  const cssIconStyles = [
    iconStyles.euiImageButton__icon,
    iconStyles.closeFullScreen,
  ];

  return (
    <EuiOverlayMask data-test-subj="fullScreenOverlayMask">
      <EuiFocusTrap
        scrollLock
        preventScrollOnFocus
        onClickOutside={closeFullScreen}
      >
        <>
          <figure
            aria-label={optionalCaptionText}
            {...wrapperProps}
            className={classes}
            css={cssStyles}
          >
            <EuiImageButton
              hasAlt={!!alt}
              hasShadow={hasShadow}
              onClick={closeFullScreen}
              onKeyDown={onKeyDown}
              data-test-subj="deactivateFullScreenButton"
              isFullScreen={true}
              isFullWidth={isFullWidth}
              fullScreenIconColor={fullScreenIconColor}
            >
              {children}
            </EuiImageButton>
            <EuiImageCaption
              caption={caption}
              ref={optionalCaptionRef}
              isOnOverlayMask={true}
            />
          </figure>
          {/* Must be outside the `figure` element in order to escape the translateY transition. see https://www.w3.org/TR/css-transforms-1/#transform-rendering */}
          <EuiIcon type="fullScreenExit" color="ghost" css={cssIconStyles} />
        </>
      </EuiFocusTrap>
    </EuiOverlayMask>
  );
};
