import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDraggable,
  EuiDroppable,
  EuiPanel
} from '../../../../src/components';

import {
  move,
  reorder
} from '../../../../src/components/drag_and_drop';

import { makeList } from './helper';

export default () => {
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState(makeList(3, 4));
  const [list3, setList3] = useState(makeList(3, 7));
  const onDragEnd = ({ source, destination }) => {
    const lists = { DROPPABLE_AREA_TYPE_1: list1, DROPPABLE_AREA_TYPE_2: list2, DROPPABLE_AREA_TYPE_3: list3 };
    const actions = { DROPPABLE_AREA_TYPE_1: setList1, DROPPABLE_AREA_TYPE_2: setList2, DROPPABLE_AREA_TYPE_3: setList3 };
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          lists[destination.droppableId],
          source.index,
          destination.index
        );

        actions[destination.droppableId](items);
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = move(
          lists[sourceId],
          lists[destinationId],
          source,
          destination
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }

    }
  };
  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiFlexGroup>
        <EuiFlexItem>

          <EuiDroppable droppableId="DROPPABLE_AREA_TYPE_1" type="TYPE_ONE" spacing="m" withPanel grow={false}>
            {list1.map(({ content, id }, idx) => (
              <EuiDraggable key={id} index={idx} draggableId={id} spacing="m">
                {(provided, state) => (
                  <EuiPanel hasShadow={state.isDragging}>
                    {content}{state.isDragging && ' ✨'}
                  </EuiPanel>
                )}
              </EuiDraggable>
            ))}
          </EuiDroppable>

        </EuiFlexItem>
        <EuiFlexItem>

          <EuiDroppable droppableId="DROPPABLE_AREA_TYPE_2" type="TYPE_ONE" spacing="m" withPanel grow={false}>
            {list2.map(({ content, id }, idx) => (
              <EuiDraggable key={id} index={idx} draggableId={id} spacing="m">
                {(provided, state) => (
                  <EuiPanel hasShadow={state.isDragging}>
                    {content}{state.isDragging && ' ✨'}
                  </EuiPanel>
                )}
              </EuiDraggable>
            ))}
          </EuiDroppable>

        </EuiFlexItem>
        <EuiFlexItem>

          <EuiDroppable droppableId="DROPPABLE_AREA_TYPE_3" type="TYPE_TWO" spacing="m" withPanel grow={true}>
            {list3.map(({ content, id }, idx) => (
              <EuiDraggable key={id} index={idx} draggableId={id} spacing="m">
                {(provided, state) => (
                  <EuiPanel hasShadow={state.isDragging}>
                    {content}{state.isDragging && ' ✨'}
                  </EuiPanel>
                )}
              </EuiDraggable>
            ))}
          </EuiDroppable>

        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiDragDropContext>
  );
};
