import React from 'react';

import { EuiCode, EuiLink, EuiText } from '../../../../src/components';

export default () => (
  <EuiText>
    <p>
      A simple <EuiLink href="#/navigation/link">EuiLink</EuiLink> used within a
      paragraph of text.
    </p>
    <p>
      This is actually a <EuiLink onClick={() => {}}>button</EuiLink> with an
      onClick handler.
    </p>
    <p>
      Here is an example of a{' '}
      <EuiLink
        href="https://github.com/elastic/eui/blob/master/wiki/react-router.md#how-react-router-works"
        onClick={() => {}}>
        link
      </EuiLink>{' '}
      with both an <EuiCode>href</EuiCode> and an <EuiCode>onClick</EuiCode>{' '}
      handler.
    </p>
  </EuiText>
);
