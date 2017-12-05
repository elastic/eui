import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import OutsideClickDetector from './outside_click_detector';
const outsideClickDetectorSource = require('!!raw-loader!./outside_click_detector');
const outsideClickDetectorHtml = renderToHtml(OutsideClickDetector);

export const OutsideClickDetectorExample = {
  title: 'OutsideClickDetector',
  sections: [{
    title: 'OutsideClickDetector',
    source: [{
      type: GuideSectionTypes.JS,
      code: outsideClickDetectorSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: outsideClickDetectorHtml,
    }],
    text: (
      <p>
        Use <EuiCode>EuiOutsideClickDetector</EuiCode> to trigger a handler when the user clicks outside of the
        child element.
      </p>
    ),
    demo: <OutsideClickDetector />,
  }],
};
