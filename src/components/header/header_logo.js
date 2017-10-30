import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

export const EuiHeaderLogo = ({ type, href, className, ...rest }) => {
  const classes = classNames('euiHeaderLogo', className);

  return (
    <a href={href} className={classes} {...rest}>
      <EuiIcon
        className="euiHeaderLogo__icon"
        type={type}
        size="xl"
      />
    </a>
  );
};

EuiHeaderLogo.propTypes = {
  href: PropTypes.string,
};

EuiHeaderLogo.defaultProps = {
  type: 'logoElastic'
};
