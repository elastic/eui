/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  HTMLAttributes,
  ReactNode,
  ImgHTMLAttributes,
  PropsWithChildren,
} from 'react';
import { CommonProps, ExclusiveUnion } from '../common';

export const SIZES = ['s', 'm', 'l', 'xl', 'fullWidth', 'original'] as const;
export type EuiImageSize = (typeof SIZES)[number];

const FLOATS = ['left', 'right'] as const;
export type EuiImageWrapperFloat = (typeof FLOATS)[number];

const MARGINS = ['s', 'm', 'l', 'xl'] as const;
export type EuiImageWrapperMargin = (typeof MARGINS)[number];

export type EuiImageButtonIconColor = 'light' | 'dark';

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
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> &
  _EuiImageSrcOrUrl & {
    /**
     * Alt text should describe the image to aid screen reader users. See
     * https://webaim.org/techniques/alttext/ for a guide on writing
     * effective alt text.
     *
     * If no meaningful description exists, or if the image is adequately
     * described by the surrounding text, pass an empty string.
     */
    alt: string;
    /**
     * Provides a visible caption to the image
     */
    caption?: ReactNode;
    /**
     * Accepts `s` / `m` / `l` / `xl` / `original` / `fullWidth` / or a CSS size of `number` or `string`.
     * `fullWidth` will set the figure to stretch to 100% of its container.
     * `string` and `number` types will max both the width or height, whichever is greater.
     */
    size?: EuiImageSize | number | string;
    /**
     * Float the image to the left or right. Useful in large text blocks.
     */
    float?: EuiImageWrapperFloat;
    /**
     * Margin around the image.
     */
    margin?: EuiImageWrapperMargin;
    /**
     * When set to `true` (default) will apply a slight shadow to the image
     */
    hasShadow?: boolean;
    /**
     * When set to `true` will make the image clickable to a larger version
     */
    allowFullScreen?: boolean;
    /**
     * Callback when the image is clicked and `allowFullScreen` is `true`
     */
    onFullScreen?: (isFullScreen: boolean) => void;
    /**
     * Changes the color of the icon that floats above the image when it can be clicked to fullscreen.
     * The default value of `light` is fine unless your image has a white background, in which case you should change it to `dark`.
     */
    fullScreenIconColor?: EuiImageButtonIconColor;
    /**
     * Props to add to the wrapping figure element
     */
    wrapperProps?: CommonProps & HTMLAttributes<HTMLDivElement>;
  };

export type EuiImageWrapperProps = PropsWithChildren &
  Pick<
    EuiImageProps,
    | 'alt'
    | 'caption'
    | 'float'
    | 'margin'
    | 'hasShadow'
    | 'wrapperProps'
    | 'fullScreenIconColor'
    | 'allowFullScreen'
    | 'onFullScreen'
  > & {
    isFullWidth: boolean;
    setIsFullScreen: (isFullScreen: boolean) => void;
  };

export type EuiImageButtonProps = PropsWithChildren &
  Pick<EuiImageProps, 'hasShadow' | 'fullScreenIconColor'> & {
    hasAlt: boolean;
    onClick: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    isFullWidth: boolean;
    isFullScreen?: boolean;
  };

export type EuiImageCaptionProps = Pick<EuiImageProps, 'caption'> & {
  isOnOverlayMask?: boolean;
};
