/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  Fragment,
  FunctionComponent,
  ReactElement,
  cloneElement,
  useContext,
} from 'react';
import { Draggable, DraggableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiDroppableContext } from './droppable';

const spacingToClassNameMap = {
  none: null,
  s: 'euiDraggable--s',
  m: 'euiDraggable--m',
  l: 'euiDraggable--l',
};

export type EuiDraggableSpacing = keyof typeof spacingToClassNameMap;

export interface EuiDraggableProps
  extends CommonProps,
    Omit<DraggableProps, 'children'> {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement | DraggableProps['children'];
  className?: string;
  /**
   * Whether the `children` will provide and set up its own drag handle
   */
  customDragHandle?: boolean;
  /**
   * Whether the item is currently in a position to be removed
   */
  isRemovable?: boolean;
  /**
   * Adds padding to the draggable item
   */
  spacing?: EuiDraggableSpacing;
  style?: CSSProperties;
}

export const EuiDraggable: FunctionComponent<EuiDraggableProps> = ({
  customDragHandle = false,
  draggableId,
  isDragDisabled = false,
  isRemovable = false,
  index,
  children,
  className,
  spacing = 'none',
  style,
  'data-test-subj': dataTestSubj = 'draggable',
  ...rest
}) => {
  const { cloneItems } = useContext(EuiDroppableContext);

  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
      {...rest}
    >
      {(provided, snapshot, rubric) => {
        const classes = classNames(
          'euiDraggable',
          {
            'euiDraggable--hasClone': cloneItems,
            'euiDraggable--hasCustomDragHandle': customDragHandle,
            'euiDraggable--isDragging': snapshot.isDragging,
            'euiDraggable--withoutDropAnimation': isRemovable,
          },
          spacingToClassNameMap[spacing],
          className
        );
        const childClasses = classNames('euiDraggable__item', {
          'euiDraggable__item--hasCustomDragHandle': customDragHandle,
          'euiDraggable__item--isDisabled': isDragDisabled,
          'euiDraggable__item--isDragging': snapshot.isDragging,
          'euiDraggable__item--isDropAnimating': snapshot.isDropAnimating,
        });
        const DraggableElement =
          typeof children === 'function'
            ? children(provided, snapshot, rubric)
            : (children as ReactElement); // as specified by `DraggableProps`
        return (
          <Fragment>
            <div
              {...provided.draggableProps}
              {...(!customDragHandle ? provided.dragHandleProps : {})}
              ref={provided.innerRef}
              data-test-subj={dataTestSubj}
              className={classes}
              style={{ ...style, ...provided.draggableProps.style }}
            >
              {cloneElement(DraggableElement, {
                className: classNames(
                  DraggableElement.props.className,
                  childClasses
                ),
              })}
            </div>
            {cloneItems && snapshot.isDragging && (
              <div className={classNames(classes, 'euiDraggable--clone')}>
                {DraggableElement}
              </div>
            )}
          </Fragment>
        );
      }}
    </Draggable>
  );
};
