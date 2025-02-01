import React from 'react';

import { EuiCallOut, EuiLink } from '../../../../src';

export default () => (
  <EuiCallOut title="Shiny new thing has arrived" color="accent" iconType="cheer">
    <p>
      When one directions simply isn't enough.{' '}
      <EuiLink external href="#">Learn more</EuiLink>.
    </p>
  </EuiCallOut>
);
