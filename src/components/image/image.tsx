/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ImgHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../common';

import { useEuiTheme } from '../../services';

import { EuiImageWrapper, EuiImageWrapperProps } from './image_wrapper';
import { euiImageStyles } from './image.styles';

export const SIZES = ['s', 'm', 'l', 'xl', 'fullWidth', 'original'] as const;
export type EuiImageSize = typeof SIZES[number];

const FLOATS = ['left', 'right'] as const;
export type EuiImageFloat = typeof FLOATS[number];

const MARGINS = ['s', 'm', 'l', 'xl'] as const;
export type EuiImageMargin = typeof MARGINS[number];

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

type ImageProps = CommonProps &
  _EuiImageSrcOrUrl &
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export type EuiImageProps = ImageProps &
  Omit<EuiImageWrapperProps, 'isFullScreen' | 'setIsFullScreen'>;

export const EuiImage: FunctionComponent<EuiImageProps> = ({
  className,
  url,
  src,
  size = 'original',
  hasShadow,
  style,
  wrapperProps,
  ...rest
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const isNamedSize =
    typeof size === 'string' && SIZES.includes(size as EuiImageSize);

  const classes = classNames('euiImage', className);

  const euiTheme = useEuiTheme();

  const imgStyles = euiImageStyles(euiTheme);

  const cssStyles = isFullScreen
    ? [imgStyles.fullScreen]
    : [
        imgStyles.euiImage,
        isNamedSize && imgStyles[size as EuiImageSize],
        !isNamedSize && imgStyles.customSize,
        hasShadow && imgStyles.hasShadow,
      ];

  const isCustomSize = !isFullScreen && !isNamedSize && size !== 'original';

  const customSize = typeof size === 'string' ? size : `${size}px`;

  const styles = isCustomSize
    ? {
        ...style,
        maxWidth: customSize,
        maxHeight: customSize,
      }
    : style;

  return (
    <EuiImageWrapper
      {...(rest as EuiImageWrapperProps)}
      hasShadow={hasShadow}
      size={size}
      wrapperProps={wrapperProps}
      setIsFullScreen={setIsFullScreen}
      isFullScreen={isFullScreen}
    >
      <img
        className={classes}
        style={styles}
        src={src || url}
        alt={rest.alt}
        css={cssStyles}
        {...(rest as ImageProps)}
      />
    </EuiImageWrapper>
  );
};
