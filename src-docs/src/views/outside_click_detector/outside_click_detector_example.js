import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiOutsideClickDetector } from '../../../../src/components';

import OutsideClickDetector from './outside_click_detector';
const outsideClickDetectorSource = require('!!raw-loader!./outside_click_detector');
const outsideClickDetectorHtml = renderToHtml(OutsideClickDetector);

export const OutsideClickDetectorExample = {
  title: 'Outside Click Detector',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: outsideClickDetectorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: outsideClickDetectorHtml,
        },
      ],
      text: (
        <p>
          Use <EuiCode>EuiOutsideClickDetector</EuiCode> to trigger a handler
          when the user clicks outside of the child element.
        </p>
      ),
      props: { EuiOutsideClickDetector },
      demo: <OutsideClickDetector />,
    },
  ],
};
