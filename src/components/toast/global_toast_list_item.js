import {
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiGlobalToastListItem = ({ isDismissed, children }) => {
  const classes = classNames('kuiGlobalToastListItem', children.props.className, {
    'kuiGlobalToastListItem-isDismissed': isDismissed,
  });

  return cloneElement(children, Object.assign({}, children.props, {
    className: classes,
  }));
};

EuiGlobalToastListItem.propTypes = {
  isDismissed: PropTypes.bool,
  children: PropTypes.node,
};
