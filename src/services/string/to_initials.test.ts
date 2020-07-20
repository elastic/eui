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

import { toInitials } from './to_initials';

describe('toInitials', () => {
  const NAMES = [
    'Single',
    'Two words',
    'More Than Two Words',
    'lowercase words',
  ];

  const INITIALS_BY_DEFAULT = ['S', 'Tw', 'MT', 'lw'];
  const INITIALS_BY_2 = ['Si', 'Tw', 'MT', 'lw'];
  const INITIALS_BY_1 = ['S', 'T', 'M', 'l'];

  NAMES.forEach((name, index) => {
    it(`should return only the first letter of each word in '${name}'`, () => {
      expect(toInitials(name)).toBe(INITIALS_BY_DEFAULT[index]);
    });

    it(`should return two letters when initialsLength is 2 for '${name}'`, () => {
      expect(toInitials(name, 2)).toBe(INITIALS_BY_2[index]);
    });

    it(`should return one letter when initialsLength is 1 for '${name}'`, () => {
      expect(toInitials(name, 1)).toBe(INITIALS_BY_1[index]);
    });

    it(`should return the custom initials provided (truncated to 2) instead of '${name}'`, () => {
      expect(toInitials(name, 2, 'INIT')).toBe('IN');
    });
  });
});
