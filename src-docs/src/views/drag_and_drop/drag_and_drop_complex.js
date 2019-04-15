import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiButtonIcon,
  EuiPanel
} from '../../../../src/components';

import { move, reorder } from '../../../../src/components/drag_and_drop';

import { makeList } from './helper';

export default () => {
  const [list, setList] = useState([1, 2]);
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState(makeList(3, 4));
  const lists = { COMPLEX_DROPPABLE_PARENT: list, COMPLEX_DROPPABLE_AREA_1: list1, COMPLEX_DROPPABLE_AREA_2: list2 };
  const actions = { COMPLEX_DROPPABLE_PARENT: setList, COMPLEX_DROPPABLE_AREA_1: setList1, COMPLEX_DROPPABLE_AREA_2: setList2 };
  const onDragEnd = ({ source, destination }) => {
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

      <EuiDroppable
        droppableId="COMPLEX_DROPPABLE_PARENT"
        type="MACRO"
        direction="horizontal"
        withPanel
        spacing="l"
        style={{ display: 'flex' }}
      >
        {list.map((did, didx) => (
          <EuiDraggable
            key={did}
            index={didx}
            draggableId={`COMPLEX_DRAGGABLE_${did}`}
            spacing="l"
            style={{ flex: '1 0 50%' }}
            disableInteractiveElementBlocking // Allows button to be drag handle
          >
            {(provided) => (
              <EuiPanel paddingSize="s">
                <EuiButtonIcon
                  iconType="grab"
                  aria-label="Drag Handle"
                  {...provided.dragHandleProps}
                />
                <EuiDroppable droppableId={`COMPLEX_DROPPABLE_AREA_${did}`} type="MICRO" spacing="m" style={{ flex: '1 0 50%' }}>
                  {lists[`COMPLEX_DROPPABLE_AREA_${did}`].map(({ content, id }, idx) => (
                    <EuiDraggable key={id} index={idx} draggableId={id} spacing="m">
                      <EuiPanel>
                        {content}
                      </EuiPanel>
                    </EuiDraggable>
                  ))}
                </EuiDroppable>
              </EuiPanel>
            )}
          </EuiDraggable>
        ))}
      </EuiDroppable>

    </EuiDragDropContext>
  );
};
