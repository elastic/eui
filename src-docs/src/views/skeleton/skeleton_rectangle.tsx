import React, { useState } from 'react';

import {
  EuiSkeletonRectangle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiSpacer,
  EuiImage,
  EuiBadge,
  EuiIcon,
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
      <EuiFlexGroup responsive={false} wrap>
        <EuiFlexItem grow={false}>
          {isLoading ? (
            <EuiSkeletonRectangle width="16px" height="16px" borderRadius="s" />
          ) : (
            <EuiIcon type="cheer" />
          )}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          {isLoading ? (
            <EuiSkeletonRectangle
              width="54.16px"
              height="20px"
              borderRadius="m"
            />
          ) : (
            <EuiBadge color="success">Active</EuiBadge>
          )}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          {isLoading ? (
            <EuiSkeletonRectangle
              width={100}
              height={100}
              borderRadius="none"
            />
          ) : (
            <EuiImage
              width={100}
              height={100}
              src="https://picsum.photos/300/300"
              alt="A randomized image"
            />
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
