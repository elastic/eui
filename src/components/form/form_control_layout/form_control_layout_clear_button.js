import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';

export const EuiFormControlLayoutClearButton = ({
  className,
  onClick,
  ...rest
}) => {
  const classes = classNames('euiFormControlLayoutIcons__clearButton', className);

  return (
    <button
      className={classes}
      onClick={onClick}
      aria-label="Clear selections"
      {...rest}
    >
      <EuiIcon
        className="euiFormControlLayoutIcons__clearButtonIcon"
        type="cross"
      />
    </button>
  );
};

EuiFormControlLayoutClearButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
