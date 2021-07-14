import React, { useEffect, useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCodeBlock,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiTextArea,
  EuiTourStep,
  useEuiTour,
} from '../../../../src/components';

const demoTourSteps = [
  {
    step: 1,
    title: 'Step 1',
    content: (
      <span>
        <p>Copy and paste this sample query.</p>
        <EuiSpacer />
        <EuiCodeBlock language="html" paddingSize="s" isCopyable>
          {'SELECT email FROM “kibana_sample_data_ecommerce”'}
        </EuiCodeBlock>
      </span>
    ),
    anchorPosition: 'rightUp',
  },
  {
    step: 2,
    title: 'Step 2',
    content: <p>Save your changes.</p>,
    anchorPosition: 'rightUp',
  },
];

const tourConfig = {
  currentTourStep: 1,
  isTourActive: true,
  tourPopoverWidth: 360,
  tourSubtitle: 'Demo tour',
};

const STORAGE_KEY = 'tourDemo_Managed';

export default () => {
  const [queryValue, setQueryValue] = useState('');

  let state = localStorage.getItem(STORAGE_KEY);
  if (state) {
    state = JSON.parse(state);
  } else {
    state = tourConfig;
  }

  const [[euiTourStepOne, euiTourStepTwo], actions, reducerState] = useEuiTour(
    demoTourSteps,
    state
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reducerState));
  }, [reducerState]);

  const handleClick = () => {
    actions.finishTour();
  };

  const resetTour = () => {
    actions.resetTour();
    setQueryValue('');
  };

  const onChange = (e) => {
    setQueryValue(e.target.value);

    if (reducerState.currentTourStep < 2) {
      actions.incrementStep();
    }
  };

  return (
    <div>
      <EuiButtonEmpty iconType="refresh" flush="left" onClick={resetTour}>
        Reset tour
      </EuiButtonEmpty>
      <EuiSpacer />
      <EuiForm component="form">
        <EuiFormRow label="Enter an ES SQL query">
          <EuiTourStep {...euiTourStepOne}>
            <EuiTextArea
              placeholder="Placeholder text"
              aria-label="Enter ES SQL query"
              value={queryValue}
              onChange={onChange}
              style={{ width: 400 }}
            />
          </EuiTourStep>
        </EuiFormRow>

        <EuiSpacer />

        <EuiTourStep {...euiTourStepTwo}>
          <EuiButton onClick={handleClick}>Save query</EuiButton>
        </EuiTourStep>
      </EuiForm>
    </div>
  );
};
