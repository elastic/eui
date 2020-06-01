import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';

import { EuiExpression } from '../../../../src/components/expression';

import Expression from './expression';
const expressionSource = require('!!raw-loader!./expression');
const expressionHtml = renderToHtml(Expression);
const expressionSnippet = `<EuiExpression
  description="description"
  value={value}
  isActive={isActive}
  onClick={handleClick}
/>`;

import Colors from './colors';
const colorSource = require('!!raw-loader!./colors');
const colorHtml = renderToHtml(Colors);
const colorSnippet = `<EuiExpression 
  description="description" 
  value={value}
  color="primary" 
/>`;

import Stringing from './stringing';
const stringingSource = require('!!raw-loader!./stringing');
const stringingHtml = renderToHtml(Stringing);
const stringingSnippet = `<div>
  <EuiExpression
    description="description1"
    value={value1}
    onClick={handleClick1}
  />
  <EuiExpression
    description="description2"
    value={value2}
    onClick={handleClick2}
  />
</div>`;

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
          Use the <strong>EuiExpression</strong> component to surface
          expressions. It requires both a <EuiCode>description</EuiCode> (left
          side) and <EuiCode>value</EuiCode> (right side). Optionally, you can
          pass it an <EuiCode>onClick</EuiCode> function that will convert it to
          a button and add some additional styling to indicate that it is
          clickable.
        </p>
      ),
      props: { EuiExpression },
      snippet: expressionSnippet,
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
      snippet: colorSnippet,
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
      snippet: stringingSnippet,
      demo: <Stringing />,
    },
  ],
};
