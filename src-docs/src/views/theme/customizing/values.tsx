import React, { useContext } from 'react';

import {
  EuiSpacer,
  EuiCodeBlock,
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
  EuiHorizontalRule,
  EuiButton,
  EuiButtonEmpty,
  EuiCopy,
  useEuiTheme,
  mergeDeep,
  EuiThemeProvider,
} from '../../../../../src';

// @ts-ignore Importing from JS
import { GuidePage } from '../../../components';

import { ThemeNotice } from '../_components/_theme_notice';
import { ThemeContext } from '../../../components/with_theme';

// @ts-ignore Importing from JS
import Colors from './_colors';
// @ts-ignore Importing from JS
import Size from './_size';
// @ts-ignore Importing from JS
import Typography from './_typography';
// @ts-ignore Importing from JS
import Border from './_border';
// @ts-ignore Importing from JS
import Animation from './_animation';
// @ts-ignore Importing from JS
import Breakpoints from './_breakpoints';

import Sass, { SassAlert } from './_sass';

// @ts-ignore TODO
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
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const [jsonFlyoutIsOpen, setJsonFlyoutIsOpen] = React.useState(false);
  const [overrides, setOverrides] = React.useState({});

  const updateTheme = (newOverrides: { [key: string]: any } | undefined) => {
    setOverrides(mergeDeep(overrides, newOverrides));
  };

  const clearOverrides = () => {
    setOverrides({});
  };

  return (
    <EuiThemeProvider modify={overrides}>
      <GuidePage
        isBeta
        title="Customizing theme"
        intro={!showSass && <ThemeNotice type="support" />}
        notice={showSass ? <SassAlert /> : <ThemeNotice />}
        showThemeLanguageToggle
      >
        {showSass ? (
          <Sass />
        ) : (
          <>
            <Colors onThemeUpdate={updateTheme} />

            <EuiHorizontalRule margin="xxl" />

            <Size onThemeUpdate={updateTheme} />

            <EuiHorizontalRule margin="xxl" />

            <Typography onThemeUpdate={updateTheme} />

            <EuiHorizontalRule margin="xxl" />

            <Border onThemeUpdate={updateTheme} />

            <EuiHorizontalRule margin="xxl" />

            <Breakpoints onThemeUpdate={updateTheme} />

            <EuiHorizontalRule margin="xxl" />

            <Animation onThemeUpdate={updateTheme} />

            <EuiSpacer />
          </>
        )}
      </GuidePage>

      {!showSass && (
        <>
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
        </>
      )}
    </EuiThemeProvider>
  );
};
