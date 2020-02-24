import React, { useState } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { Options } from './data';

export default () => {
  const [options, setOptions] = useState(Options);

  return (
    <EuiSelectable
      options={options}
      listProps={{ bordered: true }}
      onChange={newOptions => setOptions(newOptions)}>
      {list => list}
    </EuiSelectable>
  );
};
