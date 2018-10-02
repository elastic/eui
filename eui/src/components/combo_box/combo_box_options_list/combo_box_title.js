import React from 'react';
import PropTypes from 'prop-types';

export const EuiComboBoxTitle = ({ children }) => (
  <div className="euiComboBoxTitle">{children}</div>
);

EuiComboBoxTitle.propTypes = {
  children: PropTypes.node,
};
