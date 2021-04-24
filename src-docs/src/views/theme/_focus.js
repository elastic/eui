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
  const focus = euiTheme.focus;

  return (
    <div>
      <EuiTitle>
        <h2>Focus</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false}>
            <p>
              These are general properties that apply to the focus state of
              interactable components. Some components have their own specific
              implementation, but most use these variables.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {Object.keys(focus).map((key) => (
              <ThemeValue
                key={key}
                property="focus"
                name={key}
                value={focus[key]}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
