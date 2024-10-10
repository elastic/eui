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

import { EuiBadge } from './badge';

figma.connect(EuiBadge, 'node-id=31918-390303', {
  props: {
    children: figma.string('Text'),
    color: figma.enum('Color', {
      Default: 'default',
      Hollow: 'hollow',
      Primary: 'primary',
      Accent: 'accent',
      Success: 'success',
      Danger: 'danger',
      Warning: 'warning',
    }),
    isDisabled: figma.boolean('Disabled'),
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
        false: undefined,
      }),
    }),
  },
  example: ({ children, iconType, ...props }) => (
    <EuiBadge {...props}>{children}</EuiBadge>
  ),
});
