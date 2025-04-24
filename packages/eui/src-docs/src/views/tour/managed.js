import React, { useEffect, useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCodeBlock,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiTextArea,
  EuiTour,
  EuiTourStep,
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
  isTourActive: false,
  tourPopoverWidth: 360,
  tourSubtitle: 'Demo tour',
};

const STORAGE_KEY = 'tourDemo_Managed_v2';

export default () => {
  const [queryValue, setQueryValue] = useState('');

  let state = localStorage.getItem(STORAGE_KEY);
  if (state) {
    state = JSON.parse(state);
    state = { ...state, isTourActive: false };
  } else {
    state = tourConfig;
  }

  return (
    <EuiTour zIndex={1} steps={demoTourSteps} initialState={state}>
      {([euiTourStepOne, euiTourStepTwo], actions, reducerState) => {
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
          <React.Fragment>
            <EuiButtonEmpty
              size="s"
              iconType="refresh"
              flush="left"
              onClick={resetTour}
            >
              Begin tour
            </EuiButtonEmpty>
            <EuiSpacer size="m" />
            <EuiForm component="form">
              <EuiFormRow label="Query">
                <EuiTourStep zIndex={1} {...euiTourStepOne}>
                  <EuiTextArea
                    placeholder="Placeholder text"
                    aria-label="Query"
                    value={queryValue}
                    onChange={onChange}
                    style={{ width: 400 }}
                  />
                </EuiTourStep>
              </EuiFormRow>

              <EuiSpacer size="m" />

              <EuiTourStep zIndex={1} {...euiTourStepTwo}>
                <EuiButton fill size="s" onClick={handleClick}>
                  Save
                </EuiButton>
              </EuiTourStep>
            </EuiForm>
          </React.Fragment>
        );
      }}
    </EuiTour>
  );
};
