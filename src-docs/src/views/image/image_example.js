import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiImage } from '../../../../src/components';

import Image from './image';
const imageSource = require('!!raw-loader!./image');
const imageHtml = renderToHtml(Image);

import ImageSizes from './image_size';
const imageSizesSource = require('!!raw-loader!./image_size');
const imageSizesHtml = renderToHtml(ImageSizes);

import ImageZoom from './image_zoom';
const imageZoomSource = require('!!raw-loader!./image_zoom');
const imageZoomHtml = renderToHtml(ImageZoom);

export const ImageExample = {
  title: 'Image',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: imageHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <EuiCode>EuiImage</EuiCode> when you need to place a static
            image into a page with an optional caption. It has the following
            props.
          </p>
          <ul>
            <li>
              <EuiCode>size</EuiCode> accepts{' '}
              <EuiCode>s / m / l / xl / original / fullWidth</EuiCode>. The
              latter will set the figure to stretch to 100% of its container.
            </li>
            <li>
              <EuiCode>allowFullScreen</EuiCode> when set to true will make the
              image clickable to a larger version.
            </li>
            <li>
              <EuiCode>fullScreenIconColor</EuiCode> allows you to change the
              color of the icon that floats above the image when it can be
              clicked to fullscreen. The default value of{' '}
              <EuiCode>light</EuiCode> is fine unless your image has a white
              background, in which case you should change it to{' '}
              <EuiCode>dark</EuiCode>.
            </li>
            <li>
              <EuiCode>hasShadow</EuiCode> when set to true (default) will apply
              a slight shadow below the image.
            </li>
            <li>
              <EuiCode>caption</EuiCode> will provide a caption to the image.
            </li>
            <li>
              <EuiCode>alt</EuiCode> Sepearate from the caption is a title on
              the alt tag itself. This one is required for accessibility.
            </li>
          </ul>
        </div>
      ),
      props: { EuiImage },
      demo: <Image />,
    },
    {
      title: 'Click an image for a full screen version',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageZoomSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: imageZoomHtml,
        },
      ],
      text: (
        <p>
          Apply the <EuiCode>allowFullScreen</EuiCode> prop to make the image
          clickable and show a full screen version. Note that the second image
          also passes <EuiCode>fullScreenIconColor=&quot;dark&quot;</EuiCode> to
          change icon color to better contrast against the light background of
          that image.
        </p>
      ),
      demo: <ImageZoom />,
    },
    {
      title: 'Images can be sized',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageSizesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: imageSizesHtml,
        },
      ],
      text: (
        <p>
          Images can be sized by passing the <EuiCode>size</EuiCode> prop a
          value of <EuiCode>s / m / l / xl / original / fullWidth</EuiCode>.
          Note that this size is applied to the width of the image.
        </p>
      ),
      demo: <ImageSizes />,
    },
  ],
};
