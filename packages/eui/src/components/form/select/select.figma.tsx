/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiSelect } from './select';
import { EuiFormRow } from '../form_row';

figma.connect(EuiSelect, 'node-id=15883-129716', {
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
      Default: false,
      Focus: false,
      Invalid: false,
      Disabled: true,
    }),
    isInvalid: figma.enum('State', {
      Default: false,
      Focus: false,
      Invalid: true,
      Disabled: false,
    }),
    label: figma.boolean('Label', {
      true: 'Label',
      false: undefined,
    }),
  },
  example: ({ ariaLabel, helpText, label, ...props }) => (
    <EuiFormRow label={label} helpText={helpText}>
      <EuiSelect
        aria-label={ariaLabel}
        options={[
          { value: 'option-1', text: 'Option 1' },
          { value: 'option-2', text: 'Option 2' },
          { value: 'option-3', text: 'Option 3' },
        ]}
        value="option-1"
        onChange={() => {}}
        {...props}
      />
    </EuiFormRow>
  ),
});
