import React from 'react';

import { EuiImage, EuiSpacer } from '../../../../src/components';

const src =
  'https://images.unsplash.com/photo-1477747219299-60f95c811fef?w=1000&h=1000&fit=crop&q=60';
const alt =
  'A cozy breakfast scene. In the background is a plate of waffles and blueberries. In the middle ground is a glass of orange juice and a small cup of cream. In the foreground is a plate of Eggs Benedict with a side of salad and cherry tomatoes.';

export default () => (
  <div>
    <EuiImage
      hasShadow
      allowFullScreen
      size={50}
      caption="Custom size (50)"
      alt={alt}
      src={src}
      wrapperProps={{ className: 'eui-textLeft' }}
    />
    <EuiSpacer />
    <EuiImage
      size="s"
      hasShadow
      allowFullScreen
      caption="Small"
      alt={alt}
      src={src}
    />
    <EuiSpacer />
    <EuiImage
      size="m"
      hasShadow
      allowFullScreen
      caption="Medium"
      alt={alt}
      src={src}
    />
    <EuiSpacer />
    <EuiImage
      size="l"
      hasShadow
      allowFullScreen
      caption="Large"
      alt={alt}
      src={src}
    />
    <EuiSpacer />
    <EuiImage
      size="xl"
      hasShadow
      allowFullScreen
      caption="Extra large"
      alt={alt}
      src={src}
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      caption="Original"
      alt={alt}
      src={src}
    />
    <EuiSpacer />
    <EuiImage
      hasShadow
      allowFullScreen
      size="fullWidth"
      caption="Full width"
      alt={alt}
      src={src}
    />
  </div>
);
