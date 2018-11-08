import React from 'react';

import MarkdownIt from 'markdown-it';

import { EuiText } from '../../../../src';
import { GuidePage } from '../../components/guide_page';

const changelogSource = require('!!raw-loader!../../../../CHANGELOG.md');
const md = new MarkdownIt();
const changelog = md.render(changelogSource);

export const Changelog = {
  name: 'Changelog',
  component: () => (
    <GuidePage title="Changelog">
      <EuiText dangerouslySetInnerHTML={{ __html: changelog }} />
    </GuidePage>
  ),
};
