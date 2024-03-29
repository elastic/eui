import React, { useState } from 'react';
import {
  EuiButton,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
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
        droppableId="CUSTOM_HANDLE_DROPPABLE_AREA"
        spacing="m"
        withPanel
      >
        {list.map(({ content, id }, idx) => (
          <EuiDraggable
            spacing="m"
            key={id}
            index={idx}
            draggableId={id}
            customDragHandle={true}
            hasInteractiveChildren={true}
          >
            {(provided) => (
              <EuiPanel paddingSize="s">
                <EuiFlexGroup alignItems="center" gutterSize="s">
                  <EuiFlexItem grow={false}>
                    <EuiPanel
                      color="transparent"
                      paddingSize="s"
                      {...provided.dragHandleProps}
                      aria-label="Drag Handle"
                    >
                      <EuiIcon type="grab" />
                    </EuiPanel>
                  </EuiFlexItem>
                  <EuiFlexItem grow={true}>
                    <EuiButton fullWidth onClick={() => {}}>
                      {content}
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPanel>
            )}
          </EuiDraggable>
        ))}
      </EuiDroppable>
    </EuiDragDropContext>
  );
};
