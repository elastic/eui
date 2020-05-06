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

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Propagate from './propagate';
import PropagateContext from './propagate_context';
import usePropagate from './use_propagate';

const container = document.createElement('div');
describe('usePropagation', () => {
  it('starts with the references values', () => {
    const propagate = new Propagate();
    propagate.set('one', 1);
    propagate.set('two', ['one'], one => one + 1);

    const Component = () => {
      const values = usePropagate(['one', 'two']);
      return <span>{values.join(',')}</span>;
    };

    ReactDOM.render(
      <PropagateContext.Provider value={propagate}>
        <Component />
      </PropagateContext.Provider>,
      container
    );

    expect(container.innerHTML).toBe('<span>1,2</span>');

    ReactDOM.unmountComponentAtNode(container);
  });

  it('re-renders when referenced values update', async () => {
    const propagate = new Propagate();
    propagate.set('root', 4);
    propagate.set('square', ['root'], root => root ** 2);

    const Component = () => {
      const values = usePropagate(['root', 'square']);
      return <span>{values.join(',')}</span>;
    };

    ReactDOM.render(
      <PropagateContext.Provider value={propagate}>
        <Component />
      </PropagateContext.Provider>,
      container
    );

    expect(container.innerHTML).toBe('<span>4,16</span>');

    await new Promise(resolve => setTimeout(resolve, 100));
    act(() => propagate.set('root', 3));
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(container.innerHTML).toBe('<span>3,9</span>');

    ReactDOM.unmountComponentAtNode(container);
  });
});
