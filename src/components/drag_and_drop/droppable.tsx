import React, { FunctionComponent, useContext } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { EuiDragDropContextContext } from './drag_drop_context';

export interface EuiDroppableProps extends DroppableProps {
  className?: string;
  cloneDraggables?: boolean;
  style?: {};
}

export const EuiDroppableContext = React.createContext({
  cloneItems: false,
});

export const EuiDroppable: FunctionComponent<EuiDroppableProps> = ({
  droppableId,
  direction,
  isDropDisabled = false,
  children,
  className,
  cloneDraggables = false,
  style,
  type = 'EUI_DEFAULT',
  ...rest
}) => {
  const { isDraggingType } = useContext(EuiDragDropContextContext);
  const dropIsDisabled: boolean = cloneDraggables ? true : isDropDisabled;
  return (
    <Droppable
      isDropDisabled={dropIsDisabled}
      droppableId={droppableId}
      direction={direction}
      type={type}
      {...rest}>
      {(provided, snapshot) => {
        const classes = classNames(
          'euiDroppable',
          {
            'euiDroppable--isDisabled': dropIsDisabled,
            'euiDroppable--isDraggingOver': snapshot.isDraggingOver,
            'euiDroppable--isDraggingType': isDraggingType === type,
          },
          className
        );
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={style}
            className={classes}>
            <EuiDroppableContext.Provider
              value={{
                cloneItems: cloneDraggables,
              }}>
              {children}
            </EuiDroppableContext.Provider>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
