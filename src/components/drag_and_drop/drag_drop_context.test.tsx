import React from 'react';
import { render, mount } from 'enzyme';

import { findTestSubject } from '../../test';
import { requiredProps } from '../../test/required_props';

import { EuiDragDropContext } from './';
import { EuiDragDropContextContext } from './drag_drop_context';

describe('EuiDragDropContext', () => {
  test('is rendered', () => {
    const handler = jest.fn();
    const component = render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <div />
      </EuiDragDropContext>
    );

    expect(component).toMatchSnapshot();
  });

  describe('custom behavior', () => {
    describe('isDraggingType', () => {
      test('is set on proprietary context', () => {
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
