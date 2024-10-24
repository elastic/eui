/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react';

import {
  disableStorybookControls,
  moveStorybookControlsToCategory,
} from '../../../../.storybook/utils';
import { EuiFormRow } from '../form_row';

import { EuiFieldText, EuiFieldTextProps } from './field_text';

// We need to add some args to make the snippet fully accurate
// Here, args do not map 1:1 to props
type Story = StoryObj<
  EuiFieldTextProps & {
    ariaLabel: string;
    error: { text?: string };
    helpText: { text?: string };
    label: { text?: string };
  }
>;

export const Playground: Story = {
  render: ({ ariaLabel, error, helpText, isInvalid, label, ...props }) => (
    <EuiFormRow
      error={error.text}
      helpText={helpText.text}
      isInvalid={isInvalid}
      label={label.text}
    >
      <EuiFieldText
        aria-label={ariaLabel}
        value={''}
        onChange={() => {}}
        isInvalid={isInvalid}
        {...props}
      />
    </EuiFormRow>
  ),
};

export const IconShape: Story = {
  parameters: {
    controls: {
      include: [
        'icon',
        'compressed',
        'fullWidth',
        'prepend',
        'append',
        'isInvalid',
        'isLoading',
        'disabled',
        'readOnly',
      ],
    },
  },
  argTypes: { icon: { control: 'object' } },
  args: { icon: { type: 'warning', color: 'warning', side: 'left' } },
};
// Move other props below the icon prop
moveStorybookControlsToCategory(IconShape, [
  'compressed',
  'fullWidth',
  'isInvalid',
  'isLoading',
  'disabled',
  'readOnly',
  'prepend',
  'append',
]);

export const AutoFill: Story = {
  parameters: {
    controls: { include: ['name', 'isInvalid'] },
    loki: { skip: true },
  },
  decorators: [
    (Story) => (
      <form action="#">
        In Chrome: Type any text, press Enter, then go back and select the
        autofill suggestion. Test light+dark mode as well as invalid state
        <br />
        <br />
        <Story />
      </form>
    ),
  ],
  args: {
    name: 'autofill-test',
  },
};

const meta: Meta<EuiFieldTextProps> = {
  title: 'Forms/EuiFieldText',
  component: EuiFieldText,
  argTypes: {
    // For quicker/easier QA
    icon: { control: 'text' },
    prepend: { control: 'text' },
    append: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    // Component defaults
    compressed: false,
    fullWidth: false,
    isInvalid: false,
    isLoading: false,
    disabled: false,
    readOnly: false,
    controlOnly: false,
    // Added for easier testing
    placeholder: 'EuiFieldText',
    id: '',
    name: '',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=13676-796&node-type=frame&m=dev',
      examples: [Playground],
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
    },
  },
};

export default meta;
disableStorybookControls(meta, ['inputRef']);
