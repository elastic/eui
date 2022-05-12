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
  ButtonHTMLAttributes,
  MouseEventHandler,
} from 'react';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import classNames from 'classnames';
import { EuiIcon, IconType } from '../icon';

interface Type {
  iconType: IconType;
  color: string | keyof typeof colorToClassNameMap;
}

export interface _EuiSuggestItemPropsBase {
  /**
   * Takes `iconType` for EuiIcon and 'color'. 'color' can be tint1 through tint9.
   */
  type: Type;

  /**
   * Label or primary text.
   */
  label: string;

  /**
   * Description or secondary text (optional).
   */
  description?: string;

  /**
   * Percentage width of `label`.
   * Accepts multiples of `10`, from `20` to `90`.
   * Label will expand to 100% if `description` is not provided.
   */
  labelWidth?: LabelWidthSize;

  /**
   * Truncates both label and description.
   */
  truncate?: boolean;
}

type PropsForSpan = Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'>;
type PropsForButton = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'type'
> & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type EuiSuggestItemProps = CommonProps &
  _EuiSuggestItemPropsBase &
  ExclusiveUnion<PropsForSpan, PropsForButton>;

interface ColorToClassMap {
  tint0: string;
  tint1: string;
  tint2: string;
  tint3: string;
  tint4: string;
  tint5: string;
  tint6: string;
  tint7: string;
  tint8: string;
  tint9: string;
  tint10: string;
  [key: string]: string;
}

type LabelWidthSize =
  | '20'
  | '30'
  | '40'
  | '50'
  | '60'
  | '70'
  | '80'
  | '90'
  | 20
  | 30
  | 40
  | 50
  | 60
  | 70
  | 80
  | 90;

const colorToClassNameMap: ColorToClassMap = {
  tint0: 'euiSuggestItem__type--tint0',
  tint1: 'euiSuggestItem__type--tint1',
  tint2: 'euiSuggestItem__type--tint2',
  tint3: 'euiSuggestItem__type--tint3',
  tint4: 'euiSuggestItem__type--tint4',
  tint5: 'euiSuggestItem__type--tint5',
  tint6: 'euiSuggestItem__type--tint6',
  tint7: 'euiSuggestItem__type--tint7',
  tint8: 'euiSuggestItem__type--tint8',
  tint9: 'euiSuggestItem__type--tint9',
  tint10: 'euiSuggestItem__type--tint10',
};

export const COLORS = keysOf(colorToClassNameMap);

export const EuiSuggestItem: FunctionComponent<EuiSuggestItemProps> = ({
  className,
  label,
  type,
  labelWidth = '50',
  description,
  truncate = true,
  onClick,
  ...rest
}) => {
  const classes = classNames(
    'euiSuggestItem',
    {
      'euiSuggestItem--truncate': truncate,
    },
    className
  );

  const labelClassNames = classNames(
    'euiSuggestItem__label',
    `euiSuggestItem__label--width${labelWidth}`
  );

  const descriptionClassNames = classNames('euiSuggestItem__description', {
    'euiSuggestItem__description--wrap': !truncate,
  });

  let typeColorClass = '';
  if (type && type.color) {
    if (COLORS.indexOf(type.color as string) > -1) {
      typeColorClass = colorToClassNameMap[type.color];
    }
  }

  const innerContent = (
    <React.Fragment>
      <span className={`euiSuggestItem__type ${typeColorClass}`}>
        <EuiIcon
          type={type.iconType}
          color="inherit" // forces the icon to inherit its parent color
        />
      </span>
      <span className={labelClassNames} title={label}>
        {label}
      </span>
      {description && (
        <span className={descriptionClassNames} title={description}>
          {description}
        </span>
      )}
    </React.Fragment>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={classes}
        {...(rest as Omit<PropsForButton, 'onClick' | 'className'>)}
      >
        {innerContent}
      </button>
    );
  } else {
    return (
      <span className={classes} {...(rest as PropsForSpan)}>
        {innerContent}
      </span>
    );
  }
};
