import React, { useState } from 'react';

import {
  EuiSkeletonTitle,
  EuiTitle,
  EuiSwitch,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
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
      <EuiFlexGroup direction="column">
        <EuiFlexItem>
          {isLoading ? (
            <EuiSkeletonTitle size="xxxs" />
          ) : (
            <EuiTitle size="xxxs">
              <span>This is an extra extra extra small title</span>
            </EuiTitle>
          )}
        </EuiFlexItem>

        <EuiFlexItem>
          {isLoading ? (
            <EuiSkeletonTitle size="xxs" />
          ) : (
            <EuiTitle size="xxs">
              <span>This is an extra extra small title</span>
            </EuiTitle>
          )}
        </EuiFlexItem>

        <EuiFlexItem>
          {isLoading ? (
            <EuiSkeletonTitle size="xs" />
          ) : (
            <EuiTitle size="xs">
              <span>This is an extra small title</span>
            </EuiTitle>
          )}
        </EuiFlexItem>

        <EuiFlexItem>
          {isLoading ? (
            <EuiSkeletonTitle size="s" />
          ) : (
            <EuiTitle size="s">
              <span>This is a small title</span>
            </EuiTitle>
          )}
        </EuiFlexItem>

        <EuiFlexItem>
          {isLoading ? (
            <EuiSkeletonTitle size="m" />
          ) : (
            <EuiTitle size="m">
              <span>This is a medium title</span>
            </EuiTitle>
          )}
        </EuiFlexItem>

        <EuiFlexItem>
          {isLoading ? (
            <EuiSkeletonTitle size="l" />
          ) : (
            <EuiTitle size="l">
              <span>This is a large title</span>
            </EuiTitle>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
