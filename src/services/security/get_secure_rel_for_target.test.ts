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

import { getSecureRelForTarget } from './get_secure_rel_for_target';

describe('getSecureRelForTarget', () => {
  describe('returns rel and noreferrer', () => {
    test('when target is not supplied', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: undefined,
          rel: 'hello',
        })
      ).toBe('hello noreferrer');
    });

    test('when target is empty', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: '',
          rel: 'hello',
        })
      ).toBe('hello noreferrer');
    });

    test('when target is not _blank', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: '_self',
          rel: 'hello',
        })
      ).toBe('hello noreferrer');
    });
  });

  describe('returns noopener noreferrer when domain is unsafe', () => {
    test('when href is not specified', () => {
      expect(
        getSecureRelForTarget({
          href: undefined,
          target: '_blank',
          rel: undefined,
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains neither', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://www.google.com/',
          target: '_blank',
          rel: undefined,
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains both', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://wwwelastic.co/',
          target: '_blank',
          rel: 'noopener noreferrer',
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains noopener', () => {
      expect(
        getSecureRelForTarget({
          href: 'wss://www.elastic.co/',
          target: '_blank',
          rel: 'noopener',
        })
      ).toBe('noopener noreferrer');
    });

    test('when rel contains noreferrer', () => {
      expect(
        getSecureRelForTarget({
          href: 'smb://www.elastic.co/',
          target: '_blank',
          rel: 'noreferrer',
        })
      ).toBe('noopener noreferrer');
    });

    test('including the original rel value', () => {
      expect(
        getSecureRelForTarget({
          href: '/foo/bar',
          target: '_blank',
          rel: 'nofollow',
        })
      ).toBe('nofollow noopener noreferrer');
    });
  });

  describe('returns noopener when domain is safe', () => {
    test('when rel contains neither', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://www.elastic.co',
          target: '_blank',
          rel: undefined,
        })
      ).toBe('noopener');
    });

    test('when rel contains both', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://www.elastic.co',
          target: '_blank',
          rel: 'noopener noreferrer',
        })
      ).toBe('noopener');
    });

    test('when rel contains noopener', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://docs.elastic.co',
          target: '_blank',
          rel: 'noopener',
        })
      ).toBe('noopener');
    });

    test('when rel contains noreferrer', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://elastic.co',
          target: '_blank',
          rel: 'noreferrer',
        })
      ).toBe('noopener');
    });

    test('including the original rel value', () => {
      expect(
        getSecureRelForTarget({
          href: 'http://discuss.elastic.co',
          target: '_blank',
          rel: 'nofollow',
        })
      ).toBe('nofollow noopener');
    });
  });

  describe('returns no noreferrer when domain is safe without target _blank', () => {
    test('when target and rel is undefined', () => {
      expect(
        getSecureRelForTarget({
          href: 'http://discuss.elastic.co',
          target: undefined,
          rel: undefined,
        })
      ).toBe('');
    });

    test('when rel is specified', () => {
      expect(
        getSecureRelForTarget({
          href: 'https://discuss.elastic.co',
          target: undefined,
          rel: 'nofollow',
        })
      ).toBe('nofollow');
    });
  });
});
