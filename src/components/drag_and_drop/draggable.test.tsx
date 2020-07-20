/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { resetServerContext } from 'react-beautiful-dnd';
import html from 'html';
import { requiredProps } from '../../test/required_props';
import { EuiDragDropContext, EuiDraggable, EuiDroppable } from './';

function takeSnapshot(element: HTMLElement) {
  expect(
    html.prettyPrint(element.innerHTML, {
      indent_size: 2,
      unformatted: [], // Expand all tags, including spans
    })
  ).toMatchSnapshot();
}

describe('EuiDraggable', () => {
  let appDiv: HTMLElement;

  beforeEach(() => {
    resetServerContext(); // resets react-beautiful-dnd's internal instance counter which affects snapshots
    appDiv = document.createElement('div');
    document.body.appendChild(appDiv);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(appDiv);
    document.body.removeChild(appDiv);
  });

  test('is rendered', () => {
    const handler = jest.fn();

    ReactDOM.render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <EuiDraggable draggableId="testDraggable" index={0}>
            {() => <div>Hello</div>}
          </EuiDraggable>
        </EuiDroppable>
      </EuiDragDropContext>,
      appDiv
    );

    expect(takeSnapshot(appDiv)).toMatchSnapshot();
  });

  test('can be given ReactElement children', () => {
    const handler = jest.fn();

    ReactDOM.render(
      <EuiDragDropContext onDragEnd={handler} {...requiredProps}>
        <EuiDroppable droppableId="testDroppable">
          <EuiDraggable draggableId="testDraggable" index={0}>
            <div>Hello</div>
          </EuiDraggable>
        </EuiDroppable>
      </EuiDragDropContext>,
      appDiv
    );

    expect(takeSnapshot(appDiv)).toMatchSnapshot();
  });
});
