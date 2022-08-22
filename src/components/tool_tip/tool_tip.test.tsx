/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import {
  render,
  waitForEuiToolTipVisible,
  waitForEuiToolTipHidden,
} from '../../test/rtl';
import { requiredProps, findTestSubject } from '../../test';

import { EuiToolTip } from './tool_tip';

describe('EuiToolTip', () => {
  it('is rendered', () => {
    const { baseElement } = render(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button>Trigger</button>
      </EuiToolTip>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('shows tooltip on mouseover and focus', async () => {
    const { baseElement, getByTestSubject } = render(
      <EuiToolTip title="title" id="id" content="content" {...requiredProps}>
        <button data-test-subj="trigger">Trigger</button>
      </EuiToolTip>
    );

    fireEvent.mouseOver(getByTestSubject('trigger'));
    await waitForEuiToolTipVisible();

    expect(baseElement).toMatchSnapshot();

    fireEvent.mouseOut(getByTestSubject('trigger'));
    await waitForEuiToolTipHidden();

    fireEvent.focus(getByTestSubject('trigger'));
    await waitForEuiToolTipVisible();
  });

  test('anchor props are rendered', () => {
    const component = mount(
      <EuiToolTip
        title="title"
        id="id"
        content="content"
        anchorProps={{
          className: 'customAnchorClass1',
          'data-test-subj': 'DTS',
        }}
        className="customAnchorClass2"
      >
        <button>Trigger</button>
      </EuiToolTip>
    );

    expect(component.render()).toMatchSnapshot();
  });

  // This is a legacy unit test to ensure tooltips/portal updates still play well with Enzyme
  it('[enzyme] shows tooltip on focus', () => {
    jest.useFakeTimers();
    const component = mount(
      <EuiToolTip
        title="title"
        id="id"
        content="content"
        {...requiredProps}
        data-test-subj="tooltip"
      >
        <button data-test-subj="trigger">Trigger</button>
      </EuiToolTip>
    );

    const trigger = findTestSubject(component, 'trigger');
    trigger.simulate('focus');
    jest.runAllTimers(); // wait for showToolTip setTimeout

    expect(document.querySelector('[data-test-subj="tooltip"]')).not.toBeNull();

    jest.useRealTimers();
  });

  test('display prop renders block', () => {
    const { container } = render(
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

    expect(container).toMatchSnapshot();
  });
});
