import React, { useCallback, useState } from 'react';

import { EuiSelectable, EuiSelectableOption } from '../../../../src';
import { EuiSelectableOptionMatcher } from '../../../../src/components/selectable/selectable';

export default () => {
  const [options, setOptions] = useState<EuiSelectableOption[]>([
    {
      label: 'Titan',
      'data-test-subj': 'titanOption',
    },
    {
      label: 'Enceladus is disabled',
      disabled: true,
    },
    {
      label: 'Mimas',
      checked: 'on',
    },
    {
      label: 'Dione',
    },
    {
      label: 'Iapetus',
      checked: 'on',
    },
    {
      label: 'Phoebe',
    },
    {
      label: 'Rhea',
    },
    {
      label:
        "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    },
    {
      label: 'Tethys',
    },
    {
      label: 'Hyperion',
    },
  ]);

  const startsWithMatcher = useCallback<EuiSelectableOptionMatcher<unknown>>(
    ({ option, searchValue }) => {
      return option.label.startsWith(searchValue);
    },
    []
  );

  return (
    <EuiSelectable
      aria-label="Searchable example"
      searchable
      searchProps={{
        'data-test-subj': 'selectableSearchHere',
      }}
      options={options}
      onChange={(newOptions) => setOptions(newOptions)}
      optionMatcher={startsWithMatcher}
    >
      {(list, search) => (
        <>
          {search}
          {list}
        </>
      )}
    </EuiSelectable>
  );
};
