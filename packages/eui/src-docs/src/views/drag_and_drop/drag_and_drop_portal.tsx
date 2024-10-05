import React, { FunctionComponent, ReactElement, useState } from 'react';
import {
  EuiButton,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiTitle,
  euiDragDropReorder,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';
import { DroppableProps, OnDragEndResponder } from '@hello-pangea/dnd';

const makeId = htmlIdGenerator();

const makeList = (number: number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map((el) => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    };
  });

const DragContainer: FunctionComponent<{
  children: ReactElement | ReactElement[] | DroppableProps['children'];
  onDragEnd: OnDragEndResponder;
}> = ({ children, onDragEnd }) => (
  <EuiDragDropContext onDragEnd={onDragEnd}>
    <EuiDroppable droppableId="DROPPABLE_AREA" spacing="m">
      {children}
    </EuiDroppable>
  </EuiDragDropContext>
);

export default () => {
  const [isFlyoutOpen, setFlyoutOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [list, setList] = useState(makeList(3));
  const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
    if (source && destination) {
      const items = euiDragDropReorder(list, source.index, destination.index);

      setList(items);
    }
  };

  return (
    <>
      <EuiButton onClick={() => setFlyoutOpen(!isFlyoutOpen)}>
        Toggle flyout
      </EuiButton>
      <EuiSpacer />
      <EuiButton onClick={() => setModalOpen(!isModalOpen)}>
        Toggle modal
      </EuiButton>

      {isFlyoutOpen && (
        <EuiFlyout onClose={() => setFlyoutOpen(false)}>
          <EuiFlyoutHeader>
            <EuiTitle size="s">
              <h2>
                Portalled <strong>EuiDraggable</strong> items
              </h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <DragContainer onDragEnd={onDragEnd}>
              {list.map(({ content, id }, idx) => (
                <EuiDraggable
                  spacing="m"
                  key={id}
                  index={idx}
                  draggableId={id}
                  usePortal
                >
                  {(provided, state) => (
                    <EuiPanel hasShadow={state.isDragging}>
                      {content}
                      {state.isDragging && ' ✨'}
                    </EuiPanel>
                  )}
                </EuiDraggable>
              ))}
            </DragContainer>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}

      {isModalOpen && (
        <EuiModal onClose={() => setModalOpen(false)}>
          <EuiModalHeader>
            <EuiTitle size="s">
              <h2>
                Portalled <strong>EuiDraggable</strong> items
              </h2>
            </EuiTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <DragContainer onDragEnd={onDragEnd}>
              {list.map(({ content, id }, idx) => (
                <EuiDraggable
                  spacing="m"
                  key={id}
                  index={idx}
                  draggableId={id}
                  usePortal
                >
                  {(provided, state) => (
                    <EuiPanel hasShadow={state.isDragging}>
                      {content}
                      {state.isDragging && ' ✨'}
                    </EuiPanel>
                  )}
                </EuiDraggable>
              ))}
            </DragContainer>
          </EuiModalBody>
        </EuiModal>
      )}

      <EuiSpacer />

      <EuiPopover
        isOpen={isPopoverOpen}
        closePopover={() => setIsPopoverOpen(false)}
        button={
          <EuiButton onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            Toggle popover
          </EuiButton>
        }
        panelPaddingSize="none"
        panelProps={{ css: { inlineSize: 200 } }}
      >
        <DragContainer
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
          {list.map(({ content, id }, idx) => (
            <EuiDraggable
              spacing="m"
              key={id}
              index={idx}
              draggableId={id}
              usePortal
            >
              {(provided, state) => (
                <EuiPanel hasShadow={state.isDragging}>{content}</EuiPanel>
              )}
            </EuiDraggable>
          ))}
        </DragContainer>
      </EuiPopover>
    </>
  );
};
