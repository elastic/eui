/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  ReactElement,
  useContext,
} from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiDragDropContextContext } from './drag_drop_context';

const spacingToClassNameMap = {
  none: null,
  s: 'euiDroppable--s',
  m: 'euiDroppable--m',
  l: 'euiDroppable--l',
};

export type EuiDroppableSpacing = keyof typeof spacingToClassNameMap;

export interface EuiDroppableProps
  extends CommonProps,
    Omit<DroppableProps, 'children'> {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement | ReactElement[] | DroppableProps['children'];
  className?: string;
  /**
   * Makes its items immutable. Dragging creates cloned items that can be dropped elsewhere.
   */
  cloneDraggables?: boolean;
  style?: CSSProperties;
  /**
   * Adds padding to the droppable area
   */
  spacing?: EuiDroppableSpacing;
  /**
   * Adds an EuiPanel style to the droppable area
   */
  withPanel?: boolean;
  /**
   * Allow the panel to flex-grow?
   */
  grow?: boolean;
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
  spacing = 'none',
  style,
  type = 'EUI_DEFAULT',
  withPanel = false,
  grow = false,
  'data-test-subj': dataTestSubj = 'droppable',
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
            'euiDroppable--withPanel': withPanel,
            'euiDroppable--grow': grow,
            'euiDroppable--noGrow': !grow,
          },
          spacingToClassNameMap[spacing],
          className
        );
        const placeholderClasses = classNames('euiDroppable__placeholder', {
          'euiDroppable__placeholder--isHidden': cloneDraggables,
        });
        const DroppableElement =
          typeof children === 'function'
            ? children(provided, snapshot)
            : children;
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={style}
            data-test-subj={dataTestSubj}
            className={classes}>
            <EuiDroppableContext.Provider
              value={{
                cloneItems: cloneDraggables,
              }}>
              {DroppableElement}
            </EuiDroppableContext.Provider>
            <div className={placeholderClasses}>{provided.placeholder}</div>
          </div>
        );
      }}
    </Droppable>
  );
};
