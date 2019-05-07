import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
  IconPropType,
} from '../icon';

export const EuiHeaderLogo = ({ iconType, iconTitle, href, children, className, ...rest }) => {
  const classes = classNames('euiHeaderLogo', className);

  return (
    <a href={href} className={classes} {...rest}>
      <EuiIcon
        className="euiHeaderLogo__icon"
        size="l"
        type={iconType}
        title={iconTitle}
      />

      {children &&
        <span className="euiHeaderLogo__text">{children}</span>
      }
    </a>
  );
};

EuiHeaderLogo.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  iconType: IconPropType,
  iconTitle: PropTypes.string,
};

EuiHeaderLogo.defaultProps = {
  iconType: 'logoElastic',
  iconTitle: 'Elastic',
};
