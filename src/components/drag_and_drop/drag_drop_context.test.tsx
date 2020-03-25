import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { findTestSubject } from '../../test';
import { requiredProps } from '../../test/required_props';

import { EuiDragDropContext } from './';
import { EuiDragDropContextContext } from './drag_drop_context';

function snapshotDragDropContext(component: ReactWrapper) {
  // Get the Portal's sibling and return its html
  const renderedHtml = component.html();
  const container = document.createElement('div');
  container.innerHTML = renderedHtml;
  return container.firstChild;
}

describe('EuiDragDropContext', () => {
  test('is rendered', () => {
    const handler = jest.fn();
    const component = mount(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <div />
      </EuiDragDropContext>
    );

    expect(snapshotDragDropContext(component)).toMatchSnapshot();
  });

  describe('custom behavior', () => {
    describe('isDraggingType', () => {
      test('is set on proprietary context', () => {
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
            <EuiDragDropContextContext.Consumer>
              {value => (
                <div data-test-subj="child">
                  {value.hasOwnProperty('isDraggingType') ? 'true' : 'false'}
                </div>
              )}
            </EuiDragDropContextContext.Consumer>
          </EuiDragDropContext>
        );

        expect(findTestSubject(component, 'child').text()).toBe('true');
      });
    });
  });
});
