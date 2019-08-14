import React, {
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, RefCallback } from '../common';

import { EuiNotificationBadge } from '../badge';

import { EuiLoadingSpinner } from '../loading';

export interface EuiFacetButtonProps {
  buttonRef?: RefCallback<HTMLButtonElement>;
  children: ReactNode;
  /**
   * Any node, but preferrably a `EuiIcon` or `EuiAvatar`
   */
  icon?: ReactNode;
  isDisabled?: boolean;
  /**
   * Adds/swaps for loading spinner & disables
   */
  isLoading?: boolean;
  /**
   * Changes visual of button to indicate it's currently selected
   */
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Adds a notification indicator for displaying the quantity provided
   */
  quantity?: number;
}

export const EuiFacetButton: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLButtonElement> & EuiFacetButtonProps
> = ({
  children,
  className,
  icon,
  isDisabled = false,
  isLoading = false,
  isSelected = false,
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
    className
  );

  // Add quanity number if provided or loading indicator
  let buttonQuantity;

  if (isLoading) {
    buttonQuantity = (
      <EuiLoadingSpinner className="euiFacetButton__spinner" size="m" />
    );
  } else if (typeof quantity === 'number') {
    buttonQuantity = (
      <EuiNotificationBadge
        className="euiFacetButton__quantity"
        size="m"
        color={!isSelected || isDisabled ? 'subdued' : 'accent'}>
        {quantity}
      </EuiNotificationBadge>
    );
  }

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (React.isValidElement<{ className?: string }>(icon)) {
    buttonIcon = React.cloneElement(icon, {
      className: classNames(icon.props.className, 'euiFacetButton__icon'),
    });
  }

  let dataText;
  if (typeof children === 'string') {
    dataText = children;
  }

  return (
    <button
      className={classes}
      disabled={isDisabled}
      type="button"
      ref={buttonRef}
      {...rest}>
      <span className="euiFacetButton__content">
        {buttonIcon}
        <span data-text={dataText} className="euiFacetButton__text">
          {children}
        </span>
        {buttonQuantity}
      </span>
    </button>
  );
};
