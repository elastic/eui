import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiLoadingKibana,
  EuiLoadingSpinner,
  EuiLoadingChart,
  EuiLoadingContent,
} from '../../../../src/components';

import LoadingKibana from './loading_kibana';
const loadingKibanaSource = require('!!raw-loader!./loading_kibana');
const loadingKibanaHtml = renderToHtml(LoadingKibana);

import LoadingChart from './loading_chart';
const loadingChartSource = require('!!raw-loader!./loading_chart');
const loadingChartHtml = renderToHtml(LoadingChart);

import LoadingSpinner from './loading_spinner';
const loadingSpinnerSource = require('!!raw-loader!./loading_spinner');
const loadingSpinnerHtml = renderToHtml(LoadingSpinner);

import LoadingContent from './loading_content';
const loadingContentSource = require('!!raw-loader!./loading_content');
const loadingContentHtml = renderToHtml(LoadingContent);

export const LoadingExample = {
  title: 'Loading',
  sections: [{
    title: 'Kibana',
    source: [{
      type: GuideSectionTypes.JS,
      code: loadingKibanaSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: loadingKibanaHtml,
    }],
    text: (
      <p>
        Logo based load. Should only be used in very large panels, like bootup screens.
      </p>
    ),
    props: { EuiLoadingKibana },
    demo: <LoadingKibana />,
    snippet: `<EuiLoadingKibana size="m" />`
  }, {
    title: 'Chart',
    source: [{
      type: GuideSectionTypes.JS,
      code: loadingChartSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: loadingChartHtml,
    }],
    text: (
      <p>
        Loader for the loading of chart or dashboard and visualization elements.
        The colored versions should be used sparingly, only when a single large
        visualization is loaded. When loading smaller groups of panels, the smaller,
        mono versions should be used.
      </p>
    ),
    props: { EuiLoadingChart },
    demo: <LoadingChart />,
    snippet: `<EuiLoadingChart size="m" />`
  }, {
    title: 'Spinner',
    source: [{
      type: GuideSectionTypes.JS,
      code: loadingSpinnerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: loadingSpinnerHtml,
    }],
    text: (
      <p>
        A simple spinner for most loading applications.
      </p>
    ),
    props: { EuiLoadingSpinner },
    demo: <LoadingSpinner />,
    snippet: `<EuiLoadingSpinner size="m" />`
  }, {
    title: 'Text Content',
    source: [{
      type: GuideSectionTypes.JS,
      code: loadingContentSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: loadingContentHtml,
    }],
    text: (
      <p>
        A simple loading animation for displaying placeholder text content.
        You can pass in a number of <EuiCode>lines</EuiCode> between 1 and 10.
      </p>
    ),
    props: { EuiLoadingContent },
    demo: <LoadingContent />,
    snippet: `<EuiLoadingContent lines={3} />`
  }],
};
