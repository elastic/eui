import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Image from './image';
const imageSource = require('!!raw-loader!./image');
const imageHtml = renderToHtml(Image);

import ImageSizes from './image_size';
const imageSizesSource = require('!!raw-loader!./image_size');
const imageSizesHtml = renderToHtml(ImageSizes);

export const ImageExample = {
  title: 'Image',
  sections: [
    {
      title: 'Image',
      source: [{
        type: GuideSectionTypes.JS,
        code: imageSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: imageHtml,
      }],
      text: (
        <div>
          <p>
            Use <EuiCode>EuiImage</EuiCode> when you need to place a static image
            into a page with an optional caption. It has the following props.
          </p>
          <ul>
            <li>
              <EuiCode>size</EuiCode> accepts <EuiCode>s / m / l / xl / original / fullWidth</EuiCode>.
              The later will set the figure to stretch to 100% of its container.
            </li>
            <li>
              <EuiCode>allowFullScreen</EuiCode> when set to true (default) will make the image
              clicakable to a larger version.
            </li>
            <li>
              <EuiCode>hasShadow</EuiCode> when set to true (default) will apply
              a slight shadow below the image.
            </li>
            <li>
              <EuiCode>caption</EuiCode> will provide a caption to the image.
            </li>
          </ul>
        </div>
      ),
      demo: <Image />,
    },
    {
      title: 'Images can be sized',
      source: [{
        type: GuideSectionTypes.JS,
        code: imageSizesSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: imageSizesHtml,
      }],
      text: (
        <p>
          Images can be sized by passing the <EuiCode>size</EuiCode> prop a value
          of <EuiCode>s / m / l / original / fullWidth</EuiCode>.
        </p>
      ),
      demo: <ImageSizes />,
    },
  ],
};
