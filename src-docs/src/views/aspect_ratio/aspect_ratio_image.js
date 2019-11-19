import React from 'react';

import {
  EuiAspectRatio,
  EuiSpacer,
  EuiTitle,
  EuiFlexGrid,
  EuiFlexItem,
  EuiImage,
} from '../../../../src/components';

export default () => (
  <EuiFlexGrid columns={3}>
    <EuiFlexItem>
      <div>
        <EuiTitle size="xs">
          <p>A wide image in a tall aspect of 1x1.25</p>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiAspectRatio width={2} height={1} cropContent maxWidth={300}>
          <img src="https://picsum.photos/600/300" alt="nature" />
        </EuiAspectRatio>
      </div>
    </EuiFlexItem>
    <EuiFlexItem>
      <div>
        <EuiTitle size="xs">
          <p>A tall image in a wide aspect of 2x1</p>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiAspectRatio width={2} height={1} cropContent maxWidth={300}>
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/71PhjEaTZ6L._SY606_.jpg"
            alt="nature"
          />
        </EuiAspectRatio>
      </div>
    </EuiFlexItem>
    <EuiFlexItem>
      <div>
        <EuiTitle size="xs">
          <p>EuiImage</p>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiAspectRatio width={2} height={1} cropContent maxWidth={300}>
          <EuiImage url="https://images-na.ssl-images-amazon.com/images/I/71PhjEaTZ6L._SY606_.jpg" />
        </EuiAspectRatio>
      </div>
    </EuiFlexItem>
  </EuiFlexGrid>
);
