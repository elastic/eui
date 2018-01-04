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
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="m"
      hasShadow
      allowFullScreen
      caption="Medium"
      title="Accessible image title goes here"
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="l"
      hasShadow
      allowFullScreen
      caption="Large"
      title="Accessible image title goes here"
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      caption="Original"
      title="Accessible image title goes here"
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      size="fullWidth"
      caption="Full width"
      title="Accessible image title goes here"
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
  </div>
);
