import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  EuiCodeBlock,
  EuiSplitPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiHorizontalRule,
  EuiCode,
} from '../../../../../src';

import { GuideSectionExampleCode } from '../../../components/guide_section/guide_section_parts/guide_section_code';
import { LanguageSelector, ThemeContext } from '../../../components/with_theme';
const overrideSimpleSource = require('!!raw-loader!../../theme/override_simple');

export const CustomizeTokens = () => {
  const themeContext = useContext(ThemeContext);
  let files;
  switch (themeContext.theme) {
    case 'dark':
      files = "@import '@elastic/eui/src/themes/amsterdam/theme_dark';";
      break;
    default:
      files = "@import '@elastic/eui/src/themes/amsterdam/theme_light';";
      break;
  }

  return (
    <EuiCodeBlock language="scss" fontSize="m" isCopyable>
      {`// mytheme.scss
$euiColorPrimary: #7B61FF;

// The following rebuilds the entire EUI component styles
${files}

@import 'your/custom/styles';`}
    </EuiCodeBlock>
  );
};

export const Customizing: FunctionComponent = () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  return (
    <EuiSplitPanel.Outer hasBorder>
      <EuiSplitPanel.Inner>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiText color="subdued" size="s">
              <p>
                <em>
                  Keep an eye out for this language selector that will allow you
                  to view the syntax for either the Sass or CSS-in-JS (Emotion)
                  theming mechanisms.
                </em>
              </p>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <LanguageSelector showTour={false} />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiSplitPanel.Inner>
      <EuiHorizontalRule margin="none" />
      {showSass ? (
        <>
          <EuiSplitPanel.Inner>
            <EuiText>
              <p>
                This will require style, css, postcss, and sass loaders and a
                full re-compile of all EUI component styles.
              </p>
            </EuiText>
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner paddingSize="none">
            <CustomizeTokens />
          </EuiSplitPanel.Inner>
        </>
      ) : (
        <>
          <EuiSplitPanel.Inner>
            <EuiText>
              <p>
                You can pass along a full or partial list of global{' '}
                <EuiCode>overrides</EuiCode> to the{' '}
                <Link to="/guidelines/getting-started#setting-up-your-application">
                  <strong>EuiProvider</strong>
                </Link>{' '}
                which will update the EUI components that are currently using
                the Emotion method of theming.
              </p>
            </EuiText>
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner paddingSize="none">
            <GuideSectionExampleCode code={overrideSimpleSource} />
          </EuiSplitPanel.Inner>
        </>
      )}
    </EuiSplitPanel.Outer>
  );
};
