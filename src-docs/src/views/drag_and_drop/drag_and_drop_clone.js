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
  copy,
  reorder
} from '../../../../src/components/drag_and_drop';

import { makeId, makeList } from './helper';

export default () => {
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState([]);
  const onDragEnd = ({ source, destination }) => {
    const lists = { DROPPABLE_AREA_COPY_1: list1, DROPPABLE_AREA_COPY_2: list2 };
    const actions = { DROPPABLE_AREA_COPY_1: setList1, DROPPABLE_AREA_COPY_2: setList2 };
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
        const result = copy(
          lists[sourceId],
          lists[destinationId],
          source,
          destination,
          {
            property: 'id',
            modifier: makeId
          }
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
          <EuiPanel paddingSize="none" grow={false}>
            <EuiDroppable droppableId="DROPPABLE_AREA_COPY_1" cloneDraggables={true} style={{ padding: '10px' }}>
              {list1.map(({ content, id }, idx) => (
                <EuiDraggable key={id} index={idx} draggableId={id}>
                  <EuiPanel>
                    {content}
                  </EuiPanel>
                </EuiDraggable>
              ))}
            </EuiDroppable>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="none">
            <EuiDroppable droppableId="DROPPABLE_AREA_COPY_2" style={{ padding: '10px', height: '100%' }}>
              {list2.map(({ content, id }, idx) => (
                <EuiDraggable key={id} index={idx} draggableId={id}>
                  <EuiPanel>
                    {content}
                  </EuiPanel>
                </EuiDraggable>
              ))}
            </EuiDroppable>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiDragDropContext>
  );
};
