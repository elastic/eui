import React from 'react';
import { Link } from 'react-router-dom';
import {
  EuiCodeBlock,
  EuiCode,
  EuiSpacer,
  EuiText,
  EuiLink,
} from '../../../../../src';

export const AppSetup = () => {
  return (
    <>
      <EuiText grow={false}>
        <p>
          EUI uses CSS-in-JS (specifically{' '}
          <EuiLink href="https://emotion.sh" target="_blank">
            Emotion
          </EuiLink>
          ) for its styles and theming. As such, we require an{' '}
          <EuiCode>{'<EuiProvider>'}</EuiCode> wrapper around your application
          in order for various theme-related UI & UX (such as dark/light mode
          switching) to work as expected.
        </p>
      </EuiText>

      <EuiSpacer />
      <EuiCodeBlock language="jsx" isCopyable fontSize="m">
        {`import React from 'react';

import { EuiProvider, EuiText } from '@elastic/eui';

const MyApp = () => (
  <EuiProvider>
    <EuiText><p>Hello World!</p></EuiText>
  </EuiProvider>
);

export default MyApp;`}
      </EuiCodeBlock>
      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          For more configuration options of the provider, see the{' '}
          <Link to="/utilities/provider">
            <strong>EuiProvider</strong> documentation
          </Link>
          .
        </p>
      </EuiText>
    </>
  );
};
