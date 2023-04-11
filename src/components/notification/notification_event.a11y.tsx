/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
/// <reference types="../../../cypress/support" />

import React, { useState } from 'react';
import { EuiContextMenuItem } from '../context_menu';
import { EuiNotificationEvent } from './notification_event';
import { EuiPanel } from '../panel';

const NotificationEvent = () => {
  const [isRead, setIsRead] = useState(false);

  const onRead = (id: string, isRead: boolean) => {
    setIsRead(!isRead);
  };

  const onOpenContextMenu = (id: string) => {
    return [
      <EuiContextMenuItem
        key="contextMenuItemA"
        onClick={() => onRead(id, isRead)}
      >
        {isRead ? 'Mark as unread' : 'Mark as read'}
      </EuiContextMenuItem>,

      <EuiContextMenuItem key="contextMenuItemB" onClick={() => {}}>
        View messages like this
      </EuiContextMenuItem>,

      <EuiContextMenuItem key="contextMenuItemC" onClick={() => {}}>
        Don’t notify me about this
      </EuiContextMenuItem>,
    ];
  };

  return (
    <EuiPanel paddingSize="none" hasShadow={true} style={{ maxWidth: '540px' }}>
      <EuiNotificationEvent
        id="cy-eui-notification-1"
        type="Report"
        iconType="logoKibana"
        iconAriaLabel="Kibana"
        time="1 min ago"
        title="[Error Monitoring Report] is generated"
        primaryAction="Download"
        primaryActionProps={{
          iconType: 'download',
        }}
        messages={['The reported was generated at 17:12:16 GMT+4']}
        isRead={isRead}
        onRead={onRead}
        onOpenContextMenu={onOpenContextMenu}
        onClickPrimaryAction={() => {}}
        onClickTitle={() => {}}
      />
    </EuiPanel>
  );
};

describe('EuiNotificationEvent', () => {
  beforeEach(() => {
    cy.viewport(1024, 768); // medium breakpoint
    cy.realMount(<NotificationEvent />);
    cy.get('article.euiNotificationEvent').should('exist');
  });

  describe('Automated accessibility check', () => {
    it('has zero violations on first render', () => {
      cy.checkAxe();
    });

    it('has zero violations when popover is open', () => {
      cy.get(
        'button[data-test-subj="cy-eui-notification-1-notificationEventMetaButton"]'
      ).realClick();
      cy.get('div.euiPopover__panel').should('exist');
      cy.checkAxe();
    });

    it('has zero violations after the Mark as read button is clicked', () => {
      cy.get(
        'button[data-test-subj="cy-eui-notification-1-notificationEventMetaButton"]'
      ).realClick();
      cy.get('div.euiPopover__panel').should('exist');
      cy.get('div.euiPopover__panel button').first().realClick();
      cy.checkAxe();
    });
  });

  describe('Keyboard accessibility', () => {
    it('has zero violations when the popover is opened by keyboard', () => {
      cy.repeatRealPress('Tab');
      cy.get(
        'button[data-test-subj="cy-eui-notification-1-notificationEventMetaButton"]'
      ).should('have.focus');
      cy.realPress('Enter');
      cy.get('div.euiPopover__panel').should('exist');
      cy.checkAxe();
      cy.realPress('Escape');
      cy.get('div.euiPopover__panel').should('not.exist');
      cy.checkAxe();
    });
  });
});
