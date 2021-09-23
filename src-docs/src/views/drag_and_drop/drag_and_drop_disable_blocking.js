import React, { useState } from 'react';
import {
  EuiButton,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  euiDragDropReorder,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const makeId = htmlIdGenerator();

const makeList = (number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map((el) => {
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
      <EuiDroppable
        droppableId="DROPPABLE_AREA"
        spacing="m"
        withPanel
        grow={false}
      >
        {list.map(({ content, id }, idx) => (
          <EuiDraggable
            spacing="m"
            key={id}
            index={idx}
            draggableId={id}
            disableInteractiveElementBlocking
          >
            <EuiButton fullWidth onClick={() => {}}>
              {content}
            </EuiButton>
          </EuiDraggable>
        ))}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};
