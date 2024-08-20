/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiButton } from '../../button';
import { EuiSpacer } from '../../spacer';
import {
  EuiForm,
  EuiFieldText,
  EuiFieldNumber,
  EuiSwitch,
  EuiFilePicker,
  EuiSelect,
  EuiRange,
} from '../../form';

import { EuiFormRow, EuiFormRowProps } from './form_row';

const meta: Meta<EuiFormRowProps> = {
  title: 'Forms/EuiForm/EuiFormRow',
  component: EuiFormRow,
  decorators: [
    (Story, { args }) => (
      <EuiForm component="form">
        <Story {...args} />
      </EuiForm>
    ),
  ],
  argTypes: {
    children: {
      type: {
        // @ts-ignore - name is required; overwrite type to match props type
        name: 'ReactElement',
        required: true,
      },
    },
    label: { control: 'text' },
    labelAppend: { control: 'text' },
  },
  args: {
    display: 'row',
    hasEmptyLabelSpace: false,
    describedByIds: [],
    labelType: 'label',
    hasChildLabel: true,
    // set up for easier testing/QA
    fullWidth: false,
    isDisabled: false,
    isInvalid: false,
    helpText: '',
    error: '',
    id: '',
    label: '',
    labelAppend: '',
  },
};

export default meta;
type Story = StoryObj<EuiFormRowProps>;

export const Playground: Story = {
  argTypes: {
    hasEmptyLabelSpace: { if: { arg: 'label', truthy: false } },
  },
  args: {
    children: <EuiFieldText />,
    label: 'Text field label',
    helpText: 'I am some friendly help text.',
  },
};

export const ColumnLayout: Story = {
  parameters: {
    // Show for relevant props documentation, but don't allow configuring
    controls: { include: ['display'] },
    codeSnippet: {
      // Not 1:1 with actual rendering, just a bare-bones example to get devs started
      snippet: `
      <EuiFormRow label="Text" display="columnCompressed">
        <EuiFieldText compressed />
      </EuiFormRow>
      `,
    },
  },
  argTypes: { display: { control: false } },
  args: { display: 'columnCompressed' },
  render: ({ ..._args }) => (
    <div style={{ maxInlineSize: 300 }}>
      <EuiFormRow
        label="This is an extremely long label" // CSS hyphens testing
        helpText="I am some friendly help text."
        display="columnCompressed"
      >
        <EuiFieldText name="first" isLoading compressed />
      </EuiFormRow>
      <EuiFormRow display="columnCompressed" label="Switch">
        <EuiSwitch
          showLabel={false}
          label="Switch"
          name="switch"
          checked={false}
          onChange={() => {}}
          compressed
        />
      </EuiFormRow>
      <EuiFormRow label="Select" display="columnCompressed">
        <EuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
          prepend="A"
          append="B"
        />
      </EuiFormRow>
      <EuiFormRow label="File picker" display="columnCompressed">
        <EuiFilePicker compressed display="default" />
      </EuiFormRow>
      <EuiFormRow label="Range" display="columnCompressed">
        <EuiRange
          min={0}
          max={100}
          name="range"
          id="rangeId"
          showInput
          compressed
          value={50}
          onChange={() => {}}
        />
      </EuiFormRow>
    </div>
  ),
};

export const InlineLayout: Story = {
  parameters: {
    // Show for relevant props documentation, but don't allow configuring
    controls: { include: ['display', 'hasEmptyLabelSpace'] },
    codeSnippet: {
      // Not 1:1 with actual rendering, just a bare-bones example to get devs started
      snippet: `
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow label="Text">
            <EuiFieldText compressed />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace display="centerCompressed">
            <EuiButton size="s">Save</EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      `,
    },
  },
  argTypes: {
    display: { control: false },
    hasEmptyLabelSpace: { control: false },
  },
  render: ({ ..._args }) => (
    <>
      <RenderInlineLayout compressed={false} />
      <EuiSpacer />
      <RenderInlineLayout compressed={true} />
    </>
  ),
};
const RenderInlineLayout = ({ compressed }: { compressed: boolean }) => (
  <EuiFlexGroup
    style={{ maxInlineSize: 600 }}
    responsive={false}
    gutterSize="s"
  >
    <EuiFlexItem grow={1}>
      <EuiFormRow label="Age">
        <EuiFieldNumber placeholder="42" compressed={compressed} />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={3}>
      <EuiFormRow label="Full name">
        <EuiFieldText
          icon="user"
          placeholder="Hello World"
          compressed={compressed}
        />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFormRow
        hasEmptyLabelSpace
        display={compressed ? 'centerCompressed' : 'center'}
      >
        <EuiSwitch
          compressed={compressed}
          label="Toggle"
          showLabel={false}
          checked
          onChange={() => {}}
        />
      </EuiFormRow>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiFormRow
        hasEmptyLabelSpace
        display={compressed ? 'centerCompressed' : 'center'}
      >
        <EuiButton size={compressed ? 's' : 'm'}>Save</EuiButton>
      </EuiFormRow>
    </EuiFlexItem>
  </EuiFlexGroup>
);
