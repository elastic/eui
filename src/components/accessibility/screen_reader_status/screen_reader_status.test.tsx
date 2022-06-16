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

  test('it sets pageTitle using document title', () => {
    document.title = 'Default title';
    const component = mount(<EuiScreenReaderStatus />);
    expect(component).toMatchSnapshot();
  });

  test('it sets pageTitle using passed prop', () => {
    const component = mount(
      <EuiScreenReaderStatus pageTitle="User-defined title" />
    );
    expect(component).toMatchSnapshot();
  });

  test('it sets focus correctly', () => {
    const component = mount(
      <EuiScreenReaderStatus pageTitle="User-defined title" />
    );
    const statusDiv = component.find('div');
    expect(statusDiv.is(':focus')).toBe(true);
    expect(statusDiv.text()).toBe('User-defined title');
  });
});
