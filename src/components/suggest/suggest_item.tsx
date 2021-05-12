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

interface EuiSuggestItemPropsBase {
  /**
   * Takes 'iconType' for EuiIcon and 'color'. 'color' can be tint1 through tint9.
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
   * Label display is 'fixed' by default. Label will increase its width beyond 50% if needed with 'expand'.
   */
  labelDisplay?: keyof typeof labelDisplayToClassMap;

  /**
   * Width of 'label' when 'labelDisplay' is set to 'fixed'.
   * Accepts multiples of 10, from 20 to 90. Defaults to 50.
   */
  labelWidth?: LabelWidthSize;

  /**
   * Set the way in which 'description' is displayed, defaults to 'truncate'.
   */
  descriptionDisplay?: keyof typeof descriptionDisplayToClassMap;
}

type PropsForDiv = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;
type PropsForButton = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'type'
> & {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type EuiSuggestItemProps = CommonProps &
  EuiSuggestItemPropsBase &
  ExclusiveUnion<PropsForDiv, PropsForButton>;

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

type LabelWidthSize = '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90';

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

const labelDisplayToClassMap = {
  fixed: 'euiSuggestItem__labelDisplay--fixed',
  expand: 'euiSuggestItem__labelDisplay--expand',
};

const descriptionDisplayToClassMap = {
  truncate: 'euiSuggestItem__description--truncate',
  wrap: 'euiSuggestItem__description--wrap',
};

export const DISPLAYS = keysOf(labelDisplayToClassMap);

export const EuiSuggestItem: FunctionComponent<EuiSuggestItemProps> = ({
  className,
  label,
  type,
  labelDisplay = 'fixed',
  labelWidth = '50',
  description,
  descriptionDisplay = 'truncate',
  onClick,
  ...rest
}) => {
  const classes = classNames(
    'euiSuggestItem',
    {
      'euiSuggestItem-isClickable': onClick,
    },
    className
  );

  let colorClass = '';

  const labelDisplayCalculated = !description ? 'expand' : labelDisplay;

  const labelClassNames = classNames(
    'euiSuggestItem__label',
    labelDisplayToClassMap[labelDisplayCalculated],
    {
      [`euiSuggestItem__label--width${labelWidth}`]: labelDisplay === 'fixed',
    }
  );

  const descriptionClassNames = classNames(
    'euiSuggestItem__description',
    descriptionDisplayToClassMap[descriptionDisplay]
  );

  if (type && type.color) {
    if (COLORS.indexOf(type.color as string) > -1) {
      colorClass = colorToClassNameMap[type.color];
    }
  }

  const innerContent = (
    <React.Fragment>
      <span className={`euiSuggestItem__type ${colorClass}`}>
        <EuiIcon
          type={type.iconType}
          color="inherit" // forces the icon to inherit its parent color
        />
      </span>
      <span className={labelClassNames}>{label}</span>
      {description && (
        <span className={descriptionClassNames}>{description}</span>
      )}
    </React.Fragment>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={classes}
        {...(rest as PropsForButton)}>
        {innerContent}
      </button>
    );
  } else {
    return (
      <div className={classes} {...(rest as PropsForDiv)}>
        {innerContent}
      </div>
    );
  }
};
