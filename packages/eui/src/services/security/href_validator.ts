/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const getProtocol = (href: string): string | undefined => {
  const normalized = href
    .replace(/[\u0009\u000a\u000d]/g, '')
    .replace(/^[\u0000-\u0020]+/, '');

  return /^([a-z][a-z\d+.-]*):/i.exec(normalized)?.[1].toLowerCase();
};

export const validateHref = (href: string): boolean =>
  getProtocol(href) !== 'javascript';
