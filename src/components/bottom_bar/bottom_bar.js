import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const paddingSizeToClassNameMap = {
  'none': null,
  's': 'kuiBottomBar--paddingSmall',
  'm': 'kuiBottomBar--paddingMedium',
  'l': 'kuiBottomBar--paddingLarge',
};

export const SIZES = Object.keys(paddingSizeToClassNameMap);

export const EuiBottomBar = ({
  children,
  className,
  paddingSize,
  ...rest,
}) => {
  const classes = classNames(
    'kuiBottomBar',
    paddingSizeToClassNameMap[paddingSize],
    className
  );

  return (
    <div
      className={classes}
      {...rest}
    >
      {children}
    </div>
  );
};

EuiBottomBar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

EuiBottomBar.defaultProps = {
  paddingSize: 'm',
};
