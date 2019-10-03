import React, { useState } from 'react';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
} from '../../../../src/components';

import { euiDragDropReorder } from '../../../../src/components/drag_and_drop';

import { makeList } from './helper';

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
        droppableId="CUSTOM_HANDLE_DROPPABLE_AREA"
        spacing="m"
        withPanel>
        {list.map(({ content, id }, idx) => (
          <EuiDraggable
            spacing="m"
            key={id}
            index={idx}
            draggableId={id}
            customDragHandle={true}>
            {provided => (
              <EuiPanel className="custom" paddingSize="m">
                <EuiFlexGroup>
                  <EuiFlexItem grow={false}>
                    <div {...provided.dragHandleProps}>
                      <EuiIcon type="grab" />
                    </div>
                  </EuiFlexItem>
                  <EuiFlexItem>{content}</EuiFlexItem>
                </EuiFlexGroup>
              </EuiPanel>
            )}
          </EuiDraggable>
        ))}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};
