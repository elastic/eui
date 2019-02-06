import React, { Fragment } from 'react';
import tokens from '../../i18ntokens';

import { EuiCodeBlock, EuiInMemoryTable } from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const columns = [
  { name: 'Token', field: 'token' },
  {
    name: 'Default',
    render({ defString, highlighting }) {
      return (
        <EuiCodeBlock language={highlighting === 'code' ? 'javascript' : 'text'}>{defString}</EuiCodeBlock>
      );
    }
  },
  {
    name: 'File',
    render({ filepath, loc }) {
      return (
        <Fragment>
          {filepath}:{loc.start.line}:{loc.start.column}
        </Fragment>
      );
    },
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
        compressed={true}
        pagination={true}
      />
    </GuidePage>
  ),
};
