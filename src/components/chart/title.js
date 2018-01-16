import {
  cloneElement,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const titleSizeToClassNameMap = {
  s: 'euiTitle--small',
  l: 'euiTitle--large',
};

export const TITLE_SIZES = Object.keys(titleSizeToClassNameMap);

export const EuiTitle = ({ size, children, className, ...rest }) => {

  const classes = classNames(
    'euiTitle',
    titleSizeToClassNameMap[size],
    className
  );

  const props = {
    className: classes,
    ...rest
  };

  return cloneElement(children, props);
};

EuiTitle.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(TITLE_SIZES),
};
