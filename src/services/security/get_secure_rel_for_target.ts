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
    ? rel.split(' ').filter(part => !!part.length && part !== 'noreferrer')
    : [];

  if (!isElasticHref) {
    relParts.push('noreferrer');
  }

  if (target.includes('_blank') && relParts.indexOf('noopener') === -1) {
    relParts.push('noopener');
  }

  return relParts
    .sort()
    .join(' ')
    .trim();
};
