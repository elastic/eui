import React from 'react';
import tokens from '../../i18ntokens';

import { EuiCodeBlock } from '../../../../src';
import { GuidePage } from '../../components/guide_page';

export const I18nTokens = {
  name: 'I18n Tokens',
  component: () => (
    <GuidePage title="I18n Tokens">
      <EuiCodeBlock language="json">{JSON.stringify(tokens, null, 2)}</EuiCodeBlock>
    </GuidePage>
  ),
};
