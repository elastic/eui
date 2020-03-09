import React from 'react';

import { EuiComment } from '../../../../src/components/comment';
// import { EuiSpacer } from '../../../../src/components/spacer';

const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut quam eget augue pulvinar.';

export default () => (
  <div>
    <EuiComment body={body} />
    <EuiComment body={body} />
    <EuiComment />
  </div>
);
