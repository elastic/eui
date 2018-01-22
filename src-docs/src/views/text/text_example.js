import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Text from './text';
const textSource = require('!!raw-loader!./text');
const textHtml = renderToHtml(Text);

import TextSmall from './text_small';
const textSmallSource = require('!!raw-loader!./text_small');
const textSmallHtml = renderToHtml(TextSmall);

import TextColor from './text_color';
const textColorSource = require('!!raw-loader!./text_color');
const textColorHtml = renderToHtml(TextColor);

import TextAlign from './text_align';
const textAlignSource = require('!!raw-loader!./text_align');
const textAlignHtml = renderToHtml(TextAlign);

import TextFontFamily from './text_font_family';
const textFontFamilySource = require('!!raw-loader!./text_font_family');
const textFontFamilyHtml = renderToHtml(TextFontFamily);

export const TextExample = {
  title: 'Text',
  sections: [{
    title: 'Text',
    source: [{
      type: GuideSectionTypes.JS,
      code: textSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: textHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiText</EuiCode> is a generic catchall wrapper that will apply
        our standard typography styling and spacing to naked HTML. Because of
        its forced style it <strong>only accepts raw HTML</strong> and can
        not / should not be used to wrap React components (which would break
        their styling).
      </p>
    ),
    demo: <Text />,
  }, {
    title: 'Text can come in various sizes',
    source: [{
      type: GuideSectionTypes.JS,
      code: textSmallSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: textSmallHtml,
    }],
    text: (
      <p>
        Using the <EuiCode>size</EuiCode> prop on <EuiCode>EuiText</EuiCode> you
        can get smaller sizes of text then the default.
      </p>
    ),
    demo: <TextSmall />,
  }, {
    title: 'Coloring text',
    source: [{
      type: GuideSectionTypes.JS,
      code: textColorSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: textColorHtml,
    }],
    text: (
      <p>
        There are two ways to color text. Either individually by
        applying <EuiCode>EuiTextColor</EuiCode> on individual text objects, or
        by passing the <EuiCode>color</EuiCode> prop directly on <EuiCode>EuiText</EuiCode> for
        a blanket approach across the entirely of your text. Either solution wraps
        the element in a span with the <EuiCode>!important</EuiCode> applied to the color.
        It will override any other colors in use, so be careful.
      </p>
    ),
    demo: <TextColor />,
  }, {
    title: 'Setting alignment',
    source: [{
      type: GuideSectionTypes.JS,
      code: textAlignSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: textAlignHtml,
    }],
    text: (
      <p>
        There are two ways to align text. Either individually by
        applying <EuiCode>EuiTextAlign</EuiCode> on individual text objects, or
        by passing the <EuiCode>textAlign</EuiCode> prop directly on <EuiCode>EuiText</EuiCode> for
        a blanket approach across the entirely of your text. Either solution wraps
        the element in a span with the <EuiCode>!important</EuiCode> applied to the alignment.
        It will override any other alignment in use, so be careful.
      </p>
    ),
    demo: <TextAlign />,
  }, {
    title: 'Setting font family',
    source: [{
      type: GuideSectionTypes.JS,
      code: textFontFamilySource,
    }, {
      type: GuideSectionTypes.HTML,
      code: textFontFamilyHtml,
    }],
    text: (
      <p>
        There are two ways to set the font family text. Either individually by
        applying <EuiCode>EuiTextFontFamily</EuiCode> on individual text objects, or
        by passing the <EuiCode>fontFamily</EuiCode> prop directly on <EuiCode>EuiText</EuiCode> for
        a blanket approach across the entirely of your text. Either solution wraps
        the element in a span with the <EuiCode>!important</EuiCode> applied to the font family.
        It will override any other font families in use, so be careful.
      </p>
    ),
    demo: <TextFontFamily />,
  }],
};
