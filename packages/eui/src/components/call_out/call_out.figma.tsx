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
 *
 * figma.instance is a JSX.Element, not ComponentType or string but it's a conflict between
 * Code Connect API and the icon implementation (it's not render props pattern). I don't think there's an alternative,
 * at the same time it doesn't matter much because Figma files are not executed, they're parsed as string.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiCallOut } from './call_out';

figma.connect(EuiCallOut, 'node-id=32350-392160', {
  props: {
    children: figma.nestedProps('Children', {
      text: figma.children('Callout text'),
    }),
    color: figma.enum('Color', {
      Success: 'success',
      Danger: 'danger',
      Warning: 'warning',
      Primary: 'primary',
    }),
    iconType: figma.boolean('⮑ Icon', {
      true: figma.instance('⮑ Icon glyph'),
      false: undefined,
    }),
    onDismiss: figma.boolean('Dismiss', {
      true: () => {},
      false: undefined,
    }),
    size: figma.enum('Size', {
      Medium: 'm',
      Small: 's',
    }),
    title: figma.boolean('Title', {
      true: figma.nestedProps('Callout title', {
        text: figma.string('Text'),
      }),
      false: {
        text: undefined,
      },
    }),
  },
  example: ({ children, title, ...props }) => (
    <EuiCallOut title={title.text} {...props}>
      {children.text}
    </EuiCallOut>
  ),
});
