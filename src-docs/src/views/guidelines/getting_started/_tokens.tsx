import React, { FunctionComponent, useContext } from 'react';

import {
  EuiCodeBlock,
  // useEuiTheme,
  // isLegacyTheme,
  LEGACY_NAME_KEY,
  EuiSplitPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '../../../../../src';

import { LanguageSelector, ThemeContext } from '../../../components/with_theme';

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

type Tokens = {};

export const Tokens: FunctionComponent<Tokens> = ({}) => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  // const {
  //   euiTheme: { themeName },
  // } = useEuiTheme();
  // const legacyTheme = isLegacyTheme(themeName);

  return (
    <EuiSplitPanel.Outer hasBorder>
      <EuiSplitPanel.Inner>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiText color="subdued" size="s">
              <p>
                <em>
                  Keep an eye out for this language selector that will allow you
                  to view the syntax for either the Sass and CSS-in-JS (Emotion)
                  theming mechanisms.
                </em>
              </p>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <LanguageSelector />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiSplitPanel.Inner>
      <EuiSplitPanel.Inner paddingSize="none">
        {showSass ? <ImportOutsideExample /> : 'JS!'}
      </EuiSplitPanel.Inner>
    </EuiSplitPanel.Outer>
  );
};
