import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf, Omit } from '../common';

import { TextColor, EuiTextColor } from './text_color';

import { EuiTextAlign, TextAlignment } from './text_align';

const textSizeToClassNameMap = {
  xs: 'euiText--extraSmall',
  s: 'euiText--small',
  m: 'euiText--medium',
};

export type TextSize = keyof typeof textSizeToClassNameMap;

export const TEXT_SIZES = keysOf(textSizeToClassNameMap);

type Props = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    textAlign?: TextAlignment;
    size?: TextSize;
    color?: TextColor;
    grow?: boolean;
  };

export const EuiText: FunctionComponent<Props> = ({
  size = 'm',
  color,
  grow = true,
  textAlign,
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiText',
    textSizeToClassNameMap[size],
    className,
    {
      'euiText--constrainedWidth': !grow,
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
