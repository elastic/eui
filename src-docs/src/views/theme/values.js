import React, { useCallback } from 'react';

import {
  useEuiTheme,
  mergeDeep,
  EuiThemeProvider,
} from '../../../../src/services';

import { GuidePage } from '../../components';

import Colors from './_colors';
import Size from './_size';
import Typography from './_typography';
import Border from './_border';
// import Focus from './_focus';
import Animation from './_animation';
import Breakpoints from './_breakpoints';

import {
  EuiSpacer,
  EuiCodeBlock,
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCode,
} from '../../../../src/components';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { EuiButton } from '../../../../src/components/button';
import { EuiCopy } from '../../../../src/components/copy';
import { EuiCallOut } from '../../../../src/components/call_out';

export default () => {
  const [overrides, setOverrides] = React.useState({});
  const { euiTheme } = useEuiTheme();

  const updateTheme = useCallback(
    (newOverrides) => {
      setOverrides(mergeDeep(overrides, newOverrides));
    },
    [overrides]
  );

  return (
    <EuiThemeProvider modify={overrides}>
      <GuidePage title="Global values">
        <EuiCallOut color="warning">
          <p>
            The <EuiCode>euiTheme()</EuiCode> hook is only available for
            consuming the values. Modifying or overriding the values will not
            have any effect on the individual EUI components, yet. Instead, you
            still need to use the Sass method.
          </p>
        </EuiCallOut>

        <EuiSpacer />

        <Colors onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Size onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Typography onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Border onThemeUpdate={updateTheme} />

        {/* <EuiHorizontalRule margin="xxl" />

        <Focus onThemeUpdate={updateTheme} /> */}

        <EuiHorizontalRule margin="xxl" />

        <Animation onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Breakpoints />

        <EuiHorizontalRule margin="xxl" />

        <EuiSpacer />

        {Object.keys(overrides).length > 0 && (
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
      </GuidePage>
    </EuiThemeProvider>
  );
};
