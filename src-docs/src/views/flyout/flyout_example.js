import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import { Flyout } from './flyout';
const flyoutSource = require('!!raw-loader!./flyout');
const flyoutHtml = renderToHtml(Flyout);

import { FlyoutComplicated } from './flyout_complicated';
const flyoutComplicatedSource = require('!!raw-loader!./flyout_complicated');
const flyoutComplicatedHtml = renderToHtml(FlyoutComplicated);

import { FlyoutSize } from './flyout_size';
const flyoutSizeSource = require('!!raw-loader!./flyout_size');
const flyoutSizeHtml = renderToHtml(FlyoutSize);

export const FlyoutExample = {
  title: 'Flyout',
  sections: [
    {
      title: 'Flyout',
      source: [{
        type: GuideSectionTypes.JS,
        code: flyoutSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flyoutHtml,
      }],
      text: (
        <div>
          <p>
            <EuiCode>EuiFlyout</EuiCode> is a fixed position panel that pops in
            from the right side of the screen. It should be used any time you
            need to perform quick, individual actions to a larger page or list.
          </p>
          <ul>
            <li>
              <EuiCode>size</EuiCode> accepts <EuiCode>s / m / l</EuiCode> and
              defines the width of the panel.
            </li>
            <li>
              <EuiCode>ownFocus</EuiCode> is a boolean that
              when <EuiCode>true</EuiCode> will lock the mouse / keyboard focus
              to within the flyout. It is off by default.
            </li>
          </ul>
        </div>
      ),
      demo: <Flyout />,
    },
    {
      title: 'More complicated Flyout',
      source: [{
        type: GuideSectionTypes.JS,
        code: flyoutComplicatedSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flyoutComplicatedHtml,
      }],
      text: (
        <p>
          In this example we use <EuiCode>EuiFlyoutHeader</EuiCode> and
          <EuiCode>EuiFlyoutFooter</EuiCode> to allow for fixed position navigation
          and actions within a flyout. Note that any content
          within <EuiCode>EuiContentBody</EuiCode> will automatcially overflow.
        </p>
      ),
      demo: <FlyoutComplicated />,
    },
    {
      title: 'Flyout sizing and focus',
      source: [{
        type: GuideSectionTypes.JS,
        code: flyoutSizeSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: flyoutSizeHtml,
      }],
      text: (
        <p>
          In this example, we set <EuiCode>size</EuiCode> to <EuiCode>s</EuiCode> and
          aply the <EuiCode>ownFocus</EuiCode> prop. The later not only traps the
          focus of our flyout, but also adds background overlay to reinforce your
          boundries.
        </p>
      ),
      demo: <FlyoutSize />,
    },
  ],
};
