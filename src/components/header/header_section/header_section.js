import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sideToClassNameMap = {
  left: 'euiHeaderSection--left',
  right: 'euiHeaderSection--right',
};

const SIDES = Object.keys(sideToClassNameMap);

export const EuiHeaderSection = ({ side, children, className, ...rest }) => {
  const classes = classNames('euiHeaderSection', sideToClassNameMap[side], className);

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiHeaderSection.propTypes = {
  side: PropTypes.oneOf(SIDES),
};

EuiHeaderSection.defaultProps = {
  side: 'left',
};
