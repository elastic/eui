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

const columnsToClassNameMap = {
  0: null,
  2: 'euiText--columns2',
  3: 'euiText--columns3',
  4: 'euiText--columns4',
  5: 'euiText--columns5',
};

export const COLUMNS = Object.keys(columnsToClassNameMap);

export const EuiText = ({ size, color, grow, textAlign, columns, children, className, ...rest }) => {

  const classes = classNames(
    'euiText',
    textSizeToClassNameMap[size],
    columnsToClassNameMap[columns],
    className, {
      'euiText--constrainedWidth': !grow,
    },
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
  columns: PropTypes.oneOf(COLUMNS),
  grow: PropTypes.bool,
};

EuiText.defaultProps = {
  grow: true,
  columns: '0',
};
