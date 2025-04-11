/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { useInnerText } from '../inner_text';

import type { EuiImageWrapperProps } from './image_types';
import { euiImageWrapperStyles } from './image_wrapper.styles';
import { EuiImageButton } from './image_button';
import { EuiImageCaption } from './image_caption';

export const EuiImageWrapper: FunctionComponent<EuiImageWrapperProps> = ({
  alt,
  caption,
  hasShadow,
  allowFullScreen,
  float,
  margin,
  children,
  setIsFullScreen,
  wrapperProps,
  fullScreenIconColor,
  isFullWidth,
  onFullScreen,
}) => {
  const classes = classNames(
    'euiImageWrapper',
    wrapperProps && wrapperProps.className
  );

  const styles = useEuiMemoizedStyles(euiImageWrapperStyles);
  const cssFigureStyles = [
    styles.euiImageWrapper,
    float && styles[float],
    margin && styles[margin],
    allowFullScreen && styles.allowFullScreen,
    isFullWidth && styles.fullWidth,
    wrapperProps?.css,
  ];

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();

  return (
    <figure
      aria-label={optionalCaptionText}
      {...wrapperProps}
      className={classes}
      css={cssFigureStyles}
    >
      {allowFullScreen ? (
        <EuiImageButton
          hasAlt={!!alt}
          hasShadow={hasShadow}
          onClick={() => {
            setIsFullScreen(true);
            onFullScreen?.(true);
          }}
          data-test-subj="activateFullScreenButton"
          isFullWidth={isFullWidth}
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
