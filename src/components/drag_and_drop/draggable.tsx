import React, { FunctionComponent, cloneElement, useContext } from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { EuiDroppableContext } from './droppable';

export interface EuiDraggableProps extends DraggableProps {
  className?: string;
  customDragHandle?: boolean;
}

export const EuiDraggable: FunctionComponent<EuiDraggableProps> = ({
  customDragHandle = false,
  draggableId,
  isDragDisabled = false,
  index,
  children,
  className,
  ...rest
}) => {
  const { cloneItems } = useContext(EuiDroppableContext);
  const classes = classNames('euiDraggable', className);

  return (
    <Draggable draggableId={draggableId} index={index} {...rest}>
      {(provided, snapshot) => {
        const childClasses = classNames('euiDraggable__item', {
          'euiDraggable__item--hasCustomDragHandle': customDragHandle,
          'euiDraggable__item--isDisabled': isDragDisabled,
          'euiDraggable__item--isDragging': snapshot.isDragging,
          'euiDraggable__item--isDropAnimating': snapshot.isDropAnimating,
        });
        const DraggableElement =
          typeof children === 'function'
            ? children(provided, snapshot)
            : (children as React.ReactElement); // as specified by `DraggableProps`
        return (
          <React.Fragment>
            <div
              {...provided.draggableProps}
              {...(!customDragHandle ? provided.dragHandleProps : {})}
              ref={provided.innerRef}
              data-test-subj="draggable"
              className={classes}
              style={provided.draggableProps.style}>
              {cloneElement(DraggableElement, {
                className: classNames(
                  DraggableElement.props.className,
                  childClasses
                ),
              })}
              {provided.placeholder}
            </div>
            {cloneItems &&
              (snapshot.isDragging && (
                <div className={classNames(classes, 'euiDraggable--clone')}>
                  {DraggableElement}
                  {provided.placeholder}
                </div>
              ))}
          </React.Fragment>
        );
      }}
    </Draggable>
  );
};
