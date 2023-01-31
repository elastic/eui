import React, { useState } from 'react';

import {
  EuiSkeletonTitle,
  EuiTitle,
  EuiSwitch,
  EuiSpacer,
  EuiFlexGroup,
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
        <EuiSkeletonTitle
          size="xxxs"
          isLoading={isLoading}
          contentAriaLabel="Demo skeleton title"
        >
          <EuiTitle size="xxxs">
            <span>This is an extra extra extra small title</span>
          </EuiTitle>
        </EuiSkeletonTitle>

        <EuiSkeletonTitle
          size="xxs"
          isLoading={isLoading}
          contentAriaLabel="Demo skeleton title"
        >
          <EuiTitle size="xxs">
            <span>This is an extra extra small title</span>
          </EuiTitle>
        </EuiSkeletonTitle>

        <EuiSkeletonTitle
          size="xs"
          isLoading={isLoading}
          contentAriaLabel="Demo skeleton title"
        >
          <EuiTitle size="xs">
            <span>This is an extra small title</span>
          </EuiTitle>
        </EuiSkeletonTitle>

        <EuiSkeletonTitle
          size="s"
          isLoading={isLoading}
          contentAriaLabel="Demo skeleton title"
        >
          <EuiTitle size="s">
            <span>This is a small title</span>
          </EuiTitle>
        </EuiSkeletonTitle>

        <EuiSkeletonTitle
          size="m"
          isLoading={isLoading}
          contentAriaLabel="Demo skeleton title"
        >
          <EuiTitle size="m">
            <span>This is a medium title</span>
          </EuiTitle>
        </EuiSkeletonTitle>

        <EuiSkeletonTitle
          size="l"
          isLoading={isLoading}
          contentAriaLabel="Demo skeleton title"
        >
          <EuiTitle size="l">
            <span>This is a large title</span>
          </EuiTitle>
        </EuiSkeletonTitle>
      </EuiFlexGroup>
    </>
  );
};
