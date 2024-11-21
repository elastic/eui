/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj, ReactRenderer } from '@storybook/react';
import type { PlayFunctionContext } from '@storybook/csf';
import { expect, fireEvent, waitFor } from '@storybook/test';
import type { DragDropContextProps } from '@hello-pangea/dnd';

import { enableFunctionToggleControls } from '../../../.storybook/utils';
import { within } from '../../../.storybook/test';
import { LOKI_SELECTORS } from '../../../.storybook/loki';
import { sleep } from '../../test';

import { EuiPanel } from '../panel';
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader } from '../flyout';
import { EuiModal, EuiModalBody, EuiModalHeader } from '../modal';
import { EuiTitle } from '../title';

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
      codeSnippet: {
        resolveStoryElementOnly: true,
      },
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

export const WithinFlyouts: Story = {
  tags: ['vrt-only'],
  parameters: {
    loki: {
      skip: false,
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
  args: {
    children: (
      <EuiDroppable droppableId="droppableArea">
        <EuiDraggable
          spacing="m"
          index={0}
          draggableId="draggable-item-1"
          usePortal
          data-test-subj="draggable-item-1"
        >
          {(_, state) => (
            <EuiPanel hasShadow={state.isDragging}>
              Draggable item 1 {state.isDragging && '✨'}
            </EuiPanel>
          )}
        </EuiDraggable>
        <EuiDraggable
          spacing="m"
          index={1}
          draggableId="draggable-item-2"
          usePortal
          data-test-subj="draggable-item-2"
        >
          {(_, state) => (
            <EuiPanel hasShadow={state.isDragging}>
              Draggable item 2 {state.isDragging && '✨'}
            </EuiPanel>
          )}
        </EuiDraggable>
      </EuiDroppable>
    ),
  },
  render: (args) => <VRTStory type="flyout" {...args} />,
  play: async ({ canvasElement }: PlayFunctionContext<ReactRenderer>) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      expect(canvas.getByRole('dialog')).toBeInTheDocument();
      expect(canvas.getByRole('dialog')).toBeVisible();
    });

    await waitFor(async () => {
      await fireEvent.mouseDown(canvas.getByTestSubject('draggable-item-1'));
      await fireEvent.mouseMove(canvas.getByTestSubject('draggable-item-1'), {
        clientX: 0,
        clientY: 5,
      });

      expect(
        [...canvas.getByTestSubject('draggable-item-1').classList]
          .join('')
          .includes('isDragging')
      ).toBe(true);
    });

    await sleep(150); // add a timeout to prevent differences due to animation
  },
};

export const WithinModals: Story = {
  tags: ['vrt-only'],
  ...WithinFlyouts,
  render: (args) => <VRTStory type="modal" {...args} />,
};

const VRTStory = ({
  type,
  ...args
}: DragDropContextProps & { type: 'flyout' | 'modal' }) => {
  if (type === 'flyout') {
    return (
      <EuiFlyout ownFocus onClose={() => {}} data-test-subj="flyoutDragDrop">
        <EuiFlyoutHeader>
          <EuiTitle size="s">
            <h2>Drag & Drop inside a flyout</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiPanel color="subdued" paddingSize="none">
            <EuiDragDropContext {...args} />
          </EuiPanel>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }

  if (type === 'modal') {
    return (
      <EuiModal onClose={() => {}}>
        <EuiModalHeader>
          <EuiTitle size="s">
            <h2>Drag & Drop inside a modal</h2>
          </EuiTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiPanel color="subdued" paddingSize="none">
            <EuiDragDropContext {...args} />
          </EuiPanel>
        </EuiModalBody>
      </EuiModal>
    );
  }

  return null;
};
