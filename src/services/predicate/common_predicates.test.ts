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

import { always, never, isNil, isUndefined, isNull } from './common_predicates';

describe('common predicates', () => {
  test('always', () => {
    [undefined, null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      value => {
        expect(always(value)).toBe(true);
      }
    );
  });

  test('never', () => {
    [undefined, null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      value => {
        expect(never(value)).toBe(false);
      }
    );
  });

  test('isUndefined', () => {
    [undefined].forEach(value => {
      expect(isUndefined(value)).toBe(true);
    });
    [null, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(value => {
      expect(isUndefined(value)).toBe(false);
    });
  });

  test('isNull', () => {
    [null].forEach(value => {
      expect(isNull(value)).toBe(true);
    });
    [undefined, 'a', 1, true, false, Date.now(), {}, [], /.*/].forEach(
      value => {
        expect(isNull(value)).toBe(false);
      }
    );
  });

  test('isNil', () => {
    [undefined, null].forEach(value => {
      expect(isNil(value)).toBe(true);
    });
    ['a', 1, true, false, Date.now(), {}, [], /.*/].forEach(value => {
      expect(isNil(value)).toBe(false);
    });
  });
});
