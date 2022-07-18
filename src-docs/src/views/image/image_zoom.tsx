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
        caption="Albert Einstein, theoretical physicist"
        alt="" // Because this image is sufficiently described by its caption, there is no need to repeat it via alt text
        src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg"
      />
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiImage
        size="m"
        hasShadow
        allowFullScreen
        caption="Marie Curie, physicist and chemist"
        alt="" // Because this image is sufficiently described by its caption, there is no need to repeat it via alt text
        fullScreenIconColor="dark"
        src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Marie_Sklodowska%2C_%C3%A9tudiante%2C_en_1895.jpg"
      />
    </EuiFlexItem>
  </EuiFlexGroup>
);
