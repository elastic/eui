import React from 'react';

import { EuiFacetButton, EuiIcon, EuiAvatar } from '../../../../src/components';

export default () => (
  <div>
    <EuiFacetButton quantity={6}>Simple, no icon</EuiFacetButton>
    <br />
    <EuiFacetButton quantity={6} isSelected>
      Simple, selected
    </EuiFacetButton>
    <br />
    <EuiFacetButton
      quantity={6}
      icon={<EuiIcon type="dot" color="secondary" />}>
      Label or color indicator
    </EuiFacetButton>
    <br />
    <EuiFacetButton quantity={6} isDisabled>
      Disabled
    </EuiFacetButton>
    <br />
    <EuiFacetButton
      quantity={6}
      icon={<EuiAvatar size="s" name="Avatar Jones" />}>
      Avatar as icon
    </EuiFacetButton>
    <br />
    <EuiFacetButton quantity={6} isLoading>
      Loading
    </EuiFacetButton>
  </div>
);
