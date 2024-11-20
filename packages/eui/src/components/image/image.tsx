/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';

import { EuiImageWrapper } from './image_wrapper';
import { euiImageStyles } from './image.styles';
import { EuiImageFullScreenWrapper } from './image_fullscreen_wrapper';
import type { EuiImageProps, EuiImageSize } from './image_types';
import { SIZES } from './image_types';

export const EuiImage: FunctionComponent<EuiImageProps> = ({
  className,
  alt,
  url,
  src,
  size = 'original',
  hasShadow,
  style,
  wrapperProps,
  fullScreenIconColor,
  allowFullScreen,
  caption,
  float,
  margin,
  onFullScreen,
  ...rest
}) => {
  const isFullWidth = size === 'fullWidth';
  const isNamedSize =
    typeof size === 'string' && SIZES.includes(size as EuiImageSize);
  const isCustomSize = !isNamedSize && size !== 'original';

  const classes = classNames('euiImage', className);
  const styles = useEuiMemoizedStyles(euiImageStyles);
  const cssStyles = [
    styles.euiImage,
    isNamedSize && styles[size as EuiImageSize],
    !isNamedSize && styles.customSize,
    hasShadow && styles.hasShadow,
  ];

  const [isFullScreen, setIsFullScreen] = useState(false);
  const cssIsFullScreenStyles = [styles.euiImage, styles.isFullScreen];

  const customSize = typeof size === 'string' ? size : `${size}px`;
  const imageStyleWithCustomSize = isCustomSize
    ? {
        ...style,
        maxWidth: customSize,
        maxHeight: customSize,
      }
    : style;

  const commonWrapperProps = {
    hasShadow,
    wrapperProps,
    setIsFullScreen,
    fullScreenIconColor,
    isFullWidth,
    allowFullScreen,
    alt,
    caption,
    float,
    margin,
    onFullScreen,
  };

  const commonImgProps = {
    className: classes,
    src: src || url,
    ...rest,
  };

  return (
    <>
      <EuiImageWrapper {...commonWrapperProps}>
        <img
          alt={alt}
          css={cssStyles}
          style={imageStyleWithCustomSize}
          {...commonImgProps}
        />
      </EuiImageWrapper>

      {allowFullScreen && isFullScreen && (
        <EuiImageFullScreenWrapper {...commonWrapperProps}>
          <img
            alt={alt}
            css={cssIsFullScreenStyles}
            style={style}
            {...commonImgProps}
          />
        </EuiImageFullScreenWrapper>
      )}
    </>
  );
};
