/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext } from 'react';
import { EuiDescriptionListProps } from './description_list_types';

interface DescriptionListContextProps {
  align?: EuiDescriptionListProps['align'];
  compressed?: EuiDescriptionListProps['compressed'];
  textStyle?: EuiDescriptionListProps['textStyle'];
  type?: EuiDescriptionListProps['type'];
}

export const EuiDescriptionListContext = createContext<EuiDescriptionListProps>(
  {
    type: 'row',
    textStyle: 'normal',
    align: 'left',
  }
);

interface ContextProviderProps extends Required<DescriptionListContextProps> {
  /**
   * ReactNode to render as this component's content
   */
  children: React.ReactNode;
}

export function EuiDescriptionListContextProvider({
  children,
  type,
  textStyle,
  align,
  compressed,
}: ContextProviderProps) {
  return (
    <EuiDescriptionListContext.Provider
      value={{ type, textStyle, align, compressed }}
    >
      {children}
    </EuiDescriptionListContext.Provider>
  );
}
