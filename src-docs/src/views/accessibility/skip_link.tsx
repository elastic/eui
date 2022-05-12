import React, { useState } from 'react';

import {
  EuiSkipLink,
  EuiCallOut,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [isFixed, setFixed] = useState(false);

  return (
    <>
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
