import React from 'react';

import {
  EuiScreenReaderOnly,
  EuiText,
  EuiLink,
} from '../../../../src/components';

export default () => (
  <EuiText>
    <p>
      This link is visible to all on focus:{' '}
      <EuiScreenReaderOnly showOnFocus>
        <EuiLink href="#/utilities/accessibility">Link text</EuiLink>
      </EuiScreenReaderOnly>
    </p>
  </EuiText>
);
