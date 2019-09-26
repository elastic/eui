import { DraggableLocation } from 'react-beautiful-dnd';

interface DropResult {
  [droppableId: string]: any[];
}

export const euiDragDropReorder = (
  list: [],
  startIndex: number,
  endIndex: number
): Array<{}> => {
  const result = Array.from(list);
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
