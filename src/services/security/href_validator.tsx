/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import URL from 'url-parse';

export function validateHref(href: string) {
  // check href and treat it as invalid if it uses the javascript: protocol
  const parts = new URL(href);
  // eslint-disable-next-line no-script-url
  return parts.protocol !== 'javascript:';
}
