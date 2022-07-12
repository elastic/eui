/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiI18n } from '../i18n';

import { useEuiTheme } from '../../services';
import { useInnerText } from '../inner_text';

import type { EuiImageWrapperProps } from './image_types';

import { euiImageWrapperStyles } from './image_wrapper.styles';
import { EuiImageButton } from './image_button';
import { EuiImageCaption } from './image_caption';

export const EuiImageWrapper: FunctionComponent<EuiImageWrapperProps> = ({
  caption,
  hasShadow,
  allowFullScreen,
  alt,
  float,
  margin,
  children,
  isFullScreen,
  setIsFullScreen,
  wrapperProps,
  fullScreenIconColor,
  isFullWidth,
}) => {
  const hasFloatLeft = float === 'left';
  const hasFloatRight = float === 'right';

  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const classes = classNames(
    'euiImageWrapper',
    wrapperProps && wrapperProps.className
  );

  const euiTheme = useEuiTheme();

  const styles = euiImageWrapperStyles(euiTheme, hasFloatLeft, hasFloatRight);
  const cssFigureStyles = [
    styles.euiImageWrapper,
    float && styles[float],
    margin && styles[margin],
    allowFullScreen && styles.allowFullScreen,
    isFullWidth && styles.fullWidth,
  ];

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();

  const openImageLabel = useEuiI18n(
    'euiImageWrapper.openImage',
    'Open fullscreen {alt} image',
    { alt }
  );

  return (
    <figure
      {...wrapperProps}
      className={classes}
      css={cssFigureStyles}
      aria-label={optionalCaptionText}
    >
      {allowFullScreen ? (
        <EuiImageButton
          hasShadow={hasShadow}
          onClick={openFullScreen}
          aria-label={openImageLabel}
          data-test-subj="activateFullScreenButton"
          isFullScreen={isFullScreen}
          isFullWidth={isFullWidth}
          allowFullScreen={allowFullScreen}
          fullScreenIconColor={fullScreenIconColor}
        >
          {children}
        </EuiImageButton>
      ) : (
        children
      )}

      <EuiImageCaption ref={optionalCaptionRef} caption={caption} />
    </figure>
  );
};
