import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCallOut,
  EuiLink,
  EuiImage,
} from '../../../../src/components';
EuiImage.__docgenInfo.props.src.required = true;

import imageConfig from './playground';

import Image from './image';
const imageSource = require('!!raw-loader!./image');
const imageSnippet = `<EuiImage
  alt={alt}
  src={src}
/>
`;

import ImageSizes from './image_size';
const imageSizesSource = require('!!raw-loader!./image_size');
const imageSizesSnippet = `<EuiImage
  size="l"
  alt={alt}
  src={src}
/>
`;

import ImageZoom from './image_zoom';
const imageZoomSource = require('!!raw-loader!./image_zoom');
const imageZoomSnippet = `<EuiImage
  allowFullScreen
  alt={alt}
  src={src}
/>
`;

import ImageFloat from './float';
const imageFloatSource = require('!!raw-loader!./float');
const imageFloatSnippet = `<EuiImage
  alt={alt}
  src={src}
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
      ],
      text: (
        <>
          <p>
            Use <strong>EuiImage</strong> when you need to place a static image
            into a page with an optional caption.
          </p>
          <EuiCallOut
            iconType="accessibility"
            title="Writing meaningful image alt text"
          >
            <p>
              This page has several examples of alt text written to aid screen
              reader users, as well as several examples of when <em>not</em> to
              include alt text. When no meaningful description exists, or if the
              image is adequately described by the surrounding text, it is
              better to pass an empty <EuiCode>{'""'}</EuiCode> string instead.
            </p>
            <p>
              See{' '}
              <EuiLink
                href="https://webaim.org/techniques/alttext/"
                target="_blank"
              >
                WebAIM
              </EuiLink>{' '}
              for a more detailed guide to writing effective alt text.
            </p>
          </EuiCallOut>
        </>
      ),
      props: { EuiImage },
      demo: <Image />,
      snippet: imageSnippet,
      playground: imageConfig,
    },
    {
      title: 'Click an image for a fullscreen version',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: imageZoomSource,
        },
      ],
      text: (
        <p>
          Apply the <EuiCode>allowFullScreen</EuiCode> prop to make the image
          clickable and show a fullscreen version. Note that the second image
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
