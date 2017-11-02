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
  toggleText,
  active,
  ...rest,
}) => {
  const classes = classNames(
    'euiTogglePill',
    className,
    {
      'euiTogglePill--active': active,
    },
  );

  return (
    <button
      className={classes}
      {...rest}
    >
      <EuiFlexGroup gutterSize="none" responsive={false}>
        <EuiFlexItem grow={false} className="euiTogglePill__title">
          <span className="euiTogglePill__titleText">
            {children}
          </span>
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="euiTogglePill__toggle">
          {toggleText}
        </EuiFlexItem>
      </EuiFlexGroup>
    </button>
  );
};

EuiTogglePill.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  className: PropTypes.string,
};
