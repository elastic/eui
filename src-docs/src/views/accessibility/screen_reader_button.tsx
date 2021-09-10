import React from 'react';

import {
  EuiScreenReaderOnly,
  EuiText,
  EuiLink,
} from '../../../../src/components';

export default () => (
  <EuiText>
    <p>
      Without relative position:{' '}
      <EuiLink href="#/utilities/accessibility">
        Link text{' '}
        <EuiScreenReaderOnly>
          <span>has screen reader text</span>
        </EuiScreenReaderOnly>
      </EuiLink>
    </p>
    <p>
      With releative position:{' '}
      <EuiLink
        style={{ position: 'relative' }}
        href="#/utilities/accessibility"
      >
        Link text{' '}
        <EuiScreenReaderOnly>
          <span>has screen reader text</span>
        </EuiScreenReaderOnly>
      </EuiLink>
    </p>
  </EuiText>
);
