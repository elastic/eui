import React, { Fragment } from 'react';
import {
  EuiTitle,
  EuiSpacer,
  EuiAspectRatio,
} from '../../../../src/components/title';

export const defaultElasticCharts = (
  <Fragment>
    <EuiTitle size="s">
      <p>16x9 aspect</p>
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
  </Fragment>
);
