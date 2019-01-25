import React from 'react';
import PropTypes from 'prop-types';

export const EuiRangeLabel = ({ children, side }) => (
  <label className={`euiRange__${side}Label`}>
    {children}
  </label>
);

EuiRangeLabel.propTypes = {
  side: PropTypes.string.isRequired
};
