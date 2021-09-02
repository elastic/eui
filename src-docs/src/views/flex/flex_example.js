import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlexGrid,
  EuiLink,
} from '../../../../src/components';

import { flexGroupConfig, flexGridConfig } from './playground';

import FlexGroup from './flex_group';
const flexGroupSource = require('!!raw-loader!./flex_group');

import FlexItem from './flex_item';
const flexItemSource = require('!!raw-loader!./flex_item');

import FlexGroupWrap from './flex_group_wrap';
const flexGroupWrapSource = require('!!raw-loader!./flex_group_wrap');

import ComponentSpan from './component_span';
const componentSpanSource = require('!!raw-loader!./component_span');

import FlexGutter from './flex_gutter';
const flexGutterSource = require('!!raw-loader!./flex_gutter');

import FlexGrowZero from './flex_grow_zero';
const flexGrowZeroSource = require('!!raw-loader!./flex_grow_zero');

import FlexGrowNumeric from './flex_grow_numeric';
const flexGrowNumericSource = require('!!raw-loader!./flex_grow_numeric');

import FlexJustify from './flex_justify';
const flexJustifySource = require('!!raw-loader!./flex_justify');
import FlexJustifyBetween from './flex_justify_between';
const flexJustifyBetweenSource = require('!!raw-loader!./flex_justify_between');
import FlexJustifyEvenly from './flex_justify_evenly';
const flexJustifyEvenlySource = require('!!raw-loader!./flex_justify_evenly');
import FlexAlignCenter from './flex_align_center';
const flexAlignCenterSource = require('!!raw-loader!./flex_align_center');

import Direction from './direction';
const directionSource = require('!!raw-loader!./direction');

import FlexGridColumns from './flex_grid_columns';
const flexGridColumnsSource = require('!!raw-loader!./flex_grid_columns');

import FlexGridColumnFirst from './flex_grid_column_first';
const flexGridColumnFirstSource = require('!!raw-loader!./flex_grid_column_first');

import FlexNest from './flex_nest';
const flexNestSource = require('!!raw-loader!./flex_nest');

import FlexItemPanel from './flex_item_panel';
const flexItemPanelSource = require('!!raw-loader!./flex_item_panel');

import FlexGroupResponsive from './flex_responsive';
const flexGroupResponsiveSource = require('!!raw-loader!./flex_responsive');

const flexSnippet = `<EuiFlexGroup>
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
</EuiFlexGroup>`;

const flexGroupWrap = `<EuiFlexGroup wrap>
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
</EuiFlexGroup>`;

const componentSpanSnippet = `<EuiFlexGroup component="span">
  <EuiFlexItem component="span"><!-- FlexItem content --></EuiFlexItem>
  <EuiFlexItem component="span"><!-- FlexItem content --></EuiFlexItem>
</EuiFlexGroup>`;

const flexItemPanelSnippet = `<EuiFlexGroup>
  <EuiFlexItem>
    <EuiPanel><!-- Panel content --></EuiPanel>
  </EuiFlexItem>

  <EuiFlexItem>
    <EuiPanel grow={false}><!-- Panel content --></EuiPanel>
  </EuiFlexItem>
</EuiFlexGroup>`;

const flexGrowZeroSnippet = `<EuiFlexGroup>
  <EuiFlexItem grow={false}><!-- FlexItem content --></EuiFlexItem>
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
</EuiFlexGroup>`;

const flexGrowNumericSnippet = `<EuiFlexGroup>
  <EuiFlexItem grow={1}><!-- FlexItem with flew-grow 1 --></EuiFlexItem>
  <EuiFlexItem grow={2}><!-- FlexItem with flew-grow 2 --></EuiFlexItem>
  ...
  <EuiFlexItem grow={10}><!-- FlexItem with flew-grow 10 --></EuiFlexItem>
</EuiFlexGroup>`;

const directionSnippet = `<EuiFlexGroup direction="column">
  <EuiFlexItem><!-- FlexItem in column FlexGroup --></EuiFlexItem>
  <EuiFlexItem><!-- FlexItem in column FlexGroup --></EuiFlexItem>
</EuiFlexGroup>`;

const flexGridColumnsSnippet = `<EuiFlexGrid columns={3}>
  <EuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </EuiFlexItem>
  <EuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </EuiFlexItem>
  <EuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </EuiFlexItem>
</EuiFlexGrid>`;

const flexGridColumnFirstSnippet = `<EuiFlexGrid columns={2} direction="column">
  <EuiFlexItem>
    <!-- Item in FlexGrid-->
  </EuiFlexItem>
  <EuiFlexItem>
    <!-- Item in FlexGrid-->
  </EuiFlexItem>
</EuiFlexGrid>`;

const flexNestSnippet = `<EuiFlexGroup>
  <EuiFlexItem>
    <EuiFlexGroup>
      <EuiFlexItem><!-- FlexGroup inside FlexGroup --></EuiFlexItem>
      <EuiFlexItem><!-- FlexGroup inside FlexGroup --></EuiFlexItem>
    </EuiFlexGroup>
  </EuiFlexItem>
  <EuiFlexItem>
    <EuiFlexGrid>
      <EuiFlexItem><!-- FlexGrid inside FlexGroup --></EuiFlexItem>
      <EuiFlexItem><!-- FlexGrid inside FlexGroup --></EuiFlexItem>
    </EuiFlexGrid>
  </EuiFlexItem>
</EuiFlexGroup>`;

