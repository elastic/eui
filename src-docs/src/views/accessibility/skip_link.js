import React, { Fragment, useState } from 'react';

import { EuiSkipLink } from '../../../../src/components/accessibility/skip_link';
import { EuiCallOut } from '../../../../src/components/call_out';
import { EuiText } from '../../../../src/components/text';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiSwitch } from '../../../../src/components/form/switch';

export default () => {
  const [isFixed, setFixed] = useState(false);

  return (
    <Fragment>
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
        onChange={e => setFixed(e.target.checked)}
      />
      <EuiSpacer />
      {isFixed ? (
        <Fragment>
          <EuiSkipLink
            destinationId="/utilities/accessibility"
            position="fixed">
            Skip to main content
          </EuiSkipLink>
          <EuiCallOut
            size="s"
            title="A functional &lsquo;Skip to main content&rsquo; link will be added to the EUI docs site once our URL format is updated."
            iconType="iInCircle"
          />
        </Fragment>
      ) : (
        <EuiSkipLink
          destinationId="/utilities/accessibility"
          data-test-subj="skip-link-demo-subj">
          Skip to content
        </EuiSkipLink>
      )}
    </Fragment>
  );
};
