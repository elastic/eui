/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, Ref } from 'react';

import { useEuiMemoizedStyles } from '../../services';

import { euiImageCaptionStyles } from './image_caption.styles';
import type { EuiImageCaptionProps } from './image_types';

export const EuiImageCaption = forwardRef<HTMLDivElement, EuiImageCaptionProps>(
  ({ caption, isOnOverlayMask = false }, ref: Ref<HTMLDivElement>) => {
    const styles = useEuiMemoizedStyles(euiImageCaptionStyles);
    const cssStyles = [
      styles.euiImageCaption,
      isOnOverlayMask && styles.isOnOverlayMask,
    ];

    return caption ? (
      <figcaption ref={ref} css={cssStyles}>
        {caption}
      </figcaption>
    ) : null;
  }
);

EuiImageCaption.displayName = 'EuiImageCaption';
