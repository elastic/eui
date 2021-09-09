import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';

import { EuiExpression } from '../../../../src/components/expression';

import { expressionConfig } from './playground';

import Expression from './expression';
const expressionSource = require('!!raw-loader!./expression');
const expressionHtml = renderToHtml(Expression);
const expressionSnippet = `<EuiExpression
  description={description}
  value={value}
  isActive={isActive}
  onClick={handleClick}
/>`;

import Colors from './colors';
const colorSource = require('!!raw-loader!./colors');
const colorHtml = renderToHtml(Colors);
const colorSnippet = `<EuiExpression
  description={description}
  value={value}
  color="primary"
/>`;

import Stringing from './stringing';
const stringingSource = require('!!raw-loader!./stringing');
const stringingHtml = renderToHtml(Stringing);
const stringingSnippet = `<div>
  <EuiExpression
    description={description1}
    value={value1}
    onClick={handleClick1}
  />
  <EuiExpression
    description={description2}
    value={value2}
    onClick={handleClick2}
  />
</div>`;

import Columns from './columns';
const columnsSource = require('!!raw-loader!./columns');
const columnsHtml = renderToHtml(Columns);
const columnsSnippet = `<EuiExpression
  description={description}
  display="columns"
  value={value}
/>`;

import Invalid from './invalid';
const invalidSource = require('!!raw-loader!./invalid');
const invalidHtml = renderToHtml(Invalid);
const invalidSnippet = `<EuiExpression
  description={description}
  isInvalid
  value={value}
/>`;

import Truncate from './truncate';
const truncateSource = require('!!raw-loader!./truncate');
const truncateHtml = renderToHtml(Truncate);
const truncateSnippet = `<EuiExpression
  description={description}
  value={value}
  textWrap="truncate"
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
      playground: expressionConfig,
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
      title: 'Column display',
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
            There might be cases where displaying multiple{' '}
            <strong>EuiExpression</strong>s in a paragraph is not ideal. For
            example, when both the <EuiCode>description</EuiCode> and the{' '}
            <EuiCode>value</EuiCode> are variable or when their text is quite
            long. To use a column display instead, pass{' '}
            <EuiCode language="ts">{'display="columns"'}</EuiCode>.
          </p>
          <p>
            In column display, each expression is its own line and the{' '}
            <EuiCode>description</EuiCode> column is aligned to the right. The
            default width for the <EuiCode>description</EuiCode> is 20%, but you
            can customize this with the
            <EuiCode>descriptionWidth</EuiCode> prop. When displaying a group of{' '}
            <strong>EuiExpression</strong>s, make sure to set the same width for
            all descriptions.
          </p>
        </div>
      ),
      snippet: columnsSnippet,
      demo: <Columns />,
    },
    {
      title: 'Invalid state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: invalidSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: invalidHtml,
        },
      ],
      text: (
        <p>
          Set <EuiCode>isInvalid</EuiCode> to true to display{' '}
          <strong>EuiExpression</strong>&apos;s error state. This state will
          override the <EuiCode>color</EuiCode> prop with danger.
        </p>
      ),
      snippet: invalidSnippet,
      demo: <Invalid />,
    },
    {
      title: 'Truncate text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: truncateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: truncateHtml,
        },
      ],
      text: (
        <p>
          To truncate <strong>EuiExpression</strong>&apos;s content, pass{' '}
          <EuiCode language="ts">{'textWrap="truncate"'}</EuiCode>. Text
          truncation only works properly if the prop types of{' '}
          <EuiCode>description</EuiCode> and <EuiCode>value</EuiCode> are
          strings. If you&apos;re using nodes, use the{' '}
          <EuiCode>.eui-textTruncate</EuiCode> utility class on all their
          sub-children.
        </p>
      ),
      snippet: truncateSnippet,
      demo: <Truncate />,
    },
  ],
};
