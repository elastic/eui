import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import  {
  EuiNotificationBadge
} from '../badge';

import {
  EuiLoadingSpinner
} from '../loading';

export const EuiFacetButton = ({
  children,
  className,
  icon,
  isDisabled,
  isLoading,
  isSelected,
  quantity,
  buttonRef,
  ...rest
}) => {

  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const classes = classNames(
    'euiFacetButton',
    {
      'euiFacetButton--isSelected': isSelected,
      'euiFacetButton--unSelected': !isSelected,
    },
    className,
  );

  // Add quanity number if provided or loading indicator
  let buttonQuantity;

  if (isLoading) {
    buttonQuantity = (
      <EuiLoadingSpinner
        className="euiFacetButton__spinner"
        size="m"
      />
    );
  } else if (typeof quantity === 'number') {
    buttonQuantity = (
      <EuiNotificationBadge
        className="euiFacetButton__quantity"
      >
        {quantity}
      </EuiNotificationBadge>
    );
  }

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (icon) {
    buttonIcon = React.cloneElement(
      icon,
      { className: 'euiFacetButton__icon' },
    );
  }


  return (
    <button
      disabled={isDisabled}
      className={classes}
      type="button"
      ref={buttonRef}
      {...rest}
    >
      <span className="euiFacetButton__content">
        {buttonIcon}
        <span className="euiFacetButton__text">{children}</span>
        {buttonQuantity}
      </span>
    </button>
  );
};

EuiFacetButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.node,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,

  /**
   * Adds/swaps for loading spinner & disables
   */
  isLoading: PropTypes.bool,

  /**
   * Changes visual of button to indicate it's currently selected
   */
  isSelected: PropTypes.bool,

  /**
   * Adds a notification indicator for displaying the quantity provided
   */
  quantity: PropTypes.number,

  buttonRef: PropTypes.func,
};

EuiFacetButton.defaultProps = {
  isDisabled: false,
  isLoading: false,
  isSelected: false,
};
