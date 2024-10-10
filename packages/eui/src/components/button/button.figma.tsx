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
import { EuiButtonGroup } from './button_group';

/* Example: reusing the same props across multiple component connections */
const sharedProps = {
  color: figma.enum('Color', {
    'Primary*': 'primary',
    Neutral: 'text',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
    Accent: 'accent',
  }),
  disabled: figma.boolean('Disabled'),
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
      false: figma.boolean('Left spinner', {
        true: 'left',
        false: figma.boolean('Right spinner', {
          true: 'right',
          false: undefined,
        }),
      }),
    }),
  }),
  label: figma.boolean('Icon only', {
    true: undefined,
    false: figma.textContent('Text'),
  }),
  loading: figma.boolean('Loading'),
  size: figma.enum('Size', {
    'Medium*': 'm',
    Small: 's',
    // TODO: document discrepancy between Figma and EUI
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
  example: ({
    color,
    disabled,
    fill,
    iconSide,
    iconType,
    label,
    loading,
    size,
  }) => (
    <EuiButton
      color={color}
      fill={fill}
      iconSide={iconSide}
      iconType={iconType}
      isDisabled={disabled}
      isLoading={loading}
      onClick={() => {}}
      size={size}
    >
      {label}
    </EuiButton>
  ),
});

/* Example: Self-closing tags example */
/* figma.connect(EuiButton, 'node-id=31735-391399', {
  variant: { 'Icon only': true },
  props: sharedProps,
  example: ({ color, disabled, iconType, loading, size }) => (
    <EuiButton
      aria-label="Meaningful label"
      color={color}
      iconType={iconType}
      isDisabled={disabled}
      isLoading={loading}
      onClick={() => {}}
      size={size}
    />
  ),
}); */

/* Example: Figma variant being a separate component in code */
figma.connect(EuiButtonEmpty, 'node-id=31735-391399', {
  variant: { Style: 'Empty' },
  props: sharedProps,
  example: ({ color, disabled, iconSide, iconType, label, loading, size }) => (
    <EuiButtonEmpty
      color={color}
      iconSide={iconSide}
      iconType={iconType}
      isDisabled={disabled}
      isLoading={loading}
      onClick={() => {}}
      size={size}
    >
      {label}
    </EuiButtonEmpty>
  ),
});

/* Example: embedding best practices in the code snippet */
figma.connect(EuiButtonGroup, 'node-id=31735-392753', {
  props: {
    color: figma.enum('Color', {
      'Neutral*': 'text',
      Primary: 'primary',
      // TODO: document discrepancy between Figma and EUI
      // accent, success, warning, danger
    }),
    disabled: figma.boolean('Disabled'),
    fullWidth: figma.boolean('Full width'),
    iconOnly: figma.boolean('Icon only'),
    size: figma.enum('Size', {
      'Small*': 's',
      Medium: 'm',
      Compressed: 'compressed',
    }),
  },
  example: ({ color, disabled, iconOnly, size }) => (
    <EuiButtonGroup
      buttonSize={size}
      color={color}
      idSelected="0"
      isDisabled={disabled}
      isIconOnly={iconOnly}
      legend="Legend"
      onChange={() => {}}
      options={[
        { id: '0', label: 'Button' },
        { id: '1', label: 'Button' },
        { id: '2', label: 'Button' },
      ]}
      type="single"
    />
  ),
});
