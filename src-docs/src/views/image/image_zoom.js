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
        url="https://i.imgur.com/4qx7HhE.jpg"
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
        url="https://78.media.tumblr.com/a68012e7630f4633e83f58f49cb4fb0a/tumblr_ni61qyN2X91rv33k2o1_500.jpg"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
