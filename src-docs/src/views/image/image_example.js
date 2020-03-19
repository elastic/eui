import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiImage } from '../../../../src/components';

import Image from './image';
const imageSource = require('!!raw-loader!./image');
const imageHtml = renderToHtml(Image);
const imageSnippet = `<EuiImage
  alt={description}
  url={someUrl}
/>
`;

import ImageSizes from './image_size';
const imageSizesSource = require('!!raw-loader!./image_size');
const imageSizesHtml = renderToHtml(ImageSizes);
const imageSizesSnippet = `<EuiImage
  size="l"
  alt={description}
  url={someUrl}
/>
`;

import ImageZoom from './image_zoom';
const imageZoomSource = require('!!raw-loader!./image_zoom');
const imageZoomHtml = renderToHtml(ImageZoom);
const imageZoomSnippet = `<EuiImage
  allowFullScreen
  alt={description}
  url={someUrl}
/>
`;

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
            image into a page with an optional caption.
          </p>
        </div>
      ),
      props: { EuiImage },
      demo: <Image />,
      snippet: imageSnippet,
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
      snippet: imageZoomSnippet,
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
          value of{' '}
          <EuiCode>
            s / m / l / xl / original / fullWidth / number / string
          </EuiCode>
          . This size sets the <strong>maximum</strong> length of the longest
          edge of the image, whether that is height or width, and scales it.
          Only the provided sizing values will also increase the size of a
          smaller image.
        </p>
      ),
      demo: <ImageSizes />,
      snippet: imageSizesSnippet,
    },
  ],
};
