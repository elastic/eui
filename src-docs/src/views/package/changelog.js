import React from 'react';

import { EuiMarkdownFormat } from '../../../../src';
import { GuideSection } from '../../components';
import { GuideTabbedPage } from '../../components/guide_tabbed_page';

const changelogSource = require('!!raw-loader!../../../../CHANGELOG.md').default.replace(
  /## \[`main`\].+?##(?= \[`\d)/s, // remove the `main` heading & contents
  '##'
);

export const Changelog = {
  name: 'Changelog',
  component: () => (
    <GuideTabbedPage title="Changelog">
      <GuideSection>
        <EuiMarkdownFormat>{changelogSource}</EuiMarkdownFormat>
      </GuideSection>
    </GuideTabbedPage>
  ),
};
