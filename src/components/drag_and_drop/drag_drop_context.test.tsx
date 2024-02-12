/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test/required_props';

import {
  EuiDragDropContext,
  EuiDragDropContextContext,
} from './drag_drop_context';

describe('EuiDragDropContext', () => {
  it('renders', () => {
    const { container } = render(
      <EuiDragDropContext onDragEnd={() => {}} {...requiredProps}>
        <div />
      </EuiDragDropContext>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('isDraggingType', () => {
    test('is set on proprietary context', () => {
      const { getByTestSubject } = render(
        <EuiDragDropContext onDragEnd={() => {}}>
          <EuiDragDropContextContext.Consumer>
            {(value) => (
              <div data-test-subj="child">
                {value.hasOwnProperty('isDraggingType') ? 'true' : 'false'}
              </div>
            )}
          </EuiDragDropContextContext.Consumer>
        </EuiDragDropContext>
      );

      expect(getByTestSubject('child')).toHaveTextContent('true');
    });
  });
});
