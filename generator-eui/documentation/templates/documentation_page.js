import React from 'react';

import {
  GuideSectionTypes,
} from '../../components';

import {
  <%= componentName %>,
} from '../../../../src';

import <%= componentExampleName %> from './<%= fileName %>';
const <%= componentExamplePrefix %>Source = require('!!raw-loader!./<%= fileName %>');

export const <%= componentExampleName %>Example = {
  title: '<%= componentExampleName %>',
  sections: [{
    title: '<%= componentExampleName %>',
    source: [{
      type: GuideSectionTypes.JS,
      code: <%= componentExamplePrefix %>Source,
    }],
    text: (
      <>
        <p>
          Description needed: how to use the <strong>Eui<%= componentExampleName %></strong> component.
        </p>
      </>
    ),
    demo: <<%= componentExampleName %> />,
    props: { <%= componentName %> },
  }],
};
