import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiIcon,
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
    <div
      className={classes}
      {...rest}
    >
      <EuiFlexGroup gutterSize="none">
        <EuiFlexItem grow={false} className="euiTogglePill__title">
          <div>
            <span>{children}</span>
            <EuiIcon type="arrowDown" className="euiTogglePill__icon" />
          </div>
        </EuiFlexItem>
        <EuiFlexItem grow={false} className="euiTogglePill__toggle">
          {toggleText}
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

EuiTogglePill.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  className: PropTypes.string,
};
