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
    'euiFormControlLayoutCustomIcon',
    className,
    {
      'euiFormControlLayoutCustomIcon--clickable': onClick,
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
          className="euiFormControlLayoutCustomIcon__clickableIcon"
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
