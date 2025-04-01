/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createOpenInCodeSandboxAction } from '@elastic/eui-docusaurus-theme/components/demo/codesandbox';

export const extraActions = [
  createOpenInCodeSandboxAction({
    dependencies: {
      'react': '^18',
      'react-dom': '^18',
      '@types/react': '^18',
      '@types/react-dom': '^18',
      'react-scripts': 'latest',
      '@emotion/cache': 'latest',
      '@emotion/react': 'latest',
      '@emotion/css': 'latest',
      'moment': 'latest',
      '@elastic/datemath': 'latest',
      '@elastic/eui': 'latest',
      '@elastic/eui-theme-borealis': 'latest',
    },
  }),
];
