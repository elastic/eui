import React from 'react';
import { Link } from 'react-router-dom';

import { EuiCallOut, EuiLink } from '../../../../src/components';

export const SuggestExample = {
  title: 'Suggest',
  isDeprecated: true,
  sections: [
    {
      text: (
        <EuiCallOut
          color="danger"
          iconType="warning"
          title="EuiSuggest has been scheduled for deprecation"
        >
          <p>
            <strong>EuiSuggest</strong> is being deprecated due to low usage and
            high overlap with other existing EUI components.
          </p>
          <p>
            {' '}
            We recommend using{' '}
            <Link to="/forms/selectable">
              <strong>EuiSelectable</strong>
            </Link>{' '}
            instead, or{' '}
            <EuiLink
              href="https://github.com/elastic/eui/tree/main/src/components/suggest"
              target="_blank"
            >
              copying the component to your application
            </EuiLink>{' '}
            for usage if necessary. The component will be permanently removed in
            October 2023.
          </p>
        </EuiCallOut>
      ),
    },
  ],
};
