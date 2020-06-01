import React, { Fragment, useState } from 'react';

import {
  EuiHighlight,
  EuiFieldSearch,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

export function Highlight() {
  const [searchValue, setSearchValue] = useState('jumped over');
  const [isHighlightAll, setHighlightAll] = useState(false);

  const onSearchChange = e => {
    setSearchValue(e.target.value);
  };
  const changeHighlightAll = e => {
    setHighlightAll(e.target.checked);
  };

  return (
    <Fragment>
      <EuiFormRow label="Enter text to highlight substrings within a string">
        <EuiFieldSearch
          value={searchValue}
          onChange={e => {
            onSearchChange(e);
          }}
        />
      </EuiFormRow>

      <EuiSpacer size="m" />
      <EuiSwitch
        label="Highlight all"
        checked={isHighlightAll}
        onChange={e => changeHighlightAll(e)}
      />
      <EuiSpacer size="m" />
      <EuiHighlight search={searchValue} highlightAll={isHighlightAll}>
        The quick brown fox jumped over the lazy dog
      </EuiHighlight>
    </Fragment>
  );
}
