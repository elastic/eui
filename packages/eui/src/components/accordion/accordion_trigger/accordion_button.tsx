/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  PropsWithChildren,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';

import { EuiAccordionProps } from '../accordion';
import { euiAccordionButtonStyles } from './accordion_button.styles';

type _EuiAccordionButtonProps = PropsWithChildren &
  HTMLAttributes<HTMLElement> &
  Required<Pick<EuiAccordionProps, 'buttonElement'>> &
  Pick<
    EuiAccordionProps,
    | 'buttonClassName'
    | 'buttonProps'
    | 'buttonContentClassName'
    | 'isDisabled'
    | 'arrowDisplay'
  >;

export const EuiAccordionButton: FunctionComponent<
  _EuiAccordionButtonProps
> = ({
  buttonElement: ButtonElement,
  buttonProps: _buttonProps,
  buttonClassName,
  buttonContentClassName,
  isDisabled,
  arrowDisplay,
  children,
  ...rest
}: _EuiAccordionButtonProps) => {
  const { paddingSize, ...buttonProps } = _buttonProps || {};

  const classes = classNames(
    'euiAccordion__button',
    buttonClassName,
    buttonProps.className
  );

  const buttonContentClasses = classNames(
    'euiAccordion__buttonContent',
    buttonContentClassName
  );

  const styles = useEuiMemoizedStyles(euiAccordionButtonStyles);
  const cssStyles = [
    styles.euiAccordion__button,
    isDisabled && styles.disabled,
    ...(paddingSize
      ? [
          styles[paddingSize],
          arrowDisplay === 'left' && styles.arrowLeft,
          arrowDisplay === 'right' && styles.arrowRight,
        ]
      : []),
    buttonProps.css,
  ];

  const elementIsButton = ButtonElement === 'button';

  return (
    <ButtonElement
      {...buttonProps}
      {...rest}
      className={classes}
      css={cssStyles}
      type={elementIsButton ? 'button' : undefined}
      disabled={elementIsButton ? isDisabled : undefined}
    >
      <span className={buttonContentClasses}>{children}</span>
    </ButtonElement>
  );
};
