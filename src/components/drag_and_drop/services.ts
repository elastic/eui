/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
