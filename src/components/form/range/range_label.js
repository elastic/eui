import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiRangeLabel = ({ children, disabled, side }) => {
  const classes = classNames('euiRangeLabel', `euiRangeLabel--${side}`, {
    'euiRangeLabel--isDisabled': disabled,
  });
  return <label className={classes}>{children}</label>;
};

EuiRangeLabel.propTypes = {
  side: PropTypes.oneOf(['min', 'max']),
};
EuiRangeLabel.defaultProps = {
  side: 'max',
};
