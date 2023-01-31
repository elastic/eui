import React, { useState } from 'react';

import {
  EuiSkeletonLoading,
  EuiSkeletonTitle,
  EuiTitle,
  EuiSkeletonText,
  EuiText,
  EuiSkeletonRectangle,
  EuiCard,
  EuiSkeletonCircle,
  EuiAvatar,
  EuiSwitch,
  EuiSpacer,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCode,
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
      <EuiSkeletonLoading
        isLoading={isLoading}
        contentAriaLabel="Demo loading section"
        loadingContent={
          <EuiPanel>
            <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
              <EuiFlexItem grow={false}>
                <EuiSkeletonCircle size="s" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiSkeletonTitle size="l" />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer size="s" />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiSkeletonText lines={5} />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiSkeletonRectangle width="100%" height={148} />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        }
        loadedContent={
          <EuiPanel>
            <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
              <EuiAvatar size="s" name="Avatar" />
              <EuiTitle size="l">
                <span>Example section title</span>
              </EuiTitle>
            </EuiFlexGroup>
            <EuiSpacer size="s" />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiText>
                  <p>
                    This demo groups multiple skeleton types into a single
                    loading section by using{' '}
                    <EuiCode>EuiSkeletonLoading</EuiCode>.
                  </p>
                  <p>
                    This is a significant usability improvement for screen
                    readers as only one loaded message is announced, as opposed
                    to four.
                  </p>
                </EuiText>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiCard
                  display="subdued"
                  icon={<EuiIcon size="xxl" type="logoElastic" />}
                  title="Elastic Cloud"
                  description="Example card description."
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        }
      />
    </>
  );
};
