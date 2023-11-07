import React, { useState } from 'react';
import {
  EuiPopover,
  EuiButton,
  EuiPanel,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  euiDragDropReorder,
} from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

const makeList = (number: number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map((el) => {
    return {
      content: `Item ${el}`,
      id: useGeneratedHtmlId(),
    };
  });

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [list, setList] = useState(makeList(3));

  return (
    <EuiPopover
      hasDragDrop
      isOpen={isPopoverOpen}
      closePopover={() => setIsPopoverOpen(false)}
      button={
        <EuiButton onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
          Toggle popover with drag and drop content
        </EuiButton>
      }
      panelPaddingSize="none"
      panelProps={{ css: { inlineSize: 200 } }}
    >
      <EuiDragDropContext
        onDragEnd={({ source, destination }) => {
          if (source && destination) {
            const items = euiDragDropReorder(
              list,
              source.index,
              destination.index
            );
            setList(items);
          }
        }}
      >
        <EuiDroppable droppableId="droppableInPopover" spacing="m">
          {list.map(({ content, id }, idx) => (
            <EuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
              {(provided, state) => (
                <EuiPanel hasShadow={state.isDragging}>{content}</EuiPanel>
              )}
            </EuiDraggable>
          ))}
        </EuiDroppable>
      </EuiDragDropContext>
    </EuiPopover>
  );
};
