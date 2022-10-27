import React from 'react';

import { EuiImage, EuiText } from '../../../../src/components';
import { faker } from '@faker-js/faker';

export default () => (
  <EuiText>
    <EuiImage
      size="l"
      float="right"
      margin="l"
      hasShadow
      caption="A randomized image"
      allowFullScreen
      alt="" // Because the image is randomized, there is no meaningful alt text we can generate here.
      src="https://picsum.photos/800/500"
    />
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
    <EuiImage
      size="l"
      float="left"
      margin="l"
      hasShadow
      allowFullScreen
      caption="Another randomized image"
      alt="" // Because the image is randomized, there is no meaningful alt text we can generate here.
      src="https://picsum.photos/300/300"
    />
    <p>{faker.lorem.paragraphs()}</p>
    <p>{faker.lorem.paragraphs()}</p>
  </EuiText>
);
