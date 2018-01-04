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

export const ImageExample = {
  title: 'Image',
  sections: [{
    title: 'Image',
    source: [{
      type: GuideSectionTypes.JS,
      code: imageSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: imageHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiImage</EuiCode> component.
      </p>
    ),
    demo: <Image />,
  }],
};
