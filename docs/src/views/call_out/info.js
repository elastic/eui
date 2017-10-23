import React from 'react';

import {
  KuiCallOut,
  KuiLink,
  KuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <KuiCallOut
      title="Check it out, here's a really long title that will wrap within a narrower browser"
      iconType="search"
    >
      <p>
        Here&rsquo;s some stuff that you need to know. We can make this text really long so that,
        when viewed within a browser that&rsquo;s fairly narrow, it will wrap, too.
      </p>
      <p>
        And some other stuff on another line, just for kicks. And <KuiLink href="#">here&rsquo;s a link</KuiLink>.
      </p>
    </KuiCallOut>

    <KuiSpacer size="m" />

    <KuiCallOut
      title="Callouts can exist as just a title. Simply omit the child content."
      iconType="gear"
    />
  </div>
);
