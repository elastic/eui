import React, { useState } from 'react';
import {
  EuiButton,
  EuiCode,
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
  EuiSpacer,
  EuiTitle,
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
  const [isFlyoutOpen, setFlyoutOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [list, setList] = useState(makeList(3));
  const onDragEnd = ({ source, destination }) => {
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
                Portalled <EuiCode>EuiDraggable</EuiCode> items
              </h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiDragDropContext onDragEnd={onDragEnd}>
              <EuiDroppable droppableId="DROPPABLE_AREA" spacing="m" withPanel>
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
              </EuiDroppable>
            </EuiDragDropContext>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}

      {isModalOpen && (
        <EuiModal onClose={() => setModalOpen(false)}>
          <EuiModalHeader>
            <EuiTitle size="s">
              <h2>
                Portalled <EuiCode>EuiDraggable</EuiCode> items
              </h2>
            </EuiTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiDragDropContext onDragEnd={onDragEnd}>
              <EuiDroppable droppableId="DROPPABLE_AREA" spacing="m" withPanel>
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
              </EuiDroppable>
            </EuiDragDropContext>
          </EuiModalBody>
        </EuiModal>
      )}
    </>
  );
};
