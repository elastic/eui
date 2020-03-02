import React, { useState, Fragment } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Options } from './data';

export default () => {
  const [options, setOptions] = useState(Options);

  return (
    <Fragment>
      <EuiSelectable
        searchable
        searchProps={{
          'data-test-subj': 'selectableSearchHere',
        }}
        options={options}
        onChange={newOptions => setOptions(newOptions)}>
        {(list, search) => (
          <Fragment>
            {search}
            {list}
          </Fragment>
        )}
      </EuiSelectable>
    </Fragment>
  );
};
