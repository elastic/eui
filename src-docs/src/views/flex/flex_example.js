import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { Link } from 'react-router';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiSpacer,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
  EuiLink,
} from '../../../../src/components';

import FlexGroup from './flex_group';
const flexGroupSource = require('!!raw-loader!./flex_group');
const flexGroupHtml = renderToHtml(FlexGroup);

import FlexGroupWrap from './flex_group_wrap';
const flexGroupWrapSource = require('!!raw-loader!./flex_group_wrap');
const flexGroupWrapHtml = renderToHtml(FlexGroupWrap);

import FlexItems from './flex_items';
const flexItemsSource = require('!!raw-loader!./flex_items');
const flexItemsHtml = renderToHtml(FlexItems);

import ComponentSpan from './component_span';
const componentSpanSource = require('!!raw-loader!./component_span');
const componentSpanHtml = renderToHtml(ComponentSpan);

import FlexGutter from './flex_gutter';
const flexGutterSource = require('!!raw-loader!./flex_gutter');
const flexGutterHtml = renderToHtml(FlexGutter);

import FlexGrowZero from './flex_grow_zero';
const flexGrowZeroSource = require('!!raw-loader!./flex_grow_zero');
const flexGrowZeroHtml = renderToHtml(FlexGrowZero);

import FlexGrowNumeric from './flex_grow_numeric';
const flexGrowNumericSource = require('!!raw-loader!./flex_grow_numeric');
const flexGrowNumericHtml = renderToHtml(FlexGrowNumeric);

import FlexJustify from './flex_justify';
const flexJustifySource = require('!!raw-loader!./flex_justify');
const flexJustifyHtml = renderToHtml(FlexJustify);

import Direction from './direction';
const directionSource = require('!!raw-loader!./direction');
const directionHtml = renderToHtml(Direction);

import FlexGrid from './flex_grid';
const flexGridSource = require('!!raw-loader!./flex_grid');
const flexGridHtml = renderToHtml(FlexGrid);

import FlexGridColumns from './flex_grid_columns';
const flexGridColumnsSource = require('!!raw-loader!./flex_grid_columns');
const flexGridColumnsHtml = renderToHtml(FlexGridColumns);

import FlexNest from './flex_nest';
const flexNestSource = require('!!raw-loader!./flex_nest');
const flexNestHtml = renderToHtml(FlexNest);

import FlexItemPanel from './flex_item_panel';
const flexItemPanelSource = require('!!raw-loader!./flex_item_panel');
const flexItemPanelHtml = renderToHtml(FlexItemPanel);

import FlexGroupResponsive from './flex_responsive';
const flexGroupResponsiveSource = require('!!raw-loader!./flex_responsive');
const flexGroupResonsiveHtml = renderToHtml(FlexGroupResponsive);

