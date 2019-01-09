import React, { ReactChild, ReactElement } from 'react';
import { EuiI18nConsumer } from '../context';
import { ExclusiveUnion } from '../common';
import { I18nShape } from '../context/context';

// <I18n token="foo"/>
// <I18n token="foo">{(foo) => <p>foo</p>}</I18n>
// <I18n tokens=['foo', 'bar']>{([foo, bar]) => <p>{foo}, {bar}</p></I18n>

function lookupToken(token: string, i18nMapping: I18nShape['mapping'], valueDefault: ReactChild) {
  return (i18nMapping && i18nMapping[token]) || valueDefault;
}

interface I18nTokenShape {
  token: string;
  default: ReactChild;
  children?: (x: ReactChild) => ReactElement<any>;
}

interface I18nTokensShape {
  tokens: string[];
  defaults: ReactChild[];
  children: (x: ReactChild[]) => ReactElement<any>;
}

type EuiI18nProps = ExclusiveUnion<I18nTokenShape, I18nTokensShape>;

function hasTokens(x: EuiI18nProps): x is I18nTokensShape {
  return x.tokens != null;
}

const EuiI18n: React.SFC<EuiI18nProps> = (props) => (
  <EuiI18nConsumer>
    {
      (i18nConfig) => {
        const { mapping } = i18nConfig;
        if (hasTokens(props)) {
          return props.children(props.tokens.map((token, idx) => lookupToken(token, mapping, props.defaults[idx])));
        }

        const tokenValue = lookupToken(props.token, mapping, props.default);
        if (props.children) {
          return props.children(tokenValue);
        } else {
          return tokenValue;
        }
      }
    }
  </EuiI18nConsumer>
);

export { EuiI18n };
