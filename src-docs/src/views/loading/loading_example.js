import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import LoadingKibana from './loading_kibana';
const loadingKibanaSource = require('!!raw-loader!./loading_kibana');
const loadingKibanaHtml = renderToHtml(LoadingKibana);

import LoadingChart from './loading_chart';
const loadingChartSource = require('!!raw-loader!./loading_chart');
const loadingChartHtml = renderToHtml(LoadingChart);

import LoadingSpinner from './loading_spinner';
const loadingSpinnerSource = require('!!raw-loader!./loading_spinner');
const loadingSpinnerHtml = renderToHtml(LoadingSpinner);

export const LoadingExample = {
  title: 'Loading',
  sections: [{
    title: 'Loading Kibana',
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
    demo: <LoadingKibana />,
  }, {
    title: 'Loading chart',
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
    demo: <LoadingChart />,
  }, {
    title: 'Loading spinner',
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
    demo: <LoadingSpinner />,
  }],
};
