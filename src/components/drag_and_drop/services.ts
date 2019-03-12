import { DraggableLocation } from 'react-beautiful-dnd';

interface DropResult {
  [droppableId: string]: never[];
}

export const reorder = (
  list: [],
  startIndex: number,
  endIndex: number
): Array<{}> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (
  sourceList: [],
  destinationList: [],
  dropResultSource: DraggableLocation,
  dropResultDestination: DraggableLocation
): DropResult => {
  const sourceClone = Array.from(sourceList);
  const destClone = Array.from(destinationList);
  const [removed] = sourceClone.splice(dropResultSource.index, 1);

  destClone.splice(dropResultDestination.index, 0, removed);

  const result: DropResult = {};
  result[dropResultSource.droppableId] = sourceClone;
  result[dropResultDestination.droppableId] = destClone;

  return result;
};

export const copy = (
  sourceList: [],
  destinationList: [],
  dropResultSource: DraggableLocation,
  dropResultDestination: DraggableLocation
): DropResult => {
  const sourceClone = Array.from(sourceList);
  const destClone = Array.from(destinationList);
  const copied = sourceClone[dropResultSource.index];

  destClone.splice(dropResultDestination.index, 0, copied);

  const result: DropResult = {};
  result[dropResultSource.droppableId] = sourceClone;
  result[dropResultDestination.droppableId] = destClone;

  return result;
};
