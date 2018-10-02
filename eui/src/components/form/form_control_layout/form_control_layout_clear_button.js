import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';

export const EuiFormControlLayoutClearButton = ({
  className,
  onClick,
  ...rest
}) => {
  const classes = classNames('euiFormControlLayoutClearButton', className);

  return (
    <button
      className={classes}
      onClick={onClick}
      aria-label="Clear input"
      {...rest}
    >
      <EuiIcon
        className="euiFormControlLayoutClearButton__icon"
        type="cross"
      />
    </button>
  );
};

EuiFormControlLayoutClearButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
