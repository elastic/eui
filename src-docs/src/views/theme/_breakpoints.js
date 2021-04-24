import React from 'react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '../../../../src/components';

import { ThemeValue } from './_values';

export default () => {
  const { euiTheme } = useEuiTheme();
  const breakpoint = euiTheme.breakpoint;

  return (
    <div>
      <EuiTitle>
        <h2>Breakpoint</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false}>
            <p>
              These original set of breakpoint keys specify the minimum window
              size and are required. However, you can adjust and/or add more
              keys as needed.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {Object.keys(breakpoint).map((key) => (
              <ThemeValue
                key={key}
                property="breakpoint"
                name={key}
                value={breakpoint[key]}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
