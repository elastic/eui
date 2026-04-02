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

/**
 * @internal
 */
export const WARNING_MESSAGE_NOT_RECOMMENDED_UNIT =
  'Detected not recommended unit (%, vw, cqw, cqi) in cell width settings. Adjust the `width`, `minWidth` and `maxWidth` values to use absolute length units like `em` for text cells or `px` for static elements like icons or plots.';

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

const UNIT_VALIDATOR_REGEX = /%|vw|cqw|cqi/;

const shouldWarnAboutNotRecommendedUnit = (
  value: string | number | undefined
): boolean => {
  if (typeof value === 'string') {
    return UNIT_VALIDATOR_REGEX.test(value);
  }

  return false;
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
  const widthProp = normalizeValue(rawWidth);
  const minWidthProp = normalizeValue(rawMinWidth);
  const maxWidthProp = normalizeValue(rawMaxWidth);

  const width = widthProp ?? style.width;
  const minWidth = minWidthProp ?? style.minWidth;
  const maxWidth = maxWidthProp ?? style.maxWidth;

  // Value validation block
  if (process.env.NODE_ENV !== 'production') {
    if (style.width && widthProp !== undefined) {
      console.warn(WARNING_MESSAGE_WIDTH);
    }

    if (style.minWidth && minWidthProp !== undefined) {
      console.warn(WARNING_MESSAGE_MIN_WIDTH);
    }

    if (style.maxWidth && maxWidthProp !== undefined) {
      console.warn(WARNING_MESSAGE_MAX_WIDTH);
    }

    if (
      shouldWarnAboutNotRecommendedUnit(width) ||
      shouldWarnAboutNotRecommendedUnit(minWidth) ||
      shouldWarnAboutNotRecommendedUnit(maxWidth)
    ) {
      console.warn(WARNING_MESSAGE_NOT_RECOMMENDED_UNIT);
    }
  }

  return {
    width,
    minWidth,
    maxWidth,
  };
};
