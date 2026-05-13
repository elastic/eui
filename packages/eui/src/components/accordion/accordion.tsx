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
  useState,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../services';
import { CommonProps } from '../common';
import { EuiLoadingSpinner } from '../loading';
import type { EuiButtonIconProps } from '../button';

import { EuiAccordionTrigger } from './accordion_trigger';
import { EuiAccordionChildren } from './accordion_children';
import { euiAccordionStyles } from './accordion.styles';

export const PADDING_SIZES = ['none', 'xs', 's', 'm', 'l', 'xl'] as const;
export type EuiAccordionPaddingSize = (typeof PADDING_SIZES)[number];

export type EuiAccordionProps = CommonProps &
  Omit<HTMLAttributes<HTMLElement>, 'id' | 'role'> & {
    id: string;
    /**
     * Applied to the entire .euiAccordion wrapper.
     * When using `fieldset`, it will enforce `buttonElement = legend` as well.
     */
    element?: 'div' | 'fieldset';
    /**
     * Defaults to the [group role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role).
     *
     * If your accordion contains significant enough content to be a document
     * [landmark role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role#accessibility_concerns), consider using the `region` role instead.
     * @default group
     */
    role?: HTMLAttributes<HTMLElement>['role'];
    /**
     * Class that will apply to the trigger for the accordion.
     */
    buttonClassName?: string;
    /**
     * Apply more props to the triggering button.
     *
     * Includes optional `paddingSize` prop which allows sizes of `s`, `m`, or `l`.
     * Note: Padding will not be present on the side closest to the accordion arrow.
     */
    buttonProps?: CommonProps &
      HTMLAttributes<HTMLElement> & { paddingSize?: 's' | 'm' | 'l' };
    /**
     * Class that will apply to the trigger content for the accordion.
     */
    buttonContentClassName?: string;
    /**
     * The content of the clickable trigger
     */
    buttonContent?: ReactNode;
    /**
     * Applied to the main button receiving the `onToggle` event.
     * Anything other than the default `button` does not support removing the arrow display (for accessibility of focus).
     */
    buttonElement?: 'div' | 'legend' | 'button';
    /**
     * Extra props to pass to the EuiButtonIcon containing the arrow.
     */
    arrowProps?: Partial<
      Omit<EuiButtonIconProps, 'iconType' | 'onClick' | 'aria-labelledby'>
    >;
    /**
     * Will appear right aligned against the button. Useful for separate actions like deletions.
     */
    extraAction?: ReactNode;
    /**
     * The accordion will start in the open state.
     */
    initialIsOpen?: boolean;
    /**
     * Optional callback method called on open and close with a single `isOpen` parameter
     */
    onToggle?: (isOpen: boolean) => void;
    /**
     * The padding around the exposed accordion content.
     */
    paddingSize?: EuiAccordionPaddingSize;
    /**
     * Placement of the arrow indicator, or 'none' to hide it.
     */
    arrowDisplay?: 'left' | 'right' | 'none';
    /**
     * Optional border styling. Defaults to 'none'.
     */
    borders?: 'horizontal' | 'all' | 'none';
    /**
     * Control the opening of accordion via prop
     */
    forceState?: 'closed' | 'open';
    /**
     * Change `extraAction` and children into a loading spinner
     */
    isLoading?: boolean;
    /**
     * Choose whether the loading message replaces the content. Customize the message by passing a node
     */
    isLoadingMessage?: boolean | ReactNode;
    /**
     * Disable the open/close interaction and visually subdues the trigger
     */
    isDisabled?: boolean;
  };

export const EuiAccordion: FunctionComponent<EuiAccordionProps> = ({
  children,
  className,
  id,
  role = 'group',
  element: Element = 'div',
  buttonElement = 'button',
  buttonProps,
  buttonClassName,
  buttonContentClassName,
  buttonContent,
  arrowDisplay = 'left',
  arrowProps,
  extraAction,
  paddingSize = 'none',
  borders = 'none',
  initialIsOpen = false,
  forceState,
  isLoading = false,
  isLoadingMessage = false,
  isDisabled = false,
  onToggle,
  ...rest
}) => {
  const [isOpenState, setIsOpenState] = useState(
    forceState ? forceState === 'open' : initialIsOpen
  );

  const isOpen = forceState ? forceState === 'open' : isOpenState;

  const onAccordionToggle = () => {
    if (forceState) {
      onToggle?.(!isOpen);
    } else {
      const nextState = !isOpenState;
      setIsOpenState(nextState);
      onToggle?.(nextState);
    }
  };

  const generatedId = useGeneratedHtmlId();
  const buttonId = buttonProps?.id ?? generatedId;

  const classes = classNames(
    'euiAccordion',
    { 'euiAccordion-isOpen': isOpen },
    className
  );

  const styles = useEuiMemoizedStyles(euiAccordionStyles);
  const cssStyles = [
    styles.euiAccordion,
    borders !== 'none' && styles.borders.borders,
    borders !== 'none' && styles.borders[borders],
  ];

  return (
    <Element className={classes} css={cssStyles} {...rest}>
      <EuiAccordionTrigger
        ariaControlsId={id}
        buttonId={buttonId}
        // Force button element to be a legend if the element is a fieldset
        buttonElement={Element === 'fieldset' ? 'legend' : buttonElement}
        buttonClassName={buttonClassName}
        buttonContent={buttonContent}
        buttonContentClassName={buttonContentClassName}
        buttonProps={buttonProps}
        arrowProps={arrowProps}
        arrowDisplay={arrowDisplay}
        isDisabled={isDisabled}
        isOpen={isOpen}
        onToggle={onAccordionToggle}
        extraAction={isLoading ? <EuiLoadingSpinner /> : extraAction}
      />

      <EuiAccordionChildren
        role={role}
        id={id}
        aria-labelledby={buttonId}
        paddingSize={paddingSize}
        isLoading={isLoading}
        isLoadingMessage={isLoadingMessage}
        isOpen={isOpen}
        initialIsOpen={initialIsOpen}
      >
        {children}
      </EuiAccordionChildren>
    </Element>
  );
};
