/**
 * Secures outbound links. For more info:
 * https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
export const getSecureRelForTarget = (
  target?: '_blank' | '_self' | '_parent' | '_top' | string,
  rel?: string
) => {
  if (!target) {
    return rel;
  }

  if (!target.includes('_blank')) {
    return rel;
  }

  if (!rel) {
    return 'noopener noreferrer';
  }

  let secureRel = rel;

  if (!secureRel.includes('noopener')) {
    secureRel = `${secureRel} noopener`;
  }

  if (!secureRel.includes('noreferrer')) {
    secureRel = `${secureRel} noreferrer`;
  }

  return secureRel.trim();
};
