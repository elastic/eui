import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiGlobalToastListItem = ({ isDismissed, children }) => {
  const classes = classNames(
    'euiGlobalToastListItem',
    children.props.className,
    {
      'euiGlobalToastListItem-isDismissed': isDismissed,
    }
  );

  return cloneElement(children, {
    ...children.props,
    ...{
      className: classes,
    },
  });
};

EuiGlobalToastListItem.propTypes = {
  isDismissed: PropTypes.bool,
  children: PropTypes.node,
};
