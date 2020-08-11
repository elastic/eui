import React from 'react';

import { EuiCodeEditor } from '../../../../src/components';

import 'brace/mode/less';
import 'brace/theme/github';

export default () => {
  const value = '<p>This code is read only</p>';

  return (
    <EuiCodeEditor
      mode="less"
      theme="github"
      width="100%"
      value={value}
      setOptions={{ fontSize: '14px' }}
      isReadOnly
      aria-label="Read only code editor"
    />
  );
};