export const FlexExample = {
  title: 'Flex',
  intro: (
    <Fragment>
      <EuiCallOut
        title="Coloring and padding exist for examples only"
        color="warning">
        <p>
          Padding and background-color are added to all the{' '}
          <EuiCode>FlexItem</EuiCode> components on this documentation page for
          illustrative purposes only. You will need to add padding through
          additional components or classes if you need it.
        </p>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'FlexGroup is for a single row layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGroupHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>FlexGroup</EuiCode> is useful for setting up layouts for a{' '}
            <strong>single row</strong> of content. By default any{' '}
            <EuiCode>FlexItem</EuiCode> within <EuiCode>FlexGroup</EuiCode> will
            stretch and grow to match their siblings.
          </p>
        </div>
      ),
      props: { EuiFlexGroup, EuiFlexItem, EuiFlexGrid },
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroup />
        </div>
      ),
    },
    {
      title: 'FlexGroup can wrap its items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupWrapSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGroupWrapHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can set <EuiCode>wrap</EuiCode> on <EuiCode>FlexGroup</EuiCode>{' '}
            if it contains <EuiCode>FlexItem</EuiCode>s with minimum widths,
            which you want to wrap as the container becomes narrower.
          </p>
          <EuiCallOut color="warning" title="IE Warning">
            <p>
              IE11 does not properly wrap flex items if the{' '}
              <strong>group</strong> is also within a flex item. To fix this
              rendering issue, you need to add a class of{' '}
              <EuiCode>.euiIEFlexWrapFix</EuiCode> to the flex-item that{' '}
              <strong>contains</strong> the wrapping group.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroupWrap />
        </div>
      ),
    },
    {
      title: 'FlexGroup accepts infinite items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexItemsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexItemsHtml,
        },
      ],
      text: (
        <p>
          Same code as above. Notice that <EuiCode>FlexItem</EuiCode> creates
          equal width items no matter the number of siblings.{' '}
          <EuiCode>FlexGroup</EuiCode> never wraps.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexItems />
        </div>
      ),
    },
    {
      title: 'You can specify spans instead of divs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: componentSpanSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: componentSpanHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>component=&ldquo;span&rdquo;</EuiCode> can be set on{' '}
          <EuiCode>FlexGroup</EuiCode> and/or <EuiCode>FlexItem</EuiCode>.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <ComponentSpan />
        </div>
      ),
    },
    {
      title: 'FlexPanels grow to fill FlexItems',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexItemPanelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexItemPanelHtml,
        },
      ],
      text: (
        <p>
          The <Link to="/layout/panel">Panel</Link> component will naturally
          grow to fill the
          <EuiCode>FlexItem</EuiCode> which contains it.
        </p>
      ),
      demo: <FlexItemPanel />,
    },
    {
      title: 'FlexItem can individually turn off stretching',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGrowZeroSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGrowZeroHtml,
        },
      ],
      text: (
        <p>
          Sometimes you do not want a <EuiCode>FlexItem</EuiCode> to grow. It
          can be turned off on each item individually.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGrowZero />
        </div>
      ),
    },
    {
      title: 'FlexItem can specify a proportional width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGrowNumericSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGrowNumericHtml,
        },
      ],
      text: (
        <p>
          You can specify a number between 1 and 10 for a{' '}
          <EuiCode>FlexItem</EuiCode> to try to take up a proportional part of
          the flex box it is in.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGrowNumeric />
        </div>
      ),
    },
    {
      title: 'FlexGroup can justify and align',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexJustifySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexJustifyHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>FlexGroup</EuiCode>s can also use{' '}
          <EuiCode>justifyContent</EuiCode> and <EuiCode>alignItems</EuiCode>{' '}
          props that accept normal flex-box parameters. Below are some common
          scenarios, where you need to separate two items, center justify a
          single one, or center an item vertically. Note the usage of{' '}
          <EuiCode>FlexItem</EuiCode>s with <EuiCode>grow=false</EuiCode> so
          that they do not stretch.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexJustify />
        </div>
      ),
    },
    {
      title: 'FlexGroup can change direction',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: directionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: directionHtml,
        },
      ],
      text: (
        <div>
          <p>
            You can change direction using the <EuiCode>direction</EuiCode>{' '}
            prop.
          </p>
          <EuiCallOut color="warning" title="IE11 Warning">
            <p>
              Depending on the nested structure of your flex groups, it is
              possible that flex-items inside a column directed flex group will
              not show. To counter this, add the <code>grow</code> prop and set
              to either <code>false</code> or a number. Setting{' '}
              <code>grow</code> to <code>true</code> will not suffice. You may
              also need to adjust the <code>flex-basis</code> value.
            </p>
          </EuiCallOut>
        </div>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <Direction />
        </div>
      ),
    },
    {
      title: 'FlexGrids are for repeatable grids',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGridHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>FlexGrid</EuiCode> is a more rigid component that sets
          multiple, wrapping rows of same width items.
        </p>
      ),
      props: { EuiFlexGrid },
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGrid />
        </div>
      ),
    },
    {
      title: 'FlexGrids can have set column widths',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridColumnsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGridColumnsHtml,
        },
      ],
      text: (
        <p>
          You can set a <EuiCode>columns</EuiCode> prop to specify anywhere
          between 1-4 columns. Any more would likely break on laptop screens.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGridColumns />
        </div>
      ),
    },
    {
      title: 'FlexGrids and FlexGroups can nest',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexNestSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexNestHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <EuiCode>FlexGroup</EuiCode> and <EuiCode>FlexGrid</EuiCode> can
            nest within themselves indefinitely. For example, here we turn off
            the growth on a<EuiCode>FlexGroup</EuiCode>, then nest a grid inside
            of it.
          </p>
          <EuiCallOut color="warning" title="IE11 Warning">
            <p>
              Nesting can cause some nasty bugs in IE11. There is no generalized
              way to fix IE without knowing the exact intention of the layout.
              Please refer to{' '}
              <EuiLink href="https://github.com/philipwalton/flexbugs">
                Flexbugs
              </EuiLink>{' '}
              if you see rendering issues in IE.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexNest />
        </div>
      ),
    },
    {
      title: 'Gutter sizing can be used on either FlexGroups or FlexGrids',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGutterSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGutterHtml,
        },
      ],
      text: (
        <p>
          The <EuiCode>gutterSize</EuiCode> prop can be applied to either a
          <EuiCode>FlexGroup</EuiCode> or a <EuiCode>FlexGrid</EuiCode> to
          adjust the spacing between <EuiCode>FlexItem</EuiCode>s.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGutter />
        </div>
      ),
    },
    {
      title: 'FlexGroups can turn off responsive layouts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupResponsiveSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: flexGroupResonsiveHtml,
        },
      ],
      text: (
        <p>
          By default <EuiCode>EuiFlexGroup</EuiCode> is responsive. However,
          often you only want to use groups for alignment and margins, rather
          than layouts. Simply apply the{' '}
          <EuiCode>responsive={`{false}`}</EuiCode> prop to retain a single row
          layout for the group.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroupResponsive />
        </div>
      ),
    },
  ],
};
