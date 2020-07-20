import React, { useState, Fragment } from 'react';

import { EuiSpacer, EuiSteps, EuiButton } from '../../../../src/components';

export default () => {
  const [status, setStatus] = useState('incomplete');

  let completeButton;
  if (status !== 'complete') {
    completeButton = (
      <EuiButton onClick={() => setStatus('complete')}>
        You complete me
      </EuiButton>
    );
  } else {
    completeButton = (
      <EuiButton onClick={() => setStatus('incomplete')}>Reset</EuiButton>
    );
  }

  let warningButton;
  if (status !== 'warning') {
    warningButton = (
      <EuiButton color="warning" onClick={() => setStatus('warning')}>
        Uh oh!
      </EuiButton>
    );
  } else {
    warningButton = (
      <EuiButton color="warning" onClick={() => setStatus('incomplete')}>
        Reset
      </EuiButton>
    );
  }

  let dangerButton;
  if (status !== 'danger') {
    dangerButton = (
      <EuiButton color="danger" onClick={() => setStatus('danger')}>
        Something terrible
      </EuiButton>
    );
  } else {
    dangerButton = (
      <EuiButton color="danger" onClick={() => setStatus('incomplete')}>
        Reset
      </EuiButton>
    );
  }

  const firstSetOfSteps = [
    {
      title: 'Normal step',
      children: <p>Do this first</p>,
    },
    {
      title: 'Push the button to complete this final step',
      children: (
        <Fragment>
          <p>We are fancy buttons just waiting to be pushed!</p>
          <EuiSpacer />
          {completeButton} {warningButton} {dangerButton}
        </Fragment>
      ),
      status: status,
    },
  ];

  return (
    <div>
      <EuiSteps steps={firstSetOfSteps} />
    </div>
  );
};
