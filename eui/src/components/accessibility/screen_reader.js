import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const EuiScreenReaderOnly = ({ children }) => {
  const classes = classNames('euiScreenReaderOnly', children.props.className);

  const props = ({ ...children.props, ...{
    className: classes
  } });

  return cloneElement(children, props);
};

EuiScreenReaderOnly.propTypes = {
  children: PropTypes.node
};
