import React from 'react';

import { EuiMarkdownFormat, EuiPageContentBody } from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const changelogSource = require('!!raw-loader!../../../../CHANGELOG.md').default.replace(
  /## \[`main`\].+?##(?= \[`\d)/s, // remove the `main` heading & contents
  '##'
);

export const Changelog = {
  name: 'Changelog',
  component: () => (
    <GuidePage title="Changelog">
      <EuiPageContentBody restrictWidth>
        <EuiMarkdownFormat>{changelogSource}</EuiMarkdownFormat>
      </EuiPageContentBody>
    </GuidePage>
  ),
};
