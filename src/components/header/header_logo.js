import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  KuiIcon,
} from '../icon';

export const KuiHeaderLogo = ({ href, className, ...rest }) => {
  const classes = classNames('kuiHeaderLogo', className);

  return (
    <a href={href} className={classes} {...rest}>
      <KuiIcon
        className="kuiHeaderLogo__icon"
        type="logoKibana"
        size="xLarge"
        title="Go to Kibana home page"
      />
    </a>
  );
};

KuiHeaderLogo.propTypes = {
  href: PropTypes.string,
};
