import React from 'react';

import {
  EuiScreenReaderOnly,
  EuiText,
  EuiLink,
  EuiToolTip,
  EuiButtonIcon,
} from '../../../../src/components';

export default () => (
  <EuiText>
    <p>
      This link is visible to all on focus:{' '}
      <EuiScreenReaderOnly showOnFocus>
        <EuiLink href="#/utilities/accessibility">Link text</EuiLink>
      </EuiScreenReaderOnly>
    </p>
    <p>
      This tooltip + button is visible on focus within:{' '}
      <EuiScreenReaderOnly showOnFocus>
        <span>
          <EuiToolTip content="Information">
            <EuiButtonIcon iconType="iInCircle" aria-label="Information" />
          </EuiToolTip>
        </span>
      </EuiScreenReaderOnly>
    </p>
  </EuiText>
);
