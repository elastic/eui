/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useCallback } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../services';
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
  allowFullScreenOnHover,
  setIsHovered,
}) => {
  const openFullScreen = () => {
    setIsFullScreen(true);
    onFullScreen?.(true);
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
    (allowFullScreen || allowFullScreenOnHover) && styles.allowFullScreen,
    isFullWidth && styles.fullWidth,
    wrapperProps?.css,
  ];

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, [setIsHovered]);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, [setIsHovered]);

  const hoverProps = allowFullScreenOnHover
    ? {
        onMouseEnter,
        onMouseLeave,
      }
    : {};

  return (
    <figure
      aria-label={optionalCaptionText}
      {...wrapperProps}
      className={classes}
      css={cssFigureStyles}
    >
      {allowFullScreen || allowFullScreenOnHover ? (
        <>
          <EuiImageButton
            hasAlt={!!alt}
            hasShadow={hasShadow}
            onClick={openFullScreen}
            data-test-subj="activateFullScreenButton"
            isFullWidth={isFullWidth}
            fullScreenIconColor={fullScreenIconColor}
            {...hoverProps}
          >
            {children}
          </EuiImageButton>
        </>
      ) : (
        children
      )}

      <EuiImageCaption ref={optionalCaptionRef} caption={caption} />
    </figure>
  );
};
