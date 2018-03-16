import React from 'react';
import PropTypes from 'prop-types';

import { EuiIcon } from '../icon';
import { EuiToolTip } from './tool_tip';

export const EuiIconTip = ({ type, ...rest }) => (
  <EuiToolTip {...rest}>
    <EuiIcon type={type} />
  </EuiToolTip>
);

EuiIconTip.propTypes = {
  /**
   * The icon type.
   */
  type: PropTypes.string,
};

EuiIconTip.defaultProps = {
  type: 'questionInCircle',
};
