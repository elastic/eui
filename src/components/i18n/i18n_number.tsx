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

import React, { FunctionComponent, ReactChild, ReactElement } from 'react';
import { EuiI18nConsumer } from '../context';
import { ExclusiveUnion } from '../common';

const defaultFormatter = new Intl.NumberFormat('en');
function defaultFormatNumber(value: number) {
  return defaultFormatter.format(value);
}

interface EuiI18nNumberValueShape {
  value: number;
  children?: (x: ReactChild) => ReactElement<any>;
}

interface EuiI18nNumberValuesShape {
  values: number[];
  /**
   * ReactNode to render as this component's content
   */
  children: (x: ReactChild[]) => ReactElement<any>;
}

export type EuiI18nNumberProps = ExclusiveUnion<
  EuiI18nNumberValueShape,
  EuiI18nNumberValuesShape
>;

function hasValues(x: EuiI18nNumberProps): x is EuiI18nNumberValuesShape {
  return x.values != null;
}

const EuiI18nNumber: FunctionComponent<EuiI18nNumberProps> = (props) => (
  <EuiI18nConsumer>
    {(i18nConfig) => {
      const formatNumber = i18nConfig.formatNumber || defaultFormatNumber;

      if (hasValues(props)) {
        return props.children(props.values.map((value) => formatNumber(value)));
      }

      const formattedValue = (formatNumber || defaultFormatNumber)(props.value);
      if (props.children) {
        return props.children(formattedValue);
      } else {
        return formattedValue;
      }
    }}
  </EuiI18nConsumer>
);

export { EuiI18nNumber };
