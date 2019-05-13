import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDraggable,
  EuiDroppable,
  EuiIcon,
  EuiPanel,
} from '../../../../src/components';

import { move, reorder } from '../../../../src/components/drag_and_drop';

import { makeList } from './helper';

export default () => {
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState(makeList(3, 4));
  const onDragEnd = ({ source, destination }) => {
    const lists = { DROPPABLE_AREA_1: list1, DROPPABLE_AREA_2: list2 };
    const actions = { DROPPABLE_AREA_1: setList1, DROPPABLE_AREA_2: setList2 };
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
          <EuiDroppable
            droppableId="DROPPABLE_AREA_1"
            spacing="m"
            withPanel
            grow={false}>
            {list1.length > 0 ? (
              list1.map(({ content, id }, idx) => (
                <EuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
                  {(provided, state) => (
                    <EuiPanel>
                      {content}
                      {state.isDragging && ' ✨'}
                    </EuiPanel>
                  )}
                </EuiDraggable>
              ))
            ) : (
              <EuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}>
                <EuiFlexItem grow={false}>
                  <EuiIcon type="faceSad" />
                </EuiFlexItem>
              </EuiFlexGroup>
            )}
          </EuiDroppable>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiDroppable
            droppableId="DROPPABLE_AREA_2"
            spacing="m"
            withPanel
            grow={false}>
            {list2.length > 0 ? (
              list2.map(({ content, id }, idx) => (
                <EuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
                  {(provided, state) => (
                    <EuiPanel>
                      {content}
                      {state.isDragging && ' ✨'}
                    </EuiPanel>
                  )}
                </EuiDraggable>
              ))
            ) : (
              <EuiFlexGroup
                alignItems="center"
                justifyContent="spaceAround"
                gutterSize="none"
                style={{ height: '100%' }}>
                <EuiFlexItem grow={false}>
                  <EuiIcon type="faceSad" />
                </EuiFlexItem>
              </EuiFlexGroup>
            )}
          </EuiDroppable>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiDragDropContext>
  );
};
