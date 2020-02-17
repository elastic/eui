/* eslint-disable prettier/prettier */
import React from 'react';

import { EuiMarkdownEditor } from '../../../../src/components/markdown_editor';

// eslint-disable-next-line
const markdownExample = require('!!raw-loader!./markdown-example.md');

export default () => (
  <EuiMarkdownEditor initialValue={markdownExample} height={400} />
);
