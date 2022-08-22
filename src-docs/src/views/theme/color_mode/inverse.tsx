import React, { FunctionComponent, ReactNode, useState } from 'react';
import {
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiThemeProvider,
  useEuiTheme,
  EuiButtonGroup,
  EuiPanel,
  EuiThemeColorMode,
} from '../../../../../src';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiText
      css={{
        background: euiTheme.colors.lightShade,
        padding: euiTheme.size.xl,
        color: euiTheme.colors.text,
      }}
    >
      <p>{children}</p>
    </EuiText>
  );
};

export default () => {
  const boxColorButtons = [
    {
      id: 'light',
      label: 'Light',
    },
    {
      id: 'dark',
      label: 'Dark',
    },
    {
      id: 'inverse',
      label: 'Inverse',
    },
  ];

  const [boxColorModeSelected, setBoxColorMode] = useState<EuiThemeColorMode>(
    'light'
  );

  const onChange = (colorMode: EuiThemeColorMode) => {
    setBoxColorMode(colorMode);
  };

  return (
    <div>
      <EuiThemeProvider colorMode="light">
        <EuiPanel>
          <EuiText color="default">
            <p>
              <EuiIcon type="faceHappy" /> The colors of this panel will always
              be in <strong>light</strong> mode
            </p>
          </EuiText>
        </EuiPanel>
      </EuiThemeProvider>
      <EuiSpacer />
      <EuiThemeProvider colorMode="dark">
        <EuiPanel>
          <EuiText color="default">
            <p>
              <EuiIcon type="faceHappy" /> The colors of this panel will always
              be in <strong>dark</strong> mode
            </p>
          </EuiText>
        </EuiPanel>
      </EuiThemeProvider>
      <EuiSpacer />
      <EuiThemeProvider colorMode="inverse">
        <EuiPanel>
          <EuiText color="default">
            <p>
              <EuiIcon type="faceHappy" /> The colors of this panel are the
              opposite (<strong>inverse</strong>) of the current color mode
            </p>
          </EuiText>
        </EuiPanel>
      </EuiThemeProvider>

      <EuiSpacer />

      <EuiPanel hasShadow={false} color="subdued">
        <EuiButtonGroup
          legend="Change color mode"
          options={boxColorButtons}
          idSelected={boxColorModeSelected}
          onChange={(id) => onChange(id as EuiThemeColorMode)}
        />

        <EuiSpacer />

        <EuiThemeProvider colorMode={boxColorModeSelected}>
          <Box>
            <EuiIcon type="faceHappy" /> The colors of this box is in{' '}
            <strong>{boxColorModeSelected}</strong> color mode
          </Box>
        </EuiThemeProvider>
      </EuiPanel>
    </div>
  );
};
