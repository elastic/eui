import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiText,
  EuiLoadingLogo,
  EuiLoadingElastic,
  EuiLoadingSpinner,
  EuiLoadingChart,
  EuiLoadingContent,
} from '../../../../src/components';
import {
  loadingElasticConfig,
  loadingChartConfig,
  loadingLogoConfig,
  loadingSpinnerConfig,
  loadingContentConfig,
} from './playground';

import LoadingLogo from './loading_kibana';
const loadingLogoSource = require('!!raw-loader!./loading_kibana');

import LoadingElastic from './loading_elastic';
const loadingElasticSource = require('!!raw-loader!./loading_elastic');

import LoadingChart from './loading_chart';
const loadingChartSource = require('!!raw-loader!./loading_chart');

import LoadingSpinner from './loading_spinner';
const loadingSpinnerSource = require('!!raw-loader!./loading_spinner');

import LoadingContent from './loading_content';
const loadingContentSource = require('!!raw-loader!./loading_content');

export const LoadingExample = {
  title: 'Loading',
  intro: (
    <EuiText>
      <p>
        Use loading indicators sparingly and opt for showing actual{' '}
        <Link to="/display/progress#progress-with-values">progress</Link> over
        infinite spinners. It is ok to use multiple loaders on a page if each
        section is progressively loaded. However, if the entire page is loaded
        at once, use a single, larger loading indicator.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Elastic',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingElasticSource,
        },
      ],
      text: (
        <p>
          The <strong>EuiLoadingElastic</strong> loader is great for full page
          or Elastic product loading screens.
        </p>
      ),
      props: { EuiLoadingElastic },
      demo: <LoadingElastic />,
      snippet: '<EuiLoadingElastic size="m" />',
      playground: loadingElasticConfig,
    },
    {
      title: 'Logos',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingLogoSource,
        },
      ],
      text: (
        <p>
          <strong>EuiLoadingLogo</strong> accepts any of our{' '}
          <Link to="/display/icons#elastic-logos">
            <strong>EuiIcon</strong>
          </Link>{' '}
          logos. It should only be used in very large panels, like full screen
          pages.
        </p>
      ),
      props: { EuiLoadingLogo },
      demo: <LoadingLogo />,
      snippet: '<EuiLoadingLogo size="m" />',
      playground: loadingLogoConfig,
    },
    {
      title: 'Chart',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingChartSource,
        },
      ],
      text: (
        <p>
          To indicate that a visualization is loading, use{' '}
          <strong>EuiLoadingChart</strong>. The multi-color version should be
          used sparingly, and only when a single large visualization is being
          loaded.
        </p>
      ),
      props: { EuiLoadingChart },
      demo: <LoadingChart />,
      snippet: '<EuiLoadingChart size="m" />',
      playground: loadingChartConfig,
    },
    {
      title: 'Spinner',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingSpinnerSource,
        },
      ],
      text: (
        <p>
          <strong>EuiLoadingSpinner</strong> is a simple spinner for most
          loading contexts.
        </p>
      ),
      props: { EuiLoadingSpinner },
      demo: <LoadingSpinner />,
      snippet: '<EuiLoadingSpinner size="m" />',
      playground: loadingSpinnerConfig,
    },
    {
      title: 'Text content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: loadingContentSource,
        },
      ],
      text: (
        <p>
          <strong>EuiLoadingContent</strong> is a simple loading animation for
          displaying placeholder text content. You can pass in a number of{' '}
          <EuiCode>lines</EuiCode> between 1 and 10.
        </p>
      ),
      props: { EuiLoadingContent },
      demo: <LoadingContent />,
      snippet: '<EuiLoadingContent lines={3} />',
      playground: loadingContentConfig,
    },
  ],
};
