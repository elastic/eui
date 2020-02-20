import React, { useState } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Options } from './data';

export default () => {
  const [options, setOptions] = useState(Options);

  return (
    <EuiSelectable
      allowExclusions
      options={options}
      onChange={newOptions => setOptions(newOptions)}>
      {list => list}
    </EuiSelectable>
  );
};
