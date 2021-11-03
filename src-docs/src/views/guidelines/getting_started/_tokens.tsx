import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  EuiCodeBlock,
  LEGACY_NAME_KEY,
  EuiSplitPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiHorizontalRule,
  EuiCode,
} from '../../../../../src';

import { GuideSectionExampleCode } from '../../../components/guide_section/guide_section_parts/guide_section_code';
import { LanguageSelector, ThemeContext } from '../../../components/with_theme';
const consumingSource = require('!!raw-loader!../../theme/consuming');

const ImportOutsideExample = () => {
  const themeContext = useContext(ThemeContext);
  let files;
  switch (themeContext.theme) {
    case `${LEGACY_NAME_KEY}_light`:
      files = `// This is the legacy theme and will be deprecated
@import '@elastic/eui/src/themes/legacy/colors_light';
@import '@elastic/eui/src/themes/legacy/globals';`;
      break;
    case `${LEGACY_NAME_KEY}_dark`:
      files = `// This is the legacy theme and will be deprecated
@import '@elastic/eui/src/themes/legacy/colors_dark';
@import '@elastic/eui/src/themes/legacy/globals';`;
      break;
    case 'dark':
      files = `@import '@elastic/eui/src/themes/amsterdam/colors_dark';
@import '@elastic/eui/src/themes/amsterdam/globals';`;
      break;
    default:
      files = `@import '@elastic/eui/src/themes/amsterdam/colors_light';
@import '@elastic/eui/src/themes/amsterdam/globals';`;
      break;
  }

  return (
    <EuiCodeBlock language="scss" fontSize="m" isCopyable>
      {`// index.scss
${files}

@import 'your/custom/styles';`}
    </EuiCodeBlock>
  );
};

export const Tokens: FunctionComponent = () => {
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
              <p>This will require style, css, postcss, and sass loaders.</p>
            </EuiText>
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner paddingSize="none">
            <ImportOutsideExample />
          </EuiSplitPanel.Inner>
        </>
      ) : (
        <>
          <EuiSplitPanel.Inner>
            <EuiText>
              <p>
                As long as you have wrapped your application with{' '}
                <Link to="/guidelines/getting-started#setting-up-your-application">
                  <strong>EuiProvider</strong>
                </Link>
                , you have access to the JS theme tokens via{' '}
                <EuiCode>useEuiTheme()</EuiCode> and Emotion&apos;s{' '}
                <EuiCode>css</EuiCode> prop.
              </p>
            </EuiText>
          </EuiSplitPanel.Inner>
          <EuiSplitPanel.Inner paddingSize="none">
            <GuideSectionExampleCode code={consumingSource} />
          </EuiSplitPanel.Inner>
        </>
      )}
    </EuiSplitPanel.Outer>
  );
};
