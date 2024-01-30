import React, { useState, useMemo } from 'react';

import {
  EuiHighlight,
  EuiFieldSearch,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiFlexGroup,
} from '../../../../src/components';

export default () => {
  const [searchInput, setSearchInput] = useState('jumped over');
  const [isHighlightAll, setHighlightAll] = useState(false);
  const [searchMultiple, setSearchMultiple] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const searchValues = useMemo(() => {
    return searchMultiple && isHighlightAll
      ? searchInput.split(' ')
      : searchInput;
  }, [searchMultiple, searchInput, isHighlightAll]);

  return (
    <>
      <EuiFlexGroup>
        <EuiSwitch
          label="Case sensitive"
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
        />
        <EuiSwitch
          label="Highlight all"
          checked={isHighlightAll}
          onChange={(e) => setHighlightAll(e.target.checked)}
        />
        {isHighlightAll && (
          <EuiSwitch
            label="Search for an array of separate words"
            checked={searchMultiple}
            onChange={(e) => setSearchMultiple(e.target.checked)}
          />
        )}
      </EuiFlexGroup>
      <EuiSpacer size="xl" />

      <EuiFormRow label="Enter text to highlight substrings within a string">
        <EuiFieldSearch
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </EuiFormRow>
      <EuiSpacer size="m" />

      <EuiHighlight
        strict={caseSensitive}
        highlightAll={isHighlightAll}
        search={searchValues}
      >
        The quick brown fox jumped over the lazy dog
      </EuiHighlight>
    </>
  );
};
