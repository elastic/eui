import React from 'react';

import {
  EuiBetaBadge,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiBetaBadge label="Beta" tooltipContent="This module is not GA. Please help us by reporting any bugs." />
    &emsp;
    <EuiBetaBadge label="Lab" title="Laboratory" tooltipContent="This module is not GA. Please help us by reporting any bugs." />
    &emsp;
    <EuiBetaBadge label="Lightening" iconType="bolt" />

    <EuiSpacer />
    <EuiTitle>
      <h3>Beta badges will also line up nicely with titles <EuiBetaBadge label="Lab" tooltipContent="This module is not GA. Please help us by reporting any bugs." /></h3>
    </EuiTitle>
  </div>
);
