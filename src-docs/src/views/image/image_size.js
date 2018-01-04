import React from 'react';

import {
  EuiImage,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiImage
      size="s"
      hasShadow
      allowFullScreen
      caption="Small"
      title="Accessible image title goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="m"
      hasShadow
      allowFullScreen
      caption="Medium"
      title="Accessible image title goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="l"
      hasShadow
      allowFullScreen
      caption="Large"
      title="Accessible image title goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="xl"
      hasShadow
      allowFullScreen
      caption="Extra large"
      title="Accessible image title goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      caption="Original"
      title="Accessible image title goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      size="fullWidth"
      caption="Full width"
      title="Accessible image title goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
  </div>
);
