/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ImgHTMLAttributes,
  useState,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../common';
import { EuiOverlayMask } from '../overlay_mask';

import { EuiIcon } from '../icon';

import { useEuiI18n } from '../i18n';

import { EuiFocusTrap } from '../focus_trap';

import { keys, useEuiTheme, useIsWithinBreakpoints } from '../../services';
import { useInnerText } from '../inner_text';
import {
  euiImageStyles,
  euiImageImgStyles,
  euiImageButtonStyles,
  euiImageCaptionStyles,
  euiImageIconStyles,
  euiImageFullScreenImgStyles,
  euiImageFullScreenCloseIconStyles,
} from './image.styles';

export const SIZES = ['s', 'm', 'l', 'xl', 'fullWidth', 'original'] as const;
export type EuiImageSize = typeof SIZES[number];

const FLOATS = ['left', 'right'] as const;
export type EuiImageFloat = typeof FLOATS[number];

const MARGINS = ['s', 'm', 'l', 'xl'] as const;
export type EuiImageMargin = typeof MARGINS[number];

type FullScreenIconColor = 'light' | 'dark';

const fullScreenIconColorMap: { [color in FullScreenIconColor]: string } = {
  light: 'ghost',
  dark: 'default',
};

type _EuiImageSrcOrUrl = ExclusiveUnion<
  {
    /**
     * Requires either `src` or `url` but defaults to using `src` if both are provided
     */
    src: string;
  },
  {
    url: string;
  }
>;

export type EuiImageProps = CommonProps &
  _EuiImageSrcOrUrl &
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
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
    size?: EuiImageSize | number | string;
    /**
     * Changes the color of the icon that floats above the image when it can be clicked to fullscreen.
     * The default value of `light` is fine unless your image has a white background, in which case you should change it to `dark`.
     */
    fullScreenIconColor?: FullScreenIconColor;
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
    float?: EuiImageFloat;
    /**
     * Margin around the image.
     */
    margin?: EuiImageMargin;
  };

export const EuiImage: FunctionComponent<EuiImageProps> = ({
  className,
  url,
  src,
  size = 'original',
  caption,
  hasShadow,
  allowFullScreen,
  fullScreenIconColor = 'light',
  alt,
  style,
  float,
  margin,
  ...rest
}) => {
  const [isFullScreenActive, setIsFullScreenActive] = useState(false);
  const isNamedSize =
    typeof size === 'string' && SIZES.includes(size as EuiImageSize);
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
    setIsFullScreenActive(false);
  };

  const openFullScreen = () => {
    setIsFullScreenActive(true);
  };

  const classes = classNames('euiImage', className);

  const euiTheme = useEuiTheme();

  const styles = euiImageStyles(
    euiTheme,
    hasShadow,
    hasFloatLeft,
    hasFloatRight,
    isSmallScreen
  );
  const cssFigureStyles = [
    styles.euiImage,
    float && styles[float],
    margin && styles[margin],
    allowFullScreen && styles.allowFullScreen,
  ];

  const cssFullScreenFigureStyles = [
    styles.euiImage,
    isFullScreenActive && styles.isFullScreen,
  ];

  const imgStyles = euiImageImgStyles(euiTheme, size);
  const cssImgStyles = [
    imgStyles.euiImage__img,
    isNamedSize && imgStyles[size as EuiImageSize],
    !isNamedSize && imgStyles.customSize,
    hasShadow && imgStyles.hasShadow,
  ];

  const buttonStyles = euiImageButtonStyles(euiTheme);
  const cssButtonStyles = [
    buttonStyles.euiImage__button,
    // when the image button is not in full screen mode and the size is not custom
    // we need the image button to go full width to match the parent '.euiImage'
    // width except when the size is `original`
    !isFullScreenActive &&
      isNamedSize &&
      size !== 'original' &&
      buttonStyles.fullWidth,
  ];

  const captionStyles = euiImageCaptionStyles(euiTheme);
  const cssCaptionStyles = [captionStyles.euiImage__caption];

  const iconStyles = euiImageIconStyles(euiTheme);
  const cssIconStyles = [iconStyles.euiImage__icon];

  const fullScreenImgStyles = euiImageFullScreenImgStyles();
  const cssFullScreenImgStyles = [fullScreenImgStyles.euiImage__fullScreen];

  const fullScreenCloseIconStyles = euiImageFullScreenCloseIconStyles(euiTheme);
  const cssFullScreenCloseIconStyles = [
    fullScreenCloseIconStyles.euiImage__fullScreenCloseIcon,
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
      color={fullScreenIconColorMap[fullScreenIconColor]}
      css={cssIconStyles}
    />
  );

  const fullScreenDisplay = (
    <EuiOverlayMask
      data-test-subj="fullScreenOverlayMask"
      onClick={closeFullScreen}
    >
      <EuiFocusTrap clickOutsideDisables={true}>
        <>
          <figure
            css={cssFullScreenFigureStyles}
            aria-label={optionalCaptionText}
          >
            <button
              type="button"
              css={cssButtonStyles}
              aria-label={useEuiI18n(
                'euiImage.closeImage',
                'Close fullscreen {alt} image',
                { alt }
              )}
              data-test-subj="deactivateFullScreenButton"
              onClick={closeFullScreen}
              onKeyDown={onKeyDown}
            >
              <img
                src={src || url}
                alt={alt}
                css={cssFullScreenImgStyles}
                {...rest}
              />
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

  const fullscreenLabel = useEuiI18n(
    'euiImage.openImage',
    'Open fullscreen {alt} image',
    { alt }
  );

  const imageDisplay = (
    <img src={src || url} alt={alt} css={cssImgStyles} {...rest} />
  );

  return (
    <figure
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
          {imageDisplay}
          {allowFullScreenIcon}
        </button>
      ) : (
        imageDisplay
      )}

      {isFullScreenActive && fullScreenDisplay}
      {optionalCaption}
    </figure>
  );
};
