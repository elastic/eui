import React from 'react';

import { EuiSkipLink } from '../../../../src/components/accessibility/skip_link';
import { EuiCallOut } from '../../../../src/components/call_out';
import { EuiText } from '../../../../src/components/text';
import { EuiPortal } from '../../../../src/components/portal';

export default () => (
  <div>
    <EuiText>
      <p>
        <em>
          Tab out of the browser&apos;s address bar and a{' '}
          <strong>Skip to main content</strong> link will appear on this page.
        </em>
      </p>
      <EuiCallOut
        size="s"
        title="A functional &lsquo;Skip to main content&rsquo; link will be added to the EUI docs site once the URL format is updated."
        iconType="iInCircle"
      />
    </EuiText>
    <EuiPortal>
      <EuiSkipLink
        destination="/#/utilities/accessibility"
        label="Skip to content"
        // TODO this tabIndex value won't be necessary once a real skip to content link is added to the EUI docs site.
        // Adding the link is blocked until the new static site system (and non-hashed URL) is in place.
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={1}
      />
    </EuiPortal>
  </div>
);
