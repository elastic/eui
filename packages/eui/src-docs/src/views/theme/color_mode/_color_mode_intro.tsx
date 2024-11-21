import React from 'react';
import {
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPanel,
  EuiText,
  useEuiTheme,
} from '../../../../../src';

export default () => {
  const { euiTheme, colorMode } = useEuiTheme();

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={2}>
        <EuiText>
          <p>
            The <EuiCode>colorMode</EuiCode> determines which values to return
            based on <EuiCode>LIGHT</EuiCode> or <EuiCode>DARK</EuiCode> mode.
          </p>
          <p>
            By default, if this prop is not passed, <strong>EuiProvider</strong>{' '}
            will detect and use the user's system dark mode preference. If the
            prop <em>is</em> passed, it will override the user's system
            settings.
          </p>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
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
                <EuiCode transparentBackground>colorMode</EuiCode>
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
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
