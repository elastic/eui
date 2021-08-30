/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import {
  requiredProps,
  findTestSubject,
  takeMountedSnapshot,
} from '../../test';
import { EuiToolTip } from './tool_tip';

describe('EuiToolTip', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button>Trigger</button>
      </EuiToolTip>
    );

    expect(component).toMatchSnapshot();
  });

  test('shows tooltip on focus', () => {
    jest.useFakeTimers();
    const component = mount(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button data-test-subj="trigger">Trigger</button>
      </EuiToolTip>
    );

    const trigger = findTestSubject(component, 'trigger');
    trigger.simulate('focus');
    jest.advanceTimersByTime(260); // wait for showToolTip setTimeout
    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });

  test('display prop renders block', () => {
    const component = render(
      <EuiToolTip
        title="title"
        id="id"
        content="content"
        {...requiredProps}
        display="block"
      >
        <button>Trigger</button>
      </EuiToolTip>
    );

    expect(component).toMatchSnapshot();
  });
});
