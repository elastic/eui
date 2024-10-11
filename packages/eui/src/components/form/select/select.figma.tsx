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
    error: figma.nestedProps('📦Form Row / Error text', {
      text: figma.textContent('Text'),
    }),
    helpText: figma.boolean('Help text', {
      true: figma.nestedProps('📦 Form Row / Help text', {
        text: figma.textContent('Text'),
      }),
      false: {
        text: undefined,
      },
    }),
    isDisabled: figma.enum('State', {
      Disabled: true,
    }),
    isInvalid: figma.enum('State', {
      Invalid: true,
    }),
    label: figma.boolean('Label', {
      true: figma.nestedProps('📦 Form Row / Label', {
        text: figma.textContent('Text'),
      }),
      false: {
        text: undefined,
      },
    }),
  },
  example: ({ ariaLabel, error, helpText, isInvalid, label, ...props }) => (
    <EuiFormRow
      error={error.text}
      helpText={helpText.text}
      isInvalid={isInvalid}
      label={label.text}
    >
      <EuiSelect
        aria-label={ariaLabel}
        options={[
          { value: 'option-1', text: 'Option 1' },
          { value: 'option-2', text: 'Option 2' },
          { value: 'option-3', text: 'Option 3' },
        ]}
        value="option-1"
        onChange={() => {}}
        isInvalid={isInvalid}
        {...props}
      />
    </EuiFormRow>
  ),
});
