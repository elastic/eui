/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext, useContext } from 'react';
import { EuiProvider } from '@elastic/eui';
import { Props } from '@theme/Root';

const c = createContext({});

// Wrap docusaurus root component with <EuiProvider>
// See https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
const Root = ({ children }: Props) => {
  const a = useContext(c);

  return (
    <EuiProvider globalStyles={false}>
      {children}
    </EuiProvider>
  );
}

export default Root;
