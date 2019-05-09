import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiOutsideClickDetector,
} from '../../../../src/components';

import OutsideClickDetector from './outside_click_detector';
const outsideClickDetectorSource = require('!!raw-loader!./outside_click_detector');
const outsideClickDetectorHtml = renderToHtml(OutsideClickDetector);

export const OutsideClickDetectorExample = {
  title: 'Outside Click Detector',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: outsideClickDetectorSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: outsideClickDetectorHtml,
    }],
    text: (
      <React.Fragment>
        <p>
          Use <EuiCode>EuiOutsideClickDetector</EuiCode> to trigger a handler when the user clicks outside of the
          child element.
        </p>
        <EuiCallOut
          title="Use with EuiSelect"
          color="warning"
        >
          <p>
            <EuiCode>EuiSelect</EuiCode> normalizes browser event inconsistencies with <EuiCode>select</EuiCode> elements
            and as a result may not trigger <EuiCode>EuiOutsideClickDetector</EuiCode> when targeted with mouse events.
          </p>
        </EuiCallOut>
      </React.Fragment>
    ),
    props: { EuiOutsideClickDetector },
    demo: <OutsideClickDetector />,
  }],
};
