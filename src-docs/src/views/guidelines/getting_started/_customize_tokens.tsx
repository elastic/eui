import React, { useContext } from 'react';

import { EuiCodeBlock } from '../../../../../src';

import { ThemeContext } from '../../../components/with_theme';

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
