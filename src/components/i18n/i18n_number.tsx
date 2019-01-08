import React, { ReactChild, ReactElement } from 'react';
import { EuiI18nConsumer } from '../context';
import { ExclusiveUnion } from '../common';

const defaultFormatter = new Intl.NumberFormat('en');
function defaultFormatNumber(value: number) {
  return defaultFormatter.format(value);
}

interface I18nNumberValueShape {
  value: number;
  children?: (x: ReactChild) => ReactElement<any>;
}

interface I18nNumberValuesShape {
  values: number[];
  children: (x: ReactChild[]) => ReactElement<any>;
}

type I18nNumberProps = ExclusiveUnion<I18nNumberValueShape, I18nNumberValuesShape>;

function hasValues(x: I18nNumberProps): x is I18nNumberValuesShape {
  return x.values != null;
}

const I18nNumber: React.SFC<I18nNumberProps> = (props) => (
  <EuiI18nConsumer>
    {
      (i18nConfig) => {
        const formatNumber = i18nConfig.formatNumber || defaultFormatNumber;

        if (hasValues(props)) {
          return props.children(props.values.map(value => formatNumber(value)));
        }

        const formattedValue = (formatNumber || defaultFormatNumber)(props.value);
        if (props.children) {
          return props.children(formattedValue);
        } else {
          return formattedValue;
        }
      }
    }
  </EuiI18nConsumer>
);

export { I18nNumber };
