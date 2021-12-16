import React from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiLoadingLogo,
} from '../../../../src/components';

export const useCasesObj: any = {
  noData: {
    id: 'noData',
    label: 'No data',
    iconType: 'addDataApp',
    title: <h2>Get started by adding your data</h2>,
    body: (
      <>
        <p>
          To start working with your data, use one of our many ingest options.
          Collect data from an app or service, or upload a file.
        </p>
        <p>
          If you&apos;re not ready to use your own data, add a sample data set.
        </p>
      </>
    ),
    actions: [
      <EuiButton color="primary" fill>
        Add your data
      </EuiButton>,
      <EuiButtonEmpty>Try sample data</EuiButtonEmpty>,
    ],
  },
  noPermission: {
    id: 'noPermission',
    label: 'No permission',
    iconType: 'lock',
    title: <h2>Contact your administrator for access</h2>,
    body: <p>To view cases in this space, you need additional privileges.</p>,
  },
  noResults: {
    id: 'noResults',
    label: 'No results',
    iconType: 'logoSecurity',
    title: <h2>Start adding cases</h2>,
    body: (
      <p>
        There are no cases to display. Add a new case or change your filter
        settings.
      </p>
    ),
    actions: [
      <EuiButton color="primary" fill>
        Add a case
      </EuiButton>,
    ],
  },
  error: {
    id: 'error',
    label: 'Error',
    iconType: 'alert',
    title: <h2>Error loading Dashboards</h2>,
    body: (
      <p>
        There was an error loading the Dashboard application. Contact your
        administrator for help.
      </p>
    ),
  },
  errorPage: {
    id: 'errorPage',
    label: 'Page error',
    iconType: 'magnifyWithExclamation',
    title: <h2>Page not found</h2>,
    body: (
      <p>
        The page you are looking for might have been removed or temporarily
        unavailable
      </p>
    ),
    actions: [
      <EuiButton color="primary" fill>
        Go home
      </EuiButton>,
      <EuiButtonEmpty>Go back</EuiButtonEmpty>,
    ],
  },
  // This example was commented out. Can we provide a better example?
  // completedTasks: {
  //   id: 'completedTasks',
  //   label: 'Completed tasks',
  //   iconType: 'logoKibana',
  //   title: <h2>Looks like you don&apos;t have any invoices!</h2>,
  //   body: <p>You’ve finished all your tasks.</p>,
  //   actions: [
  //     <EuiButton color="primary" fill>
  //       Add a task
  //     </EuiButton>,
  //   ],
  // },
  licenseUpgrade: {
    id: 'licenseUpgrade',
    label: 'License upgrade',
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
  },
  loading: {
    id: 'loading',
    label: 'Loading',
    icon: <EuiLoadingLogo logo="logoKibana" size="xl" />,
    title: <h2>Loading Dashboards</h2>,
  },
};
