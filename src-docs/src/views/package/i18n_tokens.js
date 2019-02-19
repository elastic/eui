import React from 'react';
import tokens from '../../i18ntokens';

import { EuiCodeBlock, EuiInMemoryTable, EuiLink } from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const columns = [
  {
    name: 'Token',
    render({ filepath, loc, token }) {
      return (
        <div>
          <p><strong>{token}</strong></p>
          <EuiLink target="_blank" color="subdued" href={`https://github.com/elastic/eui/blob/master/${filepath}#L${loc.start.line}`}>
            {filepath}:{loc.start.line}:{loc.start.column}
          </EuiLink>
        </div>
      );
    }
  },
  {
    name: 'Default',
    render({ defString, highlighting }) {
      return (
        <EuiCodeBlock
          language={highlighting === 'code' ? 'javascript' : 'text'}
          paddingSize="none"
          transparentBackground
          fontSize="s"
        >
          {defString}
        </EuiCodeBlock>
      );
    }
  },
];

const search = {
  box: {
    incremental: true,
    schema: true
  }
};

export const I18nTokens = {
  name: 'I18n Tokens',
  component: () => (
    <GuidePage title="I18n Tokens">
      <EuiInMemoryTable
        items={tokens}
        columns={columns}
        search={search}
        pagination={{ initialPageSize: 50 }}
      />
    </GuidePage>
  ),
};
