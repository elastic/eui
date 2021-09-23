/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { DraggableLocation } from 'react-beautiful-dnd';

interface DropResult {
  [droppableId: string]: any[];
}

export const euiDragDropReorder = <T extends any[]>(
  list: T,
  startIndex: number,
  endIndex: number
): T => {
  const result = [...list] as T;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const euiDragDropMove = (
  sourceList: any[],
  destinationList: any[],
  dropResultSource: DraggableLocation,
  dropResultDestination: DraggableLocation
): DropResult => {
  const sourceClone = [...sourceList];
  const destClone = [...destinationList];
  const [removed] = sourceClone.splice(dropResultSource.index, 1);

  destClone.splice(dropResultDestination.index, 0, removed);

  return {
    [dropResultSource.droppableId]: sourceClone,
    [dropResultDestination.droppableId]: destClone,
  };
};

export const euiDragDropCopy = (
  sourceList: any[],
  destinationList: any[],
  dropResultSource: DraggableLocation,
  dropResultDestination: DraggableLocation,
  /* Each EuiDraggable needs a unique ID, otherwise subsequent drag attempts on the to-be-copied
   * element may result instead in dragging a previously created duplicate of that Draggable.
   * `idModification` gives implementers better control over creating unique IDs when copying.
   */
  idModification: {
    property: string | number;
    modifier: () => string | number;
  }
): DropResult => {
  const sourceClone = [...sourceList];
  const destClone = [...destinationList];

  destClone.splice(dropResultDestination.index, 0, {
    ...sourceList[dropResultSource.index],
    [idModification.property]: idModification.modifier(),
  });

  return {
    [dropResultSource.droppableId]: sourceClone,
    [dropResultDestination.droppableId]: destClone,
  };
};
