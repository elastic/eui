import React from 'react';

import { EuiBottomBar, EuiSpacer, EuiText } from '../../../../src/components';

export default () => {
  return (
    <>
      <EuiText>
        <p>
          When scrolling past this example block, the{' '}
          <strong>EuiBottomBar</strong> will stick to the bottom of the browser
          window (with a 10px offset), but keeps it within the bounds of its
          parent.
        </p>
      </EuiText>
      <EuiSpacer size="xl" />
      <EuiSpacer size="xl" />
      <EuiBottomBar position="sticky" bottom={10}>
        <EuiText color="ghost" textAlign="center">
          <p>Scroll to see!</p>
        </EuiText>
      </EuiBottomBar>
    </>
  );
};
