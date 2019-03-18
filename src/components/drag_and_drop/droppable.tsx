import React, {
  CSSProperties,
  FunctionComponent,
  ReactElement,
  useContext,
} from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { CommonProps, Omit } from '../common';
import { EuiDragDropContextContext } from './drag_drop_context';

export interface EuiDroppableProps
  extends CommonProps,
    Omit<DroppableProps, 'children'> {
  children: ReactElement | DroppableProps['children'];
  className?: string;
  cloneDraggables?: boolean;
  style?: CSSProperties;
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
        const DroppableElement =
          typeof children === 'function'
            ? children(provided, snapshot)
            : children;
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={style}
            data-test-subj="droppable"
            className={classes}>
            <EuiDroppableContext.Provider
              value={{
                cloneItems: cloneDraggables,
              }}>
              {DroppableElement}
            </EuiDroppableContext.Provider>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
