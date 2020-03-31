import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiOutsideClickDetector,
} from '../../../../src/components';

import OutsideClickDetector from './outside_click_detector';
const outsideClickDetectorSource = require('!!raw-loader!./outside_click_detector');
const outsideClickDetectorHtml = renderToHtml(OutsideClickDetector);

export const OutsideClickDetectorExample = {
  title: 'Outside click detector',
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
        <React.Fragment>
          <p>
            Use <strong>EuiOutsideClickDetector</strong> to trigger a handler
            when the user clicks outside of the child element.
          </p>
          <EuiCallOut
            title={
              <span>
                <strong>EuiSelect</strong> normalizes browser event
                inconsistencies with <EuiCode>{'<select />'}</EuiCode> elements
                and as a result may not trigger{' '}
                <strong>EuiOutsideClickDetector</strong> when targeted with
                mouse events.
              </span>
            }
            color="warning"
          />
        </React.Fragment>
      ),
      props: { EuiOutsideClickDetector },
      demo: <OutsideClickDetector />,
    },
  ],
};
