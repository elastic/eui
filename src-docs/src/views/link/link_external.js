import React from 'react';

import { EuiCode, EuiLink, EuiText } from '../../../../src/components';

export default () => (
  <EuiText>
    <p>
      Open the{' '}
      <EuiLink href="http://www.elastic.co" target="_blank">
        Elastic website
      </EuiLink>{' '}
      in a new tab.
    </p>
    <p>
      This{' '}
      <EuiLink href="#/navigation/link" external>
        link
      </EuiLink>{' '}
      has the <EuiCode>external</EuiCode> prop set to true.
    </p>
  </EuiText>
);
