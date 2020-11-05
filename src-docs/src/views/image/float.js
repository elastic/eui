import React from 'react';

import { EuiImage, EuiText } from '../../../../src/components';
import { fake } from 'faker';

export default () => (
  <EuiText>
    <EuiImage
      size="l"
      float="right"
      margin="l"
      hasShadow
      caption="Random nature image"
      allowFullScreen
      alt="Random nature image"
      url="https://picsum.photos/800/500"
    />
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <EuiImage
      size="l"
      float="left"
      margin="l"
      hasShadow
      allowFullScreen
      caption="Another random image"
      alt="Random nature image"
      url="https://picsum.photos/300/300"
    />
    <p>{fake('{{lorem.paragraphs}}')}</p>
    <p>{fake('{{lorem.paragraphs}}')}</p>
  </EuiText>
);
