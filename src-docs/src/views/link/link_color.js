import React from 'react';

import { EuiLink, EuiText } from '../../../../src/components';

export default () => (
  <EuiText>
    <ul>
      <li>
        <EuiLink color="primary">Primary (default)</EuiLink>
      </li>
      <li>
        <EuiLink color="subdued">Subdued</EuiLink>
      </li>
      <li>
        <EuiLink color="success">Success</EuiLink>
      </li>
      <li>
        <EuiLink color="accent">Accent</EuiLink>
      </li>
      <li>
        <EuiLink color="danger">Danger</EuiLink>
      </li>
      <li>
        <EuiLink color="warning">Warning</EuiLink>
      </li>
      <li>
        <EuiLink color="text">Text</EuiLink>
      </li>
      <li style={{ background: 'black' }}>
        <EuiLink color="ghost">Ghost</EuiLink>
      </li>
    </ul>
  </EuiText>
);
