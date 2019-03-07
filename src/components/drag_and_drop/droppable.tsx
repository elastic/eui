import React, { FunctionComponent, useContext } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import { EuiDragDropContextContext } from './drag_drop_context';
import classNames from 'classnames';

export interface EuiDroppableProps extends DroppableProps {
  className?: string;
}

export const EuiDroppable: FunctionComponent<EuiDroppableProps> = ({
  droppableId,
  direction,
  isDropDisabled = false,
  children,
  className,
  type = 'EUI_DEFAULT',
  ...rest
}) => {
  const { isDraggingType } = useContext(EuiDragDropContextContext);
  return (
    <Droppable
      isDropDisabled={isDropDisabled}
      droppableId={droppableId}
      direction={direction}
      type={type}
      {...rest}>
      {(provided, snapshot) => {
        const classes = classNames(
          'euiDroppable',
          {
            'euiDroppable--isDisabled': isDropDisabled,
            'euiDroppable--isDraggingOver': snapshot.isDraggingOver,
            'euiDroppable--isDraggingType': isDraggingType === type,
          },
          className
        );
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes}>
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
