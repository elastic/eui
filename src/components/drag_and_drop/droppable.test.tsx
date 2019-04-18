import React from 'react';
import { render, mount } from 'enzyme';

import { findTestSubject } from '../../test';
import { requiredProps } from '../../test/required_props';

import { EuiDragDropContext, EuiDroppable } from './';
import { EuiDroppableContext } from './droppable';

describe('EuiDroppable', () => {
  test('is rendered', () => {
    const handler = jest.fn();
    const component = render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">{() => <div />}</EuiDroppable>
      </EuiDragDropContext>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be given ReactElement children', () => {
    const handler = jest.fn();
    const component = render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <div />
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(component).toMatchSnapshot();
  });

  describe('custom behavior', () => {
    describe('cloneDraggables', () => {
      const handler = jest.fn();
      const component = mount(
        <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
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

      test('sets `cloneItems` on proprietary context', () => {
        expect(findTestSubject(component, 'child').text()).toBe('true');
      });

      test('sets `isDropDisabled`', () => {
        expect(component.find('.euiDroppable--isDisabled').length).toBe(1);
      });
    });
  });
});
