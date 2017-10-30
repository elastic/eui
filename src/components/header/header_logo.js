import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

export const EuiHeaderLogo = ({ iconType, iconTitle, href, className, ...rest }) => {
  const classes = classNames('euiHeaderLogo', className);

  return (
    <a href={href} className={classes} {...rest}>
      <EuiIcon
        className="euiHeaderLogo__icon"
        size="xl"
        type={iconType}
        title={iconTitle}
      />
    </a>
  );
};

EuiHeaderLogo.propTypes = {
  href: PropTypes.string,
};

EuiHeaderLogo.defaultProps = {
  iconType: 'logoElastic'
};
