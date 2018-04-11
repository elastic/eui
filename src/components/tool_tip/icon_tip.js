import React from 'react';
import PropTypes from 'prop-types';

import { EuiIcon } from '../icon';
import { EuiToolTip } from './tool_tip';

export const EuiIconTip = ({ type, 'aria-label': ariaLabel, color, ...rest }) => (
  <EuiToolTip {...rest}>
    <EuiIcon tabIndex="0" type={type} color={color} aria-label={ariaLabel} />
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
   * Explain what this icon means for screen readers.
   */
  'aria-label': PropTypes.string,
};

EuiIconTip.defaultProps = {
  type: 'questionInCircle',
  'aria-label': 'Info',
};
