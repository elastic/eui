/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { processStringToChildren } from './i18n_util';

describe('i18n_util', () => {
  describe('processStringToChildren', () => {
    it('returns a basic string as is', () => {
      const message = 'This is a test message.';
      expect(processStringToChildren(message, {})).toEqual(message);
    });

    it('replaces placeholders with values', () => {
      expect(
        processStringToChildren('{greeting}, {name}', {
          greeting: 'Hello',
          name: 'John',
        })
      ).toEqual('Hello, John');
    });

    it('ignores `undefined` values and still returns a string', () => {
      expect(
        processStringToChildren('{greeting}, {name}', {
          greeting: 'Hello',
          name: undefined,
        })
      ).toEqual('Hello, ');
    });

    describe('escape characters', () => {
      it('backslash escapes opening and closing braces', () => {
        expect(
          processStringToChildren('{greeting}, \\{{name}\\}', {
            greeting: 'Hello',
            name: 'John',
          })
        ).toEqual('Hello, {John}');
      });

      it('backslash does not escape any other characters', () => {
        const message = 'Thi\\s is\\ a test \\message\\.';
        expect(processStringToChildren(message, {})).toEqual(message);
      });
    });

    describe('i18nMappingFunction', () => {
      it('calls the mapping function with the source string', () => {
        expect(
          processStringToChildren(
            'Hello, {name}',
            { greeting: 'Hello', name: 'John' },
            (value) => value.toUpperCase()
          )
        ).toEqual('HELLO, JOHN');
      });
    });
  });
});
