import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sideToClassNameMap = {
  left: 'kuiHeaderSection--left',
  right: 'kuiHeaderSection--right',
};

const SIDES = Object.keys(sideToClassNameMap);

export const EuiHeaderSection = ({ side, children, className, ...rest }) => {
  const classes = classNames('kuiHeaderSection', sideToClassNameMap[side], className);

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
