import React from 'react';
import { EuiSpacer, EuiText } from '../../../../../src';

import { CustomizeTokens } from '../../guidelines/getting_started/_customizing';

export default () => {
  return (
    <>
      <EuiText>
        <p>
          EUI&apos;s Sass themes are token based, which can be altered to suit
          your theming needs like changing the primary color. Simply declare
          your token overrides before importing the whole EUI theme.
        </p>
        <p>
          You no longer need to import the compiled CSS or Sass globals
          seperately when using this import method; but{' '}
          <strong>it will re-compile all of the EUI components</strong>.
        </p>
      </EuiText>

      <EuiSpacer />
      <CustomizeTokens />
    </>
  );
};
