import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const borderToClassNameMap = {
  left: 'euiHeaderSectionItem--borderLeft',
  right: 'euiHeaderSectionItem--borderRight',
  none: undefined,
};

const BORDERS = Object.keys(borderToClassNameMap);

export const EuiHeaderSectionItem = ({
  border,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiHeaderSectionItem',
    borderToClassNameMap[border],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiHeaderSectionItem.propTypes = {
  border: PropTypes.oneOf(BORDERS),
};

EuiHeaderSectionItem.defaultProps = {
  border: 'left',
};
