/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, render } from 'enzyme';
import { EuiNotificationEvent } from './notification_event';
import { EuiContextMenuPanel, EuiContextMenuItem } from '../context_menu';
import { findTestSubject, takeMountedSnapshot } from '../../test';

describe('EuiNotificationEvent', () => {
  test('is rendered', () => {
    const component = render(
      <EuiNotificationEvent
        id="id"
        type="Alert"
        time="1 min ago"
        title="title"
        messages={['message']}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('multiple messages are rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          messages={['message 1', 'message 2', 'message 3']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('isRead  is rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          isRead={true}
          onRead={() => {}}
          title="title"
          messages={['message']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('severity  is rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          severity="severity"
          title="title"
          messages={['message']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('badgeColor is rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          badgeColor="warning"
          title="title"
          messages={['message']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('iconType is rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          iconType="logoCloud"
          title="title"
          messages={['message']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('headingLevel is rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          headingLevel="h4"
          messages={['message']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('iconAriaLabel is rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          iconType="logoCloud"
          iconAriaLabel="my icon aria label"
          messages={['message']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('primaryAction is rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          primaryAction="primaryAction label"
          onClickPrimaryAction={() => {}}
          messages={['message']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('primaryActionProps is rendered', () => {
      const component = render(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          primaryAction="primaryAction"
          primaryActionProps={{ iconType: 'download' }}
          onClickPrimaryAction={() => {}}
          messages={['message']}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('contextMenuItems are rendered', () => {
      const onOpenContextMenu = (id: string) => {
        return [
          <EuiContextMenuItem key="contextMenuItemA">
            Context menu 1 for id: {id}
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="contextMenuItemB">
            Context menu 2 for id: {id}
          </EuiContextMenuItem>,
          <EuiContextMenuItem key="contextMenuItemC">
            Context menu 3 for id: {id}
          </EuiContextMenuItem>,
        ];
      };

      const component = mount(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          title="title"
          messages={['message']}
          onOpenContextMenu={onOpenContextMenu}
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

  describe('behavior', () => {
    it('triggers the onRead callback', () => {
      const onRead = jest.fn();

      const component = mount(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          isRead={true}
          onRead={onRead}
          title="title"
          messages={['message']}
        />
      );

      findTestSubject(component, 'id-notificationEventReadButton').simulate(
        'click'
      );

      expect(onRead).toHaveBeenCalledTimes(1);
    });

    it('triggers the onClickPrimaryAction callback', () => {
      const onClickPrimaryAction = jest.fn();

      const component = mount(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          isRead={true}
          onRead={() => {}}
          onClickPrimaryAction={onClickPrimaryAction}
          primaryAction="primary action label"
          title="title"
          messages={['message']}
        />
      );

      findTestSubject(component, 'id-notificationEventPrimaryAction').simulate(
        'click'
      );

      expect(onClickPrimaryAction).toHaveBeenCalledTimes(1);
    });

    it('triggers the onClickTitle callback', () => {
      const onClickTitle = jest.fn();

      const component = mount(
        <EuiNotificationEvent
          id="id"
          type="Alert"
          time="1 min ago"
          onClickTitle={onClickTitle}
          title="title"
          messages={['message']}
        />
      );

      findTestSubject(component, 'id-notificationEventTitle').simulate('click');

      expect(onClickTitle).toHaveBeenCalledTimes(1);
    });
  });
});
