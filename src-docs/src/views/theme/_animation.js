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

import {
  animation_ease,
  animation_speed,
} from '../../../../src/global_styling/variables/_animations';

import { ThemeValue } from './_values';

const speedKeys = Object.keys(animation_speed);
const easeKeys = Object.keys(animation_ease);

export default () => {
  const { euiTheme } = useEuiTheme();
  const animation = euiTheme.animation;

  return (
    <div>
      <EuiTitle>
        <h2>Animation</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false}>
            <p>
              These are general properties that can be used to create subtle
              animations or transitions that share similar timing and easing
              functions.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {speedKeys.map((key) => (
              <ThemeValue
                key={key}
                property="animation"
                name={key}
                value={animation[key]}
              />
            ))}
          </EuiPanel>
          <EuiSpacer />
          <EuiPanel paddingSize="l" color="subdued">
            {easeKeys.map((key) => (
              <ThemeValue
                key={key}
                property="animation"
                name={key}
                value={animation[key]}
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
