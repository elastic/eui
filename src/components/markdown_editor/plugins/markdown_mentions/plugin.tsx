/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiCodeBlock } from '../../../code';

export const mentionsPlugin = {
  name: 'mentionsPlugin',
  button: {
    label: 'Mention',
    iconType: 'editorComment',
  },
  formatting: {
    prefix: '@',
    suffix: '',
    trimFirst: true,
  },
  helpText: (
    <EuiCodeBlock language="md" paddingSize="s" fontSize="l">
      {'@someone'}
    </EuiCodeBlock>
  ),
};
