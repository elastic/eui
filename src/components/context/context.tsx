import React, { createContext, ReactElement } from 'react';

export interface I18nMappingShape {
  [key: string]: ReactElement<any>;
}

const I18nContext: React.Context<I18nMappingShape> = createContext({});
const { Provider: EuiI18nProvider, Consumer: EuiI18nConsumer } = I18nContext;

interface IEuiContextProps {
  i18n: I18nMappingShape;
  children: React.ReactNode;
}

const EuiContext: React.SFC<IEuiContextProps> = ({i18n = {}, children}) => (
  <EuiI18nProvider value={i18n}>
    {children}
  </EuiI18nProvider>
);

export { EuiContext, EuiI18nConsumer };
