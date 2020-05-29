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

import Columns from './columns';
const columnsSource = require('!!raw-loader!./columns');
const columnsHtml = renderToHtml(Columns);
const columnsSnippet = `<EuiExpression
  description="description"
  display="columns"
  value={value}
/>`;

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
    {
      title: 'Columns layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: columnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: columnsHtml,
        },
      ],
      text: (
        <div>
          <p>
            There might be cases where displaying a number of{' '}
            <strong>EuiExpression</strong>s in a paragraph is not ideal. For
            example, when both the <EuiCode>description</EuiCode> and the{' '}
            <EuiCode>value</EuiCode> are variable or when the values they can
            take can be quite long. To use a columns layout instead, pass{' '}
            <EuiCode>columns</EuiCode> to the <EuiCode>display</EuiCode> prop.
          </p>
          <p>
            The <EuiCode>columns</EuiCode> layout, comes with a built-in error
            state which is displayed whenever <EuiCode>isInvalid</EuiCode> is
            true.
          </p>
          <p>
            The <EuiCode>description</EuiCode> column is aligned to the right.
            The default width for it is 20%. You can customize this width via
            the <EuiCode>descriptionWidth</EuiCode> prop. When displaying a
            group of <strong>EuiExpression</strong>s, make sure to set the same
            width for all of them.
          </p>
        </div>
      ),
      snippet: columnsSnippet,
      demo: <Columns />,
    },
  ],
};
