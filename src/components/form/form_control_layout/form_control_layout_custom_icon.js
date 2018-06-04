import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';

export const EuiFormControlLayoutCustomIcon = ({
  className,
  onClick,
  type,
  iconRef,
  ...rest
}) => {
  const classes = classNames(
    'euiFormControlLayoutIcons__customIcon',
    className,
    {
      'euiFormControlLayoutIcons__customIcon--clickable': onClick,
    },
  );

  if (onClick) {
    return (
      <button
        className={classes}
        onClick={onClick}
        ref={iconRef}
        {...rest}
      >
        <EuiIcon
          type={type}
        />
      </button>
    );
  }

  return (
    <EuiIcon
      aria-hidden="true"
      className={classes}
      type={type}
      {...rest}
    />
  );
};

EuiFormControlLayoutCustomIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  iconRef: PropTypes.func,
};
