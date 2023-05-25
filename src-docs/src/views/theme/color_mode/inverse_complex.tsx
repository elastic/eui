import React, { FunctionComponent, ReactNode, useState } from 'react';
import {
  EuiIcon,
  EuiSpacer,
  EuiText,
  EuiThemeProvider,
  useEuiTheme,
  EuiButtonGroup,
  EuiThemeColorMode,
} from '../../../../../src';

const Box: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiText
      css={{
        background: euiTheme.colors.lightShade,
        padding: euiTheme.size.xl,
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

  const [boxColorModeSelected, setBoxColorMode] =
    useState<EuiThemeColorMode>('light');

  const onChange = (colorMode: EuiThemeColorMode) => {
    setBoxColorMode(colorMode);
  };

  return (
    <>
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
    </>
  );
};
