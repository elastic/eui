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

import { EuiIcon } from '../../components/icon';
import { EuiFocusTrap } from '../../components/focus_trap';
import { EuiOverlayMask } from '../../components/overlay_mask';
import { useEuiI18n } from '../i18n';

import { keys, useEuiTheme, useIsWithinBreakpoints } from '../../services';
import { useInnerText } from '../inner_text';
import {
  euiImageWrapperStyles,
  euiImageWrapperButtonStyles,
  euiImageWrapperCaptionStyles,
  euiImageWrapperIconStyles,
  euiImageWrapperFullScreenCloseIconStyles,
} from './image_wrapper.styles';

export const SIZES = ['s', 'm', 'l', 'xl', 'fullWidth', 'original'] as const;
export type EuiImageWrapperSize = typeof SIZES[number];

const FLOATS = ['left', 'right'] as const;
export type EuiImageWrapperFloat = typeof FLOATS[number];

const MARGINS = ['s', 'm', 'l', 'xl'] as const;
export type EuiImageWrapperMargin = typeof MARGINS[number];

export type EuiImageWrapperFullScreenIconColor = 'light' | 'dark';

const fullScreenIconColorMap: {
  [color in EuiImageWrapperFullScreenIconColor]: string;
} = {
  light: 'ghost',
  dark: 'default',
};

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
   * Changes the color of the icon that floats above the image when it can be clicked to fullscreen.
   * The default value of `light` is fine unless your image has a white background, in which case you should change it to `dark`.
   */
  fullScreenIconColor?: EuiImageWrapperFullScreenIconColor;
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
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
};

export const EuiImageWrapper: FunctionComponent<EuiImageWrapperProps> = ({
  size = 'original',
  caption,
  hasShadow,
  allowFullScreen,
  fullScreenIconColor = 'light',
  alt,
  float,
  margin,
  children,
  isFullScreen,
  setIsFullScreen,
  wrapperProps,
}) => {
  const isNamedSize =
    typeof size === 'string' && SIZES.includes(size as EuiImageWrapperSize);
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
    hasShadow,
    hasFloatLeft,
    hasFloatRight,
    isSmallScreen
  );
  const cssFigureStyles = [
    styles.euiImageWrapper,
    float && styles[float],
    margin && styles[margin],
    allowFullScreen && styles.allowFullScreen,
  ];

  const cssFullScreenFigureStyles = [
    styles.euiImageWrapper,
    isFullScreen && styles.isFullScreen,
  ];

  const buttonStyles = euiImageWrapperButtonStyles(euiTheme);
  const cssButtonStyles = [
    buttonStyles.euiImageWrapper__button,
    // when the image button is not in full screen mode and the size is not custom
    // we need the image button to go full width to match the parent '.euiImage'
    // width except when the size is `original`
    !isFullScreen &&
      isNamedSize &&
      size !== 'original' &&
      buttonStyles.fullWidth,
  ];

  const captionStyles = euiImageWrapperCaptionStyles(euiTheme);
  const cssCaptionStyles = [captionStyles.euiImageWrapper__caption];

  const iconStyles = euiImageWrapperIconStyles(euiTheme);
  const cssIconStyles = [iconStyles.euiImageWrapper__icon];

  const fullScreenCloseIconStyles = euiImageWrapperFullScreenCloseIconStyles(
    euiTheme
  );
  const cssFullScreenCloseIconStyles = [
    fullScreenCloseIconStyles.euiImageWrapper__fullScreenCloseIcon,
  ];

  const [optionalCaptionRef, optionalCaptionText] = useInnerText();
  let optionalCaption;
  if (caption) {
    optionalCaption = (
      <figcaption ref={optionalCaptionRef} css={cssCaptionStyles}>
        {caption}
      </figcaption>
    );
  }

  const allowFullScreenIcon = (
    <EuiIcon
      type="fullScreen"
      color={
        fullScreenIconColorMap[
          fullScreenIconColor as EuiImageWrapperFullScreenIconColor
        ]
      }
      css={cssIconStyles}
    />
  );

  const fullscreenLabel = useEuiI18n(
    'euiImageWrapper.openImage',
    'Open fullscreen {alt} image',
    { alt }
  );

  const fullScreen = (
    <EuiOverlayMask
      data-test-subj="fullScreenOverlayMask"
      onClick={closeFullScreen}
    >
      <EuiFocusTrap clickOutsideDisables={true}>
        <>
          <figure
            {...wrapperProps}
            className={classes}
            css={cssFullScreenFigureStyles}
            aria-label={optionalCaptionText}
          >
            <button
              type="button"
              css={cssButtonStyles}
              aria-label={useEuiI18n(
                'euiImageWrapper.closeImage',
                'Close fullscreen {alt} image',
                { alt }
              )}
              data-test-subj="deactivateFullScreenButton"
              onClick={closeFullScreen}
              onKeyDown={onKeyDown}
            >
              {children}
            </button>
            {optionalCaption}
          </figure>
          <EuiIcon
            type="cross"
            color="default"
            css={cssFullScreenCloseIconStyles}
          />
        </>
      </EuiFocusTrap>
    </EuiOverlayMask>
  );

  return (
    <figure
      {...wrapperProps}
      className={classes}
      css={cssFigureStyles}
      aria-label={optionalCaptionText}
    >
      {allowFullScreen ? (
        <button
          type="button"
          css={cssButtonStyles}
          aria-label={fullscreenLabel}
          data-test-subj="activateFullScreenButton"
          onClick={openFullScreen}
        >
          {children}
          {allowFullScreenIcon}
        </button>
      ) : (
        children
      )}

      {isFullScreen && fullScreen}
      {optionalCaption}
    </figure>
  );
};
