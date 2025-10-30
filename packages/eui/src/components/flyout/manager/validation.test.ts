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
    it('should return null for valid named sizes in child flyouts', () => {
      expect(validateManagedFlyoutSize('s', 'test-id', 'child')).toBeNull();
      expect(validateManagedFlyoutSize('m', 'test-id', 'child')).toBeNull();
      expect(validateManagedFlyoutSize('l', 'test-id', 'child')).toBeNull();
    });

    it('should return null for main flyouts regardless of size', () => {
      expect(validateManagedFlyoutSize('100px', 'test-id', 'main')).toBeNull();
      expect(validateManagedFlyoutSize('s', 'test-id', 'main')).toBeNull();
    });

    it('should return error for non-named sizes in child flyouts', () => {
      const error = validateManagedFlyoutSize('100px', 'test-id', 'child');
      expect(error).toEqual({
        type: 'INVALID_SIZE_TYPE',
        message:
          'Child flyouts must use named sizes (s, m, l, fill). Received: 100px',
        flyoutId: 'test-id',
        level: 'child',
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
      expect(validateSizeCombination('m', 's')).toBeNull();
      expect(validateSizeCombination('s', 'fill')).toBeNull();
      expect(validateSizeCombination('m', 'fill')).toBeNull();
      expect(validateSizeCombination('fill', 's')).toBeNull();
      expect(validateSizeCombination('fill', 'm')).toBeNull();
      expect(validateSizeCombination('l', 'fill')).toBeNull();
      expect(validateSizeCombination('fill', 'l')).toBeNull();
    });

    it('should return error when parent and child are both m', () => {
      const error = validateSizeCombination('m', 'm');
      expect(error).toEqual({
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Parent and child flyouts cannot both be size "m"',
      });
    });

    it('should return error when parent and child are both fill', () => {
      const error = validateSizeCombination('fill', 'fill');
      expect(error).toEqual({
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Parent and child flyouts cannot both be size "fill"',
      });
    });

    it('should return error when a flyout is l without the other being fill', () => {
      const errorParentL = validateSizeCombination('l', 's');
      expect(errorParentL).toEqual({
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Flyouts cannot be size "l" unless the other flyout is "fill"',
      });

      const errorChildL = validateSizeCombination('s', 'l');
      expect(errorChildL).toEqual({
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Flyouts cannot be size "l" unless the other flyout is "fill"',
      });

      const errorParentLChildM = validateSizeCombination('l', 'm');
      expect(errorParentLChildM).toEqual({
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Flyouts cannot be size "l" unless the other flyout is "fill"',
      });
    });
  });

  describe('createValidationErrorMessage', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should create error message for invalid size type', () => {
      const error: FlyoutValidationError = {
        type: 'INVALID_SIZE_TYPE',
        message:
          'Child flyouts must use named sizes (s, m, l, fill). Received: 100px',
        flyoutId: 'test-id',
        level: 'child',
        size: '100px',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        'EuiFlyout validation error: Child flyouts must use named sizes (s, m, l, fill). Received: 100px'
      );
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    it('should create error message for invalid size combination', () => {
      const error: FlyoutValidationError = {
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Parent and child flyouts cannot both be size "m"',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        'EuiFlyout validation error: Parent and child flyouts cannot both be size "m"'
      );
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    it('should create error message for invalid fill size combination', () => {
      const error: FlyoutValidationError = {
        type: 'INVALID_SIZE_COMBINATION',
        message: 'Parent and child flyouts cannot both be size "fill"',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        'EuiFlyout validation error: Parent and child flyouts cannot both be size "fill"'
      );
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    it('should create error message for invalid flyout menu title', () => {
      const error: FlyoutValidationError = {
        type: 'INVALID_FLYOUT_MENU_TITLE',
        message:
          "Managed flyouts require either a 'flyoutMenuProps.title' or an 'aria-label' to provide the flyout menu title.",
        flyoutId: 'test-id',
        level: 'main',
      };

      const message = createValidationErrorMessage(error);
      expect(message).toBe(
        "EuiFlyout validation error: Managed flyouts require either a 'flyoutMenuProps.title' or an 'aria-label' to provide the flyout menu title."
      );
      expect(consoleSpy).toHaveBeenCalledWith(error);
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
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });
});
