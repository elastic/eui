import React from 'react';

import { EuiMarkdownFormat } from '../../../../src';
import { GuideSection } from '../../components';
import { GuidePage } from '../../components/guide_page';

const changelogSource = require('!!raw-loader!../../../../CHANGELOG.md').default.replace(
  /## \[`main`\].+?##(?= \[`\d)/s, // remove the `main` heading & contents
  '##'
);

export const Changelog = {
  name: 'Changelog',
  component: () => (
    <GuidePage title="Changelog">
      <GuideSection>
        <EuiMarkdownFormat>{changelogSource}</EuiMarkdownFormat>
      </GuideSection>
    </GuidePage>
  ),
};
