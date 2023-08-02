/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, screen } from '../../test/rtl';
import { requiredProps } from '../../test';
import { describeByReactVersion } from '../../test/internal';
import { EuiDragDropContext, EuiDraggable, EuiDroppable } from './';

describeByReactVersion('EuiDraggable', () => {
  it('renders', () => {
    const handler = jest.fn();

    const { container } = render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <EuiDraggable draggableId="testDraggable" index={0}>
            {() => <div>Hello</div>}
          </EuiDraggable>
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(screen.getByTestSubject('draggable')).toBeVisible();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with render prop children', () => {
    const handler = jest.fn();

    render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <EuiDraggable draggableId="testDraggable" index={0}>
            {() => <div>Hello</div>}
          </EuiDraggable>
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(screen.getByText('Hello')).toBeVisible();
  });

  it('renders with react element children', () => {
    const handler = jest.fn();

    render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <EuiDraggable draggableId="testDraggable" index={0}>
            <div>Hello</div>
          </EuiDraggable>
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(screen.getByText('Hello')).toBeVisible();
  });

  it('should render with role="group" and no tabIndex when hasInteractiveChildren is true', () => {
    const handler = jest.fn();

    const doRender = (hasInteractiveChildren: boolean) =>
      render(
        <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
          <EuiDroppable droppableId="testDroppable">
            <EuiDraggable
              hasInteractiveChildren={hasInteractiveChildren}
              draggableId="testDraggable"
              index={0}
            >
              <div>Hello</div>
            </EuiDraggable>
          </EuiDroppable>
        </EuiDragDropContext>
      );

    doRender(false);
    expect(screen.queryByRole('group')).toBeNull();

    doRender(true);
    expect(screen.getByRole('group')).toBeVisible();
    expect(screen.getByRole('group')).not.toHaveAttribute('tabindex', 0);
  });
});
