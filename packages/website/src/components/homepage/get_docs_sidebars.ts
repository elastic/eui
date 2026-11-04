/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { PropSidebars } from '@docusaurus/plugin-content-docs';

/**
 * POC: full sidebar trees are only in generated version metadata (hashed
 * filename under `@generated/.../p/`). Load whatever JSON is present so the
 * homepage can reuse DocRootLayout like a docs page.
 */
export const getGeneratedDocsSidebars = (): PropSidebars => {
  // Webpack require.context — resolves the single current-version metadata file
  // regardless of content hash.
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  const context = require.context(
    '@generated/docusaurus-plugin-content-docs/default/p',
    false,
    /\.json$/
  ) as {
    keys: () => string[];
    (id: string): { version: { docsSidebars: PropSidebars } };
  };

  const key = context.keys()[0];
  if (!key) {
    throw new Error('POC: no generated docs version metadata found');
  }

  return context(key).version.docsSidebars;
};
