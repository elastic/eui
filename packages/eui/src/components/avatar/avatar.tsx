/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, useMemo } from 'react';
import { CommonProps, ExclusiveUnion } from '../common';
import classNames from 'classnames';
import {
  warnIfContrastBelowMin,
  wcagContrastMin,
} from '../../services/color/contrast';

import {
  isColorDark,
  hexToRgb,
  isValidHex,
  useEuiPaletteColorBlindBehindText,
} from '../../services/color';
import { toInitials, useEuiMemoizedStyles, useEuiTheme } from '../../services';
import { IconType, EuiIcon, IconSize, IconColor } from '../icon';

import { euiAvatarStyles } from './avatar.styles';

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type EuiAvatarSize = (typeof SIZES)[number];

export const TYPES = ['space', 'user'] as const;
export type EuiAvatarType = (typeof TYPES)[number];

export const CASING = ['capitalize', 'uppercase', 'lowercase', 'none'] as const;
export type EuiAvatarCasing = (typeof CASING)[number];

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
     * Sets the letter casing of the displayed initials.
     * Defaults to `uppercase` for `type="user"` avatars.
     * Defaults to `none` (uses the existing casing of the passed `name` or `initials`) for `type="space"` avatars.
     * @default uppercase
     */
    casing?: EuiAvatarCasing;

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
  ...props
}) => {
  checkValidInitials(initials);
  const { casing = type === 'space' ? 'none' : 'uppercase', ...rest } = props;
  const { highContrastMode, euiTheme } = useEuiTheme();

  const visColors = useEuiPaletteColorBlindBehindText();

  const isPlain = color === 'plain';
  const isSubdued = color === 'subdued';
  const isNamedColor = isPlain || isSubdued || color === null;
  const isForcedColors = highContrastMode === 'forced';

  const classes = classNames(
    'euiAvatar',
    {
      [`euiAvatar--${size}`]: size,
      [`euiAvatar--${type}`]: type,
      'euiAvatar-isDisabled': isDisabled,
    },
    className
  );

  const styles = useEuiMemoizedStyles(euiAvatarStyles);
  const cssStyles = [
    styles.euiAvatar,
    styles[type],
    styles[size],
    styles[casing],
    isPlain && styles.plain,
    isSubdued && styles.subdued,
    isDisabled && styles.isDisabled,
  ];

  const avatarStyle = useMemo(() => {
    if (imageUrl) {
      return {
        backgroundImage: `url(${imageUrl})`,
      };
    }
    if (!isNamedColor) {
      checkValidColor(color);

      const assignedColor =
        color || visColors[Math.floor(name.length % visColors.length)];
      const textColor = isColorDark(...hexToRgb(assignedColor))
        ? '#FFFFFF'
        : '#000000';
      warnIfContrastBelowMin(textColor, assignedColor, wcagContrastMin);

      return {
        backgroundColor: assignedColor,
        color: textColor,
      };
    }
  }, [imageUrl, color, isNamedColor, name.length, visColors]);

  const highContrastBorder = useMemo(
    // Render a border since background-colors are ignored in Windows forced contrast themes
    () => (isForcedColors ? { border: euiTheme.border.thin } : undefined),
    [isForcedColors, euiTheme]
  );

  const iconCustomColor = useMemo(() => {
    // Force icons to single colors in forced high contrast mode
    if (isForcedColors) return euiTheme.colors.fullShade;
    // `null` allows icons to keep their default color (e.g. app icons)
    if (iconColor === null) return undefined;
    // Otherwise continue to pass on `iconColor`
    if (iconColor) return iconColor;
    // Fall back to the adjusted text color if it exists
    return avatarStyle?.color;
  }, [iconColor, avatarStyle?.color, isForcedColors, euiTheme]);

  return (
    <div
      css={cssStyles}
      className={classes}
      style={{ ...style, ...avatarStyle, ...highContrastBorder }}
      aria-label={isDisabled ? undefined : name}
      role={isDisabled ? 'presentation' : 'img'}
      title={name}
      {...rest}
    >
      {!imageUrl &&
        (iconType ? (
          <EuiIcon
            className="euiAvatar__icon"
            size={iconSize || size}
            type={iconType}
            color={iconCustomColor}
          />
        ) : (
          <span aria-hidden="true">
            {toInitials(name, initialsLength, initials)}
          </span>
        ))}
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
