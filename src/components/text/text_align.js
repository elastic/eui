import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const alignmentToClassNameMap = {
  'left': 'euiTextAlign--left',
  'right': 'euiTextAlign--right',
  'center': 'euiTextAlign--center',
};

export const ALIGNMENTS = Object.keys(alignmentToClassNameMap);

export const EuiTextAlign = ({
  children,
  className,
  textAlign,
  ...rest,
}) => {
  const classes = classNames(
    'euiTextAlign',
    alignmentToClassNameMap[textAlign],
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

EuiTextAlign.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  textAlign: PropTypes.oneOf(ALIGNMENTS),
};

EuiTextAlign.defaultProps = {
  textAlign: 'left',
};
