import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

export const EuiTableHeaderButton = ({
  children,
  className,
  iconType,
  ...rest,
}) => {
  const classes = classNames('kuiTableHeaderButton', className);

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="kuiTableHeaderButton__icon"
        type={iconType}
        size="medium"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      className={classes}
      {...rest}
    >
      <span>{children}</span>
      {buttonIcon}
    </button>
  );
};

EuiTableHeaderButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconType: PropTypes.oneOf(ICON_TYPES),
};
