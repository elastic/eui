import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiBottomBar--paddingSmall',
  m: 'euiBottomBar--paddingMedium',
  l: 'euiBottomBar--paddingLarge',
};

export const PADDING_SIZES = Object.keys(paddingSizeToClassNameMap);

export const EuiBottomBar = ({
  children,
  className,
  paddingSize,
  ...rest
}) => {
  const classes = classNames(
    'euiBottomBar',
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
  paddingSize: PropTypes.oneOf(PADDING_SIZES),
};

EuiBottomBar.defaultProps = {
  paddingSize: 'm',
};
