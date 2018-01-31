import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiKeyboardAccessible,
} from '../accessibility';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../flex';

export const EuiStatusPill = ({
  children,
  className,
  status,
  inactive,
  onClick,
  ...rest,
}) => {
  const classes = classNames(
    'euiStatusPill',
    className,
    {
      'euiStatusPill--inactive': inactive,
    },
  );

  let optionalToggleStatus;

  if (status) {
    optionalToggleStatus = (
      <EuiFlexItem grow={false} className="euiStatusPill__toggle">
        {status}
      </EuiFlexItem>
    );
  }

  return (
    <EuiKeyboardAccessible>
      <div
        onClick={onClick}
        className={classes}
        {...rest}
      >
        <EuiFlexGroup gutterSize="none" alignItems="center" responsive={false}>
          {optionalToggleStatus}
          <EuiFlexItem grow={false} className="euiStatusPill__title">
            <span className="euiStatusPill__titleText">
              {children}
            </span>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiKeyboardAccessible>
  );
};

EuiStatusPill.propTypes = {
  children: PropTypes.node,
  inactive: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

EuiStatusPill.defaultProps = {
  inactive: false,
};
