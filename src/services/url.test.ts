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

import { isDomainSecure } from './url';

describe('url', () => {
  describe('#isDomainSecure', () => {
    it('returns true for secure domains', () => {
      expect(isDomainSecure('https://elastic.co')).toEqual(true);
      expect(isDomainSecure('https://elastic.co?foo=bar')).toEqual(true);
      expect(isDomainSecure('https://elastic.co/')).toEqual(true);
      expect(isDomainSecure('https://www.elastic.co')).toEqual(true);
      expect(isDomainSecure('https://docs.elastic.co')).toEqual(true);
      expect(isDomainSecure('https://stats.elastic.co')).toEqual(true);
      expect(isDomainSecure('https://lots.of.kids.elastic.co')).toEqual(true);
      expect(
        isDomainSecure('https://elastic.co/cool/url/with?lots=of&params')
      ).toEqual(true);
    });

    it('returns false for unsecure domains', () => {
      expect(isDomainSecure('https://wwwelastic.co')).toEqual(false);
      expect(isDomainSecure('https://www.zelastic.co')).toEqual(false);
      expect(isDomainSecure('https://*elastic.co')).toEqual(false);
      expect(isDomainSecure('http://elastic.com')).toEqual(false);
      expect(isDomainSecure('https://elastic.co.now')).toEqual(false);
      expect(isDomainSecure('elastic.co')).toEqual(false);
      expect(isDomainSecure('smb://www.elastic.co')).toEqual(false);
      expect(
        isDomainSecure(
          'https://wwwelastic.co/cool/url/with?lots=of&params/https://elastic.co'
        )
      ).toEqual(false);
    });
  });
});
