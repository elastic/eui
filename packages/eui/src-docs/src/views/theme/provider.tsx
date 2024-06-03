import React from 'react';
import {
  EuiIcon,
  EuiCode,
  EuiText,
  useEuiTheme,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '../../../../src';

export default () => {
  const { euiTheme, colorMode } = useEuiTheme();
  return (
    <EuiPanel grow={false} paddingSize="l" color="subdued">
      <EuiFlexGroup responsive={false} alignItems="center">
        <EuiFlexItem grow={false}>
          <div>
            <EuiIcon
              aria-hidden="true"
              type="stopFilled"
              size="s"
              css={{ color: euiTheme.colors.primary }}
            />
            <EuiIcon
              aria-hidden="true"
              type="stopFilled"
              size="s"
              css={{ color: euiTheme.colors.success }}
            />
            <EuiIcon
              aria-hidden="true"
              type="stopFilled"
              size="s"
              css={{ color: euiTheme.colors.text }}
            />
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s">
            <strong>{euiTheme.themeName}</strong>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size="s">
            <EuiCode transparentBackground>colorMode:</EuiCode>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText size="s" color="subdued">
            <p>
              <code>{colorMode}</code>
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
