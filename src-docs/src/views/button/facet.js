import React from 'react';

import {
  EuiButtonFacet,
  EuiFlexGroup,
} from '../../../../src/components';

export default () => (
  <EuiFlexGroup direction="column" style={{ maxWidth: '200px' }}>
    <EuiButtonFacet quantity={6} >
      Created by me
    </EuiButtonFacet>
    <EuiButtonFacet quantity={60} isDisabled>
      Created by me
    </EuiButtonFacet>
    <EuiButtonFacet quantity={600} isLoading>
      Created by me
    </EuiButtonFacet>
    <EuiButtonFacet quantity={6000} isSelected>
      Created by me
    </EuiButtonFacet>
    <EuiButtonFacet quantity={60000} isSelected isDisabled>
      Created by me
    </EuiButtonFacet>
    <EuiButtonFacet quantity={600000} title="Created by me with such a long name to be truncated">
      Created by me with such a long name to be truncated
    </EuiButtonFacet>
  </EuiFlexGroup>
);
