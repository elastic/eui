/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { EuiNotificationEventMeta } from './notification_event_meta';
import { EuiContextMenuPanel, EuiContextMenuItem } from '../context_menu';
import { findTestSubject, takeMountedSnapshot } from '../../test';
import { render } from '../../test/rtl';

describe('EuiNotificationEventMeta', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiNotificationEventMeta
        id="id"
        type="Alert"
        time={<span>2 min ago</span>}
        eventName="eventName"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('severity is rendered', () => {
      const { container } = render(
        <EuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          severity="severity"
          eventName="eventName"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('badgeColor  is rendered', () => {
      const { container } = render(
        <EuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          eventName="eventName"
          badgeColor="success"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('logoCloud  is rendered', () => {
      const { container } = render(
        <EuiNotificationEventMeta
          id="id"
          type="Alert"
          time={<span>2 min ago</span>}
          iconType="logoCloud"
          eventName="eventName"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
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
