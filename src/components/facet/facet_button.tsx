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
  ReactNode,
  RefCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { EuiNotificationBadge } from '../badge';

import { EuiLoadingSpinner } from '../loading';
import { EuiInnerText } from '../inner_text';

import { useEuiMemoizedStyles, cloneElementWithCss } from '../../services';
import {
  euiFacetButtonStyles,
  euiFacetButtonTextStyles,
  euiFacetButton__disabled,
} from './facet_button.styles';
import {
  EuiButtonDisplay,
  EuiButtonDisplayCommonProps,
  isButtonDisabled,
} from '../button/button_display/_button_display';

export interface EuiFacetButtonProps
  extends EuiButtonDisplayCommonProps,
    HTMLAttributes<HTMLButtonElement> {
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
  /**
   * Adds a notification indicator for displaying the quantity provided
   */
  quantity?: number;
}

export const EuiFacetButton: FunctionComponent<EuiFacetButtonProps> = ({
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
  isDisabled = isButtonDisabled({ isDisabled, isLoading });

  const selection = isSelected ? 'isSelected' : 'unSelected';

  const classes = classNames('euiFacetButton', className);

  const styles = useEuiMemoizedStyles(euiFacetButtonStyles);
  const cssStyles = [styles.euiFacetButton];

  const textStyles = useEuiMemoizedStyles(euiFacetButtonTextStyles);
  const cssTextStyles = [
    textStyles.euiFacetButton__text,
    textStyles[selection],
  ];

  // Spreading an obj/conditionally passing the `css` prop makes it so
  // an empty `css-0` className isn't rendered in the DOM
  const disabledStyles = useMemo(
    () => (isDisabled ? { css: euiFacetButton__disabled } : undefined),
    [isDisabled]
  );

  // Add quantity number if provided or loading indicator
  const buttonQuantity = useMemo(() => {
    if (isLoading) {
      return <EuiLoadingSpinner size="m" />;
    } else if (typeof quantity === 'number') {
      return (
        <EuiNotificationBadge
          {...disabledStyles}
          className="euiFacetButton__quantity"
          size="m"
          color={!isSelected || isDisabled ? 'subdued' : 'accent'}
        >
          {quantity}
        </EuiNotificationBadge>
      );
    }
  }, [quantity, isLoading, isDisabled, disabledStyles, isSelected]);

  // Add an icon to the button if one exists.
  const buttonIcon = useMemo(() => {
    if (React.isValidElement(icon)) {
      return cloneElementWithCss(icon, {
        className: 'euiFacetButton__icon',
        ...disabledStyles,
      });
    }
  }, [icon, disabledStyles]);

  return (
    <EuiInnerText>
      {(ref, innerText) => (
        <EuiButtonDisplay
          className={classes}
          css={cssStyles}
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
