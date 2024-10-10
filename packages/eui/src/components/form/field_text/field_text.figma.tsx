/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiFieldText } from './field_text';
import { EuiFormRow } from '../form_row';

figma.connect(EuiFieldText, 'node-id=13676-796', {
  props: {
    ariaLabel: figma.boolean('Label', {
      true: undefined,
      false: 'Meaningful label',
    }),
    compressed: figma.boolean('Compressed'),
    helpText: figma.boolean('Help text', {
      true: 'Help text',
      false: undefined,
    }),
    isDisabled: figma.enum('State', {
      Filled: false,
      Focus: false,
      Invalid: false,
      Disabled: true,
    }),
    isInvalid: figma.enum('State', {
      Filled: false,
      Focus: false,
      Invalid: true,
      Disabled: false,
    }),
    label: figma.boolean('Label', {
      true: 'Label',
      false: undefined,
    }),
  },
  example: ({ ariaLabel, label, ...props }) => (
    <EuiFormRow label={label}>
      <EuiFieldText
        aria-label={ariaLabel}
        value={''}
        onChange={() => {}}
        {...props}
      />
    </EuiFormRow>
  ),
});
