import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  COLORS,
  colorsToClassNameMap,
} from './text_color';

import {
  ALIGNMENTS,
  alignmentToClassNameMap,
} from './text_align';

import {
  FONT_FAMILIES,
  fontFamiliesToClassNameMap,
} from './text_font_family';

const textSizeToClassNameMap = {
  s: 'euiText--small',
  xs: 'euiText--extraSmall',
};

export const TEXT_SIZES = Object.keys(textSizeToClassNameMap);

export const EuiText = ({
  size,
  color,
  fontFamily,
  textAlign,
  children,
  className,
  ...rest
}) => {

  const classes = classNames(
    'euiText',
    textSizeToClassNameMap[size],
    fontFamiliesToClassNameMap[fontFamily],
    alignmentToClassNameMap[textAlign],
    colorsToClassNameMap[color],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

EuiText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(TEXT_SIZES),
  color: PropTypes.oneOf(COLORS),
  fontFamily: PropTypes.oneOf(FONT_FAMILIES),
  textAlign: PropTypes.oneOf(ALIGNMENTS),
};
