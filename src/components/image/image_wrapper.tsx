/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { useEuiI18n } from '../i18n';

import { keys, useEuiTheme, useIsWithinBreakpoints } from '../../services';
import { useInnerText } from '../inner_text';
import { euiImageWrapperStyles } from './image_wrapper.styles';

import { EuiImageButton } from './image_button';

import { EuiImageCaption } from './image_caption';
import { EuiImageFullscreenWrapper } from './image_fullscreen_wrapper';

export const SIZES = ['s', 'm', 'l', 'xl', 'fullWidth', 'original'] as const;
export type EuiImageWrapperSize = typeof SIZES[number];

const FLOATS = ['left', 'right'] as const;
export type EuiImageWrapperFloat = typeof FLOATS[number];

const MARGINS = ['s', 'm', 'l', 'xl'] as const;
export type EuiImageWrapperMargin = typeof MARGINS[number];

export type EuiImageWrapperProps = CommonProps & {
  /**
   * Separate from the caption is a title on the alt tag itself.
   * This one is required for accessibility.
   */
  alt: string;
  /**
   * Accepts `s` / `m` / `l` / `xl` / `original` / `fullWidth` / or a CSS size of `number` or `string`.
   * `fullWidth` will set the figure to stretch to 100% of its container.
   * `string` and `number` types will max both the width or height, whichever is greater.
   */
  size?: EuiImageWrapperSize | number | string;
  /**
   * Provides the visible caption to the image
   */
  caption?: ReactNode;
  /**
   * When set to `true` (default) will apply a slight shadow to the image
   */
  hasShadow?: boolean;
  /**
   * When set to `true` will make the image clickable to a larger version
   */
  allowFullScreen?: boolean;
  /**
   * Float the image to the left or right. Useful in large text blocks.
   */
  float?: EuiImageWrapperFloat;
  /**
   * Margin around the image.
   */
  margin?: EuiImageWrapperMargin;
  /**
   * Props to add to the wrapping `.euiImageWrapper` figure
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  fullScreenImg?: ReactNode;
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
};

export const EuiImageWrapper: FunctionComponent<EuiImageWrapperProps> = ({
  size = 'original',
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
  fullScreenImg,
}) => {
  const isSmallScreen = useIsWithinBreakpoints(['xs', 's', 'm']);
  const hasFloatLeft = float === 'left';
  const hasFloatRight = float === 'right';

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

  const openFullScreen = () => {
    setIsFullScreen(true);
  };

  const classes = classNames(
    'euiImageWrapper',
    wrapperProps && wrapperProps.className
  );

  const euiTheme = useEuiTheme();

  const styles = euiImageWrapperStyles(
    euiTheme,
    hasFloatLeft,
    hasFloatRight,
    isSmallScreen
  );
  const cssFigureStyles = [
    styles.euiImageWrapper,
    float && styles[float],
    margin && styles[margin],
    allowFullScreen && styles.allowFullScreen,
    size === 'fullWidth' && styles.fullWidth,
  ];

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();

  const openImageLabel = useEuiI18n(
    'euiImageWrapper.openImage',
    'Open fullscreen {alt} image',
    { alt }
  );

  const closeImageLabel = useEuiI18n(
    'euiImageWrapper.closeImage',
    'Close fullscreen {alt} image',
    { alt }
  );

  const isFullWidth = size === 'fullWidth';

  return (
    <figure
      {...wrapperProps}
      className={classes}
      css={cssFigureStyles}
      aria-label={optionalCaptionText}
    >
      {allowFullScreen ? (
        <>
          <EuiImageButton
            hasShadow={hasShadow}
            onClick={openFullScreen}
            aria-label={openImageLabel}
            data-test-subj="activateFullScreenButton"
            isFullScreen={isFullScreen}
            isFullWidth={isFullWidth}
            allowFullScreen={allowFullScreen}
          >
            {children}
          </EuiImageButton>
        </>
      ) : (
        <>{children}</>
      )}

      <EuiImageCaption ref={optionalCaptionRef} caption={caption} />

      {isFullScreen && (
        <EuiImageFullscreenWrapper
          {...wrapperProps}
          aria-label={optionalCaptionText}
          onClick={closeFullScreen}
          alt={alt}
          buttonNode={
            <EuiImageButton
              hasShadow={hasShadow}
              onClick={closeFullScreen}
              onKeyDown={onKeyDown}
              aria-label={closeImageLabel}
              data-test-subj="deactivateFullScreenButton"
              isFullScreen={isFullScreen}
              isFullWidth={isFullWidth}
              allowFullScreen={allowFullScreen}
            >
              {fullScreenImg}
            </EuiImageButton>
          }
          captionNode={
            <EuiImageCaption
              caption={caption}
              ref={optionalCaptionRef}
              isOnOverlayMask={isFullScreen}
            />
          }
        />
      )}
    </figure>
  );
};
