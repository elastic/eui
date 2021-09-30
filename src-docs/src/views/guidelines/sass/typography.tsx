import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../components/with_theme';

import { EuiText, EuiCodeBlock, EuiLink } from '../../../../../src';

const ImportFontFamily = () => {
  const themeContext = useContext(ThemeContext);
  let importString;
  switch (themeContext.theme) {
    case 'light':
    case 'dark':
      importString = `@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,700,700i');
@import url('https://rsms.me/inter/inter-ui.css');`;
      break;
    default:
      importString =
        "@import url('https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10,300..700;0,300..700&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap');";
  }

  return (
    <EuiCodeBlock language="scss" paddingSize="m" fontSize="m" isCopyable>
      {importString}
    </EuiCodeBlock>
  );
};

const VariableLink = () => {
  const themeContext = useContext(ThemeContext);
  let url;
  switch (themeContext.theme) {
    case 'light':
    case 'dark':
      url =
        'https://github.com/elastic/eui/blob/master/src/global_styling/variables/_typography.scss';
      break;
    default:
      url =
        'https://github.com/elastic/eui/blob/master/src/themes/eui-amsterdam/global_styling/variables/_typography.scss';
  }

  return <EuiLink href={url}>variables</EuiLink>;
};

const MixinLink = () => {
  const themeContext = useContext(ThemeContext);
  let url;
  switch (themeContext.theme) {
    case 'light':
    case 'dark':
      url =
        'https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_typography.scss';
      break;
    default:
      url =
        'https://github.com/elastic/eui/blob/master/src/themes/eui-amsterdam/global_styling/mixins/_typography.scss';
  }

  return <EuiLink href={url}>mixins</EuiLink>;
};

export const Typography = ({}) => {
  const [] = useState(400);

  return (
    <>
      <EuiText>
        <p>
          EUI uses Inter as it&apos;s main font-family and Roboto for monospace.
          You&apos;ll need to import these from your desired location. Our
          recommendations are:
        </p>

        <ImportFontFamily />

        <p>
          View the <VariableLink /> and <MixinLink /> Sass code for typography.
        </p>
      </EuiText>
    </>
  );
};
