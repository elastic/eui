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

const STORAGE_KEY = 'tourDemo_Managed_v2';

export default () => {
  const [queryValue, setQueryValue] = useState('');

  let state = localStorage.getItem(STORAGE_KEY);
  if (state) {
    state = JSON.parse(state);
  } else {
    state = tourConfig;
  }

  return (
    <EuiTour steps={demoTourSteps} initialState={state}>
      {([EuiTourStepOne, EuiTourStepTwo], actions, reducerState) => {
        useEffect(() => {
          console.log('Updating localStorage', STORAGE_KEY, reducerState);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducerState));
        }, [reducerState]);

        const handleClick = () => {
          actions.incrementStep();
        };

        const resetTour = () => {
          actions.resetTour();
          setQueryValue('');
        };

        const onChange = e => {
          setQueryValue(e.target.value);

          if (reducerState.currentTourStep < 2) {
            actions.incrementStep();
          } else {
            actions.endTour();
          }
        };
        return (
          <React.Fragment>
            <EuiButtonEmpty iconType="refresh" flush="left" onClick={resetTour}>
              Reset tour
            </EuiButtonEmpty>
            <EuiSpacer />
            <EuiForm>
              <EuiFormRow label="Enter an ES SQL query">
                <EuiTourStepOne>
                  <EuiTextArea
                    placeholder="Placeholder text"
                    aria-label="Enter ES SQL query"
                    value={queryValue}
                    onChange={onChange}
                    style={{ width: 400 }}
                  />
                </EuiTourStepOne>
              </EuiFormRow>

              <EuiSpacer />

              <EuiTourStepTwo>
                <EuiButton onClick={handleClick}>Save query</EuiButton>
              </EuiTourStepTwo>
            </EuiForm>
          </React.Fragment>
        );
      }}
    </EuiTour>
  );
};
