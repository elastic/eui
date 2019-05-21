import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiPanel,
} from '../../../../src/components';

import { reorder } from '../../../../src/components/drag_and_drop';

import { makeList } from './helper';

export default () => {
  const [list, setList] = useState(makeList(3));
  const onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      const items = reorder(list, source.index, destination.index);

      setList(items);
    }
  };
  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiDroppable droppableId="DROPPABLE_AREA" spacing="m" withPanel>
        {list.map(({ content, id }, idx) => (
          <EuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
            {(provided, state) => (
              <EuiPanel hasShadow={state.isDragging}>
                {content}
                {state.isDragging && ' ✨'}
              </EuiPanel>
            )}
          </EuiDraggable>
        ))}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};
