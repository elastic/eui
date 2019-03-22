import React, { useState } from 'react';
import {
  EuiButtonIcon,
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
  const lists = { DROPPABLE_AREA_COPY_1: list1, DROPPABLE_AREA_COPY_2: list2 };
  const actions = { DROPPABLE_AREA_COPY_1: setList1, DROPPABLE_AREA_COPY_2: setList2 };
  const remove = (droppableId, index) => {
    const list = Array.from(lists[droppableId]);
    list.splice(index, 1);

    actions[droppableId](list);
  };
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
    } else if (!destination) {
      remove(source.droppableId, source.index);
    }
  };
  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiFlexGroup>
        <EuiFlexItem>

          <EuiDroppable droppableId="DROPPABLE_AREA_COPY_1" cloneDraggables={true}>
            {list1.map(({ content, id }, idx) => (
              <EuiDraggable key={id} index={idx} draggableId={id} spacing="l">
                <EuiPanel>
                  {content}
                </EuiPanel>
              </EuiDraggable>
            ))}
          </EuiDroppable>

        </EuiFlexItem>
        <EuiFlexItem>

          <EuiDroppable droppableId="DROPPABLE_AREA_COPY_2" withPanel spacing="l" grow>
            {list2.length ?
              (
                list2.map(({ content, id }, idx) => (
                  <EuiDraggable key={id} index={idx} draggableId={id} spacing="l">
                    <EuiPanel>
                      <EuiFlexGroup gutterSize="none" alignItems="center">
                        <EuiFlexItem>{content}</EuiFlexItem>
                        <EuiFlexItem grow={false}>
                          <EuiButtonIcon
                            iconType="cross"
                            aria-label="Remove"
                            onClick={() => remove('DROPPABLE_AREA_COPY_2', idx)}
                          />
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    </EuiPanel>
                  </EuiDraggable>
                ))
              ) : (
                <EuiFlexGroup alignItems="center" justifyContent="spaceAround" gutterSize="none" style={{ height: '100%' }}>
                  <EuiFlexItem grow={false}>Drop Items Here</EuiFlexItem>
                </EuiFlexGroup>
              )}
          </EuiDroppable>

        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiDragDropContext>
  );
};
