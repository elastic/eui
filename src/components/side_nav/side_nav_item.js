import {
  Children,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiSideNavItem = ({ children, parent, isSelected }) => {
  const child = Children.only(children);

  const classes = classNames(
    child.props.className,
    'euiSideNavItem',
    {
      'euiSideNavItem-isSelected': isSelected,
      'euiSideNavItem--parent': parent,
    }
  );

  return cloneElement(child, ({ ...child.props, ...{
    className: classes,
  } }));
};

EuiSideNavItem.propTypes = {
  isSelected: PropTypes.bool,
  parent: PropTypes.bool,
};

EuiSideNavItem.defaultProps = {
  parent: false,
  isSelected: false,
};
