import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../components';

export const EuiDateTimeInput = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames('euiDateTimeInput', className);

  return (
    <div
      className={classes}
      {...rest}
    >
      <EuiFlexGroup alignItems="center">
        <EuiFlexItem>
          <input
            type="text"
            className="euiDateTimeInput__field"
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon iconType="clock" color="text" />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButtonIcon iconType="clock" color="text" />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

EuiDateTimeInput.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
