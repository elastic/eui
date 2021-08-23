import React, { useState } from 'react';

import {
  EuiSkipLink,
  EuiCallOut,
  EuiText,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [isFixed, setFixed] = useState(false);

  return (
    <>
      <EuiText>
        {isFixed ? (
          <p>
            <em>
              Tab through this section and a fixed{' '}
              <strong>Skip to main content </strong> link will appear atop this
              page.
            </em>
          </p>
        ) : (
          <p>
            <em>
              Tab through this section and a <strong>Skip to content</strong>{' '}
              link will appear below.
            </em>
          </p>
        )}
      </EuiText>
      <EuiSpacer />
      <EuiSwitch
        label="Fix link to top of screen"
        checked={isFixed}
        onChange={(e) => setFixed(e.target.checked)}
      />
      <EuiSpacer />
      <EuiSkipLink
        destinationId="/utilities/accessibility"
        position={isFixed ? 'fixed' : 'static'}
        data-test-subj="skip-link-demo-subj"
      >
        Skip to {isFixed && 'main '}content
      </EuiSkipLink>
      {isFixed && (
        <>
          <EuiCallOut
            size="s"
            title="A functional &lsquo;Skip to main content&rsquo; link will be added to the EUI docs site once our URL format is updated."
            iconType="iInCircle"
          />
        </>
      )}
    </>
  );
};
