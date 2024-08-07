/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

module.exports = {
  presets: [
    require.resolve('@docusaurus/core/lib/babel/preset'),
    [
      '@babel/preset-react',
      { runtime: 'automatic', importSource: '@emotion/react' },
    ],
  ],
};
