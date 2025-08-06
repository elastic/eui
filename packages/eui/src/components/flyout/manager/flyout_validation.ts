/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutSize, FLYOUT_SIZES } from '../const';

/**
 * Business rules for flyout sizes:
 * - Managed flyouts should only accept "named" sizes (s, m, l)
 * - Parent and child can't both be 'm'
 * - Parent can't be 'l' if there is a child
 */

export interface FlyoutSizeValidationError {
  type: 'INVALID_SIZE_TYPE' | 'INVALID_SIZE_COMBINATION';
  message: string;
  flyoutId?: string;
  level?: 'main' | 'child';
  size?: string; // Allow any string for error reporting
}

/**
 * Checks if a size is a named size (s, m, l)
 */
export function isNamedSize(size: any): size is EuiFlyoutSize {
  return FLYOUT_SIZES.includes(size as EuiFlyoutSize);
}

/**
 * Validates that a managed flyout only uses named sizes
 */
export function validateManagedFlyoutSize(
  size: any,
  flyoutId: string,
  level: 'main' | 'child'
): FlyoutSizeValidationError | null {
  if (!isNamedSize(size)) {
    return {
      type: 'INVALID_SIZE_TYPE',
      message: `Managed flyouts must use named sizes (s, m, l). Received: ${size}`,
      flyoutId,
      level,
      size,
    };
  }
  return null;
}

/**
 * Validates size combinations for parent-child flyouts
 */
export function validateSizeCombination(
  parentSize: EuiFlyoutSize,
  childSize: EuiFlyoutSize
): FlyoutSizeValidationError | null {
  // Parent and child can't both be 'm'
  if (parentSize === 'm' && childSize === 'm') {
    return {
      type: 'INVALID_SIZE_COMBINATION',
      message: 'Parent and child flyouts cannot both be size "m"',
      size: childSize,
    };
  }

  // Parent can't be 'l' if there is a child
  if (parentSize === 'l') {
    return {
      type: 'INVALID_SIZE_COMBINATION',
      message: 'Parent flyouts cannot be size "l" when there is a child flyout',
      size: parentSize,
    };
  }

  return null;
}

/**
 * Comprehensive validation for flyout size rules
 */
export function validateFlyoutSize(
  size: any,
  flyoutId: string,
  level: 'main' | 'child',
  parentSize?: EuiFlyoutSize
): FlyoutSizeValidationError | null {
  // First validate that managed flyouts use named sizes
  const sizeTypeError = validateManagedFlyoutSize(size, flyoutId, level);
  if (sizeTypeError) {
    return sizeTypeError;
  }

  // If this is a child flyout and we have parent size, validate combination
  if (level === 'child' && parentSize && isNamedSize(size)) {
    const combinationError = validateSizeCombination(parentSize, size);
    if (combinationError) {
      combinationError.flyoutId = flyoutId;
      combinationError.level = level;
      return combinationError;
    }
  }

  return null;
}

/**
 * Creates a user-friendly error message for validation errors
 */
export function createValidationErrorMessage(
  error: FlyoutSizeValidationError
): string {
  const prefix = `EuiFlyout validation error: `;

  switch (error.type) {
    case 'INVALID_SIZE_TYPE':
      return `${prefix}${error.message}`;
    case 'INVALID_SIZE_COMBINATION':
      return `${prefix}${error.message}`;
    default:
      return `${prefix}Unknown validation error`;
  }
}
