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
import { mount, render } from 'enzyme';
import { EuiNotificationEventMeta } from './notification_event_meta';
import { EuiContextMenuPanel, EuiContextMenuItem } from '../context_menu';
import { findTestSubject, takeMountedSnapshot } from '../../test';

describe('EuiNotificationEventMeta', () => {
  test('is rendered', () => {
    const component = render(
      <EuiNotificationEventMeta
        id="id"
        type="Alert"
        time={<span>2 min ago</span>}
        eventName="eventName"
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('severity is rendered', () => {
      const component = render(
        <EuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          severity="severity"
          eventName="eventName"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('badgeColor  is rendered', () => {
      const component = render(
        <EuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          eventName="eventName"
          badgeColor="success"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('logoCloud  is rendered', () => {
      const component = render(
        <EuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          iconType="logoCloud"
          eventName="eventName"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('contextMenuItems are rendered', () => {
      const contextMenuItems = [
        <EuiContextMenuItem key="contextMenuItemA">
          Mark as read
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="contextMenuItemB">
          View messages like this
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="contextMenuItemC">
          Don’t notify me about this
        </EuiContextMenuItem>,
      ];

      const component = mount(
        <EuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          iconType="logoCloud"
          eventName="eventName"
          onOpenContextMenu={() => contextMenuItems}
        />
      );

      expect(component.find(EuiContextMenuPanel)).toHaveLength(0);
      findTestSubject(component, 'id-notificationEventMetaButton').simulate(
        'click'
      );
      expect(component.find(EuiContextMenuPanel)).toHaveLength(1);

      expect(
        takeMountedSnapshot(component.find(EuiContextMenuPanel))
      ).toMatchSnapshot();
    });
  });
});
