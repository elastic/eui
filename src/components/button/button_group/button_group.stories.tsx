/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { disableStorybookControls } from '../../../../.storybook/utils';

import { useEuiTheme } from '../../../services';
import {
  EuiButtonGroup,
  EuiButtonGroupProps,
  EuiButtonGroupOptionProps,
} from './button_group';

const meta: Meta<EuiButtonGroupProps> = {
  title: 'EuiButtonGroup',
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

export const SingleSelection: Story = {
  render: ({ ...args }) => <EuiButtonGroupSingle {...args} />,
  args: {
    legend: 'EuiButtonGroup - single selection',
    options,
    type: 'single',
    idSelected: 'button1',
  },
  argTypes: disableStorybookControls(['type']),
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
      onChange={onChange}
      idToSelectedMap={idToSelectedMap}
    />
  );
};

export const MultiSelection: Story = {
  render: ({ ...args }) => <EuiButtonGroupMulti {...args} />,
  args: {
    legend: 'EuiButtonGroup - multiple selections',
    options,
    type: 'multi',
    idToSelectedMap: { button1: true },
  },
  argTypes: disableStorybookControls(['type']),
};

export const WithTooltips: Story = {
  render: function Render({ options, ...args }: EuiButtonGroupProps) {
    const { euiTheme } = useEuiTheme();
    const [toolTipHidden, forceToolTipHidden] = useState(false);
    const forceHiddenToolTip = useCallback(() => forceToolTipHidden(true), []);
    const resetVisibility = useCallback(() => forceToolTipHidden(false), []);

    if (options[2].toolTipProps) {
      options[2].toolTipProps = {
        ...options[2].toolTipProps,
        // Example of how a consumer could force hiding the tooltip
        // via `toolTipProps`, state, and custom CSS
        anchorProps: {
          onClick: forceHiddenToolTip,
          onBlurCapture: resetVisibility,
          onMouseEnter: resetVisibility,
          onMouseLeave: forceHiddenToolTip,
        },
        css: [
          {
            transition: `opacity ${euiTheme.animation.normal} ${euiTheme.animation.resistance}`,
            animationFillMode: 'none !important',
          },
          toolTipHidden
            ? { opacity: '0 !important', pointerEvents: 'none' }
            : { opacity: '1' },
        ],
      };
    }

    return <EuiButtonGroupMulti options={options} {...args} />;
  },
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
        toolTipContent: 'Custom tooltip position and click behavior',
        toolTipProps: {
          position: 'right',
          title: 'Hello world',
        },
        // Consumers could also opt to hide titles if preferred
        title: '',
      },
    ],
    type: 'multi',
    idToSelectedMap: { button1: true },
  },
  argTypes: disableStorybookControls(['type']),
};
