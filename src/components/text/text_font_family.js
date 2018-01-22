import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const fontFamiliesToClassNameMap = {
  'default': 'euiTextFontFamily--default',
  'code': 'euiTextFontFamily--code',
};

export const FONT_FAMILIES = Object.keys(fontFamiliesToClassNameMap);

export const EuiTextFontFamily = ({
  children,
  className,
  fontFamily,
  ...rest,
}) => {
  const classes = classNames(
    'euiTextFontFamily',
    fontFamiliesToClassNameMap[fontFamily],
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

EuiTextFontFamily.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fontFamily: PropTypes.string.isRequired,
};
