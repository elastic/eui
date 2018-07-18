import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  COLORS,
  EuiTextColor,
} from './text_color';

import {
  ALIGNMENTS,
  EuiTextAlign,
} from './text_align';

const textSizeToClassNameMap = {
  s: 'euiText--small',
  xs: 'euiText--extraSmall',
};

export const TEXT_SIZES = Object.keys(textSizeToClassNameMap);

export const EuiText = ({ size, color, grow, textAlign, children, className, ...rest }) => {

  const classes = classNames(
    'euiText',
    textSizeToClassNameMap[size],
    className, {
      'euiText--constrainedWidth': !grow
    }
  );

  let optionallyAlteredText;
  if (color) {
    optionallyAlteredText = (
      <EuiTextColor color={color} component="div">
        {children}
      </EuiTextColor>
    );
  }

  if (textAlign) {
    optionallyAlteredText = (
      <EuiTextAlign textAlign={textAlign}>
        {optionallyAlteredText || children}
      </EuiTextAlign>
    );
  }

  return (
    <div className={classes} {...rest}>
      {optionallyAlteredText || children}
    </div>
  );
};

EuiText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(TEXT_SIZES),
  color: PropTypes.oneOf(COLORS),
  textAlign: PropTypes.oneOf(ALIGNMENTS),
  grow: PropTypes.bool,
};

EuiText.defaultProps = {
  grow: true,
};
