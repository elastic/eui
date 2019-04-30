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
  const classes = classNames('euiFormControlLayoutCustomIcon', className, {
    'euiFormControlLayoutCustomIcon--clickable': onClick,
  });

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        ref={iconRef}
        {...rest}>
        <EuiIcon
          className="euiFormControlLayoutCustomIcon__icon"
          aria-hidden="true"
          type={type}
        />
      </button>
    );
  }

  return (
    <span className={classes} ref={iconRef} {...rest}>
      <EuiIcon
        className="euiFormControlLayoutCustomIcon__icon"
        aria-hidden="true"
        type={type}
      />
    </span>
  );
};

EuiFormControlLayoutCustomIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  iconRef: PropTypes.func,
};
