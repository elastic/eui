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

const colorToClassNameMap = {
  primary: 'euiProgress--primary',
  secondary: 'euiProgress--secondary',
  danger: 'euiProgress--danger',
  subdued: 'euiProgress--subdued',
  accent: 'euiProgress--accent',
};

export const COLORS = Object.keys(colorToClassNameMap);

export type EuiProgressColor = keyof typeof colorToClassNameMap;

const dataColorToClassNameMap = {
  primary: 'euiProgress__data--primary',
  secondary: 'euiProgress__data--secondary',
  danger: 'euiProgress__data--danger',
  subdued: 'euiProgress__data--subdued',
  accent: 'euiProgress__data--accent',
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
  color?: EuiProgressColor;
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
  const classes = classNames(
    'euiProgress',
    {
      'euiProgress--indeterminate': !determinate,
      'euiProgress--native': determinate,
    },
    sizeToClassNameMap[size],
    colorToClassNameMap[color],
    positionsToClassNameMap[position],
    className
  );
  const dataClasses = classNames(
    'euiProgress__data',
    {
      'euiProgress__data--l': size === 'l',
    },
    dataColorToClassNameMap[color]
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
          max={max}
          value={value}
          aria-hidden={label && valueText ? true : false}
          {...(rest as ProgressHTMLAttributes<HTMLProgressElement>)}
        />
      </Fragment>
    );
  } else {
    return (
      <div className={classes} {...(rest as HTMLAttributes<HTMLDivElement>)} />
    );
  }
};
