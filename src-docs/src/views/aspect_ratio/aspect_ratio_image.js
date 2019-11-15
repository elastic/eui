import React, { Fragment } from 'react';

import {
  EuiAspectRatio,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiTitle size="s">
      <p>A wide image in a tall aspect of 1x1.25</p>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiAspectRatio width={1} height={1.25} cropContent maxWidth={300}>
      <img
        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/star-wars-the-rise-of-skywalker-finn-1-1571736018.jpg?crop=0.839xw:1.00xh;0.161xw,0&resize=768:*"
        alt="nature"
      />
    </EuiAspectRatio>
    <EuiSpacer />
    <EuiTitle size="s">
      <p>A tall image in a wide aspect of 2x1</p>
    </EuiTitle>
    <EuiSpacer size="s" />
    <EuiAspectRatio width={2} height={1} cropContent maxWidth={300}>
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/71PhjEaTZ6L._SY606_.jpg"
        alt="nature"
      />
    </EuiAspectRatio>
  </Fragment>
);
