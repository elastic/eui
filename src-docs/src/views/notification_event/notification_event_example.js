import React from 'react';

import { EuiCallOut, EuiLink } from '../../../../src/components';

export const NotificationEventExample = {
  title: 'Notification event',
  isDeprecated: true,
  sections: [
    {
      text: (
        <EuiCallOut
          color="danger"
          iconType="warning"
          title="EuiNotificationEvent has been scheduled for deprecation"
        >
          <p>
            <strong>EuiNotificationEvent</strong> is being deprecated due to low
            usage and high maintenance requirements.
          </p>
          <p>
            If necessary, we recommend{' '}
            <EuiLink
              href="https://github.com/elastic/eui/tree/main/src/components/notification"
              target="_blank"
            >
              copying the component to your application
            </EuiLink>
            . The component will be permanently removed in December 2023.
          </p>
        </EuiCallOut>
      ),
    },
  ],
};
