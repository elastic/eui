/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiPanel } from '../panel';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiIcon } from '../icon';
import { EuiButton } from '../button';

import { EuiDragDropContext } from './drag_drop_context';
import { EuiDroppable } from './droppable';
import { EuiDraggable, EuiDraggableProps } from './draggable';

const meta: Meta<EuiDraggableProps> = {
  title: 'Display/EuiDraggable',
  component: EuiDraggable,
  decorators: [
    (Story, { args }) => (
      <EuiDragDropContext onDragEnd={action('onDragEnd')}>
        <EuiDroppable droppableId="droppableArea">
          <Story {...args} />
        </EuiDroppable>
      </EuiDragDropContext>
    ),
  ],
  argTypes: {
    index: {
      type: {
        name: 'number',
        required: true,
      },
    },
    draggableId: {
      type: {
        name: 'string',
        required: true,
      },
    },
  },
  args: {
    customDragHandle: false,
    isDragDisabled: false,
    hasInteractiveChildren: false,
    isRemovable: false,
    spacing: 'none',
    usePortal: false,
  },
};
hideStorybookControls(meta, ['style']);

export default meta;
type Story = StoryObj<EuiDraggableProps>;

export const Playground: Story = {
  args: {
    draggableId: 'draggable-item',
    index: 0,
    children: <EuiPanel>Draggable item</EuiPanel>,
  },
};

export const Interactive: Story = {
  parameters: {
    controls: {
      include: [
        'hasInteractiveChildren',
        'isDragDisabled',
        'spacing',
        'customDragHandle',
      ],
    },
    codeSnippet: {
      // TODO: enable once render functions are supported
      skip: true,
    },
  },
  args: {
    draggableId: 'draggable-item',
    index: 0,
    hasInteractiveChildren: true,
    customDragHandle: true,
  },
  render: (args) => (
    <EuiDraggable {...args}>
      {(provided) => (
        <EuiPanel paddingSize="s">
          <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiPanel
                color="transparent"
                paddingSize="s"
                {...provided.dragHandleProps}
                aria-label="Drag Handle"
              >
                <EuiIcon type="grab" />
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem grow={true}>
              <EuiButton fullWidth onClick={action('onButtonClick')}>
                Draggable item
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      )}
    </EuiDraggable>
  ),
};
