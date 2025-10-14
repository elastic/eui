/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutSize, FLYOUT_SIZES } from '../const';
import { EuiFlyoutComponentProps } from '../flyout.component';
import { EuiFlyoutMenuProps } from '../flyout_menu';
import { LEVEL_CHILD, LEVEL_MAIN } from './const';
import { EuiFlyoutLevel } from './types';

type FlyoutValidationErrorType =
  | 'INVALID_SIZE_TYPE'
  | 'INVALID_SIZE_COMBINATION'
  | 'INVALID_FLYOUT_MENU_TITLE';

export interface FlyoutValidationError {
  type: FlyoutValidationErrorType;
  message: string;
  flyoutId?: string;
  parentFlyoutId?: string;
  level?: EuiFlyoutLevel;
  size?: string | number;
  parentSize?: string | number;
}

/**
 * Checks if a size is a named size (s, m, l)
 */
export function isNamedSize(size: unknown): size is EuiFlyoutSize {
  return FLYOUT_SIZES.includes(size as EuiFlyoutSize);
}

/**
 * Validates that a managed flyout only uses named sizes
 */
export function validateManagedFlyoutSize(
  size: EuiFlyoutComponentProps['size'],
  flyoutId: string,
  level: EuiFlyoutLevel
): FlyoutValidationError | null {
  if (level === LEVEL_CHILD && !isNamedSize(size)) {
    const namedSizes = FLYOUT_SIZES.join(', ');
    return {
      type: 'INVALID_SIZE_TYPE',
      message: `Child flyouts must use named sizes (${namedSizes}). Received: ${size}`,
      flyoutId,
      level,
      size,
    };
  }
  return null;
}

/**
 * Validates that a title is provided
 */
export function validateFlyoutTitle(
  flyoutMenuTitle: EuiFlyoutMenuProps['title'] | undefined,
  flyoutId: string,
  level: EuiFlyoutLevel
): FlyoutValidationError | null {
  if (level === LEVEL_MAIN && !flyoutMenuTitle) {
    return {
      type: 'INVALID_FLYOUT_MENU_TITLE',
      message: `Managed flyouts require either a 'flyoutMenuProps.title' or an 'aria-label' to provide the flyout menu title.`,
      flyoutId,
      level,
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
): FlyoutValidationError | null {
  const sizes = [parentSize, childSize];

  // Parent and child can't both be 'm'
  if (sizes.every((s) => s === 'm')) {
    return {
      type: 'INVALID_SIZE_COMBINATION',
      message: 'Parent and child flyouts cannot both be size "m"',
    };
  }

  // Parent and child can't both be 'fill'
  if (sizes.every((s) => s === 'fill')) {
    return {
      type: 'INVALID_SIZE_COMBINATION',
      message: 'Parent and child flyouts cannot both be size "fill"',
    };
  }

  // Flyout can't be 'l' if the other in the pair is not "fill"
  if (sizes.includes('l') && !sizes.includes('fill')) {
    return {
      type: 'INVALID_SIZE_COMBINATION',
      message: 'Flyouts cannot be size "l" unless the other flyout is "fill"',
    };
  }

  return null;
}

/**
 * Creates a user-friendly error message for validation errors
 */
export function createValidationErrorMessage(
  error: FlyoutValidationError
): string {
  console.error(error);
  const prefix = `EuiFlyout validation error`;

  switch (error.type) {
    case 'INVALID_SIZE_TYPE':
    case 'INVALID_SIZE_COMBINATION':
    case 'INVALID_FLYOUT_MENU_TITLE':
      return `${prefix}: ${error.message}`;
    default:
      return `${prefix}: Unknown validation error`;
  }
}
