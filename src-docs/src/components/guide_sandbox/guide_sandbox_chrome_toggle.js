import React from 'react';
import PropTypes from 'prop-types';

import {
  EuiIcon,
} from '../../../../src/components';

export const GuideSandboxChromeToggle = ({
  onClick,
}) => (
  <button className="guideSandboxChromeToggle" onClick={onClick}>
    <EuiIcon type="help" size="m" />
  </button>
);

GuideSandboxChromeToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};
