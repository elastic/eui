import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isColorDark, hexToRgb } from '../../services/color';
import { VISUALIZATION_COLORS } from '../../services';

const sizeToClassNameMap = {
  'none': null,
  's': 'euiAvatar--s',
  'm': 'euiAvatar--m',
  'l': 'euiAvatar--l',
  'xl': 'euiAvatar--xl',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const typeToClassNameMap = {
  space: 'euiAvatar--space',
  user: 'euiAvatar--user',
};

const TYPES = Object.keys(typeToClassNameMap);

export const EuiAvatar = ({
  className,
  color,
  imageUrl,
  initials,
  initialsLength,
  name,
  size,
  type,
  ...rest
}) => {
  const classes = classNames(
    'euiAvatar',
    sizeToClassNameMap[size],
    typeToClassNameMap[type],
    className
  );

  let optionalInitial;
  if (name && !imageUrl) {
    // Calculate the number of initials to show, maxing out at 2
    let calculatedInitialsLength = initials ? initials.split(' ').length : name.split(' ').length;
    calculatedInitialsLength = calculatedInitialsLength > 2 ? 2 : calculatedInitialsLength;

    // Check if initialsLength was passed and set to calculated, unless greater than 2
    if (initialsLength) {
      calculatedInitialsLength = initialsLength <= 2 ? initialsLength : 2;
    }

    let calculatedInitials;
    // A. Set to initials prop if exists (but trancate to 2 characters max unless length is supplied)
    if (initials) {
      calculatedInitials = initials.substring(0, calculatedInitialsLength);
    } else {
      if (name.split(' ').length > 1) {
        // B. If there are any spaces in the name, set to first letter of each word
        calculatedInitials = name.match(/\b(\w)/g).join('').substring(0, calculatedInitialsLength);
      } else {
        // C. Set to the name's initials truncated based on calculated length
        calculatedInitials = name.substring(0, calculatedInitialsLength);
      }
    }

    optionalInitial = (
      <span aria-hidden="true">{calculatedInitials}</span>
    );
  }

  const assignedColor = color || VISUALIZATION_COLORS[Math.floor(name.length % VISUALIZATION_COLORS.length)];
  const textColor = isColorDark(...hexToRgb(assignedColor)) ? '#FFFFFF' : '#000000';

  const avatarStyle = {
    backgroundImage: imageUrl ? `url(${  imageUrl  })` : 'none',
    backgroundColor: assignedColor,
    color: textColor,
  };

  return (
    <div
      className={classes}
      style={avatarStyle}
      aria-label={name}
      title={name}
      {...rest}
    >
      {optionalInitial}
    </div>
  );
};

// TODO: Migrate to a service
function checkValidColor(props, propName, componentName) {
  const validHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(props.color);
  if (props.color && !validHex) {
    throw new Error(
      `${componentName} needs to pass a valid color. This can either be a three ` +
      `or six character hex value`
    );
  }
}

function checkValidInitials(props, propName, componentName) {
  // Must be the number "1" or "2"
  if (props.initialsLength && props.initialsLength > 2) {
    throw new Error(
      `${componentName} only accepts 1 or 2 for the initials as a number`
    );
  }

  // Must be a string of 1 or 2 characters
  if (props.initials && props.initials.length > 2) {
    throw new Error(
      `${componentName} only accepts a max of 2 characters for the initials as a string`
    );
  }
}

EuiAvatar.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.oneOf(SIZES),

  /**
   * Full name of avatar for title attribute and calculating initial if not provided
   */
  name: PropTypes.string.isRequired,

  /**
   * Accepts hex value `#FFFFFF`, `#000` otherwise a viz palette color will be assigned
   */
  color: checkValidColor,

  /**
   * Specify how many characters to show (max 2 allowed).
   * By default, will show based on number of words.
   */
  initialsLength: checkValidInitials,

  /**
   * Custom initials (max 2 characters).
   * By default will take the first character (of each word).
   */
  initials: checkValidInitials,

  /**
   * The type of avatar to this is displaying
   */
  type: PropTypes.oneOf(TYPES),
};

EuiAvatar.defaultProps = {
  size: 'm',
  type: 'user',
};
