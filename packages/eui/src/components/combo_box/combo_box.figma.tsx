/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';

import { EuiComboBox } from './combo_box';
import { EuiFormRow } from '../form';

figma.connect(EuiComboBox, 'node-id=15883-161301', {
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
      Placeholder: false,
    }),
    isInvalid: figma.enum('State', {
      Filled: false,
      Focus: false,
      Invalid: true,
      Disabled: false,
      Placeholder: false,
    }),
    label: figma.boolean('Label', {
      true: 'Label',
      false: undefined,
    }),
  },
  example: ({ ariaLabel, helpText, label, ...props }) => (
    <EuiFormRow helpText={helpText} label={label}>
      <EuiComboBox
        aria-label={ariaLabel}
        options={[
          { label: 'Item 1' },
          { label: 'Item 2' },
          { label: 'Item 3' },
          { label: 'Item 4', disabled: true },
          { label: 'Item 5' },
        ]}
        selectedOptions={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        onChange={() => {}}
        {...props}
      />
    </EuiFormRow>
  ),
});
