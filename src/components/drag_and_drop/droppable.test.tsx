import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { findTestSubject } from '../../test';
import { requiredProps } from '../../test/required_props';

import { EuiDragDropContext, EuiDroppable } from './';
import { EuiDroppableContext } from './droppable';

function snapshotDragDropContext(component: ReactWrapper) {
  // Get the Portal's sibling and return its html
  const renderedHtml = component.html();
  const container = document.createElement('div');
  container.innerHTML = renderedHtml;
  return container.firstChild;
}

describe('EuiDroppable', () => {
  test('is rendered', () => {
    const handler = jest.fn();
    jest.mock('react', () => {
      const react = jest.requireActual('react');
      return {
        ...react,
        useLayoutEffect: react.useEffect,
      };
    });
    const component = mount(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">{() => <div />}</EuiDroppable>
      </EuiDragDropContext>
    );

    expect(snapshotDragDropContext(component)).toMatchSnapshot();
  });

  test('can be given ReactElement children', () => {
    const handler = jest.fn();
    jest.mock('react', () => {
      const react = jest.requireActual('react');
      return {
        ...react,
        useLayoutEffect: react.useEffect,
      };
    });
    const component = mount(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <div />
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(snapshotDragDropContext(component)).toMatchSnapshot();
  });

  test('can be given multiple ReactElement children', () => {
    const handler = jest.fn();
    jest.mock('react', () => {
      const react = jest.requireActual('react');
      return {
        ...react,
        useLayoutEffect: react.useEffect,
      };
    });

    const component = mount(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <div />
          <div />
          <div />
        </EuiDroppable>
      </EuiDragDropContext>
    );

    expect(snapshotDragDropContext(component)).toMatchSnapshot();
  });

  describe('custom behavior', () => {
    describe('cloneDraggables', () => {
      jest.mock('react', () => {
        const react = jest.requireActual('react');
        return {
          ...react,
          useLayoutEffect: react.useEffect,
        };
      });
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
