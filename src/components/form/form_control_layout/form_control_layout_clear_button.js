import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiIcon } from '../../icon';
import { EuiI18n } from '../../i18n';

export const EuiFormControlLayoutClearButton = ({
  className,
  onClick,
  ...rest
}) => {
  const classes = classNames('euiFormControlLayoutClearButton', className);

  return (
    <EuiI18n token="euiFormControlLayoutClearButton.label" default="Clear input">
      {label => (
        <button
          type="button"
          className={classes}
          onClick={onClick}
          aria-label={label}
          {...rest}
        >
          <EuiIcon
            className="euiFormControlLayoutClearButton__icon"
            type="cross"
          />
        </button>
      )}
    </EuiI18n>
  );
};

EuiFormControlLayoutClearButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};
