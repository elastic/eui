/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

import { EuiMarkdownEditor } from '../../../../src/components/markdown_editor';

// eslint-disable-next-line
const markdownExample = require('!!raw-loader!./markdown-example.md');

export default () => {
  const [value, setValue] = useState(markdownExample);
  return <EuiMarkdownEditor value={value} onChange={setValue} height={400} />;
};
