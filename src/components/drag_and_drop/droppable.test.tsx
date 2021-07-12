/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { resetServerContext } from 'react-beautiful-dnd';

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
  afterEach(() => {
    resetServerContext();
  });

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

      test('sets `cloneItems` on proprietary context', () => {
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

        expect(findTestSubject(component, 'child').text()).toBe('true');
      });

      test('sets `isDropDisabled`', () => {
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

        expect(component.find('.euiDroppable--isDisabled').length).toBe(1);
      });
    });
  });
});
