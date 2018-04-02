import {
  cloneElement,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const titleSizeToClassNameMap = {
  xxxs: 'euiTitle--xxxsmall',
  xxs: 'euiTitle--xxsmall',
  xs: 'euiTitle--xsmall',
  s: 'euiTitle--small',
  m: 'euiTitle--medium',
  l: 'euiTitle--large',
};

export const TITLE_SIZES = Object.keys(titleSizeToClassNameMap);

export const EuiTitle = ({ size, children, className, uppercase, ...rest }) => {

  const classes = classNames(
    'euiTitle',
    titleSizeToClassNameMap[size],
    {
      'euiTitle--uppercase': uppercase,
    },
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
  size: PropTypes.oneOf(TITLE_SIZES).isRequired,
  uppercase: PropTypes.bool,
};

EuiTitle.defaultProps = {
  size: 'm',
};
