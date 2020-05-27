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

import {
  parseRelativeParts,
  toRelativeStringFromParts,
} from './relative_utils';
import moment from 'moment';

describe('parseRelativeParts', () => {
  describe('relative', () => {
    it('should parse now', () => {
      const out = parseRelativeParts('now');
      expect(out).toEqual({
        count: 0,
        unit: 's',
        round: false,
      });
    });

    it('should parse now-2h', () => {
      const out = parseRelativeParts('now-2h');
      expect(out).toEqual({
        count: 2,
        unit: 'h',
        round: false,
      });
    });

    it('should parse now-2h/h', () => {
      const out = parseRelativeParts('now-2h/h');
      expect(out).toEqual({
        count: 2,
        unit: 'h',
        round: true,
        roundUnit: 'h',
      });
    });

    it('should parse now+10m/m', () => {
      const out = parseRelativeParts('now+10m/m');
      expect(out).toEqual({
        count: 10,
        unit: 'm+',
        round: true,
        roundUnit: 'm',
      });
    });
  });

  describe('absolute', () => {
    it('should parse now', () => {
      const out = parseRelativeParts(
        moment()
          .toDate()
          .toISOString()
      );
      expect(out).toEqual({
        count: 0,
        unit: 's',
        round: false,
      });
    });

    it('should parse 3 months ago', () => {
      const out = parseRelativeParts(
        moment()
          .subtract(3, 'M')
          .toDate()
          .toISOString()
      );
      expect(out).toEqual({
        count: 3,
        unit: 'M',
        round: false,
      });
    });

    it('should parse 15 minutes ago', () => {
      const out = parseRelativeParts(
        moment()
          .subtract(15, 'm')
          .toDate()
          .toISOString()
      );
      expect(out).toEqual({
        count: 15,
        unit: 'm',
        round: false,
      });
    });

    it('should parse 2 hours from now', () => {
      const out = parseRelativeParts(
        moment()
          .add(2, 'h')
          .toDate()
          .toISOString()
      );
      expect(out).toEqual({
        count: 2,
        unit: 'h+',
        round: false,
      });
    });
  });
});

describe('toRelativeStringFromParts', () => {
  it('should convert parts to now', () => {
    const out = toRelativeStringFromParts({
      count: 0,
      unit: 's',
      round: false,
    });
    expect(out).toEqual('now');
  });

  it('should convert parts to now-2h', () => {
    const out = toRelativeStringFromParts({
      count: 2,
      unit: 'h',
      round: false,
    });
    expect(out).toEqual('now-2h');
  });

  it('should convert parts to now-2h/h', () => {
    const out = toRelativeStringFromParts({
      count: 2,
      unit: 'h',
      round: true,
    });
    expect(out).toEqual('now-2h/h');
  });

  it('should convert parts to now+10m/m', () => {
    const out = toRelativeStringFromParts({
      count: 10,
      unit: 'm+',
      round: true,
    });
    expect(out).toEqual('now+10m/m');
  });
});
