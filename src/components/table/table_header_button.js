import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IconPropType, EuiIcon } from '../icon';

export const EuiTableHeaderButton = ({
  children,
  className,
  iconType,
  ...rest
}) => {
  const classes = classNames('euiTableHeaderButton', className);

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiTableHeaderButton__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      <span>{children}</span>
      {buttonIcon}
    </button>
  );
};

EuiTableHeaderButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: IconPropType,
};
