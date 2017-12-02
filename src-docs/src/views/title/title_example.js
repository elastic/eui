import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Title from './title';
const titleSource = require('!!raw-loader!./title');
const titleHtml = renderToHtml(Title);

export const TitleExample = {
  title: 'Title',
  sections: [{
    title: 'Title',
    source: [{
      type: GuideSectionTypes.JS,
      code: titleSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: titleHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiTitle</EuiCode> style the page, section and content
        headings we use in Kibana. They can contain any markup, but usually
        contain a heading tag of some sort. Unlike <EuiCode>EuiText</EuiCode>
        they are margin neutral and more suitable for general layout design.
      </p>
    ),
    demo: <Title />,
  }],
};
