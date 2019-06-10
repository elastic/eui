/**
 * Secures outbound links. For more info:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
import filter from 'lodash/filter';
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
    ? filter(rel.split(' '), part => !!part.length && part !== 'noreferrer')
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
