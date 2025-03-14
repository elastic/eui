import React from 'react';
import {
  EuiIcon,
  EuiCode,
  EuiText,
  useEuiTheme,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';

interface ProviderDetailsProps {
  withThemeName?: boolean;
  withColorMode?: boolean;
  withHighContrastMode?: boolean;
}

export const ProviderDetails = ({
  withThemeName = true,
  withColorMode = true,
  withHighContrastMode = true,
}: ProviderDetailsProps) => {
  const { euiTheme, colorMode, highContrastMode } = useEuiTheme();
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
        {withThemeName && (
          <EuiFlexItem>
            <EuiText size="s">
              <strong>{euiTheme.themeName}</strong>
            </EuiText>
          </EuiFlexItem>
        )}
        {withColorMode && (
          <EuiFlexItem grow={false}>
            <EuiText size="s">
              <EuiCode transparentBackground>colorMode:</EuiCode>
              <code>{colorMode}</code>
            </EuiText>
          </EuiFlexItem>
        )}
        {withHighContrastMode && (
          <EuiFlexItem grow={false}>
            <EuiText size="s">
              <EuiCode transparentBackground>highContrastMode:</EuiCode>
              <code>{String(highContrastMode)}</code>
            </EuiText>
          </EuiFlexItem>
        )}
      </EuiFlexGroup>
    </EuiPanel>
  );
};
