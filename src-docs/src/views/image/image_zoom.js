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
        caption="I am a starship. Zooom!"
        title="Click me to see in full screen."
        url="https://i.imgur.com/4qx7HhE.jpg"
      />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiImage
        size="m"
        hasShadow
        allowFullScreen
        caption="I am a starship. Zooom!"
        title="Click me to see in full screen."
        fullScreenIconColor="default"
        url="https://78.media.tumblr.com/a68012e7630f4633e83f58f49cb4fb0a/tumblr_ni61qyN2X91rv33k2o1_500.jpg"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
