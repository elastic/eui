import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiPanel,
  euiDragDropReorder,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const makeId = htmlIdGenerator();

const makeList = (number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map(el => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    };
  });

export default () => {
  const [list, setList] = useState(makeList(3));
  const onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      const items = euiDragDropReorder(list, source.index, destination.index);

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
