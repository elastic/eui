import React from 'react';

import {
  EuiButton,
  EuiLink,
  EuiToast,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiToast
    title="Created report for dashboard 'Tuba Sales by Region'"
    color="success"
    iconType="check">
    <p>
      While the layout will adjust properly for wrapping titles, they do not
      look particularly good. Similarily, do not use a whole lot of text in your
      body either. At a certain point people will not have enough time to read
      these things. Like, you probably are not even reading this now.
    </p>

    <p>
      And some other stuff on another line, just for kicks. And{' '}
      <EuiLink href="#">here&rsquo;s a link</EuiLink>.
    </p>

    <EuiFlexGroup justifyContent="flexEnd" gutterSize="s">
      <EuiFlexItem grow={false}>
        <EuiButton size="s">Download report</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  </EuiToast>
);
