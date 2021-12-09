import React from 'react';
import { EuiButton, EuiButtonEmpty } from '../../../../src/components';

export const useCasesObj: any = {
  noData: {
    id: 'noData',
    label: 'No data',
    iconType: 'logoKibana',
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
    iconType: 'logoKibana',
    title: <h2>No permission</h2>,
    body: (
      <p>
        There are no cases to display. Add a new case or change your filter
        settings.
      </p>
    ),
    actions: [
      <EuiButton color="primary" fill>
        Add your data
      </EuiButton>,
      <EuiButtonEmpty>Try sample data</EuiButtonEmpty>,
    ],
  },
  noResults: {
    id: 'noResults',
    label: 'No results',
    iconType: 'logoKibana',
    title: <h2>No results</h2>,
    body: (
      <p>
        There are no cases to display. Add a new case or change your filter
        settings.
      </p>
    ),
    actions: [
      <EuiButton color="primary" fill>
        Add your data
      </EuiButton>,
      <EuiButtonEmpty>Try sample data</EuiButtonEmpty>,
    ],
  },
  error: {
    id: 'error',
    label: 'Error',
    iconType: 'logoKibana',
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
    label: 'Page not found',
    iconType: 'logoKibana',
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
  completedTasks: {
    id: 'completedTasks',
    label: 'Completed tasks',
    iconType: 'logoKibana',
    title: <h2>Completed tasks</h2>,
    body: (
      <p>
        There are no cases to display. Add a new case or change your filter
        settings.
      </p>
    ),
  },
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
};
