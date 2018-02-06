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

const CHECKED_ON = 'on';
const CHECKED_OFF = 'off';

const resolveIconAndColor = (checked) => {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === CHECKED_ON ?
    { icon: 'check', color: 'text' } :
    { icon: 'cross', color: 'text' };
};

export const EuiFilterSelectItem = ({
  children,
  className,
  disabled,
  checked,
  ...rest,
}) => {
  const classes = classNames('euiFilterSelectItem', className);
  const { icon, color } = resolveIconAndColor(checked);
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
          <EuiIcon color={color} type={icon} />
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
  checked: PropTypes.oneOf([ CHECKED_ON, CHECKED_OFF ]),
};
