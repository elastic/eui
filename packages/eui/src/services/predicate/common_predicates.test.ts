/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import moment from 'moment';
import {
  always,
  never,
  isNil,
  isUndefined,
  isNull,
  isMoment,
  isDate,
  isDateLike,
} from './common_predicates';

describe('common predicates', () => {
  test('always', () => {
    [undefined, null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      (value) => {
        expect(always(value)).toBe(true);
      }
    );
  });

  test('never', () => {
    [undefined, null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      (value) => {
        expect(never(value)).toBe(false);
      }
    );
  });

  test('isUndefined', () => {
    [undefined].forEach((value) => {
      expect(isUndefined(value)).toBe(true);
    });
    [null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach((value) => {
      expect(isUndefined(value)).toBe(false);
    });
  });

  test('isNull', () => {
    [null].forEach((value) => {
      expect(isNull(value)).toBe(true);
    });
    [undefined, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      (value) => {
        expect(isNull(value)).toBe(false);
      }
    );
  });

  test('isNil', () => {
    [undefined, null].forEach((value) => {
      expect(isNil(value)).toBe(true);
    });
    ['a', 1, true, false, Date.now(), {}, [], /.*/].forEach((value) => {
      expect(isNil(value)).toBe(false);
    });
  });

  test('date predicates', () => {
    const momentValue = moment();
    const dateValue = new Date();

    expect(isMoment(momentValue)).toBe(true);
    expect(isMoment(dateValue)).toBe(false);
    expect(isDate(dateValue)).toBe(true);
    expect(isDate(momentValue)).toBe(false);
    expect(isDateLike(momentValue)).toBe(true);
    expect(isDateLike(dateValue)).toBe(true);
    expect(isDateLike('2026-09-10')).toBe(false);
  });
});
