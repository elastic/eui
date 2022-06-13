/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefCallback,
  ReactElement,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { EuiNotificationBadge } from '../badge';

import { EuiLoadingSpinner } from '../loading';
import { EuiInnerText } from '../inner_text';

import { cloneElementWithCss } from '../../services/theme/clone_element';
import { withEuiSystem, WithEuiSystemProps } from '../provider/system';
import {
  euiFacetButtonStyles,
  euiFacetButtonTextStyles,
  euiFacetButtonIconStyles,
  euiFacetButtonQuantityStyles,
  euiFacetButtonLoadingSpinnerStyles,
} from './facet_button.styles';
import { EuiButtonDisplay } from '../button/button_display/_button_display';

export interface EuiFacetButtonProps
  extends CommonProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  buttonRef?: RefCallback<HTMLButtonElement>;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * Any node, but preferably a `EuiIcon` or `EuiAvatar`
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

export const _EuiFacetButton: FunctionComponent<
  EuiFacetButtonProps & WithEuiSystemProps
> = ({
  children,
  className,
  icon,
  isDisabled = false,
  isLoading = false,
  isSelected = false,
  quantity,
  buttonRef,
  euiTheme,
  ...rest
}) => {
  // If in the loading state, force disabled to true
  isDisabled = isLoading ? true : isDisabled;

  const selection = isSelected ? 'isSelected' : 'unSelected';

  const classes = classNames('euiFacetButton', className);

  const styles = euiFacetButtonStyles(euiTheme);
  const cssStyles = [styles.euiFacetButton];

  const textStyles = euiFacetButtonTextStyles(euiTheme);
  const cssTextStyles = [
    textStyles.euiFacetButton__text,
    textStyles[selection],
  ];

  const quantityStyles = euiFacetButtonQuantityStyles();
  const cssQuantityStyles = [
    quantityStyles.euiFacetButton__quantity,
    isDisabled && quantityStyles.isDisabled,
  ];

  const iconStyles = euiFacetButtonIconStyles();
  const cssIconStyles = [
    iconStyles.euiFacetButton__icon,
    isDisabled && quantityStyles.isDisabled,
  ];

  const loadingSpinnerStyles = euiFacetButtonLoadingSpinnerStyles();
  const cssLoadingSpinnerStyles = [
    loadingSpinnerStyles.euiFacetButton__loadingSpinner,
  ];

  // Add quantity number if provided or loading indicator
  let buttonQuantity: ReactElement;

  if (isLoading) {
    buttonQuantity = (
      <EuiLoadingSpinner css={cssLoadingSpinnerStyles} size="m" />
    );
  } else if (typeof quantity === 'number') {
    buttonQuantity = (
      <EuiNotificationBadge
        css={cssQuantityStyles}
        className="euiFacetButton__quantity"
        size="m"
        color={!isSelected || isDisabled ? 'subdued' : 'accent'}
      >
        {quantity}
      </EuiNotificationBadge>
    );
  }

  // Add an icon to the button if one exists.
  let buttonIcon: ReactElement;

  if (React.isValidElement<{ className?: string }>(icon)) {
    buttonIcon = cloneElementWithCss(icon, {
      css: cssIconStyles,
      className: 'euiFacetButton__icon',
    });
  }

  return (
    <EuiInnerText>
      {(ref, innerText) => (
        <EuiButtonDisplay
          className={classes}
          css={cssStyles}
          element="button"
          isDisabled={isDisabled}
          ref={buttonRef}
          title={rest['aria-label'] || innerText}
          size="s"
          {...rest}
        >
          {buttonIcon}
          <span
            css={cssTextStyles}
            className="euiFacetButton__text"
            data-text={innerText}
            ref={ref}
          >
            {children}
          </span>

          {buttonQuantity}
        </EuiButtonDisplay>
      )}
    </EuiInnerText>
  );
};

export const EuiFacetButton = withEuiSystem(_EuiFacetButton);
