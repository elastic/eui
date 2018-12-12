import React, { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

const colorToClassNameMap = {
  subdued: 'euiExpression--subdued',
  primary: 'euiExpression--primary',
  secondary: 'euiExpression--secondary',
  accent: 'euiExpression--accent',
  warning: 'euiExpression--warning',
  danger: 'euiExpression--danger',
};

export const COLORS = keysOf(colorToClassNameMap);

export type ExpressionColor = keyof typeof colorToClassNameMap;

export type EuiExpressionProps = HTMLAttributes<HTMLButtonElement> & CommonProps & {
  /**
   * First part of the expression
   */
  description: ReactNode;
  descriptionProps?: object;
  /**
   * Second part of the expression
   */
  value: ReactNode;
  valueProps?: object;
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
   * Turns the component into a button and adds an editable style border at the bottome
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const EuiExpression: React.SFC<EuiExpressionProps> = ({
  className,
  description,
  descriptionProps,
  value,
  valueProps,
  color,
  uppercase,
  isActive,
  onClick,
  ...rest
}) => {

  const classes = classNames('euiExpression', className, {
      'euiExpression-isActive': isActive,
      'euiExpression-isClickable': onClick,
      'euiExpression-isUppercase': uppercase,
    },
    color ? colorToClassNameMap[color] : undefined
  );

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      className={classes}
      onClick={onClick}
      {...rest}
    >
      <span className="euiExpression__description" {...descriptionProps}>{description}</span>{' '}
      <span className="euiExpression__value" {...valueProps}>{value}</span>
    </Component>
  );
};

EuiExpression.defaultProps = {
  color: 'secondary',
  uppercase: true,
  isActive: false,
};
