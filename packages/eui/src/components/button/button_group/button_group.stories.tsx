/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../../.storybook/utils';

import { EuiSpacer } from '../../spacer';
import {
  EuiButtonGroup,
  EuiButtonGroupProps,
  EuiButtonGroupOptionProps,
} from './button_group';

const meta: Meta<EuiButtonGroupProps> = {
  title: 'Navigation/EuiButtonGroup',
  // @ts-ignore This still works for Storybook controls, even though Typescript complains
  component: EuiButtonGroup,
  argTypes: {
    type: {
      options: ['single', 'multi'],
      control: { type: 'radio' },
    },
    idSelected: {
      control: 'text',
      if: { arg: 'type', eq: 'single' },
    },
    idToSelectedMap: {
      control: 'object',
      if: { arg: 'type', eq: 'multi' },
    },
  },
  args: {
    // Component defaults
    type: 'single',
    buttonSize: 's',
    color: 'text',
    isDisabled: false,
    isFullWidth: false,
    isIconOnly: false,
    options: [],
  },
};
disableStorybookControls(meta, ['type']);

export default meta;
type Story = StoryObj<EuiButtonGroupProps>;

const options: EuiButtonGroupOptionProps[] = [
  {
    id: 'button1',
    label: 'Option one',
  },
  {
    id: 'button2',
    label: 'Option two',
  },
  {
    id: 'button3',
    label: 'Option three',
  },
];

const StatefulEuiButtonGroupSingle = (props: any) => {
  const [idSelected, setIdSelected] = useState(props.idSelected);

  return (
    <EuiButtonGroup
      {...props}
      onChange={(id) => setIdSelected(id)}
      idSelected={idSelected}
    />
  );
};

export const SingleSelection: Story = {
  render: ({ ...args }) => <StatefulEuiButtonGroupSingle {...args} />,
  args: {
    legend: 'EuiButtonGroup - single selection',
    options,
    type: 'single',
    idSelected: 'button1',
  },
};

const StatefulEuiButtonGroupMulti = (props: any) => {
  const [idToSelectedMap, setIdToSelectedMap] = useState<
    Record<string, boolean>
  >(props.idToSelectedMap);

  const onChange = (id: string) => {
    const newSelectedMap = {
      ...idToSelectedMap,
      [id]: !idToSelectedMap[id],
    };
    setIdToSelectedMap(newSelectedMap);
  };

  return (
    <EuiButtonGroup
      type="multi"
      {...props}
      onChange={onChange}
      idToSelectedMap={idToSelectedMap}
    />
  );
};

export const MultiSelection: Story = {
  render: ({ ...args }) => <StatefulEuiButtonGroupMulti {...args} />,
  args: {
    legend: 'EuiButtonGroup - multiple selections',
    options,
    type: 'multi',
    idToSelectedMap: { button1: true },
  },
};

export const WithTooltips: Story = {
  render: ({ ...args }) => <StatefulEuiButtonGroupMulti {...args} />,
  args: {
    legend: 'EuiButtonGroup - tooltip UI testing',
    isIconOnly: true, // Start example with icons to demonstrate usefulness of tooltips
    options: [
      {
        id: 'button1',
        iconType: 'securitySignal',
        label: 'No tooltip',
      },
      {
        id: 'button2',
        iconType: 'securitySignalResolved',
        label: 'Standard tooltip',
        toolTipContent: 'Hello world',
      },
      {
        id: 'customToolTipProps',
        iconType: 'securitySignalDetected',
        label: 'Custom tooltip',
        toolTipContent: 'Custom tooltip position and delay',
        toolTipProps: {
          position: 'right',
          delay: 'long',
          title: 'Hello world',
        },
        // Consumers could also opt to hide titles if preferred
        title: '',
      },
    ],
    type: 'multi',
    idToSelectedMap: { button1: true },
  },
};

export const IconOnly: Story = {
  tags: ['vrt-only'],
  args: {
    legend: 'EuiButtonGroup - isIconOnly',
    options: [
      {
        id: 'button1',
        label: 'Option one',
        iconType: 'faceHappy',
      },
      {
        id: 'button2',
        label: 'Option two',
        iconType: 'faceNeutral',
      },
      {
        id: 'button3',
        label: 'Option three',
        iconType: 'faceSad',
      },
    ],
    type: 'single',
    idSelected: 'button1',
    isIconOnly: true,
  },
  render: function Render({ ...args }: EuiButtonGroupProps) {
    return (
      <>
        <EuiButtonGroup {...args} buttonSize="compressed" />
        <EuiSpacer />
        <EuiButtonGroup {...args} buttonSize="s" />
        <EuiSpacer />
        <EuiButtonGroup {...args} buttonSize="m" />
      </>
    );
  },
};

export const HighContrast: Story = {
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
  render: () => {
    const props = {
      options: [
        { id: '1', label: 'One', isDisabled: true },
        { id: '2', label: 'Two' },
        { id: '3', label: 'Three' },
        { id: '4', label: 'Four' },
        { id: '5', label: 'Five' },
        { id: '6', label: 'Six' },
      ],
      type: 'multi' as const,
      idToSelectedMap: { '3': true, '4': true },
      legend: '',
      onChange: () => {},
    };
    return (
      <>
        <EuiButtonGroup {...props} color="primary" />
        <br />
        <br />
        <EuiButtonGroup {...props} buttonSize="compressed" />
      </>
    );
  },
};
