import React, { ReactNode, ReactElement } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiLoadingLogo,
  EuiTitle,
  EuiLink,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  IconType,
} from '../../../../src/components';

import pageNotFoundLight from '../../images/empty-prompt/404_rainy_cloud_light.png';
import pageNotFoundDark from '../../images/empty-prompt/404_rainy_cloud_dark.png';
import noResultsLight from '../../images/empty-prompt/no-results--light.svg';
import noResultsDark from '../../images/empty-prompt/no-results--dark.svg';
import illustration from '../../images/empty-prompt/illustration.svg';

export type examplesType = {
  iconLoading?: ReactNode;
  iconLight?: string;
  iconDark?: string;
  iconType?: IconType;
  iconTypeApp?: IconType;
  title: ReactElement;
  body?: ReactNode;
  actions?: ReactNode[];
  layout?: 'horizontal' | 'vertical';
  footer?: ReactNode;
};

export const examples: { [key: string]: examplesType } = {
  startAddingCases: {
    iconType: 'logoSecurity',
    iconTypeApp: 'securityAnalyticsApp',
    title: <h2>Start adding cases</h2>,
    body: <p>Add a new case or change your filter settings.</p>,
    actions: [
      <EuiButton color="primary" fill>
        Add a case
      </EuiButton>,
    ],
    footer: (
      <>
        <EuiTitle size="xxs">
          <h3>Want to learn more?</h3>
        </EuiTitle>
        <EuiLink href="#" target="_blank">
          Read the docs
        </EuiLink>
      </>
    ),
  },
  noPrivileges: {
    iconType: 'lock',
    title: <h2>Contact your administrator for access</h2>,
    body: <p>To view cases in this space, you need additional privileges.</p>,
  },
  noResults: {
    iconLight: noResultsLight,
    iconDark: noResultsDark,
    title: <h2>No results match your search criteria</h2>,
    layout: 'horizontal',
    body: (
      <EuiDescriptionList compressed>
        <EuiDescriptionListTitle>
          Expand your time range
        </EuiDescriptionListTitle>
        <EuiDescriptionListDescription>
          Try searching over a longer period of time.
        </EuiDescriptionListDescription>

        <EuiDescriptionListTitle>Adjust your query</EuiDescriptionListTitle>
        <EuiDescriptionListDescription>
          Try searching for a different combination of terms.
        </EuiDescriptionListDescription>
      </EuiDescriptionList>
    ),
  },
  unableToLoadDashboards: {
    iconType: 'alert',
    title: <h2>Unable to load your dashboards</h2>,
    body: (
      <p>
        There was a problem loading the Dashboard application. Contact your
        administrator for help.
      </p>
    ),
  },
  pageNotFound: {
    iconLight: pageNotFoundLight,
    iconDark: pageNotFoundDark,
    title: <h2>Page not found</h2>,
    body: (
      <p>
        Sorry, we can&apos;t find the page you&apos;re looking for. It might
        have been removed or renamed, or maybe it never existed.
      </p>
    ),
    actions: [
      <EuiButton color="primary" fill>
        Go home
      </EuiButton>,
      <EuiButtonEmpty iconType="arrowLeft" flush="both">
        Go back
      </EuiButtonEmpty>,
    ],
  },
  licenseUpgrade: {
    iconType: 'logoKibana',
    title: <h2>Do more with Kibana!</h2>,
    body: (
      <p>
        Start a free trial or upgrade your license to use anomaly detection.
      </p>
    ),
    actions: [
      <EuiButton color="primary" fill>
        Upgrade
      </EuiButton>,
      <EuiButtonEmpty>Start a free trial</EuiButtonEmpty>,
    ],
    footer: (
      <>
        <EuiTitle size="xxs">
          <h3>Want to learn more?</h3>
        </EuiTitle>
        <EuiLink href="#" target="_blank">
          Read the docs
        </EuiLink>
      </>
    ),
  },
  loading: {
    iconLoading: <EuiLoadingLogo logo="logoKibana" size="xl" />,
    title: <h2>Loading dashboards</h2>,
  },
  firstTimeVisualization: {
    iconLight: illustration,
    iconDark: illustration,
    title: <h2>Create your first visualization</h2>,
    body: (
      <>
        <p>
          There are no visualizations to display. This tool allows you to create
          a wide range of charts, graphs, maps, and other graphics.
        </p>
        <p>
          The visualizations you create can be easily shared with your peers.
        </p>
      </>
    ),
    actions: [
      <EuiButton color="primary" fill>
        Create visualization
      </EuiButton>,
    ],
    footer: (
      <>
        <EuiTitle size="xxs">
          <span>Want to learn more?</span>
        </EuiTitle>{' '}
        <EuiLink href="#" target="_blank">
          Read the docs
        </EuiLink>
      </>
    ),
  },
};
