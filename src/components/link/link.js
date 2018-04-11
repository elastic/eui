import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getSecureRelForTarget } from '../../services';

const colorsToClassNameMap = {
  'primary': 'euiLink--primary',
  'subdued': 'euiLink--subdued',
  'secondary': 'euiLink--secondary',
  'accent': 'euiLink--accent',
  'danger': 'euiLink--danger',
  'warning': 'euiLink--warning',
  'ghost': 'euiLink--ghost',
};

export const COLORS = Object.keys(colorsToClassNameMap);

export const EuiLink = ({
  children,
  color,
  className,
  href,
  target,
  rel,
  type,
  ...rest
}) => {
  const classes = classNames('euiLink', colorsToClassNameMap[color], className);

  if (href === undefined) {
    return (
      <button
        className={classes}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  }

  const secureRel = getSecureRelForTarget(target, rel);

  return (
    <a
      className={classes}
      href={href}
      target={target}
      rel={secureRel}
      {...rest}
    >
      {children}
    </a>
  );
};

EuiLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
};

EuiLink.defaultProps = {
  color: 'primary',
  type: 'button',
};
