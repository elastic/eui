import React, { useState, useEffect } from 'react';

import {
  EuiEmptyPrompt,
  EuiPageTemplate,
  EuiLoadingLogo,
  EuiButton,
} from '../../../../src/components';

export default () => {
  const states = ['loading1', 'error', 'loading2', 'empty'];

  const [currentState, setCurrentState] = useState(states[0]);

  const searchTimeout = setTimeout(() => {
    // Cycle through the array of states
    const index = states.indexOf(currentState);
    setCurrentState(index < states.length - 1 ? states[index + 1] : states[0]);
  }, 3000);

  useEffect(() => {
    return () => {
      clearTimeout(searchTimeout);
    };
  });

  let emptyPromptProps;
  switch (currentState) {
    case 'error':
      emptyPromptProps = {
        iconType: 'alert',
        iconColor: 'danger',
        title: <h2>Error loading Dashboards</h2>,
        body: (
          <p>
            There was an error loading the Dashboard application. Contact your
            administrator for help.
          </p>
        ),
      };
      break;
    case 'empty':
      emptyPromptProps = {
        iconType: 'dashboardApp',
        iconColor: 'default',
        title: <h2>Dashboards</h2>,
        body: <p>You don&apos;t have any dashboards yet.</p>,
        actions: [
          <EuiButton fill iconType="plusInCircleFilled">
            Create new dashboard
          </EuiButton>,
        ],
      };
      break;

    default:
      emptyPromptProps = {
        icon: <EuiLoadingLogo logo="logoKibana" size="xl" />,
        title: <h2>Loading Dashboards</h2>,
      };
      break;
  }

  return (
    <EuiPageTemplate
      template="centeredContent"
      pageContentProps={{
        color: currentState === 'error' ? 'danger' : 'subdued',
        role: null, // For passing a11y tests in EUI docs only
      }}
    >
      <EuiEmptyPrompt {...emptyPromptProps} />
    </EuiPageTemplate>
  );
};
