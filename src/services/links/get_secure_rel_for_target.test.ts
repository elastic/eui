/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { getSecureRelForTarget } from './get_secure_rel_for_target';

describe('getSecureRelForTarget', () => {
  describe('returns rel and noreferrer', () => {
    test('when target is not supplied', () => {
      expect(
        getSecureRelForTarget({
          target: undefined,
          rel: 'hello',
        })
      ).toBe('hello noreferrer');
    });

    test('when target is empty', () => {
      expect(
        getSecureRelForTarget({
          target: '',
          rel: 'hello',
        })
      ).toBe('hello noreferrer');
    });

    test('when target is not _blank', () => {
      expect(
        getSecureRelForTarget({
          target: '_self',
          rel: 'hello',
        })
      ).toBe('hello noreferrer');
    });
  });

  describe('returns noopener noreferrer', () => {
    test('when href is not specified', () => {
      expect(
        getSecureRelForTarget({
          target: '_blank',
          rel: undefined,
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains neither', () => {
      expect(
        getSecureRelForTarget({
          target: '_blank',
          rel: undefined,
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains both', () => {
      expect(
        getSecureRelForTarget({
          target: '_blank',
          rel: 'noopener noreferrer',
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains noopener', () => {
      expect(
        getSecureRelForTarget({
          target: '_blank',
          rel: 'noopener',
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains noreferrer', () => {
      expect(
        getSecureRelForTarget({
          target: '_blank',
          rel: 'noreferrer',
        })
      ).toBe('noopener noreferrer');
    });

    test('including the original rel value', () => {
      expect(
        getSecureRelForTarget({
          target: '_blank',
          rel: 'nofollow',
        })
      ).toBe('nofollow noopener noreferrer');
    });
  });
});
