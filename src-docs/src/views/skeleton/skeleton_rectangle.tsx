import React, { useState } from 'react';

import {
  EuiSkeletonRectangle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiSpacer,
  EuiImage,
  EuiBadge,
  EuiCard,
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
          <EuiSkeletonRectangle
            isLoading={isLoading}
            contentAriaLabel="Demo skeleton badge"
            width="54.16px"
            height="20px"
            borderRadius="s"
          >
            <EuiBadge color="success">Active</EuiBadge>
          </EuiSkeletonRectangle>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonRectangle
            isLoading={isLoading}
            contentAriaLabel="Demo skeleton image"
            width={100}
            height={100}
            borderRadius="none"
          >
            <EuiImage
              width={100}
              height={100}
              src="https://picsum.photos/300/300"
              alt="A randomized image"
            />
          </EuiSkeletonRectangle>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiSkeletonRectangle
            isLoading={isLoading}
            contentAriaLabel="Demo skeleton card"
            width={203}
            height={148}
            borderRadius="m"
          >
            <EuiCard
              icon={<EuiIcon size="xxl" type="logoCloud" />}
              title="Elastic Cloud"
              description="Example card description."
              onClick={() => {}}
            />
          </EuiSkeletonRectangle>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
