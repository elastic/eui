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

const textTransformToClassNameMap = {
  uppercase: 'euiTitle--uppercase',
};

export const TEXT_TRANSFORM = Object.keys(textTransformToClassNameMap);

export const EuiTitle = ({ size, children, className, textTransform, ...rest }) => {

  const classes = classNames(
    'euiTitle',
    titleSizeToClassNameMap[size],
    textTransformToClassNameMap[textTransform],
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
  textTransform: PropTypes.oneOf(TEXT_TRANSFORM),
};

EuiTitle.defaultProps = {
  size: 'm',
};
