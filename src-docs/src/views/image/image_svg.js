import React from 'react';

import { EuiImage } from '../../../../src/components';
import FlowchartSvg from '../../images/flowchart.svg';

export default () => (
  <EuiImage
    size="l"
    width={400}
    hasShadow
    caption="Flowchart diagram"
    alt="Flowchart diagram"
    src={FlowchartSvg}
    allowFullScreen
  />
);
