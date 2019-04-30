import React from 'react';
import PropTypes from 'prop-types';

import { EuiIcon } from '../icon';
import { EuiToolTip } from './tool_tip';

export const EuiIconTip = ({
  type,
  'aria-label': ariaLabel,
  color,
  size,
  iconProps,
  ...rest
}) => (
  <EuiToolTip {...rest}>
    <EuiIcon
      tabIndex="0"
      type={type}
      color={color}
      size={size}
      aria-label={ariaLabel}
      {...iconProps}
    />
  </EuiToolTip>
);

EuiIconTip.propTypes = {
  /**
   * The icon type.
   */
  type: PropTypes.string,

  /**
   * The icon color.
   */
  color: PropTypes.string,

  /**
   * The icon size.
   */
  size: PropTypes.string,

  /**
   * Explain what this icon means for screen readers.
   */
  'aria-label': PropTypes.string,

  /**
   * Pass certain props down to `EuiIcon`
   */
  iconProps: PropTypes.object,
};

EuiIconTip.defaultProps = {
  type: 'questionInCircle',
  'aria-label': 'Info',
};
