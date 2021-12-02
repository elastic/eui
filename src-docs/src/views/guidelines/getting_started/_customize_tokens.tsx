import React, { useContext } from 'react';

import { EuiCodeBlock, LEGACY_NAME_KEY } from '../../../../../src';

import { ThemeContext } from '../../../components/with_theme';

export const CustomizeTokens = () => {
  const themeContext = useContext(ThemeContext);
  let files;
  switch (themeContext.theme) {
    case `${LEGACY_NAME_KEY}_light`:
      files = `// This is the legacy theme and will be deprecated
@import '@elastic/eui/src/themes/legacy/theme_light';`;
      break;
    case `${LEGACY_NAME_KEY}_dark`:
      files = `// This is the legacy theme and will be deprecated
@import '@elastic/eui/src/themes/legacy/theme_dark';`;
      break;
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
