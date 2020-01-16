import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiButtonEmpty,
  EuiCode,
  EuiPopover,
  EuiTour,
} from '../../../../src/components';

import Tour from './tour';

const tourSource = require('!!raw-loader!./tour');
const tourHtml = renderToHtml(Tour);
const tourSnippet = '<EuiTour size="xs" />';

// TODO update this whenever localStorage changes
const tourData = JSON.parse(localStorage.getItem('tourDemo'));

const handleClick = () => {
  window.alert('button clicked');
  // TODO update localStorage object; increment the step in particular
  // localStorage.setItem('tourDemo', JSON.stringify(xxx));
};

export const TourExample = {
  title: 'Tour',
  intro: (
    <p>
      The example(s) will demonstrate how the tour component attaches to/wraps
      around existing elements on the page.
    </p>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: tourSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: tourHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <EuiCode>Tour</EuiCode> component is a...
          </p>
          <EuiTour
            closePopover={() => {
              return undefined;
            }}
            content={<p>Read this.</p>}
            isStepOpen={tourData.currentTourStep === 3 ? true : false}
            isTourActive={tourData.isTourActive}
            minWidth={tourData.tourPopoverWidth}
            skipOnClick={() => window.alert('skip')}
            step={3}
            stepsTotal={tourData.tourSteps}
            subtitle={tourData.tourSubtitle}
            title="Jump outside the demo area">
            <EuiButtonEmpty flush="left" iconType="check" onClick={handleClick}>
              Finish tour
            </EuiButtonEmpty>
          </EuiTour>
        </div>
      ),
      props: { EuiPopover },
      snippet: tourSnippet,
      demo: <Tour />,
    },
  ],
};
