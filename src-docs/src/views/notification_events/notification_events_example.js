import React from 'react';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import { EuiNotificationEventMeta } from '../../../../src/components';
import { EuiContextMenuItem } from '../../../../src/components/context_menu/';

import Notification from './notification_events';
const notificationSource = require('!!raw-loader!./notification_events');
const notificationHtml = renderToHtml(Notification);

export const NotificationEventsExample = {
  title: 'Notification Events',
  isNew: true,
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationHtml,
        },
      ],
      props: {
        EuiNotificationEventMeta,
        EuiContextMenuItem,
      },
      demo: <Notification />,
    },
  ],
};
