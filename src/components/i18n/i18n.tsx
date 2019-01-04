import React, { ReactChild, ReactElement } from 'react';
import { EuiI18nConsumer } from '../context';
import { ExclusiveUnion } from '../common';
import { I18nMappingShape } from '../context/context';

// <I18n token="foo"/>
// <I18n token="foo">{(foo) => <p>foo</p>}</I18n>
// <I18n tokens=['foo', 'bar']>{([foo, bar]) => <p>{foo}, {bar}</p></I18n>

function lookupToken(token: string, i18nMapping: I18nMappingShape, valueDefault: ReactChild) {
  return i18nMapping[token] || valueDefault;
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

type I18nProps = ExclusiveUnion<I18nTokenShape, I18nTokensShape>;

function hasTokens(x: I18nProps): x is I18nTokensShape {
  return x.tokens != null;
}

const I18n: React.SFC<I18nProps> = (props) => (
  <EuiI18nConsumer>
    {
      (i18nConfig) => {
        if (hasTokens(props)) {
          return props.children(props.tokens.map((token, idx) => lookupToken(token, i18nConfig, props.defaults[idx])));
        }

        const tokenValue = lookupToken(props.token, i18nConfig, props.default);
        if (props.children) {
          return props.children(tokenValue);
        } else {
          return tokenValue;
        }
      }
    }
  </EuiI18nConsumer>
);

export { I18n };
