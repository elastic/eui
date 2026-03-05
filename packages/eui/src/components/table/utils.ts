/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { CSSProperties } from 'react';
import type { EuiTableSharedWidthProps } from './types';

/**
 * @internal
 */
export const WARNING_MESSAGE_WIDTH =
  'Two `width` properties were provided. Provide only one of `style.width` or `width` to avoid conflicts.';

/**
 * @internal
 */
export const WARNING_MESSAGE_MIN_WIDTH =
  'Two `minWidth` properties were provided. Provide only one of `style.minWidth` or `minWidth` to avoid conflicts.';

/**
 * @internal
 */
export const WARNING_MESSAGE_MAX_WIDTH =
  'Two `maxWidth` properties were provided. Provide only one of `style.maxWidth` or `maxWidth` to avoid conflicts.';

const normalizeValue = (
  value: string | number | undefined
): string | undefined => {
  if (value === undefined || Number.isNaN(value)) {
    return undefined;
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
};

/**
 * @internal
 */
export const resolveWidthPropsAsStyle = (
  style: CSSProperties = {},
  {
    width: rawWidth,
    minWidth: rawMinWidth,
    maxWidth: rawMaxWidth,
  }: EuiTableSharedWidthProps
): CSSProperties => {
  const width = normalizeValue(rawWidth);
  const minWidth = normalizeValue(rawMinWidth);
  const maxWidth = normalizeValue(rawMaxWidth);

  if (process.env.NODE_ENV !== 'production') {
    if (style.width && width !== undefined) {
      console.warn(WARNING_MESSAGE_WIDTH);
    }

    if (style.minWidth && minWidth !== undefined) {
      console.warn(WARNING_MESSAGE_MIN_WIDTH);
    }

    if (style.maxWidth && maxWidth !== undefined) {
      console.warn(WARNING_MESSAGE_MAX_WIDTH);
    }
  }

  return {
    width: width || style.width,
    minWidth: minWidth || style.minWidth,
    maxWidth: maxWidth || style.maxWidth,
  };
};
