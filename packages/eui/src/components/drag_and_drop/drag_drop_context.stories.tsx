/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { DragDropContextProps } from '@hello-pangea/dnd';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { EuiPanel } from '../panel';

import { EuiDroppable } from './droppable';
import { EuiDraggable } from './draggable';
import { EuiDragDropContext } from './drag_drop_context';

const meta: Meta<DragDropContextProps> = {
  title: 'Display/EuiDragDropContext',
  component: EuiDragDropContext,
  parameters: {
    loki: {
      // EuiDragDropContext doesn't do anything visual, we're testing the
      // visual parts with the Drag and Drop components separately
      skip: true,
    },
  },
};
enableFunctionToggleControls(meta, [
  'onBeforeDragStart',
  'onDragStart',
  'onDragUpdate',
  'onDragEnd',
]);

export default meta;
type Story = StoryObj<DragDropContextProps>;

export const Playground: Story = {
  args: {
    children: (
      <EuiDroppable droppableId="droppableArea">
        <EuiDraggable spacing="m" index={0} draggableId="draggable-item-1">
          {(_, state) => (
            <EuiPanel hasShadow={state.isDragging}>
              Draggable item 1 {state.isDragging && '✨'}
            </EuiPanel>
          )}
        </EuiDraggable>
        <EuiDraggable spacing="m" index={1} draggableId="draggable-item-2">
          {(_, state) => (
            <EuiPanel hasShadow={state.isDragging}>
              Draggable item 2 {state.isDragging && '✨'}
            </EuiPanel>
          )}
        </EuiDraggable>
      </EuiDroppable>
    ),
  },
};
