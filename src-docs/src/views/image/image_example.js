import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiImage } from '../../../../src/components';
EuiImage.__docgenInfo.props.src.required = true;

import imageConfig from './playground';

import Image from './image';
const imageSource = require('!!raw-loader!./image');
const imageHtml = renderToHtml(Image);
const imageSnippet = `<EuiImage
  alt={description}
  src={someSrc}
/>
`;

import ImageSizes from './image_size';
const imageSizesSource = require('!!raw-loader!./image_size');
const imageSizesHtml = renderToHtml(ImageSizes);
const imageSizesSnippet = `<EuiImage
  size="l"
  alt={description}
  src={someSrc}
/>
`;

import ImageZoom from './image_zoom';
const imageZoomSource = require('!!raw-loader!./image_zoom');
const imageZoomHtml = renderToHtml(ImageZoom);
const imageZoomSnippet = `<EuiImage
  allowFullScreen
  alt={description}
  src={someSrc}
/>
`;

import ImageFloat from './float';
import { EuiCallOut } from '../../../../src/components/call_out';
import { Fragment } from 'react-is';
const imageFloatSource = require('!!raw-loader!./float');
const imageFloatHtml = renderToHtml(ImageFloat);
const imageFloatSnippet = `<EuiImage
  alt={description}
  src={someSrc}
  float="left"
  margin="l"
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
            Use <strong>EuiImage</strong> when you need to place a static image
            into a page with an optional caption.
          </p>
        </div>
      ),
      props: { EuiImage },
      demo: <Image />,
      snippet: imageSnippet,
      playground: imageConfig,
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
          also passes{' '}
          <EuiCode language="js">fullScreenIconColor=&quot;dark&quot;</EuiCode>{' '}
          to change icon color to better contrast against the light background
          of that image.
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
    {
      title: 'Float images within text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageFloatSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: imageFloatHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            When using <EuiCode>EuiImage</EuiCode> within{' '}
            <EuiCode>EuiText</EuiCode> it is often useful to apply floats.
            Almost always you&apos;ll want to pair the <EuiCode>float</EuiCode>{' '}
            prop usage, with a <EuiCode>margin</EuiCode> prop usage to give
            space around your image. Margins, when used in combo with floats,
            will adjust depending upon the position of the float.
          </p>
          <EuiCallOut title="Be careful with floats" color="warning">
            Floats should only be used on images within <strong>large</strong>{' '}
            bodies of text. Specifically, we only suggest using them with{' '}
            <EuiCode>EuiText</EuiCode> which comes automatically clears floats.
          </EuiCallOut>
        </Fragment>
      ),
      demo: <ImageFloat />,
      snippet: imageFloatSnippet,
    },
  ],
};
