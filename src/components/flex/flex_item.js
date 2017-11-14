import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiFlexItem = ({ children, className, grow, ...rest }) => {
  const classes = classNames(
    'euiFlexItem',
    {
      'euiFlexItem--flexGrowZero': !grow,
      [`euiFlexItem--flexGrow${grow}`]: Number(parseInt(grow)) === grow && grow >= 1 && grow <= 10
    },
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

EuiFlexItem.propTypes = {
  children: PropTypes.node,
  grow: growPropType
};

function growPropType(props, propName, componentName) {
  const value = props[propName];

  const validValues = [
    null, undefined,
    true, false,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];

  if (validValues.indexOf(value) === -1) {
    return new Error(
      'Prop `' + propName + '` supplied to' + ' `' + componentName + '` must be a boolean or an integer between 1 and 10.'
    );
  }
}

EuiFlexItem.defaultProps = {
  grow: true,
};
