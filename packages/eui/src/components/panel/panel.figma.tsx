/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiPanel } from './panel';

const sharedProps = {
  borderRadius: figma.boolean('Border radius', {
    true: 'm',
    false: 'none',
  }),
  color: figma.enum('Color', {
    'Plain*': undefined,
    Subdued: 'subdued',
    Primary: 'primary',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
    Accent: 'accent',
    Transparent: 'transparent',
  }),
  children: figma.instance('Content'),
  hasBorder: figma.boolean('Border'),
  paddingSize: figma.enum('Padding size', {
    None: 'none',
    Small: 's',
    'Medium*': undefined,
    Large: 'l',
  }),
};

figma.connect(EuiPanel, 'node-id=32642-391756', {
  // variant: { Shadow: true },
  props: sharedProps,
  example: ({ children, ...props }) => (
    <EuiPanel {...props}>{children}</EuiPanel>
  ),
});

/* Example: Self-closing tags example (doesn't work, error: The Figma Variant "Shadow" does not have an option for true) */
/* figma.connect(EuiPanel, 'node-id=32642-391756', {
  variant: { Shadow: false },
  props: sharedProps,
  example: ({ children, ...props }) => (
    <EuiPanel hasShadow={false} {...props}>
      {children}
    </EuiPanel>
  ),
}); */
