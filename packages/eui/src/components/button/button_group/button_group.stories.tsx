/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import figma from '@figma/code-connect';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import { disableStorybookControls } from '../../../../.storybook/utils';

import {
  EuiButtonGroup,
  EuiButtonGroupProps,
  EuiButtonGroupOptionProps,
} from './button_group';

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

/* Notice how within the same file we have 2 component wrappers,
  - one for single selection
  - and one for multi selection

  Using these wrappers as-is in render function will result in an incorrect code snippet:

  ```tsx
  <StatefulEuiButtonGroupSingle
    buttonSize="s"
    color="text"
    isFullWidth
  />
  ```

  Component name should be EuiButtonGroup and there are important props missing
  like `type`, `options`, `onChange`, `idSelected` / `idToSelectedMap`.

  Instead, 1) we could leverage args and useArgs utility hook from Storybook.
  to synchronize the sandbox component state with Storybook controls panel.
  (Source: https://storybook.js.org/docs/writing-stories/args#setting-args-from-within-a-story)
*/

const StatefulEuiButtonGroupSingle = (props: EuiButtonGroupProps) => {
  const [{ idSelected }, updateArgs] = useArgs();

  const onChange = (idSelected: EuiButtonGroupProps['idSelected']) => {
    updateArgs({ idSelected });
  };

  return (
    <EuiButtonGroup {...props} onChange={onChange} idSelected={idSelected} />
  );
};

export const SingleSelection: Story = {
  render: (args: EuiButtonGroupProps) => (
    <StatefulEuiButtonGroupSingle {...args} />
  ),
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
    options: {
      control: 'array',
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
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/RzfYLj2xmH9K7gQtbSKygn/Elastic-UI?node-id=31735-392753&node-type=frame&m=dev',
      examples: [SingleSelection],
      props: {
        buttonSize: figma.enum('Size', {
          'Small*': 's',
          Medium: 'm',
          Compressed: 'compressed',
        }),
        color: figma.enum('Color', {
          'Neutral*': 'text',
          Primary: 'primary',
          // TODO: document discrepancy between Figma and EUI
          // accent, success, warning, danger
        }),
        isDisabled: figma.boolean('Disabled'),
        isFullWidth: figma.boolean('Full width'),
        isIconOnly: figma.boolean('Icon only'),
      },
    },
  },
};
disableStorybookControls(meta, ['type']);

export default meta;
