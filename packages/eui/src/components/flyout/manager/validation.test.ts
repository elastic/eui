/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  isNamedSize,
  validateManagedFlyoutSize,
  validateSizeCombination,
  validateFlyoutSize,
  createValidationErrorMessage,
  FlyoutValidationError,
  validateFlyoutTitle,
} from './validation';

describe('Flyout Size Validation', () => {
  describe('isNamedSize', () => {
    it('should return true for named sizes', () => {
      expect(isNamedSize('s')).toBe(true);
      expect(isNamedSize('m')).toBe(true);
      expect(isNamedSize('l')).toBe(true);
    });

    it('should return false for non-named sizes', () => {
      expect(isNamedSize('xs')).toBe(false);
      expect(isNamedSize('xl')).toBe(false);
      expect(isNamedSize('100px')).toBe(false);
      expect(isNamedSize(100)).toBe(false);
      expect(isNamedSize('50%')).toBe(false);
    });
  });

  describe('validateManagedFlyoutSize', () => {
    it('should return null for valid named sizes', () => {
      expect(validateManagedFlyoutSize('s', 'test-id', 'main')).toBeNull();
      expect(validateManagedFlyoutSize('m', 'test-id', 'child')).toBeNull();
      expect(validateManagedFlyoutSize('l', 'test-id', 'main')).toBeNull();
    });

    it('should return error for non-named sizes', () => {
      const error = validateManagedFlyoutSize('100px', 'test-id', 'main');
      expect(error).toEqual({
        type: 'INVALID_SIZE_TYPE',
        message:
          'Managed flyouts must use named sizes (s, m, l, fill). Received: 100px',
        flyoutId: 'test-id',
        level: 'main',
        size: '100px',
      });
    });
  });

  describe('validateFlyoutTitle', () => {
    it('should return null for child flyouts without title', () => {
      expect(validateFlyoutTitle(undefined, 'child-id', 'child')).toBeNull();
    });

    it('should return null for main flyouts with valid title', () => {
      expect(validateFlyoutTitle('Main Title', 'main-id', 'main')).toBeNull();
    });

    it('should return error for empty string title', () => {
      const error = validateFlyoutTitle('', 'test-id', 'main');
      expect(error).toEqual({
        type: 'INVALID_FLYOUT_MENU_TITLE',
        message: `Managed flyouts require either a 'flyoutMenuProps.title' or an 'aria-label' to provide the flyout menu title.`,
        flyoutId: 'test-id',
        level: 'main',
      });
    });
  });

  describe('validateSizeCombination', () => {
    it('should return null for valid combinations', () => {
      expect(validateSizeCombination('s', 'm')).toBeNull();
      expect(validateSizeCombination('s', 'l')).toBeNull();
      expect(validateSizeCombination('m', 's')).toBeNull();
      expect(validateSizeCombination('m', 'l')).toBeNull();
      expect(validateSizeCombination('s', 'fill')).toBeNull();
      expect(validateSizeCombination('m', 'fill')).toBeNull();
      expect(validateSizeCombination('fill', 's')).toBeNull();
      expect(validateSizeCombination('fill', 'm')).toBeNull();
    });

    it('should return error when parent and child are both m', () => {
      const error = validateSizeCombination('m', 'm');
      expect(error).toEqual({
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Parent and child flyouts cannot both be size "m"',
        size: 'm',
      });
    });

    it('should return error when parent and child are both fill', () => {
      const error = validateSizeCombination('fill', 'fill');
      expect(error).toEqual({
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Parent and child flyouts cannot both be size "fill"',
        size: 'fill',
      });
    });

    it('should return error when parent is l and there is a child', () => {
      const error = validateSizeCombination('l', 's');
      expect(error).toEqual({
        type: 'INVALID_SIZE_COMBINATION',
        message:
          'Parent flyouts cannot be size "l" when there is a child flyout',
        size: 'l',
      });
    });
  });

  describe('validateFlyoutSize', () => {
    it('should validate managed flyout size type', () => {
      const error = validateFlyoutSize('100px', 'test-id', 'main');
      expect(error?.type).toBe('INVALID_SIZE_TYPE');
    });

    it('should validate size combinations for child flyouts', () => {
      // Parent and child both 'm' should fail
      const error1 = validateFlyoutSize('m', 'child-id', 'child', 'm');
      expect(error1?.type).toBe('INVALID_SIZE_COMBINATION');
      expect(error1?.message).toContain(
        'Parent and child flyouts cannot both be size "m"'
      );

      // Parent and child both 'fill' should fail
      const error2 = validateFlyoutSize('fill', 'child-id', 'child', 'fill');
      expect(error2?.type).toBe('INVALID_SIZE_COMBINATION');
      expect(error2?.message).toContain(
        'Parent and child flyouts cannot both be size "fill"'
      );

      // Parent 'l' with child should fail
      const error3 = validateFlyoutSize('s', 'child-id', 'child', 'l');
      expect(error3?.type).toBe('INVALID_SIZE_COMBINATION');
      expect(error3?.message).toContain(
        'Parent flyouts cannot be size "l" when there is a child flyout'
      );
    });

    it('should return null for valid child flyout combinations', () => {
      expect(validateFlyoutSize('s', 'child-id', 'child', 'm')).toBeNull();
      expect(validateFlyoutSize('l', 'child-id', 'child', 'm')).toBeNull();
      expect(validateFlyoutSize('s', 'child-id', 'child', 's')).toBeNull();
      expect(validateFlyoutSize('fill', 'child-id', 'child', 'm')).toBeNull();
      expect(validateFlyoutSize('s', 'child-id', 'child', 'fill')).toBeNull();
    });
  });

  describe('createValidationErrorMessage', () => {
    it('should create error message for invalid size type', () => {
      const error: FlyoutValidationError = {
        type: 'INVALID_SIZE_TYPE',
        message:
          'Managed flyouts must use named sizes (s, m, l). Received: 100px',
        flyoutId: 'test-id',
        level: 'main',
        size: '100px',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        'EuiFlyout validation error: Managed flyouts must use named sizes (s, m, l). Received: 100px'
      );
    });

    it('should create error message for invalid size combination', () => {
      const error: FlyoutValidationError = {
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Parent and child flyouts cannot both be size "m"',
        size: 'm',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        'EuiFlyout validation error: Parent and child flyouts cannot both be size "m"'
      );
    });

    it('should create error message for invalid fill size combination', () => {
      const error: FlyoutValidationError = {
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Parent and child flyouts cannot both be size "fill"',
        size: 'fill',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        'EuiFlyout validation error: Parent and child flyouts cannot both be size "fill"'
      );
    });

    it('should create error message for invalid flyout menu title', () => {
      const error: FlyoutValidationError = {
        type: 'INVALID_FLYOUT_MENU_TITLE',
        message:
          "Managed flyouts require either a 'flyoutMenuProps' a 'title' property, or an 'aria-label' to provide the title.",
        flyoutId: 'test-id',
        level: 'main',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        "EuiFlyout validation error: Managed flyouts require either a 'flyoutMenuProps' a 'title' property, or an 'aria-label' to provide the title."
      );
    });

    it('should handle unknown error types', () => {
      const error: FlyoutValidationError = {
        type: 'UNKNOWN_ERROR' as any,
        message: 'Some unknown error',
        flyoutId: 'test-id',
        level: 'main',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        'EuiFlyout validation error: Unknown validation error'
      );
    });
  });
});
