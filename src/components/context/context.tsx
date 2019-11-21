import React, { createContext, ReactChild } from 'react';

export interface RenderableValues {
  [key: string]: ReactChild;
}

export type Renderable<T> = ReactChild | ((values: T) => ReactChild);

export interface I18nShape {
  mapping?: {
    [key: string]: Renderable<object>;
  };
  mappingFunc?: (value: string) => string;
  formatNumber?: (x: number) => string;
  formatDateTime?: (x: Date) => string;
  locale?: string;
}

const I18nContext: React.Context<I18nShape> = createContext({});
const { Provider: EuiI18nProvider, Consumer: EuiI18nConsumer } = I18nContext;

interface EuiContextProps {
  i18n: I18nShape;
  children: React.ReactNode;
}

const EuiContext: React.FunctionComponent<EuiContextProps> = ({
  i18n = {},
  children,
}) => <EuiI18nProvider value={i18n}>{children}</EuiI18nProvider>;

export { EuiContext, EuiI18nConsumer };
