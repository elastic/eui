/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  getFormControlClassNameForIconCount,
  isRightSideIcon,
} from './_num_icons';

describe('getFormControlClassNameForIconCount', () => {
  it('should return undefined if object is empty', () => {
    const numberClass = getFormControlClassNameForIconCount({});
    expect(numberClass).toEqual(undefined);
  });

  it('should return undefined if all are false', () => {
    const numberClass = getFormControlClassNameForIconCount({
      icon: false,
      clear: false,
      isLoading: false,
      isInvalid: false,
      isDropdown: false,
    });
    expect(numberClass).toEqual(undefined);
  });

  it('should return 2 if 2 are true', () => {
    const numberClass = getFormControlClassNameForIconCount({
      icon: false,
      clear: true,
      isLoading: true,
      isInvalid: false,
      isDropdown: false,
    });
    expect(numberClass).toEqual('euiFormControlLayout--2icons');
  });

  it('should return 5 if all are true', () => {
    const numberClass = getFormControlClassNameForIconCount({
      icon: true,
      clear: true,
      isLoading: true,
      isInvalid: true,
      isDropdown: true,
    });
    expect(numberClass).toEqual('euiFormControlLayout--5icons');
  });
});

describe('isRightSideIcon', () => {
  it('returns true if side has been set to right', () => {
    expect(isRightSideIcon({ side: 'right', type: 'warning' })).toEqual(true);
  });

  it('returns false if side has been set to left', () => {
    expect(isRightSideIcon({ side: 'left', type: 'warning' })).toEqual(false);
  });

  it('returns false if icon is missing a side definition (defaults to left)', () => {
    expect(isRightSideIcon({ type: 'warning', color: 'warning' })).toEqual(
      false
    );
  });

  it('returns false if icon is undefined', () => {
    expect(isRightSideIcon()).toEqual(false);
  });

  it('returns false if icon is not in an object shape', () => {
    expect(isRightSideIcon('warning')).toEqual(false);
  });
});
