/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PropsWithChildren } from 'react';
import { DocsSidebarProvider } from '@docusaurus/plugin-content-docs/client';
import DocRootLayout from '@theme/DocRoot/Layout';

import { getGeneratedDocsSidebars } from './get_docs_sidebars';

const SIDEBAR_ID = 'components';

/**
 * POC: wrap homepage content in the same DocRoot shell used by docs pages,
 * with the Components sidebar shown by default.
 */
export const HomepageDocLayout = ({ children }: PropsWithChildren) => {
  const docsSidebars = getGeneratedDocsSidebars();
  const sidebarItems = docsSidebars[SIDEBAR_ID] ?? [];

  return (
    <DocsSidebarProvider name={SIDEBAR_ID} items={sidebarItems}>
      <DocRootLayout>{children}</DocRootLayout>
    </DocsSidebarProvider>
  );
};
