import React from 'react';

import { EuiCallOut, EuiLink, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiCallOut
      title="Check it out, here's a really long title that will wrap within a narrower browser"
      iconType="search">
      <p>
        Here&rsquo;s some stuff that you need to know. We can make this text
        really long so that, when viewed within a browser that&rsquo;s fairly
        narrow, it will wrap, too.
      </p>
      <p>
        And some other stuff on another line, just for kicks. And{' '}
        <EuiLink href="#">here&rsquo;s a link</EuiLink>.
      </p>
    </EuiCallOut>

    <EuiSpacer size="m" />

    <EuiCallOut
      title="Callouts can exist as just a title. Simply omit the child content."
      iconType="gear"
    />

    <EuiSpacer size="m" />

    <EuiCallOut
      size="s"
      title="This is a small callout for more unintrusive but constant messages."
      iconType="pin"
    />
  </div>
);
