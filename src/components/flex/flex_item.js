import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const GROW_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const EuiFlexItem = ({
  children,
  className,
  grow,
  ...rest,
}) => {
  const classes = classNames(
    'euiFlexItem',
    {
      'euiFlexItem--flexGrowZero': !grow,
      [`euiFlexItem--flexGrow${grow}`]: GROW_SIZES.indexOf(grow) >= 0
    },
    className
  );

  let originalChildren;

  if (typeof children === 'string' || Array.isArray(children) || typeof children === 'undefined') {
    originalChildren = (
      <div>{children}</div>
    );
  } else {
    originalChildren = children;
  }

  return cloneElement(originalChildren, {
    className: classes,
    ...rest
  });
};

function growPropType(props, propName, componentName) {
  const value = props[propName];

  const validValues = [
    null, undefined,
    true, false,
    ...GROW_SIZES
  ];

  if (validValues.indexOf(value) === -1) {
    return new Error(
      `Prop \`${propName}\` supplied to \`${componentName}\` must be a boolean or an integer between 1 and 10.`
    );
  }
}

EuiFlexItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  grow: growPropType,
};

EuiFlexItem.defaultProps = {
  grow: true,
};
