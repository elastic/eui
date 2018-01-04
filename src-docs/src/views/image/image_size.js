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
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="m"
      hasShadow
      allowFullScreen
      caption="Medium"
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
    <EuiSpacer />
    <EuiImage
      size="l"
      hasShadow
      allowFullScreen
      caption="Large"
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      caption="Original"
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      size="fullWidth"
      caption="Full width"
      url="http://bookmans.com/wp-content/uploads/2016/07/E6e7_dungeons_dragons.jpg"
    />
  </div>
);
