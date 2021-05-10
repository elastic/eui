import React, { Fragment, useState } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiColorPicker,
  EuiColorPickerSwatch,
  EuiPageTemplate,
  EuiSpacer,
  EuiStat,
  EuiTextArea,
  EuiTourStep,
  useEuiTour,
} from '../../../../src/components';
import { ExampleContext } from '../../services';

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

  const onSelectColor = (color) => {
    setColor(color);
    if (reducerState.currentTourStep === 2) {
      actions.goToStep(3);
    }
  };

  const onTabClick = (id) => {
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
    <EuiPageTemplate
      pageHeader={{
        pageTitle: 'My app',
        rightSideItems: [
          <ExampleContext.Consumer>
            {({ parentPath }) => (
              <EuiButton fill href={`#${parentPath}`} iconType="exit">
                Exit full screen demo
              </EuiButton>
            )}
          </ExampleContext.Consumer>,
        ],
        tabs: tabs.map((tab, index) => {
          return {
            key: index,
            label: tab.name,
            id: tab.id,
            onClick: () => onTabClick(tab.id),
            isSelected: tab.id === selectedTabId,
          };
        }),
      }}>
      {tabs.map((tab, index) => (
        <Fragment key={index}>
          {tab.id === selectedTabId && (
            <div role="tabpanel" aria-labelledby={tab.id}>
              {tab.content}
            </div>
          )}
        </Fragment>
      ))}
    </EuiPageTemplate>
  );
};
