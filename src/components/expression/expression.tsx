/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps, ExclusiveUnion } from '../common';
import { EuiIcon } from '../icon';

import {
  euiExpressionStyles,
  euiExpressionDescriptionStyles,
  euiExpressionValueStyles as valueStyles,
  euiExpressionIconStyles,
} from './expression.styles';

export const COLORS = [
  'subdued',
  'primary',
  'success',
  'accent',
  'warning',
  'danger',
] as const;

export type ExpressionColor = (typeof COLORS)[number];

export type EuiExpressionProps = CommonProps & {
  /**
   * First part of the expression
   */
  description: ReactNode;
  descriptionProps?: CommonProps & HTMLAttributes<HTMLSpanElement>;
  /**
   * Second part of the expression
   */
  value?: ReactNode;
  valueProps?: CommonProps & HTMLAttributes<HTMLSpanElement>;
  /**
   * Color of the `description`
   */
  color?: ExpressionColor;
  /**
   * Should the `description` auto-uppercase?
   */
  uppercase?: boolean;
  /**
   * Adds an solid border at the bottom
   */
  isActive?: boolean;
  /**
   * Turns the component into a button and adds an editable style border at the bottom
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Sets the display style for the expression. Defaults to `inline`
   */
  display?: 'inline' | 'columns';
  /**
   * Forces color to display as `danger` and shows an `error` icon
   */
  isInvalid?: boolean;
  /**
   * Sets a custom width for the description when using the columns layout.
   * Set to a number for a custom width in `px`.
   * Set to a string for a custom width in custom measurement.
   * Defaults to `20%`
   */
  descriptionWidth?: number | string;
  /**
   * Sets how to handle the wrapping of long text.
   */
  textWrap?: 'break-word' | 'truncate';
};

type Buttonlike = EuiExpressionProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> & {
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

type Spanlike = EuiExpressionProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'value'>;

export const EuiExpression: FunctionComponent<
  ExclusiveUnion<Buttonlike, Spanlike>
> = ({
  className,
  description,
  descriptionProps,
  value,
  valueProps,
  color = 'success',
  uppercase = true,
  isActive = false,
  display = 'inline',
  descriptionWidth = '20%',
  onClick,
  isInvalid = false,
  textWrap = 'break-word',
  ...rest
}) => {
  const calculatedColor = isInvalid ? 'danger' : color;

  const styles = useEuiMemoizedStyles(euiExpressionStyles);
  const cssStyles = [
    styles.euiExpression,
    onClick && styles.isClickable,
    styles[color],
    isActive && styles.isActive.base,
    isActive && styles.isActive[color],
    display === 'columns' && styles.columns,
    textWrap === 'truncate' && styles.truncate,
  ];
  const descriptionStyles = useEuiMemoizedStyles(
    euiExpressionDescriptionStyles
  );
  const cssDescriptionStyles = [
    descriptionStyles.euiExpression__description,
    isInvalid ? descriptionStyles.danger : descriptionStyles[color],
    uppercase && descriptionStyles.isUppercase,
    textWrap === 'truncate' && descriptionStyles.truncate,
    display === 'columns' && descriptionStyles.columns,
  ];
  const cssValueStyles = [
    valueStyles.euiExpression__value,
    textWrap === 'truncate' && valueStyles.truncate,
    display === 'columns' && valueStyles.columns,
  ];

  const iconStyles = useEuiMemoizedStyles(euiExpressionIconStyles);
  const cssIconStyles = [
    iconStyles.euiExpression__icon,
    display === 'columns' && iconStyles.columns,
  ];

  const classes = classNames('euiExpression', className);

  const Component = onClick ? 'button' : 'span';

  const customWidth =
    display === 'columns' && descriptionWidth
      ? { flexBasis: descriptionWidth }
      : undefined;

  return (
    <Component css={cssStyles} className={classes} onClick={onClick} {...rest}>
      <span
        {...descriptionProps}
        className={classNames(
          'euiExpression__description',
          descriptionProps?.className
        )}
        css={[...cssDescriptionStyles, descriptionProps?.css]}
        style={{ ...customWidth, ...descriptionProps?.style }}
      >
        {description}
      </span>{' '}
      {value && (
        <span
          {...valueProps}
          className={classNames('euiExpression__value', valueProps?.className)}
          css={[...cssValueStyles, valueProps?.css]}
        >
          {value}
        </span>
      )}
      {isInvalid && (
        <EuiIcon
          className="euiExpression__icon"
          type="warning"
          css={cssIconStyles}
          color={calculatedColor}
        />
      )}
    </Component>
  );
};
