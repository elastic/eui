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
          {isLoading ? (
            <EuiSkeletonCircle size="s" />
          ) : (
            <EuiAvatar size="s" name="Raphael" />
          )}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          {isLoading ? (
            <EuiSkeletonCircle size="m" />
          ) : (
            <EuiAvatar size="m" name="Donatello" />
          )}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          {isLoading ? (
            <EuiSkeletonCircle size="l" />
          ) : (
            <EuiAvatar size="l" name="Leonardo" />
          )}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          {isLoading ? (
            <EuiSkeletonCircle size="xl" />
          ) : (
            <EuiAvatar size="xl" name="Michelangelo" />
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
