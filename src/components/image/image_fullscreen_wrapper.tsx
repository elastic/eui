/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiIcon } from '../icon';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { EuiI18n } from '../i18n';
import { useEuiTheme, useGeneratedHtmlId, keys } from '../../services';
import { useInnerText } from '../inner_text';

import {
  euiImageFullscreenWrapperStyles,
  euiImageFullscreenWrapperFullScreenCloseIconStyles,
} from './image_fullscreen_wrapper.styles';

import type { EuiImageWrapperProps } from './image_types';

import { EuiImageButton } from './image_button';
import { EuiImageCaption } from './image_caption';

export const EuiImageFullScreenWrapper: FunctionComponent<EuiImageWrapperProps> = ({
  hasShadow,
  caption,
  children,
  isFullScreen,
  setIsFullScreen,
  wrapperProps,
  allowFullScreen,
  isFullWidth,
  fullScreenIconColor,
}) => {
  const euiTheme = useEuiTheme();

  const styles = euiImageFullscreenWrapperStyles(euiTheme);

  const cssStyles = [styles.euiImageFullscreenWrapper];

  const fullScreenCloseIconStyles = euiImageFullscreenWrapperFullScreenCloseIconStyles(
    euiTheme
  );
  const cssFullScreenCloseIconStyles = [
    fullScreenCloseIconStyles.euiImageFullscreenWrapper__fullScreenCloseIcon,
  ];

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
  };

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();
  const describedById = useGeneratedHtmlId();

  return (
    <EuiOverlayMask
      data-test-subj="fullScreenOverlayMask"
      onClick={closeFullScreen}
    >
      <EuiFocusTrap clickOutsideDisables={true}>
        <>
          <figure
            aria-label={optionalCaptionText}
            {...wrapperProps}
            className={classes}
            css={cssStyles}
          >
            <EuiImageButton
              hasShadow={hasShadow}
              onClick={closeFullScreen}
              onKeyDown={onKeyDown}
              aria-describedby={describedById}
              data-test-subj="deactivateFullScreenButton"
              isFullScreen={isFullScreen}
              isFullWidth={isFullWidth}
              allowFullScreen={allowFullScreen}
              fullScreenIconColor={fullScreenIconColor}
            >
              {children}
            </EuiImageButton>
            <p id={describedById} hidden>
              <EuiI18n
                token="euiImageFullscreenWrapper.closeImage"
                default="Click to close fullscreen mode"
              />
            </p>
            <EuiImageCaption
              caption={caption}
              ref={optionalCaptionRef}
              isOnOverlayMask={isFullScreen}
            />
          </figure>
          <EuiIcon
            type="fullScreenExit"
            color="default"
            css={cssFullScreenCloseIconStyles}
          />
        </>
      </EuiFocusTrap>
    </EuiOverlayMask>
  );
};
