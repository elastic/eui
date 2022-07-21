import React from 'react';

import { EuiImage } from '../../../../src/components';

export default () => (
  <EuiImage
    size="l"
    hasShadow
    caption={
      <p>
        <em>Mastigias papua</em>, also known as spotted jelly
      </p>
    }
    alt="Many small white-spotted pink jellyfish floating in a dark aquarium"
    src="https://images.unsplash.com/photo-1650253618249-fb0d32d3865c?w=900&h=900&fit=crop&q=60"
  />
);
