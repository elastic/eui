import React from 'react';

import { EuiSkipLink, EuiText } from '../../../../src/components';

export default () => {
  return (
    <EuiText id="skip-link-example">
      <p>The following skip links are only visible on focus:</p>
      <EuiSkipLink destinationId="skip-link-example" overrideLinkBehavior>
        Skips to this example container
      </EuiSkipLink>
      <EuiSkipLink destinationId="" overrideLinkBehavior>
        Falls back to main container
      </EuiSkipLink>
    </EuiText>
  );
};
