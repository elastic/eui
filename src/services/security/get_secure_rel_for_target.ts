/**
 * Secures outbound links. For more info:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
import _ from 'lodash';
import { isDomainSecure } from '../url';

const filter = _.filter;

export const getSecureRelForTarget = ({
  href,
  target,
  rel,
}: {
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  rel?: string;
}) => {
  if (!target || !target.includes('_blank')) {
    return rel;
  }

  const isElasticHref = !!href && isDomainSecure(href);
  const relParts = !!rel
    ? filter(rel.split(' '), part => !!part.length && part !== 'noreferrer')
    : [];

  if (relParts.indexOf('noopener') === -1) {
    relParts.push('noopener');
  }

  if (!isElasticHref) {
    relParts.push('noreferrer');
  }

  return relParts
    .sort()
    .join(' ')
    .trim();
};
