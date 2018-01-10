import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiButtonEmpty,
} from '../button';

export const EuiPaginationButton = ({
  children,
  className,
  isActive,
  isPlaceholder,
  hideOnMobile,
  ...rest
}) => {
  const classes = classNames('euiPaginationButton', className, {
    'euiPaginationButton-isActive': isActive,
    'euiPaginationButton-isPlaceholder': isPlaceholder,
    'euiPaginationButton--hideOnMobile': hideOnMobile,
  });

  return (
    <EuiButtonEmpty
      className={classes}
      size="s"
      color="text"
      {...rest}
    >
      {children}
    </EuiButtonEmpty>
  );
};

EuiPaginationButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  isPlaceholder: PropTypes.bool,
  hideOnMobile: PropTypes.bool,
};

EuiPaginationButton.defaultProps = {
  children: <span>&hellip;</span>,
};
