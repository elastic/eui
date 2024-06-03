import React, { useState } from 'react';

import {
  EuiSkeletonLoading,
  EuiSkeletonRectangle,
  EuiFieldText,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  useEuiTheme,
} from '../../../../src';

export default () => {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const { euiTheme } = useEuiTheme();

  return (
    <>
      <EuiSkeletonLoading
        isLoading={isLoading}
        announceLoadedStatus={false} // Prevents unnecessary announcement on page load
        announceLoadingStatus={true} // Announces on submit
        ariaLiveProps={{ role: 'alert' }} // Allows customizing the aria-live region
        contentAriaLabel="Demo form"
        loadingContent={
          <EuiSkeletonRectangle width="100%" height={euiTheme.size.xxl} />
        }
        loadedContent={
          <form onSubmit={simulateLoading}>
            <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
              <EuiFlexItem>
                <EuiFieldText
                  fullWidth
                  aria-label="Input that transitions to loading"
                  defaultValue="Replaced with a loading skeleton on submit"
                />
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton type="submit" fill>
                  Submit
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton>Cancel</EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </form>
        }
      />
    </>
  );
};
