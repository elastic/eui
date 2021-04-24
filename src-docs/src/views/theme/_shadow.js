import React from 'react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiIcon,
} from '../../../../src/components';
import { shadow } from '../../../../src/global_styling/variables/_shadows';

import { ThemeValue } from './_values';

const shadowKeys = Object.keys(shadow);

export default () => {
  const { euiTheme } = useEuiTheme();
  const shadow = euiTheme.shadow;

  return (
    <div>
      <EuiTitle>
        <h2>Shadow</h2>
      </EuiTitle>

      <EuiSpacer />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiText grow={false}>
            <p>
              Currently, this key only holds the shadow color values. They will
              be transparentized in their application.
            </p>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel paddingSize="l" color="subdued">
            {shadowKeys.map((key) => (
              <ThemeValue
                key={key}
                property={'shadow'}
                name={key}
                value={shadow[key]}
                example={
                  <EuiIcon size="l" type="stopFilled" color={shadow[key]} />
                }
              />
            ))}
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};
