import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiButtonEmpty,
} from '..';

export const EuiPaginationButton = ({
  children,
  className,
  isActive,
  isPlaceholder,
  hideOnMobile,
  ...rest,
}) => {
  const classes = classNames('kuiPaginationButton', className, {
    'kuiPaginationButton-isActive': isActive,
    'kuiPaginationButton-isPlaceholder': isPlaceholder,
    'kuiPaginationButton--hideOnMobile': hideOnMobile,
  });

  return (
    <EuiButtonEmpty
      className={classes}
      size="small"
      type="text"
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
