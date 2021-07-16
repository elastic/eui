/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Secures outbound links. For more info:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
import { isDomainSecure } from '../url';

export const getSecureRelForTarget = ({
  href,
  target = '',
  rel,
}: {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  rel?: string;
}) => {
  const isElasticHref = !!href && isDomainSecure(href);
  const relParts = !!rel
    ? rel.split(' ').filter((part) => !!part.length && part !== 'noreferrer')
    : [];

  if (!isElasticHref) {
    relParts.push('noreferrer');
  }

  if (target.includes('_blank') && relParts.indexOf('noopener') === -1) {
    relParts.push('noopener');
  }

  return relParts.sort().join(' ').trim();
};
