/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { HTMLAttributes, ReactNode, ImgHTMLAttributes } from 'react';
import { CommonProps, ExclusiveUnion } from '../common';

export const SIZES = ['s', 'm', 'l', 'xl', 'fullWidth', 'original'] as const;
export type EuiImageWrapperSize = typeof SIZES[number];

const FLOATS = ['left', 'right'] as const;
export type EuiImageWrapperFloat = typeof FLOATS[number];

const MARGINS = ['s', 'm', 'l', 'xl'] as const;
export type EuiImageWrapperMargin = typeof MARGINS[number];

export type EuiImageButtonIconColor = 'light' | 'dark';

export type EuiImageCommonWrapperProps = CommonProps & {
  /**
   * Separate from the caption is a title on the alt tag itself.
   * This one is required for accessibility.
   */
  alt: string;

  /**
   * When set to `true` (default) will apply a slight shadow to the image
   */
  hasShadow?: boolean;
  /**
   * When set to `true` will make the image clickable to a larger version
   */
  allowFullScreen?: boolean;

  /**
   * Props to add to the wrapping figure element
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;

  setIsFullScreen: (isFullScreen: boolean) => void;
};

export type EuiImageAllowFullScreenProps = {
  /**
   * Accepts `s` / `m` / `l` / `xl` / `original` / `fullWidth` / or a CSS size of `number` or `string`.
   * `fullWidth` will set the figure to stretch to 100% of its container.
   * `string` and `number` types will max both the width or height, whichever is greater.
   */
  size?: EuiImageWrapperSize | number | string;
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
};

export type _EuiImageSrcOrUrl = ExclusiveUnion<
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

export type EuiImageButtonProps = CommonProps & {
  /**
   * When set to `true` (default) will apply a slight shadow to the image
   */
  hasShadow?: boolean;
  /**
   * Changes the color of the icon that floats above the image when it can be clicked to fullscreen.
   * The default value of `light` is fine unless your image has a white background, in which case you should change it to `dark`.
   */
  fullScreenIconColor?: EuiImageButtonIconColor;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  isFullScreen: boolean;
  isFullWidth: boolean;
  allowFullScreen: boolean | undefined;
};

export type EuiImageCaptionProps = {
  /**
   * Provides the visible caption to the image
   */
  caption?: ReactNode;
  isOnOverlayMask?: boolean;
};

export type ImageProps = CommonProps &
  _EuiImageSrcOrUrl &
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export type EuiImageProps = ImageProps &
  EuiImageAllowFullScreenProps &
  Omit<EuiImageCommonWrapperProps, 'isFullScreen' | 'setIsFullScreen'> &
  Omit<EuiImageCaptionProps, 'isOnOverlayMask'> &
  Omit<
    EuiImageButtonProps,
    'onClick' | 'onKeyDown' | 'isFullScreen' | 'isFullWidth' | 'allowFullScreen'
  >;

export type EuiImageWrapperProps = EuiImageCommonWrapperProps &
  EuiImageAllowFullScreenProps &
  EuiImageButtonProps &
  EuiImageCaptionProps;

export type EuiImageFullScreenWrapperProps = EuiImageCommonWrapperProps &
  EuiImageAllowFullScreenProps &
  EuiImageButtonProps &
  EuiImageCaptionProps;
