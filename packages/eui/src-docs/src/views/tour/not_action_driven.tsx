import React, { useEffect, useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiSpacer,
  EuiTourStep,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiButtonIcon,
} from '../../../../src/components';

const demoTourSteps = [
  {
    step: 1,
    title: 'Preview mode',
    content: <p>See what your project looks like.</p>,
    anchorRef: 'notActionDrivenStep1',
    iconType: 'eye',
  },
  {
    step: 2,
    title: 'Build Mode',
    content: <p>Build your project.</p>,
    anchorRef: 'notActionDrivenStep2',
    iconType: 'editorCodeBlock',
  },
  {
    step: 3,
    title: 'Comment mode',
    content: <p>Collaborate with your colleagues.</p>,
    anchorRef: 'notActionDrivenStep3',
    iconType: 'editorComment',
  },
  {
    step: 2,
    title: 'Share',
    content: <p>Share your project.</p>,
    anchorRef: 'notActionDrivenStep4',
    iconType: 'share',
  },
];

const tourConfig = {
  currentTourStep: 1,
  isTourActive: false,
  tourPopoverWidth: 360,
  tourSubtitle: 'Demo tour',
};

const STORAGE_KEY = 'notActionDrivenDemoTour';

export default () => {
  const [state, setState] = useState(() => {
    let initialState: any = localStorage.getItem(STORAGE_KEY);
    if (initialState) {
      initialState = JSON.parse(initialState);
    } else {
      initialState = tourConfig;
    }
    return initialState;
  });
  useEffect(() => {
    // Store the tour data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const incrementStep = () => {
    setState({
      ...state,
      currentTourStep: state.currentTourStep + 1,
    });
  };

  const handleClick = () => {
    incrementStep();
  };

  const resetTour = () => {
    setState({
      ...state,
      currentTourStep: 1,
      isTourActive: true,
    });
  };

  const finishTour = () => {
    setState({
      ...state,
      isTourActive: false,
    });
  };

  return (
    <div>
      <EuiButtonEmpty
        size="s"
        iconType="refresh"
        flush="left"
        onClick={resetTour}
      >
        Begin tour
      </EuiButtonEmpty>
      <EuiSpacer size="m" />
      <EuiPanel hasBorder style={{ width: 'max-content' }}>
        <EuiFlexGroup gutterSize="s" responsive={false}>
          {demoTourSteps.map((step, index) => (
            <EuiFlexItem grow={false}>
              <EuiTourStep
                content={step.content}
                isStepOpen={
                  state.isTourActive && state.currentTourStep === index + 1
                }
                minWidth={state.tourPopoverWidth}
                onFinish={finishTour}
                step={index + 1}
                stepsTotal={demoTourSteps.length}
                subtitle={state.tourSubtitle}
                title={step.title}
                anchorPosition="downLeft"
                zIndex={1}
                footerAction={
                  // if it's the last step, we don't want to show the next button
                  index === demoTourSteps.length - 1 ? (
                    <EuiButton color="success" size="s" onClick={finishTour}>
                      Finish tour
                    </EuiButton>
                  ) : (
                    [
                      <EuiButtonEmpty
                        size="s"
                        color="text"
                        onClick={finishTour}
                      >
                        Close tour
                      </EuiButtonEmpty>,
                      <EuiButton color="success" size="s" onClick={handleClick}>
                        Next
                      </EuiButton>,
                    ]
                  )
                }
              >
                <EuiButtonIcon size="m" iconType={step.iconType} color="text" />
              </EuiTourStep>
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      </EuiPanel>
    </div>
  );
};
