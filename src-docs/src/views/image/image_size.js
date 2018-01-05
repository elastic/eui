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
      alt="Accessible image alt goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="m"
      hasShadow
      allowFullScreen
      caption="Medium"
      alt="Accessible image alt goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="l"
      hasShadow
      allowFullScreen
      caption="Large"
      alt="Accessible image alt goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="xl"
      hasShadow
      allowFullScreen
      caption="Extra large"
      alt="Accessible image alt goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      caption="Original"
      alt="Accessible image alt goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      size="fullWidth"
      caption="Full width"
      alt="Accessible image alt goes here"
      url="https://i.imgur.com/4qx7HhE.jpg"
    />
  </div>
);
