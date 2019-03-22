import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
} from '../../../../src/components';

import { reorder } from '../../../../src/components/drag_and_drop';

import { makeList } from './helper';

export default () => {
  const [list, setList] = useState(makeList(3));
  const onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      const items = reorder(
        list,
        source.index,
        destination.index
      );

      setList(items);
    }
  };
  return (
    <EuiDragDropContext onDragEnd={onDragEnd}>
      <EuiListGroup bordered flush>
        <EuiDroppable droppableId="CUSTOM_HANDLE_DROPPABLE_AREA">
          {list.map(({ content, id }, idx) => (
            <EuiDraggable key={id} index={idx} draggableId={id} customDragHandle={true}>
              {(provided) => (

                <EuiListGroupItem
                  icon={<div {...provided.dragHandleProps}><EuiIcon type="grab" /></div>}
                  label={content}
                />

              )}
            </EuiDraggable>
          ))}
        </EuiDroppable>
      </EuiListGroup>
    </EuiDragDropContext>
  );
};
