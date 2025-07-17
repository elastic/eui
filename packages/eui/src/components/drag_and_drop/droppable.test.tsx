/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { resetServerContext } from '@hello-pangea/dnd';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import {
  shouldRenderCustomStyles,
  invokeOnReactVersion,
  describeByReactVersion,
} from '../../test/internal';

import { EuiDragDropContext } from './drag_drop_context';
import { EuiDroppable, EuiDroppableContext } from './droppable';

describeByReactVersion('EuiDroppable', () => {
  const requiredContextProps = { onDragEnd: () => {} };

  afterEach(() => {
    // Resetting DND server context is only required in older versions of React
    invokeOnReactVersion('17', resetServerContext);
  });

  shouldRenderCustomStyles(
    <EuiDroppable droppableId="id">{() => <div />}</EuiDroppable>,
    { wrapper: EuiDragDropContext }
  );

  it('renders', () => {
    const { baseElement } = render(
      <EuiDragDropContext {...requiredContextProps}>
        <EuiDroppable droppableId="testDroppable" {...requiredProps}>
          {() => <div />}
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('can be given ReactElement children', () => {
    const { getByTestSubject } = render(
      <EuiDragDropContext {...requiredContextProps}>
        <EuiDroppable droppableId="testDroppable">
          <div data-test-subj="reactChildren" />
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(getByTestSubject('reactChildren')).toBeInTheDocument();
  });

  it('can be given multiple ReactElement children', () => {
    const { getByTestSubject } = render(
      <EuiDragDropContext {...requiredContextProps}>
        <EuiDroppable droppableId="testDroppable">
          <div data-test-subj="A" />
          <div data-test-subj="B" />
          <div data-test-subj="C" />
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(getByTestSubject('A')).toBeInTheDocument();
    expect(getByTestSubject('B')).toBeInTheDocument();
    expect(getByTestSubject('C')).toBeInTheDocument();
  });

  describe('cloneDraggables', () => {
    it('sets `cloneItems` and `isDropDisabled` on proprietary context', () => {
      const { container, getByTestSubject } = render(
        <EuiDragDropContext {...requiredContextProps}>
          <EuiDroppable droppableId="testDroppable" cloneDraggables={true}>
            <EuiDroppableContext.Consumer>
              {({ cloneItems }) => (
                <div data-test-subj="child">
                  {cloneItems ? 'true' : 'false'}
                </div>
              )}
            </EuiDroppableContext.Consumer>
          </EuiDroppable>
        </EuiDragDropContext>
      );

      expect(getByTestSubject('child')).toHaveTextContent('true');
      expect(
        container.querySelector('.euiDroppable-isDisabled')
      ).toBeInTheDocument();
    });
  });
});
