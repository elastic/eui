import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

  // Add quanity number if provided.
  let quantity;

  if (isLoading) {
    quantity = (
      <EuiLoadingSpinner
        className="euiButtonFacet__spinner"
        size="m"
      />
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
      <span className="euiButtonEmpty__content">
        {buttonIcon}
        <span className="euiButtonEmpty__text">{children}</span>
        {quantity}
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

  buttonRef: PropTypes.func,
};

EuiButtonFacet.defaultProps = {
  icon: 'dot',
  isDisabled: false,
  isLoading: false,
  isSelected: false,
};
