/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiButtonGroup,
  EuiButtonGroupProps,
  EuiButtonGroupOptionProps,
} from './button_group';

const meta: Meta<EuiButtonGroupProps> = {
  title: 'EuiButtonGroup',
  // @ts-ignore This still works for Storybook controls, even though Typescript complains
  component: EuiButtonGroup,
  parameters: {
    controls: {
      exclude: ['data-test-subj'],
    },
  },
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
    options: {
      control: 'array',
    },
    buttonSize: {
      control: 'select',
    },
  },
};

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

const EuiButtonGroupSingle = (props: any) => {
  const [idSelected, setIdSelected] = useState(props.idSelected);

  return (
    <EuiButtonGroup
      {...props}
      onChange={(id) => setIdSelected(id)}
      idSelected={idSelected}
    />
  );
};

const EuiButtonGroupMulti = (props: any) => {
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
      options={options}
      onChange={onChange}
      idToSelectedMap={idToSelectedMap}
    />
  );
};

export const Playground: Story = {
  render: ({ ...args }) => {
    if (args.type === 'multi') {
      return <EuiButtonGroupMulti {...args} />;
    } else {
      return <EuiButtonGroupSingle {...args} />;
    }
  },
  args: {
    legend: 'EuiButtonGroup demo',
    type: 'single',
    options,
    idSelected: 'button1',
    idToSelectedMap: { button1: true },
    buttonSize: 's',
    color: 'text',
    isDisabled: false,
    isFullWidth: false,
    isIconOnly: false,
  } as any,
};
