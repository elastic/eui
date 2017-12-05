import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VISUALIZATION_COLORS } from '../../services/colors/visualization_colors';

const sizeToClassNameMap = {
  'none': null,
  's': 'euiAvatar--s',
  'm': 'euiAvatar--m',
  'l': 'euiAvatar--l',
  'xl': 'euiAvatar--xl',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiAvatar = ({
  imageUrl,
  name,
  className,
  size,
  ...rest
}) => {
  const classes = classNames(
    'euiAvatar',
    sizeToClassNameMap[size],
    className
  );

  let optionalInitial;
  if (name && !imageUrl) {
    optionalInitial = (
      <span aria-hidden="true">{name.substring(0, 1)}</span>
    );
  }

  const assignedColor = VISUALIZATION_COLORS[Math.floor(name.length % VISUALIZATION_COLORS.length)];

  const avatarStyle = {
    backgroundImage: imageUrl ? 'url(' + imageUrl + ')' : 'none',
    backgroundColor: assignedColor,
  };

  return (
    <div
      className={classes}
      style={avatarStyle}
      aria-label={name}
      {...rest}
    >
      {optionalInitial}
    </div>
  );
};

EuiAvatar.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(SIZES),
};

EuiAvatar.defaultProps = {
  size: 'm',
};
