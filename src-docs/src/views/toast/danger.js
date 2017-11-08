import React from 'react';

import {
  EuiLink,
  EuiToast,
} from '../../../../src/components';

export default () => (
  <EuiToast
    title="Save failed"
    color="danger"
  >
    <p>
      Check your form for validation errors.
    </p>

    <p>
      And some other stuff on another line, just for kicks. And <EuiLink href="#">here&rsquo;s a link</EuiLink>.
    </p>
  </EuiToast>
);
