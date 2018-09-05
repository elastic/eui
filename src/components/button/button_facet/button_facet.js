import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import  {
  EuiNotificationBadge
} from '../../badge';

import {
  EuiLoadingSpinner
} from '../../loading';

import {
  EuiIcon,
} from '../../icon';

export const EuiButtonFacet = ({
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
    'euiButtonFacet',
    {
      'euiButtonFacet--isSelected': isSelected,
    },
    className,
  );

  // Add quanity number if provided or loading indicator
  let buttonQuantity;

  if (isLoading) {
    buttonQuantity = (
      <EuiLoadingSpinner
        className="euiButtonFacet__spinner"
        size="m"
      />
    );
  } else if (quantity) {
    buttonQuantity = (
      <EuiNotificationBadge
        className="euiButtonFacet__quantity"
      >
        {quantity}
      </EuiNotificationBadge>
    );
  }

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (icon) {
    buttonIcon = (
      <EuiIcon
        className="euiButton__icon"
        type={icon}
        size="m"
        aria-hidden="true"
      />
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
      <span className="euiButtonFacet__content">
        {buttonIcon}
        <span className="euiButtonFacet__text">{children}</span>
        {buttonQuantity}
      </span>
    </button>
  );
};

EuiButtonFacet.propTypes = {
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
   * Adds a notification indicator for displaying the buttonQuantity provided
   */
  quantity: PropTypes.number,

  buttonRef: PropTypes.func,
};

EuiButtonFacet.defaultProps = {
  icon: 'dot',
  isDisabled: false,
  isLoading: false,
  isSelected: false,
};
