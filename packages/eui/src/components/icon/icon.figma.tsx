/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// eslint-disable-next-line
// @ts-nocheck

/**
 * `type` expects an enum member, a string or ComponentType
 *
 * figma.instance is a JSX.Element, not ComponentType or string but it's a conflict between
 * Code Connect API and the icon implementation (it's not render props pattern). I don't think there's an alternative,
 * at the same time it doesn't matter much because Figma files are not executed, they're parsed as string.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiIcon } from './icon';

figma.connect(EuiIcon, 'node-id=31572-393323', {
  props: {
    type: figma.instance('Type'),
    size: figma.enum('Size', {
      'Small - 12px': 's',
      'Medium* - 16px': 'm',
      'Large - 24px': 'l',
      'X-Large - 32px': 'xl',
      'XX-Large - 40px': 'xxl',
      Size6: 'original',
    }),
  },
  example: (props) => <EuiIcon {...props} />,
});
