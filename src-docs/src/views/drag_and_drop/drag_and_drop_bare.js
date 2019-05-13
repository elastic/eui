import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
} from '../../../../src/components';

import { makeList } from './helper';

export default () => {
  const [list] = useState(makeList(3));
  const onDragEnd = ({ source, destination }) => {
    console.log(source, destination);
  };
  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiDroppable droppableId="DROPPABLE_AREA_BARE">
        {list.map(({ content, id }, idx) => (
          <EuiDraggable key={id} index={idx} draggableId={id}>
            {() => <div>{content}</div>}
          </EuiDraggable>
        ))}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};
