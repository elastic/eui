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
import { Draggable, DraggableProps } from '@hello-pangea/dnd';
import classNames from 'classnames';

import { useEuiTheme, cloneElementWithCss } from '../../services';
import { CommonProps } from '../common';

import { EuiDroppableContext, SPACINGS } from './droppable';
import { euiDraggableStyles, euiDraggableItemStyles } from './draggable.styles';
import { EuiPortal } from '../portal';

export interface EuiDraggableProps
  extends CommonProps,
    Omit<DraggableProps, 'children'> {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactElement | DraggableProps['children'];
  className?: string;
  /**
   * Whether the `children` will provide and set up its own drag handle.
   * The `custom` value additionally removes the `role` from the draggable container.
   * Use this if the `children` element is focusable and should keep its
   * semantic role for accessibility purposes.
   */
  customDragHandle?: boolean | 'custom';
  /**
   * Whether the container has interactive children and should have `role="group"` instead of `"button"`.
   * Setting this flag ensures your drag & drop container is keyboard and screen reader accessible.
   */
  hasInteractiveChildren?: boolean;
  /**
   * Whether the item is currently in a position to be removed
   */
  isRemovable?: boolean;
  /**
   * Whether the currently dragged item is cloned into a portal in the body. This settings will
   * ensure that drag & drop still works as expected within stacking contexts (e.g. within `EuiFlyout`,
   * `EuiModal` and `EuiPopover`).
   *
   * Make sure to apply styles directly to the Draggable content as relative styling from an outside
   * scope might not be applied when the content is placed in a portal as the DOM structure changes.
   */
  usePortal?: boolean;
  /**
   * Adds padding to the draggable item
   */
  spacing?: (typeof SPACINGS)[number];
  style?: CSSProperties;
}

export const EuiDraggable: FunctionComponent<EuiDraggableProps> = ({
  customDragHandle = false,
  draggableId,
  isDragDisabled = false,
  hasInteractiveChildren = false,
  isRemovable = false,
  usePortal = false,
  index,
  children,
  className,
  spacing = 'none',
  style,
  'data-test-subj': dataTestSubj = 'draggable',
  ...rest
}) => {
  const { cloneItems } = useContext(EuiDroppableContext);

  const euiTheme = useEuiTheme();
  const styles = euiDraggableStyles(euiTheme);

  const hasCustomDragHandle = customDragHandle !== false;

  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
      {...rest}
    >
      {(provided, snapshot, rubric) => {
        const { isDragging } = snapshot;
        const isFullyCustomDragHandle = customDragHandle === 'custom';

        const cssStyles = [
          styles.euiDraggable,
          cloneItems && !isDragging && styles.hasClone,
          isDragging && styles.isDragging,
          isRemovable && styles.isRemovable,
          styles.spacing[spacing],
        ];

        const classes = classNames('euiDraggable', className);
        const childClasses = classNames('euiDraggable__item', {
          'euiDraggable__item-isDisabled': isDragDisabled,
        });
        const DraggableElement: ReactElement =
          typeof children === 'function'
            ? (children(provided, snapshot, rubric) as ReactElement)
            : children;

        const content = (
          <>
            <div
              {...provided.draggableProps}
              {...(!hasCustomDragHandle ? provided.dragHandleProps : {})}
              ref={provided.innerRef}
              data-test-subj={dataTestSubj}
              className={classes}
              css={cssStyles}
              style={{
                ...style,
                ...provided.draggableProps.style,
              }}
              // We use [role="group"] instead of [role="button"] when we expect a nested
              // interactive element. Screen readers will cue users that this is a container
              // and has one or more elements inside that are part of a related group.
              role={
                isFullyCustomDragHandle
                  ? undefined // prevent wrapper role from removing semantics of the children
                  : hasInteractiveChildren
                  ? 'group'
                  : provided.dragHandleProps?.role
              }
              // If the container includes an interactive element, we remove the tabindex=0
              // because [role="group"] does not permit or warrant a tab stop
              // additionally we remove the tabindex when the child is a fully custom handle
              // that has its own tabindex and handle props
              tabIndex={
                hasInteractiveChildren || isFullyCustomDragHandle
                  ? undefined
                  : provided.dragHandleProps?.tabIndex
              }
            >
              {cloneElementWithCss(DraggableElement, {
                className: classNames(
                  DraggableElement.props.className,
                  childClasses
                ),
                css: [
                  euiDraggableItemStyles.euiDraggable__item,
                  isDragDisabled && euiDraggableItemStyles.disabled,
                ],
              })}
            </div>
            {cloneItems && isDragging && (
              <div
                className={classNames(classes, 'euiDraggable--clone')}
                css={cssStyles}
              >
                {DraggableElement}
              </div>
            )}
          </>
        );

        return isDragging && usePortal ? (
          <EuiPortal>{content}</EuiPortal>
        ) : (
          content
        );
      }}
    </Draggable>
  );
};
