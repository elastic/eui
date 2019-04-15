import React, { FunctionComponent, useState } from 'react';
import {
  DragDropContext,
  DragDropContextProps,
  DropResult,
  DragStart,
  ResponderProvided,
} from 'react-beautiful-dnd';

// export interface EuiDragDropContextProps extends DragDropContextProps {}

export const EuiDragDropContextContext = React.createContext({
  isDraggingType: null,
});

export const EuiDragDropContext: FunctionComponent<DragDropContextProps> = ({
  onBeforeDragStart,
  onDragStart,
  onDragUpdate,
  onDragEnd,
  children,
  ...rest
}) => {
  const [isDraggingType, setIsDraggingType] = useState();
  const euiOnDragStart = (
    start: DragStart,
    provided: ResponderProvided
  ): void => {
    setIsDraggingType(start.type);
    if (onDragStart) {
      onDragStart(start, provided);
    }
  };
  const euiOnDragEnd = (
    result: DropResult,
    provided: ResponderProvided
  ): void => {
    setIsDraggingType(null);
    if (onDragEnd) {
      onDragEnd(result, provided);
    }
  };
  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={euiOnDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={euiOnDragEnd}
      {...rest}>
      <EuiDragDropContextContext.Provider
        value={{
          isDraggingType,
        }}>
        {children}
      </EuiDragDropContextContext.Provider>
    </DragDropContext>
  );
};
