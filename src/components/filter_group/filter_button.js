import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import { getSecureRelForTarget } from '../../services';
import { EuiHeaderNotification } from '../header/header_notification';
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
  // href,
  // target,
  // rel,
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
        <EuiHeaderNotification className="euiFilterButton__notification">{numFilters}</EuiHeaderNotification>
      }
    </span>
  );

  // let secureRel;
  // if (href) {
  //   secureRel = getSecureRelForTarget(target, rel);
  // }

  return (
    <EuiButtonEmpty
      className={classes}
      color={color}
      isDisabled={isDisabled}
      iconSide={iconSide}
      iconType={iconType}
      // rel={secureRel}
      // target={target}
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
   * If passed, changes the button to an anchor tag
   */
  href: PropTypes.string,
  /**
   * Used along with href
   */
  target: PropTypes.string,
  /**
   * Used along with href
   */
  rel: PropTypes.string,
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
