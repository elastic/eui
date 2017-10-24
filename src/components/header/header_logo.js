import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
} from '../icon';

export const EuiHeaderLogo = ({ href, className, ...rest }) => {
  const classes = classNames('euiHeaderLogo', className);

  return (
    <a href={href} className={classes} {...rest}>
      <EuiIcon
        className="euiHeaderLogo__icon"
        type="logoKibana"
        size="xLarge"
        title="Go to Kibana home page"
      />
    </a>
  );
};

EuiHeaderLogo.propTypes = {
  href: PropTypes.string,
};
