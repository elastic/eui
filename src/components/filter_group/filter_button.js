import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import { getSecureRelForTarget } from '../../services';
import { EuiNotificationBadge } from '../badge/notification_badge';
import {
  COLORS,
  ICON_SIDES,
  EuiButtonEmpty,
} from '../button/button_empty';

import {
  ICON_TYPES,
} from '../icon';

export const EuiFilterButton = ({
  children,
  className,
  iconType,
  iconSide,
  color,
  hasActiveFilters,
  numFilters,
  isDisabled,
  isSelected,
  type,
  grow,
  noDivider,
  ...rest
}) => {

  const classes = classNames(
    'euiFilterButton',
    {
      'euiFilterButton-isSelected': isSelected,
      'euiFilterButton-hasActiveFilters': hasActiveFilters,
      'euiFilterButton--grow': grow,
      'euiFilterButton--noDivider': noDivider,
    },
    className,
  );

  const buttonContents = (
    <span className="euiFilterButton__textShift" data-text={children}>
      {children}
      {numFilters &&
        <EuiNotificationBadge className="euiFilterButton__notification">{numFilters}</EuiNotificationBadge>
      }
    </span>
  );

  return (
    <EuiButtonEmpty
      className={classes}
      color={color}
      isDisabled={isDisabled}
      iconSide={iconSide}
      iconType={iconType}
      type={type}
      {...rest}
    >
      {buttonContents}
    </EuiButtonEmpty>
  );
};

EuiFilterButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  /**
   * Use any one of our icons
   */
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.oneOf(ICON_SIDES),
  color: PropTypes.oneOf(COLORS),
  /**
   * Bolds the button if true
   */
  hasActiveFilters: PropTypes.bool,
  /**
   * Adds a notification with number
   */
  numFilters: PropTypes.number,
  /**
   * Applies a visual state to the button useful when using with a popover.
   */
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  /**
   * Defines html button input type
   */
  type: PropTypes.string,
  /**
   * Should the button grow to fill it's container, best used for dropdown buttons
   */
  grow: PropTypes.bool,
  /**
   * Remove border after button, good for opposite filters
   */
  noDivider: PropTypes.bool,
};

EuiFilterButton.defaultProps = {
  type: 'button',
  iconSide: 'right',
  color: 'text',
  grow: false,
};
