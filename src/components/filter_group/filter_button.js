import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { EuiI18n } from '../i18n';
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
  numActiveFilters,
  isDisabled,
  isSelected,
  type,
  grow,
  noDivider,
  withNext,
  textProps,
  ...rest
}) => {
  // != instead of !== to allow for null and undefined
  const numFiltersDefined = numFilters != null;

  const classes = classNames(
    'euiFilterButton',
    {
      'euiFilterButton-isSelected': isSelected,
      'euiFilterButton-hasActiveFilters': hasActiveFilters,
      'euiFilterButton-hasNotification': numFiltersDefined,
      'euiFilterButton--hasIcon': iconType,
      'euiFilterButton--noGrow': !grow,
      'euiFilterButton--withNext': noDivider || withNext,
    },
    className,
  );

  const buttonTextClassNames = classNames(
    // 'euiFilterButton__textShift',
    { 'euiFilterButton__text-hasNotification': numFiltersDefined, },
    textProps && textProps.className,
  );

  let dataText;
  if (typeof children === 'string') {
    dataText = children;
  }

  const buttonContents = (
    <Fragment>
      <span className="euiFilterButton__textShift" data-text={dataText} title={dataText}>
        {children}
      </span>

      {numFiltersDefined &&
        <EuiI18n
          token="euiFilterButton.filterBadge"
          values={{ count: numActiveFilters || numFilters, hasActiveFilters }}
          default={({ count, hasActiveFilters }) => `${count} ${hasActiveFilters ? 'active' : 'available'} filters`}
        >
          {
            filterBadge => (
              <EuiNotificationBadge
                className="euiFilterButton__notification"
                size="m"
                aria-label={filterBadge}
                color={isDisabled || !hasActiveFilters ? 'subdued' : 'accent'}
              >
                {numActiveFilters || numFilters}
              </EuiNotificationBadge>
            )
          }
        </EuiI18n>
      }
    </Fragment>
  );

  return (
    <EuiButtonEmpty
      className={classes}
      color={color}
      isDisabled={isDisabled}
      iconSide={iconSide}
      iconType={iconType}
      type={type}
      textProps={{ ...textProps, className: buttonTextClassNames }}
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
   * Pass the total number of filters available and it will
   * add a subdued notification badge showing the number
   */
  numFilters: PropTypes.number,
  /**
   * Pass the number of selected filters and it will
   * add a bright notification badge showing the number
   */
  numActiveFilters: PropTypes.number,
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
  withNext: PropTypes.bool,
  /**
   * _DEPRECATED: use `withNext`_
   * Remove border after button, good for opposite filters
   */
  noDivider: PropTypes.bool,
};

EuiFilterButton.defaultProps = {
  type: 'button',
  iconSide: 'right',
  color: 'text',
  grow: true,
};
