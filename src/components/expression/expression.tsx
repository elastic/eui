/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  ButtonHTMLAttributes,
  Fragment,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf, ExclusiveUnion } from '../common';
import { EuiIcon } from '../icon';

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

const displayToClassNameMap = {
  inline: 'euiExpression-inline',
  columns: 'euiExpression-columns',
};

export type EuiExpressionProps = CommonProps & {
  /**
   * First part of the expression
   */
  description: ReactNode;
  descriptionProps?: HTMLAttributes<HTMLSpanElement>;
  /**
   * Second part of the expression
   */
  value: ReactNode;
  valueProps?: HTMLAttributes<HTMLSpanElement>;
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
   * Displays the expression in a column layout
   */
  display?: keyof typeof displayToClassNameMap;
  isInvalid?: boolean;
  /**
   * Sets a custom width for the description when using the columns layout. Defaults to 30%.
   */
  descriptionWidth?: number;
};

type Buttonlike = EuiExpressionProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

type Spanlike = EuiExpressionProps & HTMLAttributes<HTMLSpanElement>;

export const EuiExpression: React.FunctionComponent<
  ExclusiveUnion<Buttonlike, Spanlike>
> = ({
  className,
  description,
  descriptionProps,
  value,
  valueProps,
  color = 'secondary',
  uppercase = true,
  isActive = false,
  display = 'inline',
  descriptionWidth = 20,
  onClick,
  isInvalid = false,
  ...rest
}) => {
  const classes = classNames(
    'euiExpression',
    className,
    {
      'euiExpression-isActive': isActive,
      'euiExpression-isClickable': onClick,
      'euiExpression-isUppercase': uppercase,
    },
    displayToClassNameMap[display],
    colorToClassNameMap[color]
  );

  const Component = onClick ? 'button' : 'span';

  const customWidth =
    display === 'columns' && descriptionWidth
      ? {
          flexBasis: `${descriptionWidth}%`,
        }
      : undefined;

  return (
    <Component className={classes} onClick={onClick} {...rest}>
      <span
        className="euiExpression__description"
        style={customWidth}
        {...descriptionProps}>
        {description}
      </span>{' '}
      <span className="euiExpression__value" {...valueProps}>
        {display === 'columns' ? (
          <Fragment>
            <div>{value}</div>
            <span className="euiExpression__icon">
              {isInvalid ? <EuiIcon type="alert" color="danger" /> : null}
            </span>
          </Fragment>
        ) : (
          value
        )}
      </span>
    </Component>
  );
};
