/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const isElasticDomain = /(https?:\/\/(.+?\.)?elastic\.co((\/|\?)[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g;

// In order for the domain to be secure the regex
// has to match _and_ the lengths of the match must
// be _exact_ since URL's can have other URL's as
// path or query params!
export const isDomainSecure = (url: string = '') => {
  const matches = url.match(isElasticDomain);

  if (!matches) {
    return false;
  }
  const [match] = matches;

  return match.length === url.length;
};
