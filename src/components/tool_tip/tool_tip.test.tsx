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
import { render, mount } from 'enzyme';
import {
  requiredProps,
  findTestSubject,
  takeMountedSnapshot,
  sleep,
} from '../../test';
import { EuiToolTip } from './tool_tip';

jest.mock('./../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'id',
}));

describe('EuiToolTip', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button>Trigger</button>
      </EuiToolTip>
    );

    expect(component).toMatchSnapshot();
  });

  test('shows tooltip on focus', async () => {
    const component = mount(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button data-test-subj="trigger">Trigger</button>
      </EuiToolTip>
    );

    const trigger = findTestSubject(component, 'trigger');
    trigger.simulate('focus');
    await sleep(260); // wait for showToolTip setTimout
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });

  test('applies our block stylings', async () => {
    const component = render(
      <EuiToolTip
        title="title"
        id="id"
        content="content"
        {...requiredProps}
        display="block">
        <button>Trigger</button>
      </EuiToolTip>
    );

    expect(component).toMatchSnapshot();
  });
});
