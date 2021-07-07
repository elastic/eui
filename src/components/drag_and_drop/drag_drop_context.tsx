/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState, createContext } from 'react';
import {
  DragDropContext,
  DragDropContextProps,
  DropResult,
  DragStart,
  ResponderProvided,
} from 'react-beautiful-dnd';

// export interface EuiDragDropContextProps extends DragDropContextProps {}

type EuiDraggingType = string | null;

export interface EuiDragDropContextProps {
  isDraggingType: EuiDraggingType;
}

export const EuiDragDropContextContext = createContext<EuiDragDropContextProps>(
  {
    isDraggingType: null,
  }
);

export const EuiDragDropContext: FunctionComponent<DragDropContextProps> = ({
  onBeforeDragStart,
  onDragStart,
  onDragUpdate,
  onDragEnd,
  children,
  ...rest
}) => {
  const [isDraggingType, setIsDraggingType] = useState<EuiDraggingType>(null);
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
