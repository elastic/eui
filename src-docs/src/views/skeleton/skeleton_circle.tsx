import React, { useState } from 'react';

import {
  EuiSkeletonCircle,
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <EuiSwitch
        label="Toggle loaded state"
        checked={isLoading}
        onChange={() => setIsLoading(!isLoading)}
      />
      <EuiSpacer />
      <EuiFlexGroup responsive={false} gutterSize="s" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiSkeletonCircle
            size="s"
            isLoading={isLoading}
            contentAriaLabel="Demo skeleton avatar"
          >
            <EuiAvatar size="s" name="Raphael" />
          </EuiSkeletonCircle>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonCircle
            size="m"
            isLoading={isLoading}
            contentAriaLabel="Demo skeleton avatar"
          >
            <EuiAvatar size="m" name="Donatello" />
          </EuiSkeletonCircle>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonCircle
            size="l"
            isLoading={isLoading}
            contentAriaLabel="Demo skeleton avatar"
          >
            <EuiAvatar size="l" name="Leonardo" />
          </EuiSkeletonCircle>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonCircle
            size="xl"
            isLoading={isLoading}
            contentAriaLabel="Demo skeleton avatar"
          >
            <EuiAvatar size="xl" name="Michelangelo" />
          </EuiSkeletonCircle>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
