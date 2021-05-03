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

import {
  EuiSpacer,
  EuiCodeBlock,
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { EuiButton } from '../../../../src/components/button';
import { EuiCopy } from '../../../../src/components/copy';

export default () => {
  const [overrides, setOverrides] = React.useState({});
  const { euiTheme } = useEuiTheme();

  const updateTheme = (newOverrides) => {
    setOverrides(mergeDeep(overrides, newOverrides));
  };

  return (
    <EuiThemeProvider modify={overrides}>
      <Colors onThemeUpdate={(overrides) => updateTheme(overrides)} />

      <EuiHorizontalRule margin="xxl" />

      <Size onThemeUpdate={(overrides) => updateTheme(overrides)} />

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

      {Object.keys(overrides).length && (
        <EuiBottomBar position="sticky">
          <EuiFlexGroup justifyContent="flexEnd">
            <EuiFlexItem grow={false}>
              <EuiCopy textToCopy={JSON.stringify(overrides, null, 2)}>
                {(copy) => (
                  <EuiButton onClick={copy} fill iconType="copyClipboard">
                    Copy overrides
                  </EuiButton>
                )}
              </EuiCopy>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      )}

      <EuiCodeBlock>{JSON.stringify(euiTheme, null, 2)}</EuiCodeBlock>
    </EuiThemeProvider>
  );
};
