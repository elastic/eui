/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
            value => value.toUpperCase()
          )
        ).toEqual('HELLO, JOHN');
      });
    });
  });
});
