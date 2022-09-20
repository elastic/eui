/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps, ExclusiveUnion } from '../common';
import classNames from 'classnames';

import { isColorDark, hexToRgb, isValidHex } from '../../services/color';
import {
  euiPaletteColorBlindBehindText,
  toInitials,
  useEuiTheme,
} from '../../services';
import { IconType, EuiIcon, IconSize, IconColor } from '../icon';

import { euiAvatarStyles } from './avatar.styles';

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type EuiAvatarSize = typeof SIZES[number];

export const TYPES = ['space', 'user'] as const;
export type EuiAvatarType = typeof TYPES[number];

/**
 * The avatar can only display one type of content,
 * initials, or image, or iconType
 */
type _EuiAvatarContent = ExclusiveUnion<
  ExclusiveUnion<
    {
      /**
       * Custom initials (max 2 characters).
       * By default will take the first character (of each word).
       */
      initials?: string;

      /**
       * Specify how many characters to show (1 or 2).
       * By default, will show based on number of words (max first 2).
       */
      initialsLength?: 1 | 2;
    },
    {
      /**
       * Path to an image to display instead of initials
       */
      imageUrl: string;
    }
  >,
  {
    /**
     * Any EUI glyph, logo or custom icon to display instead of initials
     */
    iconType: IconType;
    /**
     * Manually change icon size
     */
    iconSize?: IconSize;
    /**
     * Manually change icon color
     */
    iconColor?: IconColor | null;
  }
>;

export type EuiAvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> &
  CommonProps &
  _EuiAvatarContent & {
    /**
     * Full name of avatar for title attribute and calculating initial if not provided
     */
    name: string;

    /**
     * Accepts hex values like `#FFFFFF`, `#000` otherwise a viz palette color will be assigned.
     * Or pass `'plain'` for an empty shade, `'subdued'` for a light gray shade or `null` to remove entirely and the text/icon color will `inherit`
     */
    color?: string | 'plain' | 'subdued' | null;

    /**
     * The type of avatar mainly controlling the shape.
     * `user` = circle
     * `space` = rounded square
     */
    type?: EuiAvatarType;
    size?: EuiAvatarSize;

    /**
     * Grays out the avatar to simulate being disabled
     */
    isDisabled?: boolean;
  };

export const EuiAvatar: FunctionComponent<EuiAvatarProps> = ({
  className,
  color,
  imageUrl,
  initials,
  initialsLength,
  iconType,
  iconSize,
  iconColor,
  name,
  size = 'm',
  type = 'user',
  isDisabled = false,
  style,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiAvatarStyles(euiTheme);

  const visColors = euiPaletteColorBlindBehindText();

  const isPlain = color === 'plain';
  const isSubdued = color === 'subdued';

  const classes = classNames(
    'euiAvatar',
    {
      [`euiAvatar--${size}`]: size,
      [`euiAvatar--${type}`]: type,
      'euiAvatar-isDisabled': isDisabled,
    },
    className
  );

  const cssStyles = [
    styles.euiAvatar,
    styles[size],
    styles[type],
    isPlain && styles.plain,
    isSubdued && styles.subdued,
    isDisabled && styles.isDisabled,
  ];

  checkValidInitials(initials);

  const avatarStyle = { ...style };

  let iconCustomColor = iconColor;

  const isNamedColor =
    color === 'plain' || color === 'subdued' || color === null;

  if (!isNamedColor) {
    checkValidColor(color);

    const assignedColor =
      color || visColors[Math.floor(name.length % visColors.length)];
    const textColor = isColorDark(...hexToRgb(assignedColor))
      ? '#FFFFFF'
      : '#000000';

    avatarStyle.backgroundColor = assignedColor;
    avatarStyle.color = textColor;

    // Allow consumers to let the icons keep their default color (like app icons)
    // when passing `iconColor = null`, otherwise continue to pass on `iconColor` or adjust with textColor
    iconCustomColor = iconColor || iconColor === null ? iconColor : textColor;
  }

  if (imageUrl) {
    avatarStyle.backgroundImage = `url(${imageUrl})`;
  }

  let content;
  if (!imageUrl && !iconType) {
    // Create the initials
    const calculatedInitials = toInitials(name, initialsLength, initials);
    content = <span aria-hidden="true">{calculatedInitials}</span>;
  } else if (iconType) {
    content = (
      <EuiIcon
        className="euiAvatar__icon"
        size={iconSize || size}
        type={iconType}
        color={iconCustomColor === null ? undefined : iconCustomColor}
      />
    );
  }

  return (
    <div
      css={cssStyles}
      className={classes}
      style={avatarStyle}
      aria-label={isDisabled ? undefined : name}
      role={isDisabled ? 'presentation' : 'img'}
      title={name}
      {...rest}
    >
      {content}
    </div>
  );
};

// TODO: Migrate to a service
export const checkValidColor = (color: EuiAvatarProps['color']) => {
  const validHex =
    (color && isValidHex(color)) || color === 'plain' || color === 'subdued';
  if (color && !validHex) {
    throw new Error(
      'EuiAvatar needs to pass a valid color. This can either be a three ' +
        'or six character hex value'
    );
  }
};

function checkValidInitials(initials: EuiAvatarProps['initials']) {
  // Must be a string of 1 or 2 characters
  if (initials && initials.length > 2) {
    console.warn(
      'EuiAvatar only accepts a max of 2 characters for the initials as a string. It is displaying only the first 2 characters.'
    );
  }
}
