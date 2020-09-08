import React from 'react';

import { EuiMarkdownFormat } from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const changelogSource = require('!!raw-loader!../../../../CHANGELOG.md');

export const Changelog = {
  name: 'Changelog',
  component: () => (
    <GuidePage title="Changelog">
      <EuiMarkdownFormat>{changelogSource}</EuiMarkdownFormat>
    </GuidePage>
  ),
};
