import React, { Fragment, useEffect, useState } from 'react';

import { GuideFullScreen } from '../../services';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiColorPicker,
  EuiColorPickerSwatch,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiSpacer,
  EuiStat,
  EuiTab,
  EuiTabs,
  EuiTextArea,
  EuiTitle,
  EuiTourStep,
  useEuiTour,
} from '../../../../src/components';

const demoTourSteps = [
  {
    step: 1,
    title: 'Step 1',
  },
  {
    step: 2,
    title: 'Step 2',
    anchorPosition: 'upCenter',
    content: <p>What is your favorite color?</p>,
  },
  {
    step: 3,
    title: 'Step 3',
    content: <p>Click here for more cool things.</p>,
    anchorPosition: 'downRight',
    minWidth: 'auto',
  },
  {
    step: 4,
    title: 'Step 4',
    anchorPosition: 'downLeft',
    decoration: 'none',
  },
];

const tourConfig = {
  currentTourStep: 1,
  isTourActive: true,
  tourPopoverWidth: true,
  tourSubtitle: 'Demo tour',
};

export default () => {
  const [color, setColor] = useState('#000');
  const [selectedTabId, setSelectedTabId] = useState('query');
  const [
    [euiTourStepOne, euiTourStepTwo, euiTourStepThree, euiTourStepFour],
    actions,
    reducerState,
  ] = useEuiTour(demoTourSteps, tourConfig);

  useEffect(() => {
    console.log('Update', reducerState);
  }, [reducerState]);

  const onSelectColor = color => {
    setColor(color);
    if (reducerState.currentTourStep === 2) {
      actions.goToStep(3);
    }
  };

  const onTabClick = id => {
    if (id === 'stat' && reducerState.currentTourStep === 3) {
      actions.goToStep(4);
    }
    setSelectedTabId(id);
  };

  const onReset = () => {
    actions.resetTour();
    setSelectedTabId('query');
  };

  const tabs = [
    {
      id: 'query',
      name: 'Query',
      disabled: false,
      content: (
        <div>
          <EuiSpacer />
          <EuiTourStep
            {...euiTourStepOne}
            content={
              <div>
                <p>This is a neat thing. You enter queries here.</p>
                <EuiSpacer />
                <EuiButton color="primary" onClick={actions.incrementStep}>
                  Ok, got it.
                </EuiButton>
              </div>
            }>
            <EuiTextArea
              placeholder="Placeholder text"
              aria-label="Enter ES SQL query"
              defaultValue="{queryValue}"
              style={{ width: 400 }}
            />
          </EuiTourStep>

          <EuiSpacer />

          <EuiTourStep
            {...euiTourStepTwo}
            footerAction={
              <EuiButtonEmpty
                color="text"
                flush="right"
                size="xs"
                onClick={actions.incrementStep}>
                {"I don't have a favorite color"}
              </EuiButtonEmpty>
            }>
            <EuiColorPicker
              onChange={onSelectColor}
              color={color}
              mode="swatch"
              button={
                <EuiColorPickerSwatch
                  color={color}
                  aria-label="Select a color"
                />
              }
            />
          </EuiTourStep>
        </div>
      ),
    },
    {
      id: 'stat',
      name: (
        <EuiTourStep {...euiTourStepThree}>
          <span>Stats</span>
        </EuiTourStep>
      ),
      disabled: false,
      content: (
        <div>
          <EuiSpacer />
          <EuiTourStep
            {...euiTourStepFour}
            content={
              <div>
                <p>That about does it.</p>
                <EuiSpacer />
                <EuiButton color="primary" onClick={onReset}>
                  Take me to the start.
                </EuiButton>
              </div>
            }>
            <div>
              <EuiStat title="22,123" description="Queries" />
            </div>
          </EuiTourStep>
        </div>
      ),
    },
  ];

  return (
    <GuideFullScreen onOpen={onReset}>
      {setIsFullScreen => (
        <React.Fragment>
          <EuiPage className="guideFullScreenOverlay" style={{ zIndex: 9000 }}>
            <EuiPageBody>
              <EuiPageHeader>
                <EuiPageHeaderSection>
                  <EuiTitle size="l">
                    <h1>My app</h1>
                  </EuiTitle>
                </EuiPageHeaderSection>
                <EuiPageHeaderSection>
                  <EuiButton
                    fill
                    onClick={() => setIsFullScreen(false)}
                    iconType="exit"
                    aria-label="Exit fullscreen demo">
                    Exit fullscreen demo
                  </EuiButton>
                </EuiPageHeaderSection>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiPageContentHeaderSection>
                    <EuiTitle>
                      <h2>A new feature to demo</h2>
                    </EuiTitle>
                  </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiTabs>
                    {tabs.map((tab, index) => (
                      <EuiTab
                        id={tab.id}
                        onClick={() => onTabClick(tab.id)}
                        isSelected={tab.id === selectedTabId}
                        key={index}>
                        {tab.name}
                      </EuiTab>
                    ))}
                  </EuiTabs>
                  {tabs.map((tab, index) => (
                    <Fragment key={index}>
                      {tab.id === selectedTabId && (
                        <div role="tabpanel" aria-labelledby={tab.id}>
                          {tab.content}
                        </div>
                      )}
                    </Fragment>
                  ))}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </React.Fragment>
      )}
    </GuideFullScreen>
  );
};
