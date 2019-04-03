import React from 'react';
import { render } from 'enzyme';

// import { findTestSubject } from '../../test';
import { requiredProps } from '../../test/required_props';

import { EuiDragDropContext, EuiDraggable, EuiDroppable } from './';

describe('EuiDraggable', () => {
  test('is rendered', () => {
    const handler = jest.fn();
    const component = render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <EuiDraggable draggableId="testDraggable" index={0}>
            {() => <div>Hello</div>}
          </EuiDraggable>
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be given ReactElement children', () => {
    const handler = jest.fn();
    const component = render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <EuiDraggable draggableId="testDraggable" index={0}>
            <div>Hello</div>
          </EuiDraggable>
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(component).toMatchSnapshot();
  });
});
