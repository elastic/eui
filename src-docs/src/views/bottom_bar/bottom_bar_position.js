import React from 'react';

import { EuiBottomBar, EuiText } from '../../../../src/components';

export default () => {
  return (
    <div css={{ overflow: 'auto', blockSize: 200 }}>
      <EuiText>
        <p>
          When scrolling within this example, the <strong>EuiBottomBar</strong>{' '}
          will stick to the bottom of scrollable container (with a 10px offset),
          but will not scroll with the page itself.
        </p>
      </EuiText>
      <div css={{ blockSize: 400 }} />
      <EuiBottomBar position="sticky" bottom={10}>
        <EuiText textAlign="center">
          <p>Scroll to see!</p>
        </EuiText>
      </EuiBottomBar>
    </div>
  );
};
