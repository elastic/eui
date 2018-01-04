import React from 'react';

import {
  EuiImage,
} from '../../../../src/components';

export default () => (
  <EuiImage
    size="l"
    hasShadow
    allowFullScreen
    caption="Click me to see full screen"
    title="Accessible image title goes here"
    url="https://i.imgur.com/4qx7HhE.jpg"
  />
);
