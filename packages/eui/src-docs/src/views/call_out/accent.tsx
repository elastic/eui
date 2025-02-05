import React from 'react';

import { EuiCallOut, EuiLink } from '../../../../src';

export default () => (
  <EuiCallOut
    title="Shiny new thing has arrived"
    color="accent"
    iconType="cheer"
  >
    <p>
      Dull thing can now be forgotten.{' '}
      <EuiLink external href="#">
        Learn more
      </EuiLink>
      .
    </p>
  </EuiCallOut>
);
