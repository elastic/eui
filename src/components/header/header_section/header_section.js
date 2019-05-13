import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const sideToClassNameMap = {
  left: 'euiHeaderSection--left',
  right: 'euiHeaderSection--right',
};

const SIDES = Object.keys(sideToClassNameMap);

export const EuiHeaderSection = ({
  side,
  children,
  className,
  grow,
  ...rest
}) => {
  const classes = classNames(
    'euiHeaderSection',
    {
      'euiHeaderSection--grow': grow,
      'euiHeaderSection--dontGrow': !grow,
    },
    sideToClassNameMap[side],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiHeaderSection.propTypes = {
  side: PropTypes.oneOf(SIDES),
  grow: PropTypes.bool,
};

EuiHeaderSection.defaultProps = {
  side: 'left',
  grow: false,
};
