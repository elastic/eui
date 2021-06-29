/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { CSSProperties } from 'react';

export const WARNING_MESSAGE =
  'Two `width` properties were provided. Provide only one of `style.width` or `width` to avoid conflicts.';

export const resolveWidthAsStyle = (
  style: CSSProperties = {},
  width?: string | number
) => {
  const { width: styleWidth, ...styleRest } = style;
  let attrWidth = width;
  if (
    attrWidth != null &&
    (typeof attrWidth === 'number' || !isNaN(Number(attrWidth))) // transform {number} or unitless 'number' to px string
  ) {
    attrWidth = `${attrWidth}px`;
  }
  if (styleWidth && attrWidth) {
    console.warn(WARNING_MESSAGE);
  }
  return { ...styleRest, width: attrWidth || styleWidth };
};
