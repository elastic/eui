import React from 'react';

import {
  EuiMarkdownFormat,
  EuiPageContentBody,
  EuiSpacer,
} from '../../../../src';
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
        <EuiSpacer size="xl" />
        <EuiMarkdownFormat>{changelogSource}</EuiMarkdownFormat>
      </EuiPageContentBody>
    </GuidePage>
  ),
};
