/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement, useState } from 'react';
import { OnDragEndResponder, OnDragUpdateResponder } from '@hello-pangea/dnd';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { hideStorybookControls } from '../../../.storybook/utils';
import { htmlIdGenerator } from '../../services';
import { EuiPanel } from '../panel';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiIcon } from '../icon';
import { EuiButtonIcon } from '../button';

import { euiDragDropCopy, euiDragDropReorder } from './services';
import { EuiDragDropContext } from './drag_drop_context';
import { EuiDraggable } from './draggable';
import { EuiDroppable, EuiDroppableProps } from './droppable';

const makeId = htmlIdGenerator();

const meta: Meta<EuiDroppableProps> = {
  title: 'Display/EuiDroppable',
  component: EuiDroppable,
  argTypes: {
    droppableId: {
      type: {
        name: 'string',
        required: true,
      },
    },
  },
  args: {
    cloneDraggables: false,
    isDropDisabled: false,
    spacing: 'none',
    type: 'EUI_DEFAULT',
    withPanel: false,
    grow: false,
  },
};
hideStorybookControls(meta, ['style']);

export default meta;
type Story = StoryObj<EuiDroppableProps>;

export const Playground: Story = {
  args: {
    droppableId: 'droppableArea',
    children: [
      <EuiDraggable spacing="m" index={0} draggableId="draggable-item-1">
        {(_, state) => (
          <EuiPanel hasShadow={state.isDragging}>
            Draggable item 1 {state.isDragging && '✨'}
          </EuiPanel>
        )}
      </EuiDraggable>,
      <EuiDraggable spacing="m" index={1} draggableId="draggable-item-2">
        {(_, state) => (
          <EuiPanel hasShadow={state.isDragging}>
            Draggable item 2 {state.isDragging && '✨'}
          </EuiPanel>
        )}
      </EuiDraggable>,
    ],
  },
  render: (args) => <StatefulPlayground {...args} />,
};

export const CloneDraggables: Story = {
  parameters: {
    controls: {
      include: [
        'cloneDraggables',
        'isDropDisabled',
        'grow',
        'spacing',
        'withPanel',
      ],
    },
  },
  args: {
    cloneDraggables: true,
    grow: true,
    withPanel: true,
    children: [
      <EuiDraggable spacing="m" index={0} draggableId="draggable-item-1">
        {(_, state) => (
          <EuiPanel hasShadow={state.isDragging}>
            Draggable item 1 {state.isDragging && '✨'}
          </EuiPanel>
        )}
      </EuiDraggable>,
      <EuiDraggable spacing="m" index={1} draggableId="draggable-item-2">
        {(_, state) => (
          <EuiPanel hasShadow={state.isDragging}>
            Draggable item 2 {state.isDragging && '✨'}
          </EuiPanel>
        )}
      </EuiDraggable>,
    ],
  },
  render: (args) => <StatefulCloneDraggables {...args} />,
};

const StatefulPlayground = ({ children, ...rest }: EuiDroppableProps) => {
  const [items, setItems] = useState<ReactElement[]>(
    Array.isArray(children) ? children : []
  );
  const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
    if (source && destination) {
      const updatedItems = euiDragDropReorder(
        items,
        source.index,
        destination.index
      );

      setItems(updatedItems);

      action('onDragEnd')({ source, destination });
    }
  };

  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiDroppable {...rest}>
        {items && items.length > 0
          ? items.map((child, idx) =>
              // using cloneElement for story presentation purpose
              // to ensure children arg is set as ReactElement[]
              React.cloneElement(child, {
                index: idx,
                key: `draggable-item-${idx}`,
                draggableId: `draggable-item-${idx}`,
              })
            )
          : children}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};

const StatefulCloneDraggables = ({
  children,
  cloneDraggables,
  ...rest
}: EuiDroppableProps) => {
  const [isItemRemovable, setIsItemRemovable] = useState(false);
  const [list1, setList1] = useState<ReactElement[]>(
    Array.isArray(children) ? children : []
  );
  const [list2, setList2] = useState<ReactElement[]>([]);
  const lists: { [key: string]: ReactElement[] } = {
    DROPPABLE_AREA_COPY_1: list1,
    DROPPABLE_AREA_COPY_2: list2,
  };
  const actions: { [key: string]: React.Dispatch<ReactElement[]> } = {
    DROPPABLE_AREA_COPY_1: setList1,
    DROPPABLE_AREA_COPY_2: setList2,
  };
  const remove = (droppableId: string, index: number) => {
    const list = Array.from(lists[droppableId]);
    list.splice(index, 1);

    actions[droppableId](list);
  };
  const onDragUpdate: OnDragUpdateResponder = ({ source, destination }) => {
    const shouldRemove =
      !destination && source.droppableId === 'DROPPABLE_AREA_COPY_2';
    setIsItemRemovable(shouldRemove);

    action('onDragUpdate')({ source, destination });
  };
  const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const id = destination.droppableId;
        const items = euiDragDropReorder(
          lists[id],
          source.index,
          destination.index
        );

        actions[id](items);

        action('onDragEnd reorder');
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = euiDragDropCopy(
          lists[sourceId],
          lists[destinationId],
          source,
          destination,
          {
            property: 'id',
            modifier: makeId,
          }
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);

        action('onDragEnd copy')({ source, destination });
      }
    } else if (!destination && source.droppableId === 'DROPPABLE_AREA_COPY_2') {
      remove(source.droppableId, source.index);

      action('onDragEnd remove')({ source, destination });
    }
  };

  return (
    <EuiDragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <EuiFlexGroup responsive={false}>
        <EuiFlexItem style={{ width: '50%' }}>
          <EuiDroppable
            {...rest}
            droppableId="DROPPABLE_AREA_COPY_1"
            cloneDraggables={cloneDraggables}
          >
            {list1 && list1.length > 0
              ? list1.map((child, idx) =>
                  React.cloneElement(child, {
                    index: idx,
                    key: `draggable-item-${idx}`,
                    draggableId: `draggable-item-${idx}`,
                  })
                )
              : children}
          </EuiDroppable>
        </EuiFlexItem>
        <EuiFlexItem style={{ width: '50%' }}>
          <EuiDroppable
            {...rest}
            droppableId="DROPPABLE_AREA_COPY_2"
            cloneDraggables={false}
          >
            {list2.length ? (
              list2.map((child, idx) =>
                React.cloneElement(
                  child,
                  {
                    index: idx,
                    key: `draggable-item-${idx}`,
                    draggableId: `draggable-copied-item-${idx}`,
                    isRemovable: isItemRemovable,
                  },
                  <EuiPanel>
                    <EuiFlexGroup
                      gutterSize="none"
                      alignItems="center"
                      responsive={false}
                    >
                      <EuiFlexItem>Draggable item {idx + 1}</EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        {isItemRemovable ? (
                          <EuiIcon type="trash" color="danger" />
                        ) : (
                          <EuiButtonIcon
                            iconType="cross"
                            aria-label="Remove"
                            onClick={() => remove('DROPPABLE_AREA_COPY_2', idx)}
                          />
                        )}
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiPanel>
                )
              )
            ) : (
              <EuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}
                responsive={false}
              >
                <EuiFlexItem grow={false}>Drop Items Here</EuiFlexItem>
              </EuiFlexGroup>
            )}
          </EuiDroppable>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiDragDropContext>
  );
};
