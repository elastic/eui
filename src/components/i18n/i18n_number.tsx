/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
