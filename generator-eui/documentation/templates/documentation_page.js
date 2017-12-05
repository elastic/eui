import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import <%= componentExampleName %> from './<%= fileName %>';
const <%= componentExamplePrefix %>Source = require('!!raw-loader!./<%= fileName %>');
const <%= componentExamplePrefix %>Html = renderToHtml(<%= componentExampleName %>);

export const <%= componentExampleName %>Example = {
  title: '<%= componentExampleName %>',
  sections: [{
    title: '<%= componentExampleName %>',
    source: [{
      type: GuideSectionTypes.JS,
      code: <%= componentExamplePrefix %>Source,
    }, {
      type: GuideSectionTypes.HTML,
      code: <%= componentExamplePrefix %>Html,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>Eui<%= componentExampleName %></EuiCode> component.
      </p>
    ),
    demo: <<%= componentExampleName %> />,
  }],
};
