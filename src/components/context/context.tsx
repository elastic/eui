import React, { createContext, ReactChild } from 'react';

export interface I18nShape {
  mapping?: {
    [key: string]: ReactChild;
  };
  formatNumber?: (x: number) => string;
  formatDate?: (x: Date) => string;
}

const I18nContext: React.Context<I18nShape> = createContext({});
const { Provider: EuiI18nProvider, Consumer: EuiI18nConsumer } = I18nContext;

interface IEuiContextProps {
  i18n: I18nShape;
  children: React.ReactNode;
}

const EuiContext: React.SFC<IEuiContextProps> = ({i18n = {}, children}) => (
  <EuiI18nProvider value={i18n}>
    {children}
  </EuiI18nProvider>
);

export { EuiContext, EuiI18nConsumer };
