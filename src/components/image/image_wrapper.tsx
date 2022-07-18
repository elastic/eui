/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { EuiI18n } from '../i18n';
import { useEuiTheme, useGeneratedHtmlId } from '../../services';
import { useInnerText } from '../inner_text';

import type { EuiImageWrapperProps } from './image_types';

import { euiImageWrapperStyles } from './image_wrapper.styles';
import { EuiImageButton } from './image_button';
import { EuiImageCaption } from './image_caption';

export const EuiImageWrapper: FunctionComponent<EuiImageWrapperProps> = ({
  caption,
  hasShadow,
  allowFullScreen,
  float,
  margin,
  children,
  isFullScreen,
  setIsFullScreen,
  wrapperProps,
  fullScreenIconColor,
  isFullWidth,
}) => {
  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const classes = classNames(
    'euiImageWrapper',
    wrapperProps && wrapperProps.className
  );

  const euiTheme = useEuiTheme();

  const styles = euiImageWrapperStyles(euiTheme);
  const cssFigureStyles = [
    styles.euiImageWrapper,
    float && styles[float],
    margin && styles[margin],
    allowFullScreen && styles.allowFullScreen,
    isFullWidth && styles.fullWidth,
  ];

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();
  const describedById = useGeneratedHtmlId();

  return (
    <figure
      aria-label={optionalCaptionText}
      {...wrapperProps}
      className={classes}
      css={cssFigureStyles}
    >
      {allowFullScreen ? (
        <>
          <EuiImageButton
            hasShadow={hasShadow}
            onClick={openFullScreen}
            aria-describedby={describedById}
            data-test-subj="activateFullScreenButton"
            isFullScreen={isFullScreen}
            isFullWidth={isFullWidth}
            allowFullScreen={allowFullScreen}
            fullScreenIconColor={fullScreenIconColor}
          >
            {children}
          </EuiImageButton>
          <p id={describedById} hidden>
            <EuiI18n
              token="euiImageWrapper.openImage"
              default="Click to open this image in fullscreen mode"
            />
          </p>
        </>
      ) : (
        children
      )}

      <EuiImageCaption ref={optionalCaptionRef} caption={caption} />
    </figure>
  );
};
