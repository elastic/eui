/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import {
  shouldRenderCustomStyles,
  describeByReactVersion,
} from '../../test/internal';

import { EuiDragDropContext, EuiDroppable } from './';
import { EuiDraggable } from './draggable';

describeByReactVersion('EuiDraggable', () => {
  const TestContextWrapper = ({ children }: { children: any }) => (
    <EuiDragDropContext onDragEnd={() => {}}>
      <EuiDroppable droppableId="testDroppable">{children}</EuiDroppable>
    </EuiDragDropContext>
  );

  shouldRenderCustomStyles(
    <EuiDraggable draggableId="testDraggable" index={0}>
      {() => <div>Hello</div>}
    </EuiDraggable>,
    { wrapper: TestContextWrapper }
  );

  it('renders', () => {
    const { container } = render(
      <TestContextWrapper>
        <EuiDraggable draggableId="testDraggable" index={0} {...requiredProps}>
          {() => <div>Hello</div>}
        </EuiDraggable>
      </TestContextWrapper>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with render prop children', () => {
    const { getByTestSubject } = render(
      <TestContextWrapper>
        <EuiDraggable draggableId="testDraggable" index={0}>
          {() => <div>Hello</div>}
        </EuiDraggable>
      </TestContextWrapper>
    );

    expect(getByTestSubject('draggable')).toHaveTextContent('Hello');
  });

  it('renders with react element children', () => {
    const { getByTestSubject } = render(
      <TestContextWrapper>
        <EuiDraggable draggableId="testDraggable" index={0}>
          <div>Hello</div>
        </EuiDraggable>
      </TestContextWrapper>
    );

    expect(getByTestSubject('draggable')).toHaveTextContent('Hello');
  });

  it('should render with role="group" and no tabIndex when hasInteractiveChildren is true', () => {
    const Test = ({
      hasInteractiveChildren,
    }: {
      hasInteractiveChildren: boolean;
    }) => (
      <TestContextWrapper>
        <EuiDraggable
          hasInteractiveChildren={hasInteractiveChildren}
          draggableId="testDraggable"
          index={0}
        >
          <div>Hello</div>
        </EuiDraggable>
      </TestContextWrapper>
    );

    const { queryByRole, rerender } = render(
      <Test hasInteractiveChildren={false} />
    );
    expect(queryByRole('group')).toBeNull();

    rerender(<Test hasInteractiveChildren={true} />);
    expect(queryByRole('group')).toBeVisible();
    expect(queryByRole('group')).not.toHaveAttribute('tabindex', 0);
  });
});
