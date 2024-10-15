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
 * `iconType` expects an enum member, a string or ComponentType
 * `iconSide` expects "left" or "right" or undefined
 *
 * I cannot use `as const` to narrow down the type below because the value is serialized,
 * so the code snippet would be `iconSide={'left' as const}`,
 * and figma.instance is a JSX.Element, not ComponentType or string but it's a conflict between
 * Code Connect API and the icon implementation (it's not render props pattern). I don't think there's an alternative,
 * at the same time it doesn't matter much because Figma files are not executed, they're parsed as string.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiButton } from './button';
import { EuiButtonEmpty } from './button_empty';

/* Example: reusing the same props across multiple component connections */
const sharedProps = {
  children: figma.boolean('Icon only', {
    true: undefined,
    false: figma.textContent('Text'),
  }),
  color: figma.enum('Color', {
    'Primary*': undefined,
    Neutral: 'text',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
    Accent: 'accent',
  }),
  isDisabled: figma.boolean('Disabled'),
  isLoading: figma.boolean('Loading'),
  iconType: figma.boolean('Icon only', {
    true: figma.instance('⮑ Icon'),
    false: figma.boolean('Icon left', {
      true: figma.instance('⮑ Icon left'),
      false: figma.boolean('Icon right', {
        true: figma.instance('⮑ Icon right'),
        false: undefined,
      }),
    }),
  }),
  iconSide: figma.boolean('Icon left', {
    true: 'left',
    false: figma.boolean('Icon right', {
      true: 'right',
      false: figma.boolean('Loading', {
        true: figma.boolean('Left spinner', {
          true: 'left',
          false: figma.boolean('Right spinner', {
            true: 'right',
            false: undefined,
          }),
        }),
        false: undefined,
      }),
    }),
  }),
  size: figma.enum('Size', {
    'Medium*': undefined,
    Small: 's',
    // Discrepancy between Figma and EUI
    // 'Extra Small': 'extra-small',
  }),
};

/* Basic example */
figma.connect(EuiButton, 'node-id=31735-391399', {
  props: {
    ...sharedProps,
    fill: figma.enum('Style', {
      'Default*': undefined,
      Filled: true,
    }),
  },
  example: ({ children, ...props }) => (
    <EuiButton onClick={() => {}} {...props}>
      {children}
    </EuiButton>
  ),
});

/* Example: Self-closing tags example (doesn't work, error: The Figma Variant "Icon only" does not have an option for true) */
/* figma.connect(EuiButton, 'node-id=31735-391399', {
  variant: { 'Icon only': true },
  props: sharedProps,
  example: (props) => (
    <EuiButton aria-label="Meaningful label" onClick={() => {}} {...props} />
  ),
}); */

/* Example: Figma variant being a separate component in code */
figma.connect(EuiButtonEmpty, 'node-id=31735-391399', {
  variant: { Style: 'Empty' },
  props: sharedProps,
  example: ({ children, ...props }) => (
    <EuiButtonEmpty onClick={() => {}} {...props}>
      {children}
    </EuiButtonEmpty>
  ),
});