const flexGutterSnippet = `<EuiFlexGroup gutterSize="none">
  <EuiFlexItem><!-- FlexItem without gutter --></EuiFlexItem>
  <EuiFlexItem><!-- FlexItem without gutter --></EuiFlexItem>
</EuiFlexGroup>`;

const flexGroupResponsiveSnippet = `<EuiFlexGroup responsive={false}>
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
</EuiFlexGroup>`;

export const FlexExample = {
  title: 'Flex',
  intro: (
    <Fragment>
      <EuiCallOut title="Coloring and padding exist for examples only">
        <p>
          Padding and background-color are added to all the{' '}
          <strong>EuiFlexItem</strong> components on this documentation page for
          illustrative purposes only. You will need to add padding through
          additional components or classes if you need it.
        </p>
      </EuiCallOut>
    </Fragment>
  ),
  sections: [
    {
      title: 'Flex group is for a single row layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupSource,
        },
      ],
      text: (
        <p>
          <strong>EuiFlexGroup</strong> is useful for setting up layouts for a{' '}
          <strong>single row</strong> of content. By default any{' '}
          <strong>EuiFlexItem</strong> within <strong>EuiFlexGroup</strong> will
          stretch and grow to match their siblings.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroup />
        </div>
      ),
      playground: flexGroupConfig,
      props: { EuiFlexGroup, EuiFlexItem },
      snippet: flexSnippet,
    },
    {
      title: 'Flex items are also flex',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexItemSource,
        },
      ],
      text: (
        <>
          <p>
            To allow for continued stretching of nested{' '}
            <strong>EuiFlexGroup</strong>&apos;s and its items, each{' '}
            <strong>EuiFlexItem</strong> also has the property of{' '}
            <EuiCode language="sass">display: flex</EuiCode>. This can cause
            unwanted layouts of your content when there are multiple elements or
            if the element itself also has some specific{' '}
            <EuiCode language="sass">display</EuiCode> property.
          </p>
          <p>
            To alleviate this, the simplest method is to wrap your inner
            children with a simple HTML element like a{' '}
            <EuiCode language="html">{'<div />'}</EuiCode> or{' '}
            <EuiCode language="html">{'<span />'}</EuiCode>.
          </p>
        </>
      ),
      snippet: `<EuiFlexGroup>
  <EuiFlexItem>
    <div>
      <EuiButton>Wrap them</EuiButton>
    </div>
  </EuiFlexItem>
</EuiFlexGroup>`,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexItem />
        </div>
      ),
    },
    {
      title: 'Spans instead of divs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: componentSpanSource,
        },
      ],
      text: (
        <p>
          Specify <EuiCode>component=&ldquo;span&rdquo;</EuiCode> on{' '}
          <strong>EuiFlexGroup</strong> and/or <strong>EuiFlexItem</strong> to
          change from the default <EuiCode>div</EuiCode>.
        </p>
      ),
      snippet: componentSpanSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <ComponentSpan />
        </div>
      ),
    },
    {
      title: 'Panels grow to fill flex items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexItemPanelSource,
        },
      ],
      text: (
        <p>
          The{' '}
          <Link to="/layout/panel">
            <strong>EuiPanel</strong>
          </Link>{' '}
          component will naturally grow to fill the <strong>EuiFlexItem</strong>{' '}
          which contains it.
        </p>
      ),
      snippet: flexItemPanelSnippet,
      demo: <FlexItemPanel />,
    },
    {
      title: 'Turn off item stretching',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGrowZeroSource,
        },
      ],
      text: (
        <p>
          Sometimes you do not want a <strong>EuiFlexItem</strong> to grow
          horizontally. It can be turned off for each item individually.
        </p>
      ),
      snippet: flexGrowZeroSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGrowZero />
        </div>
      ),
    },
    {
      title: 'Proportional widths of items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGrowNumericSource,
        },
      ],
      text: (
        <p>
          You can specify a number between 1 and 10 for each{' '}
          <strong>EuiFlexItem</strong> to take up a proportional percentage of
          the <strong>EuiFlexGroup</strong> it is in.
        </p>
      ),
      snippet: flexGrowNumericSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGrowNumeric />
        </div>
      ),
    },
    {
      title: 'Justify and align',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexJustifySource,
        },
      ],
      text: (
        <p>
          <strong>EuiFlexGroups</strong> have the props{' '}
          <EuiCode>justifyContent</EuiCode> and <EuiCode>alignItems</EuiCode>{' '}
          that accept{' '}
          <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container">
            normal flexbox parameters
          </EuiLink>
          . Below are some common scenarios, where you need to separate two
          items, center justify a single one, or center an item vertically. Note
          the usage of <strong>EuiFlexItems</strong> with{' '}
          <EuiCode>grow=false</EuiCode> so that they do not stretch.
        </p>
      ),
      snippet: `<EuiFlexGroup justifyContent="spaceAround">
    <EuiFlexItem grow={false}><!-- FlexItem content --></EuiFlexItem>
  </EuiFlexGroup>`,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexJustify />
        </div>
      ),
    },
    {
      title: 'Allowing flex items to wrap',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupWrapSource,
        },
      ],
      text: (
        <p>
          You can set <EuiCode>wrap</EuiCode> on <strong>EuiFlexGroup</strong>{' '}
          if it contains <strong>EuiFlexItems</strong> with minimum widths,
          which you want to wrap as the container becomes narrower.
        </p>
      ),
      snippet: flexGroupWrap,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroupWrap />
        </div>
      ),
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexJustifyBetweenSource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexJustifyBetween />
        </div>
      ),
      snippet: `<EuiFlexGroup justifyContent="spaceBetween">
    <EuiFlexItem grow={false}><!-- FlexItem content --></EuiFlexItem>
    <EuiFlexItem grow={false}><!-- FlexItem content --></EuiFlexItem>
  </EuiFlexGroup>`,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexJustifyEvenlySource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexJustifyEvenly />
        </div>
      ),
      snippet: `<EuiFlexGroup justifyContent="spaceEvenly">
  <EuiFlexItem grow={false}><!-- FlexItem content --></EuiFlexItem>
  <EuiFlexItem grow={false}><!-- FlexItem content --></EuiFlexItem>
</EuiFlexGroup>`,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexAlignCenterSource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexAlignCenter />
        </div>
      ),
      snippet: `<EuiFlexGroup alignItems="center">
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
  <EuiFlexItem><!-- FlexItem content --></EuiFlexItem>
</EuiFlexGroup>`,
    },
    {
      title: 'Change direction',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: directionSource,
        },
      ],
      text: (
        <p>
          You can change direction using the <EuiCode>direction</EuiCode> prop.
        </p>
      ),
      snippet: directionSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <Direction />
        </div>
      ),
    },
    {
      title: 'Flex grids are for repeatable items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridColumnsSource,
        },
      ],
      text: (
        <p>
          <strong>EuiFlexGrid</strong> is a more rigid component that sets
          multiple, wrapping rows of same width items. You can set a{' '}
          <EuiCode>columns</EuiCode> prop to specify anywhere between 1-4
          columns. Any more would likely break on laptop screens.
        </p>
      ),
      props: { EuiFlexGrid },
      playground: flexGridConfig,
      snippet: flexGridColumnsSnippet,
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGridColumns />
        </div>
      ),
    },

    {
      title: 'Flex grids can change direction',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridColumnFirstSource,
        },
      ],
      text: (
        <p>
          Adding <EuiCode>direction=&quot;column&quot;</EuiCode> will re-orient
          the flex items so they display top-down <strong>then</strong> left to
          right.
        </p>
      ),
      snippet: flexGridColumnFirstSnippet,
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGridColumnFirst />
        </div>
      ),
    },
    {
      title: 'Flex grids and flex groups can nest',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexNestSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>EuiFlexGroup</strong> and <strong>EuiFlexGrid</strong> can
            nest within themselves indefinitely. For example, here we turn off
            the growth on a <strong>EuiFlexGroup</strong>, then nest a grid
            inside of it.
          </p>
          <EuiCallOut color="warning" title="Flex items are also a flexbox">
            <p>
              To support nested stretching of items,{' '}
              <strong>EuiFlexItem</strong> also has{' '}
              <EuiCode>{'display: flex'}</EuiCode> on it so if your children are
              not behaving correctly, you may want to wrap them in a{' '}
              <EuiCode>{'<div />'}</EuiCode>.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      snippet: flexNestSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexNest />
        </div>
      ),
    },
    {
      title: 'Gutter sizing',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGutterSource,
        },
      ],
      text: (
        <>
          <p>
            The <EuiCode>gutterSize</EuiCode> prop can be applied to either a{' '}
            <strong>EuiFlexGroup</strong> or a <strong>EuiFlexGrid</strong> to
            adjust the spacing between <strong>EuiFlexItems</strong>.
          </p>
          <EuiCallOut
            color="warning"
            title="Gutters are created with using negative margin"
          >
            <p>
              If the parent container of a flex group or grid doesn&apos;t have
              sufficient padding to account for the negative margins, it may
              cause overflow scrolling.
            </p>
          </EuiCallOut>
        </>
      ),
      snippet: flexGutterSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGutter />
        </div>
      ),
    },
    {
      title: 'Responsive layouts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupResponsiveSource,
        },
      ],
      text: (
        <p>
          By default <strong>EuiFlexGroup</strong> is responsive by always
          stacking the items on smaller screens. However, often you only want to
          use groups for alignment and margins, rather than layouts. Simply
          apply the <EuiCode>responsive={'{false}'}</EuiCode> prop to retain a
          single row layout for the group.
        </p>
      ),
      snippet: flexGroupResponsiveSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroupResponsive />
        </div>
      ),
    },
  ],
};
