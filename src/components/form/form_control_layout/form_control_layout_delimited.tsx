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
  ReactElement,
  cloneElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { EuiText } from '../../text';
import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from './form_control_layout';

export type EuiFormControlLayoutDelimitedProps = Partial<
  EuiFormControlLayoutProps
> & {
  /**
   * Left side control
   */
  startControl: ReactElement;
  /**
   * Right side control
   */
  endControl: ReactElement;
  /**
   * The center content. Accepts a string to be wrapped in a subdued EuiText
   * or a single ReactElement
   */
  delimiter?: ReactNode;
  className?: string;
};

export const EuiFormControlLayoutDelimited: FunctionComponent<
  EuiFormControlLayoutDelimitedProps
> = ({ startControl, endControl, delimiter = '→', className, ...rest }) => {
  const classes = classNames('euiFormControlLayoutDelimited', className);

  return (
    <EuiFormControlLayout className={classes} {...rest}>
      {addClassesToControl(startControl)}
      <EuiText
        className="euiFormControlLayoutDelimited__delimeter"
        size="s"
        color="subdued">
        {delimiter}
      </EuiText>
      {addClassesToControl(endControl)}
    </EuiFormControlLayout>
  );
};

function addClassesToControl(control: ReactElement) {
  return cloneElement(control, {
    className: classNames(
      control.props.className,
      'euiFormControlLayoutDelimited__input'
    ),
  });
}
