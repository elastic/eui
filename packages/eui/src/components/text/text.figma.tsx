/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiText } from './text';

figma.connect(EuiText, 'node-id=32296-391647', {
  props: {
    children: figma.string('Text'),
    size: figma.enum('Size', {
      Medium: 'm',
      Small: 's',
      'X-Small': 'xs',
    }),
  },
  example: ({ children, ...props }) => <EuiText {...props}>{children}</EuiText>,
});
