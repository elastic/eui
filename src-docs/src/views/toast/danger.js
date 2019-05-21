import React from 'react';

import { EuiToast } from '../../../../src/components';

const esError =
  'Error: expected _scroll_id in the folling Elasticsearch response: ' +
  '{"took":0,"timed_out":false,"_shards":{"total":0,"successful":0,"skipped":0,"failed":0},' +
  '"hits":{"total":0,"max_score":0,"hits":[]}}';

export default () => (
  <EuiToast
    title="Couldn't complete the search"
    color="danger"
    iconType="alert">
    <p>{esError}</p>
  </EuiToast>
);
