/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { render } from '../../test/rtl';

import { EuiNotificationEventReadButton } from './notification_event_read_button';

describe('EuiNotificationEventReadButton', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiNotificationEventReadButton
        id="id"
        eventName="eventName"
        isRead={true}
        onClick={() => {}}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders isRead to false', () => {
    const { container } = render(
      <EuiNotificationEventReadButton
        id="id"
        eventName="eventName"
        isRead={false}
        onClick={() => {}}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick fires for buttons', () => {
    const handler = jest.fn();
    const component = mount(
      <EuiNotificationEventReadButton
        id="id"
        eventName="eventName"
        isRead={false}
        onClick={handler}
      />
    );
    component.find('button').simulate('click');
    expect(handler.mock.calls.length).toEqual(1);
  });
});
