import React from 'react';

import {
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiButtonEmpty flush="left">
      Flush left
    </EuiButtonEmpty>

    <EuiButtonEmpty flush="right">
      Flush right
    </EuiButtonEmpty>
  </div>
);
