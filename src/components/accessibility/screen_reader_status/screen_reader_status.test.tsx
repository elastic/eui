/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, render } from 'enzyme';

import { EuiScreenReaderStatus } from './screen_reader_status';

describe('EuiScreenReaderStatus', () => {
  test('it renders', () => {
    const component = render(<EuiScreenReaderStatus />);
    expect(component).toMatchSnapshot();
  });

  test('it sets `statusMessage` using document title', () => {
    document.title = 'Default title';
    const component = mount(<EuiScreenReaderStatus />);
    expect(component).toMatchSnapshot();
  });

  test('it sets `statusMessage` with user defined string', () => {
    const component = mount(
      <EuiScreenReaderStatus statusMessage="User-defined title" />
    );
    expect(component).toMatchSnapshot();
  });

  test('it sets aria-live and tabindex correctly when `shouldReceiveFocus` is passed', () => {
    const component = mount(
      <EuiScreenReaderStatus
        statusMessage="User-defined title"
        shouldReceiveFocus
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('it creates a non-focusable live region by default', () => {
    const component = mount(
      <EuiScreenReaderStatus statusMessage="User-defined title" />
    );
    const statusDiv = component.find('div');
    expect(statusDiv.prop('tabindex')).toBe(undefined);
    expect(statusDiv.prop('aria-live')).toBe('polite');
    expect(statusDiv.text()).toBe('User-defined title');
  });

  test('it creates a focusable region when `shouldReceiveFocus` is passed', () => {
    const component = mount(
      <EuiScreenReaderStatus
        statusMessage="User-defined title"
        shouldReceiveFocus
      />
    );
    const statusDiv = component.find('div');
    expect(statusDiv.prop('tabIndex')).toBe(-1);
    expect(statusDiv.prop('aria-live')).toBe('off');
    expect(statusDiv.text()).toBe('User-defined title');
  });

  test('it does not set focus by default', () => {
    const component = mount(
      <EuiScreenReaderStatus statusMessage="User-defined title" />
    );
    const statusDiv = component.find('div');
    expect(statusDiv.is(':focus')).toBe(false);
  });

  test('it sets focus when `shouldReceiveFocus` is passed', () => {
    const component = mount(
      <EuiScreenReaderStatus
        statusMessage="User-defined title"
        shouldReceiveFocus
      />
    );
    const statusDiv = component.find('div');
    expect(statusDiv.is(':focus')).toBe(true);
  });
});
