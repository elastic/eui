import React, { Fragment, useState } from 'react';

import { EuiSkipLink } from '../../../../src/components/accessibility/skip_link';
import { EuiCallOut } from '../../../../src/components/call_out';
import { EuiText } from '../../../../src/components/text';
import { EuiPortal } from '../../../../src/components/portal';
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
              Tab out of the browser&apos;s address bar and a fixed{' '}
              <strong>Skip to main content</strong> link will appear atop this
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
          <EuiPortal>
            <EuiSkipLink
              destination="/#/utilities/accessibility"
              label="Skip to content"
              fixedToTop
              // TODO this tabIndex value won't be necessary once a real skip to content link is added to the EUI docs site.
              // Adding the link is blocked until the new static site system (and non-hashed URL) is in place.
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              tabIndex={1}
            />
          </EuiPortal>
          <EuiCallOut
            size="s"
            title="A functional &lsquo;Skip to main content&rsquo; link will be added to the EUI docs site once our URL format is updated."
            iconType="iInCircle"
          />
        </Fragment>
      ) : (
        <EuiSkipLink
          destination="/#/utilities/accessibility"
          label="Skip to content"
          // TODO this tabIndex value won't be necessary once a real skip to content link is added to the EUI docs site.
          // Adding the link is blocked until the new static site system (and non-hashed URL) is in place.
          // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        />
      )}
    </Fragment>
  );
};
