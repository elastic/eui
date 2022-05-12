import React from 'react';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiText,
  <%= componentName %>,
} from '../../../../src';

import <%= componentExampleName %> from './<%= fileName %>';
const <%= componentExamplePrefix %>Source = require('!!raw-loader!./<%= fileName %>');

export const <%= componentExampleName %>Example = {
  title: '<%= componentExampleName %>',
  intro: (
    <><EuiText></EuiText></>
  ),
  sections: [{
    title: '<%= componentExampleName %>',
    text: (
      <>
        <p>
          Description needed: how to use the <strong>Eui<%= componentExampleName %></strong> component.
        </p>
      </>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: <%= componentExamplePrefix %>Source,
    }],
    demo: <<%= componentExampleName %> />,
    props: { <%= componentName %> },
  }],
};
