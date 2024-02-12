import React, { useState, useEffect } from 'react';

import {
  EuiPageTemplate,
  EuiLoadingLogo,
  EuiButton,
  EuiEmptyPromptProps,
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

  let emptyPromptProps: Partial<EuiEmptyPromptProps>;
  switch (currentState) {
    case 'error':
      emptyPromptProps = {
        color: 'danger',
        iconType: 'error',
        title: <h2>Unable to load your dashboards</h2>,
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
        color: 'plain',
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
        color: 'subdued',
        icon: <EuiLoadingLogo logo="logoKibana" size="xl" />,
        title: <h2>Loading Dashboards</h2>,
      };
      break;
  }

  return (
    <EuiPageTemplate minHeight="0">
      <EuiPageTemplate.EmptyPrompt {...emptyPromptProps} />
    </EuiPageTemplate>
  );
};
