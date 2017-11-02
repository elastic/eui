import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../../components';

export const EuiTogglePill = ({
  children,
  className,
  toggleStatus,
  inactive,
  ...rest,
}) => {
  const classes = classNames(
    'euiTogglePill',
    className,
    {
      'euiTogglePill--inactive': inactive,
    },
  );

  let optionalToggleStatus;

  if (toggleStatus) {
    optionalToggleStatus = (
      <EuiFlexItem grow={false} className="euiTogglePill__toggle">
        {toggleStatus}
      </EuiFlexItem>
    );
  }

  return (
    <button
      className={classes}
      {...rest}
    >
      <EuiFlexGroup gutterSize="none" alignItems="center" responsive={false}>
        {optionalToggleStatus}
        <EuiFlexItem grow={false} className="euiTogglePill__title">
          <span className="euiTogglePill__titleText">
            {children}
          </span>
        </EuiFlexItem>
      </EuiFlexGroup>
    </button>
  );
};

EuiTogglePill.propTypes = {
  children: PropTypes.node,
  inactive: PropTypes.bool,
  className: PropTypes.string,
};

EuiTogglePill.defaultProps = {
  inactive: false,
};
