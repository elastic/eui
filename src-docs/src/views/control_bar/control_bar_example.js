import React from 'react';
import { Link } from 'react-router-dom';

import { EuiCallOut, EuiLink } from '../../../../src/components';

export const ControlBarExample = {
  title: 'Control bar',
  isDeprecated: true,
  sections: [
    {
      text: (
        <EuiCallOut
          color="danger"
          iconType="warning"
          title="EuiControlBar has been scheduled for deprecation"
        >
          <p>
            <strong>EuiControlBar</strong> is being deprecated due to low usage
            and high overlap with other existing EUI components.
          </p>
          <p>
            {' '}
            We recommend using{' '}
            <Link to="/layout/bottom-bar">
              <strong>EuiBottomBar</strong>
            </Link>{' '}
            instead, or{' '}
            <EuiLink
              href="https://github.com/elastic/eui/tree/main/src/components/control_bar"
              target="_blank"
            >
              copying the component to your application
            </EuiLink>{' '}
            for usage if necessary. The component will be permanently removed in
            December 2023.
          </p>
        </EuiCallOut>
      ),
    },
  ],
};
