import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiAspectRatio,
  EuiSpacer,
  EuiCallOut,
} from '../../../../src/components';

import AspectRatio from './aspect_ratio';
const aspectRatioSource = require('!!raw-loader!./aspect_ratio');
const aspectRatioHtml = renderToHtml(AspectRatio);

import AspectRatioImage from './aspect_ratio_image';
import { Fragment } from 'react-is';

const aspectRatioImageSource = require('!!raw-loader!./aspect_ratio_image');
const aspectRatioImageHtml = renderToHtml(AspectRatioImage);

export const AspectRatioExample = {
  title: 'Aspect Ratio',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: aspectRatioSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: aspectRatioHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>EuiAspectRatio</EuiCode> provides a way to responsively
          resize a single block level child element to a specificied ratio. This
          is useful for things like YouTube iframes or images that initially
          have a fixed size.
        </p>
      ),
      props: { EuiAspectRatio },
      demo: <AspectRatio />,
    },
    {
      title: 'Cropping content and setting a max width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: aspectRatioImageSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: aspectRatioImageHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Use the <EuiCode>cropContent</EuiCode> prop to force a child to fit
            a given ratio regardless of its initial orientation. This will
            &quot;crop&quot; the content and use an overflow to hide portions of
            the source child, resizing, but not not distorting the source. Use
            the <EuiCode>madWidth</EuiCode> prop to set a width to contain the
            element.
          </p>
          <EuiSpacer size="s" />
          <EuiCallOut
            color="warning"
            size="s"
            title="This will work on any passsed child, but is generally only useful for single, block level cotent like images."
          />
        </Fragment>
      ),
      props: { EuiAspectRatio },
      demo: <AspectRatioImage />,
    },
  ],
};
