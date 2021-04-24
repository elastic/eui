import React from 'react';

import {
  useEuiTheme,
  mergeDeep,
  EuiThemeProvider,
} from '../../../../src/services';

import Colors from './_colors';
import Size from './_size';
import Typography from './_typography';
import Border from './_border';
import Shadow from './_shadow';
import Focus from './_focus';
import Animation from './_animation';
import Breakpoints from './_breakpoints';

import { EuiSpacer, EuiCodeBlock } from '../../../../src/components';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';

export default () => {
  const [overrides, setOverrides] = React.useState({});
  const { euiTheme } = useEuiTheme();

  const lightColors = (newOverrides) => {
    setOverrides(mergeDeep(overrides, newOverrides));
  };

  return (
    <EuiThemeProvider modify={overrides}>
      <Colors onThemeUpdate={(overrides) => lightColors(overrides)} />

      <EuiHorizontalRule margin="xxl" />

      <Size />

      <EuiHorizontalRule margin="xxl" />

      <Typography />

      <EuiHorizontalRule margin="xxl" />

      <Border />

      <EuiHorizontalRule margin="xxl" />

      <Shadow />

      <EuiHorizontalRule margin="xxl" />

      <Focus />

      <EuiHorizontalRule margin="xxl" />

      <Animation />

      <EuiHorizontalRule margin="xxl" />

      <Breakpoints />

      <EuiHorizontalRule margin="xxl" />

      <EuiSpacer />

      <EuiCodeBlock>{JSON.stringify(euiTheme, null, 2)}</EuiCodeBlock>
    </EuiThemeProvider>
  );
};
