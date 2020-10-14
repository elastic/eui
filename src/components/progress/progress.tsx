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
  ProgressHTMLAttributes,
  ReactNode,
  Fragment,
} from 'react';
import classNames from 'classnames';
import { EuiI18n } from '../i18n';
import { EuiInnerText } from '../inner_text';
import { CommonProps, ExclusiveUnion } from '../common';
import { isNil } from '../../services/predicate';

const sizeToClassNameMap = {
  xs: 'euiProgress--xs',
  s: 'euiProgress--s',
  m: 'euiProgress--m',
  l: 'euiProgress--l',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export type EuiProgressSize = keyof typeof sizeToClassNameMap;

export type ProgressColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'subdued'
  | 'accent'
  | 'tint0'
  | 'tint1'
  | 'tint2'
  | 'tint3'
  | 'tint4'
  | 'tint5'
  | 'tint6'
  | 'tint7'
  | 'tint8'
  | 'tint9';

const colorToClassNameMap = {
  primary: 'euiProgress--primary',
  secondary: 'euiProgress--secondary',
  success: 'euiProgress--success',
  warning: 'euiProgress--warning',
  danger: 'euiProgress--danger',
  subdued: 'euiProgress--subdued',
  accent: 'euiProgress--accent',
  tint0: 'euiProgress--tint0',
  tint1: 'euiProgress--tint1',
  tint2: 'euiProgress--tint2',
  tint3: 'euiProgress--tint3',
  tint4: 'euiProgress--tint4',
  tint5: 'euiProgress--tint5',
  tint6: 'euiProgress--tint6',
  tint7: 'euiProgress--tint7',
  tint8: 'euiProgress--tint8',
  tint9: 'euiProgress--tint9',
};

export const COLORS = Object.keys(colorToClassNameMap);

type NamedColor = keyof typeof colorToClassNameMap;

function isNamedColor(name: string): name is NamedColor {
  return colorToClassNameMap.hasOwnProperty(name);
}

export type EuiProgressColor = keyof typeof colorToClassNameMap;

const dataColorToClassNameMap: { [color in ProgressColor]: string } = {
  primary: 'euiProgress__data--primary',
  secondary: 'euiProgress__data--secondary',
  success: 'euiProgress__data--success',
  warning: 'euiProgress__data--warning',
  danger: 'euiProgress__data--danger',
  subdued: 'euiProgress__data--subdued',
  accent: 'euiProgress__data--accent',
  tint0: 'euiProgress__data--tint0',
  tint1: 'euiProgress__data--tint1',
  tint2: 'euiProgress__data--tint2',
  tint3: 'euiProgress__data--tint3',
  tint4: 'euiProgress__data--tint4',
  tint5: 'euiProgress__data--tint5',
  tint6: 'euiProgress__data--tint6',
  tint7: 'euiProgress__data--tint7',
  tint8: 'euiProgress__data--tint8',
  tint9: 'euiProgress__data--tint9',
};

const positionsToClassNameMap = {
  fixed: 'euiProgress--fixed',
  absolute: 'euiProgress--absolute',
  static: '',
};

export const POSITIONS = Object.keys(positionsToClassNameMap);

export type EuiProgressPosition = keyof typeof positionsToClassNameMap;

export type EuiProgressProps = CommonProps & {
  size?: EuiProgressSize;
  color?: EuiProgressColor | string;
  position?: EuiProgressPosition;
};

type Indeterminate = EuiProgressProps & HTMLAttributes<HTMLDivElement>;

type Determinate = EuiProgressProps &
  Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'max'> & {
    max?: number;
    /*
     * If true, will render the percentage, otherwise pass a custom node
     */
    valueText?: boolean | ReactNode;
    label?: ReactNode;
    /**
     * Object of props passed to the <span/> wrapping the determinate progress's label
     */
    labelProps?: HTMLAttributes<HTMLSpanElement>;
  };

export const EuiProgress: FunctionComponent<ExclusiveUnion<
  Determinate,
  Indeterminate
>> = ({
  className,
  color = 'secondary',
  size = 'm',
  position = 'static',
  max,
  valueText = false,
  label,
  value,
  labelProps,
  ...rest
}) => {
  const determinate = !isNil(max);
  let colorClass = null;
  let dataColorClass = null;
  let optionalCustomStyles: any = null;
  if (color) {
    if (isNamedColor(color)) {
      colorClass = colorToClassNameMap[color];
      dataColorClass = dataColorToClassNameMap[color];
    } else {
      optionalCustomStyles = { color: color };
      colorClass = 'euiProgress--customColor';
    }
  }
  const classes = classNames(
    'euiProgress',
    {
      'euiProgress--indeterminate': !determinate,
      'euiProgress--native': determinate,
    },
    sizeToClassNameMap[size],
    colorClass,
    positionsToClassNameMap[position],
    className
  );
  const dataClasses = classNames(
    'euiProgress__data',
    {
      'euiProgress__data--l': size === 'l',
    },
    dataColorClass
    // dataColorToClassNameMap[color]
  );
  const labelClasses = classNames(
    'euiProgress__label',
    labelProps && labelProps.className
  );

  let valueRender: ReactNode;
  if (valueText === true) {
    // valueText is true
    valueRender = (
      <EuiI18n
        token="euiProgress.valueText"
        default="{value}%"
        values={{
          value,
        }}
      />
    );
  } else if (valueText) {
    // valueText exists
    valueRender = valueText;
  }

  // Because of a Firefox animation issue, indeterminate progress needs to not use <progress />.
  // See https://css-tricks.com/html5-progress-element/

  if (determinate) {
    return (
      <Fragment>
        {label || valueText ? (
          <div className={dataClasses}>
            {label && (
              <EuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    {...labelProps}
                    className={labelClasses}>
                    {label}
                  </span>
                )}
              </EuiInnerText>
            )}
            {valueRender && (
              <EuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    className="euiProgress__valueText">
                    {valueRender}
                  </span>
                )}
              </EuiInnerText>
            )}
          </div>
        ) : undefined}
        <progress
          className={classes}
          style={optionalCustomStyles}
          max={max}
          value={value}
          aria-hidden={label && valueText ? true : false}
          {...(rest as ProgressHTMLAttributes<HTMLProgressElement>)}
        />
      </Fragment>
    );
  } else {
    return (
      <div
        style={optionalCustomStyles}
        className={classes}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      />
    );
  }
};
