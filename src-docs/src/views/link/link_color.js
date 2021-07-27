import React from 'react';

import { EuiLink, EuiText } from '../../../../src/components';

const links = [
  'primary',
  'subdued',
  'success',
  'accent',
  'warning',
  'danger',
  'text',
];

export default () => (
  <EuiText>
    <ul>
      {links.map((value) => (
        <li key={value}>
          <EuiLink
            color={value !== 'disabled' ? value : undefined}
            href="#/navigation/link">
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </EuiLink>
        </li>
      ))}
      <li style={{ background: 'black' }}>
        <EuiLink color="ghost">Ghost</EuiLink>
      </li>
    </ul>
  </EuiText>
);
