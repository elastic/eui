import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiFlexGroup,
  EuiFlexItem,
} from '../flex';

import {
  EuiIcon,
} from '../icon';

export const EuiFilterSelectItem = ({
  children,
  className,
  disabled,
  isSelected,
  ...rest,
}) => {
  const classes = classNames('euiFilterSelectItem', className);

  return (
    <button
      className={classes}
      type="button"
      disabled={disabled}
      {...rest}
    >
      <EuiFlexGroup
        alignItems="center"
        gutterSize="s"
        component="span"
      >
        <EuiFlexItem grow={false}>
          <EuiIcon type={isSelected ? 'checkInCircleFilled' : 'empty'} />
        </EuiFlexItem>
        <EuiFlexItem>
          {children}
        </EuiFlexItem>
      </EuiFlexGroup>
    </button>
  );
};

EuiFilterSelectItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
