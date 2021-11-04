import React from 'react';

import { EuiMarkdownFormat } from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const changelogSource = require('!!raw-loader!../../../../CHANGELOG.md').default.replace(
  /## \[`main`\].+?##/s, // remove the `main` heading & contents
  '##'
);

export const Changelog = {
  name: 'Changelog',
  component: () => (
    <GuidePage title="Changelog">
      <EuiMarkdownFormat>{changelogSource}</EuiMarkdownFormat>
    </GuidePage>
  ),
};
