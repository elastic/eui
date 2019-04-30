import React from 'react';
import tokens from '../../i18ntokens';
import tokenChangelog from '../../i18ntokens_changelog';

import {
  EuiAccordion,
  EuiCodeBlock,
  EuiInMemoryTable,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const columns = [
  {
    name: 'Token',
    render({ filepath, loc, token }) {
      return (
        <div>
          <p>
            <strong>{token}</strong>
          </p>
          <EuiLink
            target="_blank"
            color="subdued"
            href={`https://github.com/elastic/eui/blob/master/${filepath}#L${
              loc.start.line
            }`}>
            {filepath}:{loc.start.line}:{loc.start.column}
          </EuiLink>
        </div>
      );
    },
  },
  {
    name: 'Default',
    render({ defString, highlighting }) {
      return (
        <EuiCodeBlock
          language={highlighting === 'code' ? 'javascript' : 'text'}
          paddingSize="none"
          transparentBackground
          fontSize="s">
          {defString}
        </EuiCodeBlock>
      );
    },
  },
];

const search = {
  box: {
    incremental: true,
    schema: true,
  },
};

export const I18nTokens = {
  name: 'I18n Tokens',
  component: () => (
    <GuidePage title="I18n Tokens">
      <EuiTitle size="m">
        <span>Token changelog</span>
      </EuiTitle>
      {tokenChangelog.map(({ version, changes }) => (
        <EuiAccordion
          key={version}
          id={version}
          buttonContent={<span>{version}</span>}>
          <EuiInMemoryTable
            items={changes}
            columns={[
              {
                field: 'changeType',
                name: 'Change',
                width: '100px',
                render: changeType => (
                  <EuiText color="subdued" size="xs">
                    {changeType}
                  </EuiText>
                ),
              },
              { field: 'token', name: 'Token' },
              { field: 'value', name: 'New Value' },
            ]}
          />
          <EuiSpacer size="s" />
        </EuiAccordion>
      ))}

      <EuiSpacer size="m" />

      <EuiTitle size="m">
        <span>All tokens</span>
      </EuiTitle>
      <EuiInMemoryTable
        items={tokens}
        columns={columns}
        search={search}
        pagination={{ initialPageSize: 50 }}
      />
    </GuidePage>
  ),
};
