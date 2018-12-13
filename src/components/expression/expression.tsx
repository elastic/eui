import React, { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf, Omit } from '../common';

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type ExclusiveOr<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

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

export type EuiExpressionProps = CommonProps & {
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
  // onClick?: MouseEventHandler<HTMLButtonElement>;
};

type Buttonlike =
  EuiExpressionProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> &
  { onClick: MouseEventHandler<HTMLButtonElement> }
;

type Spanlike =
  EuiExpressionProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'>
;

type Unified = ExclusiveOr<Buttonlike, Spanlike>;

export const EuiExpression: React.SFC<Unified> = ({
  className,
  description,
  descriptionProps,
  value,
  valueProps,
  color,
  uppercase,
  isActive,
  // onClick,
  ...rest
}) => {
  const onClick = undefined;

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

export const Bar: React.SFC<{}> = () => {
  return (
    <EuiExpression description="test" value={5} onClick={() => {}} name="test"/>
  );
};
