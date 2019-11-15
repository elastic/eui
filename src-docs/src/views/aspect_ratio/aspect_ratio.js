import React, { Fragment } from 'react';

import {
  EuiAspectRatio,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiTitle size="s">
      <p>16x9 iframe</p>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiAspectRatio width={16} height={9}>
      <iframe
        title="Elastic is a search company"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/yJarWSLRM24"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </EuiAspectRatio>
    <EuiSpacer />
    <EuiTitle size="s">
      <p>4x3 iframe</p>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiAspectRatio width={4} height={3}>
      <iframe
        title="Elastic is a search company"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/yJarWSLRM24"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </EuiAspectRatio>
  </Fragment>
);
