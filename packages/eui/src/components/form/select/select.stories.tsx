/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import figma from '@figma/code-connect';

import {
  disableStorybookControls,
  enableFunctionToggleControls,
} from '../../../../.storybook/utils';
import { EuiIcon } from '../../icon';
import { EuiFormRow } from '../form_row';

import { EuiSelect, EuiSelectProps } from './select';

// We need to add story-specific arguments (that do not map directly to component props)
type Story = StoryObj<
  EuiSelectProps & {
    ariaLabel: string;
    error: { text?: string };
    helpText: { text?: string };
    label: { text?: string };
  }
>;

export const Playground: Story = {
  args: {
    defaultValue: 'option-2',
    options: [
      { value: 'option-1', text: 'Option 1' },
      { value: 'option-2', text: 'Option 2' },
      { value: 'option-3', text: 'Option 3' },
    ],
  },
  // Each prop has to be explicitly defined to be present in the Code Connect code snippet
  // but if it's not available in the Figma mapping, the parsing will fail if we add it as an explicit story arg
  render: ({
    ariaLabel,
    error,
    helpText,
    isInvalid,
    label,
    /* options - this will fail parsing */
    ...props
  }) => (
    <EuiFormRow
      error={error.text}
      helpText={helpText.text}
      isInvalid={isInvalid}
      label={label.text}
    >
      <EuiSelect
        aria-label={ariaLabel}
        value="option-1"
        options={[
          { value: 'option-1', text: 'Option 1' },
          { value: 'option-2', text: 'Option 2' },
          { value: 'option-3', text: 'Option 3' },
        ]}
        onChange={() => {}}
        isInvalid={isInvalid}
        {...props}
      />
    </EuiFormRow>
  ),
};

const meta: Meta<EuiSelectProps> = {
  title: 'Forms/EuiSelect',
  component: EuiSelect,
  parameters: {
    controls: {
      // Excude onMouseUp from controls, as it's not a terribly useful prop to document
      exclude: ['onMouseUp'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=15883-129716&node-type=frame&m=dev',
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
  argTypes: {
    append: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Appended',
        undefined: undefined,
      },
    },
    prepend: {
      control: 'radio',
      options: [undefined, 'icon', 'text'],
      mapping: {
        icon: <EuiIcon type="faceHappy" />,
        text: 'Prepended',
        undefined: undefined,
      },
    },
  },
  args: {
    fullWidth: false,
    isLoading: false,
    hasNoInitialSelection: false,
    compressed: false,
    // set up for easier testing/QA
    isInvalid: false,
    disabled: false,
    id: '',
    name: '',
  },
};
// adding onChange for visibility
enableFunctionToggleControls(meta, ['onChange']);
disableStorybookControls(meta, ['inputRef']);

export default meta;
