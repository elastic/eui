import React, { useState, Fragment } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Options } from './data';

export default () => {
  const [options, setOptions] = useState(Options);
  const [search, setSearch] = useState('t');

  return (
    <Fragment>
      <EuiSelectable
        aria-label="Searchable example"
        searchable
        searchProps={{
          'data-test-subj': 'selectableSearchHere',
          value: search,
          onChange: (search) => {
            console.log(search);
            setSearch(search);
          },
        }}
        options={options}
        onChange={(newOptions) => setOptions(newOptions)}
      >
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
