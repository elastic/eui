import React from 'react';
import { Link } from 'react-router-dom';
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
import Animation from './_animation';
import Breakpoints from './_breakpoints';

import {
  EuiSpacer,
  EuiCodeBlock,
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCode,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
} from '../../../../src/components';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';
import { EuiButton, EuiButtonEmpty } from '../../../../src/components/button';
import { EuiCopy } from '../../../../src/components/copy';
import { EuiCallOut } from '../../../../src/components/call_out';

const JsonFlyout = ({ setIsOpen }) => {
  const { euiTheme } = useEuiTheme();
  return (
    <EuiFlyout onClose={() => setIsOpen(false)}>
      <EuiFlyoutHeader hasBorder aria-labelledby={'jsonFlyoutHeading'}>
        <EuiTitle>
          <h2 id={'jsonFlyoutHeading'}>Calculated EuiTheme JSON</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiCodeBlock language="json" isCopyable>
          {JSON.stringify(euiTheme, null, 2)}
        </EuiCodeBlock>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
};

export default () => {
  const [jsonFlyoutIsOpen, setJsonFlyoutIsOpen] = React.useState(false);
  const [overrides, setOverrides] = React.useState({});

  const updateTheme = (newOverrides) => {
    setOverrides(mergeDeep(overrides, newOverrides));
  };

  const clearOverrides = () => {
    setOverrides({});
  };

  return (
    <EuiThemeProvider modify={overrides}>
      <GuidePage
        isBeta
        title="Global values"
        intro={
          <EuiCallOut color="warning">
            <p>
              The <EuiCode>euiTheme()</EuiCode> hook is only available for
              consuming the values. Modifying or overriding the values will not
              have any effect on the individual EUI components, yet. Instead,
              you still need to use the{' '}
              <Link to="/guidelines/sass">Sass method</Link>.
            </p>
          </EuiCallOut>
        }
      >
        <Colors onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Size onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Typography onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Border onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Animation onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <Breakpoints onThemeUpdate={updateTheme} />

        <EuiHorizontalRule margin="xxl" />

        <EuiSpacer />

        <EuiBottomBar
          style={{ marginLeft: -24, marginRight: -24, marginBottom: -24 }}
          position="sticky"
        >
          <EuiFlexGroup responsive={false} justifyContent="flexEnd">
            {Object.keys(overrides).length > 0 && (
              <>
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty
                    color="ghost"
                    iconType="cross"
                    onClick={clearOverrides}
                  >
                    Clear overrides
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiCopy textToCopy={JSON.stringify(overrides, null, 2)}>
                    {(copy) => (
                      <EuiButton onClick={copy} fill iconType="copyClipboard">
                        Copy overrides
                      </EuiButton>
                    )}
                  </EuiCopy>
                </EuiFlexItem>
              </>
            )}
            <EuiFlexItem grow={false}>
              <span>
                <EuiButton
                  onClick={() => setJsonFlyoutIsOpen(true)}
                  color="ghost"
                >
                  View theme JSON
                </EuiButton>
              </span>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>

        {jsonFlyoutIsOpen && <JsonFlyout setIsOpen={setJsonFlyoutIsOpen} />}
      </GuidePage>
    </EuiThemeProvider>
  );
};
