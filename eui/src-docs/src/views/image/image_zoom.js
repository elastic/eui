import React from 'react';

import {
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup>
    <EuiFlexItem grow={false}>
      <EuiImage
        size="m"
        hasShadow
        allowFullScreen
        caption="Click me"
        alt="Accessible image alt goes here"
        url="https://source.unsplash.com/iYPIx7VIh5g/2000x1000/"
      />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiImage
        size="m"
        hasShadow
        allowFullScreen
        caption="Click me"
        alt="Accessible image alt goes here"
        fullScreenIconColor="dark"
        url="https://source.unsplash.com/5D2af8aFE5k/1000x2000"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
