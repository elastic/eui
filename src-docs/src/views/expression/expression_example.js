import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';

import { EuiExpression } from '../../../../src/components/expression';

import Expression from './expression';
const expressionSource = require('!!raw-loader!./expression');
const expressionHtml = renderToHtml(Expression);

import Colors from './colors';
const colorSource = require('!!raw-loader!./colors');
const colorHtml = renderToHtml(Colors);

import Stringing from './stringing';
const stringingSource = require('!!raw-loader!./stringing');
const stringingHtml = renderToHtml(Stringing);

export const ExpressionExample = {
  title: 'Expression',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: expressionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: expressionHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>EuiExpression</EuiCode> component to surface
          expressions. The requires both a <EuiCode>description</EuiCode> (left
          side) and <EuiCode>value</EuiCode> (right side). Optionally, you can
          pass it an <EuiCode>onClick</EuiCode> function that will convert it to
          a button and add some additional styling to indicate that it is
          clickable.
        </p>
      ),
      props: { EuiExpression },
      demo: <Expression />,
    },
    {
      title: 'Colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorHtml,
        },
      ],
      text: (
        <p>
          You can pass a <EuiCode>color</EuiCode> prop but it will only color
          the <EuiCode>description</EuiCode>.
        </p>
      ),
      demo: <Colors />,
    },
    {
      title: 'Stringing a bunch together',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: stringingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: stringingHtml,
        },
      ],
      text: (
        <p>
          If the expression is more than one description and value, you can
          string multiple expressions together and they should inline together
          and wrap at logical points.
        </p>
      ),
      demo: <Stringing />,
    },
  ],
};
