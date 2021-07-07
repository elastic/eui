/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
