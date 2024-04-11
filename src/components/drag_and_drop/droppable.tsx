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
import { Droppable, DroppableProps } from '@hello-pangea/dnd';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { EuiPanel } from '../panel';

import { EuiDragDropContextContext } from './drag_drop_context';
import { euiDroppableStyles } from './droppable.styles';

export const SPACINGS = ['none', 's', 'm', 'l'] as const;

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
  spacing?: (typeof SPACINGS)[number];
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

  const styles = useEuiMemoizedStyles(euiDroppableStyles);

  return (
    <Droppable
      isDropDisabled={dropIsDisabled}
      droppableId={droppableId}
      direction={direction}
      type={type}
      {...rest}
    >
      {(provided, snapshot) => {
        const { isDraggingOver } = snapshot;

        const PanelOrDiv = withPanel ? EuiPanel : 'div';
        const panelOrDivProps = withPanel
          ? {
              panelRef: provided.innerRef,
              hasShadow: true,
              paddingSize: 'none' as const,
            }
          : { ref: provided.innerRef };

        const cssStyles = [
          styles.euiDroppable,
          isDraggingType === type && !dropIsDisabled && styles.isDragging,
          isDraggingOver && styles.isDraggingOver,
          grow ? styles.grow : styles.noGrow,
          styles.spacing[spacing],
        ];

        const classes = classNames(
          'euiDroppable',
          { 'euiDroppable-isDisabled': dropIsDisabled },
          className
        );

        const DroppableElement =
          typeof children === 'function'
            ? children(provided, snapshot)
            : children;

        return (
          <PanelOrDiv
            {...provided.droppableProps}
            {...panelOrDivProps}
            style={style}
            data-test-subj={dataTestSubj}
            className={classes}
            css={cssStyles}
          >
            <EuiDroppableContext.Provider
              value={{
                cloneItems: cloneDraggables,
              }}
            >
              {DroppableElement}
            </EuiDroppableContext.Provider>
            <div className="euiDroppable__placeholder" hidden={cloneDraggables}>
              {provided.placeholder}
            </div>
          </PanelOrDiv>
        );
      }}
    </Droppable>
  );
};
