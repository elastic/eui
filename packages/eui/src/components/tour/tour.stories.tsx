/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiFlexGroup } from '../flex';
import { EuiButton, EuiButtonIcon } from '../button';
import { EuiTour, EuiTourProps } from './tour';
import { EuiTourStep } from './tour_step';

const meta: Meta<EuiTourProps> = {
  title: 'Display/EuiTour/EuiTour',
  component: EuiTour,
  parameters: {
    layout: 'fullscreen',
    codeSnippet: {
      // TODO: enable once render functions are supported
      skip: true,
    },
  },
  decorators: [
    (Story, { args }) => (
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        css={{
          blockSize: '100vh',
        }}
      >
        <Story {...args} />
      </EuiFlexGroup>
    ),
  ],
};

export default meta;
type Story = StoryObj<EuiTourProps>;

export const Playground: Story = {
  args: {
    initialState: {
      currentTourStep: 1,
      isTourActive: true,
      tourPopoverWidth: 300,
      tourSubtitle: '',
    },
    steps: [
      {
        title: 'Welcome!',
        content: 'Tour step content',
        step: 1,
        stepsTotal: 2,
        minWidth: 300,
        maxWidth: 600,
        decoration: 'beacon',
        children: <EuiButtonIcon iconType="question" />,
        onFinish: () => {},
        anchorPosition: 'downCenter',
      },
      {
        title: 'Goodbye!',
        content: 'Tour step content',
        step: 2,
        stepsTotal: 2,
        minWidth: 300,
        maxWidth: 600,
        decoration: 'beacon',
        children: <EuiButtonIcon iconType="cheer" />,
        onFinish: () => {},
        anchorPosition: 'rightCenter',
      },
    ],
  },
  render: (args) => <StatefulTour {...args} />,
};

const StatefulTour = (props: EuiTourProps) => {
  return (
    <EuiTour {...props}>
      {(stepProps, actions, { currentTourStep, isTourActive }) => {
        const showNext = isTourActive && currentTourStep < stepProps.length;

        const handleIncrementStep = () => {
          actions.incrementStep();
          action('incrementStep')();
        };

        const handleFinishTour = () => {
          actions.finishTour();
          action('onFinish')();
        };

        return (
          <>
            {stepProps.map((props) => (
              <EuiTourStep
                {...props}
                onFinish={handleFinishTour}
                footerAction={
                  <EuiFlexGroup>
                    <EuiButton color="text" onClick={handleFinishTour}>
                      Finish Tour
                    </EuiButton>
                    {showNext && (
                      <EuiButton onClick={handleIncrementStep}>Next</EuiButton>
                    )}
                  </EuiFlexGroup>
                }
              />
            ))}
          </>
        );
      }}
    </EuiTour>
  );
};
